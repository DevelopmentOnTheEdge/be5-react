import React          from 'react';
import be5            from '../be5';
import Forms          from '../services/forms';

export default function(documentName, entity, query, operation, operationParams) {

  Forms.load(documentName, entity, query, operation, operationParams);

};
