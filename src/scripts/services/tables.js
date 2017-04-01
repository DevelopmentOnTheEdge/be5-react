import be5           from 'be5';
import documentUtils from 'be5/documentUtils';
import _             from 'underscore';
import Preconditions from 'preconditions';

const createDefaultOptions = function() {
  return {
    embedded: true
  };
};

export default {
  load(params, callback) {
    Preconditions.passed(params.entity);
    Preconditions.passed(params.query);
    
    const options = _.extend(createDefaultOptions(), params.options);
    const requestParams = { entity: params.entity, query: params.query, values: be5.net.paramString(params.params) };
    
    be5.net.request('document', requestParams, documentState => {
      documentState.time = Date.now();
      if (documentState.type === 'table') {
        documentState.value.type = 'table';
        documentState.value.requestParams = requestParams;
      } else {
        documentState.value.embedded = true;
      }
      documentState.value = _.extend({}, documentState.value, options);
      documentState = documentUtils.createDocument(documentState);
      
      callback(documentState);
    });
  }
};
