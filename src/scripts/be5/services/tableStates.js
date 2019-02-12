import be5 from "../be5";
import {getContextParams, getFilterParams, getSearchPresetParam} from "../utils/filterUtils";
import {SEARCH_PARAM, SEARCH_PRESETS_PARAM} from "../constants";

const filters = {};

export function setTableFilter(entity, query, parameters) {
  const tableKey = getTableKey(entity, query, parameters);
  setTableFilterForKey(tableKey, parameters);
}

export function setTableFilterForKey(tableKey, parameters) {
  filters[tableKey] = getFilterParams(parameters);
}

export function getTableFilter(name) {
  return filters[name];
}

export function getTableStates() {
  return {filters: filters};
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
    setTableFilterForKey(tableKey, params)
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
  delete filters[tableKey];
}
