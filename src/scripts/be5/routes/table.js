import React             from 'react';
import {loadTable} from "../services/tables";
import {registerRoute} from '../core/routes'


const route = function(documentName, entity, query, params) {

  const paramsObject = {
    entity: entity,
    query: query || 'All records',
    params: params
  };
  loadTable(paramsObject, {documentName: documentName});

};

registerRoute("table", route);

export default route;