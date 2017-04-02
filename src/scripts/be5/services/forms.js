import be5 from 'be5/be5';
import Preconditions from 'be5/preconditions';

export default {
  load(params, callback) {
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
    be5.net.request('form', requestParams, callback);
  }
};
