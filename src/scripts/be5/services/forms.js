import be5              from '../be5';
import bus              from '../core/bus';
import Preconditions    from '../preconditions';
import changeDocument   from '../core/changeDocument';
import {HtmlResult}     from '../components/forms/form';
import StaticPage       from '../components/staticPage';
import ErrorPane        from "../components/errorPane";
import formsCollections from './formsCollections.js';
import Table            from "../components/tables/table";


export default {
  load(params, frontendParams) {
    Preconditions.passed(params.entity);
    Preconditions.passed(params.query);
    Preconditions.passed(params.operation);

    //todo check for Edit operation with reloadOnChange
    const selectedRows = (params === undefined || params.selectedRows === undefined)
      ? be5.tableState.selectedRows.join() : params.selectedRows;
    if(params !== undefined && params.selectedRows !== undefined){
      delete params.selectedRows;
    }

    const requestParams = {
      entity: params.entity,
      query: params.query,
      operation: params.operation,
      values: params.values || '{}',
      operationParams: params.operationParams || '{}',
      selectedRows: selectedRows || '',
      _ts_: new Date().getTime()
    };

    be5.net.request('form', requestParams, data => {
      this.performOperationResult(data, frontendParams, false);//todo test and delete second param
    }, (data)=> {
      bus.fire("alert", {msg: be5.messages.errorServerQueryException.replace('$message', data.value.code), type: 'error'});
      // changeDocument(documentName, {
      //
      //   error: true,
      //   value: be5.messages.errorServerQueryException.replace('$message', data.value.code)
      // });
    });

  },

  performOperationResult(json, frontendParams, reloadOrApply)
  {
    const documentName = frontendParams.documentName;

    //console.log("forms perform: " + documentName);
    Preconditions.passed(documentName);

    if(json.data !== undefined)
    {
      if(reloadOrApply)changeDocument(documentName + "_errors", { value: "" } );

      switch (json.data.type) {
        case 'form':
          this.performForm(json, frontendParams);
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
              changeDocument(documentName, {component: HtmlResult, value: json, frontendParams: frontendParams});
              return;
            case 'table':
              //Object.assign({}, attributes.details, json.meta)}
              //console.log(frontendParams.parentDocumentName, attributes.details);
              const tableJson = {
                data: {
                  attributes: attributes.details
                },
                meta: json.meta
              };
              changeDocument(frontendParams.parentDocumentName, {component: Table, value: tableJson});
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

      console.log(reloadOrApply);
      changeDocument(reloadOrApply ? documentName + "_errors" : documentName, {component: ErrorPane, value: json});
    }
  },

  performForm(json, frontendParams)
  {
    const documentName = frontendParams.documentName;
    let operationResult = json.data.attributes.operationResult;

    if(operationResult.status === 'error' )
    {
      bus.fire("alert", {msg: operationResult.message, type: 'error'});
      if(json.data.attributes.errorModel)
      {
        changeDocument(documentName + "_errors", {component: ErrorPane, value: json.data.attributes.errorModel});
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
