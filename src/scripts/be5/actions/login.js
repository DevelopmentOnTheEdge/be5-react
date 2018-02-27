import React          from 'react';
import be5            from '../be5';
import forms          from '../services/forms';
import actionsCollection from '../services/actionsCollection'


const action = function()
{
  forms.load(forms.getOperationParams('form/users/All records/Login'), {
    documentName: be5.mainModalDocumentName
  });
};

actionsCollection.registerAction("login", action);

export default action;
