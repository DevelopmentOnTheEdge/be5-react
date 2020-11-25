import be5 from '../be5';
import changeDocument from '../core/changeDocument';
import Preconditions from '../utils/preconditions';
import numberFormatter from 'number-format.js';
import {
  CONTEXT_PARAMS,
  ENTITY_NAME_PARAM,
  LIMIT,
  MAIN_MODAL_DOCUMENT,
  QUERY_NAME_PARAM, RECORDS_PER_PAGE_SETTINGS, SEARCH_PRESETS_PARAM,
  TIMESTAMP_PARAM
} from "../constants";
import bus from "../core/bus";
import {clearDocumentState, getDocumentState, setDocumentState} from "./documentStates";
import {getContextParams, initFilterParams} from "../utils/filterUtils";
import {getQuerySettings, isEmptyString, isGuest, setQuerySettings} from "../utils/utils";


export const loadTable = (params, frontendParams) => {
  getTable(params, json => {
    //todo remove 'json.data' check after change error code
    _performTable(json, frontendParams);
  }, (json) => {
    changeDocument(frontendParams.documentName, {value: json, frontendParams: frontendParams});
  })
};

export const loadTableByUrl = (url, frontendParams) => {
  getTable(getTableParams(url), json => {
    _performTable(json, frontendParams);
  }, (json) => {
    changeDocument(frontendParams.documentName, {value: json, frontendParams: frontendParams});
  })
};

export const fetchTableByUrl = (url, callback, failure = be5.log.error) => {
  clearDocumentState(url);
  getTable(getTableParams(url), callback, failure);
};

export const asyncSelectLoadOptions = (params, callback) => {
  const {input, entity, query} = params;
  const url = be5.url.create(["table", entity, query || '*** Selection view ***'], {asyncValue: input});
  fetchTableByUrl(url, function (json) {
    const options = getSelectOptions(json);
    const complete = json.data.attributes.rows.length < json.data.attributes.length;
    callback(null, {
      options: options,
      // CAREFUL! Only set this to true when there are no more options,
      // or more specific queries will not be sent to the server.
      complete: complete
    });
  });
};

export const openTablePage = (attr, frontendParams, page) => {
  clearTableFilter(attr.category, attr.page, attr.parameters);
  const previousPageParams = initFilterParams(attr.parameters);
  previousPageParams._offset_ = (page - 1) * attr.length;
  loadTableByUrl(be5.url.form(['table', attr.category, attr.page], previousPageParams),
    frontendParams);
};

const getSelectOptions = (json) => {
  const rows = json.data.attributes.rows;
  let options = [];
  for (let i = 0; i < rows.length; i++) {
    options.push({value: rows[i].cells[0].content, label: rows[i].cells[1].content});
  }
  return options;
};

export const getTableParams = (url) => {
  const attr = be5.url.parse(url);

  return {
    [ENTITY_NAME_PARAM]: attr.positional[1],
    [QUERY_NAME_PARAM]: attr.positional[2],
    [CONTEXT_PARAMS]: attr.named
  };
};

export const getTable = (params, callback, failure = be5.log.error) => {
  if (isGuest()) {
    const limit = getQuerySettings(params[ENTITY_NAME_PARAM], params[QUERY_NAME_PARAM], RECORDS_PER_PAGE_SETTINGS);
    if (!isEmptyString(limit) && params[CONTEXT_PARAMS] && isEmptyString(params[CONTEXT_PARAMS][LIMIT])) {
      params[CONTEXT_PARAMS][LIMIT] = limit
    }
  }
  be5.net.request('table', getRequestParams(params), callback, failure);
};

