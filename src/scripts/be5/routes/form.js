import React             from 'react';
import forms, {getOperationInfo} from '../services/forms';
import {registerRoute} from '../core/routes'


const route = function(documentName, entity, query, operation, contextParams) {
  const operationInfo = {
    entity: entity,
    query: query || 'All records',
    operation: operation,
    contextParams: contextParams || {}
  };
  forms.load(getOperationInfo(operationInfo), {documentName: documentName});
};

registerRoute("form", route);

export default route;
