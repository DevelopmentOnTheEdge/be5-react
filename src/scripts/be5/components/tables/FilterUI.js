import React from 'react';
import be5 from "../../be5";
import {getFilterParams} from "../../utils/filterUtils";
import {clearTableFilter, loadTable} from "../../services/tables";
import {
  CONTEXT_PARAMS, ENTITY_NAME_PARAM, LIMIT, OFFSET, ORDER_COLUMN, ORDER_DIR,
  QUERY_NAME_PARAM
} from "../../constants";


const positionsParamNames = [ORDER_COLUMN, ORDER_DIR, OFFSET, LIMIT];
const propTypes = {};

const FilterUI = ({data, entity, query, params, frontendParams}) => {
  const filterParams = getFilterParams(params);

  function clearFilter(e) {
    e.preventDefault();
    const searchPresets = params['_search_presets_'] === undefined ? [] : params['_search_presets_'].split(',');
    const newParams = {};
    searchPresets.forEach(x => newParams[x] = params[x]);

    clearTableFilter(entity, query, newParams);
    const paramsObject = {
      [ENTITY_NAME_PARAM]: entity,
      [QUERY_NAME_PARAM]: query || 'All records',
      [CONTEXT_PARAMS]: newParams
    };
    loadTable(paramsObject, frontendParams);
  }

  function getOperationParamsInfo() {
    if (data && data.attributes.filterInfo && data.attributes.filterInfo.length > 0) {
      return data.attributes.filterInfo.map(r => r.key ? r.key + ': ' + r.value : r.value).join(', ');
    }
    return '';
  }

  let positionsParamCount = 0;
  positionsParamNames.forEach(x => {
    if (filterParams[x] !== undefined) positionsParamCount++
  });
  if (Object.keys(filterParams).length > positionsParamCount) {
    return <div className="table-filter-ui mb-2">
      <strong>{be5.messages.table.filter + ': '}</strong>
      <span>{getOperationParamsInfo()}</span>{' '}
      <a href="#" onClick={clearFilter}>{be5.messages.table.clearFilter}</a>
    </div>
  }

  return null;
};

FilterUI.propTypes = propTypes;

export default FilterUI;
