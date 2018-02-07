import be5              from '../be5';
import bus              from '../core/bus';
import Preconditions    from '../preconditions';
import _                from 'underscore';
import changeDocument   from '../core/changeDocument';
import {HtmlResult}     from '../components/forms/form';
import StaticPage       from '../components/staticPage';
import ErrorPane        from "../components/errorPane";
import formsCollections from './formsCollections.js';
import Table            from "../components/tables/table";


export default {
  load(params, documentName, onChange) {
    Preconditions.passed(params.entity);
    Preconditions.passed(params.query);
    Preconditions.passed(params.operation);

    const requestParams = {
      entity: params.entity,
      query: params.query,
      operation: params.operation,
      values: params.values || '',
      selectedRows: params.selectedRows || '',
      _ts_: new Date().getTime()
    };

    be5.net.request('form', requestParams, data => {
      this.performOperationResult(data, params.values || '{}', documentName, onChange, false);
    }, (data)=> {
      bus.fire("alert", {msg: be5.messages.errorServerQueryException.replace('$message', data.value.code), type: 'error'});
      // changeDocument(documentName, {
      //
      //   error: true,
      //   value: be5.messages.errorServerQueryException.replace('$message', data.value.code)
      // });
    });

  },

  performOperationResult(json, hashParams, documentName, onChange, reloadOrApply){
    //console.log("forms perform: " + documentName);
    Preconditions.passed(documentName);

    if(json.data !== undefined)
    {
      if(reloadOrApply)changeDocument(documentName + "_errors", { value: "" } );

      switch (json.data.type) {
        case 'form':
          this.performForm(json, hashParams, documentName);
          return;
        case 'operationResult':
          if (onChange) onChange();
          const attributes = json.data.attributes;

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
                if (documentName === be5.documentName) {
                  be5.url.set(attributes.details);
                }
                else {
                  be5.url.process(documentName, '#!' + attributes.details);
                }
              }
              return;
            case 'finished':
              changeDocument(documentName, {component: HtmlResult, value: json});
              return;
            case 'table':
              //Object.assign({}, attributes.details, json.meta)}
              changeDocument(documentName, {component: Table, value: {
                data: {
                  attributes: attributes.details
                },
                meta: json.meta
              }});
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

  performForm(json, hashParams, documentName)
  {
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

    if(formComponent === undefined){
      changeDocument(documentName, { component: StaticPage,
        value: StaticPage.createValue(be5.messages.formComponentNotFound + formComponentName, '')});
    }else{
      changeDocument(documentName, { component: formComponent, value: Object.assign({}, json, {documentName: documentName, hashParams: hashParams}) });
    }
  }

};
