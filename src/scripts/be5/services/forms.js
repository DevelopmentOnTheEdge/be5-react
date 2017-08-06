import be5            from '../be5';
import Preconditions  from '../preconditions';
import _              from 'underscore';
import changeDocument from '../core/changeDocument';
import Form,{HtmlResult}          from '../components/forms/form';
import formsCollections from './formsCollections.js';

export default {
  load(documentName, entity, query, operation, operationParams) {
    Preconditions.passed(entity);
    Preconditions.passed(query);
    Preconditions.passed(operation);

    const selectedRows = (operationParams === undefined || operationParams.selectedRows === undefined)
      ? be5.tableState.selectedRows.join() : operationParams.selectedRows;
    if(operationParams !== undefined && operationParams.selectedRows !== undefined){
      delete operationParams.selectedRows;
    }

    const requestParams = { 
        entity: entity,
        query: query,
        operation: operation,
        values: be5.net.paramString(operationParams) || '',
        selectedRows: selectedRows || ''
    };

    be5.net.request('form', requestParams, data => {
      this.performOperationResult(data, documentName);
    }, (data)=> {
      changeDocument(documentName, {
        component: 'text',
        error: true,
        value: be5.messages.errorServerQueryException.replace('$message', data.value.code)
      });
    });

  },

  performOperationResult(data, documentName){
    //console.log("forms perform: " + documentName);
    Preconditions.passed(documentName);

    switch (data.type)
    {
      case 'form':
        this.performForm(data, documentName);
        return;
      case 'operationResult':
        const operationResult = data.value;
        switch (operationResult.status)
        {
          case 'redirect':
            be5.url.process(documentName, '#!' + operationResult.details);
            //be5.url.set(operationResult.details);
            return;
          case 'finished':
            if(operationResult.message !== null)
              changeDocument(documentName, { component: HtmlResult, value: operationResult.message });
            return;
          default:
            changeDocument(documentName, { component: 'text', value: be5.messages.errorUnknownAction.replace('$action', 'operationResult.status = ' + operationResult.status) });
        }
        return;
      default:
        changeDocument(documentName, { component: 'text', value: be5.messages.errorUnknownAction.replace('$action', 'data.type = ' + data.type) });
    }
  },

  performForm(data, documentName){
    //console.log(data, documentName);
    if(!data.value.layout){
      changeDocument(documentName, {
        component: Form, value: _.extend({}, data.value, {documentName: documentName})
      });
      return;
    }
    switch (data.value.layout.type) {
      case 'custom':
        changeDocument(documentName, {
          component: formsCollections.getForm(data.value.layout.name), value: _.extend({}, data.value, {documentName: documentName})
        });
        return;
      default:
        console.error("Not found form type: " + data.value.layout.type);
    }
  }

};
