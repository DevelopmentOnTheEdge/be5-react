import React from 'react';
import {loadTable} from "../services/tables";
import {registerRoute} from '../core/registers/routes'
import {CONTEXT_PARAMS, ENTITY_NAME_PARAM, QUERY_NAME_PARAM} from "../constants";


const route = function (frontendParams, entity, query, params) {

  const paramsObject = {
    [ENTITY_NAME_PARAM]: entity,
    [QUERY_NAME_PARAM]: query || 'All records',
    [CONTEXT_PARAMS]: params || {}
  };
  loadTable(paramsObject, frontendParams);
};

registerRoute("table", route);

export default route;
