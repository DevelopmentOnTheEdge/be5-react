import be5            from '../be5';
import documentUtils  from '../core/documentUtils';
import changeDocument from '../core/changeDocument';
import _              from 'underscore';
import Preconditions  from '../preconditions';
import Table          from '../components/table';

const createDefaultOptions = function() {
  return {
    embedded: true
  };
};

export default {
  load(params, documentName) {
    Preconditions.passed(params.entity);
    Preconditions.passed(params.query);
    
    const options = _.extend(createDefaultOptions(), params.options);
    const requestParams = { entity: params.entity, query: params.query, values: be5.net.paramString(params.params) };
    
    be5.net.request('document', requestParams, data => {
      // data.time = Date.now();
      // if (data.type === 'table') {
      //   data.value.type = 'table';
      //   data.value.requestParams = requestParams;
      // } else {
      //   data.value.embedded = true;
      // }
      data.value = _.extend({}, data.value, options);
      data = documentUtils.createDocument(data);

      changeDocument(documentName, { component: Table, value: data.value });
    });
  }
};
