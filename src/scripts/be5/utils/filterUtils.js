import {SEARCH_PARAM, SEARCH_PRESETS_PARAM} from "../constants";
import be5 from "../be5";


export const getFilterParams = (params) => {
  if (params[SEARCH_PARAM] !== "true") {
    return {};
  }

  const searchPresets = params[SEARCH_PRESETS_PARAM] === undefined ? [] : params[SEARCH_PRESETS_PARAM].split(',');
  return Object.keys(params)
    .filter(key => !key.startsWith("_"))
    .filter(key => !searchPresets.includes(key))
    .reduce((obj, key) => {
      obj[key] = params[key];
      return obj;
    }, {});
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
