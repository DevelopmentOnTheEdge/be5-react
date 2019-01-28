import React from 'react';
import be5 from '../be5';
import changeDocument from '../core/changeDocument';
import {registerRoute} from '../core/registers/routes'
import {createStaticValue} from '../utils/documentUtils';
import {MAIN_DOCUMENT} from "../constants";

const route = function(documentName, text)
{
  if(documentName === MAIN_DOCUMENT)be5.ui.setTitle();
  const data = createStaticValue(undefined, text, {self: "text/" + text});
  changeDocument(documentName, {value: data});
};

registerRoute("text", route);

export default route;
