import be5                 from '../be5';
import changeDocument      from '../core/changeDocument';
import Preconditions       from '../utils/preconditions';


export default
{
  load(params, frontendParams) {
    Preconditions.passed(params.entity);
    Preconditions.passed(params.query);

    const requestParams = {
      entity: params.entity,
      query: params.query,
      values: be5.net.paramString(params.params),
      _ts_: new Date().getTime()
    };

    be5.net.request('document', requestParams, data => {
      changeDocument(frontendParams.documentName, { value: data, frontendParams: frontendParams });
    }, (data) => {
      changeDocument(frontendParams.documentName, { value: data, frontendParams: frontendParams });
      //changeDocument(documentName, { component: StaticPage, value: StaticPage.createValue(data.value.code, data.value.message)});
    });
  },

}
