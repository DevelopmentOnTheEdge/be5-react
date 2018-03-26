import React          from 'react';
import changeDocument from '../core/changeDocument';
import {registerRoute} from '../core/routes'


const route = function(documentName)
{
  changeDocument(documentName, {type: 'uiPanel', value: {}});
};

registerRoute("uiPanel", route);

export default route;