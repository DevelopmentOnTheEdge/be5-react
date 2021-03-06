import React from 'react';
import be5 from '../be5';
import changeDocument from '../core/changeDocument';
import {registerRoute} from '../core/registers/routes'
import {MAIN_DOCUMENT} from "../constants";


const route = function (frontendParams, page) {
  const requestParams = {
    _ts_: new Date().getTime()
  };

  be5.net.request('static/' + page, requestParams, json => {
    if (frontendParams.documentName === MAIN_DOCUMENT) be5.ui.setTitle(json.data.attributes.title);
    changeDocument(frontendParams.documentName, {value: json})
  }, error => {
    changeDocument(frontendParams.documentName, {value: error});
  });
};

registerRoute("static", route);

export default route;
