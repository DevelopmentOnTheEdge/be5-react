import './be5.js';
import {initBe5App, initOnLoad} from './be5init.js';
import {getDocumentStates, getDocumentState, setDocumentState, clearDocumentState} from './services/documentStates';
//import be5styles from './be5styles.js';
import preconditions from './utils/preconditions.js';
import {
  createStaticValue,
  getModelByID,
  getResourceByType,
  getResourceByID,
  getSelfUrl,
  loadDocumentByUrl,
  addUrlHandlers,
  openInModal,
  processHashUrl,
  processHashUrlForDocument
} from './utils/documentUtils.js';
import {arraysEqual, createPageValue, registerPage} from './utils/utils.js';
// core
import bus from './core/bus.js';
import changeDocument from './core/changeDocument.js';
import {getAllDocumentTypes, getDocument, registerDocument} from './core/registers/documents.js';
import {getAllRoutes, getRoute, registerRoute} from "./core/registers/routes";
import {getAllTypes, getTableBox, registerTableBox} from "./core/registers/tableBoxes";
// actions
import formAction from './routes/form.js';
import loadingAction from './routes/loading.js';
import loginAction from './routes/login.js';
import logoutAction from './routes/logout.js';
import queryBuilderAction from './routes/queryBuilder.js';
import staticAction from './routes/static.js';
import tableAction from './routes/table.js';
import textAction from './routes/text.js';
// services
import action from './services/actions.js';
import {
  fetchOperationByUrl,
  getOperationInfoFromUrl,
  loadOperation,
  openOperationByUrl,
  openOperationByUrlWithValues,
  submitOperation
} from './services/forms.js';

import {fetchTableByUrl, loadTable, loadTableByUrl, updateTable} from './services/tables.js';
// store
import createBaseStore from './store';
import rootReducer from './store/reducers';
import userReduser from './store/reducers/user.reduser';
import menuReduser from './store/reducers/menu.reduser';

import {fetchUserInfo, toggleRoles, updateUserInfo} from './store/actions/user.actions'
import {fetchMenu} from './store/actions/menu.actions'

import {getCurrentRoles, getUser} from './store/selectors/user.selectors'
import {getMenu} from './store/selectors/menu.selectors'

import {executeFrontendActions, getActionsMap} from './services/frontendActions'
import FrontendAction from './services/model/FrontendAction'
import {getBackAction, getBackOrOpenDefaultRouteAction} from "./utils/utils";
import {addFilterParams, getFilterParams, initFilterParams} from "./utils/filterUtils";

export * from './constants.js';

export {
  initBe5App, initOnLoad,
  getDocumentStates, getDocumentState, setDocumentState, clearDocumentState,
  preconditions,
  arraysEqual, createPageValue, registerPage,
  getSelfUrl, getModelByID, createStaticValue, getResourceByType, getResourceByID, processHashUrl,
  processHashUrlForDocument,
  openInModal, addUrlHandlers, loadDocumentByUrl,

  // core
  bus,
  changeDocument,
  getDocument, registerDocument, getAllDocumentTypes,
  registerRoute, getRoute, getAllRoutes,
  registerTableBox, getTableBox, getAllTypes,

  // store
  createBaseStore, rootReducer, userReduser, menuReduser,
  toggleRoles, fetchUserInfo, updateUserInfo,
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

  loadOperation, submitOperation, getOperationInfoFromUrl,
  openOperationByUrl, openOperationByUrlWithValues, fetchOperationByUrl,

  loadTable, loadTableByUrl, updateTable, fetchTableByUrl,

  executeFrontendActions, getActionsMap, getBackOrOpenDefaultRouteAction, getBackAction,
  FrontendAction,

  getFilterParams, addFilterParams, initFilterParams
}
