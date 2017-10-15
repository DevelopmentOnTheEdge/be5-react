import React          from 'react';
import be5            from '../be5';
import changeDocument from '../core/changeDocument';
import QueryBuilder from '../components/queryBuilder';

export default function(documentName, page)
{
  const requestParams = {
    _ts_: new Date().getTime()
  };

  //be5.net.request('qBuilder', requestParams, data => {
    changeDocument(documentName, { component: QueryBuilder, value: {} })
  //});
};
