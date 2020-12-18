import be5 from '../be5';
import bus from '../core/bus';
import Preconditions from '../utils/preconditions';
import changeDocument from '../core/changeDocument';
import {updateUserInfo} from "../store/actions/user.actions";
import {updateMenu} from "../store/actions/menu.actions";
import {UPDATE_USER_INFO} from "../store/constants/user.constants";
import {
  CLOSE_MAIN_MODAL,
  CONTEXT_PARAMS,
  DOCUMENT_REFRESH_SUFFIX,
  DOWNLOAD_OPERATION,
  GO_BACK,
  HIDE_MENU,
  MAIN_DOCUMENT,
  OPEN_DEFAULT_ROUTE,
  OPEN_NEW_WINDOW,
  REDIRECT,
  REFRESH_DOCUMENT,
  REFRESH_MENU,
  REFRESH_PARENT_DOCUMENT,
  SET_URL,
  SHOW_MENU,
  SUCCESS_ALERT,
  UPDATE_DOCUMENT,
  UPDATE_PARENT_DOCUMENT
} from "../constants";
import {clearDocumentState} from "./documentStates";

export const executeFrontendActions = (actionsArrayOrOneObject, frontendParams) => {
  const documentName = frontendParams.documentName;

  const actions = getActionsMap(actionsArrayOrOneObject);

  if (actions.hasOwnProperty(CLOSE_MAIN_MODAL)) {
    bus.fire("mainModalClose");
  }

  if (actions.hasOwnProperty(HIDE_MENU)) {
    bus.fire('showMenu', {show: false})
  }

  if (actions.hasOwnProperty(SHOW_MENU)) {
    bus.fire('showMenu', {show: true})
  }

  if (actions.hasOwnProperty(REFRESH_MENU)) {
    be5.store.dispatch(updateMenu(actions[REFRESH_MENU]));
  }

  if (actions[SUCCESS_ALERT]) {
    bus.fire("alert", {msg: actions[SUCCESS_ALERT], type: 'success'});
  }

  if (actions[UPDATE_USER_INFO] !== undefined) {
    be5.store.dispatch(updateUserInfo(actions[UPDATE_USER_INFO]));
  }

  if (actions[REDIRECT] !== undefined) {
    redirect(actions[REDIRECT], frontendParams);
  }

  if (actions[OPEN_NEW_WINDOW] !== undefined) {
    window.open(actions[OPEN_NEW_WINDOW]);
  }

  if (actions[SET_URL]) {
    redirect(actions[SET_URL], {documentName: MAIN_DOCUMENT})
  }

  if (actions.hasOwnProperty(OPEN_DEFAULT_ROUTE)) {
    redirect("", {documentName: MAIN_DOCUMENT})
  }

  if (actions.hasOwnProperty(GO_BACK)) {
    if (actions[GO_BACK] !== undefined && documentName !== MAIN_DOCUMENT) {
      redirect(actions[GO_BACK], frontendParams);
    } else {
      window.history.back();
    }
  }

  if (actions[UPDATE_PARENT_DOCUMENT] !== undefined) {
    const tableJson = Object.assign({}, actions[UPDATE_PARENT_DOCUMENT], {meta: {_ts_: new Date().getTime()}});
    changeDocument(frontendParams.parentDocumentName || documentName, {value: tableJson});
  }

  if (actions[UPDATE_DOCUMENT] !== undefined) {
    const tableJson = Object.assign({}, actions[UPDATE_DOCUMENT], {meta: {_ts_: new Date().getTime()}});
    changeDocument(documentName, {value: tableJson});
  }

  if (actions.hasOwnProperty(REFRESH_DOCUMENT)) {
    if (actions[REFRESH_DOCUMENT] !== undefined) {
      bus.fire(actions[REFRESH_DOCUMENT] + DOCUMENT_REFRESH_SUFFIX);
    } else {
      bus.fire(frontendParams.documentName + DOCUMENT_REFRESH_SUFFIX);
    }
  }

  if (actions.hasOwnProperty(REFRESH_PARENT_DOCUMENT)) {
    if (frontendParams.parentDocumentName !== undefined) {
      bus.fire(frontendParams.parentDocumentName + DOCUMENT_REFRESH_SUFFIX);
    }
  }

  if (actions[DOWNLOAD_OPERATION] !== undefined) {
    const operationRequestParams = actions[DOWNLOAD_OPERATION];
    let url = "";
    for (let key in operationRequestParams) {
      if (url !== "") {
        url += "&";
      }
      if (key === CONTEXT_PARAMS) {
        url += CONTEXT_PARAMS + "=" + encodeURIComponent(be5.net.paramString(operationRequestParams[CONTEXT_PARAMS]));
      } else {
        url += key + "=" + encodeURIComponent(operationRequestParams[key]);
      }
    }
    window.location = "/api/downloadOperation?" + url;
  }

  bus.fire("executeFrontendActions", {actions, frontendParams});
};

function redirect(url, frontendParams) 
{
  /*Open directly*/ 
  if (url.startsWith("http://") || 
      url.startsWith("https://") || 
      url.startsWith("ftp://") || 
      url.startsWith("/"))
  {
    window.location.href = url;
  }
  else 
  {
    clearDocumentState('#!' + url);
    if (frontendParams.documentName === MAIN_DOCUMENT) {
      bus.fire("mainModalClose");
      be5.url.open({documentName: MAIN_DOCUMENT}, '#!' + url);
    } else {
      be5.url.process(frontendParams, '#!' + url);
    }
  }
}

export const getActionsMap = (actionsArrayOrOneObject) => {
  let map = {};
  if (Array.isArray(actionsArrayOrOneObject)) {
    for (let i = 0; i < actionsArrayOrOneObject.length; i++) {
      Preconditions.passed(typeof actionsArrayOrOneObject[i].type === "string",
        "Actions must be object with string 'type' field: " + actionsArrayOrOneObject);

      map[actionsArrayOrOneObject[i].type] = actionsArrayOrOneObject[i].value;
    }
  }
  else {
    Preconditions.passed(typeof actionsArrayOrOneObject.type === "string",
      "Actions must be object with string 'type' field: " + actionsArrayOrOneObject);

    map[actionsArrayOrOneObject.type] = actionsArrayOrOneObject.value;
  }

  return map;
};


