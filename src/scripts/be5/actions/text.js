import React          from 'react';
import changeDocument from '../core/changeDocument';


export default function(documentName, text)
{
  changeDocument(documentName, { value: text });
};
