import React          from 'react';
import changeDocument from '../core/changeDocument';
import {registerRoute} from '../core/routes'
import {createStaticValue} from '../utils/documentUtils';

const route = function(documentName, text)
{
  changeDocument(documentName, { value: createStaticValue(undefined, text) });
};

registerRoute("text", route);

export default route;