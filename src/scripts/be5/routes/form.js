import React from 'react';
import {loadForm} from '../services/forms';
import {registerRoute} from '../core/registers/routes'
import {
  CONTEXT_PARAMS,
  ENTITY_NAME_PARAM,
  LONG_TIME_OPERATION,
  OPERATION_NAME_PARAM,
  QUERY_NAME_PARAM
} from "../constants";
import {isTrueValueParam} from "../utils/utils";
import bus from "../core/bus";


const route = function (frontendParams, entity, query, operation, contextParams) {
  const operationInfo = {
    [ENTITY_NAME_PARAM]: entity,
    [QUERY_NAME_PARAM]: query || 'All records',
    [OPERATION_NAME_PARAM]: operation,
    [CONTEXT_PARAMS]: JSON.stringify(contextParams || {})
  };
  if (contextParams && isTrueValueParam(contextParams[LONG_TIME_OPERATION])) {
    bus.fire('showMenu', {show: false})
    bus.fire('showOperationPopup', {show: true})
  }
  loadForm(operationInfo, frontendParams);
};

registerRoute("form", route);

export default route;
