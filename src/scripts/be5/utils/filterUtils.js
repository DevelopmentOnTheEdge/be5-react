import {SEARCH_PARAM, SEARCH_PRESETS_PARAM} from "../constants";
import be5 from "../be5";

export const getContextParams = (params) => {
  if (params[SEARCH_PARAM] !== "true") {
    return params;
  }

  if (params[SEARCH_PRESETS_PARAM] === undefined) {
    return {};
  }

  const searchPresets = params[SEARCH_PRESETS_PARAM].split(',');
  return Object.keys(params)
    .filter(key => searchPresets.includes(key) || key === SEARCH_PARAM || key === SEARCH_PRESETS_PARAM)
    .reduce((obj, key) => {obj[key] = params[key]; return obj;}, {});
};

export const getFilterParams = (params) => {
  if (params[SEARCH_PARAM] !== "true") {
    return {};
  }

  if (params[SEARCH_PRESETS_PARAM] === undefined) {
    const res = Object.assign({}, params);
    delete res[SEARCH_PARAM];
    return res;
  }

  const searchPresets = params[SEARCH_PRESETS_PARAM].split(',');
  return Object.keys(params)
    .filter(key => !searchPresets.includes(key) || key === SEARCH_PARAM || key === SEARCH_PRESETS_PARAM)
    .reduce((obj, key) => {obj[key] = params[key]; return obj;}, {});
};

export const initFilterParams = (params) => {
  const newParams = Object.assign({}, params);
  if (newParams[SEARCH_PARAM] !== "true") {
    const searchPresetParam = getSearchPresetParam(newParams);
    if (searchPresetParam !== null) newParams[SEARCH_PRESETS_PARAM] = searchPresetParam;
    newParams[SEARCH_PARAM] = "true";
  }
  return newParams;
};


export const getSearchPresetParam = (params) =>
{
  return searchPresetParamToString(getSearchPresetNames(params));
};

export const searchPresetParamToString = (searchPresets) =>
{
  return searchPresets.length > 0 ? searchPresets.join(",") : null;
};

export const getSearchPresetNames = (params) =>
{
  if (params[SEARCH_PARAM] === undefined)
  {
    return Object.keys(params);
  }
  else
  {
    if (params[SEARCH_PRESETS_PARAM] !== undefined)
    {
      return params[SEARCH_PRESETS_PARAM].split(",");
    }
    else
    {
      return [];
    }
  }
};

export const addFilterParams = (url, params) => {
  const attr = be5.url.parse(url);
  attr.named['_search_'] = 'true';
  attr.named['_search_presets_'] = '';
  for (let key in params) {
    attr.named[key] = params[key];
  }
  return be5.url.form(attr.positional, attr.named);
};
