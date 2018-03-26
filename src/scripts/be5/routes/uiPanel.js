import React          from 'react';
import changeDocument from '../core/changeDocument';
import {registerRoute} from '../core/routes'


const route = function(documentName)
{
  changeDocument(documentName, {value: {}, frontendParams: {type: 'uiPanel'}});
};

registerRoute("uiPanel", route);

export default route;