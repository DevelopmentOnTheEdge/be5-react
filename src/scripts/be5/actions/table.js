import React          from 'react';
import Tables         from '../services/tables';
import actionsCollection from '../services/actionsCollection'


const action = function(documentName, entity, query, params) {

  const paramsObject = {
    entity: entity,
    query: query || 'All records',
    params: params
  };
  Tables.load(paramsObject, documentName);

};

actionsCollection.registerAction("table", action);

export default action;