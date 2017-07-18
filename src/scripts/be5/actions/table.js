import React          from 'react';
import changeDocument from '../core/changeDocument';
import Tables         from '../services/tables';

export default function(entity, query, params) {

  Tables.load({ entity: entity, query: query || 'All records', params: params, options: { embedded: false } }, changeDocument);

};

//Could not configure in the library
//import React          from 'react';
//import changeDocument from '../core/changeDocument';
//import load           from 'bundle-loader?lazy!../services/tables';
//
//export default function(entity, query, params) {
//
//  load((Tables) => {
//    Tables.default.load({ entity: entity, query: query || 'All records', params: params, options: { embedded: false } }, changeDocument);
//  });
//
//};
