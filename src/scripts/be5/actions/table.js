import React          from 'react';
import Tables         from '../services/tables';

export default function(documentName, entity, query, params) {

  const paramsObject = {
    entity: entity,
    query: query || 'All records',
    params: params,
    options: { embedded: false }
  };
  Tables.load(paramsObject, documentName);

};
