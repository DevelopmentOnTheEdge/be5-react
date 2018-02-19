import be5              from '../be5';
import bus              from '../core/bus';
import Preconditions    from '../preconditions';
import changeDocument   from '../core/changeDocument';
import FinishedResult   from '../components/forms/FinishedResult';
import StaticPage       from '../components/StaticPage';
import ErrorPane        from '../components/ErrorPane';
import formsCollection  from './formsCollection.js';
import Table            from "../components/tables/Table";


export default
{
  apply(params, frontendParams) {
    this._send('form/apply', params, frontendParams);
  },

  load(params, frontendParams) {
    this._send('form', params, frontendParams);
  },

  _send(action, params, frontendParams){
    Preconditions.passed(params.entity);
    Preconditions.passed(params.query);
    Preconditions.passed(params.operation);

    let selectedRows = params.selectedRows;
    if (!selectedRows) {
      selectedRows = (params.operationParams === undefined || params.operationParams.selectedRows === undefined)
        ? be5.tableState.selectedRows.join() : params.operationParams.selectedRows;
    }
    if (params.operationParams !== undefined && params.operationParams.selectedRows !== undefined) {
      delete params.operationParams.selectedRows;
    }

    const requestParams = {
      entity: params.entity,
      query: params.query,
      operation: params.operation,
      values: be5.net.paramString(params.values),
      operationParams: be5.net.paramString(params.operationParams),
      selectedRows: selectedRows || '',
      _ts_: new Date().getTime()
    };

    be5.net.request(action, requestParams, data => {
      this._performOperationResult(data, frontendParams, params);
    },(data)=> {
      bus.fire("alert", {msg: be5.messages.errorServerQueryException.replace('$message', data.value.code), type: 'error'});
    });
  },

  _performOperationResult(json, frontendParams, applyParams)
  {
    const documentName = frontendParams.documentName;

    Preconditions.passed(documentName);

    if(json.data !== undefined)
    {
      switch (json.data.type) {
        case 'form':
          this._performForm(json, frontendParams);
          return;
        case 'operationResult':
          const attributes = json.data.attributes;

          if (attributes.status === 'error') {
            bus.fire("alert", {msg: attributes.message, type: 'error'});
            return;
          }

          if(frontendParams.onSuccess){
            frontendParams.onSuccess(json, applyParams);
          }

          if (attributes.status !== 'table' && frontendParams.parentDocumentName !== undefined
                                            && frontendParams.parentDocumentName !== frontendParams.documentName)
          {
            console.log("bus.fire() " + frontendParams.parentDocumentName + be5.documentRefreshSuffix);
            bus.fire(frontendParams.parentDocumentName + be5.documentRefreshSuffix)
          }

          switch (attributes.status) {
            case 'redirect':
              bus.fire("alert", {msg: be5.messages.successfullyCompleted, type: 'success'});
              if(attributes.details === 'refreshAll' || attributes.details === 'refreshAllAndGoBack')
              {
                if(attributes.details === 'refreshAll'){
                  be5.url.set("");
                }else{
                  window.history.back();
                }
                bus.fire('LoggedIn');
                if(documentName === be5.mainModalDocumentName)bus.fire("mainModalClose");
              }
              else if(attributes.details.startsWith("http://")
                      || attributes.details.startsWith("https://")
                      || attributes.details.startsWith("ftp://"))
              {
                window.location.href = attributes.details;
              }
              else
              {
                if (documentName === be5.mainDocumentName)
                {
                  be5.url.set(attributes.details);
                }
                else
                {
                  be5.url.process(documentName, '#!' + attributes.details);
                }
              }
              return;
            case 'finished':
              if(documentName === be5.mainModalDocumentName) {
                bus.fire("alert", {msg: json.data.attributes.message || be5.messages.successfullyCompleted, type: 'success'});
                bus.fire("mainModalClose");
              }else{
                changeDocument(documentName, {component: FinishedResult, value: json, frontendParams: frontendParams});
              }
              return;
            case 'table':
              const tableJson = {
                data: {
                  attributes: attributes.details
                },
                meta: json.meta
              };
              changeDocument(frontendParams.parentDocumentName, {component: Table, value: tableJson});
              if(documentName === be5.mainModalDocumentName) {
                bus.fire("mainModalClose");
              }
              return;
            default:
              bus.fire("alert", {
                msg: be5.messages.errorUnknownAction.replace('$action', 'status = ' + attributes.status),
                type: 'error'
              });
            //changeDocument(documentName, {  value: be5.messages.errorUnknownAction.replace('$action', 'status = ' + attributes.status) });
          }
          return;
        default:
          bus.fire("alert", {
            msg: be5.messages.errorUnknownAction.replace('$action', 'data.type = ' + json.data.attributes.type),
            type: 'error'
          });
        //changeDocument(documentName, { value: be5.messages.errorUnknownAction.replace('$action', 'data.type = ' + json.data.attributes.type) });
      }
    }else{
      const error = json.errors[0];
      bus.fire("alert", {msg: error.status + " "+ error.title, type: 'error'});

      changeDocument(documentName, {component: ErrorPane, value: json, frontendParams: frontendParams});
    }
  },

  _performForm(json, frontendParams)
  {
    let operationResult = json.data.attributes.operationResult;

    if(operationResult.status === 'error')
    {
      bus.fire("alert", {msg: operationResult.message, type: 'error'});
    }

    const formComponentName = json.data.attributes.layout.type || 'form';
    const formComponent = formsCollection.getForm(formComponentName);

    if(formComponentName === 'modal' || frontendParams.documentName === be5.mainModalDocumentName)
    {
      bus.fire("mainModalOpen");

      changeDocument(be5.mainModalDocumentName,
        { component: formsCollection.getForm('modal'), value: json, frontendParams: frontendParams });
    }
    else
    {
      if(formComponent === undefined){
        changeDocument(frontendParams.documentName, { component: StaticPage,
          value: StaticPage.createValue(be5.messages.formComponentNotFound + formComponentName, '')});
      }else{
        changeDocument(frontendParams.documentName, { component: formComponent, value: json, frontendParams: frontendParams });
      }
    }
  },

  changeLocationHash(json)
  {
    if(json.frontendParams.documentName === be5.mainDocumentName && document.location.hash !== '#!' + json.value.links.self)
    {
      document.location.hash = '#!' + json.value.links.self;
    }
  },

  getOperationParams(url, values = {})
  {
    const attr = be5.url.parse(url);

    return {
      entity: attr.positional[1],
      query: attr.positional[2],
      operation: attr.positional[3],
      values: values,
      operationParams: attr.named
    };
  }

};
