import be5            from '../be5';
import documentUtils  from '../core/documentUtils';
import changeDocument from '../core/changeDocument';
import _              from 'underscore';
import Preconditions  from '../preconditions';
import Table          from '../components/tables/table';
import TableForm      from '../components/tables/tableForm';
import TableFormRow      from '../components/tables/tableFormRow';

const createDefaultOptions = function() {
  return {};
};

export default {
  load(params, performData, documentName) {
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

      performData(data, documentName);
    }, (data)=> {
      changeDocument(documentName, {
        component: 'text',
        error: true,
        value: be5.messages.errorServerQueryException.replace('$message', data.value.code)
      });
    });
  },

  performData(data, documentName){
    if(data.value.layout.type === 'tableForm'){
      changeDocument(documentName, { component: TableForm, value: data.value });
    }else if(data.value.layout.type === 'tableFormRow'){
      changeDocument(documentName, { component: TableFormRow, value: data.value });
    }else{
      changeDocument(documentName, { component: Table, value: data.value });
    }
  },

};
