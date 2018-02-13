import be5                 from '../be5';
import changeDocument      from '../core/changeDocument';
import Preconditions       from '../preconditions';
import StaticPage          from '../components/staticPage';
import ErrorPane           from "../components/errorPane";
import Table               from "../components/tables/table";
import TablesCollections   from './tablesCollections';


class Tables {
  static load(params, documentName) {
    Tables._load(params, Tables.performData, documentName);
  }

  static refresh(params, documentName) {
    Tables._load(params, (data, documentName) => {
      changeDocument(documentName, { component: Table, value: data });
    }, documentName);
  }

  static _load(params, performData, documentName) {
    Preconditions.passed(params.entity);
    Preconditions.passed(params.query);

    const requestParams = {
      entity: params.entity, query: params.query, values: be5.net.paramString(params.params),
      _ts_: new Date().getTime()
    };

    be5.net.request('document', requestParams, data => {
      performData(data, documentName);
    }, (data)=> {
      changeDocument(documentName, { component: StaticPage, value: StaticPage.createValue(data.value.code, data.value.message)});
    });
  }

  static performData(json, documentName)
  {
    if(json.data !== undefined){
      const tableComponentName = json.data.attributes.layout.type || 'table';
      const tableComponent = TablesCollections.getTable(tableComponentName);

      if(tableComponent === undefined){
        changeDocument(documentName, { component: StaticPage,
          value: StaticPage.createValue(be5.messages.tableComponentNotFound + tableComponentName, '')});
      }else{
        changeDocument(documentName, { component: tableComponent, value: json });
      }
    }else{
      changeDocument(documentName, { component: ErrorPane, value: json });
    }
  }
}

export default {
  load: Tables.load,

  refresh: Tables.refresh
};
