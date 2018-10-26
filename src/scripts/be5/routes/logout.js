import React from 'react';
import {openOperationByUrl} from '../services/forms';
import {registerRoute} from '../core/routes'
import {MAIN_DOCUMENT} from "../constants";


const route = function() {
  openOperationByUrl('form/users/All records/Logout', {
    documentName: MAIN_DOCUMENT, onSuccess: function (result, applyParams) {
      //not used document.cookie = 'be_auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    }

  });

};

registerRoute("logout", route);

export default route;
