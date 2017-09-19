import be5                 from '../be5';
import documentUtils       from '../core/documentUtils';
import changeDocument      from '../core/changeDocument';
import _                   from 'underscore';
import Preconditions       from '../preconditions';
import StaticPage          from '../components/staticPage';
import TablesCollections   from '../services/tablesCollections';


const createDefaultOptions = function() {
  return {};
};

export default {
  load(params, performData, documentName) {
    Preconditions.passed(params.entity);
    Preconditions.passed(params.query);
    
    const options = _.extend(createDefaultOptions(), params.options);
    const requestParams = {
      entity: params.entity, query: params.query, values: be5.net.paramString(params.params),
      _ts_: new Date().getTime()
    };
    
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

  performData(json, documentName)
  {
    const tableComponentName = json.data.attributes.layout.type || 'table';
    const tableComponent = TablesCollections.getTable(tableComponentName);

    if(tableComponent === undefined){
      changeDocument(documentName, { component: StaticPage,
        value: StaticPage.createValue(be5.messages.formComponentNotFound + formComponentName, '')});
    }else{
      changeDocument(documentName, { component: tableComponent, value: json });
    }
  },

};
