import React          from 'react';
import be5            from '../be5';
import changeDocument from '../core/changeDocument';
import StaticPage from '../components/staticPage';

export default function(documentName, page)
{
  const requestParams = {
    _ts_: new Date().getTime()
  };

  be5.net.request('static/' + page, requestParams, data => {
    changeDocument(documentName, { component: StaticPage, value: data })
  });
};
