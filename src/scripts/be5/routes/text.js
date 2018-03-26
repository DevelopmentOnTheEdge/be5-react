import React          from 'react';
import changeDocument from '../core/changeDocument';
import {registerRoute} from '../core/routes'
import StaticPage from "../components/StaticPage";


const route = function(documentName, text)
{
  changeDocument(documentName, { value: StaticPage.createValue(undefined, text) });
};

registerRoute("text", route);

export default route;