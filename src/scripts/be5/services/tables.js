import be5                 from '../be5';
import changeDocument      from '../core/changeDocument';
import Preconditions       from '../preconditions';
import StaticPage          from '../components/StaticPage';
import ErrorPane           from "../components/ErrorPane";
import Table               from "../components/tables/Table";
import tablesCollection   from './tablesCollection';


export default
{
  load(params, documentName) {
    this._send(params, this._performData, documentName);
  },

  refresh(params, documentName) {
    this._send(params, (json, documentName) => {
      if(json.data !== undefined){
        changeDocument(documentName, { component: Table, value: json });
      }else{
        changeDocument(documentName, { component: ErrorPane, value: json });
      }
    }, documentName);
  },

  _send(params, performData, documentName) {
    Preconditions.passed(params.entity);
    Preconditions.passed(params.query);

    const requestParams = {
      entity: params.entity,
      query: params.query,
      values: be5.net.paramString(params.params),
      _ts_: new Date().getTime()
    };

    be5.net.request('document', requestParams, json => {
      performData(json, documentName);
    }, (data)=> {
      changeDocument(documentName, { component: StaticPage, value: StaticPage.createValue(data.value.code, data.value.message)});
    });
  },

  _performData(json, documentName)
  {
    if(json.data !== undefined){
      const tableComponentName = json.data.attributes.layout.type;
      const tableComponent = tablesCollection.getTable(tableComponentName);

      if(tableComponent === undefined){
        changeDocument(documentName, { component: StaticPage,
          value: StaticPage.createValue(be5.messages.tableComponentNotFound + tableComponentName, '', json.meta, json.links)});
      }else{
        changeDocument(documentName, { component: tableComponent, value: json });
      }
    }else{
      changeDocument(documentName, { component: ErrorPane, value: json });
    }
  }
}
