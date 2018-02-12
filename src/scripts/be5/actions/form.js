import React          from 'react';
import be5            from '../be5';
import formService          from '../services/forms';

export default function(documentName, entity, query, operation, operationParams) {

  const params = {
    entity: entity,
    query: query || 'All records',
    operation: operation,
    values: {},
    operationParams: be5.net.paramString(operationParams)
  };

  formService.load(params, {documentName: documentName});
};
