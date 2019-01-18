import React from 'react';
import be5 from '../be5';
import changeDocument from '../core/changeDocument';
import {registerRoute} from '../core/routes'
import {MAIN_DOCUMENT} from "../constants";


const route = function(documentName, params)
{
  const requestParams = {
    contextParams: be5.net.paramString(params),
    _ts_: new Date().getTime()
  };

  be5.net.request('queryBuilder', requestParams, data => {
    if(documentName === MAIN_DOCUMENT)be5.ui.setTitle("Query Builder");
    changeDocument(documentName, { value: Object.assign({}, data, {params: be5.net.paramString(params)}) })
  });
};

registerRoute("queryBuilder", route);

export default route;
