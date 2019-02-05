import React from 'react';
import {loadForm} from '../services/forms';
import {registerRoute} from '../core/registers/routes'
import {CONTEXT_PARAMS, ENTITY_NAME_PARAM, OPERATION_NAME_PARAM, QUERY_NAME_PARAM} from "../constants";


const route = function (documentName, entity, query, operation, contextParams) {
  const operationInfo = {
    [ENTITY_NAME_PARAM]: entity,
    [QUERY_NAME_PARAM]: query || 'All records',
    [OPERATION_NAME_PARAM]: operation,
    [CONTEXT_PARAMS]: JSON.stringify(contextParams || {})
  };
  loadForm(operationInfo, {documentName: documentName});
};

registerRoute("form", route);

export default route;
