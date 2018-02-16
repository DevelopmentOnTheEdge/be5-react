import React          from 'react';
import changeDocument from '../core/changeDocument';
import actionsCollection from '../services/actionsCollection'


const action = function(documentName, text)
{
  changeDocument(documentName, { value: text });
};

actionsCollection.registerAction("text", action);

export default action;