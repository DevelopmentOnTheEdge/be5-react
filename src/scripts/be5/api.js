import be5 from './be5.js';
import be5init from './be5init.js';
//import be5styles from './be5styles.js';
import * as constants from './constants.js';
import preconditions from './utils/preconditions.js';
import {getSelfUrl, getModelByID, createStaticValue, getResourceByID, setUrlForHash, openInModal} from './utils/documentUtils.js';
import {arraysEqual} from './utils/utils.js';

// core
import bus from './core/bus.js';
import changeDocument from './core/changeDocument.js';
import {getDocument, registerDocument, getAllDocumentTypes} from './core/documents.js';
import {registerRoute,getRoute,getAllRoutes} from "./core/routes";

// actions
import formAction      from './routes/form.js';
import loadingAction   from './routes/loading.js';
import loginAction     from './routes/login.js';
import logoutAction    from './routes/logout.js';
import queryBuilderAction  from './routes/queryBuilder.js';
import staticAction    from './routes/static.js';
import tableAction     from './routes/table.js';
import textAction      from './routes/text.js';

// services
import action            from './services/actions.js';
import {
  loadOperation, submitOperation, getOperationParams,
  openOperationByUrl, openOperationByUrlWithValues, fetchOperationByUrl
} from './services/forms.js';

import {loadTable, updateTable, fetchTableByUrl} from './services/tables.js';
import {updateLocationHashIfNeeded} from './services/documents.js';

// store
import createBaseStore from './store';
import rootReducer     from './store/reducers';
import userReduser     from './store/reducers/user.reduser';
import menuReduser     from './store/reducers/menu.reduser';

import {toggleRoles,fetchUserInfo,updateUserInfo} from './store/actions/user.actions'
import {fetchMenu} from './store/actions/menu.actions'

import {getCurrentRoles, getUser} from './store/selectors/user.selectors'
import {getMenu} from './store/selectors/menu.selectors'

import {executeFrontendActions, getActionsMap, getBackOrOpenDefaultRouteAction} from './services/frontendActions'
import FrontendAction from './services/model/FrontendAction'


export {
  be5init,
  constants,
  preconditions,
  arraysEqual,
  getSelfUrl, getModelByID, createStaticValue, getResourceByID, setUrlForHash, openInModal,

  // core
  bus,
  changeDocument,
  getDocument, registerDocument, getAllDocumentTypes,
  registerRoute, getRoute, getAllRoutes,

  // store
  createBaseStore, rootReducer, userReduser, menuReduser,
  toggleRoles,fetchUserInfo,updateUserInfo,
  fetchMenu,
  getCurrentRoles, getUser,
  getMenu,

  // actions
  formAction,
  loadingAction,
  loginAction,
  logoutAction,
  queryBuilderAction,
  staticAction,
  tableAction,
  textAction,

  // services
  action,

  loadOperation, submitOperation, getOperationParams,
  openOperationByUrl, openOperationByUrlWithValues, fetchOperationByUrl,

  loadTable, updateTable, fetchTableByUrl,

  updateLocationHashIfNeeded,

  executeFrontendActions, getActionsMap, getBackOrOpenDefaultRouteAction,
  FrontendAction
}
