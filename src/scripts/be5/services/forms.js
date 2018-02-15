import be5              from '../be5';
import bus              from '../core/bus';
import Preconditions    from '../preconditions';
import changeDocument   from '../core/changeDocument';
import {HtmlResult}     from '../components/forms/Form';
import StaticPage       from '../components/StaticPage';
import ErrorPane        from "../components/ErrorPane";
import formsCollections from './formsCollections.js';
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
      this._performOperationResult(data, frontendParams, action === 'form/apply');
    },(data)=> {
      bus.fire("alert", {msg: be5.messages.errorServerQueryException.replace('$message', data.value.code), type: 'error'});
    });
  },

  _performOperationResult(json, frontendParams, isApply)
  {
    const documentName = frontendParams.documentName;

    //console.log("forms perform: " + documentName);
    Preconditions.passed(documentName);

    if(json.data !== undefined)
    {
      if(isApply)changeDocument(documentName + "_errors", { value: "" } );

      switch (json.data.type) {
        case 'form':
          this._performForm(json, frontendParams);
          return;
        case 'operationResult':
          const attributes = json.data.attributes;

          if (attributes.status !== 'table' && frontendParams.documentName !== frontendParams.parentDocumentName)
          {
            console.log("bus.fire() " + frontendParams.parentDocumentName + be5.documentRefreshSuffix);
            bus.fire(frontendParams.parentDocumentName + be5.documentRefreshSuffix)
          }

          if (attributes.status === 'error') {
            bus.fire("alert", {msg: attributes.message, type: 'error'});
            return;
          }

          switch (attributes.status) {
            case 'redirect':
              bus.fire("alert", {msg: be5.messages.successfullyCompleted, type: 'success'});
              if(attributes.details === 'refreshAll')
              {
                be5.url.set("");
                bus.fire('LoggedIn');
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
                bus.fire("alert", {msg: json.data.attributes.message, type: 'success'});
                bus.fire("mainModalToggle");
              }else{
                changeDocument(documentName, {component: HtmlResult, value: json, frontendParams: frontendParams});
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
                bus.fire("mainModalToggle");
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

      changeDocument(isApply ? documentName + "_errors" : documentName, {component: ErrorPane, value: json});
    }
  },

  _performForm(json, frontendParams)
  {
    const documentName = frontendParams.documentName;
    let operationResult = json.data.attributes.operationResult;

    if(operationResult.status === 'error' )
    {
      bus.fire("alert", {msg: operationResult.message, type: 'error'});
      if(json.data.attributes.errorModel)
      {
        const errorJson = {errors: [json.data.attributes.errorModel], meta: json.meta, links: {}};
        changeDocument(documentName + "_errors", {component: ErrorPane, value: errorJson});
      }
    }
    else
    {
      changeDocument(documentName + "_errors", {value: ""});
    }

    const formComponentName = json.data.attributes.layout.type || 'form';
    const formComponent = formsCollections.getForm(formComponentName);

    if(formComponentName === 'modal')
    {
      bus.fire("mainModalOpen");

      changeDocument(be5.mainModalDocumentName, { component: formComponent, value: json, frontendParams: frontendParams });
    }
    else
    {
      if(formComponent === undefined){
        changeDocument(documentName, { component: StaticPage,
          value: StaticPage.createValue(be5.messages.formComponentNotFound + formComponentName, '')});
      }else{
        changeDocument(documentName, { component: formComponent, value: json, frontendParams: frontendParams });
      }
    }
  },

  changeLocationHash(json)
  {
    if(json.frontendParams.documentName === be5.mainDocumentName && document.location.hash !== '#!' + json.value.links.self)
    {
      document.location.hash = '#!' + json.value.links.self;
    }
  }

};
