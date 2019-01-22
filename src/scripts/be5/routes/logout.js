import React from 'react';
import {openOperationByUrl} from '../services/forms';
import {registerRoute} from '../core/routes'
import {MAIN_DOCUMENT} from "../constants";


const route = function() {
  openOperationByUrl('form/users/All records/Logout', {documentName: MAIN_DOCUMENT});
};

registerRoute("logout", route);

export default route;
