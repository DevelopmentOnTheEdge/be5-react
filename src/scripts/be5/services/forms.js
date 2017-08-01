import be5            from '../be5';
import Preconditions  from '../preconditions';
import changeDocument from '../core/changeDocument';
import Form,{HtmlResult}          from '../components/form';

export default {
  load(params, documentName) {
    console.log(JSON.stringify(params));
    Preconditions.passed(params.entity);
    Preconditions.passed(params.query);
    Preconditions.passed(params.operation);
    
    const requestParams = { 
        entity: params.entity,
        query: params.query,
        operation: params.operation,
        values: params.values || '',
        selectedRows: params.selectedRows || ''
    };

    be5.net.request('form', requestParams, data => {
      this.performOperationResult(data, documentName);
    });

  },

  performOperationResult(data, documentName){
    switch (data.type)
    {
      case 'form':
        changeDocument(documentName, { component: Form, value: data.value });
        return;
      case 'operationResult':
        const operationResult = data.value;
        switch (operationResult.status)
        {
          case 'redirect':
            be5.url.set(operationResult.details);
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
  }

};
