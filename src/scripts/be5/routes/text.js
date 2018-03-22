import React          from 'react';
import changeDocument from '../core/changeDocument';
import {registerRoute} from '../core/routes'


const route = function(documentName, text)
{
  changeDocument(documentName, { value: text });
};

registerRoute("text", route);

export default route;