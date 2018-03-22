import React             from 'react';
import forms             from '../services/forms';
import {registerRoute} from '../core/routes'


const route = function(documentName, entity, query, operation, operationParams) {

  const params = {
    entity: entity,
    query: query || 'All records',
    operation: operation,
    values: {},
    operationParams: operationParams
  };

  forms.load(params, {documentName: documentName});
};

registerRoute("form", route);

export default route;