import React from 'react';
import be5 from '../be5';
import changeDocument from '../core/changeDocument';
import {registerRoute} from '../core/routes'
import {CONTEXT_PARAMS, MAIN_DOCUMENT, TIMESTAMP_PARAM} from "../constants";
import {initBeSqlEditor} from "../utils/BeSqlMode";


const route = function(documentName, params)
{
  const requestParams = {
    [CONTEXT_PARAMS]: be5.net.paramString(params),
    [TIMESTAMP_PARAM]: new Date().getTime()
  };

  initBeSqlEditor(() => {
    be5.net.request('queryBuilder', requestParams, data => {
      if (documentName === MAIN_DOCUMENT) be5.ui.setTitle("Query Builder");
      changeDocument(documentName, { value: Object.assign({}, data, {params: be5.net.paramString(params)}) })
    });
  });
};

registerRoute("queryBuilder", route);

export default route;
