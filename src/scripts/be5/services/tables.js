import be5                 from '../be5';
import changeDocument      from '../core/changeDocument';
import Preconditions       from '../utils/preconditions';


export const loadTable = (params, frontendParams) => {
  be5.net.request('table', getRequestParams(params), data => {
    changeDocument(frontendParams.documentName, { value: data, frontendParams: frontendParams });
  }, (data) => {
    changeDocument(frontendParams.documentName, { value: data, frontendParams: frontendParams });
    //changeDocument(documentName, { component: StaticPage, value: StaticPage.createValue(data.value.code, data.value.message)});
  });
};

export const updateTable = (params, callback) => {
  be5.net.request('table/update', getRequestParams(params), data => {
    callback(data)
  }, (data) => {
    console.error(data);
  });
};

const getRequestParams = (params) => {
  Preconditions.passed(params.entity);
  Preconditions.passed(params.query);

  return {
    entity: params.entity,
    query: params.query,
    values: be5.net.paramString(params.params),
    _ts_: new Date().getTime()
  }
};
