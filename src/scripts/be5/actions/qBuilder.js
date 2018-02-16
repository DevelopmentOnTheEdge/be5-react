import React          from 'react';
import be5            from '../be5';
import changeDocument from '../core/changeDocument';
import QueryBuilder   from '../components/QueryBuilder';
import actionsCollection from '../services/actionsCollection'


const action = function(documentName, params)
{
  const requestParams = {
    values: be5.net.paramString(params),
    _ts_: new Date().getTime()
  };

  be5.net.request('queryBuilder', requestParams, data => {
    changeDocument(documentName, { component: QueryBuilder, value: Object.assign({}, data, {params: be5.net.paramString(params)}) })
  });
};

actionsCollection.registerAction("qBuilder", action);

export default action;