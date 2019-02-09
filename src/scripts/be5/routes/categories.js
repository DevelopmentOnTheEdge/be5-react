import React from 'react';
import be5 from '../be5';
import changeDocument from '../core/changeDocument';
import {registerRoute} from '../core/registers/routes'
import {createStaticValue} from "../utils/documentUtils";
import {ENTITY_NAME_PARAM} from "../constants";


const route = function (frontendParams, entity) {
  const requestParams = {
    [ENTITY_NAME_PARAM]: entity
  };

  be5.net.request('categories/forest/', requestParams, data => {
    changeDocument(frontendParams.documentName, {
      value: createStaticValue('', "<pre>" + JSON.stringify(data, null, 4) + "</pre>")
    })
  });
};

registerRoute("categories", route);

export default route;
