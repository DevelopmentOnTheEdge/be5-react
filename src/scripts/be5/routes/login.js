import React          from 'react';
import be5            from '../be5';
import forms          from '../services/forms';
import {registerRoute} from '../core/routes'


const route = function()
{
  forms.load(forms.getOperationParams('form/users/All records/Login'), {
    documentName: be5.MAIN_MODAL_DOCUMENT
  });
};

registerRoute("login", route);

export default route;