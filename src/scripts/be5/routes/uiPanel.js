import React          from 'react';
import changeDocument from '../core/changeDocument';
import {registerRoute} from '../core/routes'
import be5 from "../be5";


const route = function(documentName)
{
  if(documentName === be5.MAIN_DOCUMENT)be5.ui.setTitle("UI panel");
  changeDocument(documentName, {value: {}, frontendParams: {type: 'uiPanel'}});
};

registerRoute("uiPanel", route);

export default route;
