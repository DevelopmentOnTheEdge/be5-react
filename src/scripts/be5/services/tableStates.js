import be5 from "../be5";
import {getContextParams, getFilterParams, getSearchPresetParam} from "../utils/filterUtils";
import {LIMIT, OFFSET, ORDER_COLUMN, ORDER_DIR, SEARCH_PARAM, SEARCH_PRESETS_PARAM} from "../constants";

const navs = {};
const filters = {};

export function setTableNav(name, value) {
  navs[name] = value;
}

export function getTableNav(name) {
  return navs[name];
}

export function setTableFilter(entity, query, parameters) {
  const tableKey = getTableKey(entity, query, parameters);
  filters[tableKey] = getFilterParams(parameters);
}

export function getTableFilter(name) {
  return filters[name];
}

export function getTableStates() {
  return [navs, filters];
}

export const positionsParamNames = [ORDER_COLUMN, ORDER_DIR, OFFSET, LIMIT];

export function withSavedTableNav(entity, query, params)
{
  const queryKey = getTableKey(entity, query, params);
  if (params[ORDER_COLUMN] || params[ORDER_DIR] ||
      params[OFFSET] || params[LIMIT])
  {
    const newPos = {};
    positionsParamNames.forEach(name => {
      if (params[name]) newPos[name] = params[name];
    });
    setTableNav(queryKey, newPos);
  }
  else
  {
    const savedPosition = getTableNav(queryKey);
    if (savedPosition !== undefined) params = Object.assign({}, params, savedPosition);
  }
  return params;
}

export function withSavedTableFilter(entity, query, params)
{
  const tableKey = getTableKey(entity, query, params);
  let savedParams = getTableFilter(tableKey);
  if (savedParams !== undefined) {
    const finalParams = Object.assign({}, savedParams, getContextParams(params));
    const searchPresetParam = getSearchPresetParam(params);
    if (searchPresetParam !== null) finalParams[SEARCH_PRESETS_PARAM] = searchPresetParam;
    finalParams[SEARCH_PARAM] = "true";
    return finalParams;
  } else {
    setTableFilter(entity, query, params)
  }
  return params;
}

function getTableKey(entity, query, parameters)
{
  return be5.url.form([entity, query], getContextParams(parameters));
}

export function clearTableStateByUrl(url)
{
  if (!url.startsWith('#!table')) return;
  const attr = be5.url.parse(url);
  clearTableState(attr.positional[1], attr.positional[2], attr.named)
}

export function clearTableState(entity, query, params)
{
  const contextParams = getContextParams(params);
  const tableKey = getTableKey(entity, query, contextParams);
  console.log('clearTableState - ' + tableKey);
  delete navs[tableKey];
  delete filters[tableKey];
}
