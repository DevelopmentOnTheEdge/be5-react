import React from 'react';
import {openOperationByUrl} from '../services/forms';
import {registerRoute} from '../core/registers/routes'
import {MAIN_MODAL_DOCUMENT} from "../constants";


const route = function () {
  openOperationByUrl('form/users/All records/Login', {documentName: MAIN_MODAL_DOCUMENT});
};

registerRoute("login", route);

export default route;
