import React          from 'react';
import be5            from '../be5';
import changeDocument from '../core/changeDocument';
import {registerRoute} from '../core/routes'
import {createStaticValue} from '../utils/documentUtils';

const route = function(documentName, text)
{
  if(documentName === be5.MAIN_DOCUMENT)be5.ui.setTitle();
  changeDocument(documentName, { value: createStaticValue(undefined, text) });
};

registerRoute("text", route);

export default route;
