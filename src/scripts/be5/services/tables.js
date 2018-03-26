import be5                 from '../be5';
import changeDocument      from '../core/changeDocument';
import Preconditions       from '../utils/preconditions';


export default
{
  load(params, documentName) {
    Preconditions.passed(params.entity);
    Preconditions.passed(params.query);

    const requestParams = {
      entity: params.entity,
      query: params.query,
      values: be5.net.paramString(params.params),
      _ts_: new Date().getTime()
    };

    be5.net.request('document', requestParams, data => {
      changeDocument(documentName, { value: data });
    }, (data) => {
      changeDocument(documentName, { value: data });
      //changeDocument(documentName, { component: StaticPage, value: StaticPage.createValue(data.value.code, data.value.message)});
    });
  },

}
