import React          from 'react';
import be5            from '../be5';
import changeDocument from '../core/changeDocument';
import QueryBuilder from '../components/queryBuilder';

export default function(documentName, params)
{
  const requestParams = {
    params: params,
    _ts_: new Date().getTime()
  };

  be5.net.request('queryBuilder', requestParams, data => {
    changeDocument(documentName, { component: QueryBuilder, value: data })
  });
};
