import be5                 from '../be5';
import changeDocument      from '../core/changeDocument';
import Preconditions       from '../utils/preconditions';


export const loadTable = (params, frontendParams) => {
  getTable(params, json => {
    //todo remove 'json.data' check after change error code
    if(json.data && frontendParams.documentName === be5.MAIN_DOCUMENT)be5.ui.setTitle(json.data.attributes.title);
    changeDocument(frontendParams.documentName, { value: json, frontendParams: frontendParams });
  }, (json) => {
    changeDocument(frontendParams.documentName, { value: json, frontendParams: frontendParams });
  })
};

export const loadTableByUrl = (url, frontendParams) => {
  getTable(getTableParams(url), json => {
    if(frontendParams.documentName === be5.MAIN_DOCUMENT)be5.ui.setTitle(json.data.attributes.title);
    changeDocument(frontendParams.documentName, { value: json, frontendParams: frontendParams });
  }, (json) => {
    changeDocument(frontendParams.documentName, { value: json, frontendParams: frontendParams });
  })
};

export const fetchTableByUrl = (url, callback, failure) => {
  getTable(getTableParams(url + "_cleanNav_=true"), callback, failure);
};

export const getTableParams = (url) => {
  const attr = be5.url.parse(url);

  return {
    entity: attr.positional[1],
    query: attr.positional[2],
    params: attr.named
  };
};

export const getTable = (params, callback, failure) => {
  be5.net.request('table', getRequestParams(params), data => callback(data), data => failure(data));
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
