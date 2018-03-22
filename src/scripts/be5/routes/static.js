import React          from 'react';
import be5            from '../be5';
import changeDocument from '../core/changeDocument';
import {registerRoute} from '../core/routes'


const route = function(documentName, page)
{
  const requestParams = {
    _ts_: new Date().getTime()
  };

  be5.net.request('static/' + page, requestParams, data => {
    changeDocument(documentName, { value: data })
  });
};

registerRoute("static", route);

export default route;