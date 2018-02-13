import React          from 'react';
import Tables         from '../services/tables';

export default function(documentName, entity, query, params) {

  const paramsObject = {
    entity: entity,
    query: query || 'All records',
    params: params
  };
  Tables.load(paramsObject, documentName);

};
