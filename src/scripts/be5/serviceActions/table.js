import React             from 'react';
import tables            from '../services/tables';
import actionsCollection from '../services/actionsCollection'


const action = function(documentName, entity, query, params) {

  const paramsObject = {
    entity: entity,
    query: query || 'All records',
    params: params
  };
  tables.load(paramsObject, documentName);

};

actionsCollection.registerAction("table", action);

export default action;