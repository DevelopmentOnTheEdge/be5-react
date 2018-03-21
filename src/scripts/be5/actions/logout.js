import React          from 'react';
import be5            from '../be5'
import bus            from '../core/bus';
import forms          from '../services/forms';
import actionsCollection from '../services/actionsCollection'


const action = function() {
  forms.load(forms.getOperationParams('form/users/All records/Logout'), {
    documentName: be5.mainDocumentName, onSuccess: function (result, applyParams) {
      //not used document.cookie = 'be_auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    }

  });

};

actionsCollection.registerAction("logout", action);

export default action;