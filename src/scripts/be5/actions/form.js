import React             from 'react';
import forms             from '../services/forms';
import actionsCollection from '../services/actionsCollection'


const action = function(documentName, entity, query, operation, operationParams) {

  const params = {
    entity: entity,
    query: query || 'All records',
    operation: operation,
    values: {},
    operationParams: operationParams
  };

  forms.load(params, {documentName: documentName});
};

actionsCollection.registerAction("form", action);

export default action;