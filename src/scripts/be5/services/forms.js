import be5            from '../be5';
import bus from '../core/bus';
import Preconditions  from '../preconditions';
import _              from 'underscore';
import changeDocument from '../core/changeDocument';
import Form,{HtmlResult}          from '../components/forms/form';
import formsCollections from './formsCollections.js';

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
      this.performOperationResult(data, documentName, onChange);
    }, (data)=> {
      bus.fire("alert", {msg: be5.messages.errorServerQueryException.replace('$message', data.value.code), type: 'error'});
      // changeDocument(documentName, {
      //   component: 'text',
      //   error: true,
      //   value: be5.messages.errorServerQueryException.replace('$message', data.value.code)
      // });
    });

  },

  performOperationResult(json, documentName, onChange){
    //console.log("forms perform: " + documentName);
    Preconditions.passed(documentName);

    switch (json.data.type)
    {
      case 'form':
        this.performForm(json, documentName);
        return;
      case 'operationResult':
        if(onChange)onChange();
        const attributes = json.data.attributes;

        if(attributes.status === 'error')
        {
          bus.fire("alert", {msg: attributes.message, type: 'error'});
          return;
        }

        switch (attributes.status)
        {
          case 'redirect':
            bus.fire("alert", {msg: "Operation completed successfully.", type: 'success'});
            if(documentName === be5.documentName)
            {
              be5.url.set(attributes.details);
            }
            else
            {
              be5.url.process(documentName, '#!' + attributes.details);
            }
            return;
          case 'finished':
            changeDocument(documentName, { component: HtmlResult, value: json });
            return;
          default:
            bus.fire("alert", {msg: be5.messages.errorUnknownAction.replace('$action', 'status = ' + attributes.status), type: 'error'});
            //changeDocument(documentName, { component: 'text', value: be5.messages.errorUnknownAction.replace('$action', 'status = ' + attributes.status) });
        }
        return;
      default:
        bus.fire("alert", {msg: be5.messages.errorUnknownAction.replace('$action', 'data.type = ' + json.data.attributes.type), type: 'error'});
        //changeDocument(documentName, { component: 'text', value: be5.messages.errorUnknownAction.replace('$action', 'data.type = ' + json.data.attributes.type) });
    }
  },

  performForm(json, documentName)
  {
    //console.log(data, documentName);
    let operationResult = json.data.attributes.operationResult;

    if(operationResult.status === 'error' && (operationResult.details === undefined || operationResult.details === "message") )
    {
      bus.fire("alert", {msg: operationResult.message, type: 'error'});
    }

    if(!json.data.attributes.layout){
      changeDocument(documentName, {
        component: Form, value: _.extend({}, json, {documentName: documentName})
      });
      return;
    }
    switch (json.data.attributes.layout.type) {
      case 'custom':
        changeDocument(documentName, {
          component: formsCollections.getForm(json.data.attributes.layout.name), value: _.extend({}, json, {documentName: documentName})
        });
        return;
      default:
        const form = formsCollections.getForm(json.data.attributes.layout.type);
        if(form === undefined){
          bus.fire("alert", {msg: be5.messages.formTypeNotFound + json.data.attributes.layout.type, type: 'error'});
        }else{
          changeDocument(documentName, {
            component: form, value: _.extend({}, json, {documentName: documentName})
          });
        }
    }
  }

};
