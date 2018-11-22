import be5 from '../be5';
import changeDocument from '../core/changeDocument';
import Preconditions from '../utils/preconditions';
import {MAIN_MODAL_DOCUMENT} from "../constants";
import bus from "../core/bus";


export const loadTable = (params, frontendParams) => {
  getTable(params, json => {
    //todo remove 'json.data' check after change error code
    _performTable(json, frontendParams);
  }, (json) => {
    changeDocument(frontendParams.documentName, { value: json, frontendParams: frontendParams });
  })
};

export const loadTableByUrl = (url, frontendParams) => {
  getTable(getTableParams(url), json => {
    _performTable(json, frontendParams);
  }, (json) => {
    changeDocument(frontendParams.documentName, { value: json, frontendParams: frontendParams });
  })
};

export const fetchTableByUrl = (url, callback, failure) => {
  getTable(getTableParams(url + "/_cleanNav_=true"), callback, failure);
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

const _performTable = (json, frontendParams) =>
{
  const documentName = frontendParams.documentName;
  const formComponentName = json.data.attributes.layout.type;

  if(formComponentName === 'modalTable' || documentName === MAIN_MODAL_DOCUMENT)
  {
    bus.fire("mainModalOpen");
    changeDocument(MAIN_MODAL_DOCUMENT, { value: json, frontendParams: frontendParams });
  }
  else
  {
    changeDocument(documentName, { value: json, frontendParams: frontendParams });
  }
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