export const updateTable = (params, callback, failure = be5.log.error) => {
  const limit = params[CONTEXT_PARAMS] ? params[CONTEXT_PARAMS][LIMIT] : null;
  //hot fix remove after fix empty redirect params with SEARCH_PRESETS_PARAM usage
  if(params[CONTEXT_PARAMS] && params[CONTEXT_PARAMS][SEARCH_PRESETS_PARAM]){
    delete params[CONTEXT_PARAMS][SEARCH_PRESETS_PARAM]
  }
  if (isGuest() && !isEmptyString(limit)) {
    const entity = params[ENTITY_NAME_PARAM];
    const query = params[QUERY_NAME_PARAM];
    if (getQuerySettings(RECORDS_PER_PAGE_SETTINGS) !== limit)
      setQuerySettings(entity, query, RECORDS_PER_PAGE_SETTINGS, limit)
  }
  be5.net.request('table/update', getRequestParams(params), callback, failure);
};

const _performTable = (json, frontendParams) => {
  const documentName = frontendParams.documentName;
  const formComponentName = json.data.attributes.layout.type;

  if (formComponentName === 'modalTable' || documentName === MAIN_MODAL_DOCUMENT) {
    bus.fire("mainModalOpen");
    changeDocument(MAIN_MODAL_DOCUMENT, {value: json, frontendParams: frontendParams});
  }
  else {
    changeDocument(documentName, {value: json, frontendParams: frontendParams});
  }
};

const getRequestParams = (params) => {
  const entity = params[ENTITY_NAME_PARAM];
  const query = params[QUERY_NAME_PARAM];
  Preconditions.passed(entity);
  Preconditions.passed(query);

  let finalParams = withSavedTableFilter(entity, query, params[CONTEXT_PARAMS]);

  return {
    [ENTITY_NAME_PARAM]: entity,
    [QUERY_NAME_PARAM]: query,
    [CONTEXT_PARAMS]: be5.net.paramString(finalParams),
    [TIMESTAMP_PARAM]: new Date().getTime()
  }
};

function withSavedTableFilter(entity, query, params)
{
  const tableKey = getTableKey(entity, query, params);
  let savedParams = getDocumentState(tableKey);
  if (savedParams !== undefined) {
    return savedParams;
  } else {
    setTableFilter(entity, query, params)
  }
  return params;
}

export function setTableFilter(entity, query, parameters) {
  const tableKey = getTableKey(entity, query, parameters);
  const filterParams = parameters;
  if (Object.keys(filterParams).length !== 0) {
    setDocumentState(tableKey, filterParams);
  } else {
    clearDocumentState(tableKey);
  }
}

export function clearTableFilter(entity, query, params)
{
  const contextParams = getContextParams(params);
  const tableKey = getTableKey(entity, query, contextParams);
  clearDocumentState(tableKey);
}

function getTableKey(entity, query, parameters)
{
  return "#!" + be5.url.form(['table', entity, query], getContextParams(parameters));
}

export const jQueryFormatCell = (data, options, isColumn) => {
  if (!Array.isArray(data)) {
    if (data === '') {
      if (options && options.blankNulls && options.blankNulls.value)
        return options.blankNulls.value;
    }
  } else {
    try {
      data = data.map(row => row.join !== undefined ? row.join(', ') : errorData()).join('<br/>');
    } catch (e) {
      console.error(e.message);
      data = e.message;
    }
  }

  function errorData() {
    throw new Error('Error data in cell.');
  }

  if (options) {
    if (options.format) {
      data = numberFormatter(options.format.mask, data);
    }
    if (!isColumn && options.link) {
      data = $('<a>', {
        html: data,
        href: "#!" + options.link.url,
        class: options.link.class || "process-hash-url"
      });
    }
    if (options.css || options === 'th') {
      const wrap = $('<div>');
      if (options.css && options.css.class) wrap.addClass(options.css.class);
      if (options === 'th') wrap.addClass("ta-center td-strong");
      data = wrap.html(data);
    }
  }
  if (data instanceof $) {
    data = $('<div>').append($(data).clone()).html();
  }
  return (data === undefined || data === null) ? '' : data;
};
