import {SEARCH_PARAM, SEARCH_PRESETS_PARAM} from "../constants";


export const getFilterParams = (params) => {
  if (params[SEARCH_PARAM] !== "true")
  {
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
