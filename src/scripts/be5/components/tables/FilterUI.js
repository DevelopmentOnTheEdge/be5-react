import React from 'react';
import be5 from "../../be5";
import {loadTable} from "../../services/tables";
import {getFilterParams} from "../../utils/filterUtils";
import {CONTEXT_PARAMS, ENTITY_NAME_PARAM, QUERY_NAME_PARAM} from "../../constants";


const propTypes = {

};

const FilterUI = ({entity, query, params, frontendParams}) =>
{
  const filterParams = getFilterParams(params);

  function clearFilter(e) {
    e.preventDefault();
    const searchPresets = params['_search_presets_'] === undefined ? [] : params['_search_presets_'].split(',');
    const newParams = {};
    searchPresets.forEach(x => newParams[x] = params[x]);
    newParams['_search_'] = "true";
    newParams['_search_presets_'] = params['_search_presets_'];
    //console.log(newParams);

    const paramsObject = {
      [ENTITY_NAME_PARAM]: entity,
      [QUERY_NAME_PARAM]: query || 'All records',
      [CONTEXT_PARAMS]: newParams
    };
    loadTable(paramsObject, frontendParams)
  }

  if (Object.keys(filterParams).length > 0) {
    return <div className="table-filter-ui mb-2">
      <a href="#" onClick={clearFilter}>{be5.messages.table.clearFilter}</a>
    </div>
  }

  return null;
};

FilterUI.propTypes = propTypes;

export default FilterUI;
