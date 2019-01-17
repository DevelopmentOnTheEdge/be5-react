import React             from 'react';
import forms, {getOperationParams} from '../services/forms';
import {registerRoute} from '../core/routes'


const route = function(documentName, entity, query, operation, contextParams) {
  const formParams = {
    entity: entity,
    query: query || 'All records',
    operation: operation,
    contextParams: contextParams || {}
  };
  forms.load(getOperationParams(formParams), {documentName: documentName});
};

registerRoute("form", route);

export default route;
