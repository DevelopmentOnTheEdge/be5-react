import React, { Component, createContext, forwardRef, createElement, Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, Nav, NavItem, NavLink, Navbar, NavbarToggler, Collapse, UncontrolledTooltip, Card, CardBody, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import classNames$1 from 'classnames';
import { connect } from 'react-redux';
import 'formdata-polyfill';
import SplitPane from 'react-split-pane';
import Alert from 'react-s-alert';
import PropertySet, { PropertyInput, Property } from 'beanexplorer-react';
import JsonPointer from 'json-pointer';
import Transition from 'react-transition-group/Transition';
import numberFormatter from 'number-format.js';
import { createPortal, findDOMNode } from 'react-dom';
import Pagination from 'react-js-pagination';
import Plotly from 'plotly.js-basic-dist-min';
import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get initBe5App () { return initBe5App; },
  get initOnLoad () { return initOnLoad; },
  get getDocumentStates () { return getDocumentStates; },
  get getDocumentState () { return getDocumentState; },
  get setDocumentState () { return setDocumentState; },
  get clearDocumentState () { return clearDocumentState; },
  get preconditions () { return Preconditions; },
  get arraysEqual () { return arraysEqual; },
  get createPageValue () { return createPageValue; },
  get registerPage () { return registerPage; },
  get getSelfUrl () { return getSelfUrl; },
  get getModelByID () { return getModelByID; },
  get createStaticValue () { return createStaticValue; },
  get getResourceByType () { return getResourceByType; },
  get getResourceByID () { return getResourceByID; },
  get processHashUrl () { return processHashUrl; },
  get processHashUrlForDocument () { return processHashUrlForDocument; },
  get openInModal () { return openInModal; },
  get addUrlHandlers () { return addUrlHandlers; },
  get loadDocumentByUrl () { return loadDocumentByUrl; },
  get bus () { return bus; },
  get changeDocument () { return changeDocument; },
  get getDocument () { return getDocument; },
  get registerDocument () { return registerDocument; },
  get getAllDocumentTypes () { return getAllDocumentTypes; },
  get registerRoute () { return registerRoute; },
  get getRoute () { return getRoute; },
  get getAllRoutes () { return getAllRoutes; },
  get registerTableBox () { return registerTableBox; },
  get getTableBox () { return getTableBox; },
  get getAllTypes () { return getAllTypes; },
  get createBaseStore () { return createBaseStore; },
  get rootReducer () { return index$1; },
  get userReduser () { return users; },
  get menuReduser () { return users$1; },
  get toggleRoles () { return toggleRoles; },
  get fetchUserInfo () { return fetchUserInfo; },
  get updateUserInfo () { return updateUserInfo; },
  get fetchMenu () { return fetchMenu; },
  get updateMenu () { return updateMenu; },
  get getCurrentRoles () { return getCurrentRoles; },
  get getUser () { return getUser; },
  get getMenu () { return getMenu; },
  get formAction () { return route$1; },
  get loadingAction () { return route; },
  get loginAction () { return route$2; },
  get logoutAction () { return route$3; },
  get queryBuilderAction () { return route$6; },
  get staticAction () { return route$4; },
  get tableAction () { return route$5; },
  get textAction () { return route$7; },
  get action () { return actions; },
  get loadOperation () { return loadOperation; },
  get submitOperation () { return submitOperation; },
  get getOperationInfoFromUrl () { return getOperationInfoFromUrl; },
  get openOperationByUrl () { return openOperationByUrl; },
  get openOperationByUrlWithValues () { return openOperationByUrlWithValues; },
  get fetchOperationByUrl () { return fetchOperationByUrl; },
  get loadTable () { return loadTable; },
  get loadTableByUrl () { return loadTableByUrl; },
  get updateTable () { return updateTable; },
  get fetchTableByUrl () { return fetchTableByUrl; },
  get executeFrontendActions () { return executeFrontendActions; },
  get getActionsMap () { return getActionsMap; },
  get getBackOrOpenDefaultRouteAction () { return getBackOrOpenDefaultRouteAction; },
  get getBackAction () { return getBackAction; },
  get FrontendAction () { return FrontendAction; },
  get getFilterParams () { return getFilterParams; },
  get addFilterParams () { return addFilterParams; },
  get initFilterParams () { return initFilterParams; },
  get API_URL_PREFIX () { return API_URL_PREFIX; },
  get DEFAULT_VIEW () { return DEFAULT_VIEW; },
  get ROLE_ADMINISTRATOR () { return ROLE_ADMINISTRATOR; },
  get ROLE_SYSTEM_DEVELOPER () { return ROLE_SYSTEM_DEVELOPER; },
  get ROLE_GUEST () { return ROLE_GUEST; },
  get SET_URL () { return SET_URL; },
  get REDIRECT () { return REDIRECT; },
  get OPEN_DEFAULT_ROUTE () { return OPEN_DEFAULT_ROUTE; },
  get OPEN_NEW_WINDOW () { return OPEN_NEW_WINDOW; },
  get GO_BACK () { return GO_BACK; },
  get CLOSE_MAIN_MODAL () { return CLOSE_MAIN_MODAL; },
  get SUCCESS_ALERT () { return SUCCESS_ALERT; },
  get UPDATE_DOCUMENT () { return UPDATE_DOCUMENT; },
  get UPDATE_PARENT_DOCUMENT () { return UPDATE_PARENT_DOCUMENT; },
  get REFRESH_DOCUMENT () { return REFRESH_DOCUMENT; },
  get REFRESH_PARENT_DOCUMENT () { return REFRESH_PARENT_DOCUMENT; },
  get REFRESH_MENU () { return REFRESH_MENU; },
  get SEARCH_PARAM () { return SEARCH_PARAM; },
  get SEARCH_PRESETS_PARAM () { return SEARCH_PRESETS_PARAM; },
  get MAIN_DOCUMENT () { return MAIN_DOCUMENT; },
  get MAIN_MODAL_DOCUMENT () { return MAIN_MODAL_DOCUMENT; },
  get DOCUMENT_REFRESH_SUFFIX () { return DOCUMENT_REFRESH_SUFFIX; },
  get DOWNLOAD_OPERATION () { return DOWNLOAD_OPERATION; },
  get RELOAD_CONTROL_NAME () { return RELOAD_CONTROL_NAME; },
  get SELECTED_ROWS () { return SELECTED_ROWS; },
  get TIMESTAMP_PARAM () { return TIMESTAMP_PARAM; },
  get ENTITY_NAME_PARAM () { return ENTITY_NAME_PARAM; },
  get QUERY_NAME_PARAM () { return QUERY_NAME_PARAM; },
  get OPERATION_NAME_PARAM () { return OPERATION_NAME_PARAM; },
  get CONTEXT_PARAMS () { return CONTEXT_PARAMS; },
  get OFFSET () { return OFFSET; },
  get LIMIT () { return LIMIT; },
  get ORDER_COLUMN () { return ORDER_COLUMN; },
  get ORDER_DIR () { return ORDER_DIR; },
  get DEFAULT_TABLE_BOX () { return DEFAULT_TABLE_BOX; },
  get COLUMN_SETTINGS () { return COLUMN_SETTINGS; },
  get QUERY_SETTINGS () { return QUERY_SETTINGS; },
  get RECORDS_PER_PAGE_SETTINGS () { return RECORDS_PER_PAGE_SETTINGS; }
});

var createMandatoryArgumentError = function createMandatoryArgumentError(message) {
  return {
    name: 'MandatoryArgumentError',
    message: message
  };
};

var createArgumentEqualityError = function createArgumentEqualityError(message) {
  return {
    name: 'ArgumentEqualityError',
    message: message
  };
};

var Preconditions = {
  passed: function passed(argument, message) {
    if (!argument) {
      console.trace();
      throw createMandatoryArgumentError(message || 'argument is missing');
    }

    return argument;
  },
  eq: function eq(arg1, arg2, message) {
    if (arg1 !== arg2) {
      console.trace();
      throw createArgumentEqualityError(message || "".concat(arg1, " should be equal to ").concat(arg2));
    }
  }
};

var API_URL_PREFIX = '/api/';
var DEFAULT_VIEW = 'All records';
var ROLE_ADMINISTRATOR = "Administrator";
var ROLE_SYSTEM_DEVELOPER = "SystemDeveloper";
var ROLE_GUEST = "Guest";
var SET_URL = 'SET_URL';
var REDIRECT = 'REDIRECT';
var OPEN_DEFAULT_ROUTE = 'OPEN_DEFAULT_ROUTE';
var OPEN_NEW_WINDOW = 'OPEN_NEW_WINDOW';
var GO_BACK = 'GO_BACK';
var CLOSE_MAIN_MODAL = 'CLOSE_MAIN_MODAL';
var SUCCESS_ALERT = 'SUCCESS_ALERT';
var UPDATE_DOCUMENT = 'UPDATE_DOCUMENT';
var UPDATE_PARENT_DOCUMENT = 'UPDATE_PARENT_DOCUMENT';
var REFRESH_DOCUMENT = 'REFRESH_DOCUMENT';
var REFRESH_PARENT_DOCUMENT = 'REFRESH_PARENT_DOCUMENT';
var REFRESH_MENU = 'REFRESH_MENU';
var SEARCH_PARAM = "_search_";
var SEARCH_PRESETS_PARAM = "_search_presets_";
var MAIN_DOCUMENT = "MAIN_DOCUMENT";
var MAIN_MODAL_DOCUMENT = "MAIN_MODAL_DOCUMENT";
var DOCUMENT_REFRESH_SUFFIX = "_refresh";
var DOWNLOAD_OPERATION = "DOWNLOAD_OPERATION";
var RELOAD_CONTROL_NAME = "_reloadControl_";
var SELECTED_ROWS = "_selectedRows_";
var TIMESTAMP_PARAM = "_ts_";
var ENTITY_NAME_PARAM = "_en_";
var QUERY_NAME_PARAM = "_qn_";
var OPERATION_NAME_PARAM = "_on_";
var CONTEXT_PARAMS = "_params_";
var OFFSET = "_offset_";
var LIMIT = "_limit_";
var ORDER_COLUMN = "_orderColumn_";
var ORDER_DIR = "_orderDir_";
var DEFAULT_TABLE_BOX = "dataTable";
var COLUMN_SETTINGS = "be5columnSettings";
var QUERY_SETTINGS = "be5querySettings";
var RECORDS_PER_PAGE_SETTINGS = "recordsPerPage";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrontendAction = function FrontendAction(type, value) {
  _classCallCheck(this, FrontendAction);

  this.type = type;
  this.value = value;
};

var listeners = function () {
  var listenersObject = {};
  return function (key, replacement) {
    if (replacement) {
      listenersObject[key] = replacement;
    }

    if (!listenersObject[key]) {
      listenersObject[key] = [];
    }

    return listenersObject[key];
  };
}();

function listen(eventType, listener) {
  listeners(eventType).push(listener); //console.log("listen: " + eventType + " " + listener);
}
//  delete listeners(eventType);
//  //console.log("notListen: " + eventType + " " + listener);
//};

function fire(type) {
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  listeners(type).forEach(function (listener) {
    return listener(event);
  });
}

function replaceListeners(eventType, listener) {
  listeners(eventType, [listener]);
}
var bus = {
  /* function(eventType: string, listener: function(event: object)) */
  listen: listen,
  //notListen: notListen,

  /* function(type: string, event: object) */
  fire: fire,

  /* function(eventType: string, listener: function(event: object)) */
  replaceListeners: replaceListeners
};

var changeDocument = function changeDocument(documentName, value) {
  Preconditions.passed(documentName);
  bus.fire(documentName, value);
};

var UPDATE_USER_INFO = 'UPDATE_USER_INFO';
var SELECT_ROLES = 'SELECT_ROLES'; //LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
//LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
//LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

var fetchUserInfo = function fetchUserInfo() {
  return function (dispatch) {
    be5.net.request('userInfo', {}, function (data) {
      dispatch({
        type: UPDATE_USER_INFO,
        user: data
      });
    });
  };
};
var updateUserInfo = function updateUserInfo(data) {
  return {
    type: UPDATE_USER_INFO,
    user: data
  };
}; // function logout() {
//   userService.logout();
//   return { type: userConstants.LOGOUT };
// }

var toggleRoles = function toggleRoles(roles) {
  return function (dispatch) {
    be5.net.request('userInfo/selectRoles', {
      roles: roles
    }, function (data) {
      dispatch({
        type: UPDATE_USER_INFO,
        user: data
      });
    });
  };
};

var UPDATE_MENU = 'UPDATE_MENU';

var fetchMenu = function fetchMenu(path) {
  return function (dispatch) {
    be5.net.request(path, {}, function (data) {
      dispatch({
        type: UPDATE_MENU,
        data: data
      });
    });
  };
};
var updateMenu = function updateMenu(data) {
  return {
    type: UPDATE_MENU,
    data: data
  };
};

var states = {};
function getDocumentState(key) {
  return states[decodeURI(key)];
}
function setDocumentState(key, value) {
  states[decodeURI(key)] = value;
}
function getDocumentStates() {
  return states;
}
function clearDocumentState(key) {
  delete states[decodeURI(key)];
}

var executeFrontendActions = function executeFrontendActions(actionsArrayOrOneObject, frontendParams) {
  var documentName = frontendParams.documentName;
  var actions = getActionsMap(actionsArrayOrOneObject);

  if (actions.hasOwnProperty(CLOSE_MAIN_MODAL)) {
    bus.fire("mainModalClose");
  }

  if (actions.hasOwnProperty(REFRESH_MENU)) {
    be5.store.dispatch(updateMenu(actions[REFRESH_MENU]));
  }

  if (actions[SUCCESS_ALERT]) {
    bus.fire("alert", {
      msg: actions[SUCCESS_ALERT],
      type: 'success'
    });
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
    redirect(actions[SET_URL], {
      documentName: MAIN_DOCUMENT
    });
  }

  if (actions.hasOwnProperty(OPEN_DEFAULT_ROUTE)) {
    redirect("", {
      documentName: MAIN_DOCUMENT
    });
  }

  if (actions.hasOwnProperty(GO_BACK)) {
    if (actions[GO_BACK] !== undefined && documentName !== MAIN_DOCUMENT) {
      redirect(actions[GO_BACK], frontendParams);
    } else {
      window.history.back();
    }
  }

  if (actions[UPDATE_PARENT_DOCUMENT] !== undefined) {
    var tableJson = Object.assign({}, actions[UPDATE_PARENT_DOCUMENT], {
      meta: {
        _ts_: new Date().getTime()
      }
    });
    changeDocument(frontendParams.parentDocumentName || documentName, {
      value: tableJson
    });
  }

  if (actions[UPDATE_DOCUMENT] !== undefined) {
    var _tableJson = Object.assign({}, actions[UPDATE_DOCUMENT], {
      meta: {
        _ts_: new Date().getTime()
      }
    });

    changeDocument(documentName, {
      value: _tableJson
    });
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
    var operationRequestParams = actions[DOWNLOAD_OPERATION];
    var url = "";

    for (var key in operationRequestParams) {
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

  bus.fire("executeFrontendActions", {
    actions: actions,
    frontendParams: frontendParams
  });
};

function redirect(url, frontendParams) {
  /*Open directly*/
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://") || url.startsWith("/")) {
    window.location.href = url;
  } else {
    clearDocumentState('#!' + url);

    if (frontendParams.documentName === MAIN_DOCUMENT) {
      bus.fire("mainModalClose");
      be5.url.open({
        documentName: MAIN_DOCUMENT
      }, '#!' + url);
    } else {
      be5.url.process(frontendParams, '#!' + url);
    }
  }
}

var getActionsMap = function getActionsMap(actionsArrayOrOneObject) {
  var map = {};

  if (Array.isArray(actionsArrayOrOneObject)) {
    for (var i = 0; i < actionsArrayOrOneObject.length; i++) {
      Preconditions.passed(typeof actionsArrayOrOneObject[i].type === "string", "Actions must be object with string 'type' field: " + actionsArrayOrOneObject);
      map[actionsArrayOrOneObject[i].type] = actionsArrayOrOneObject[i].value;
    }
  } else {
    Preconditions.passed(typeof actionsArrayOrOneObject.type === "string", "Actions must be object with string 'type' field: " + actionsArrayOrOneObject);
    map[actionsArrayOrOneObject.type] = actionsArrayOrOneObject.value;
  }

  return map;
};

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var getResourceByID = function getResourceByID(included, id) {
  if (included === undefined) return undefined;

  for (var i = 0; i < included.length; i++) {
    if (included[i].id === id) return included[i];
  }

  return undefined;
};
var getResourceByType = function getResourceByType(included, type) {
  if (included === undefined) return undefined;

  for (var i = 0; i < included.length; i++) {
    if (included[i].type === type) return included[i];
  }

  return undefined;
};
var getModelByID = function getModelByID(included, meta, id) {
  if (included === undefined) return undefined;
  var res = getResourceByID(included, id);

  if (res !== undefined) {
    return {
      data: res,
      included: included,
      meta: meta
    };
  } else {
    return undefined;
  }
};
var createStaticValue = function createStaticValue(title, text, links, meta) {
  Preconditions.passed(links.self);
  return {
    data: {
      type: 'static',
      attributes: {
        title: title,
        content: text
      },
      links: links || {}
    },
    meta: meta || {
      _ts_: new Date().getTime()
    }
  };
};
var getSelfUrl = function getSelfUrl(value) {
  if (value) {
    if (value.data && value.data.links && value.data.links.self !== undefined) {
      return value.data.links.self;
    } else if (value.errors && value.errors.length > 0 && value.errors[0].links && value.errors[0].links.self !== undefined) {
      return value.errors[0].links.self;
    }
  }

  return undefined;
};
var processHashUrl = function processHashUrl(e) {
  if (!e.ctrlKey) {
    processHashUrlForDocument(e, MAIN_DOCUMENT);
  }
};
var openInModal = function openInModal(e) {
  if (!e.ctrlKey) {
    processHashUrlForDocument(e, MAIN_MODAL_DOCUMENT);
  }
};
var addUrlHandlers = function addUrlHandlers(element, documentName) {
  element.on("click", '.process-hash-url', function (e) {
    if (!e.ctrlKey) {
      e.preventDefault();
      processHashUrlForDocument(e, documentName);
    }
  });
  element.on("click", '.open-hash-url', function (e) {
    if (!e.ctrlKey) {
      e.preventDefault();
      processHashUrl(e);
    }
  });
  element.on("click", '.open-in-modal', function (e) {
    if (!e.ctrlKey) {
      e.preventDefault();
      openInModal(e);
    }
  });
  element.on("click", '.close-modal', function (e) {
    if (!e.ctrlKey) {
      bus.fire("mainModalClose");
    }
  });
};
var processHashUrlForDocument = function processHashUrlForDocument(e, documentName) {
  var url;

  if (e.currentTarget) {
    url = e.currentTarget.getAttribute("href");
    if (!(/^#/.test(url) || url === '' || url === '#' || url === '#!')) return;
    e.preventDefault();
  } else {
    url = e;
    if (!url.startsWith("#!")) url = "#!" + url;
  }

  clearDocumentState(url);
  be5.url.open({
    documentName: documentName || MAIN_DOCUMENT
  }, url);
};
var loadDocumentByUrl = function loadDocumentByUrl(url, frontendParams) {
  var attr = be5.url.parse(url);
  var params = Object.assign(attr.named, _defineProperty({}, TIMESTAMP_PARAM, new Date().getTime()));
  be5.net.request(be5.url.form(attr.positional), params, function (json) {
    changeDocument(frontendParams.documentName, {
      value: json,
      frontendParams: frontendParams
    });
  }, function (json) {
    changeDocument(frontendParams.documentName, {
      value: json,
      frontendParams: frontendParams
    });
  });
};
/**
 * layout: '{"cancelActionText":"Back"}'
 * layout: '{"cancelAction": {"type": "SET_URL","value":"text/test123"}}'
 */

var _createBackAction = function _createBackAction(layout, frontendParams) {
  if (layout === undefined) layout = {};

  if (layout.hasOwnProperty('cancelAction') || layout.cancelActionText || frontendParams.documentName === MAIN_DOCUMENT) {
    var action = layout.cancelAction || getDefaultCancelAction();
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-secondary back-action-btn",
      onClick: function onClick() {
        return executeFrontendActions(action, frontendParams);
      }
    }, layout.cancelActionText || be5.messages.back);
  } else {
    return null;
  }
};

var getDefaultCancelAction = function getDefaultCancelAction() {
  if (window.history.length > 1) {
    return new FrontendAction(GO_BACK);
  } else {
    return new FrontendAction(OPEN_DEFAULT_ROUTE);
  }
};

var messages = {
  en: {
    errorCannotConnect: 'Cannot connect to server',
    errorServerQueryException: 'Error during server query: $message',
    errorInvalidErrorResponse: 'Server returned unknown error',
    errorNoData: 'Error communicating with server: no data received',
    errorUnknownRoute: 'Unknown route: $action',
    errorUrlParameterAbsent: 'Invalid URL: $parameter is absent',
    welcome: 'Hello!',
    loading: 'Page is loading...',
    settings: 'Settings',
    otherColumns: 'Other columns',
    showAllColumns: 'Show all columns',
    roles: 'Roles',
    back: 'Back',
    error: 'Error:',
    cancel: 'Cancel',
    close: 'Close',
    login: 'Login',
    logout: 'Logout',
    reload: 'reload',
    All: 'All',
    successfullyCompleted: 'Successfully completed.',
    filter: 'Filter...',
    entries: 'entries',
    selectRoles: 'Select',
    allRoles: 'all',
    clearRoles: 'clear',
    Submit: 'Submit',
    submitted: 'In progress...',
    formComponentNotFound: 'Document component not found: ',
    tableComponentNotFound: 'Table component not found: ',
    componentForTypeNotRegistered: 'Component for type "$type" is not registered.',
    tableBoxForTypeNotRegistered: 'TableBox for type "$type" is not registered.',
    helpInfo: "Help",
    details: "Details",
    goToHomepage: "Go to homepage",
    NotFound: "Not Found",
    table: {
      noRecordsOnThePage: 'No records on page {0}',
      emptyTable: 'Nothing found',
      previousPage: 'Previous',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      filter: 'Filter',
      clearFilter: 'Clear',
      tableFor: 'for'
    }
  },
  ru: {
    errorCannotConnect: 'Не могу подключиться к серверу',
    errorServerQueryException: 'Ошибка сервера: $message',
    errorInvalidErrorResponse: 'Сервер вернул неизвестную ошибку',
    errorNoData: 'Ошибка связи с сервером: ответ не получен',
    errorUnknownRoute: 'Неизвестный путь: $action',
    errorUrlParameterAbsent: 'Неверный URL: отсутствует $parameter',
    welcome: 'Добро пожаловать!',
    loading: 'Загрузка...',
    settings: 'Настройки',
    otherColumns: 'Другие колонки',
    showAllColumns: 'Показать все колонки',
    roles: 'Роли',
    back: 'Назад',
    error: 'Ошибка:',
    cancel: 'Отмена',
    close: 'Закрыть',
    login: 'Вход',
    logout: 'Выход',
    reload: 'Перезагрузить',
    All: 'Все',
    successfullyCompleted: 'Успешно выполнено.',
    filter: 'Фильтр...',
    entries: 'записей',
    selectRoles: 'Выбрать',
    allRoles: 'Всё',
    clearRoles: 'Ничего',
    Submit: 'Выполнить',
    submitted: 'Выполняется...',
    property: {
      locale: 'ru',
      clearAllText: 'Очистить всё',
      clearValueText: 'Очистить',
      noResultsText: 'Нет результатов',
      searchPromptText: 'Начните вводить для поиска',
      placeholder: 'Выберите...',
      loadingPlaceholder: 'Загрузка...',
      stepMismatch: 'Введите допустимое значение. Ближайшие допустимые значения: {0} and {1}.',
      numberTypeMismatch: 'Введите число.',
      simpleIntegerTypeMismatch: '"E" не поддерживается для простых целых типов.',
      rangeOverflow: 'Значение должно быть меньше или равно {0}.',
      rangeUnderflow: 'Значение должно быть больше или равно {0}.',
      datePatternError: 'Введите дату в формате дд.мм.гггг',
      timestampPatternError: 'Введите дату и время в формате дд.мм.гггг чч:мм'
    },
    formComponentNotFound: 'Компонент формы не найден: ',
    tableComponentNotFound: 'Компонент таблицы не найден: ',
    componentForTypeNotRegistered: 'Компонент для типа "$type" не зарегистрирован.',
    tableBoxForTypeNotRegistered: 'TableBox для типа "$type" не зарегистрирован.',
    helpInfo: "Справка",
    details: "Подробнее",
    goToHomepage: "Перейти на главную страницу",
    NotFound: "Не найдено",
    table: {
      noRecordsOnThePage: 'Нет записей на {0} странице',
      emptyTable: 'Нет данных',
      previousPage: 'Предыдущая',
      nextPage: 'Следующая',
      firstPage: 'Первая',
      lastPage: 'Последняя',
      filter: 'Фильтр',
      clearFilter: 'Очистить',
      tableFor: 'для'
    },
    dataTables: {
      "processing": "Подождите...",
      "search": "Поиск:",
      "lengthMenu": "Показать _MENU_ записей",
      "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
      "infoEmpty": "Записи с 0 до 0 из 0 записей",
      "infoFiltered": "(отфильтровано из _MAX_ записей)",
      "infoPostFix": "",
      "loadingRecords": "Загрузка записей...",
      "zeroRecords": "Записи отсутствуют.",
      "emptyTable": "В таблице отсутствуют данные",
      "paginate": {
        "first": "Первая",
        "previous": "Предыдущая",
        "next": "Следующая",
        "last": "Последняя"
      },
      "aria": {
        "sortAscending": ": активировать для сортировки столбца по возрастанию",
        "sortDescending": ": активировать для сортировки столбца по убыванию"
      }
    }
  }
};

var routes = {};
var getRoute = function getRoute(actionName) {
  return routes[actionName];
};
var registerRoute = function registerRoute(actionName, fn) {
  routes[actionName] = fn;
};
var getAllRoutes = function getAllRoutes() {
  return Object.keys(routes);
};

var getUser = function getUser(state) {
  return state.user;
};
var getCurrentRoles = function getCurrentRoles(state) {
  return state.user.currentRoles;
};
var getDefaultRoute = function getDefaultRoute(state) {
  return state.user.defaultRoute;
};

var documents = {};
var getDocument = function getDocument(type) {
  return documents[type];
}; // createDocument(type, props) {
//   return documents[type](props);
// };

var registerDocument = function registerDocument(type, component) {
  documents[type] = component;
};
var getAllDocumentTypes = function getAllDocumentTypes() {
  return Object.keys(documents);
};

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var arraysEqual = function arraysEqual(a, b) {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
};
var isEmptyString = function isEmptyString(str) {
  return str === null || str === undefined || String(str) === '';
};
var registerPage = function registerPage(actionName, component, fn) {
  registerDocument(actionName, component);
  registerRoute(actionName, fn);
};
var createPageValue = function createPageValue(actionName, data, url) {
  return {
    value: {
      data: Object.assign({}, data, {
        links: {
          self: url || actionName
        }
      })
    },
    frontendParams: {
      type: actionName
    }
  };
};
/* https://stackoverflow.com/a/7627603 */

var makeSafeForClassName = function makeSafeForClassName(name) {
  return name.replace(/[^a-zA-Z0-9]/g, function (s) {
    var c = s.charCodeAt(0);
    if (c === 32) return '-';
    return '__' + ('000' + c.toString(16)).slice(-4);
  });
};
var getBackOrOpenDefaultRouteAction = function getBackOrOpenDefaultRouteAction() {
  if (window.history.length > 1) {
    return new FrontendAction(GO_BACK);
  } else {
    return new FrontendAction(OPEN_DEFAULT_ROUTE);
  }
};
var getBackAction = function getBackAction() {
  if (window.history.length > 1) {
    return new FrontendAction(GO_BACK);
  } else {
    return undefined;
  }
};
var hashUrlIsEmpty = function hashUrlIsEmpty(url) {
  return url === '' || url === '#' || url === '#!';
};
var isGuest = function isGuest() {
  return be5.getStoreState() && getCurrentRoles(be5.getStoreState()) && getCurrentRoles(be5.getStoreState()).includes(ROLE_GUEST);
};
var setColumnSettings = function setColumnSettings(table_name, query_name, column_name, settingName, settingValue) {
  var settings = JSON.parse(localStorage.getItem(COLUMN_SETTINGS));

  if (!settings || !Array.isArray(settings)) {
    settings = [];
  }

  var querySettings = settings.find(function (el) {
    return el.table_name == table_name && el.query_name === query_name;
  });

  if (!querySettings) {
    settings.push({
      table_name: table_name,
      query_name: query_name,
      columnSettings: [_defineProperty$1({
        column_name: column_name
      }, settingName, settingValue)]
    });
  } else {
    var columnSetting = querySettings.columnSettings.find(function (el) {
      return el.column_name === column_name;
    });

    if (!columnSetting) {
      querySettings.columnSettings.push(_defineProperty$1({
        column_name: column_name
      }, settingName, settingValue));
    } else {
      columnSetting[settingName] = settingValue;
    }
  }

  localStorage.setItem(COLUMN_SETTINGS, JSON.stringify(settings));
};
var getColumnSettings = function getColumnSettings(table_name, query_name, column_name, settingName) {
  var settings = JSON.parse(localStorage.getItem(COLUMN_SETTINGS));

  if (settings) {
    var querySettings = settings.find(function (el) {
      return el.table_name === table_name && el.query_name === query_name;
    });

    if (querySettings) {
      var columnSetting = querySettings.columnSettings.find(function (el) {
        return el.column_name === column_name;
      });

      if (columnSetting) {
        return columnSetting[settingName];
      }
    }
  }

  return null;
};
var setQuerySettings = function setQuerySettings(table_name, query_name, settingName, settingValue) {
  var settings = JSON.parse(localStorage.getItem(QUERY_SETTINGS));

  if (!settings || !Array.isArray(settings)) {
    settings = [];
  }

  var querySettings = settings.find(function (el) {
    return el.table_name == table_name && el.query_name === query_name;
  });

  if (!querySettings) {
    settings.push(_defineProperty$1({
      table_name: table_name,
      query_name: query_name
    }, settingName, settingValue));
  } else {
    querySettings[settingName] = settingValue;
  }

  localStorage.setItem(QUERY_SETTINGS, JSON.stringify(settings));
};
var getQuerySettings = function getQuerySettings(table_name, query_name, settingName) {
  var settings = JSON.parse(localStorage.getItem(QUERY_SETTINGS));

  if (settings) {
    var querySettings = settings.find(function (el) {
      return el.table_name === table_name && el.query_name === query_name;
    });
    if (querySettings) return querySettings[settingName];
  }

  return null;
};

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
var be5 = {
  store: undefined,
  getStoreState: function getStoreState() {
    return be5.store.getState();
  },
  debug: true,
  messages: messages.en,
  appInfo: {},
  be5ServerUrl: window.be5ServerUrl || "",
  locale: {
    set: function set(loc, addMessages) {
      if (!loc) return;
      loc = loc.toLowerCase();
      if (be5.locale.value === loc) return;
      be5.locale.value = loc;
      be5.messages = {};
      var newMessages = messages[loc];
      var defMessages = messages.en;

      for (var key in newMessages) {
        var msg = newMessages[key];
        if (msg === undefined) msg = defMessages[key];
        be5.messages[key] = msg;
      }

      if (addMessages !== null) {
        for (var _key in addMessages) {
          be5.messages[_key] = addMessages[_key];
        }
      }
    },
    setLanguages: function setLanguages(languages) {
      if (!languages || !Array.isArray(languages)) return;
      be5.locale.languages = languages;
    },
    msg: function msg(key) {
      var value = be5.messages[key];
      return value === undefined ? key : value;
    },
    addMessages: function addMessages(loc, msgs) {
      for (var key in msgs) {
        messages[loc][key] = msgs[key];
      }

      if (loc === be5.locale.value) {
        for (var _key2 in msgs) {
          be5.messages[_key2] = msgs[_key2];
        }
      }
    },
    get: function get() {
      return be5.locale.value;
    }
  },
  ui: {
    setTitle: function setTitle(docTitle) {
      if (docTitle !== undefined && docTitle.length > 0) {
        document.title = docTitle + ' - ' + be5.appInfo.title;
      } else {
        document.title = be5.appInfo.title;
      }
    }
  },
  url: {
    open: function open(frontendParams, url) {
      // (url === "#!" + getDefaultRoute(be5.store.getState())
      //   && (be5.url.get() === "" || be5.url.get() === "#!"))
      if (frontendParams.documentName !== MAIN_DOCUMENT || decodeURI(url) === be5.url.get()) {
        be5.url.process(frontendParams, url);
      } else {
        be5.url.set(url);
      }
    },
    get: function get() {
      return decodeURI(document.location.hash);
    },
    set: function set(url) {
      if (url.substring(0, 1) === '#') url = url.substring(1);
      if (url.substring(0, 1) !== '!') url = '!' + url;
      url = '#' + url;
      document.location.hash = url;
    },
    empty: function empty() {
      var url = be5.url.get();
      return hashUrlIsEmpty(url);
    },
    clear: function clear() {
      document.location.hash = '';
    },
    create: function create() {
      var positional = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var named = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return be5.url.form(positional, named);
    },
    form: function form(positional) {
      var named = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var res = [];

      for (var i = 0; i < positional.length; i++) {
        res.push(encodeURIComponent(positional[i]));
      }

      for (var key in named) {
        res.push(key + '=' + encodeURIComponent(named[key]));
      }

      return res.join('/');
    },
    parse: function parse(url) {
      var segments = url.split('/');
      var positional = [];
      var named = [];

      for (var i = 0; i < segments.length; i++) {
        var s = segments[i];

        if (s.indexOf('=') === -1) {
          positional.push(decodeURIComponent(s));
        } else {
          named.push(s.split('='));
        }
      }

      return {
        positional: positional,
        named: _.object(named)
      };
    },
    process: function process(frontendParams, url) {
      if (url === '' || url === '#' || url === '#!') {
        url = '#!' + getDefaultRoute(be5.getStoreState());
      }

      if (url.substring(0, 1) === '#') url = url.substring(1);
      if (url.substring(0, 1) !== '!') return;
      url = url.substring(1);

      if (url === '') {
        return;
      }

      var urlParts = url.split('/'); // if (!be5.hasAction(urlParts[0])) {
      //   be5.log.error(be5.messages.errorUnknownRoute.replace(
      //       '$action', urlParts[0]));
      //   return;
      // }

      var positional = [frontendParams];
      var hashParams = {};
      var hasHashParam = false;

      for (var i = 1; i < urlParts.length; i++) {
        var urlPart = urlParts[i];
        var pos = urlPart.indexOf('=');

        if (pos >= 0) {
          var name = decodeURIComponent(urlPart.substring(0, pos).replace(/\+/g, ' '));
          var value = decodeURIComponent(urlPart.substring(pos + 1).replace(/\+/g, ' '));

          if (value.includes(',')) {
            value = value.split(',');
          }

          hashParams[name] = value;
          hasHashParam = true;
        } else {
          positional.push(decodeURIComponent(urlPart).replace(/\+/g, ' '));
        }
      }

      if (hasHashParam) positional.push(hashParams);
      var actionName = urlParts[0];
      var action = getRoute(actionName);

      if (action !== undefined) {
        //console.log("process", documentName, url);
        //changeDocument(documentName, { loading: true });
        action.apply(be5, positional);
      } else {
        var msg = be5.messages.errorUnknownRoute.replace('$action', actionName);
        changeDocument(frontendParams.documentName, {
          value: createStaticValue(msg, null, {
            self: url
          })
        });
        console.info(msg);
      }
    }
  },
  net: {
    url: function url(path) {
      return API_URL_PREFIX + path;
    },
    paramString: function paramString(params) {
      if (_typeof(params) !== 'object') {
        return '{}';
      }

      return JSON.stringify(params);
    },
    request: function request(path, params, success, failure) {
      return be5.net.requestUrl(be5.net.url(path), 'json', params, success, failure);
    },
    requestUrl: function requestUrl(url, type, params, _success, failure) {
      // const failure = function(data) {
      //   be5.log.error(data);
      //   if (typeof (failureFunc) === 'function')failureFunc(data);
      // };
      $.ajax({
        url: be5.be5ServerUrl + url,
        dataType: type,
        type: 'GET',
        data: params,
        async: true,
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: function success(data, status, xhr) {
          if (xhr.status === 0) {
            if (xhr.aborted) return null;

            if (data === undefined) {
              data = {
                type: 'error',
                value: {
                  message: be5.messages.errorCannotConnect,
                  code: 'CLIENT_ERROR'
                }
              };
            }

            failure(data);
            return;
          }

          if (data === undefined) {
            data = {
              type: 'error',
              value: {
                message: be5.messages.errorNoData,
                code: 'CLIENT_ERROR'
              }
            };
          }

          if (_typeof(data) === 'object' && data.type === 'error') {
            if (_typeof(data.value) !== 'object') {
              data.value = {
                message: be5.messages.errorInvalidErrorResponse,
                code: 'CLIENT_ERROR'
              };
            }

            if (be5.net.errorHandlers[data.value.code]) {
              be5.net.errorHandlers[data.value.code]();
            } else {
              failure(data);
              return;
            }
          }

          if (_success !== undefined) _success(data);
        },
        error: function error(xhr, status, errorThrown) {
          // let data = {
          //   type : 'error',
          //   value : {
          //     code : 'CLIENT_ERROR'
          //   }
          // };
          // if (errorThrown && errorThrown.result === 0x80004005)
          //   // Special case for FireFox
          //   // see http://helpful.knobs-dials.com/index.php/0x80004005_%28NS_ERROR_FAILURE%29_and_other_firefox_errors
          //   data.value.message = be5.messages.errorCannotConnect;
          // else
          //   data.value.message = be5.messages.errorServerQueryException
          //       .replace(
          //           "$message",
          //           errorThrown === undefined ? status
          //               + (xhr.status >= 500 ? " "
          //                   + xhr.status
          //                   + " "
          //                   + xhr.statusText
          //                   : "")
          //               : (errorThrown.message === undefined ? errorThrown
          //                   .toString()
          //                   : errorThrown.message));
          var response = JSON.parse(xhr.responseText);

          if (typeof failure === 'function') {
            failure(response);
          } else {
            be5.log.error(response);
          }
        }
      });
    },
    errorHandlers: {}
  },
  log: {
    error: function error(value) {
      if (typeof value === 'string') {
        bus.fire("alert", {
          msg: value,
          type: 'error'
        });
      } else if (value.errors !== undefined) {
        value.errors.forEach(function (e) {
          bus.fire("alert", {
            msg: e.title,
            type: 'error'
          });
        });
      } else {
        bus.fire("alert", {
          msg: 'unknown error',
          type: 'error'
        });
      }

      console.error(value);
    }
  } // isRemoteUrl(url) {
  //   const prefix = 'http';
  //   return url.substr(0, prefix.length) === prefix;
  // },

};
// requestJson(path, params, success, failure) {
//   return be5.net.requestUrl(be5.def.APPLICATION_PREFIX + path, 'json', be5.net.transform(params), success, failure);
// },
//
// requestHtml(path, success, failure) {
//   return be5.net.requestUrl(be5.def.APPLICATION_PREFIX + path, 'html', {}, success, failure);
// },
// transform(params) {
//   const copy = {};
//   for (let key in params) {
//   if (typeof params[key] === 'object') {
//     copy[key] = be5.net.paramString(params[key]);
//   } else {
//     copy[key] = params[key];
//   }
//   }
//   return copy;
// },

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Role = function Role(props) {
  var id = props.name + "-checkbox";
  return /*#__PURE__*/React.createElement("div", {
    className: "role"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: id,
    checked: props.checked,
    onChange: props.onChange
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: id
  }, /*#__PURE__*/React.createElement("span", {
    className: "checkBox"
  }), props.name));
};

Role.propTypes = {
  onChange: PropTypes.func.isRequired
};

var RoleSelector = function RoleSelector(props) {
  function onRoleChange(name) {
    var roles = _toConsumableArray(props.currentRoles);

    var containRoleIndex = roles.indexOf(name);

    if (containRoleIndex !== -1) {
      roles.splice(roles.indexOf(name), 1);
    } else {
      roles.push(name);
    }

    props.toggleRoles(roles.join(","));
  }

  function handleSelectAll() {
    props.toggleRoles(props.availableRoles.join(","));
  }

  function handleClear() {
    props.toggleRoles("");
  }

  function isHidden() {
    return props.availableRoles.length <= 1;
  }

  if (props.availableRoles.length < 1) {
    return /*#__PURE__*/React.createElement("div", null);
  }

  var roleNodes = props.availableRoles.map(function (role) {
    return /*#__PURE__*/React.createElement(Role, {
      key: role,
      name: role,
      checked: props.currentRoles.indexOf(role) !== -1,
      onChange: function onChange() {
        return onRoleChange(role);
      }
    });
  });
  return /*#__PURE__*/React.createElement(UncontrolledDropdown, {
    size: props.size,
    className: "roleBox mr-sm-2",
    id: props.id,
    hidden: isHidden()
  }, /*#__PURE__*/React.createElement(DropdownToggle, {
    caret: true
  }, be5.messages.roles), /*#__PURE__*/React.createElement(DropdownMenu, null, roleNodes, /*#__PURE__*/React.createElement(DropdownItem, {
    divider: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "roleBox_add-actions"
  }, be5.locale.msg('selectRoles') + ' ', /*#__PURE__*/React.createElement(Button, {
    onClick: handleSelectAll,
    color: "primary",
    className: "enable-all",
    size: "sm"
  }, be5.locale.msg('allRoles')), ' ', /*#__PURE__*/React.createElement(Button, {
    onClick: handleClear,
    color: "secondary",
    className: "disable-all",
    size: "sm"
  }, be5.locale.msg('clearRoles')))));
};

RoleSelector.propTypes = {
  id: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  currentRoles: PropTypes.array.isRequired,
  availableRoles: PropTypes.array.isRequired,
  toggleRoles: PropTypes.func.isRequired
};

const img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAATdEVYdFRpdGxlAE9wdGljYWwgRHJpdmU+Z7oMAAAC+ElEQVQ4jZWS329TZRjHP+ft6dJ2djNxHcgyunb+KIyNwfRG0mZgNgfeAJNBUBO8NEswITPEGHIy1I1lcTEzhn/Aq5mIFwp2yGSMzAsCyMIAp7hWOXjD+LGW03bnPe/rxSyZ7spv8tw9z+f75Ps8htaasvr7+81Apfm6oY1dGrpAV4BhY5AV2vjME4ZjKHUSjBxKHTt69MNpszw8ODj4TCBUMdbasnnH5pYt1NREEEIgpbs2l8u1/TAxvjebyeT27z8YXrh3j7MT4wFgmwkwPPzx8z6/L713zxuxeKyRUqmI4+RRSiGEIBQKsa/7ALZ9J1xfv56qcBg0rwCYAArxxVsH346tqV3L4uJDrv58lfn52+TyeZ6qrGTjxk0kXkwQiUT4r8yhTwd2xmPxjnXPruP+/QXOpE9zx7YnQQwIrUOFUnHwwtRk4vbvv9HVuZNAIAiAUmoZYCh9+NUdHRSLRWZvXMe27XMlx+2yLEueGP7kXE/3gUQ81rjKWUq5DNAY64PBEK5b4uatWwiMjyzLkgCuK8OPHj3kwYOFVQDXdSlnUCeEgVIKx3mMlFx/0uR575765usvtdaJ5WtrtC7XPxlIzysUS8VqIUyqq5/mcc5uBs4DHD92/DKwYZX9yhCl532fyWQONcYbadrQRCabtXq+6pka2zfmrXiwwJIsngB2a60mPJf3hoaGcgCmWpKnr1y5fKghGqW5uYX5zHy7d809+8HM+wM+7d2U2teKxkol21/e1NTEj5MT78zOzl4CTgKYQvhPzc39cn7q4lR7Kpliz+5utrRu3X5x+sL2u3f/4oVolOS2JNFoA/l8HtP0I6UXKG9naK3p6+urEaa+1NnxWkPb1jaCwRB+vx8hfCilcN0lCgWH9Hia6Z+mb5ii4qWRkZHCEwDAkSO9zyl8n9dGartSqSSRSC1V4Socx2Hu1zmuzczwx5/Zb02j4s3R0dHFf22wUr2HezsNLXuVMuo1ug7Ia80Zhf6ubk1d2rIstbJ/FeD/6m8m/lj+PIxQ9QAAAABJRU5ErkJggg==";

var UserControl = function UserControl(props) {
  var _props$user = props.user,
      userName = _props$user.userName,
      loggedIn = _props$user.loggedIn,
      currentRoles = _props$user.currentRoles,
      availableRoles = _props$user.availableRoles;

  if (!loggedIn) {
    return null;
  }

  function reLogin() {
    if (Document.hasDevRole) {
      return /*#__PURE__*/React.createElement("span", {
        onClick: props.openReLoginForm,
        className: "document-reload float-right"
      }, /*#__PURE__*/React.createElement("img", {
        src: img,
        alt: "Login",
        title: "Login"
      }));
    }

    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: classNames$1('user-control', props.className || 'form-inline mb-2')
  }, /*#__PURE__*/React.createElement(RoleSelector, {
    size: props.size,
    currentRoles: currentRoles,
    availableRoles: availableRoles,
    toggleRoles: props.toggleRoles
  }), /*#__PURE__*/React.createElement("label", null, userName), reLogin());
};

UserControl.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  user: PropTypes.shape({})
};

function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var _get = function _get(operationInfo, callback, failure) {
  var data = Object.assign({}, operationInfo, _defineProperty$2({}, TIMESTAMP_PARAM, new Date().getTime()));
  $.ajax({
    url: be5.net.url('form'),
    data: data,
    success: function success(data) {
      callback(data);
    },
    error: function error(xhr, status, _error) {
      var response = JSON.parse(xhr.responseText);
      failure(response);
    }
  });
};
var _post = function _post(action, data, callback, failure) {
  $.ajax({
    url: be5.net.url(action),
    method: 'POST',
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    success: function success(data) {
      callback(data);
    },
    error: function error(xhr, status, _error2) {
      var response = JSON.parse(xhr.responseText);
      failure(response);
    }
  });
};

function _typeof$1(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }

function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var loadOperation = function loadOperation(params, frontendParams) {
  _send('form', params, frontendParams);
};
var submitOperation = function submitOperation(params, frontendParams) {
  _send('form/apply', params, frontendParams);
};

var _send = function _send(action, data, frontendParams) {
  _post(action, data, function (json) {
    _performOperationResult(json, frontendParams, data);
  }, function (json) {
    _performOperationResult(json, frontendParams, data);
  });
};

var openOperationByUrl = function openOperationByUrl(url, frontendParams) {
  _send('form', getOperationInfoFromUrl(url), frontendParams);
};
var openOperationByUrlWithValues = function openOperationByUrlWithValues(url, values, frontendParams) {
  _send('form', getOperationInfoFromUrl(url, values), frontendParams);
};
var fetchOperationByUrl = function fetchOperationByUrl(url, callback) {
  var failure = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : be5.log.error;

  _post('form', getOperationInfoFromUrl(url), callback, failure);
};
var loadForm = function loadForm(data, frontendParams) {
  _get(data, function (json) {
    _performOperationResult(json, frontendParams, data);
  }, function (json) {
    _performOperationResult(json, frontendParams, data);
  });
};
var _performOperationResult = function _performOperationResult(json, frontendParams, data) {
  var documentName = frontendParams.documentName;
  Preconditions.passed(documentName);

  if (json.data !== undefined) {
    switch (json.data.type) {
      case 'form':
        _performForm(json, frontendParams);

        return;

      case 'operationResult':
        var attributes = json.data.attributes;
        var result = attributes.operationResult;

        if (result.status === 'ERROR') {
          bus.fire("alert", {
            msg: result.message,
            type: 'error',
            timeout: result.timeout
          });
          return;
        }

        if (frontendParams.onSuccess) {
          frontendParams.onSuccess(json, data);
        }

        switch (result.status) {
          case 'REDIRECTED':
            executeFrontendActions(new FrontendAction(REDIRECT, result.details), frontendParams);
            return;

          case 'FINISHED':
            if (result.details === undefined) {
              if (documentName === MAIN_MODAL_DOCUMENT) {
                bus.fire("alert", {
                  msg: result.message || be5.messages.successfullyCompleted,
                  type: 'success',
                  timeout: result.timeout
                });
                bus.fire("mainModalClose");
              } else {
                changeDocument(documentName, {
                  value: json,
                  frontendParams: frontendParams
                });
              }

              if (frontendParams.parentDocumentName !== undefined && frontendParams.parentDocumentName !== frontendParams.documentName) {
                executeFrontendActions(new FrontendAction(REFRESH_PARENT_DOCUMENT), frontendParams);
              }
            } else {
              if (result.message !== undefined) {
                var actions = getActionsMap(result.details);

                if (documentName === MAIN_MODAL_DOCUMENT || actions.hasOwnProperty(GO_BACK)) {
                  bus.fire("alert", {
                    msg: result.message,
                    type: 'success',
                    timeout: result.timeout
                  });
                } else {
                  changeDocument(documentName, {
                    value: json,
                    frontendParams: frontendParams
                  });
                }
              }

              executeFrontendActions(result.details, frontendParams);
            }

            return;

          default:
            bus.fire("alert", {
              msg: be5.messages.errorUnknownRoute.replace('$action', 'status = ' + result.status),
              type: 'error'
            });
        }

        return;

      default:
        bus.fire("alert", {
          msg: be5.messages.errorUnknownRoute.replace('$action', 'data.type = ' + json.data.attributes.type),
          type: 'error'
        });
    }
  } else {
    if (json.errors !== undefined) {
      var error = json.errors[0];
      bus.fire("alert", {
        msg: error.status + " " + error.title,
        type: 'error'
      });
    } else {
      bus.fire("alert", {
        msg: json,
        type: 'error'
      });
    }

    changeDocument(documentName, {
      value: json,
      frontendParams: frontendParams
    });
  }
};

var _performForm = function _performForm(json, frontendParams) {
  var documentName = frontendParams.documentName;
  var operationResult = json.data.attributes.operationResult;

  if (operationResult.status === 'ERROR') {
    bus.fire("alert", {
      msg: operationResult.message,
      type: 'error',
      operationResult: operationResult.timeout
    });
  }

  if (documentName === MAIN_MODAL_DOCUMENT) {
    bus.fire("mainModalOpen");
    changeDocument(MAIN_MODAL_DOCUMENT, {
      value: json,
      frontendParams: frontendParams
    });
  } else {
    if (documentName === MAIN_DOCUMENT) be5.ui.setTitle(json.data.attributes.title);
    changeDocument(documentName, {
      value: json,
      frontendParams: frontendParams
    });
  }
};

var getOperationInfoFromUrl = function getOperationInfoFromUrl(url) {
  var _operationInfo;

  var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var attr = be5.url.parse(url);
  var operationInfo = (_operationInfo = {}, _defineProperty$3(_operationInfo, ENTITY_NAME_PARAM, attr.positional[1]), _defineProperty$3(_operationInfo, QUERY_NAME_PARAM, attr.positional[2]), _defineProperty$3(_operationInfo, OPERATION_NAME_PARAM, attr.positional[3]), _defineProperty$3(_operationInfo, CONTEXT_PARAMS, JSON.stringify(attr.named)), _operationInfo);
  return getOperationInfo(operationInfo, values);
};

var _buildFormDateFromObject = function _buildFormDateFromObject(formData, data, parentKey) {
  if (data && _typeof$1(data) === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(function (key) {
      _buildFormDateFromObject(formData, data[key], parentKey ? "".concat(parentKey, "[").concat(key, "]") : key);
    });
  } else {
    formData.append(parentKey, data === null ? '' : data);
  }
};

var getOperationInfo = function getOperationInfo(operationInfo) {
  var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var formData = new FormData();

  var _loop = function _loop(k) {
    var value = values[k];

    if (Array.isArray(value)) {
      if (value.length === 0) {
        formData.append(k, "");
      } else {
        value.forEach(function (e) {
          formData.append(k, e);
        });
      }
    } else if (value instanceof FileList) {
      if (value.length === 0) {
        formData.append(k, "");
      } else {
        for (var i = 0; i < value.length; i++) {
          formData.append(k, value[i]);
        }
      }
    } else {
      _buildFormDateFromObject(formData, value, k);
    }
  };

  for (var k in values) {
    _loop(k);
  }

  formData.append(ENTITY_NAME_PARAM, operationInfo[ENTITY_NAME_PARAM]);
  formData.append(QUERY_NAME_PARAM, operationInfo[QUERY_NAME_PARAM]);
  formData.append(OPERATION_NAME_PARAM, operationInfo[OPERATION_NAME_PARAM]);
  formData.append(CONTEXT_PARAMS, operationInfo[CONTEXT_PARAMS]);
  formData.append(TIMESTAMP_PARAM, new Date().getTime());
  return formData;
};
var forms = {
  load: loadOperation,
  apply: submitOperation
};

var openReLoginForm = function openReLoginForm() {
  openOperationByUrl('form/users/All records/Login/withoutUpdateUserInfo=true', {
    documentName: MAIN_MODAL_DOCUMENT
  });
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: getUser(state),
    hasDevRole: getCurrentRoles(state).indexOf(ROLE_SYSTEM_DEVELOPER) !== -1
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toggleRoles: function toggleRoles$1(roles) {
      return dispatch(toggleRoles(roles));
    },
    openReLoginForm: openReLoginForm
  };
};

var UserControlContainer = connect(mapStateToProps, mapDispatchToProps)(UserControl);

var createUnknownActionException = function createUnknownActionException(actionName) {
  return {
    name: 'UnknownActionException',
    message: 'Action \'' + actionName + '\' is unknown'
  };
};

var actions = {
  /**
   * Returns an object with href and target.
   */
  parse: function parse(action) {
    switch (action.name) {
      case 'open':
        return {
          href: action.arg,
          target: '_blank'
        };

      case 'call':
        return {
          href: '#!' + action.arg,
          target: ''
        };
    }

    throw createUnknownActionException(action.name);
  }
};

var MenuNode = function MenuNode(props) {
  function getData(node) {
    var href = '#';
    var target = '';
    var classes = '';

    if (node.level === 1) {
      classes += 'rootMenuItem';
    } else {
      classes += 'menuItem';
    }

    var hasAction = node.data.action !== undefined;

    if (hasAction) {
      classes += ' menuItemWithRef';
      var action = actions.parse(node.data.action);
      href = action.href;
      target = action.target;
    } else {
      classes += ' menuItemWithoutRef';
    }

    return {
      href: href,
      target: target,
      classes: classes,
      hasAction: hasAction
    };
  }

  var hasChildren = props.data.children !== undefined;

  if (!hasChildren) {
    var key = 'menu node ' + props.data.title;
    return /*#__PURE__*/React.createElement("div", {
      className: "menuNode",
      key: key
    }, _getHead(), _getOperations());
  }

  var nextLevel = props.level + 1;
  var children = props.data.children.map(function (child) {
    var childKey = 'li ' + child.title;
    return /*#__PURE__*/React.createElement("li", {
      key: childKey
    }, /*#__PURE__*/React.createElement(MenuNode, {
      key: child.title,
      data: child,
      level: nextLevel
    }));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "menuNode",
    key: 'menu node ' + props.data.title
  }, _getHead(), _getOperations(), /*#__PURE__*/React.createElement("ul", {
    key: 'ul ' + props.data.title
  }, children));

  function _getHead() {
    var data = getData(props);

    if (data.hasAction) {
      return /*#__PURE__*/React.createElement("a", {
        href: data.href,
        className: data.classes,
        target: data.target,
        onClick: processHashUrl,
        key: 'a ' + props.data.title
      }, props.data.title);
    } else {
      return /*#__PURE__*/React.createElement("span", {
        className: data.classes
      }, props.data.title);
    }
  }

  function _getOperations() {
    var hasOperations = props.data.operations !== undefined;

    if (!hasOperations) {
      var _key = 'operations ' + props.data.title;

      return /*#__PURE__*/React.createElement("div", {
        key: _key
      });
    }

    return props.data.operations.map(function (operation) {
      var href = '#!' + operation.action.arg;
      var title = operation.title === 'Insert' ? '+' : operation.title;
      var opBoxKey = 'operation box ' + title;
      var opKey = 'operation a ' + title;
      return /*#__PURE__*/React.createElement("div", {
        className: "menuOperationBox",
        key: opBoxKey
      }, /*#__PURE__*/React.createElement("a", {
        href: href,
        className: "menuOperation",
        key: opKey
      }, "[", title, "]"));
    });
  }
};

function _typeof$2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof$2(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var propTypes = {
  menu: PropTypes.shape({})
};

var MenuBody = /*#__PURE__*/function (_Component) {
  _inherits(MenuBody, _Component);

  var _super = _createSuper(MenuBody);

  function MenuBody(props) {
    var _this;

    _classCallCheck$1(this, MenuBody);

    _this = _super.call(this, props);
    _this.state = {
      query: ''
    };
    _this._getFilteredRoot = _this._getFilteredRoot.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MenuBody, [{
    key: "render",
    value: function render() {
      if (this.props.menu === null) {
        return /*#__PURE__*/React.createElement("p", null, "Loading...");
      }

      var filteredRoot = this._getFilteredRoot();

      var rootNodes = filteredRoot.map(function (node) {
        return /*#__PURE__*/React.createElement(MenuNode, {
          key: JSON.stringify(node),
          data: node,
          level: 1
        });
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "menu"
      }, rootNodes);
    }
  }, {
    key: "_getFilteredRoot",
    value: function _getFilteredRoot() {
      var containsIgnoreCase = function containsIgnoreCase(str, substr) {
        return str.toLowerCase().indexOf(substr.toLowerCase()) !== -1;
      };

      var anyChildContainsIgnoreCase = function anyChildContainsIgnoreCase(node, query) {
        if (containsIgnoreCase(node.title, query)) {
          return true;
        }

        return node.children && _.any(node.children, function (child) {
          return anyChildContainsIgnoreCase(child, query);
        });
      };

      var filterNodeContent = function filterNodeContent(node, query) {
        if (!node.children) {
          return node;
        }

        return _.extend({}, node, {
          children: filterByTitle(node.children, query)
        });
      };

      var filterByTitle = function filterByTitle(root, query) {
        return root.filter(function (node) {
          return anyChildContainsIgnoreCase(node, query);
        }).map(function (node) {
          return filterNodeContent(node, query);
        });
      };

      return filterByTitle(this.props.menu.root, this.state.query);
    }
  }]);

  return MenuBody;
}(Component);

MenuBody.propTypes = propTypes;

function _typeof$3(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$3 = function _typeof(obj) { return typeof obj; }; } else { _typeof$3 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$3(obj); }

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); return Constructor; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$1(subClass, superClass); }

function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

function _possibleConstructorReturn$1(self, call) { if (call && (_typeof$3(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1(self); }

function _assertThisInitialized$1(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$1(o) { _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1(o); }

var MenuSearchField = /*#__PURE__*/function (_React$Component) {
  _inherits$1(MenuSearchField, _React$Component);

  var _super = _createSuper$1(MenuSearchField);

  function MenuSearchField(props) {
    var _this;

    _classCallCheck$2(this, MenuSearchField);

    _this = _super.call(this, props);
    _this.state = {
      value: ''
    };
    _this._handleChange = _this._handleChange.bind(_assertThisInitialized$1(_this));
    return _this;
  }

  _createClass$1(MenuSearchField, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "searchField form-control",
        onChange: this._handleChange,
        value: this.state.value,
        placeholder: be5.messages.filter
      });
    }
  }, {
    key: "_handleChange",
    value: function _handleChange(event) {
      this.setState({
        value: event.target.value
      });
      this.props.onChange(event.target.value);
    }
  }]);

  return MenuSearchField;
}(React.Component);

MenuSearchField.propTypes = {
  onChange: PropTypes.func.isRequired
};

function _typeof$4(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$4 = function _typeof(obj) { return typeof obj; }; } else { _typeof$4 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$4(obj); }

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$2(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$2(Constructor.prototype, protoProps); if (staticProps) _defineProperties$2(Constructor, staticProps); return Constructor; }

function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$2(subClass, superClass); }

function _setPrototypeOf$2(o, p) { _setPrototypeOf$2 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$2(o, p); }

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf$2(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$2(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$2(this, result); }; }

function _possibleConstructorReturn$2(self, call) { if (call && (_typeof$4(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$2(self); }

function _assertThisInitialized$2(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$2(o) { _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$2(o); }
var propTypes$1 = {
  menu: PropTypes.shape({}),
  currentRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchMenu: PropTypes.func.isRequired,
  searchField: PropTypes.bool
};
var defaultProps = {
  searchField: true
};

var Menu = /*#__PURE__*/function (_Component) {
  _inherits$2(Menu, _Component);

  var _super = _createSuper$2(Menu);

  function Menu(props) {
    var _this;

    _classCallCheck$3(this, Menu);

    _this = _super.call(this, props);
    _this._handleQueryChange = _this._handleQueryChange.bind(_assertThisInitialized$2(_this));
    return _this;
  }

  _createClass$2(Menu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.fetchMenu();
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
          currentRoles = _this$props.currentRoles,
          fetchMenu = _this$props.fetchMenu;

      if (!arraysEqual(currentRoles, nextProps.currentRoles)) {
        fetchMenu();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "menuContainer"
      }, this.props.searchField ? /*#__PURE__*/React.createElement(MenuSearchField, {
        ref: "searchfield",
        onChange: this._handleQueryChange
      }) : null, /*#__PURE__*/React.createElement(MenuBody, {
        ref: "menubody",
        menu: this.props.menu
      }));
    }
  }, {
    key: "_handleQueryChange",
    value: function _handleQueryChange(query) {
      this.refs.menubody.setState({
        query: query
      });
    }
  }]);

  return Menu;
}(Component);

Menu.propTypes = propTypes$1;
Menu.defaultProps = defaultProps;

var getMenu = function getMenu(state) {
  return state.menu;
};

var MenuContainer = function MenuContainer(props) {
  return /*#__PURE__*/React.createElement(Menu, props);
};

var mapStateToProps$1 = function mapStateToProps(state) {
  return {
    menu: getMenu(state),
    currentRoles: getCurrentRoles(state)
  };
};

var mapDispatchToProps$1 = function mapDispatchToProps(dispatch) {
  return {
    fetchMenu: function fetchMenu$1(roles) {
      return dispatch(fetchMenu('menu'));
    }
  };
};

var MenuContainer$1 = connect(mapStateToProps$1, mapDispatchToProps$1)(MenuContainer);

var MenuFooter = function MenuFooter() {
  return /*#__PURE__*/React.createElement("div", {
    className: "menuFooter"
  });
};

function _typeof$5(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$5 = function _typeof(obj) { return typeof obj; }; } else { _typeof$5 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$5(obj); }

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$3(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$3(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$3(Constructor.prototype, protoProps); if (staticProps) _defineProperties$3(Constructor, staticProps); return Constructor; }

function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$3(subClass, superClass); }

function _setPrototypeOf$3(o, p) { _setPrototypeOf$3 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$3(o, p); }

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$3(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$3(this, result); }; }

function _possibleConstructorReturn$3(self, call) { if (call && (_typeof$5(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$3(self); }

function _assertThisInitialized$3(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$3(o) { _getPrototypeOf$3 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$3(o); }

var Language = /*#__PURE__*/function (_React$Component) {
  _inherits$3(Language, _React$Component);

  var _super = _createSuper$3(Language);

  function Language(props) {
    var _this;

    _classCallCheck$4(this, Language);

    _this = _super.call(this, props);
    _this.onClick = _this.onClick.bind(_assertThisInitialized$3(_this));
    return _this;
  }

  _createClass$3(Language, [{
    key: "onClick",
    value: function onClick(e) {
      this.props.onLanguageClick(this.props.code);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.selected) {
        return /*#__PURE__*/React.createElement("div", {
          className: "language selectedLanguage"
        }, this.props.code);
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "language",
        onClick: this.onClick
      }, this.props.code);
    }
  }]);

  return Language;
}(React.Component);

Language.propTypes = {
  onLanguageClick: PropTypes.func.isRequired
};

var LanguageList = /*#__PURE__*/function (_React$Component2) {
  _inherits$3(LanguageList, _React$Component2);

  var _super2 = _createSuper$3(LanguageList);

  function LanguageList(props) {
    _classCallCheck$4(this, LanguageList);

    return _super2.call(this, props);
  }

  _createClass$3(LanguageList, [{
    key: "render",
    value: function render() {
      var selected = this.props.data.selected;
      selected = selected ? selected.toUpperCase() : selected;
      var onLanguageClick = this.props.onLanguageClick;
      var languageNodes = this.props.data.languages.map(function (language) {
        return /*#__PURE__*/React.createElement(Language, {
          key: language,
          code: language,
          selected: language.toUpperCase() === selected,
          onLanguageClick: onLanguageClick
        });
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "languageList"
      }, languageNodes);
    }
  }]);

  return LanguageList;
}(React.Component);

var LanguageBox = /*#__PURE__*/function (_React$Component3) {
  _inherits$3(LanguageBox, _React$Component3);

  var _super3 = _createSuper$3(LanguageBox);

  function LanguageBox(props) {
    var _this2;

    _classCallCheck$4(this, LanguageBox);

    _this2 = _super3.call(this, props);
    _this2.state = {
      data: {
        languages: [],
        selected: ''
      }
    };
    _this2.changeLanguage = _this2.changeLanguage.bind(_assertThisInitialized$3(_this2));
    return _this2;
  }

  _createClass$3(LanguageBox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (be5.locale.languages && be5.locale.get()) {
        this.setState({
          data: {
            languages: be5.locale.languages,
            selected: be5.locale.get()
          }
        });
      } //this.refresh();

    }
  }, {
    key: "changeLanguage",
    // refresh() {
    //   be5.net.request('languageSelector', {}, function(data) {
    //       be5.locale.set(data.selected, data.messages);
    //       this.setState({ data: {selected: data.selected, languages: data.languages} });
    //     }.bind(this));
    // };
    value: function changeLanguage(language) {
      var _this3 = this;

      be5.net.request('languageSelector/select', {
        language: language
      }, function (data) {
        _this3.setState({
          data: {
            selected: data.selected,
            languages: data.languages
          }
        });

        be5.locale.set(language, data.messages);

        if (be5.store) {
          be5.store.dispatch(fetchUserInfo());
          be5.store.dispatch(fetchMenu('menu'));
        }

        if (be5.url.get()) {
          be5.url.process({
            documentName: MAIN_DOCUMENT
          }, be5.url.get());
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.data && this.state.data.languages.length <= 1) {
        return null;
      }

      return /*#__PURE__*/React.createElement("div", {
        className: classNames$1('languageBox', this.props.className)
      }, /*#__PURE__*/React.createElement(LanguageList, {
        data: this.state.data,
        onLanguageClick: this.changeLanguage
      }));
    }
  }]);

  return LanguageBox;
}(React.Component);

var SideBar = function SideBar() {
  return /*#__PURE__*/React.createElement("div", {
    className: "side-bar"
  }, /*#__PURE__*/React.createElement(UserControlContainer, {
    size: "sm"
  }), /*#__PURE__*/React.createElement(MenuContainer$1, null), /*#__PURE__*/React.createElement(MenuFooter, null), /*#__PURE__*/React.createElement(LanguageBox, null));
};

function _typeof$6(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$6 = function _typeof(obj) { return typeof obj; }; } else { _typeof$6 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$6(obj); }

function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$4(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$4(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$4(Constructor.prototype, protoProps); if (staticProps) _defineProperties$4(Constructor, staticProps); return Constructor; }

function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$4(subClass, superClass); }

function _setPrototypeOf$4(o, p) { _setPrototypeOf$4 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$4(o, p); }

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf$4(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$4(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$4(this, result); }; }

function _possibleConstructorReturn$4(self, call) { if (call && (_typeof$6(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$4(self); }

function _assertThisInitialized$4(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$4(o) { _getPrototypeOf$4 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$4(o); }

var StaticPage = /*#__PURE__*/function (_React$Component) {
  _inherits$4(StaticPage, _React$Component);

  var _super = _createSuper$4(StaticPage);

  function StaticPage() {
    _classCallCheck$5(this, StaticPage);

    return _super.apply(this, arguments);
  }

  _createClass$4(StaticPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      addUrlHandlers($('.staticPage'), this.props.frontendParams.documentName);
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.value) return null;
      var attributes = this.props.value.data.attributes;
      var title = attributes.title ? /*#__PURE__*/React.createElement("h1", {
        className: "staticPage__title"
      }, attributes.title) : null;
      return /*#__PURE__*/React.createElement("div", {
        className: "staticPage"
      }, title, /*#__PURE__*/React.createElement("div", {
        className: "staticPage__text",
        dangerouslySetInnerHTML: {
          __html: attributes.content
        }
      }));
    }
  }]);

  return StaticPage;
}(React.Component);

StaticPage.propTypes = {
  value: PropTypes.shape({
    data: PropTypes.shape({
      attributes: PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.string
      }),
      meta: PropTypes.shape({
        _ts_: PropTypes.isRequired
      })
    })
  })
};
registerDocument("static", StaticPage);

function _typeof$7(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$7 = function _typeof(obj) { return typeof obj; }; } else { _typeof$7 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$7(obj); }

function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$5(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$5(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$5(Constructor.prototype, protoProps); if (staticProps) _defineProperties$5(Constructor, staticProps); return Constructor; }

function _inherits$5(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$5(subClass, superClass); }

function _setPrototypeOf$5(o, p) { _setPrototypeOf$5 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$5(o, p); }

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$5(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$5(this, result); }; }

function _possibleConstructorReturn$5(self, call) { if (call && (_typeof$7(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$5(self); }

function _assertThisInitialized$5(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$5(o) { _getPrototypeOf$5 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$5(o); }

var Document$1 = /*#__PURE__*/function (_React$Component) {
  _inherits$5(Document, _React$Component);

  var _super = _createSuper$5(Document);

  function Document(props) {
    var _this;

    _classCallCheck$6(this, Document);

    _this = _super.call(this, props);

    _this.addBaseLayout(props.value);

    _this.state = {
      value: props.value || null,
      frontendParams: props.frontendParams || {}
    };
    _this.refresh = _this.refresh.bind(_assertThisInitialized$5(_this));
    return _this;
  }

  _createClass$5(Document, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if ('value' in nextProps && (!this.props.value || this.props.value.meta === undefined || !nextProps.value || nextProps.value.meta === undefined || nextProps.value.meta._ts_ > this.props.value.meta._ts_)) {
        this.addBaseLayout(nextProps.value);
        this.setState({
          value: nextProps.value || null,
          frontendParams: nextProps.frontendParams || {}
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      bus.replaceListeners(this.props.frontendParams.documentName, function (data) {
        if (_this2.state.value && _this2.state.value.meta && !Number.isInteger(Number.parseInt(_this2.state.value.meta._ts_))) {
          console.error("meta._ts_ mast be string of Integer " + _this2.state.value.meta._ts_);
        }

        if (!_this2.state.value || !_this2.state.value.meta || !data.value || !data.value.meta || data.value.meta._ts_ > _this2.state.value.meta._ts_) {
          _this2.addBaseLayout(data.value);

          _this2.setState(Object.assign({
            value: {},
            frontendParams: {}
          }, data));
        } // if(!data.loading)this.setState({ loading: false });
        // if(!data.error)this.setState({ error: null });

      });
      bus.replaceListeners(this.props.frontendParams.documentName + DOCUMENT_REFRESH_SUFFIX, function () {
        _this2.refresh();
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      bus.replaceListeners(this.props.frontendParams.documentName, function (data) {});
      bus.replaceListeners(this.props.frontendParams.documentName + DOCUMENT_REFRESH_SUFFIX, function (data) {});
    }
  }, {
    key: "addBaseLayout",
    value: function addBaseLayout(value) {
      if (this.props.baseLayout === undefined || value === undefined || value.data === undefined || value.data.attributes.layout === undefined) return;
      var layout = value.data.attributes.layout;

      for (var key in this.props.baseLayout) {
        if (this.props.baseLayout.hasOwnProperty(key)) {
          if (layout[key] === undefined) layout[key] = this.props.baseLayout[key];
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var loadingItem = null; //this.state.loading
      //? (<div className={"document-loader " + (this.state.error ? "error" : "")}/>): null;
      //if(this.state.value)be5.ui.setTitle(this.state.value.title);

      var document = this.getDocument();

      if (document === null) {
        return null;
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "document-content",
        id: 'document-content___' + this.props.frontendParams.documentName
      }, loadingItem, document);
    }
  }, {
    key: "getDocument",
    value: function getDocument$1() {
      var documentType = this.getDocumentName();

      if (documentType === null) {
        return null;
      }

      if (documentType === undefined) {
        var info = "<br/>props.type: " + this.props.type + "<br/>frontendParams: " + JSON.stringify(this.state.frontendParams);
        var value = createStaticValue("Document type is undefined", info, {
          self: "#!"
        });
        return /*#__PURE__*/React.createElement(StaticPage, {
          value: value,
          frontendParams: this.getComponentFrontendParams()
        });
      }

      var DocumentContent = getDocument(documentType);

      if (DocumentContent === undefined) {
        var title = be5.messages.componentForTypeNotRegistered.replace('$type', documentType);

        var _value = createStaticValue(title, '', {
          self: "#!"
        });

        return /*#__PURE__*/React.createElement(StaticPage, {
          value: _value,
          frontendParams: this.getComponentFrontendParams()
        });
      }

      return /*#__PURE__*/React.createElement("div", null, this.getDevTools(), /*#__PURE__*/React.createElement(DocumentContent, {
        value: this.state.value,
        frontendParams: this.getComponentFrontendParams()
      }));
    }
  }, {
    key: "getDocumentName",
    value: function getDocumentName() {
      if (!this.state.value) {
        return null;
      }

      if (this.props.type) {
        return this.props.type;
      }

      if (this.state.frontendParams.type) {
        return this.state.frontendParams.type;
      }

      if (this.state.value.data) {
        //check type operationResult for avoid repaint form and NPE without props
        if (this.state.value.data.attributes && this.state.value.data.attributes.layout && this.state.value.data.attributes.layout.type !== undefined && this.state.value.data.type !== 'operationResult') {
          return this.state.value.data.attributes.layout.type;
        }

        if (this.state.value.data.type === 'form' && this.props.frontendParams.documentName === MAIN_MODAL_DOCUMENT) {
          return 'modalForm';
        }

        if (this.state.value.data.type === 'table' && this.props.frontendParams.documentName === MAIN_MODAL_DOCUMENT) {
          return 'modalTable';
        }

        return this.state.value.data.type;
      }

      if (this.state.value.errors) {
        return 'errorPane';
      }

      return undefined;
    }
  }, {
    key: "getDevTools",
    value: function getDevTools() {
      if (!hasDevRole() || !getSelfUrl(this.state.value)) {
        return null;
      }

      return /*#__PURE__*/React.createElement("span", {
        onClick: this.refresh,
        className: "document-reload float-right"
      }, /*#__PURE__*/React.createElement("img", {
        src: img,
        alt: be5.messages.reload,
        title: be5.messages.reload + " " + this.props.frontendParams.documentName + " - " + getSelfUrl(this.state.value)
      }));
    }
  }, {
    key: "refresh",
    value: function refresh() {
      be5.url.process(this.props.frontendParams, "#!" + getSelfUrl(this.state.value));
    }
  }, {
    key: "getComponentFrontendParams",
    value: function getComponentFrontendParams() {
      return Object.assign({}, this.state.frontendParams, this.props.frontendParams);
    }
  }]);

  return Document;
}(React.Component);

function hasDevRole() {
  return be5.store && getCurrentRoles(be5.store.getState()).indexOf(ROLE_SYSTEM_DEVELOPER) !== -1;
}

Document$1.propTypes = {
  frontendParams: PropTypes.shape({
    documentName: PropTypes.string.isRequired,
    operationDocumentName: PropTypes.string,
    parentDocumentName: PropTypes.string,
    onSuccess: PropTypes["function"]
  }),
  value: PropTypes.object,
  baseLayout: PropTypes.object,
  type: PropTypes.string
};

function _typeof$8(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$8 = function _typeof(obj) { return typeof obj; }; } else { _typeof$8 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$8(obj); }

function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$6(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$6(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$6(Constructor.prototype, protoProps); if (staticProps) _defineProperties$6(Constructor, staticProps); return Constructor; }

function _inherits$6(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$6(subClass, superClass); }

function _setPrototypeOf$6(o, p) { _setPrototypeOf$6 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$6(o, p); }

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf$6(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$6(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$6(this, result); }; }

function _possibleConstructorReturn$6(self, call) { if (call && (_typeof$8(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$6(self); }

function _assertThisInitialized$6(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$6(o) { _getPrototypeOf$6 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$6(o); }

var Be5Components = /*#__PURE__*/function (_React$Component) {
  _inherits$6(Be5Components, _React$Component);

  var _super = _createSuper$6(Be5Components);

  function Be5Components(props) {
    var _this;

    _classCallCheck$7(this, Be5Components);

    _this = _super.call(this, props);
    _this.state = {
      modal: false
    };
    _this.open = _this.open.bind(_assertThisInitialized$6(_this));
    _this.close = _this.close.bind(_assertThisInitialized$6(_this));
    return _this;
  }

  _createClass$6(Be5Components, [{
    key: "open",
    value: function open() {
      this.setState({
        modal: true
      });
    }
  }, {
    key: "close",
    value: function close() {
      this.setState({
        modal: false
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      bus.listen("mainModalClose", this.close);
      bus.listen("mainModalOpen", this.open);
      bus.listen("alert", function (data) {
        if (data.timeout == null || data.timeout > 0) {
          if (data.type === 'error') {
            Alert.error(data.msg, {
              position: 'top-right',
              timeout: data.timeout > 0 ? 1000 * data.timeout : 5000
            });
          } else {
            Alert.success(data.msg, {
              position: 'top-right',
              timeout: data.timeout > 0 ? 1000 * data.timeout : 5000
            });
          }
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Alert, {
        stack: {
          limit: 10
        },
        html: true
      }), /*#__PURE__*/React.createElement(Modal, {
        isOpen: this.state.modal,
        toggle: this.close,
        className: this.props.className,
        backdrop: "static"
      }, /*#__PURE__*/React.createElement(Document$1, {
        ref: "document",
        frontendParams: {
          documentName: MAIN_MODAL_DOCUMENT
        }
      })));
    }
  }]);

  return Be5Components;
}(React.Component);

var Application = function Application() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Be5Components, null), /*#__PURE__*/React.createElement(SplitPane, {
    split: "vertical",
    defaultSize: 280,
    className: "main-split-pane"
  }, /*#__PURE__*/React.createElement("div", {
    className: "side-pane"
  }, /*#__PURE__*/React.createElement(SideBar, null)), /*#__PURE__*/React.createElement("div", {
    className: "main-pane"
  }, /*#__PURE__*/React.createElement(Document$1, {
    frontendParams: {
      documentName: MAIN_DOCUMENT
    }
  }))));
};

var MainDocumentOnly = function MainDocumentOnly() {
  return /*#__PURE__*/React.createElement("div", {
    className: "MainDocument-only"
  }, /*#__PURE__*/React.createElement(Be5Components, null), /*#__PURE__*/React.createElement(Document$1, {
    frontendParams: {
      documentName: MAIN_DOCUMENT
    }
  }));
};

function _typeof$9(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$9 = function _typeof(obj) { return typeof obj; }; } else { _typeof$9 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$9(obj); }

function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$7(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$7(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$7(Constructor.prototype, protoProps); if (staticProps) _defineProperties$7(Constructor, staticProps); return Constructor; }

function _inherits$7(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$7(subClass, superClass); }

function _setPrototypeOf$7(o, p) { _setPrototypeOf$7 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$7(o, p); }

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf$7(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$7(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$7(this, result); }; }

function _possibleConstructorReturn$7(self, call) { if (call && (_typeof$9(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$7(self); }

function _assertThisInitialized$7(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$7(o) { _getPrototypeOf$7 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$7(o); }
var propTypes$2 = {
  menu: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
  defaultRoute: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

var NavMenu = /*#__PURE__*/function (_Component) {
  _inherits$7(NavMenu, _Component);

  var _super = _createSuper$7(NavMenu);

  function NavMenu(props) {
    _classCallCheck$8(this, NavMenu);

    return _super.call(this, props);
  }

  _createClass$7(NavMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.fetchMenu();
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this$props$user = this.props.user,
          loggedIn = _this$props$user.loggedIn,
          currentRoles = _this$props$user.currentRoles;

      if (!arraysEqual(currentRoles, nextProps.user.currentRoles) || loggedIn !== nextProps.user.loggedIn) {
        this.props.fetchMenu();
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.menu === null) {
        return null;
      }

      return /*#__PURE__*/React.createElement(Nav, {
        className: "",
        navbar: true
      }, this._renderMenuItems(this.props.menu.root, false));
    }
  }, {
    key: "_renderMenuItems",
    value: function _renderMenuItems(items, inDropdown) {
      var _this = this;

      return _(items).map(function (item) {
        if (!item.children || item.children.length === 0) {
          var _actions$parse = actions.parse(item.action),
              href = _actions$parse.href,
              target = _actions$parse.target;

          var _active = false;
          if (_this.isActive(href)) _active = true;
          return /*#__PURE__*/React.createElement(NavItem, {
            key: target + href
          }, /*#__PURE__*/React.createElement(NavLink, {
            onClick: processHashUrl,
            href: href,
            active: _active
          }, item.title));
        }

        var _this$_renderDropdown = _this._renderDropdownMenuItems(item.children, true),
            dropdownMenuItems = _this$_renderDropdown.dropdownMenuItems,
            active = _this$_renderDropdown.active;

        return /*#__PURE__*/React.createElement(UncontrolledDropdown, {
          nav: true,
          inNavbar: true,
          key: item.title
        }, /*#__PURE__*/React.createElement(DropdownToggle, {
          nav: true,
          caret: true,
          className: classNames$1({
            active: active
          })
        }, item.title), /*#__PURE__*/React.createElement(DropdownMenu, null, dropdownMenuItems));
      });
    }
  }, {
    key: "_renderDropdownMenuItems",
    value: function _renderDropdownMenuItems(items) {
      var _this2 = this;

      var anyActive = false;

      var dropdownMenuItems = _(items).map(function (item) {
        var _actions$parse2 = actions.parse(item.action),
            href = _actions$parse2.href,
            target = _actions$parse2.target;

        if (_this2.isActive(href)) anyActive = true;
        return /*#__PURE__*/React.createElement(DropdownItem, {
          onClick: processHashUrl,
          href: href,
          key: target + href,
          active: _this2.isActive(href)
        }, item.title);
      });

      return {
        dropdownMenuItems: dropdownMenuItems,
        active: anyActive
      };
    }
  }, {
    key: "isActive",
    value: function isActive(href) {
      return this.props.url.startsWith(href) || href === "#!" + this.props.defaultRoute && hashUrlIsEmpty(this.props.url);
    }
  }]);

  return NavMenu;
}(Component);

NavMenu.propTypes = propTypes$2;

function _typeof$a(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$a = function _typeof(obj) { return typeof obj; }; } else { _typeof$a = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$a(obj); }

function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$8(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$8(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$8(Constructor.prototype, protoProps); if (staticProps) _defineProperties$8(Constructor, staticProps); return Constructor; }

function _inherits$8(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$8(subClass, superClass); }

function _setPrototypeOf$8(o, p) { _setPrototypeOf$8 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$8(o, p); }

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf$8(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$8(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$8(this, result); }; }

function _possibleConstructorReturn$8(self, call) { if (call && (_typeof$a(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$8(self); }

function _assertThisInitialized$8(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$8(o) { _getPrototypeOf$8 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$8(o); }
var propTypes$3 = {
  menu: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
  defaultRoute: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  brand: PropTypes.string,
  languageBox: PropTypes.bool,
  containerClass: PropTypes.string
};

var NavbarMenu = /*#__PURE__*/function (_Component) {
  _inherits$8(NavbarMenu, _Component);

  var _super = _createSuper$8(NavbarMenu);

  function NavbarMenu(props) {
    var _this;

    _classCallCheck$9(this, NavbarMenu);

    _this = _super.call(this, props);
    _this.state = {
      isOpen: false
    };
    _this.toggle = _this.toggle.bind(_assertThisInitialized$8(_this));
    return _this;
  }

  _createClass$8(NavbarMenu, [{
    key: "toggle",
    value: function toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(Navbar, {
        color: "dark",
        dark: true,
        expand: "md"
      }, /*#__PURE__*/React.createElement("div", {
        className: this.props.containerClass
      }, this.navbarBrand(), /*#__PURE__*/React.createElement(NavbarToggler, {
        onClick: this.toggle
      }), /*#__PURE__*/React.createElement(Collapse, {
        isOpen: this.state.isOpen,
        navbar: true
      }, /*#__PURE__*/React.createElement(NavMenu, this.props), this.rightButtons(), this.languageBox())));
    }
  }, {
    key: "navbarBrand",
    value: function navbarBrand() {
      return this.props.brand ? /*#__PURE__*/React.createElement("a", {
        href: "#!",
        onClick: processHashUrl,
        className: "navbar-brand"
      }, this.props.brand) : undefined;
    }
  }, {
    key: "languageBox",
    value: function languageBox() {
      return this.props.languageBox ? /*#__PURE__*/React.createElement(LanguageBox, {
        className: "ml-2"
      }) : undefined;
    }
  }, {
    key: "rightButtons",
    value: function rightButtons() {
      if (!this.props.user.loggedIn) {
        return this.notLoggedInForm();
      } else {
        return this.loggedInForm();
      }
    }
  }, {
    key: "loggedInForm",
    value: function loggedInForm() {
      var _this$props$user = this.props.user,
          userName = _this$props$user.userName,
          currentRoles = _this$props$user.currentRoles,
          availableRoles = _this$props$user.availableRoles;
      return /*#__PURE__*/React.createElement("form", {
        className: "form-inline ml-auto"
      }, /*#__PURE__*/React.createElement(UncontrolledTooltip, {
        placement: "left",
        target: "RoleSelector"
      }, userName), /*#__PURE__*/React.createElement(RoleSelector, {
        id: "RoleSelector",
        availableRoles: availableRoles,
        currentRoles: currentRoles,
        toggleRoles: this.props.toggleRoles
      }), ' ', /*#__PURE__*/React.createElement(Button, {
        onClick: processHashUrl,
        href: "#!logout",
        color: "secondary"
      }, be5.messages.logout));
    }
  }, {
    key: "notLoggedInForm",
    value: function notLoggedInForm() {
      return /*#__PURE__*/React.createElement("form", {
        className: "form-inline ml-auto"
      }, /*#__PURE__*/React.createElement(Button, {
        onClick: processHashUrl,
        href: "#!login",
        color: "secondary"
      }, be5.messages.login));
    }
  }]);

  return NavbarMenu;
}(Component);

NavbarMenu.propTypes = propTypes$3;
NavbarMenu.defaultProps = {
  containerClass: "container"
};

function _typeof$b(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$b = function _typeof(obj) { return typeof obj; }; } else { _typeof$b = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$b(obj); }

function _classCallCheck$a(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$9(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$9(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$9(Constructor.prototype, protoProps); if (staticProps) _defineProperties$9(Constructor, staticProps); return Constructor; }

function _inherits$9(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$9(subClass, superClass); }

function _setPrototypeOf$9(o, p) { _setPrototypeOf$9 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$9(o, p); }

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf$9(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$9(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$9(this, result); }; }

function _possibleConstructorReturn$9(self, call) { if (call && (_typeof$b(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$9(self); }

function _assertThisInitialized$9(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$9(o) { _getPrototypeOf$9 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$9(o); }

var HelpInfo = /*#__PURE__*/function (_React$Component) {
  _inherits$9(HelpInfo, _React$Component);

  var _super = _createSuper$9(HelpInfo);

  function HelpInfo(props) {
    var _this;

    _classCallCheck$a(this, HelpInfo);

    _this = _super.call(this);
    _this.state = {
      isOpen: props.isOpen
    };
    _this.helpCollapseToggle = _this.helpCollapseToggle.bind(_assertThisInitialized$9(_this));
    return _this;
  }

  _createClass$9(HelpInfo, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.value) {
        be5.url.process({
          documentName: this.props.documentName
        }, "#!" + this.props.value);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.value) {
        be5.url.process({
          documentName: this.props.documentName
        }, "#!" + this.props.value);
      }
    }
  }, {
    key: "helpCollapseToggle",
    value: function helpCollapseToggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.value) {
        return /*#__PURE__*/React.createElement("div", {
          className: "helpInfo clearfix"
        }, /*#__PURE__*/React.createElement(Button, {
          color: "info",
          className: classNames$1('btn-sm', this.props.className),
          onClick: this.helpCollapseToggle
        }, be5.messages.helpInfo), /*#__PURE__*/React.createElement(Collapse, {
          isOpen: this.state.isOpen,
          tag: this.props.tag
        }, /*#__PURE__*/React.createElement("div", {
          className: "alert alert-success max-width-970",
          role: "alert"
        }, /*#__PURE__*/React.createElement(Document$1, {
          frontendParams: {
            documentName: this.props.documentName
          }
        }))));
      } else {
        return null;
      }
    }
  }]);

  return HelpInfo;
}(React.Component);

HelpInfo.propTypes = {
  value: PropTypes.string,
  documentName: PropTypes.string,
  isOpen: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.node
};
HelpInfo.defaultProps = {
  isOpen: false,
  tag: 'div',
  documentName: "helpInfo"
};

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof$c(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$c = function _typeof(obj) { return typeof obj; }; } else { _typeof$c = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$c(obj); }

function _classCallCheck$b(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$a(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$a(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$a(Constructor.prototype, protoProps); if (staticProps) _defineProperties$a(Constructor, staticProps); return Constructor; }

function _inherits$a(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$a(subClass, superClass); }

function _setPrototypeOf$a(o, p) { _setPrototypeOf$a = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$a(o, p); }

function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf$a(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$a(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$a(this, result); }; }

function _possibleConstructorReturn$a(self, call) { if (call && (_typeof$c(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$a(self); }

function _assertThisInitialized$a(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$a(o) { _getPrototypeOf$a = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$a(o); }

var Error$1 = /*#__PURE__*/function (_React$Component) {
  _inherits$a(Error, _React$Component);

  var _super = _createSuper$a(Error);

  function Error() {
    var _this;

    _classCallCheck$b(this, Error);

    _this = _super.call(this);
    _this.state = {
      helpCollapse: false
    };
    _this.helpCollapseToggle = _this.helpCollapseToggle.bind(_assertThisInitialized$a(_this));
    return _this;
  }

  _createClass$a(Error, [{
    key: "helpCollapseToggle",
    value: function helpCollapseToggle() {
      this.setState({
        helpCollapse: !this.state.helpCollapse
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          status = _this$props.status,
          title = _this$props.title,
          code = _this$props.code,
          detail = _this$props.detail;
      return /*#__PURE__*/React.createElement("div", {
        className: "errorPane__error"
      }, /*#__PURE__*/React.createElement("h1", {
        className: 'errorPane__title errorPane__title_' + status
      }, status, " - ", title), this.frontendHelp(), /*#__PURE__*/React.createElement("br", null), code !== undefined ? /*#__PURE__*/React.createElement("pre", {
        className: "errorPane__code",
        dangerouslySetInnerHTML: {
          __html: code
        }
      }) : null, detail !== undefined ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
        color: "info",
        className: "btn-sm",
        onClick: this.helpCollapseToggle,
        style: {
          marginBottom: '1rem'
        }
      }, be5.messages.details), /*#__PURE__*/React.createElement(Collapse, {
        isOpen: this.state.helpCollapse
      }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement("pre", {
        className: "errorPane__detail"
      }, detail))))) : null);
    }
  }, {
    key: "frontendHelp",
    value: function frontendHelp() {
      var status = this.props.status;
      var content;

      if (status === '404' || status === '403') {
        if (status === '404') {
          content = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
            href: "#!",
            className: "btn btn-primary"
          }, be5.messages.goToHomepage));
        }

        if (status === '403') {
          content = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
            href: "/",
            className: "btn btn-primary"
          }, be5.messages.goToHomepage));
        }

        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("h6", null, content));
      }

      return null;
    }
  }]);

  return Error;
}(React.Component);

var ErrorPane = /*#__PURE__*/function (_React$Component2) {
  _inherits$a(ErrorPane, _React$Component2);

  var _super2 = _createSuper$a(ErrorPane);

  function ErrorPane() {
    _classCallCheck$b(this, ErrorPane);

    return _super2.apply(this, arguments);
  }

  _createClass$a(ErrorPane, [{
    key: "render",
    value: function render() {
      var errors = this.props.value.errors;

      if (!errors || errors.length === 0) {
        return null;
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "errorPane"
      }, errors.map(function (error, i) {
        return /*#__PURE__*/React.createElement(Error$1, _extends({}, error, {
          key: i
        }));
      }));
    }
  }]);

  return ErrorPane;
}(React.Component);

ErrorPane.propTypes = {
  value: PropTypes.shape({
    errors: PropTypes.array.isRequired,
    meta: PropTypes.shape({
      _ts_: PropTypes.isRequired
    })
  })
};
registerDocument("errorPane", ErrorPane);

function _typeof$d(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$d = function _typeof(obj) { return typeof obj; }; } else { _typeof$d = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$d(obj); }

function _classCallCheck$c(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$b(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$b(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$b(Constructor.prototype, protoProps); if (staticProps) _defineProperties$b(Constructor, staticProps); return Constructor; }

function _inherits$b(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$b(subClass, superClass); }

function _setPrototypeOf$b(o, p) { _setPrototypeOf$b = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$b(o, p); }

function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf$b(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$b(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$b(this, result); }; }

function _possibleConstructorReturn$b(self, call) { if (call && (_typeof$d(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$b(self); }

function _assertThisInitialized$b(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$b(o) { _getPrototypeOf$b = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$b(o); }

var FormWizard = /*#__PURE__*/function (_React$Component) {
  _inherits$b(FormWizard, _React$Component);

  var _super = _createSuper$b(FormWizard);

  function FormWizard(props) {
    var _this;

    _classCallCheck$c(this, FormWizard);

    _this = _super.call(this, props);
    _this.state = {
      compState: _this.props.startAtStep,
      navState: _this.getNavStates(_this.props.startAtStep, _this.props.steps.length)
    };
    _this.hidden = {
      display: 'none'
    };
    _this.nextTextOnFinalActionStep = _this.props.nextTextOnFinalActionStep ? _this.props.nextTextOnFinalActionStep : _this.props.nextButtonText;
    return _this;
  }

  _createClass$b(FormWizard, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: "init",
    value: function init() {
      this.setState(this.getPrevNextBtnState(this.props.startAtStep));
      processHashUrlForDocument(this.props.steps[this.state.compState].url, this.props.documentName);
    }
  }, {
    key: "getNavStates",
    value: function getNavStates(indx, length) {
      var styles = [];

      for (var i = 0; i < length; i++) {
        if (i === indx) {
          styles.push('doing');
        } else if (i < indx) {
          styles.push('done');
        } else {
          styles.push('todo');
        }
      }

      return {
        current: indx,
        styles: styles
      };
    }
  }, {
    key: "getPrevNextBtnState",
    value: function getPrevNextBtnState(currentStep) {
      var showPreviousBtn = true;
      var showNextBtn = true;
      var nextStepText = this.props.nextButtonText;

      if (currentStep === 0) {
        showPreviousBtn = false;
      }

      if (currentStep === this.props.steps.length - 2) {
        nextStepText = this.props.nextTextOnFinalActionStep || nextStepText;
      }

      if (currentStep >= this.props.steps.length - 1) {
        showNextBtn = false;
        showPreviousBtn = this.props.prevBtnOnLastStep === true;
      }

      return {
        showPreviousBtn: showPreviousBtn,
        showNextBtn: showNextBtn,
        nextStepText: nextStepText
      };
    }
  }, {
    key: "checkNavState",
    value: function checkNavState(currentStep) {
      this.setState(this.getPrevNextBtnState(currentStep));
    }
  }, {
    key: "setNavState",
    value: function setNavState(next) {
      this.setState({
        navState: this.getNavStates(next, this.props.steps.length)
      });

      if (next < this.props.steps.length) {
        this.setState({
          compState: next
        });
      }

      processHashUrlForDocument(this.props.steps[next].url, this.props.documentName);
      this.checkNavState(next);
    }
  }, {
    key: "jumpToStep",
    value: function jumpToStep(evt) {
      this.setNavState(evt);
    }
  }, {
    key: "next",
    value: function next() {
      if (this.state.compState + 1 < this.props.steps.length) {
        this.setNavState(this.state.compState + 1);
      }
    }
  }, {
    key: "previous",
    value: function previous() {
      if (this.state.compState > 0) {
        this.setNavState(this.state.compState - 1);
      }
    }
  }, {
    key: "getClassName",
    value: function getClassName(className, i) {
      var liClassName = className + "-" + this.state.navState.styles[i]; // if step ui based navigation is disabled, then dont highlight step

      if (!this.props.stepsNavigation) liClassName += " no-hl";
      return liClassName;
    }
  }, {
    key: "renderSteps",
    value: function renderSteps() {
      var _this2 = this;

      return this.props.steps.map(function (s, i) {
        return /*#__PURE__*/React.createElement("li", {
          className: _this2.getClassName("progtrckr", i),
          onClick: function onClick() {
            return _this2.jumpToStep(i);
          },
          key: i,
          value: i
        }, /*#__PURE__*/React.createElement("em", null, i + 1), /*#__PURE__*/React.createElement("span", {
          dangerouslySetInnerHTML: {
            __html: _this2.props.steps[i].title
          }
        })) //{this.props.steps[i].name}
        ;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var props = this.props,
          state = this.state;
      return /*#__PURE__*/React.createElement("div", {
        className: "formWizard"
      }, this.props.showSteps ? /*#__PURE__*/React.createElement("ol", {
        className: "progtrckr clearfix"
      }, this.renderSteps()) : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement(Document$1, {
        frontendParams: {
          documentName: props.documentName
        }
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
        style: props.showNavigation ? {} : this.hidden,
        className: "footer-buttons"
      }, /*#__PURE__*/React.createElement("button", {
        className: classNames$1(props.backButtonCls, {
          disabled: !state.showPreviousBtn
        }),
        onClick: function onClick() {
          _this3.previous();
        },
        id: "prev-button"
      }, props.backButtonText), /*#__PURE__*/React.createElement("button", {
        className: classNames$1(props.nextButtonCls, {
          disabled: !state.showNextBtn
        }),
        onClick: function onClick() {
          _this3.next();
        },
        id: "next-button"
      }, state.nextStepText)));
    }
  }]);

  return FormWizard;
}(React.Component);

FormWizard.defaultProps = {
  showSteps: true,
  showNavigation: true,
  stepsNavigation: true,
  prevBtnOnLastStep: true,
  startAtStep: 0,
  nextButtonText: "Next",
  nextButtonCls: "btn btn-prev btn-primary pull-right",
  backButtonText: "Previous",
  backButtonCls: "btn btn-next btn-primary pull-left",
  documentName: "FormWizard"
};
FormWizard.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })).isRequired,
  showSteps: PropTypes.bool,
  showNavigation: PropTypes.bool,
  stepsNavigation: PropTypes.bool,
  prevBtnOnLastStep: PropTypes.bool,
  startAtStep: PropTypes.number,
  nextButtonText: PropTypes.string,
  nextButtonCls: PropTypes.string,
  backButtonCls: PropTypes.string,
  backButtonText: PropTypes.string,
  documentName: PropTypes.string
};

function _typeof$e(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$e = function _typeof(obj) { return typeof obj; }; } else { _typeof$e = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$e(obj); }

function _classCallCheck$d(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$c(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$c(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$c(Constructor.prototype, protoProps); if (staticProps) _defineProperties$c(Constructor, staticProps); return Constructor; }

function _inherits$c(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$c(subClass, superClass); }

function _setPrototypeOf$c(o, p) { _setPrototypeOf$c = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$c(o, p); }

function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = _getPrototypeOf$c(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$c(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$c(this, result); }; }

function _possibleConstructorReturn$c(self, call) { if (call && (_typeof$e(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$c(self); }

function _assertThisInitialized$c(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$c(o) { _getPrototypeOf$c = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$c(o); }

var Navs = /*#__PURE__*/function (_React$Component) {
  _inherits$c(Navs, _React$Component);

  var _super = _createSuper$c(Navs);

  function Navs(props) {
    var _this;

    _classCallCheck$d(this, Navs);

    _this = _super.call(this, props);
    _this.state = {
      compState: _this.props.startAtStep
    };
    _this.init = _this.init.bind(_assertThisInitialized$c(_this));
    _this.setNavState = _this.setNavState.bind(_assertThisInitialized$c(_this));
    return _this;
  }

  _createClass$c(Navs, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      if (this.props.baseUrl !== undefined && this.state.compState !== this.props.startAtStep) {
        this.setState({
          compState: this.props.startAtStep
        }, function () {
          _this2.init();
        });
      }
    }
  }, {
    key: "init",
    value: function init() {
      processHashUrlForDocument(this.props.steps[this.state.compState].url, this.props.documentName);
    }
  }, {
    key: "setNavState",
    value: function setNavState(e) {
      if (!e.ctrlKey) {
        e.preventDefault();
        var id = this.getIDbyUrl(e.target.getAttribute("href"));
        if (this.props.onOpenNav !== undefined) this.props.onOpenNav(id);

        if (this.props.baseUrl !== undefined && this.getUrl(id) !== be5.url.get()) {
          processHashUrlForDocument(this.getUrl(id), this.props.parentDocumentName);
        } else {
          processHashUrlForDocument(e, this.props.documentName);
          this.setState({
            compState: id
          });
        }
      }
    }
  }, {
    key: "getUrl",
    value: function getUrl(id) {
      if (id === 0) return "#!" + this.props.baseUrl;else return "#!" + this.props.baseUrl + "/" + id;
    }
  }, {
    key: "getIDbyUrl",
    value: function getIDbyUrl(url) {
      for (var i = 0; i < this.props.steps.length; i++) {
        if (this.props.steps[i].url === url) return i;
      }

      return 0;
    }
  }, {
    key: "renderSteps",
    value: function renderSteps() {
      var _this3 = this;

      return this.props.steps.map(function (s, i) {
        return /*#__PURE__*/React.createElement(NavItem, {
          key: "NavItem" + i
        }, /*#__PURE__*/React.createElement(NavLink, {
          href: _this3.props.steps[i].url,
          active: i === _this3.state.compState,
          onClick: _this3.setNavState,
          key: "NavLink" + i
        }, _this3.props.steps[i].title));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var navProps = {
        tabs: this.props.tabs,
        pills: this.props.pills,
        vertical: this.props.vertical,
        navbar: this.props.navbar,
        tag: this.props.tag
      };
      return /*#__PURE__*/React.createElement("div", {
        className: "navs-component"
      }, /*#__PURE__*/React.createElement(Nav, navProps, this.renderSteps()), /*#__PURE__*/React.createElement("div", {
        className: "tab-content"
      }, /*#__PURE__*/React.createElement(Document$1, {
        frontendParams: {
          documentName: this.props.documentName
        }
      })));
    }
  }]);

  return Navs;
}(React.Component);

Navs.defaultProps = {
  startAtStep: 0,
  documentName: "navs"
};
Navs.propTypes = {
  tabs: PropTypes.bool,
  pills: PropTypes.bool,
  vertical: PropTypes.bool,
  navbar: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  onOpenNav: PropTypes.func,
  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })).isRequired,
  startAtStep: PropTypes.number,
  baseUrl: PropTypes.string,
  parentDocumentName: PropTypes.string,
  documentName: PropTypes.string
};

var getHashUrl = function getHashUrl(state) {
  return state.hashUrl;
};

var NavbarMenuContainer = function NavbarMenuContainer(props) {
  var Component = props.component || NavbarMenu;
  return /*#__PURE__*/React.createElement(Component, props);
};

var mapStateToProps$2 = function mapStateToProps(state) {
  return {
    menu: getMenu(state),
    user: getUser(state),
    defaultRoute: getDefaultRoute(state),
    url: getHashUrl(state)
  };
};

var mapDispatchToProps$2 = function mapDispatchToProps(dispatch) {
  return {
    toggleRoles: function toggleRoles$1(roles) {
      return dispatch(toggleRoles(roles));
    },
    fetchMenu: function fetchMenu$1(roles) {
      return dispatch(fetchMenu('menu/withIds'));
    }
  };
};

var NavbarMenuContainer$1 = connect(mapStateToProps$2, mapDispatchToProps$2)(NavbarMenuContainer);

var getContextParams = function getContextParams(params) {
  if (params[SEARCH_PARAM] !== "true") {
    return params;
  }

  if (params[SEARCH_PRESETS_PARAM] === undefined) {
    return {};
  }

  var searchPresets = params[SEARCH_PRESETS_PARAM].split(',');
  return Object.keys(params).filter(function (key) {
    return searchPresets.includes(key);
  }).reduce(function (obj, key) {
    obj[key] = params[key];
    return obj;
  }, {});
};
var getFilterParams = function getFilterParams(params) {
  if (params[SEARCH_PARAM] !== "true") {
    return {};
  }

  if (params[SEARCH_PRESETS_PARAM] === undefined) {
    var res = Object.assign({}, params);
    delete res[SEARCH_PARAM];
    return res;
  }

  var searchPresets = params[SEARCH_PRESETS_PARAM].split(',');
  return Object.keys(params).filter(function (key) {
    return !searchPresets.includes(key) && key !== SEARCH_PARAM && key !== SEARCH_PRESETS_PARAM;
  }).reduce(function (obj, key) {
    obj[key] = params[key];
    return obj;
  }, {});
};
var initFilterParams = function initFilterParams(params) {
  var newParams = Object.assign({}, params);

  if (newParams[SEARCH_PARAM] !== "true") {
    var searchPresetParam = getSearchPresetParam(newParams);
    if (searchPresetParam !== null) newParams[SEARCH_PRESETS_PARAM] = searchPresetParam;
    newParams[SEARCH_PARAM] = "true";
  }

  return newParams;
};
var getSearchPresetParam = function getSearchPresetParam(params) {
  return searchPresetParamToString(getSearchPresetNames(params));
};
var searchPresetParamToString = function searchPresetParamToString(searchPresets) {
  return searchPresets.length > 0 ? searchPresets.join(",") : null;
};
var getSearchPresetNames = function getSearchPresetNames(params) {
  if (params[SEARCH_PARAM] === undefined) {
    return Object.keys(params);
  } else {
    if (params[SEARCH_PRESETS_PARAM] !== undefined) {
      return params[SEARCH_PRESETS_PARAM].split(",");
    } else {
      return [];
    }
  }
};
var addFilterParams = function addFilterParams(url, params) {
  var attr = be5.url.parse(url);
  attr.named['_search_'] = 'true';
  attr.named['_search_presets_'] = '';

  for (var key in params) {
    attr.named[key] = params[key];
  }

  return be5.url.form(attr.positional, attr.named);
};

function _defineProperty$4(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var loadTable = function loadTable(params, frontendParams) {
  getTable(params, function (json) {
    //todo remove 'json.data' check after change error code
    _performTable(json, frontendParams);
  }, function (json) {
    changeDocument(frontendParams.documentName, {
      value: json,
      frontendParams: frontendParams
    });
  });
};
var loadTableByUrl = function loadTableByUrl(url, frontendParams) {
  getTable(getTableParams(url), function (json) {
    _performTable(json, frontendParams);
  }, function (json) {
    changeDocument(frontendParams.documentName, {
      value: json,
      frontendParams: frontendParams
    });
  });
};
var fetchTableByUrl = function fetchTableByUrl(url, callback) {
  var failure = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : be5.log.error;
  clearDocumentState(url);
  getTable(getTableParams(url), callback, failure);
};
var asyncSelectLoadOptions = function asyncSelectLoadOptions(params, callback) {
  var input = params.input,
      entity = params.entity,
      query = params.query;
  var url = be5.url.create(["table", entity, query || '*** Selection view ***'], {
    asyncValue: input
  });
  fetchTableByUrl(url, function (json) {
    var options = getSelectOptions(json);
    var complete = json.data.attributes.rows.length < json.data.attributes.length;
    callback(null, {
      options: options,
      // CAREFUL! Only set this to true when there are no more options,
      // or more specific queries will not be sent to the server.
      complete: complete
    });
  });
};
var openTablePage = function openTablePage(attr, frontendParams, page) {
  clearTableFilter(attr.category, attr.page, attr.parameters);
  var previousPageParams = initFilterParams(attr.parameters);
  previousPageParams._offset_ = (page - 1) * attr.length;
  loadTableByUrl(be5.url.form(['table', attr.category, attr.page], previousPageParams), frontendParams);
};

var getSelectOptions = function getSelectOptions(json) {
  var rows = json.data.attributes.rows;
  var options = [];

  for (var i = 0; i < rows.length; i++) {
    options.push({
      value: rows[i].cells[0].content,
      label: rows[i].cells[1].content
    });
  }

  return options;
};

var getTableParams = function getTableParams(url) {
  var _ref;

  var attr = be5.url.parse(url);
  return _ref = {}, _defineProperty$4(_ref, ENTITY_NAME_PARAM, attr.positional[1]), _defineProperty$4(_ref, QUERY_NAME_PARAM, attr.positional[2]), _defineProperty$4(_ref, CONTEXT_PARAMS, attr.named), _ref;
};
var getTable = function getTable(params, callback) {
  var failure = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : be5.log.error;

  if (isGuest) {
    var limit = getQuerySettings(params[ENTITY_NAME_PARAM], params[QUERY_NAME_PARAM], RECORDS_PER_PAGE_SETTINGS);

    if (!isEmptyString(limit) && params[CONTEXT_PARAMS] && isEmptyString(params[CONTEXT_PARAMS][LIMIT])) {
      params[CONTEXT_PARAMS][LIMIT] = limit;
    }
  }

  be5.net.request('table', getRequestParams(params), callback, failure);
};
var updateTable = function updateTable(params, callback) {
  var failure = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : be5.log.error;
  var limit = params[CONTEXT_PARAMS] ? params[CONTEXT_PARAMS][LIMIT] : null; //hot fix remove after fix empty redirect params with SEARCH_PRESETS_PARAM usage

  if (params[CONTEXT_PARAMS] && params[CONTEXT_PARAMS][SEARCH_PRESETS_PARAM]) {
    delete params[CONTEXT_PARAMS][SEARCH_PRESETS_PARAM];
  }

  if (isGuest && !isEmptyString(limit)) {
    var entity = params[ENTITY_NAME_PARAM];
    var query = params[QUERY_NAME_PARAM];
    if (getQuerySettings(RECORDS_PER_PAGE_SETTINGS) !== limit) setQuerySettings(entity, query, RECORDS_PER_PAGE_SETTINGS, limit);
  }

  be5.net.request('table/update', getRequestParams(params), callback, failure);
};

var _performTable = function _performTable(json, frontendParams) {
  var documentName = frontendParams.documentName;
  var formComponentName = json.data.attributes.layout.type;

  if (formComponentName === 'modalTable' || documentName === MAIN_MODAL_DOCUMENT) {
    bus.fire("mainModalOpen");
    changeDocument(MAIN_MODAL_DOCUMENT, {
      value: json,
      frontendParams: frontendParams
    });
  } else {
    changeDocument(documentName, {
      value: json,
      frontendParams: frontendParams
    });
  }
};

var getRequestParams = function getRequestParams(params) {
  var _ref2;

  var entity = params[ENTITY_NAME_PARAM];
  var query = params[QUERY_NAME_PARAM];
  Preconditions.passed(entity);
  Preconditions.passed(query);
  var finalParams = withSavedTableFilter(entity, query, params[CONTEXT_PARAMS]);
  return _ref2 = {}, _defineProperty$4(_ref2, ENTITY_NAME_PARAM, entity), _defineProperty$4(_ref2, QUERY_NAME_PARAM, query), _defineProperty$4(_ref2, CONTEXT_PARAMS, be5.net.paramString(finalParams)), _defineProperty$4(_ref2, TIMESTAMP_PARAM, new Date().getTime()), _ref2;
};

function withSavedTableFilter(entity, query, params) {
  var tableKey = getTableKey(entity, query, params);
  var savedParams = getDocumentState(tableKey);

  if (savedParams !== undefined) {
    return savedParams;
  } else {
    setTableFilter(entity, query, params);
  }

  return params;
}

function setTableFilter(entity, query, parameters) {
  var tableKey = getTableKey(entity, query, parameters);
  var filterParams = parameters;

  if (Object.keys(filterParams).length !== 0) {
    setDocumentState(tableKey, filterParams);
  } else {
    clearDocumentState(tableKey);
  }
}
function clearTableFilter(entity, query, params) {
  var contextParams = getContextParams(params);
  var tableKey = getTableKey(entity, query, contextParams);
  clearDocumentState(tableKey);
}

function getTableKey(entity, query, parameters) {
  return "#!" + be5.url.form(['table', entity, query], getContextParams(parameters));
}

var jQueryFormatCell = function jQueryFormatCell(data, options, isColumn) {
  if (!Array.isArray(data)) {
    if (data === '') {
      if (options && options.blankNulls && options.blankNulls.value) return options.blankNulls.value;
    }
  } else {
    try {
      data = data.map(function (row) {
        return row.join !== undefined ? row.join(', ') : errorData();
      }).join('<br/>');
    } catch (e) {
      console.error(e.message);
      data = e.message;
    }
  }

  function errorData() {
    throw new Error('Error data in cell.');
  }

  if (options) {
    if (options.format) {
      data = numberFormatter(options.format.mask, data);
    }

    if (!isColumn && options.link) {
      data = $('<a>', {
        html: data,
        href: "#!" + options.link.url,
        "class": options.link["class"] || "process-hash-url"
      });
    }

    if (options.css || options === 'th') {
      var wrap = $('<div>');
      if (options.css && options.css["class"]) wrap.addClass(options.css["class"]);
      if (options === 'th') wrap.addClass("ta-center td-strong");
      data = wrap.html(data);
    }
  }

  if (data instanceof $) {
    data = $('<div>').append($(data).clone()).html();
  }

  return data === undefined || data === null ? '' : data;
};

function _typeof$f(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$f = function _typeof(obj) { return typeof obj; }; } else { _typeof$f = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$f(obj); }

function _defineProperty$5(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck$e(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$d(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$d(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$d(Constructor.prototype, protoProps); if (staticProps) _defineProperties$d(Constructor, staticProps); return Constructor; }

function _inherits$d(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$d(subClass, superClass); }

function _setPrototypeOf$d(o, p) { _setPrototypeOf$d = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$d(o, p); }

function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function _createSuperInternal() { var Super = _getPrototypeOf$d(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$d(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$d(this, result); }; }

function _possibleConstructorReturn$d(self, call) { if (call && (_typeof$f(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$d(self); }

function _assertThisInitialized$d(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$d(o) { _getPrototypeOf$d = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$d(o); }

var Form = /*#__PURE__*/function (_React$Component) {
  _inherits$d(Form, _React$Component);

  var _super = _createSuper$d(Form);

  function Form(props) {
    var _this;

    _classCallCheck$e(this, Form);

    _this = _super.call(this, props);
    _this.state = {
      values: _this.props.value.data.attributes.bean.values
    };
    _this._onFieldChange = _this._onFieldChange.bind(_assertThisInitialized$d(_this));
    _this._onReloadOnChange = _this._onReloadOnChange.bind(_assertThisInitialized$d(_this));
    _this._setValue = _this._setValue.bind(_assertThisInitialized$d(_this));
    _this._applyOnSubmit = _this._applyOnSubmit.bind(_assertThisInitialized$d(_this));
    _this.apply = _this.apply.bind(_assertThisInitialized$d(_this));
    return _this;
  }

  _createClass$d(Form, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      addUrlHandlers($('.be5-form'), this.props.frontendParams.documentName);
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      this.setState(Object.assign({}, {
        values: nextProps.value.data.attributes.bean.values,
        wasValidated: false,
        submitted: false
      }));
    }
  }, {
    key: "getParams",
    value: function getParams(values) {
      var _operationInfo;

      var attr = this.props.value.data.attributes;
      var positional;

      if (this.state.formAction) {
        positional = be5.url.parse(this.state.formAction).positional;
      } else {
        positional = ['form', attr.entity, attr.query, attr.operation];
      }

      var operationInfo = (_operationInfo = {}, _defineProperty$5(_operationInfo, ENTITY_NAME_PARAM, positional[1]), _defineProperty$5(_operationInfo, QUERY_NAME_PARAM, positional[2]), _defineProperty$5(_operationInfo, OPERATION_NAME_PARAM, positional[3]), _defineProperty$5(_operationInfo, CONTEXT_PARAMS, JSON.stringify(attr.operationParams)), _operationInfo);
      return getOperationInfo(operationInfo, values);
    }
  }, {
    key: "_reloadOnChange",
    value: function _reloadOnChange(controlName) {
      var _this2 = this;

      if (!this.state.submitted) {
        this.setState({
          submitted: true
        }, function () {
          var values = Object.assign({}, _this2.state.values);
          values[RELOAD_CONTROL_NAME] = controlName;
          forms.load(_this2.getParams(values), _this2.props.frontendParams);
        });
      }
    }
  }, {
    key: "apply",
    value: function apply() {
      var _this3 = this;

      this.setState({
        wasValidated: false
      });

      if (!this.state.submitted) {
        this.setState({
          submitted: true
        }, function () {
          forms.apply(_this3.getParams(_this3.state.values), _this3.props.frontendParams);
        });
      }
    }
  }, {
    key: "_applyOnSubmit",
    value: function _applyOnSubmit(e) {
      // Hitting <enter> in any textbox in Chrome triggers the form submit,
      // even when there is no submit button.
      // That's why I explicitly define the cancellation.
      e.preventDefault();
      this.apply();
    }
  }, {
    key: "_setValue",
    value: function _setValue(name, value, callback) {
      if (!this.state.submitted) {
        var newValues = Object.assign({}, this.state.values);
        JsonPointer.set(newValues, name, value);
        this.setState({
          values: newValues
        }, callback);
      }
    }
  }, {
    key: "_onFieldChange",
    value: function _onFieldChange(name, value) {
      this._setValue(name, value);
    }
  }, {
    key: "_onReloadOnChange",
    value: function _onReloadOnChange(name, value) {
      var _this4 = this;

      var attributes = this.props.value.data.attributes;
      var _attributes$bean$meta = attributes.bean.meta[name],
          reloadOnChange = _attributes$bean$meta.reloadOnChange,
          autoRefresh = _attributes$bean$meta.autoRefresh,
          reloadOnClick = _attributes$bean$meta.reloadOnClick;

      var callback = function callback() {
        if ([reloadOnChange, autoRefresh, reloadOnClick].includes(true)) {
          _this4._reloadOnChange(name);
        }
      };

      if (value !== undefined) {
        this._setValue(name, value, callback);
      } else {
        callback();
      }
    }
  }, {
    key: "_createForm",
    value: function _createForm() {
      return /*#__PURE__*/React.createElement("form", {
        onSubmit: this._applyOnSubmit,
        className: classNames$1(this.state.wasValidated ? 'was-validated' : '')
      }, this._createFormContent());
    }
  }, {
    key: "_createFormContent",
    value: function _createFormContent() {
      return /*#__PURE__*/React.createElement("div", null, this._createFormProperties(), this._createFormActions());
    }
  }, {
    key: "_createFormProperties",
    value: function _createFormProperties() {
      var attributes = this.props.value.data.attributes;
      return /*#__PURE__*/React.createElement(PropertySet, {
        bean: attributes.bean,
        values: this.state.values,
        onChange: this._onFieldChange,
        reloadOnChange: this._onReloadOnChange,
        selectLoadOptions: asyncSelectLoadOptions,
        localization: be5.messages.property,
        bsSize: attributes.layout.bsSize
      });
    }
  }, {
    key: "_createFormActions",
    value: function _createFormActions() {
      return /*#__PURE__*/React.createElement("div", {
        className: "formActions"
      }, this._createSubmitAction(), ' ', _createBackAction(this.props.value.data.attributes.layout, this.props.frontendParams));
    }
  }, {
    key: "_createSubmitAction",
    value: function _createSubmitAction(actionUrl, name) {
      var _this5 = this;

      var attr = this.props.value.data.attributes;
      var _attr$layout = attr.layout,
          bsSize = _attr$layout.bsSize,
          submitText = _attr$layout.submitText;
      return /*#__PURE__*/React.createElement(Transition, {
        "in": this.state.submitted,
        timeout: 600
      }, function (state) {
        return /*#__PURE__*/React.createElement("button", {
          type: "submit",
          className: classNames$1("btn btn-primary", {
            'btn-sm': bsSize === 'sm'
          }, {
            'btn-lg': bsSize === 'lg'
          }),
          onClick: function onClick() {
            return _this5.setState({
              wasValidated: true,
              formAction: actionUrl
            });
          },
          title: _this5.state.submitted ? be5.messages.submitted : "",
          disabled: state === 'entered'
        }, name || submitText || be5.messages.Submit);
      });
    }
  }, {
    key: "_getErrorPane",
    value: function _getErrorPane() {
      var errorModel = this.props.value.data.attributes.errorModel;

      if (errorModel) {
        return /*#__PURE__*/React.createElement(ErrorPane, {
          value: {
            errors: [errorModel],
            meta: this.props.meta
          }
        });
      } else {
        return null;
      }
    }
  }, {
    key: "getFormClass",
    value: function getFormClass() {
      var attributes = this.props.value.data.attributes;
      var entity = makeSafeForClassName(attributes.entity);
      var operation = makeSafeForClassName(attributes.operation);
      return entity + '_' + operation;
    }
  }, {
    key: "render",
    value: function render() {
      var attributes = this.props.value.data.attributes;
      var baseClasses = attributes.layout.baseClasses || 'formBox col-12 max-width-970 formBoxDefault';
      return /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: classNames$1('be5-form', this.getFormClass(), baseClasses, attributes.layout.classes)
      }, /*#__PURE__*/React.createElement("h1", {
        className: "form-component__title"
      }, attributes.title), this._createForm()), /*#__PURE__*/React.createElement("div", {
        className: "col-12"
      }, this._getErrorPane()));
    }
  }]);

  return Form;
}(React.Component);

Form.propTypes = {
  value: PropTypes.object.isRequired,
  frontendParams: PropTypes.object.isRequired
};
registerDocument('verticalForm', Form);

function _typeof$g(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$g = function _typeof(obj) { return typeof obj; }; } else { _typeof$g = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$g(obj); }

function _classCallCheck$f(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$e(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$e(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$e(Constructor.prototype, protoProps); if (staticProps) _defineProperties$e(Constructor, staticProps); return Constructor; }

function _inherits$e(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$e(subClass, superClass); }

function _setPrototypeOf$e(o, p) { _setPrototypeOf$e = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$e(o, p); }

function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function _createSuperInternal() { var Super = _getPrototypeOf$e(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$e(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$e(this, result); }; }

function _possibleConstructorReturn$e(self, call) { if (call && (_typeof$g(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$e(self); }

function _assertThisInitialized$e(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$e(o) { _getPrototypeOf$e = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$e(o); }

var HorizontalForm = /*#__PURE__*/function (_Form) {
  _inherits$e(HorizontalForm, _Form);

  var _super = _createSuper$e(HorizontalForm);

  function HorizontalForm() {
    _classCallCheck$f(this, HorizontalForm);

    return _super.apply(this, arguments);
  }

  _createClass$e(HorizontalForm, [{
    key: "_createFormProperties",
    value: function _createFormProperties() {
      var attributes = this.props.value.data.attributes;
      return /*#__PURE__*/React.createElement(PropertySet, {
        bean: attributes.bean,
        values: this.state.values,
        onChange: this._onFieldChange,
        reloadOnChange: this._onReloadOnChange,
        selectLoadOptions: asyncSelectLoadOptions,
        localization: be5.messages.property,
        bsSize: attributes.layout.bsSize,
        horizontal: true,
        horizontalColSize: attributes.layout.horizontalColSize || 3
      });
    }
  }, {
    key: "_createFormActions",
    value: function _createFormActions() {
      var horizontalColSize = this.props.value.data.attributes.layout.horizontalColSize || 3;
      var colTag = 'col-lg-' + (12 - horizontalColSize);
      var offsetTag = 'offset-lg-' + horizontalColSize;
      return /*#__PURE__*/React.createElement("div", {
        className: "formActions form-row"
      }, /*#__PURE__*/React.createElement("div", {
        className: classNames$1(colTag, offsetTag)
      }, this._createSubmitAction(), ' ', _createBackAction(this.props.value.data.attributes.layout, this.props.frontendParams)));
    }
  }]);

  return HorizontalForm;
}(Form);

registerDocument('form', HorizontalForm);

function _typeof$h(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$h = function _typeof(obj) { return typeof obj; }; } else { _typeof$h = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$h(obj); }

function _classCallCheck$g(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$f(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$f(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$f(Constructor.prototype, protoProps); if (staticProps) _defineProperties$f(Constructor, staticProps); return Constructor; }

function _get$1(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get$1 = Reflect.get; } else { _get$1 = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get$1(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf$f(object); if (object === null) break; } return object; }

function _inherits$f(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$f(subClass, superClass); }

function _setPrototypeOf$f(o, p) { _setPrototypeOf$f = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$f(o, p); }

function _createSuper$f(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$f(); return function _createSuperInternal() { var Super = _getPrototypeOf$f(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$f(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$f(this, result); }; }

function _possibleConstructorReturn$f(self, call) { if (call && (_typeof$h(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$f(self); }

function _assertThisInitialized$f(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$f() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$f(o) { _getPrototypeOf$f = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$f(o); }

var SubmitOnChangeForm = /*#__PURE__*/function (_Form) {
  _inherits$f(SubmitOnChangeForm, _Form);

  var _super = _createSuper$f(SubmitOnChangeForm);

  function SubmitOnChangeForm(props) {
    var _this;

    _classCallCheck$g(this, SubmitOnChangeForm);

    _this = _super.call(this, props);
    _this._onFieldChangeAndSubmit = _this._onFieldChangeAndSubmit.bind(_assertThisInitialized$f(_this));
    return _this;
  }

  _createClass$f(SubmitOnChangeForm, [{
    key: "_onFieldChangeAndSubmit",
    value: function _onFieldChangeAndSubmit(name, value) {
      _get$1(_getPrototypeOf$f(SubmitOnChangeForm.prototype), "_setValue", this).call(this, name, value);

      _get$1(_getPrototypeOf$f(SubmitOnChangeForm.prototype), "apply", this).call(this);
    }
  }, {
    key: "render",
    value: function render() {
      var attributes = this.props.value.data.attributes;
      return /*#__PURE__*/React.createElement("form", {
        className: classNames$1('submit-onchange-form', this.props.wasValidated ? 'was-validated' : '', attributes.layout.classes)
      }, /*#__PURE__*/React.createElement(PropertyInput, {
        id: 0,
        bean: attributes.bean,
        value: JsonPointer.get(attributes.bean.values, attributes.bean.order[0]),
        localization: be5.messages.property,
        onChange: function onChange() {},
        reloadOnChange: this._onFieldChangeAndSubmit,
        selectLoadOptions: asyncSelectLoadOptions,
        bsSize: attributes.layout.bsSize
      }), /*#__PURE__*/React.createElement("div", {
        className: "col-12"
      }, this._getErrorPane()));
    }
  }]);

  return SubmitOnChangeForm;
}(Form);

registerDocument('submitOnChange', SubmitOnChangeForm);

function _typeof$i(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$i = function _typeof(obj) { return typeof obj; }; } else { _typeof$i = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$i(obj); }

function _classCallCheck$h(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$g(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$g(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$g(Constructor.prototype, protoProps); if (staticProps) _defineProperties$g(Constructor, staticProps); return Constructor; }

function _inherits$g(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$g(subClass, superClass); }

function _setPrototypeOf$g(o, p) { _setPrototypeOf$g = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$g(o, p); }

function _createSuper$g(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$g(); return function _createSuperInternal() { var Super = _getPrototypeOf$g(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$g(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$g(this, result); }; }

function _possibleConstructorReturn$g(self, call) { if (call && (_typeof$i(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$g(self); }

function _assertThisInitialized$g(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$g() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$g(o) { _getPrototypeOf$g = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$g(o); }

var ModalForm = /*#__PURE__*/function (_Form) {
  _inherits$g(ModalForm, _Form);

  var _super = _createSuper$g(ModalForm);

  function ModalForm() {
    _classCallCheck$h(this, ModalForm);

    return _super.apply(this, arguments);
  }

  _createClass$g(ModalForm, [{
    key: "_createFormContent",
    value: function _createFormContent() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ModalBody, null, this._createFormProperties()), /*#__PURE__*/React.createElement("div", {
        className: "col-12"
      }, this._getErrorPane()), /*#__PURE__*/React.createElement(ModalFooter, null, this._createSubmitAction(), ' ', this._createModalCloseAction()));
    }
  }, {
    key: "_createModalCloseAction",
    value: function _createModalCloseAction() {
      var _this = this;

      var layout = this.props.value.data.attributes.layout;
      var action = layout.cancelAction || new FrontendAction(CLOSE_MAIN_MODAL);
      return /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "btn btn-secondary close-action-btn",
        onClick: function onClick() {
          return executeFrontendActions(action, _this.props.frontendParams);
        }
      }, layout.cancelActionText || be5.messages.close);
    }
  }, {
    key: "render",
    value: function render() {
      var attributes = this.props.value.data.attributes;
      return /*#__PURE__*/React.createElement("div", {
        className: classNames$1('be5-form', this.getFormClass(), attributes.layout.classes)
      }, /*#__PURE__*/React.createElement(ModalHeader, {
        tag: "h5",
        toggle: function toggle() {
          return bus.fire("mainModalClose");
        }
      }, attributes.title), this._createForm());
    }
  }]);

  return ModalForm;
}(Form);

registerDocument('modalForm', ModalForm);

function _typeof$j(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$j = function _typeof(obj) { return typeof obj; }; } else { _typeof$j = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$j(obj); }

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

function _classCallCheck$i(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$h(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$h(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$h(Constructor.prototype, protoProps); if (staticProps) _defineProperties$h(Constructor, staticProps); return Constructor; }

function _inherits$h(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$h(subClass, superClass); }

function _setPrototypeOf$h(o, p) { _setPrototypeOf$h = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$h(o, p); }

function _createSuper$h(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$h(); return function _createSuperInternal() { var Super = _getPrototypeOf$h(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$h(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$h(this, result); }; }

function _possibleConstructorReturn$h(self, call) { if (call && (_typeof$j(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$h(self); }

function _assertThisInitialized$h(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$h() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$h(o) { _getPrototypeOf$h = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$h(o); }

var InlineMiniForm = /*#__PURE__*/function (_Form) {
  _inherits$h(InlineMiniForm, _Form);

  var _super = _createSuper$h(InlineMiniForm);

  function InlineMiniForm() {
    _classCallCheck$i(this, InlineMiniForm);

    return _super.apply(this, arguments);
  }

  _createClass$h(InlineMiniForm, [{
    key: "render",
    value: function render() {
      var _this = this;

      var attributes = this.props.value.data.attributes;
      var commonProps = {
        bean: attributes.bean,
        onChange: this._onFieldChange,
        reloadOnChange: this._onReloadOnChange,
        selectLoadOptions: asyncSelectLoadOptions,
        localization: be5.messages.property,
        inline: true,
        rowClass: "d-flex",
        bsSize: attributes.layout.bsSize,
        className: 'mr-sm-2'
      };
      var properties = attributes.bean.order.map(function (path) {
        return /*#__PURE__*/React.createElement(Property, _extends$1({
          key: path,
          path: path
        }, commonProps, {
          value: JsonPointer.get(_this.state.values, path)
        }));
      });
      var baseClasses = attributes.layout.baseClasses || 'form-inline-mini';
      return /*#__PURE__*/React.createElement("div", {
        className: classNames$1('be5-form', this.getFormClass(), baseClasses, attributes.layout.classes)
      }, /*#__PURE__*/React.createElement("form", {
        onSubmit: this._applyOnSubmit,
        className: classNames$1('form-inline', this.state.wasValidated ? 'was-validated' : '')
      }, attributes.title !== "" ? /*#__PURE__*/React.createElement("label", {
        className: classNames$1("mr-sm-2", {
          'col-form-label-sm': attributes.layout.bsSize === "sm"
        }, {
          'col-form-label-lg': attributes.layout.bsSize === "lg"
        })
      }, /*#__PURE__*/React.createElement("strong", null, attributes.title)) : null, properties, this._createSubmitAction(), this._getErrorPane()));
    }
  }]);

  return InlineMiniForm;
}(Form);

registerDocument('inlineMiniForm', InlineMiniForm);

function _typeof$k(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$k = function _typeof(obj) { return typeof obj; }; } else { _typeof$k = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$k(obj); }

function _classCallCheck$j(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$i(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$i(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$i(Constructor.prototype, protoProps); if (staticProps) _defineProperties$i(Constructor, staticProps); return Constructor; }

function _inherits$i(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$i(subClass, superClass); }

function _setPrototypeOf$i(o, p) { _setPrototypeOf$i = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$i(o, p); }

function _createSuper$i(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$i(); return function _createSuperInternal() { var Super = _getPrototypeOf$i(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$i(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$i(this, result); }; }

function _possibleConstructorReturn$i(self, call) { if (call && (_typeof$k(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$i(self); }

function _assertThisInitialized$i(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$i() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$i(o) { _getPrototypeOf$i = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$i(o); }

var FinishedResult = /*#__PURE__*/function (_React$Component) {
  _inherits$i(FinishedResult, _React$Component);

  var _super = _createSuper$i(FinishedResult);

  function FinishedResult() {
    _classCallCheck$j(this, FinishedResult);

    return _super.apply(this, arguments);
  }

  _createClass$i(FinishedResult, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      addUrlHandlers($('.finishedResult'), this.props.frontendParams.documentName);
    }
  }, {
    key: "render",
    value: function render() {
      var attributes = this.props.value.data.attributes;
      var result = attributes.operationResult;
      var message = result.message;

      if (result.status === 'FINISHED' && result.message === undefined) {
        message = be5.messages.successfullyCompleted;
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "finishedResult"
      }, /*#__PURE__*/React.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: message
        },
        className: "mb-3"
      }), _createBackAction(attributes.layout, this.props.frontendParams));
    }
  }]);

  return FinishedResult;
}(React.Component);

FinishedResult.propTypes = {
  value: PropTypes.shape({
    data: PropTypes.shape({
      attributes: PropTypes.object.isRequired,
      meta: PropTypes.shape({
        _ts_: PropTypes.isRequired
      })
    })
  })
};
registerDocument('operationResult', FinishedResult);

function _typeof$l(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$l = function _typeof(obj) { return typeof obj; }; } else { _typeof$l = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$l(obj); }

function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1(); }

function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$1(arr); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck$k(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$j(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$j(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$j(Constructor.prototype, protoProps); if (staticProps) _defineProperties$j(Constructor, staticProps); return Constructor; }

function _inherits$j(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$j(subClass, superClass); }

function _setPrototypeOf$j(o, p) { _setPrototypeOf$j = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$j(o, p); }

function _createSuper$j(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$j(); return function _createSuperInternal() { var Super = _getPrototypeOf$j(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$j(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$j(this, result); }; }

function _possibleConstructorReturn$j(self, call) { if (call && (_typeof$l(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$j(self); }

function _assertThisInitialized$j(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$j() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$j(o) { _getPrototypeOf$j = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$j(o); }

var OperationBox = /*#__PURE__*/function (_React$Component) {
  _inherits$j(OperationBox, _React$Component);

  var _super = _createSuper$j(OperationBox);

  function OperationBox(props) {
    _classCallCheck$k(this, OperationBox);

    return _super.call(this, props);
  }

  _createClass$j(OperationBox, [{
    key: "render",
    value: function render() {
      if (!this.props.operations) return null;
      var operationItems = this.splitWithSpaces(this.getOperations());

      if (operationItems.length === 0) {
        return null;
      } else {
        return /*#__PURE__*/React.createElement("div", {
          className: 'operationList'
        }, operationItems);
      }
    }
  }, {
    key: "getOperations",
    value: function getOperations() {
      var _this = this;

      var operations = [];
      var orderOutSize = [];
      this.props.operations.attributes.forEach(function (operation) {
        var layout = operation.layout;

        if (layout && _this.props.operations.attributes.length >= layout.order) {
          var tail = operations.splice(layout.order - 1);
          operations = [].concat(_toConsumableArray$1(operations), [operation], _toConsumableArray$1(tail));
        } else if (layout && _this.props.operations.attributes.length < layout.order) {
          orderOutSize.push(operation);
        } else {
          operations.push(operation);
        }
      });

      if (orderOutSize.length > 0) {
        operations = [].concat(_toConsumableArray$1(operations), _toConsumableArray$1(orderOutSize.sort(function (a, b) {
          return a.layout.order - b.layout.order;
        })));
      }

      return operations.filter(function (operation) {
        return !_this.props.hideOperations.includes(operation.name);
      }).map(function (operation) {
        //      if (operation.isClientSide) {
        //        const action = Action.parse(operation.action);
        //        const attrs = {
        //          key: operation.name,
        //          ref: operation.name,
        //          href: action.href,
        //          target: action.target,
        //          className: 'btn btn-secondary'
        //        };
        //        return React.createElement('a', attrs, operation.title);
        //      }
        return /*#__PURE__*/React.createElement("button", {
          key: operation.name,
          ref: operation.name,
          onClick: _this.onClick.bind(_this, operation.name),
          className: 'btn btn-secondary btn-secondary-old btn-sm',
          disabled: !_this.isEnabled(operation.name)
        }, operation.title);
      });
    }
  }, {
    key: "onClick",
    value: function onClick(name, e) {
      if (this.isEnabled(name)) {
        var operation = this.props.operations.attributes.find(function (operation) {
          return operation.name === name;
        });

        if (!operation.requiresConfirmation || confirm(operation.title + "?")) {
          this.props.onOperationClick(operation);
        }
      }

      e.preventDefault();
    }
  }, {
    key: "isEnabled",
    value: function isEnabled(name) {
      var operation = this.props.operations.attributes.find(function (operation) {
        return operation.name === name;
      });
      var visible = false;

      switch (operation.visibleWhen) {
        case 'always':
          visible = true;
          break;

        case 'oneSelected':
          visible = this.props.selectedRows.length === 1;
          break;

        case 'anySelected':
          visible = this.props.selectedRows.length !== 0;
          break;

        case 'hasRecords':
          visible = this.props.hasRows;
          break;
      }

      return visible;
    }
  }, {
    key: "splitWithSpaces",
    value: function splitWithSpaces(elements) {
      var out = [];

      _(elements).each(function (e) {
        if (out.length !== 0) {
          out.push(' ');
        }

        out.push(e);
      });

      return out;
    }
  }]);

  return OperationBox;
}(React.Component);

OperationBox.defaultProps = {
  hideOperations: []
};

var propTypes$4 = {
  data: PropTypes.shape({
    attributes: PropTypes.array,
    type: PropTypes.string
  }),
  url: PropTypes.string
};

var CategoryNavigation = function CategoryNavigation(_ref) {
  var data = _ref.data,
      url = _ref.url;
  if (!data || !data.attributes || data.attributes.length === 0) return null;
  var categories = data.attributes;
  var pUrl = be5.url.parse(url);
  var currentCat = pUrl.named['cat'];

  if (currentCat === undefined) {
    var _url = be5.url.create(pUrl.positional, Object.assign({}, pUrl.named, {
      cat: categories[0].id
    }));

    return /*#__PURE__*/React.createElement("div", {
      className: "category-navigation category-navigation__not-select"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#!" + _url
    }, be5.locale.msg('Switch to categorized view')));
  }

  var row = [];

  function tableTd(categories, lvl) {
    return categories.map(function (cat) {
      if (parseInt(currentCat) !== cat.id || lvl === 0) {
        var _url2 = lvl === 0 && parseInt(currentCat) === cat.id ? be5.url.create(pUrl.positional) : be5.url.create(pUrl.positional, Object.assign({}, pUrl.named, {
          cat: cat.id
        }));

        return /*#__PURE__*/React.createElement("a", {
          className: "d-block",
          href: "#!" + _url2,
          key: cat.id
        }, cat.name);
      } else {
        return /*#__PURE__*/React.createElement("span", {
          className: "d-block",
          key: cat.id
        }, cat.name);
      }
    });
  }

  function tableRow(categories, lvl) {
    var td = /*#__PURE__*/React.createElement("td", {
      key: lvl
    }, tableTd(categories, lvl));
    row.push(td);

    if (categories.length === 1 && categories[0].children !== undefined && categories[0].children.length > 0) {
      row.push( /*#__PURE__*/React.createElement("td", {
        key: "nav" + lvl
      }, /*#__PURE__*/React.createElement("span", null, "->")));
      tableRow(categories[0].children, lvl + 1);
    }
  }

  tableRow(categories, 0);
  return /*#__PURE__*/React.createElement("div", {
    className: "category-navigation"
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, row))));
};

CategoryNavigation.propTypes = propTypes$4;

function _defineProperty$6(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var positionsParamNames = [ORDER_COLUMN, ORDER_DIR, OFFSET, LIMIT];
var propTypes$5 = {};

var FilterUI = function FilterUI(_ref) {
  var data = _ref.data,
      entity = _ref.entity,
      query = _ref.query,
      params = _ref.params,
      frontendParams = _ref.frontendParams,
      show = _ref.show;
  var filterParams = getFilterParams(params);

  function clearFilter(e) {
    var _paramsObject;

    e.preventDefault();
    var searchPresets = params['_search_presets_'] === undefined ? [] : params['_search_presets_'].split(',');
    var newParams = {};
    searchPresets.forEach(function (x) {
      return newParams[x] = params[x];
    });
    clearTableFilter(entity, query, newParams);
    var paramsObject = (_paramsObject = {}, _defineProperty$6(_paramsObject, ENTITY_NAME_PARAM, entity), _defineProperty$6(_paramsObject, QUERY_NAME_PARAM, query || 'All records'), _defineProperty$6(_paramsObject, CONTEXT_PARAMS, newParams), _paramsObject);
    loadTable(paramsObject, frontendParams);
  }

  function getOperationParamsInfo() {
    if (data && data.attributes.filterInfo && data.attributes.filterInfo.length > 0) {
      return data.attributes.filterInfo.map(function (r) {
        return r.key ? r.key + ': ' + r.value : r.value;
      }).join(', ');
    }

    return '';
  }

  var positionsParamCount = 0;
  positionsParamNames.forEach(function (x) {
    if (filterParams[x] !== undefined) positionsParamCount++;
  });

  if (show && Object.keys(filterParams).length > positionsParamCount) {
    return /*#__PURE__*/React.createElement("div", {
      className: "table-filter-ui mb-2"
    }, /*#__PURE__*/React.createElement("strong", null, be5.messages.table.filter + ': '), /*#__PURE__*/React.createElement("span", null, getOperationParamsInfo()), ' ', /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: clearFilter
    }, be5.messages.table.clearFilter));
  }

  return null;
};

FilterUI.propTypes = propTypes$5;

var tableBoxes = {};
var getTableBox = function getTableBox(type) {
  return tableBoxes[type];
};
var registerTableBox = function registerTableBox(type, component) {
  tableBoxes[type] = component;
};
var getAllTypes = function getAllTypes() {
  return Object.keys(tableBoxes);
};

function _defineProperty$7(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var propTypes$6 = {
  data: PropTypes.shape({
    attributes: PropTypes.array,
    type: PropTypes.string
  }),
  url: PropTypes.string
};

var QuickFiltersBox = function QuickFiltersBox(_ref) {
  var data = _ref.data,
      url = _ref.url;
  if (!data || !data.attributes || !data.attributes.quickFilterInfo || !data.attributes.quickFilterInfo.length === 0) return null;
  var pUrl = be5.url.parse(url);
  var rows = [];
  data.attributes.quickFilterInfo.forEach(function (quickFilter, idx) {
    var title = quickFilter.title,
        param = quickFilter.param,
        tags = quickFilter.tags;
    var named = Object.assign({}, pUrl.named);
    delete named[param];
    var url = be5.url.create(pUrl.positional, named);
    var row = [];

    if (pUrl.named[param] === undefined) {
      row.push( /*#__PURE__*/React.createElement("span", {
        key: "".concat(title, " ").concat(param, " all ").concat(idx)
      }, be5.locale.msg('All')));
    } else {
      row.push( /*#__PURE__*/React.createElement("a", {
        key: "".concat(title, " ").concat(param, " all ").concat(idx),
        href: "#!" + url
      }, be5.locale.msg('All')));
    }

    tags.forEach(function (tag) {
      url = be5.url.create(pUrl.positional, Object.assign({}, pUrl.named, _defineProperty$7({}, param, tag[0])));

      if (pUrl.named[param] === tag[0]) {
        row.push( /*#__PURE__*/React.createElement("span", {
          key: "".concat(url, " ").concat(idx),
          className: "ml-2"
        }, tag[1]));
      } else {
        row.push( /*#__PURE__*/React.createElement("a", {
          key: "".concat(url, " ").concat(idx),
          href: "#!" + url,
          className: "ml-2"
        }, tag[1]));
      }
    });

    if (row.length > 1) {
      rows.push( /*#__PURE__*/React.createElement("div", {
        key: "".concat(title, " ").concat(param, " ").concat(idx),
        className: "d-block mb-2"
      }, title, ": ", row));
    }
  });
  return rows.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "quickfilters-box"
  }, rows) : null;
};

function _typeof$m(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$m = function _typeof(obj) { return typeof obj; }; } else { _typeof$m = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$m(obj); }

function _classCallCheck$l(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$k(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$k(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$k(Constructor.prototype, protoProps); if (staticProps) _defineProperties$k(Constructor, staticProps); return Constructor; }

function _inherits$k(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$k(subClass, superClass); }

function _setPrototypeOf$k(o, p) { _setPrototypeOf$k = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$k(o, p); }

function _createSuper$k(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$k(); return function _createSuperInternal() { var Super = _getPrototypeOf$k(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$k(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$k(this, result); }; }

function _possibleConstructorReturn$k(self, call) { if (call && (_typeof$m(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$k(self); }

function _assertThisInitialized$k(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$k() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$k(o) { _getPrototypeOf$k = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$k(o); }

var Table = /*#__PURE__*/function (_Component) {
  _inherits$k(Table, _Component);

  var _super = _createSuper$k(Table);

  function Table(props) {
    var _this;

    _classCallCheck$l(this, Table);

    _this = _super.call(this, props);
    _this.state = {
      runReload: "",
      selectedRows: []
    };
    _this.onOperationClick = _this.onOperationClick.bind(_assertThisInitialized$k(_this));
    _this.setSelectedRows = _this.setSelectedRows.bind(_assertThisInitialized$k(_this));
    _this.getSelectedRows = _this.getSelectedRows.bind(_assertThisInitialized$k(_this));
    return _this;
  }

  _createClass$k(Table, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      Table.storeDocumentState(this.props);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.value.meta._ts_ > this.props.value.meta._ts_) {
        Table.storeDocumentState(nextProps);
      }

      return true;
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps() {
      if (this.state.selectedRows.length > 0) this.setState({
        selectedRows: []
      });
    }
  }, {
    key: "onOperationClick",
    value: function onOperationClick(operation, selectedRow) {
      var frontendParams = {
        documentName: this.props.frontendParams.operationDocumentName || this.props.frontendParams.documentName,
        parentDocumentName: this.props.frontendParams.documentName
      };

      if (operation.layout && operation.layout.type === 'modalForm') {
        frontendParams.documentName = MAIN_MODAL_DOCUMENT;
      }

      if (operation.clientSide === true) {
        executeFrontendActions(JSON.parse(operation.action), frontendParams);
        return;
      }

      var name = operation.name;
      var attr = this.props.value.data.attributes;
      var contextParams;

      if (this.state.selectedRows.length > 0 || selectedRow) {
        contextParams = Object.assign({}, attr.parameters);
        contextParams[SELECTED_ROWS] = selectedRow || this.state.selectedRows.join();
      } else {
        contextParams = attr.parameters;
      }

      var url = be5.url.form(['form', attr.category, attr.page || 'All records', name], contextParams);
      be5.url.open(frontendParams, "#!" + url);
    }
  }, {
    key: "render",
    value: function render() {
      var value = this.props.value;
      var data = value.data,
          included = value.included,
          meta = value.meta;
      var attributes = data.attributes;

      if (this.props.frontendParams.documentName === MAIN_DOCUMENT) {
        be5.ui.setTitle(attributes.title + ' ' + this.getOperationParamsInfo());
      }

      var topFormJson = getModelByID(included, meta, "topForm");
      var categories = getResourceByType(included, "documentCategories");
      var quickFilters = getResourceByType(included, "quickFilters");
      var operations = getResourceByType(included, "documentOperations");
      var filterInfo = getResourceByType(included, "filterInfo");
      return /*#__PURE__*/React.createElement("div", {
        className: classNames$1("table-component", this.getTableClass(), attributes.layout.classes)
      }, this.topForm(topFormJson), this.getTitleTag(value), /*#__PURE__*/React.createElement(CategoryNavigation, {
        data: categories,
        url: getSelfUrl(this.props.value)
      }), /*#__PURE__*/React.createElement(QuickFiltersBox, {
        data: quickFilters,
        url: getSelfUrl(this.props.value)
      }), /*#__PURE__*/React.createElement(OperationBox, {
        operations: operations,
        onOperationClick: this.onOperationClick,
        selectedRows: this.state.selectedRows,
        hasRows: attributes.rows.length > 0,
        hideOperations: this.getHideOperations(data, topFormJson)
      }), /*#__PURE__*/React.createElement(FilterUI, {
        data: filterInfo,
        entity: attributes.category,
        query: attributes.page,
        params: attributes.parameters,
        frontendParams: this.props.frontendParams,
        show: !["no", "false"].includes(attributes.layout.filterUI)
      }), this.tableBox(value, data, operations), this._createTableCancelAction());
    }
  }, {
    key: "getHideOperations",
    value: function getHideOperations(data, topFormJson) {
      var hideOperations = data.attributes.layout.hideOperations || [];
      if (topFormJson) hideOperations.push(topFormJson.data.attributes.operation);
      return hideOperations;
    }
  }, {
    key: "tableBox",
    value: function tableBox(value, data, operations) {
      var displayType = value.data.attributes.parameters && value.data.attributes.parameters._displayType_ || data.attributes.layout.tableBox || data.attributes.layout._displayType_ || DEFAULT_TABLE_BOX;
      var TableBoxComponent = getTableBox(displayType);

      if (TableBoxComponent === undefined) {
        return /*#__PURE__*/React.createElement("div", null, be5.messages.tableBoxForTypeNotRegistered.replace('$type', displayType));
      }

      return /*#__PURE__*/React.createElement(TableBoxComponent, {
        value: value,
        operations: operations,
        selectedRows: this.state.selectedRows,
        setSelectedRows: this.setSelectedRows,
        getSelectedRows: this.getSelectedRows,
        onOperationClick: this.onOperationClick,
        frontendParams: this.props.frontendParams
      });
    }
  }, {
    key: "setSelectedRows",
    value: function setSelectedRows(newRows) {
      this.setState({
        selectedRows: newRows
      });
    }
  }, {
    key: "getSelectedRows",
    value: function getSelectedRows() {
      return this.state.selectedRows;
    }
  }, {
    key: "getTableClass",
    value: function getTableClass() {
      var attributes = this.props.value.data.attributes;
      var entity = makeSafeForClassName(attributes.category);
      var query = makeSafeForClassName(attributes.page);
      return entity + '_' + query;
    }
  }, {
    key: "getTitleTag",
    value: function getTitleTag(value) {
      if (value.data.attributes.layout.hasOwnProperty('hideTitle')) return null;
      var TitleTag = "h".concat(value.data.attributes.parameters && value.data.attributes.parameters._titleLevel_ || 1);
      var operationParamsInfo = this.getOperationParamsInfo();
      return /*#__PURE__*/React.createElement(TitleTag, {
        className: "table-component__title"
      }, value.data.attributes.title, operationParamsInfo.length > 0 ? ' ' : null, operationParamsInfo.length > 0 ? /*#__PURE__*/React.createElement("small", null, operationParamsInfo) : null);
    }
  }, {
    key: "getOperationParamsInfo",
    value: function getOperationParamsInfo() {
      var filterInfo = getResourceByType(this.props.value.included, "filterInfo");

      if (filterInfo && filterInfo.attributes.operationParamsInfo && filterInfo.attributes.operationParamsInfo.length > 0) {
        var text = filterInfo.attributes.operationParamsInfo.map(function (r) {
          return r.key ? r.key + ': ' + r.value : r.value;
        }).join(', ');
        return be5.messages.table.tableFor + ' ' + text;
      }

      return '';
    }
    /**
     * layout: '{"cancelActionText":"Back"}'
     * layout: '{"cancelAction": {"type": "SET_URL","value":"text/test123"}}'
     */

  }, {
    key: "_createTableCancelAction",
    value: function _createTableCancelAction() {
      var _this2 = this;

      var layout = this.props.value.data.attributes.layout;

      if (layout.hasOwnProperty('cancelAction') || layout.cancelActionText || this.props.frontendParams.documentName === MAIN_DOCUMENT) {
        var action = layout.cancelAction || getBackAction();

        if (action !== undefined) {
          return /*#__PURE__*/React.createElement("button", {
            type: "button",
            className: "btn btn-light mt-2 btn-back",
            onClick: function onClick() {
              return executeFrontendActions(action, _this2.props.frontendParams);
            }
          }, layout.cancelActionText || be5.messages.back);
        }
      }

      return null;
    }
  }, {
    key: "topForm",
    value: function topForm(topFormJson) {
      if (topFormJson) {
        return /*#__PURE__*/React.createElement(Document$1, {
          frontendParams: {
            documentName: "topForm",
            parentDocumentName: this.props.frontendParams.documentName
          },
          value: topFormJson,
          baseLayout: {
            type: 'inlineMiniForm',
            bsSize: 'sm'
          }
        });
      }

      return null;
    }
  }], [{
    key: "storeDocumentState",
    value: function storeDocumentState(props) {
      var attr = props.value.data.attributes;
      setTableFilter(attr.category, attr.page, attr.parameters);
    }
  }]);

  return Table;
}(Component);

Table.propTypes = {
  value: PropTypes.object.isRequired
};
registerDocument('table', Table);

function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (newInputs[i] !== lastInputs[i]) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var lastThis;
    var lastArgs = [];
    var lastResult;
    var calledOnce = false;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
            return lastResult;
        }
        lastResult = resultFn.apply(this, newArgs);
        calledOnce = true;
        lastThis = this;
        lastArgs = newArgs;
        return lastResult;
    }
    return memoized;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  return tag;
}

var StyleSheet =
/*#__PURE__*/
function () {
  function StyleSheet(options) {
    this.isSpeedy = options.speedy === undefined ? "development" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      var _tag = createStyleElement(this);

      var before;

      if (this.tags.length === 0) {
        before = this.before;
      } else {
        before = this.tags[this.tags.length - 1].nextSibling;
      }

      this.container.insertBefore(_tag, before);
      this.tags.push(_tag);
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is a really hot path
        // we check the second character first because having "i"
        // as the second character will happen less often than
        // having "@" as the first character
        var isImportRule = rule.charCodeAt(1) === 105 && rule.charCodeAt(0) === 64; // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools

        sheet.insertRule(rule, // we need to insert @import rules before anything else
        // otherwise there will be an error
        // technically this means that the @import rules will
        // _usually_(not always since there could be multiple style tags)
        // be the first ones in prod and generally later in dev
        // this shouldn't really matter in the real world though
        // @import is generally only used for font faces from google fonts and etc.
        // so while this could be technically correct then it would be slower and larger
        // for a tiny bit of correctness that won't matter in the real world
        isImportRule ? 0 : sheet.cssRules.length);
      } catch (e) {
        {
          console.warn("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();

function stylis_min (W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;

            default:
              f += e.charAt(l);
          }

          g = 59;
        }

        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;

            for (t = ++l; l < B;) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;

                case 125:
                  k--;
                  break;

                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }

                              break;

                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }

                          }
                        }

                        l = u;
                      }

                  }

                  break;

                case 91:
                  g++;

                case 40:
                  g++;

                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g;) {
                  }

              }

              if (0 === k) break;
              l++;
            }

            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);

                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;

                  default:
                    r = O;
                }

                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);

                  case 100:
                  case 109:
                  case 45:
                    k = f + '{' + k + '}';
                    break;

                  case 107:
                    f = f.replace(fa, '$1 $2');
                    k = f + '{' + k + '}';
                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                    break;

                  default:
                    k = f + k, 112 === h && (k = (p += k, ''));
                } else k = '';
                break;

              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }

            F += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;

          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;

              case 64:
                if (105 === g || 99 === g) {
                  G += f + e.charAt(l);
                  break;
                }

              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }

      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;

        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }

        default:
          z++;
          y = e.charAt(l);

          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = '';
                  break;

                default:
                  32 !== g && (y = ' ');
              }
              break;

            case 0:
              y = '\\0';
              break;

            case 12:
              y = '\\f';
              break;

            case 11:
              y = '\\v';
              break;

            case 38:
              0 === n + b + m && (r = I = 1, y = '\f' + y);
              break;

            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                case 8:
                  111 === K && (E = K);
              }
              break;

            case 58:
              0 === n + b + m && (u = l);
              break;

            case 44:
              0 === b + v + n + m && (r = 1, y += '\r');
              break;

            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;

            case 91:
              0 === n + b + v && m++;
              break;

            case 93:
              0 === n + b + v && m--;
              break;

            case 41:
              0 === n + b + m && v--;
              break;

            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;

                  default:
                    q = 1;
                }
                v++;
              }

              break;

            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;

            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;

                    case 220:
                      t = l, b = 42;
                  }

                  break;

                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
              }
          }

          0 === b && (f += y);
      }

      K = x;
      x = g;
      l++;
    }

    t = p.length;

    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
      p = r.join(',') + '{' + p + '}';

      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);

        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;

          case 112:
            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
        }

        E = 0;
      }
    }

    return G + p + F;
  }

  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
        m = d.length;

    switch (m) {
      case 0:
      case 1:
        var b = 0;

        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }

        break;

      default:
        var v = b = 0;

        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e).trim();
          }
        }

    }

    return c;
  }

  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));

    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());

      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());

      default:
        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }

    return d + c;
  }

  function P(d, c, e, h) {
    var a = d + ';',
        m = 2 * c + 3 * e + 4 * h;

    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
    }

    if (0 === w || 2 === w && !L(a, 1)) return a;

    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

      case 1009:
        if (100 !== a.charCodeAt(4)) break;

      case 969:
      case 942:
        return '-webkit-' + a + a;

      case 978:
        return '-webkit-' + a + '-moz-' + a + a;

      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;

      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

          case 115:
            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

          case 98:
            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
        }
        return '-webkit-' + a + '-ms-' + a + a;

      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;

      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;

        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;

          case 232:
            b = a.replace(G, 'tb-rl');
            break;

          case 220:
            b = a.replace(G, 'lr');
            break;

          default:
            return a;
        }

        return '-webkit-' + a + '-ms-' + b + a;

      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;

      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;

          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;

          case 207:
          case 102:
            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
        }

        return a + ';';

      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

          case 115:
            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

          default:
            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
        }
        break;

      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;

      case 962:
        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }

    return a;
  }

  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
        h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }

  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }

  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w; g < A; ++g) {
      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;

        default:
          x = w;
      }
    }

    if (x !== c) return x;
  }

  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;

      default:
        if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
          T(d[c]);
        } else Y = !!d | 0;
    }

    return T;
  }

  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }

  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];

    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }

    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }

  var ca = /^\0+/g,
      N = /[\0\r\f]/g,
      aa = /: */g,
      ka = /zoo|gra/,
      ma = /([,: ])(transform)/g,
      ia = /,\r+?/g,
      F = /([\t\r\n ])*\f?&/g,
      fa = /@(k\w+)\s*(\S*)\s*/,
      Q = /::(place)/g,
      ha = /:(read-only)/g,
      G = /[svh]\w+-[tblr]{2}/,
      da = /\(\s*(.*)\s*\)/g,
      oa = /([\s\S]*?);/g,
      ba = /-self|flex-/g,
      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      la = /stretch|:\s*\w+\-(?:conte|avail)/,
      ja = /([^-])(image-set\()/,
      z = 1,
      D = 1,
      E = 0,
      w = 1,
      O = [],
      S = [],
      A = 0,
      R = null,
      Y = 0,
      V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}

var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

// https://github.com/thysultan/stylis.js/tree/master/plugins/rule-sheet
// inlined to avoid umd wrapper and peerDep warnings/installing stylis
// since we use stylis after closure compiler
var delimiter = '/*|*/';
var needle = delimiter + '}';

function toSheet(block) {
  if (block) {
    Sheet.current.insert(block + '}');
  }
}

var Sheet = {
  current: null
};
var ruleSheet = function ruleSheet(context, content, selectors, parents, line, column, length, ns, depth, at) {
  switch (context) {
    // property
    case 1:
      {
        switch (content.charCodeAt(0)) {
          case 64:
            {
              // @import
              Sheet.current.insert(content + ';');
              return '';
            }
          // charcode for l

          case 108:
            {
              // charcode for b
              // this ignores label
              if (content.charCodeAt(2) === 98) {
                return '';
              }
            }
        }

        break;
      }
    // selector

    case 2:
      {
        if (ns === 0) return content + delimiter;
        break;
      }
    // at-rule

    case 3:
      {
        switch (ns) {
          // @font-face, @page
          case 102:
          case 112:
            {
              Sheet.current.insert(selectors[0] + content);
              return '';
            }

          default:
            {
              return content + (at === 0 ? delimiter : '');
            }
        }
      }

    case -2:
      {
        content.split(needle).forEach(toSheet);
      }
  }
};
var removeLabel = function removeLabel(context, content) {
  if (context === 1 && // charcode for l
  content.charCodeAt(0) === 108 && // charcode for b
  content.charCodeAt(2) === 98 // this ignores label
  ) {
      return '';
    }
};

var isBrowser = typeof document !== 'undefined';
var rootServerStylisCache = {};
var getServerStylisCache = isBrowser ? undefined : weakMemoize(function () {
  var getCache = weakMemoize(function () {
    return {};
  });
  var prefixTrueCache = {};
  var prefixFalseCache = {};
  return function (prefix) {
    if (prefix === undefined || prefix === true) {
      return prefixTrueCache;
    }

    if (prefix === false) {
      return prefixFalseCache;
    }

    return getCache(prefix);
  };
});

var createCache = function createCache(options) {
  if (options === undefined) options = {};
  var key = options.key || 'css';
  var stylisOptions;

  if (options.prefix !== undefined) {
    stylisOptions = {
      prefix: options.prefix
    };
  }

  var stylis = new stylis_min(stylisOptions);

  {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {}; // $FlowFixMe

  var container;

  if (isBrowser) {
    container = options.container || document.head;
    var nodes = document.querySelectorAll("style[data-emotion-" + key + "]");
    Array.prototype.forEach.call(nodes, function (node) {
      var attrib = node.getAttribute("data-emotion-" + key); // $FlowFixMe

      attrib.split(' ').forEach(function (id) {
        inserted[id] = true;
      });

      if (node.parentNode !== container) {
        container.appendChild(node);
      }
    });
  }

  var _insert;

  if (isBrowser) {
    stylis.use(options.stylisPlugins)(ruleSheet);

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      Sheet.current = sheet;

      if ( serialized.map !== undefined) {
        var map = serialized.map;
        Sheet.current = {
          insert: function insert(rule) {
            sheet.insert(rule + map);
          }
        };
      }

      stylis(selector, serialized.styles);

      if (shouldCache) {
        cache.inserted[name] = true;
      }
    };
  } else {
    stylis.use(removeLabel);
    var serverStylisCache = rootServerStylisCache;

    if (options.stylisPlugins || options.prefix !== undefined) {
      stylis.use(options.stylisPlugins); // $FlowFixMe

      serverStylisCache = getServerStylisCache(options.stylisPlugins || rootServerStylisCache)(options.prefix);
    }

    var getRules = function getRules(selector, serialized) {
      var name = serialized.name;

      if (serverStylisCache[name] === undefined) {
        serverStylisCache[name] = stylis(selector, serialized.styles);
      }

      return serverStylisCache[name];
    };

    _insert = function _insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      var rules = getRules(selector, serialized);

      if (cache.compat === undefined) {
        // in regular mode, we don't set the styles on the inserted cache
        // since we don't need to and that would be wasting memory
        // we return them so that they are rendered in a style tag
        if (shouldCache) {
          cache.inserted[name] = true;
        }

        if ( // using === development instead of !== production
        // because if people do ssr in tests, the source maps showing up would be annoying
         serialized.map !== undefined) {
          return rules + serialized.map;
        }

        return rules;
      } else {
        // in compat mode, we put the styles on the inserted cache so
        // that emotion-server can pull out the styles
        // except when we don't want to cache it which was in Global but now
        // is nowhere but we don't want to do a major right now
        // and just in case we're going to leave the case here
        // it's also not affecting client side bundle size
        // so it's really not a big deal
        if (shouldCache) {
          cache.inserted[name] = rules;
        } else {
          return rules;
        }
      }
    };
  }

  {
    // https://esbench.com/bench/5bf7371a4cd7e6009ef61d0a
    var commentStart = /\/\*/g;
    var commentEnd = /\*\//g;
    stylis.use(function (context, content) {
      switch (context) {
        case -1:
          {
            while (commentStart.test(content)) {
              commentEnd.lastIndex = commentStart.lastIndex;

              if (commentEnd.test(content)) {
                commentStart.lastIndex = commentEnd.lastIndex;
                continue;
              }

              throw new Error('Your styles have an unterminated comment ("/*" without corresponding "*/").');
            }

            commentStart.lastIndex = 0;
            break;
          }
      }
    });
    stylis.use(function (context, content, selectors) {
      switch (context) {
        case -1:
          {
            var flag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';
            var unsafePseudoClasses = content.match(/(:first|:nth|:nth-last)-child/g);

            if (unsafePseudoClasses && cache.compat !== true) {
              unsafePseudoClasses.forEach(function (unsafePseudoClass) {
                var ignoreRegExp = new RegExp(unsafePseudoClass + ".*\\/\\* " + flag + " \\*\\/");
                var ignore = ignoreRegExp.test(content);

                if (unsafePseudoClass && !ignore) {
                  console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
                }
              });
            }

            break;
          }
      }
    });
  }

  var cache = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  return cache;
};

var isBrowser$1 = typeof document !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className]);
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser$1 === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var stylesForSSR = '';
    var current = serialized;

    do {
      var maybeStyles = cache.insert("." + className, current, cache.sheet, true);

      if (!isBrowser$1 && maybeStyles !== undefined) {
        stylesForSSR += maybeStyles;
      }

      current = current.next;
    } while (current !== undefined);

    if (!isBrowser$1 && stylesForSSR.length !== 0) {
      return stylesForSSR;
    }
  }
};

/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = memoize(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

{
  var contentValuePattern = /(attr|calc|counters?|url)\(/;
  var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        console.error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

var shouldWarnAboutInterpolatingClassNameFromCss = true;

function handleInterpolation(mergedProps, registered, interpolation, couldBeSelectorInterpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if ( interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if ( interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result, couldBeSelectorInterpolation);
        } else {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];

  if ( couldBeSelectorInterpolation && shouldWarnAboutInterpolatingClassNameFromCss && cached !== undefined) {
    console.error('Interpolating a className from css`` is not recommended and will cause problems with composition.\n' + 'Interpolating a className from css`` will be completely unsupported in a future major version of Emotion');
    shouldWarnAboutInterpolatingClassNameFromCss = false;
  }

  return cached !== undefined && !couldBeSelectorInterpolation ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i], false);
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value, false);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if ( _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
var sourceMapPattern;

{
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings, false);
  } else {
    if ( strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i], styles.charCodeAt(styles.length - 1) === 46);

    if (stringMode) {
      if ( strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = murmur2(styles) + identifierName;

  {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }
};

var isBrowser$2 = typeof document !== 'undefined';
var hasOwnProperty = Object.prototype.hasOwnProperty;

var EmotionCacheContext = /*#__PURE__*/createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? createCache() : null);
var ThemeContext = /*#__PURE__*/createContext({});
var CacheProvider = EmotionCacheContext.Provider;

var withEmotionCache = function withEmotionCache(func) {
  var render = function render(props, ref) {
    return /*#__PURE__*/createElement(EmotionCacheContext.Consumer, null, function (cache) {
      return func(props, cache, ref);
    });
  }; // $FlowFixMe


  return /*#__PURE__*/forwardRef(render);
};

if (!isBrowser$2) {
  var BasicProvider = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(BasicProvider, _React$Component);

    function BasicProvider(props, context, updater) {
      var _this;

      _this = _React$Component.call(this, props, context, updater) || this;
      _this.state = {
        value: createCache()
      };
      return _this;
    }

    var _proto = BasicProvider.prototype;

    _proto.render = function render() {
      return /*#__PURE__*/createElement(EmotionCacheContext.Provider, this.state, this.props.children(this.state.value));
    };

    return BasicProvider;
  }(Component);

  withEmotionCache = function withEmotionCache(func) {
    return function (props) {
      return /*#__PURE__*/createElement(EmotionCacheContext.Consumer, null, function (context) {
        if (context === null) {
          return /*#__PURE__*/createElement(BasicProvider, null, function (newContext) {
            return func(props, newContext);
          });
        } else {
          return func(props, context);
        }
      });
    };
  };
}

// thus we only need to replace what is a valid character for JS, but not for CSS

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {
  if ( typeof props.css === 'string' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/css' like this: css`" + props.css + "`");
  }

  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type; // TODO: check if this still works with all of those different JSX functions

  {
    var error = new Error();

    if (error.stack) {
      // chrome
      var match = error.stack.match(/at (?:Object\.|Module\.|)(?:jsx|createEmotionProps).*\n\s+at (?:Object\.|)([A-Z][A-Za-z$]+) /);

      if (!match) {
        // safari and firefox
        match = error.stack.match(/.*\n([A-Z][A-Za-z$]+)@/);
      }

      if (match) {
        newProps[labelPropName] = sanitizeIdentifier(match[1]);
      }
    }
  }

  return newProps;
};

var render = function render(cache, props, theme, ref) {
  var cssProp = theme === null ? props.css : props.css(theme); // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var type = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = serializeStyles(registeredStyles);

  if ( serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = serializeStyles([serialized, 'label:' + labelFromStack + ';']);
    }
  }

  var rules = insertStyles(cache, serialized, typeof type === 'string');
  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && ( key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  var ele = /*#__PURE__*/createElement(type, newProps);

  if (!isBrowser$2 && rules !== undefined) {
    var _ref;

    var serializedNames = serialized.name;
    var next = serialized.next;

    while (next !== undefined) {
      serializedNames += ' ' + next.name;
      next = next.next;
    }

    return /*#__PURE__*/createElement(Fragment, null, /*#__PURE__*/createElement("style", (_ref = {}, _ref["data-emotion-" + cache.key] = serializedNames, _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref)), ele);
  }

  return ele;
}; // eslint-disable-next-line no-undef


var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
  if (typeof props.css === 'function') {
    return /*#__PURE__*/createElement(ThemeContext.Consumer, null, function (theme) {
      return render(cache, props, theme, ref);
    });
  }

  return render(cache, props, null, ref);
});

{
  Emotion.displayName = 'EmotionCssPropInternal';
}

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return serializeStyles(args);
}

var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || !hasOwnProperty.call(props, 'css')) {
    // $FlowFixMe
    return createElement.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion;
  createElementArgArray[1] = createEmotionProps(type, props);

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe


  return createElement.apply(null, createElementArgArray);
};

var keyframes = function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var ClassNames = withEmotionCache(function (props, context) {
  return /*#__PURE__*/createElement(ThemeContext.Consumer, null, function (theme) {
    var rules = '';
    var serializedHashes = '';
    var hasRendered = false;

    var css = function css() {
      if (hasRendered && "development" !== 'production') {
        throw new Error('css can only be used during render');
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var serialized = serializeStyles(args, context.registered);

      if (isBrowser$2) {
        insertStyles(context, serialized, false);
      } else {
        var res = insertStyles(context, serialized, false);

        if (res !== undefined) {
          rules += res;
        }
      }

      if (!isBrowser$2) {
        serializedHashes += " " + serialized.name;
      }

      return context.key + "-" + serialized.name;
    };

    var cx = function cx() {
      if (hasRendered && "development" !== 'production') {
        throw new Error('cx can only be used during render');
      }

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return merge(context.registered, css, classnames(args));
    };

    var content = {
      css: css,
      cx: cx,
      theme: theme
    };
    var ele = props.children(content);
    hasRendered = true;

    if (!isBrowser$2 && rules.length !== 0) {
      var _ref;

      return /*#__PURE__*/createElement(Fragment, null, /*#__PURE__*/createElement("style", (_ref = {}, _ref["data-emotion-" + context.key] = serializedHashes.substring(1), _ref.dangerouslySetInnerHTML = {
        __html: rules
      }, _ref.nonce = context.sheet.nonce, _ref)), ele);
    }

    return ele;
  });
});

// ==============================
// NO OP
// ==============================
var noop = function noop() {};
// Class Name Prefixer
// ==============================

/**
 String representation of component state for styling with class names.

 Expects an array of strings OR a string/object pair:
 - className(['comp', 'comp-arg', 'comp-arg-2'])
   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
 - className('comp', { some: true, state: false })
   @returns 'react-select__comp react-select__comp--some'
*/

function applyPrefixToName(prefix, name) {
  if (!name) {
    return prefix;
  } else if (name[0] === '-') {
    return prefix + name;
  } else {
    return prefix + '__' + name;
  }
}

function classNames(prefix, state, className) {
  var arr = [className];

  if (state && prefix) {
    for (var key in state) {
      if (state.hasOwnProperty(key) && state[key]) {
        arr.push("" + applyPrefixToName(prefix, key));
      }
    }
  }

  return arr.filter(function (i) {
    return i;
  }).map(function (i) {
    return String(i).trim();
  }).join(' ');
} // ==============================
// Clean Value
// ==============================

var cleanValue = function cleanValue(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'object' && value !== null) return [value];
  return [];
}; // ==============================
// Scroll Helpers
// ==============================

function isDocumentElement(el) {
  return [document.documentElement, document.body, window].indexOf(el) > -1;
} // Normalized Scroll Top
// ------------------------------

function getScrollTop(el) {
  if (isDocumentElement(el)) {
    return window.pageYOffset;
  }

  return el.scrollTop;
}
function scrollTo(el, top) {
  // with a scroll distance, we perform scroll on the element
  if (isDocumentElement(el)) {
    window.scrollTo(0, top);
    return;
  }

  el.scrollTop = top;
} // Get Scroll Parent
// ------------------------------

function getScrollParent(element) {
  var style = getComputedStyle(element);
  var excludeStaticParent = style.position === 'absolute';
  var overflowRx = /(auto|scroll)/;
  var docEl = document.documentElement; // suck it, flow...

  if (style.position === 'fixed') return docEl;

  for (var parent = element; parent = parent.parentElement;) {
    style = getComputedStyle(parent);

    if (excludeStaticParent && style.position === 'static') {
      continue;
    }

    if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent;
    }
  }

  return docEl;
} // Animated Scroll To
// ------------------------------

/**
  @param t: time (elapsed)
  @param b: initial value
  @param c: amount of change
  @param d: duration
*/

function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

function animatedScrollTo(element, to, duration, callback) {
  if (duration === void 0) {
    duration = 200;
  }

  if (callback === void 0) {
    callback = noop;
  }

  var start = getScrollTop(element);
  var change = to - start;
  var increment = 10;
  var currentTime = 0;

  function animateScroll() {
    currentTime += increment;
    var val = easeOutCubic(currentTime, start, change, duration);
    scrollTo(element, val);

    if (currentTime < duration) {
      window.requestAnimationFrame(animateScroll);
    } else {
      callback(element);
    }
  }

  animateScroll();
} // Scroll Into View
// ------------------------------

function scrollIntoView(menuEl, focusedEl) {
  var menuRect = menuEl.getBoundingClientRect();
  var focusedRect = focusedEl.getBoundingClientRect();
  var overScroll = focusedEl.offsetHeight / 3;

  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    scrollTo(menuEl, Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight));
  } else if (focusedRect.top - overScroll < menuRect.top) {
    scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
  }
} // ==============================
// Get bounding client object
// ==============================
// cannot get keys using array notation with DOMRect

function getBoundingClientObj(element) {
  var rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width
  };
}
// Touch Capability Detector
// ==============================

function isTouchCapable() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
} // ==============================
// Mobile Device Detector
// ==============================

function isMobileDevice() {
  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  } catch (e) {
    return false;
  }
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var AutosizeInput_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _react2 = _interopRequireDefault(React);



var _propTypes2 = _interopRequireDefault(PropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sizerStyle = {
	position: 'absolute',
	top: 0,
	left: 0,
	visibility: 'hidden',
	height: 0,
	overflow: 'scroll',
	whiteSpace: 'pre'
};

var INPUT_PROPS_BLACKLIST = ['extraWidth', 'injectStyles', 'inputClassName', 'inputRef', 'inputStyle', 'minWidth', 'onAutosize', 'placeholderIsMinWidth'];

var cleanInputProps = function cleanInputProps(inputProps) {
	INPUT_PROPS_BLACKLIST.forEach(function (field) {
		return delete inputProps[field];
	});
	return inputProps;
};

var copyStyles = function copyStyles(styles, node) {
	node.style.fontSize = styles.fontSize;
	node.style.fontFamily = styles.fontFamily;
	node.style.fontWeight = styles.fontWeight;
	node.style.fontStyle = styles.fontStyle;
	node.style.letterSpacing = styles.letterSpacing;
	node.style.textTransform = styles.textTransform;
};

var isIE = typeof window !== 'undefined' && window.navigator ? /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent) : false;

var generateId = function generateId() {
	// we only need an auto-generated ID for stylesheet injection, which is only
	// used for IE. so if the browser is not IE, this should return undefined.
	return isIE ? '_' + Math.random().toString(36).substr(2, 12) : undefined;
};

var AutosizeInput = function (_Component) {
	_inherits(AutosizeInput, _Component);

	function AutosizeInput(props) {
		_classCallCheck(this, AutosizeInput);

		var _this = _possibleConstructorReturn(this, (AutosizeInput.__proto__ || Object.getPrototypeOf(AutosizeInput)).call(this, props));

		_this.inputRef = function (el) {
			_this.input = el;
			if (typeof _this.props.inputRef === 'function') {
				_this.props.inputRef(el);
			}
		};

		_this.placeHolderSizerRef = function (el) {
			_this.placeHolderSizer = el;
		};

		_this.sizerRef = function (el) {
			_this.sizer = el;
		};

		_this.state = {
			inputWidth: props.minWidth,
			inputId: props.id || generateId()
		};
		return _this;
	}

	_createClass(AutosizeInput, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.mounted = true;
			this.copyInputStyles();
			this.updateInputWidth();
		}
	}, {
		key: 'UNSAFE_componentWillReceiveProps',
		value: function UNSAFE_componentWillReceiveProps(nextProps) {
			var id = nextProps.id;

			if (id !== this.props.id) {
				this.setState({ inputId: id || generateId() });
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if (prevState.inputWidth !== this.state.inputWidth) {
				if (typeof this.props.onAutosize === 'function') {
					this.props.onAutosize(this.state.inputWidth);
				}
			}
			this.updateInputWidth();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.mounted = false;
		}
	}, {
		key: 'copyInputStyles',
		value: function copyInputStyles() {
			if (!this.mounted || !window.getComputedStyle) {
				return;
			}
			var inputStyles = this.input && window.getComputedStyle(this.input);
			if (!inputStyles) {
				return;
			}
			copyStyles(inputStyles, this.sizer);
			if (this.placeHolderSizer) {
				copyStyles(inputStyles, this.placeHolderSizer);
			}
		}
	}, {
		key: 'updateInputWidth',
		value: function updateInputWidth() {
			if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === 'undefined') {
				return;
			}
			var newInputWidth = void 0;
			if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
				newInputWidth = Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2;
			} else {
				newInputWidth = this.sizer.scrollWidth + 2;
			}
			// add extraWidth to the detected width. for number types, this defaults to 16 to allow for the stepper UI
			var extraWidth = this.props.type === 'number' && this.props.extraWidth === undefined ? 16 : parseInt(this.props.extraWidth) || 0;
			newInputWidth += extraWidth;
			if (newInputWidth < this.props.minWidth) {
				newInputWidth = this.props.minWidth;
			}
			if (newInputWidth !== this.state.inputWidth) {
				this.setState({
					inputWidth: newInputWidth
				});
			}
		}
	}, {
		key: 'getInput',
		value: function getInput() {
			return this.input;
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.input.focus();
		}
	}, {
		key: 'blur',
		value: function blur() {
			this.input.blur();
		}
	}, {
		key: 'select',
		value: function select() {
			this.input.select();
		}
	}, {
		key: 'renderStyles',
		value: function renderStyles() {
			// this method injects styles to hide IE's clear indicator, which messes
			// with input size detection. the stylesheet is only injected when the
			// browser is IE, and can also be disabled by the `injectStyles` prop.
			var injectStyles = this.props.injectStyles;

			return isIE && injectStyles ? _react2.default.createElement('style', { dangerouslySetInnerHTML: {
					__html: 'input#' + this.state.inputId + '::-ms-clear {display: none;}'
				} }) : null;
		}
	}, {
		key: 'render',
		value: function render() {
			var sizerValue = [this.props.defaultValue, this.props.value, ''].reduce(function (previousValue, currentValue) {
				if (previousValue !== null && previousValue !== undefined) {
					return previousValue;
				}
				return currentValue;
			});

			var wrapperStyle = _extends({}, this.props.style);
			if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';

			var inputStyle = _extends({
				boxSizing: 'content-box',
				width: this.state.inputWidth + 'px'
			}, this.props.inputStyle);

			var inputProps = _objectWithoutProperties(this.props, []);

			cleanInputProps(inputProps);
			inputProps.className = this.props.inputClassName;
			inputProps.id = this.state.inputId;
			inputProps.style = inputStyle;

			return _react2.default.createElement(
				'div',
				{ className: this.props.className, style: wrapperStyle },
				this.renderStyles(),
				_react2.default.createElement('input', _extends({}, inputProps, { ref: this.inputRef })),
				_react2.default.createElement(
					'div',
					{ ref: this.sizerRef, style: sizerStyle },
					sizerValue
				),
				this.props.placeholder ? _react2.default.createElement(
					'div',
					{ ref: this.placeHolderSizerRef, style: sizerStyle },
					this.props.placeholder
				) : null
			);
		}
	}]);

	return AutosizeInput;
}(React.Component);

AutosizeInput.propTypes = {
	className: _propTypes2.default.string, // className for the outer element
	defaultValue: _propTypes2.default.any, // default field value
	extraWidth: _propTypes2.default.oneOfType([// additional width for input element
	_propTypes2.default.number, _propTypes2.default.string]),
	id: _propTypes2.default.string, // id to use for the input, can be set for consistent snapshots
	injectStyles: _propTypes2.default.bool, // inject the custom stylesheet to hide clear UI, defaults to true
	inputClassName: _propTypes2.default.string, // className for the input element
	inputRef: _propTypes2.default.func, // ref callback for the input element
	inputStyle: _propTypes2.default.object, // css styles for the input element
	minWidth: _propTypes2.default.oneOfType([// minimum width for input element
	_propTypes2.default.number, _propTypes2.default.string]),
	onAutosize: _propTypes2.default.func, // onAutosize handler: function(newWidth) {}
	onChange: _propTypes2.default.func, // onChange handler: function(event) {}
	placeholder: _propTypes2.default.string, // placeholder text
	placeholderIsMinWidth: _propTypes2.default.bool, // don't collapse size to less than the placeholder
	style: _propTypes2.default.object, // css styles for the outer element
	value: _propTypes2.default.any // field value
};
AutosizeInput.defaultProps = {
	minWidth: 1,
	injectStyles: true
};

exports.default = AutosizeInput;
});

var AutosizeInput = /*@__PURE__*/getDefaultExportFromCjs(AutosizeInput_1);

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

function _inheritsLoose$1(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }
function getMenuPlacement(_ref) {
  var maxHeight = _ref.maxHeight,
      menuEl = _ref.menuEl,
      minHeight = _ref.minHeight,
      placement = _ref.placement,
      shouldScroll = _ref.shouldScroll,
      isFixedPosition = _ref.isFixedPosition,
      theme = _ref.theme;
  var spacing = theme.spacing;
  var scrollParent = getScrollParent(menuEl);
  var defaultState = {
    placement: 'bottom',
    maxHeight: maxHeight
  }; // something went wrong, return default state

  if (!menuEl || !menuEl.offsetParent) return defaultState; // we can't trust `scrollParent.scrollHeight` --> it may increase when
  // the menu is rendered

  var _scrollParent$getBoun = scrollParent.getBoundingClientRect(),
      scrollHeight = _scrollParent$getBoun.height;

  var _menuEl$getBoundingCl = menuEl.getBoundingClientRect(),
      menuBottom = _menuEl$getBoundingCl.bottom,
      menuHeight = _menuEl$getBoundingCl.height,
      menuTop = _menuEl$getBoundingCl.top;

  var _menuEl$offsetParent$ = menuEl.offsetParent.getBoundingClientRect(),
      containerTop = _menuEl$offsetParent$.top;

  var viewHeight = window.innerHeight;
  var scrollTop = getScrollTop(scrollParent);
  var marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10);
  var marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10);
  var viewSpaceAbove = containerTop - marginTop;
  var viewSpaceBelow = viewHeight - menuTop;
  var scrollSpaceAbove = viewSpaceAbove + scrollTop;
  var scrollSpaceBelow = scrollHeight - scrollTop - menuTop;
  var scrollDown = menuBottom - viewHeight + scrollTop + marginBottom;
  var scrollUp = scrollTop + menuTop - marginTop;
  var scrollDuration = 160;

  switch (placement) {
    case 'auto':
    case 'bottom':
      // 1: the menu will fit, do nothing
      if (viewSpaceBelow >= menuHeight) {
        return {
          placement: 'bottom',
          maxHeight: maxHeight
        };
      } // 2: the menu will fit, if scrolled


      if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        }

        return {
          placement: 'bottom',
          maxHeight: maxHeight
        };
      } // 3: the menu will fit, if constrained


      if (!isFixedPosition && scrollSpaceBelow >= minHeight || isFixedPosition && viewSpaceBelow >= minHeight) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        } // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.


        var constrainedHeight = isFixedPosition ? viewSpaceBelow - marginBottom : scrollSpaceBelow - marginBottom;
        return {
          placement: 'bottom',
          maxHeight: constrainedHeight
        };
      } // 4. Forked beviour when there isn't enough space below
      // AUTO: flip the menu, render above


      if (placement === 'auto' || isFixedPosition) {
        // may need to be constrained after flipping
        var _constrainedHeight = maxHeight;
        var spaceAbove = isFixedPosition ? viewSpaceAbove : scrollSpaceAbove;

        if (spaceAbove >= minHeight) {
          _constrainedHeight = Math.min(spaceAbove - marginBottom - spacing.controlHeight, maxHeight);
        }

        return {
          placement: 'top',
          maxHeight: _constrainedHeight
        };
      } // BOTTOM: allow browser to increase scrollable area and immediately set scroll


      if (placement === 'bottom') {
        scrollTo(scrollParent, scrollDown);
        return {
          placement: 'bottom',
          maxHeight: maxHeight
        };
      }

      break;

    case 'top':
      // 1: the menu will fit, do nothing
      if (viewSpaceAbove >= menuHeight) {
        return {
          placement: 'top',
          maxHeight: maxHeight
        };
      } // 2: the menu will fit, if scrolled


      if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }

        return {
          placement: 'top',
          maxHeight: maxHeight
        };
      } // 3: the menu will fit, if constrained


      if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
        var _constrainedHeight2 = maxHeight; // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.

        if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
          _constrainedHeight2 = isFixedPosition ? viewSpaceAbove - marginTop : scrollSpaceAbove - marginTop;
        }

        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }

        return {
          placement: 'top',
          maxHeight: _constrainedHeight2
        };
      } // 4. not enough space, the browser WILL NOT increase scrollable area when
      // absolutely positioned element rendered above the viewport (only below).
      // Flip the menu, render below


      return {
        placement: 'bottom',
        maxHeight: maxHeight
      };

    default:
      throw new Error("Invalid placement provided \"" + placement + "\".");
  } // fulfil contract with flow: implicit return value of undefined


  return defaultState;
} // Menu Component
// ------------------------------

function alignToControl(placement) {
  var placementToCSSProp = {
    bottom: 'top',
    top: 'bottom'
  };
  return placement ? placementToCSSProp[placement] : 'bottom';
}

var coercePlacement = function coercePlacement(p) {
  return p === 'auto' ? 'bottom' : p;
};

var menuCSS = function menuCSS(_ref2) {
  var _ref3;

  var placement = _ref2.placement,
      _ref2$theme = _ref2.theme,
      borderRadius = _ref2$theme.borderRadius,
      spacing = _ref2$theme.spacing,
      colors = _ref2$theme.colors;
  return _ref3 = {
    label: 'menu'
  }, _ref3[alignToControl(placement)] = '100%', _ref3.backgroundColor = colors.neutral0, _ref3.borderRadius = borderRadius, _ref3.boxShadow = '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)', _ref3.marginBottom = spacing.menuGutter, _ref3.marginTop = spacing.menuGutter, _ref3.position = 'absolute', _ref3.width = '100%', _ref3.zIndex = 1, _ref3;
}; // NOTE: internal only

var MenuPlacer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose$1(MenuPlacer, _Component);

  function MenuPlacer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      maxHeight: _this.props.maxMenuHeight,
      placement: null
    };

    _this.getPlacement = function (ref) {
      var _this$props = _this.props,
          minMenuHeight = _this$props.minMenuHeight,
          maxMenuHeight = _this$props.maxMenuHeight,
          menuPlacement = _this$props.menuPlacement,
          menuPosition = _this$props.menuPosition,
          menuShouldScrollIntoView = _this$props.menuShouldScrollIntoView,
          theme = _this$props.theme;
      var getPortalPlacement = _this.context.getPortalPlacement;
      if (!ref) return; // DO NOT scroll if position is fixed

      var isFixedPosition = menuPosition === 'fixed';
      var shouldScroll = menuShouldScrollIntoView && !isFixedPosition;
      var state = getMenuPlacement({
        maxHeight: maxMenuHeight,
        menuEl: ref,
        minHeight: minMenuHeight,
        placement: menuPlacement,
        shouldScroll: shouldScroll,
        isFixedPosition: isFixedPosition,
        theme: theme
      });
      if (getPortalPlacement) getPortalPlacement(state);

      _this.setState(state);
    };

    _this.getUpdatedProps = function () {
      var menuPlacement = _this.props.menuPlacement;
      var placement = _this.state.placement || coercePlacement(menuPlacement);
      return _extends$2({}, _this.props, {
        placement: placement,
        maxHeight: _this.state.maxHeight
      });
    };

    return _this;
  }

  var _proto = MenuPlacer.prototype;

  _proto.render = function render() {
    var children = this.props.children;
    return children({
      ref: this.getPlacement,
      placerProps: this.getUpdatedProps()
    });
  };

  return MenuPlacer;
}(Component);
MenuPlacer.contextTypes = {
  getPortalPlacement: PropTypes.func
};

var Menu$1 = function Menu(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerRef = props.innerRef,
      innerProps = props.innerProps;
  return jsx("div", _extends$2({
    css: getStyles('menu', props),
    className: cx({
      menu: true
    }, className)
  }, innerProps, {
    ref: innerRef
  }), children);
};
// Menu List
// ==============================

var menuListCSS = function menuListCSS(_ref4) {
  var maxHeight = _ref4.maxHeight,
      baseUnit = _ref4.theme.spacing.baseUnit;
  return {
    maxHeight: maxHeight,
    overflowY: 'auto',
    paddingBottom: baseUnit,
    paddingTop: baseUnit,
    position: 'relative',
    // required for offset[Height, Top] > keyboard scroll
    WebkitOverflowScrolling: 'touch'
  };
};
var MenuList = function MenuList(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      isMulti = props.isMulti,
      innerRef = props.innerRef;
  return jsx("div", {
    css: getStyles('menuList', props),
    className: cx({
      'menu-list': true,
      'menu-list--is-multi': isMulti
    }, className),
    ref: innerRef
  }, children);
}; // ==============================
// Menu Notices
// ==============================

var noticeCSS = function noticeCSS(_ref5) {
  var _ref5$theme = _ref5.theme,
      baseUnit = _ref5$theme.spacing.baseUnit,
      colors = _ref5$theme.colors;
  return {
    color: colors.neutral40,
    padding: baseUnit * 2 + "px " + baseUnit * 3 + "px",
    textAlign: 'center'
  };
};

var noOptionsMessageCSS = noticeCSS;
var loadingMessageCSS = noticeCSS;
var NoOptionsMessage = function NoOptionsMessage(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
  return jsx("div", _extends$2({
    css: getStyles('noOptionsMessage', props),
    className: cx({
      'menu-notice': true,
      'menu-notice--no-options': true
    }, className)
  }, innerProps), children);
};
NoOptionsMessage.defaultProps = {
  children: 'No options'
};
var LoadingMessage = function LoadingMessage(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
  return jsx("div", _extends$2({
    css: getStyles('loadingMessage', props),
    className: cx({
      'menu-notice': true,
      'menu-notice--loading': true
    }, className)
  }, innerProps), children);
};
LoadingMessage.defaultProps = {
  children: 'Loading...'
}; // ==============================
// Menu Portal
// ==============================

var menuPortalCSS = function menuPortalCSS(_ref6) {
  var rect = _ref6.rect,
      offset = _ref6.offset,
      position = _ref6.position;
  return {
    left: rect.left,
    position: position,
    top: offset,
    width: rect.width,
    zIndex: 1
  };
};
var MenuPortal =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose$1(MenuPortal, _Component2);

  function MenuPortal() {
    var _this2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _Component2.call.apply(_Component2, [this].concat(args)) || this;
    _this2.state = {
      placement: null
    };

    _this2.getPortalPlacement = function (_ref7) {
      var placement = _ref7.placement;
      var initialPlacement = coercePlacement(_this2.props.menuPlacement); // avoid re-renders if the placement has not changed

      if (placement !== initialPlacement) {
        _this2.setState({
          placement: placement
        });
      }
    };

    return _this2;
  }

  var _proto2 = MenuPortal.prototype;

  _proto2.getChildContext = function getChildContext() {
    return {
      getPortalPlacement: this.getPortalPlacement
    };
  } // callback for occassions where the menu must "flip"
  ;

  _proto2.render = function render() {
    var _this$props2 = this.props,
        appendTo = _this$props2.appendTo,
        children = _this$props2.children,
        controlElement = _this$props2.controlElement,
        menuPlacement = _this$props2.menuPlacement,
        position = _this$props2.menuPosition,
        getStyles = _this$props2.getStyles;
    var isFixed = position === 'fixed'; // bail early if required elements aren't present

    if (!appendTo && !isFixed || !controlElement) {
      return null;
    }

    var placement = this.state.placement || coercePlacement(menuPlacement);
    var rect = getBoundingClientObj(controlElement);
    var scrollDistance = isFixed ? 0 : window.pageYOffset;
    var offset = rect[placement] + scrollDistance;
    var state = {
      offset: offset,
      position: position,
      rect: rect
    }; // same wrapper element whether fixed or portalled

    var menuWrapper = jsx("div", {
      css: getStyles('menuPortal', state)
    }, children);
    return appendTo ? createPortal(menuWrapper, appendTo) : menuWrapper;
  };

  return MenuPortal;
}(Component);
MenuPortal.childContextTypes = {
  getPortalPlacement: PropTypes.func
};

var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;

function equal(a, b) {
  // fast-deep-equal index.js 2.0.1
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    var arrA = isArray(a),
        arrB = isArray(b),
        i,
        length,
        key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;

      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i])) return false;
      }

      return true;
    }

    if (arrA != arrB) return false;
    var dateA = a instanceof Date,
        dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();
    var regexpA = a instanceof RegExp,
        regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();
    var keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length) {
      return false;
    }

    for (i = length; i-- !== 0;) {
      if (!hasProp.call(b, keys[i])) return false;
    } // end fast-deep-equal
    // Custom handling for React


    for (i = length; i-- !== 0;) {
      key = keys[i];

      if (key === '_owner' && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner.
        //  _owner contains circular references
        // and is not needed when comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of a react element
        continue;
      } else {
        // all other properties should be traversed as usual
        if (!equal(a[key], b[key])) return false;
      }
    } // fast-deep-equal index.js 2.0.1


    return true;
  }

  return a !== a && b !== b;
} // end fast-deep-equal


function exportedEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if (error.message && error.message.match(/stack|recursion/i)) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('Warning: react-fast-compare does not handle circular references.', error.name, error.message);
      return false;
    } // some other error. we should definitely know about these


    throw error;
  }
}

function _extends$1$1() { _extends$1$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1$1.apply(this, arguments); }
var containerCSS = function containerCSS(_ref) {
  var isDisabled = _ref.isDisabled,
      isRtl = _ref.isRtl;
  return {
    label: 'container',
    direction: isRtl ? 'rtl' : null,
    pointerEvents: isDisabled ? 'none' : null,
    // cancel mouse events when disabled
    position: 'relative'
  };
};
var SelectContainer = function SelectContainer(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isDisabled = props.isDisabled,
      isRtl = props.isRtl;
  return jsx("div", _extends$1$1({
    css: getStyles('container', props),
    className: cx({
      '--is-disabled': isDisabled,
      '--is-rtl': isRtl
    }, className)
  }, innerProps), children);
}; // ==============================
// Value Container
// ==============================

var valueContainerCSS = function valueContainerCSS(_ref2) {
  var spacing = _ref2.theme.spacing;
  return {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    padding: spacing.baseUnit / 2 + "px " + spacing.baseUnit * 2 + "px",
    WebkitOverflowScrolling: 'touch',
    position: 'relative',
    overflow: 'hidden'
  };
};
var ValueContainer = function ValueContainer(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      isMulti = props.isMulti,
      getStyles = props.getStyles,
      hasValue = props.hasValue;
  return jsx("div", {
    css: getStyles('valueContainer', props),
    className: cx({
      'value-container': true,
      'value-container--is-multi': isMulti,
      'value-container--has-value': hasValue
    }, className)
  }, children);
}; // ==============================
// Indicator Container
// ==============================

var indicatorsContainerCSS = function indicatorsContainerCSS() {
  return {
    alignItems: 'center',
    alignSelf: 'stretch',
    display: 'flex',
    flexShrink: 0
  };
};
var IndicatorsContainer = function IndicatorsContainer(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles;
  return jsx("div", {
    css: getStyles('indicatorsContainer', props),
    className: cx({
      indicators: true
    }, className)
  }, children);
};

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  0%, 80%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

function _extends$2$1() { _extends$2$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2$1.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _ref2 =  {
  name: "19bqh2r",
  styles: "display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0JJIiwiZmlsZSI6ImluZGljYXRvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyB0eXBlIE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3gsIGtleWZyYW1lcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuXG5pbXBvcnQgdHlwZSB7IENvbW1vblByb3BzLCBUaGVtZSB9IGZyb20gJy4uL3R5cGVzJztcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBEcm9wZG93biAmIENsZWFyIEljb25zXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgU3ZnID0gKHsgc2l6ZSwgLi4ucHJvcHMgfTogeyBzaXplOiBudW1iZXIgfSkgPT4gKFxuICA8c3ZnXG4gICAgaGVpZ2h0PXtzaXplfVxuICAgIHdpZHRoPXtzaXplfVxuICAgIHZpZXdCb3g9XCIwIDAgMjAgMjBcIlxuICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgZm9jdXNhYmxlPVwiZmFsc2VcIlxuICAgIGNzcz17e1xuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBmaWxsOiAnY3VycmVudENvbG9yJyxcbiAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICBzdHJva2U6ICdjdXJyZW50Q29sb3InLFxuICAgICAgc3Ryb2tlV2lkdGg6IDAsXG4gICAgfX1cbiAgICB7Li4ucHJvcHN9XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgQ3Jvc3NJY29uID0gKHByb3BzOiBhbnkpID0+IChcbiAgPFN2ZyBzaXplPXsyMH0gey4uLnByb3BzfT5cbiAgICA8cGF0aCBkPVwiTTE0LjM0OCAxNC44NDljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDBsLTIuNjUxLTMuMDMwLTIuNjUxIDMuMDI5Yy0wLjQ2OSAwLjQ2OS0xLjIyOSAwLjQ2OS0xLjY5NyAwLTAuNDY5LTAuNDY5LTAuNDY5LTEuMjI5IDAtMS42OTdsMi43NTgtMy4xNS0yLjc1OS0zLjE1MmMtMC40NjktMC40NjktMC40NjktMS4yMjggMC0xLjY5N3MxLjIyOC0wLjQ2OSAxLjY5NyAwbDIuNjUyIDMuMDMxIDIuNjUxLTMuMDMxYzAuNDY5LTAuNDY5IDEuMjI4LTAuNDY5IDEuNjk3IDBzMC40NjkgMS4yMjkgMCAxLjY5N2wtMi43NTggMy4xNTIgMi43NTggMy4xNWMwLjQ2OSAwLjQ2OSAwLjQ2OSAxLjIyOSAwIDEuNjk4elwiIC8+XG4gIDwvU3ZnPlxuKTtcbmV4cG9ydCBjb25zdCBEb3duQ2hldnJvbiA9IChwcm9wczogYW55KSA9PiAoXG4gIDxTdmcgc2l6ZT17MjB9IHsuLi5wcm9wc30+XG4gICAgPHBhdGggZD1cIk00LjUxNiA3LjU0OGMwLjQzNi0wLjQ0NiAxLjA0My0wLjQ4MSAxLjU3NiAwbDMuOTA4IDMuNzQ3IDMuOTA4LTMuNzQ3YzAuNTMzLTAuNDgxIDEuMTQxLTAuNDQ2IDEuNTc0IDAgMC40MzYgMC40NDUgMC40MDggMS4xOTcgMCAxLjYxNS0wLjQwNiAwLjQxOC00LjY5NSA0LjUwMi00LjY5NSA0LjUwMi0wLjIxNyAwLjIyMy0wLjUwMiAwLjMzNS0wLjc4NyAwLjMzNXMtMC41Ny0wLjExMi0wLjc4OS0wLjMzNWMwIDAtNC4yODctNC4wODQtNC42OTUtNC41MDJzLTAuNDM2LTEuMTcgMC0xLjYxNXpcIiAvPlxuICA8L1N2Zz5cbik7XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gRHJvcGRvd24gJiBDbGVhciBCdXR0b25zXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IHR5cGUgSW5kaWNhdG9yUHJvcHMgPSBDb21tb25Qcm9wcyAmIHtcbiAgLyoqIFRoZSBjaGlsZHJlbiB0byBiZSByZW5kZXJlZCBpbnNpZGUgdGhlIGluZGljYXRvci4gKi9cbiAgY2hpbGRyZW46IE5vZGUsXG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogYW55LFxuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuLFxuICAvKiogV2hldGhlciB0aGUgdGV4dCBpcyByaWdodCB0byBsZWZ0ICovXG4gIGlzUnRsOiBib29sZWFuLFxufTtcblxuY29uc3QgYmFzZUNTUyA9ICh7XG4gIGlzRm9jdXNlZCxcbiAgdGhlbWU6IHtcbiAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gICAgY29sb3JzLFxuICB9LFxufTogSW5kaWNhdG9yUHJvcHMpID0+ICh7XG4gIGxhYmVsOiAnaW5kaWNhdG9yQ29udGFpbmVyJyxcbiAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHBhZGRpbmc6IGJhc2VVbml0ICogMixcbiAgdHJhbnNpdGlvbjogJ2NvbG9yIDE1MG1zJyxcblxuICAnOmhvdmVyJzoge1xuICAgIGNvbG9yOiBpc0ZvY3VzZWQgPyBjb2xvcnMubmV1dHJhbDgwIDogY29sb3JzLm5ldXRyYWw0MCxcbiAgfSxcbn0pO1xuXG5leHBvcnQgY29uc3QgZHJvcGRvd25JbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IERyb3Bkb3duSW5kaWNhdG9yID0gKHByb3BzOiBJbmRpY2F0b3JQcm9wcykgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUsIGN4LCBnZXRTdHlsZXMsIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2Ryb3Bkb3duSW5kaWNhdG9yJywgcHJvcHMpfVxuICAgICAgY2xhc3NOYW1lPXtjeChcbiAgICAgICAge1xuICAgICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgICAnZHJvcGRvd24taW5kaWNhdG9yJzogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3NOYW1lXG4gICAgICApfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8RG93bkNoZXZyb24gLz59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgY2xlYXJJbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IENsZWFySW5kaWNhdG9yID0gKHByb3BzOiBJbmRpY2F0b3JQcm9wcykgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUsIGN4LCBnZXRTdHlsZXMsIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2NsZWFySW5kaWNhdG9yJywgcHJvcHMpfVxuICAgICAgY2xhc3NOYW1lPXtjeChcbiAgICAgICAge1xuICAgICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgICAnY2xlYXItaW5kaWNhdG9yJzogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3NOYW1lXG4gICAgICApfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8Q3Jvc3NJY29uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZXBhcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG50eXBlIFNlcGFyYXRvclN0YXRlID0geyBpc0Rpc2FibGVkOiBib29sZWFuIH07XG5cbmV4cG9ydCBjb25zdCBpbmRpY2F0b3JTZXBhcmF0b3JDU1MgPSAoe1xuICBpc0Rpc2FibGVkLFxuICB0aGVtZToge1xuICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICBjb2xvcnMsXG4gIH0sXG59OiBDb21tb25Qcm9wcyAmIFNlcGFyYXRvclN0YXRlKSA9PiAoe1xuICBsYWJlbDogJ2luZGljYXRvclNlcGFyYXRvcicsXG4gIGFsaWduU2VsZjogJ3N0cmV0Y2gnLFxuICBiYWNrZ3JvdW5kQ29sb3I6IGlzRGlzYWJsZWQgPyBjb2xvcnMubmV1dHJhbDEwIDogY29sb3JzLm5ldXRyYWwyMCxcbiAgbWFyZ2luQm90dG9tOiBiYXNlVW5pdCAqIDIsXG4gIG1hcmdpblRvcDogYmFzZVVuaXQgKiAyLFxuICB3aWR0aDogMSxcbn0pO1xuXG5leHBvcnQgY29uc3QgSW5kaWNhdG9yU2VwYXJhdG9yID0gKHByb3BzOiBJbmRpY2F0b3JQcm9wcykgPT4ge1xuICBjb25zdCB7IGNsYXNzTmFtZSwgY3gsIGdldFN0eWxlcywgaW5uZXJQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPHNwYW5cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2luZGljYXRvclNlcGFyYXRvcicsIHByb3BzKX1cbiAgICAgIGNsYXNzTmFtZT17Y3goeyAnaW5kaWNhdG9yLXNlcGFyYXRvcic6IHRydWUgfSwgY2xhc3NOYW1lKX1cbiAgICAvPlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBMb2FkaW5nXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgbG9hZGluZ0RvdEFuaW1hdGlvbnMgPSBrZXlmcmFtZXNgXG4gIDAlLCA4MCUsIDEwMCUgeyBvcGFjaXR5OiAwOyB9XG4gIDQwJSB7IG9wYWNpdHk6IDE7IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBsb2FkaW5nSW5kaWNhdG9yQ1NTID0gKHtcbiAgaXNGb2N1c2VkLFxuICBzaXplLFxuICB0aGVtZToge1xuICAgIGNvbG9ycyxcbiAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gIH0sXG59OiB7XG4gIGlzRm9jdXNlZDogYm9vbGVhbixcbiAgc2l6ZTogbnVtYmVyLFxuICB0aGVtZTogVGhlbWUsXG59KSA9PiAoe1xuICBsYWJlbDogJ2xvYWRpbmdJbmRpY2F0b3InLFxuICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgcGFkZGluZzogYmFzZVVuaXQgKiAyLFxuICB0cmFuc2l0aW9uOiAnY29sb3IgMTUwbXMnLFxuICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICBmb250U2l6ZTogc2l6ZSxcbiAgbGluZUhlaWdodDogMSxcbiAgbWFyZ2luUmlnaHQ6IHNpemUsXG4gIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxufSk7XG5cbnR5cGUgRG90UHJvcHMgPSB7IGRlbGF5OiBudW1iZXIsIG9mZnNldDogYm9vbGVhbiB9O1xuY29uc3QgTG9hZGluZ0RvdCA9ICh7IGRlbGF5LCBvZmZzZXQgfTogRG90UHJvcHMpID0+IChcbiAgPHNwYW5cbiAgICBjc3M9e3tcbiAgICAgIGFuaW1hdGlvbjogYCR7bG9hZGluZ0RvdEFuaW1hdGlvbnN9IDFzIGVhc2UtaW4tb3V0ICR7ZGVsYXl9bXMgaW5maW5pdGU7YCxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBib3JkZXJSYWRpdXM6ICcxZW0nLFxuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBtYXJnaW5MZWZ0OiBvZmZzZXQgPyAnMWVtJyA6IG51bGwsXG4gICAgICBoZWlnaHQ6ICcxZW0nLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICB3aWR0aDogJzFlbScsXG4gICAgfX1cbiAgLz5cbik7XG5cbmV4cG9ydCB0eXBlIExvYWRpbmdJY29uUHJvcHMgPSB7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogYW55LFxuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuLFxuICAvKiogV2hldGhlciB0aGUgdGV4dCBpcyByaWdodCB0byBsZWZ0ICovXG4gIGlzUnRsOiBib29sZWFuLFxufSAmIENvbW1vblByb3BzICYge1xuICAgIC8qKiBTZXQgc2l6ZSBvZiB0aGUgY29udGFpbmVyLiAqL1xuICAgIHNpemU6IG51bWJlcixcbiAgfTtcbmV4cG9ydCBjb25zdCBMb2FkaW5nSW5kaWNhdG9yID0gKHByb3BzOiBMb2FkaW5nSWNvblByb3BzKSA9PiB7XG4gIGNvbnN0IHsgY2xhc3NOYW1lLCBjeCwgZ2V0U3R5bGVzLCBpbm5lclByb3BzLCBpc1J0bCB9ID0gcHJvcHM7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICAgIGNzcz17Z2V0U3R5bGVzKCdsb2FkaW5nSW5kaWNhdG9yJywgcHJvcHMpfVxuICAgICAgY2xhc3NOYW1lPXtjeChcbiAgICAgICAge1xuICAgICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgICAnbG9hZGluZy1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBjbGFzc05hbWVcbiAgICAgICl9XG4gICAgPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezB9IG9mZnNldD17aXNSdGx9IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MTYwfSBvZmZzZXQgLz5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXszMjB9IG9mZnNldD17IWlzUnRsfSAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcbkxvYWRpbmdJbmRpY2F0b3IuZGVmYXVsdFByb3BzID0geyBzaXplOiA0IH07XG4iXX0= */"
};

// ==============================
// Dropdown & Clear Icons
// ==============================
var Svg = function Svg(_ref) {
  var size = _ref.size,
      props = _objectWithoutPropertiesLoose(_ref, ["size"]);

  return jsx("svg", _extends$2$1({
    height: size,
    width: size,
    viewBox: "0 0 20 20",
    "aria-hidden": "true",
    focusable: "false",
    css: _ref2
  }, props));
};

var CrossIcon = function CrossIcon(props) {
  return jsx(Svg, _extends$2$1({
    size: 20
  }, props), jsx("path", {
    d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
  }));
};
var DownChevron = function DownChevron(props) {
  return jsx(Svg, _extends$2$1({
    size: 20
  }, props), jsx("path", {
    d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
  }));
}; // ==============================
// Dropdown & Clear Buttons
// ==============================

var baseCSS = function baseCSS(_ref3) {
  var isFocused = _ref3.isFocused,
      _ref3$theme = _ref3.theme,
      baseUnit = _ref3$theme.spacing.baseUnit,
      colors = _ref3$theme.colors;
  return {
    label: 'indicatorContainer',
    color: isFocused ? colors.neutral60 : colors.neutral20,
    display: 'flex',
    padding: baseUnit * 2,
    transition: 'color 150ms',
    ':hover': {
      color: isFocused ? colors.neutral80 : colors.neutral40
    }
  };
};

var dropdownIndicatorCSS = baseCSS;
var DropdownIndicator = function DropdownIndicator(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
  return jsx("div", _extends$2$1({}, innerProps, {
    css: getStyles('dropdownIndicator', props),
    className: cx({
      indicator: true,
      'dropdown-indicator': true
    }, className)
  }), children || jsx(DownChevron, null));
};
var clearIndicatorCSS = baseCSS;
var ClearIndicator = function ClearIndicator(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
  return jsx("div", _extends$2$1({}, innerProps, {
    css: getStyles('clearIndicator', props),
    className: cx({
      indicator: true,
      'clear-indicator': true
    }, className)
  }), children || jsx(CrossIcon, null));
}; // ==============================
// Separator
// ==============================

var indicatorSeparatorCSS = function indicatorSeparatorCSS(_ref4) {
  var isDisabled = _ref4.isDisabled,
      _ref4$theme = _ref4.theme,
      baseUnit = _ref4$theme.spacing.baseUnit,
      colors = _ref4$theme.colors;
  return {
    label: 'indicatorSeparator',
    alignSelf: 'stretch',
    backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
    marginBottom: baseUnit * 2,
    marginTop: baseUnit * 2,
    width: 1
  };
};
var IndicatorSeparator = function IndicatorSeparator(props) {
  var className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
  return jsx("span", _extends$2$1({}, innerProps, {
    css: getStyles('indicatorSeparator', props),
    className: cx({
      'indicator-separator': true
    }, className)
  }));
}; // ==============================
// Loading
// ==============================

var loadingDotAnimations = keyframes(_templateObject());
var loadingIndicatorCSS = function loadingIndicatorCSS(_ref5) {
  var isFocused = _ref5.isFocused,
      size = _ref5.size,
      _ref5$theme = _ref5.theme,
      colors = _ref5$theme.colors,
      baseUnit = _ref5$theme.spacing.baseUnit;
  return {
    label: 'loadingIndicator',
    color: isFocused ? colors.neutral60 : colors.neutral20,
    display: 'flex',
    padding: baseUnit * 2,
    transition: 'color 150ms',
    alignSelf: 'center',
    fontSize: size,
    lineHeight: 1,
    marginRight: size,
    textAlign: 'center',
    verticalAlign: 'middle'
  };
};

var LoadingDot = function LoadingDot(_ref6) {
  var delay = _ref6.delay,
      offset = _ref6.offset;
  return jsx("span", {
    css:
    /*#__PURE__*/
    css({
      animation: loadingDotAnimations + " 1s ease-in-out " + delay + "ms infinite;",
      backgroundColor: 'currentColor',
      borderRadius: '1em',
      display: 'inline-block',
      marginLeft: offset ? '1em' : null,
      height: '1em',
      verticalAlign: 'top',
      width: '1em'
    },  "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0xJIiwiZmlsZSI6ImluZGljYXRvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyB0eXBlIE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3gsIGtleWZyYW1lcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuXG5pbXBvcnQgdHlwZSB7IENvbW1vblByb3BzLCBUaGVtZSB9IGZyb20gJy4uL3R5cGVzJztcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBEcm9wZG93biAmIENsZWFyIEljb25zXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgU3ZnID0gKHsgc2l6ZSwgLi4ucHJvcHMgfTogeyBzaXplOiBudW1iZXIgfSkgPT4gKFxuICA8c3ZnXG4gICAgaGVpZ2h0PXtzaXplfVxuICAgIHdpZHRoPXtzaXplfVxuICAgIHZpZXdCb3g9XCIwIDAgMjAgMjBcIlxuICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgZm9jdXNhYmxlPVwiZmFsc2VcIlxuICAgIGNzcz17e1xuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBmaWxsOiAnY3VycmVudENvbG9yJyxcbiAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICBzdHJva2U6ICdjdXJyZW50Q29sb3InLFxuICAgICAgc3Ryb2tlV2lkdGg6IDAsXG4gICAgfX1cbiAgICB7Li4ucHJvcHN9XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgQ3Jvc3NJY29uID0gKHByb3BzOiBhbnkpID0+IChcbiAgPFN2ZyBzaXplPXsyMH0gey4uLnByb3BzfT5cbiAgICA8cGF0aCBkPVwiTTE0LjM0OCAxNC44NDljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDBsLTIuNjUxLTMuMDMwLTIuNjUxIDMuMDI5Yy0wLjQ2OSAwLjQ2OS0xLjIyOSAwLjQ2OS0xLjY5NyAwLTAuNDY5LTAuNDY5LTAuNDY5LTEuMjI5IDAtMS42OTdsMi43NTgtMy4xNS0yLjc1OS0zLjE1MmMtMC40NjktMC40NjktMC40NjktMS4yMjggMC0xLjY5N3MxLjIyOC0wLjQ2OSAxLjY5NyAwbDIuNjUyIDMuMDMxIDIuNjUxLTMuMDMxYzAuNDY5LTAuNDY5IDEuMjI4LTAuNDY5IDEuNjk3IDBzMC40NjkgMS4yMjkgMCAxLjY5N2wtMi43NTggMy4xNTIgMi43NTggMy4xNWMwLjQ2OSAwLjQ2OSAwLjQ2OSAxLjIyOSAwIDEuNjk4elwiIC8+XG4gIDwvU3ZnPlxuKTtcbmV4cG9ydCBjb25zdCBEb3duQ2hldnJvbiA9IChwcm9wczogYW55KSA9PiAoXG4gIDxTdmcgc2l6ZT17MjB9IHsuLi5wcm9wc30+XG4gICAgPHBhdGggZD1cIk00LjUxNiA3LjU0OGMwLjQzNi0wLjQ0NiAxLjA0My0wLjQ4MSAxLjU3NiAwbDMuOTA4IDMuNzQ3IDMuOTA4LTMuNzQ3YzAuNTMzLTAuNDgxIDEuMTQxLTAuNDQ2IDEuNTc0IDAgMC40MzYgMC40NDUgMC40MDggMS4xOTcgMCAxLjYxNS0wLjQwNiAwLjQxOC00LjY5NSA0LjUwMi00LjY5NSA0LjUwMi0wLjIxNyAwLjIyMy0wLjUwMiAwLjMzNS0wLjc4NyAwLjMzNXMtMC41Ny0wLjExMi0wLjc4OS0wLjMzNWMwIDAtNC4yODctNC4wODQtNC42OTUtNC41MDJzLTAuNDM2LTEuMTcgMC0xLjYxNXpcIiAvPlxuICA8L1N2Zz5cbik7XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gRHJvcGRvd24gJiBDbGVhciBCdXR0b25zXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IHR5cGUgSW5kaWNhdG9yUHJvcHMgPSBDb21tb25Qcm9wcyAmIHtcbiAgLyoqIFRoZSBjaGlsZHJlbiB0byBiZSByZW5kZXJlZCBpbnNpZGUgdGhlIGluZGljYXRvci4gKi9cbiAgY2hpbGRyZW46IE5vZGUsXG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogYW55LFxuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuLFxuICAvKiogV2hldGhlciB0aGUgdGV4dCBpcyByaWdodCB0byBsZWZ0ICovXG4gIGlzUnRsOiBib29sZWFuLFxufTtcblxuY29uc3QgYmFzZUNTUyA9ICh7XG4gIGlzRm9jdXNlZCxcbiAgdGhlbWU6IHtcbiAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gICAgY29sb3JzLFxuICB9LFxufTogSW5kaWNhdG9yUHJvcHMpID0+ICh7XG4gIGxhYmVsOiAnaW5kaWNhdG9yQ29udGFpbmVyJyxcbiAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHBhZGRpbmc6IGJhc2VVbml0ICogMixcbiAgdHJhbnNpdGlvbjogJ2NvbG9yIDE1MG1zJyxcblxuICAnOmhvdmVyJzoge1xuICAgIGNvbG9yOiBpc0ZvY3VzZWQgPyBjb2xvcnMubmV1dHJhbDgwIDogY29sb3JzLm5ldXRyYWw0MCxcbiAgfSxcbn0pO1xuXG5leHBvcnQgY29uc3QgZHJvcGRvd25JbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IERyb3Bkb3duSW5kaWNhdG9yID0gKHByb3BzOiBJbmRpY2F0b3JQcm9wcykgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUsIGN4LCBnZXRTdHlsZXMsIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2Ryb3Bkb3duSW5kaWNhdG9yJywgcHJvcHMpfVxuICAgICAgY2xhc3NOYW1lPXtjeChcbiAgICAgICAge1xuICAgICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgICAnZHJvcGRvd24taW5kaWNhdG9yJzogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3NOYW1lXG4gICAgICApfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8RG93bkNoZXZyb24gLz59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgY2xlYXJJbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IENsZWFySW5kaWNhdG9yID0gKHByb3BzOiBJbmRpY2F0b3JQcm9wcykgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUsIGN4LCBnZXRTdHlsZXMsIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2NsZWFySW5kaWNhdG9yJywgcHJvcHMpfVxuICAgICAgY2xhc3NOYW1lPXtjeChcbiAgICAgICAge1xuICAgICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgICAnY2xlYXItaW5kaWNhdG9yJzogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3NOYW1lXG4gICAgICApfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8Q3Jvc3NJY29uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZXBhcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG50eXBlIFNlcGFyYXRvclN0YXRlID0geyBpc0Rpc2FibGVkOiBib29sZWFuIH07XG5cbmV4cG9ydCBjb25zdCBpbmRpY2F0b3JTZXBhcmF0b3JDU1MgPSAoe1xuICBpc0Rpc2FibGVkLFxuICB0aGVtZToge1xuICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICBjb2xvcnMsXG4gIH0sXG59OiBDb21tb25Qcm9wcyAmIFNlcGFyYXRvclN0YXRlKSA9PiAoe1xuICBsYWJlbDogJ2luZGljYXRvclNlcGFyYXRvcicsXG4gIGFsaWduU2VsZjogJ3N0cmV0Y2gnLFxuICBiYWNrZ3JvdW5kQ29sb3I6IGlzRGlzYWJsZWQgPyBjb2xvcnMubmV1dHJhbDEwIDogY29sb3JzLm5ldXRyYWwyMCxcbiAgbWFyZ2luQm90dG9tOiBiYXNlVW5pdCAqIDIsXG4gIG1hcmdpblRvcDogYmFzZVVuaXQgKiAyLFxuICB3aWR0aDogMSxcbn0pO1xuXG5leHBvcnQgY29uc3QgSW5kaWNhdG9yU2VwYXJhdG9yID0gKHByb3BzOiBJbmRpY2F0b3JQcm9wcykgPT4ge1xuICBjb25zdCB7IGNsYXNzTmFtZSwgY3gsIGdldFN0eWxlcywgaW5uZXJQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPHNwYW5cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2luZGljYXRvclNlcGFyYXRvcicsIHByb3BzKX1cbiAgICAgIGNsYXNzTmFtZT17Y3goeyAnaW5kaWNhdG9yLXNlcGFyYXRvcic6IHRydWUgfSwgY2xhc3NOYW1lKX1cbiAgICAvPlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBMb2FkaW5nXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgbG9hZGluZ0RvdEFuaW1hdGlvbnMgPSBrZXlmcmFtZXNgXG4gIDAlLCA4MCUsIDEwMCUgeyBvcGFjaXR5OiAwOyB9XG4gIDQwJSB7IG9wYWNpdHk6IDE7IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBsb2FkaW5nSW5kaWNhdG9yQ1NTID0gKHtcbiAgaXNGb2N1c2VkLFxuICBzaXplLFxuICB0aGVtZToge1xuICAgIGNvbG9ycyxcbiAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gIH0sXG59OiB7XG4gIGlzRm9jdXNlZDogYm9vbGVhbixcbiAgc2l6ZTogbnVtYmVyLFxuICB0aGVtZTogVGhlbWUsXG59KSA9PiAoe1xuICBsYWJlbDogJ2xvYWRpbmdJbmRpY2F0b3InLFxuICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgcGFkZGluZzogYmFzZVVuaXQgKiAyLFxuICB0cmFuc2l0aW9uOiAnY29sb3IgMTUwbXMnLFxuICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICBmb250U2l6ZTogc2l6ZSxcbiAgbGluZUhlaWdodDogMSxcbiAgbWFyZ2luUmlnaHQ6IHNpemUsXG4gIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxufSk7XG5cbnR5cGUgRG90UHJvcHMgPSB7IGRlbGF5OiBudW1iZXIsIG9mZnNldDogYm9vbGVhbiB9O1xuY29uc3QgTG9hZGluZ0RvdCA9ICh7IGRlbGF5LCBvZmZzZXQgfTogRG90UHJvcHMpID0+IChcbiAgPHNwYW5cbiAgICBjc3M9e3tcbiAgICAgIGFuaW1hdGlvbjogYCR7bG9hZGluZ0RvdEFuaW1hdGlvbnN9IDFzIGVhc2UtaW4tb3V0ICR7ZGVsYXl9bXMgaW5maW5pdGU7YCxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBib3JkZXJSYWRpdXM6ICcxZW0nLFxuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBtYXJnaW5MZWZ0OiBvZmZzZXQgPyAnMWVtJyA6IG51bGwsXG4gICAgICBoZWlnaHQ6ICcxZW0nLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICB3aWR0aDogJzFlbScsXG4gICAgfX1cbiAgLz5cbik7XG5cbmV4cG9ydCB0eXBlIExvYWRpbmdJY29uUHJvcHMgPSB7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogYW55LFxuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuLFxuICAvKiogV2hldGhlciB0aGUgdGV4dCBpcyByaWdodCB0byBsZWZ0ICovXG4gIGlzUnRsOiBib29sZWFuLFxufSAmIENvbW1vblByb3BzICYge1xuICAgIC8qKiBTZXQgc2l6ZSBvZiB0aGUgY29udGFpbmVyLiAqL1xuICAgIHNpemU6IG51bWJlcixcbiAgfTtcbmV4cG9ydCBjb25zdCBMb2FkaW5nSW5kaWNhdG9yID0gKHByb3BzOiBMb2FkaW5nSWNvblByb3BzKSA9PiB7XG4gIGNvbnN0IHsgY2xhc3NOYW1lLCBjeCwgZ2V0U3R5bGVzLCBpbm5lclByb3BzLCBpc1J0bCB9ID0gcHJvcHM7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICAgIGNzcz17Z2V0U3R5bGVzKCdsb2FkaW5nSW5kaWNhdG9yJywgcHJvcHMpfVxuICAgICAgY2xhc3NOYW1lPXtjeChcbiAgICAgICAge1xuICAgICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgICAnbG9hZGluZy1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBjbGFzc05hbWVcbiAgICAgICl9XG4gICAgPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezB9IG9mZnNldD17aXNSdGx9IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MTYwfSBvZmZzZXQgLz5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXszMjB9IG9mZnNldD17IWlzUnRsfSAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcbkxvYWRpbmdJbmRpY2F0b3IuZGVmYXVsdFByb3BzID0geyBzaXplOiA0IH07XG4iXX0= */")
  });
};

var LoadingIndicator = function LoadingIndicator(props) {
  var className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isRtl = props.isRtl;
  return jsx("div", _extends$2$1({}, innerProps, {
    css: getStyles('loadingIndicator', props),
    className: cx({
      indicator: true,
      'loading-indicator': true
    }, className)
  }), jsx(LoadingDot, {
    delay: 0,
    offset: isRtl
  }), jsx(LoadingDot, {
    delay: 160,
    offset: true
  }), jsx(LoadingDot, {
    delay: 320,
    offset: !isRtl
  }));
};
LoadingIndicator.defaultProps = {
  size: 4
};

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }
var css$1 = function css(_ref) {
  var isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused,
      _ref$theme = _ref.theme,
      colors = _ref$theme.colors,
      borderRadius = _ref$theme.borderRadius,
      spacing = _ref$theme.spacing;
  return {
    label: 'control',
    alignItems: 'center',
    backgroundColor: isDisabled ? colors.neutral5 : colors.neutral0,
    borderColor: isDisabled ? colors.neutral10 : isFocused ? colors.primary : colors.neutral20,
    borderRadius: borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: isFocused ? "0 0 0 1px " + colors.primary : null,
    cursor: 'default',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    minHeight: spacing.controlHeight,
    outline: '0 !important',
    position: 'relative',
    transition: 'all 100ms',
    '&:hover': {
      borderColor: isFocused ? colors.primary : colors.neutral30
    }
  };
};

var Control = function Control(props) {
  var children = props.children,
      cx = props.cx,
      getStyles = props.getStyles,
      className = props.className,
      isDisabled = props.isDisabled,
      isFocused = props.isFocused,
      innerRef = props.innerRef,
      innerProps = props.innerProps,
      menuIsOpen = props.menuIsOpen;
  return jsx("div", _extends$3({
    ref: innerRef,
    css: getStyles('control', props),
    className: cx({
      control: true,
      'control--is-disabled': isDisabled,
      'control--is-focused': isFocused,
      'control--menu-is-open': menuIsOpen
    }, className)
  }, innerProps), children);
};

function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }
var groupCSS = function groupCSS(_ref) {
  var spacing = _ref.theme.spacing;
  return {
    paddingBottom: spacing.baseUnit * 2,
    paddingTop: spacing.baseUnit * 2
  };
};

var Group = function Group(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      Heading = props.Heading,
      headingProps = props.headingProps,
      label = props.label,
      theme = props.theme,
      selectProps = props.selectProps;
  return jsx("div", {
    css: getStyles('group', props),
    className: cx({
      group: true
    }, className)
  }, jsx(Heading, _extends$4({}, headingProps, {
    selectProps: selectProps,
    theme: theme,
    getStyles: getStyles,
    cx: cx
  }), label), jsx("div", null, children));
};

var groupHeadingCSS = function groupHeadingCSS(_ref2) {
  var spacing = _ref2.theme.spacing;
  return {
    label: 'group',
    color: '#999',
    cursor: 'default',
    display: 'block',
    fontSize: '75%',
    fontWeight: '500',
    marginBottom: '0.25em',
    paddingLeft: spacing.baseUnit * 3,
    paddingRight: spacing.baseUnit * 3,
    textTransform: 'uppercase'
  };
};
var GroupHeading = function GroupHeading(props) {
  var className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      theme = props.theme,
      selectProps = props.selectProps,
      cleanProps = _objectWithoutPropertiesLoose$1(props, ["className", "cx", "getStyles", "theme", "selectProps"]);

  return jsx("div", _extends$4({
    css: getStyles('groupHeading', _extends$4({
      theme: theme
    }, cleanProps)),
    className: cx({
      'group-heading': true
    }, className)
  }, cleanProps));
};

function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

function _objectWithoutPropertiesLoose$2(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var inputCSS = function inputCSS(_ref) {
  var isDisabled = _ref.isDisabled,
      _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      colors = _ref$theme.colors;
  return {
    margin: spacing.baseUnit / 2,
    paddingBottom: spacing.baseUnit / 2,
    paddingTop: spacing.baseUnit / 2,
    visibility: isDisabled ? 'hidden' : 'visible',
    color: colors.neutral80
  };
};

var inputStyle = function inputStyle(isHidden) {
  return {
    label: 'input',
    background: 0,
    border: 0,
    fontSize: 'inherit',
    opacity: isHidden ? 0 : 1,
    outline: 0,
    padding: 0,
    color: 'inherit'
  };
};

var Input = function Input(_ref2) {
  var className = _ref2.className,
      cx = _ref2.cx,
      getStyles = _ref2.getStyles,
      innerRef = _ref2.innerRef,
      isHidden = _ref2.isHidden,
      isDisabled = _ref2.isDisabled,
      theme = _ref2.theme,
      selectProps = _ref2.selectProps,
      props = _objectWithoutPropertiesLoose$2(_ref2, ["className", "cx", "getStyles", "innerRef", "isHidden", "isDisabled", "theme", "selectProps"]);

  return jsx("div", {
    css: getStyles('input', _extends$5({
      theme: theme
    }, props))
  }, jsx(AutosizeInput, _extends$5({
    className: cx({
      input: true
    }, className),
    inputRef: innerRef,
    inputStyle: inputStyle(isHidden),
    disabled: isDisabled
  }, props)));
};

function _extends$6() { _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }
var multiValueCSS = function multiValueCSS(_ref) {
  var _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      borderRadius = _ref$theme.borderRadius,
      colors = _ref$theme.colors;
  return {
    label: 'multiValue',
    backgroundColor: colors.neutral10,
    borderRadius: borderRadius / 2,
    display: 'flex',
    margin: spacing.baseUnit / 2,
    minWidth: 0 // resolves flex/text-overflow bug

  };
};
var multiValueLabelCSS = function multiValueLabelCSS(_ref2) {
  var _ref2$theme = _ref2.theme,
      borderRadius = _ref2$theme.borderRadius,
      colors = _ref2$theme.colors,
      cropWithEllipsis = _ref2.cropWithEllipsis;
  return {
    borderRadius: borderRadius / 2,
    color: colors.neutral80,
    fontSize: '85%',
    overflow: 'hidden',
    padding: 3,
    paddingLeft: 6,
    textOverflow: cropWithEllipsis ? 'ellipsis' : null,
    whiteSpace: 'nowrap'
  };
};
var multiValueRemoveCSS = function multiValueRemoveCSS(_ref3) {
  var _ref3$theme = _ref3.theme,
      spacing = _ref3$theme.spacing,
      borderRadius = _ref3$theme.borderRadius,
      colors = _ref3$theme.colors,
      isFocused = _ref3.isFocused;
  return {
    alignItems: 'center',
    borderRadius: borderRadius / 2,
    backgroundColor: isFocused && colors.dangerLight,
    display: 'flex',
    paddingLeft: spacing.baseUnit,
    paddingRight: spacing.baseUnit,
    ':hover': {
      backgroundColor: colors.dangerLight,
      color: colors.danger
    }
  };
};
var MultiValueGeneric = function MultiValueGeneric(_ref4) {
  var children = _ref4.children,
      innerProps = _ref4.innerProps;
  return jsx("div", innerProps, children);
};
var MultiValueContainer = MultiValueGeneric;
var MultiValueLabel = MultiValueGeneric;
function MultiValueRemove(_ref5) {
  var children = _ref5.children,
      innerProps = _ref5.innerProps;
  return jsx("div", innerProps, children || jsx(CrossIcon, {
    size: 14
  }));
}

var MultiValue = function MultiValue(props) {
  var children = props.children,
      className = props.className,
      components = props.components,
      cx = props.cx,
      data = props.data,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isDisabled = props.isDisabled,
      removeProps = props.removeProps,
      selectProps = props.selectProps;
  var Container = components.Container,
      Label = components.Label,
      Remove = components.Remove;
  return jsx(ClassNames, null, function (_ref6) {
    var css = _ref6.css,
        emotionCx = _ref6.cx;
    return jsx(Container, {
      data: data,
      innerProps: _extends$6({}, innerProps, {
        className: emotionCx(css(getStyles('multiValue', props)), cx({
          'multi-value': true,
          'multi-value--is-disabled': isDisabled
        }, className))
      }),
      selectProps: selectProps
    }, jsx(Label, {
      data: data,
      innerProps: {
        className: emotionCx(css(getStyles('multiValueLabel', props)), cx({
          'multi-value__label': true
        }, className))
      },
      selectProps: selectProps
    }, children), jsx(Remove, {
      data: data,
      innerProps: _extends$6({
        className: emotionCx(css(getStyles('multiValueRemove', props)), cx({
          'multi-value__remove': true
        }, className))
      }, removeProps),
      selectProps: selectProps
    }));
  });
};

MultiValue.defaultProps = {
  cropWithEllipsis: true
};

function _extends$7() { _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }
var optionCSS = function optionCSS(_ref) {
  var isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused,
      isSelected = _ref.isSelected,
      _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      colors = _ref$theme.colors;
  return {
    label: 'option',
    backgroundColor: isSelected ? colors.primary : isFocused ? colors.primary25 : 'transparent',
    color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : 'inherit',
    cursor: 'default',
    display: 'block',
    fontSize: 'inherit',
    padding: spacing.baseUnit * 2 + "px " + spacing.baseUnit * 3 + "px",
    width: '100%',
    userSelect: 'none',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    // provide some affordance on touch devices
    ':active': {
      backgroundColor: !isDisabled && (isSelected ? colors.primary : colors.primary50)
    }
  };
};

var Option = function Option(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      isFocused = props.isFocused,
      isSelected = props.isSelected,
      innerRef = props.innerRef,
      innerProps = props.innerProps;
  return jsx("div", _extends$7({
    css: getStyles('option', props),
    className: cx({
      option: true,
      'option--is-disabled': isDisabled,
      'option--is-focused': isFocused,
      'option--is-selected': isSelected
    }, className),
    ref: innerRef
  }, innerProps), children);
};

function _extends$8() { _extends$8 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$8.apply(this, arguments); }
var placeholderCSS = function placeholderCSS(_ref) {
  var _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      colors = _ref$theme.colors;
  return {
    label: 'placeholder',
    color: colors.neutral50,
    marginLeft: spacing.baseUnit / 2,
    marginRight: spacing.baseUnit / 2,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)'
  };
};

var Placeholder = function Placeholder(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
  return jsx("div", _extends$8({
    css: getStyles('placeholder', props),
    className: cx({
      placeholder: true
    }, className)
  }, innerProps), children);
};

function _extends$9() { _extends$9 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$9.apply(this, arguments); }
var css$1$1 = function css(_ref) {
  var isDisabled = _ref.isDisabled,
      _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      colors = _ref$theme.colors;
  return {
    label: 'singleValue',
    color: isDisabled ? colors.neutral40 : colors.neutral80,
    marginLeft: spacing.baseUnit / 2,
    marginRight: spacing.baseUnit / 2,
    maxWidth: "calc(100% - " + spacing.baseUnit * 2 + "px)",
    overflow: 'hidden',
    position: 'absolute',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    top: '50%',
    transform: 'translateY(-50%)'
  };
};

var SingleValue = function SingleValue(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      innerProps = props.innerProps;
  return jsx("div", _extends$9({
    css: getStyles('singleValue', props),
    className: cx({
      'single-value': true,
      'single-value--is-disabled': isDisabled
    }, className)
  }, innerProps), children);
};

function _extends$a() { _extends$a = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$a.apply(this, arguments); }
var components = {
  ClearIndicator: ClearIndicator,
  Control: Control,
  DropdownIndicator: DropdownIndicator,
  DownChevron: DownChevron,
  CrossIcon: CrossIcon,
  Group: Group,
  GroupHeading: GroupHeading,
  IndicatorsContainer: IndicatorsContainer,
  IndicatorSeparator: IndicatorSeparator,
  Input: Input,
  LoadingIndicator: LoadingIndicator,
  Menu: Menu$1,
  MenuList: MenuList,
  MenuPortal: MenuPortal,
  LoadingMessage: LoadingMessage,
  NoOptionsMessage: NoOptionsMessage,
  MultiValue: MultiValue,
  MultiValueContainer: MultiValueContainer,
  MultiValueLabel: MultiValueLabel,
  MultiValueRemove: MultiValueRemove,
  Option: Option,
  Placeholder: Placeholder,
  SelectContainer: SelectContainer,
  SingleValue: SingleValue,
  ValueContainer: ValueContainer
};
var defaultComponents = function defaultComponents(props) {
  return _extends$a({}, components, props.components);
};

var diacritics = [{
  base: 'A',
  letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
}, {
  base: 'AA',
  letters: /[\uA732]/g
}, {
  base: 'AE',
  letters: /[\u00C6\u01FC\u01E2]/g
}, {
  base: 'AO',
  letters: /[\uA734]/g
}, {
  base: 'AU',
  letters: /[\uA736]/g
}, {
  base: 'AV',
  letters: /[\uA738\uA73A]/g
}, {
  base: 'AY',
  letters: /[\uA73C]/g
}, {
  base: 'B',
  letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g
}, {
  base: 'C',
  letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g
}, {
  base: 'D',
  letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g
}, {
  base: 'DZ',
  letters: /[\u01F1\u01C4]/g
}, {
  base: 'Dz',
  letters: /[\u01F2\u01C5]/g
}, {
  base: 'E',
  letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
}, {
  base: 'F',
  letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g
}, {
  base: 'G',
  letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g
}, {
  base: 'H',
  letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g
}, {
  base: 'I',
  letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
}, {
  base: 'J',
  letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g
}, {
  base: 'K',
  letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g
}, {
  base: 'L',
  letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
}, {
  base: 'LJ',
  letters: /[\u01C7]/g
}, {
  base: 'Lj',
  letters: /[\u01C8]/g
}, {
  base: 'M',
  letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g
}, {
  base: 'N',
  letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
}, {
  base: 'NJ',
  letters: /[\u01CA]/g
}, {
  base: 'Nj',
  letters: /[\u01CB]/g
}, {
  base: 'O',
  letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
}, {
  base: 'OI',
  letters: /[\u01A2]/g
}, {
  base: 'OO',
  letters: /[\uA74E]/g
}, {
  base: 'OU',
  letters: /[\u0222]/g
}, {
  base: 'P',
  letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g
}, {
  base: 'Q',
  letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g
}, {
  base: 'R',
  letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
}, {
  base: 'S',
  letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
}, {
  base: 'T',
  letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g
}, {
  base: 'TZ',
  letters: /[\uA728]/g
}, {
  base: 'U',
  letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
}, {
  base: 'V',
  letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g
}, {
  base: 'VY',
  letters: /[\uA760]/g
}, {
  base: 'W',
  letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g
}, {
  base: 'X',
  letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g
}, {
  base: 'Y',
  letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g
}, {
  base: 'Z',
  letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g
}, {
  base: 'a',
  letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
}, {
  base: 'aa',
  letters: /[\uA733]/g
}, {
  base: 'ae',
  letters: /[\u00E6\u01FD\u01E3]/g
}, {
  base: 'ao',
  letters: /[\uA735]/g
}, {
  base: 'au',
  letters: /[\uA737]/g
}, {
  base: 'av',
  letters: /[\uA739\uA73B]/g
}, {
  base: 'ay',
  letters: /[\uA73D]/g
}, {
  base: 'b',
  letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g
}, {
  base: 'c',
  letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g
}, {
  base: 'd',
  letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g
}, {
  base: 'dz',
  letters: /[\u01F3\u01C6]/g
}, {
  base: 'e',
  letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
}, {
  base: 'f',
  letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g
}, {
  base: 'g',
  letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g
}, {
  base: 'h',
  letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g
}, {
  base: 'hv',
  letters: /[\u0195]/g
}, {
  base: 'i',
  letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
}, {
  base: 'j',
  letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g
}, {
  base: 'k',
  letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g
}, {
  base: 'l',
  letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
}, {
  base: 'lj',
  letters: /[\u01C9]/g
}, {
  base: 'm',
  letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g
}, {
  base: 'n',
  letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
}, {
  base: 'nj',
  letters: /[\u01CC]/g
}, {
  base: 'o',
  letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
}, {
  base: 'oi',
  letters: /[\u01A3]/g
}, {
  base: 'ou',
  letters: /[\u0223]/g
}, {
  base: 'oo',
  letters: /[\uA74F]/g
}, {
  base: 'p',
  letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g
}, {
  base: 'q',
  letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g
}, {
  base: 'r',
  letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
}, {
  base: 's',
  letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
}, {
  base: 't',
  letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
}, {
  base: 'tz',
  letters: /[\uA729]/g
}, {
  base: 'u',
  letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
}, {
  base: 'v',
  letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g
}, {
  base: 'vy',
  letters: /[\uA761]/g
}, {
  base: 'w',
  letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g
}, {
  base: 'x',
  letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g
}, {
  base: 'y',
  letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
}, {
  base: 'z',
  letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
}];
var stripDiacritics = function stripDiacritics(str) {
  for (var i = 0; i < diacritics.length; i++) {
    str = str.replace(diacritics[i].letters, diacritics[i].base);
  }

  return str;
};

function _extends$b() { _extends$b = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$b.apply(this, arguments); }

var trimString = function trimString(str) {
  return str.replace(/^\s+|\s+$/g, '');
};

var defaultStringify = function defaultStringify(option) {
  return option.label + " " + option.value;
};

var createFilter = function createFilter(config) {
  return function (option, rawInput) {
    var _ignoreCase$ignoreAcc = _extends$b({
      ignoreCase: true,
      ignoreAccents: true,
      stringify: defaultStringify,
      trim: true,
      matchFrom: 'any'
    }, config),
        ignoreCase = _ignoreCase$ignoreAcc.ignoreCase,
        ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents,
        stringify = _ignoreCase$ignoreAcc.stringify,
        trim = _ignoreCase$ignoreAcc.trim,
        matchFrom = _ignoreCase$ignoreAcc.matchFrom;

    var input = trim ? trimString(rawInput) : rawInput;
    var candidate = trim ? trimString(stringify(option)) : stringify(option);

    if (ignoreCase) {
      input = input.toLowerCase();
      candidate = candidate.toLowerCase();
    }

    if (ignoreAccents) {
      input = stripDiacritics(input);
      candidate = stripDiacritics(candidate);
    }

    return matchFrom === 'start' ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
  };
};

function _extends$1$2() { _extends$1$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1$2.apply(this, arguments); }

var _ref =  {
  name: "1laao21-a11yText",
  styles: "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkExMXlUZXh0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFNIiwiZmlsZSI6IkExMXlUZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgdHlwZSBFbGVtZW50Q29uZmlnIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4IH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5cbi8vIEFzc2lzdGl2ZSB0ZXh0IHRvIGRlc2NyaWJlIHZpc3VhbCBlbGVtZW50cy4gSGlkZGVuIGZvciBzaWdodGVkIHVzZXJzLlxuY29uc3QgQTExeVRleHQgPSAocHJvcHM6IEVsZW1lbnRDb25maWc8J3NwYW4nPikgPT4gKFxuICAgIDxzcGFuXG4gICAgICBjc3M9e3tcbiAgICAgICAgbGFiZWw6ICdhMTF5VGV4dCcsXG4gICAgICAgIHpJbmRleDogOTk5OSxcbiAgICAgICAgYm9yZGVyOiAwLFxuICAgICAgICBjbGlwOiAncmVjdCgxcHgsIDFweCwgMXB4LCAxcHgpJyxcbiAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICB9fVxuICAgICAgey4uLnByb3BzfVxuICAgIC8+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBBMTF5VGV4dDtcbiJdfQ== */"
};

var A11yText = function A11yText(props) {
  return jsx("span", _extends$1$2({
    css: _ref
  }, props));
};

function _extends$2$2() { _extends$2$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2$2.apply(this, arguments); }

function _objectWithoutPropertiesLoose$3(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function DummyInput(_ref) {
  var inProp = _ref.in,
      out = _ref.out,
      onExited = _ref.onExited,
      appear = _ref.appear,
      enter = _ref.enter,
      exit = _ref.exit,
      innerRef = _ref.innerRef,
      emotion = _ref.emotion,
      props = _objectWithoutPropertiesLoose$3(_ref, ["in", "out", "onExited", "appear", "enter", "exit", "innerRef", "emotion"]);

  return jsx("input", _extends$2$2({
    ref: innerRef
  }, props, {
    css:
    /*#__PURE__*/
    css({
      label: 'dummyInput',
      // get rid of any default styles
      background: 0,
      border: 0,
      fontSize: 'inherit',
      outline: 0,
      padding: 0,
      // important! without `width` browsers won't allow focus
      width: 1,
      // remove cursor on desktop
      color: 'transparent',
      // remove cursor on mobile whilst maintaining "scroll into view" behaviour
      left: -100,
      opacity: 0,
      position: 'relative',
      transform: 'scale(0)'
    },  "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkR1bW15SW5wdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUJNIiwiZmlsZSI6IkR1bW15SW5wdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRHVtbXlJbnB1dCh7XG4gIGluOiBpblByb3AsXG4gIG91dCxcbiAgb25FeGl0ZWQsXG4gIGFwcGVhcixcbiAgZW50ZXIsXG4gIGV4aXQsXG4gIGlubmVyUmVmLFxuICBlbW90aW9uLFxuICAuLi5wcm9wc1xufTogYW55KSB7XG4gIHJldHVybiAoXG4gICAgPGlucHV0XG4gICAgICByZWY9e2lubmVyUmVmfVxuICAgICAgey4uLnByb3BzfVxuICAgICAgY3NzPXt7XG4gICAgICAgIGxhYmVsOiAnZHVtbXlJbnB1dCcsXG4gICAgICAgIC8vIGdldCByaWQgb2YgYW55IGRlZmF1bHQgc3R5bGVzXG4gICAgICAgIGJhY2tncm91bmQ6IDAsXG4gICAgICAgIGJvcmRlcjogMCxcbiAgICAgICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgICAgICAgb3V0bGluZTogMCxcbiAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgLy8gaW1wb3J0YW50ISB3aXRob3V0IGB3aWR0aGAgYnJvd3NlcnMgd29uJ3QgYWxsb3cgZm9jdXNcbiAgICAgICAgd2lkdGg6IDEsXG5cbiAgICAgICAgLy8gcmVtb3ZlIGN1cnNvciBvbiBkZXNrdG9wXG4gICAgICAgIGNvbG9yOiAndHJhbnNwYXJlbnQnLFxuXG4gICAgICAgIC8vIHJlbW92ZSBjdXJzb3Igb24gbW9iaWxlIHdoaWxzdCBtYWludGFpbmluZyBcInNjcm9sbCBpbnRvIHZpZXdcIiBiZWhhdmlvdXJcbiAgICAgICAgbGVmdDogLTEwMCxcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDApJyxcbiAgICAgIH19XG4gICAgLz5cbiAgKTtcbn1cbiJdfQ== */")
  }));
}

function _inheritsLoose$2(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var NodeResolver =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose$2(NodeResolver, _Component);

  function NodeResolver() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = NodeResolver.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.props.innerRef(findDOMNode(this));
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.props.innerRef(null);
  };

  _proto.render = function render() {
    return this.props.children;
  };

  return NodeResolver;
}(Component);

var STYLE_KEYS = ['boxSizing', 'height', 'overflow', 'paddingRight', 'position'];
var LOCK_STYLES = {
  boxSizing: 'border-box',
  // account for possible declaration `width: 100%;` on body
  overflow: 'hidden',
  position: 'relative',
  height: '100%'
};

function preventTouchMove(e) {
  e.preventDefault();
}
function allowTouchMove(e) {
  e.stopPropagation();
}
function preventInertiaScroll() {
  var top = this.scrollTop;
  var totalScroll = this.scrollHeight;
  var currentScroll = top + this.offsetHeight;

  if (top === 0) {
    this.scrollTop = 1;
  } else if (currentScroll === totalScroll) {
    this.scrollTop = top - 1;
  }
} // `ontouchstart` check works on most browsers
// `maxTouchPoints` works on IE10/11 and Surface

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

function _inheritsLoose$1$1(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
var activeScrollLocks = 0;

var ScrollLock =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose$1$1(ScrollLock, _Component);

  function ScrollLock() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.originalStyles = {};
    _this.listenerOptions = {
      capture: false,
      passive: false
    };
    return _this;
  }

  var _proto = ScrollLock.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (!canUseDOM) return;
    var _this$props = this.props,
        accountForScrollbars = _this$props.accountForScrollbars,
        touchScrollTarget = _this$props.touchScrollTarget;
    var target = document.body;
    var targetStyle = target && target.style;

    if (accountForScrollbars) {
      // store any styles already applied to the body
      STYLE_KEYS.forEach(function (key) {
        var val = targetStyle && targetStyle[key];
        _this2.originalStyles[key] = val;
      });
    } // apply the lock styles and padding if this is the first scroll lock


    if (accountForScrollbars && activeScrollLocks < 1) {
      var currentPadding = parseInt(this.originalStyles.paddingRight, 10) || 0;
      var clientWidth = document.body ? document.body.clientWidth : 0;
      var adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;
      Object.keys(LOCK_STYLES).forEach(function (key) {
        var val = LOCK_STYLES[key];

        if (targetStyle) {
          targetStyle[key] = val;
        }
      });

      if (targetStyle) {
        targetStyle.paddingRight = adjustedPadding + "px";
      }
    } // account for touch devices


    if (target && isTouchDevice()) {
      // Mobile Safari ignores { overflow: hidden } declaration on the body.
      target.addEventListener('touchmove', preventTouchMove, this.listenerOptions); // Allow scroll on provided target

      if (touchScrollTarget) {
        touchScrollTarget.addEventListener('touchstart', preventInertiaScroll, this.listenerOptions);
        touchScrollTarget.addEventListener('touchmove', allowTouchMove, this.listenerOptions);
      }
    } // increment active scroll locks


    activeScrollLocks += 1;
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this3 = this;

    if (!canUseDOM) return;
    var _this$props2 = this.props,
        accountForScrollbars = _this$props2.accountForScrollbars,
        touchScrollTarget = _this$props2.touchScrollTarget;
    var target = document.body;
    var targetStyle = target && target.style; // safely decrement active scroll locks

    activeScrollLocks = Math.max(activeScrollLocks - 1, 0); // reapply original body styles, if any

    if (accountForScrollbars && activeScrollLocks < 1) {
      STYLE_KEYS.forEach(function (key) {
        var val = _this3.originalStyles[key];

        if (targetStyle) {
          targetStyle[key] = val;
        }
      });
    } // remove touch listeners


    if (target && isTouchDevice()) {
      target.removeEventListener('touchmove', preventTouchMove, this.listenerOptions);

      if (touchScrollTarget) {
        touchScrollTarget.removeEventListener('touchstart', preventInertiaScroll, this.listenerOptions);
        touchScrollTarget.removeEventListener('touchmove', allowTouchMove, this.listenerOptions);
      }
    }
  };

  _proto.render = function render() {
    return null;
  };

  return ScrollLock;
}(Component);

ScrollLock.defaultProps = {
  accountForScrollbars: true
};

function _inheritsLoose$2$1(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var _ref$1 =  {
  name: "1dsbpcp",
  styles: "position:fixed;left:0;bottom:0;right:0;top:0;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcm9sbEJsb2NrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZEVSIsImZpbGUiOiJTY3JvbGxCbG9jay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IFB1cmVDb21wb25lbnQsIHR5cGUgRWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGpzeCB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IE5vZGVSZXNvbHZlciBmcm9tICcuL05vZGVSZXNvbHZlcic7XG5pbXBvcnQgU2Nyb2xsTG9jayBmcm9tICcuL1Njcm9sbExvY2svaW5kZXgnO1xuXG50eXBlIFByb3BzID0ge1xuICBjaGlsZHJlbjogRWxlbWVudDwqPixcbiAgaXNFbmFibGVkOiBib29sZWFuLFxufTtcbnR5cGUgU3RhdGUgPSB7XG4gIHRvdWNoU2Nyb2xsVGFyZ2V0OiBIVE1MRWxlbWVudCB8IG51bGwsXG59O1xuXG4vLyBOT1RFOlxuLy8gV2Ugc2hvdWxkbid0IG5lZWQgdGhpcyBhZnRlciB1cGRhdGluZyB0byBSZWFjdCB2MTYuMy4wLCB3aGljaCBpbnRyb2R1Y2VzOlxuLy8gLSBjcmVhdGVSZWYoKSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RjcmVhdGVyZWZcbi8vIC0gZm9yd2FyZFJlZigpIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNyZWFjdGZvcndhcmRyZWZcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb2xsQmxvY2sgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFByb3BzLCBTdGF0ZT4ge1xuICBzdGF0ZSA9IHsgdG91Y2hTY3JvbGxUYXJnZXQ6IG51bGwgfTtcblxuICAvLyBtdXN0IGJlIGluIHN0YXRlIHRvIHRyaWdnZXIgYSByZS1yZW5kZXIsIG9ubHkgcnVucyBvbmNlIHBlciBpbnN0YW5jZVxuICBnZXRTY3JvbGxUYXJnZXQgPSAocmVmOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgIGlmIChyZWYgPT09IHRoaXMuc3RhdGUudG91Y2hTY3JvbGxUYXJnZXQpIHJldHVybjtcbiAgICB0aGlzLnNldFN0YXRlKHsgdG91Y2hTY3JvbGxUYXJnZXQ6IHJlZiB9KTtcbiAgfTtcblxuICAvLyB0aGlzIHdpbGwgY2xvc2UgdGhlIG1lbnUgd2hlbiBhIHVzZXIgY2xpY2tzIG91dHNpZGVcbiAgYmx1clNlbGVjdElucHV0ID0gKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIGlzRW5hYmxlZCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHRvdWNoU2Nyb2xsVGFyZ2V0IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgLy8gYmFpbCBlYXJseSBpZiBub3QgZW5hYmxlZFxuICAgIGlmICghaXNFbmFibGVkKSByZXR1cm4gY2hpbGRyZW47XG5cbiAgICAvKlxuICAgICAqIERpdlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIGJsb2NrcyBzY3JvbGxpbmcgb24gbm9uLWJvZHkgZWxlbWVudHMgYmVoaW5kIHRoZSBtZW51XG5cbiAgICAgKiBOb2RlUmVzb2x2ZXJcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiB3ZSBuZWVkIGEgcmVmZXJlbmNlIHRvIHRoZSBzY3JvbGxhYmxlIGVsZW1lbnQgdG8gXCJ1bmxvY2tcIiBzY3JvbGwgb25cbiAgICAgKiBtb2JpbGUgZGV2aWNlc1xuXG4gICAgICogU2Nyb2xsTG9ja1xuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIGFjdHVhbGx5IGRvZXMgdGhlIHNjcm9sbCBsb2NraW5nXG4gICAgICovXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmJsdXJTZWxlY3RJbnB1dH1cbiAgICAgICAgICBjc3M9e3sgcG9zaXRpb246ICdmaXhlZCcsIGxlZnQ6IDAsIGJvdHRvbTogMCwgcmlnaHQ6IDAsIHRvcDogMCB9fVxuICAgICAgICAvPlxuICAgICAgICA8Tm9kZVJlc29sdmVyIGlubmVyUmVmPXt0aGlzLmdldFNjcm9sbFRhcmdldH0+e2NoaWxkcmVufTwvTm9kZVJlc29sdmVyPlxuICAgICAgICB7dG91Y2hTY3JvbGxUYXJnZXQgPyAoXG4gICAgICAgICAgPFNjcm9sbExvY2sgdG91Y2hTY3JvbGxUYXJnZXQ9e3RvdWNoU2Nyb2xsVGFyZ2V0fSAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */"
};

// NOTE:
// We shouldn't need this after updating to React v16.3.0, which introduces:
// - createRef() https://reactjs.org/docs/react-api.html#reactcreateref
// - forwardRef() https://reactjs.org/docs/react-api.html#reactforwardref
var ScrollBlock =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose$2$1(ScrollBlock, _PureComponent);

  function ScrollBlock() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;
    _this.state = {
      touchScrollTarget: null
    };

    _this.getScrollTarget = function (ref) {
      if (ref === _this.state.touchScrollTarget) return;

      _this.setState({
        touchScrollTarget: ref
      });
    };

    _this.blurSelectInput = function () {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    };

    return _this;
  }

  var _proto = ScrollBlock.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        isEnabled = _this$props.isEnabled;
    var touchScrollTarget = this.state.touchScrollTarget; // bail early if not enabled

    if (!isEnabled) return children;
    /*
     * Div
     * ------------------------------
     * blocks scrolling on non-body elements behind the menu
      * NodeResolver
     * ------------------------------
     * we need a reference to the scrollable element to "unlock" scroll on
     * mobile devices
      * ScrollLock
     * ------------------------------
     * actually does the scroll locking
     */

    return jsx("div", null, jsx("div", {
      onClick: this.blurSelectInput,
      css: _ref$1
    }), jsx(NodeResolver, {
      innerRef: this.getScrollTarget
    }, children), touchScrollTarget ? jsx(ScrollLock, {
      touchScrollTarget: touchScrollTarget
    }) : null);
  };

  return ScrollBlock;
}(PureComponent);

function _objectWithoutPropertiesLoose$1$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose$3(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ScrollCaptor =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose$3(ScrollCaptor, _Component);

  function ScrollCaptor() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.isBottom = false;
    _this.isTop = false;
    _this.scrollTarget = void 0;
    _this.touchStart = void 0;

    _this.cancelScroll = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };

    _this.handleEventDelta = function (event, delta) {
      var _this$props = _this.props,
          onBottomArrive = _this$props.onBottomArrive,
          onBottomLeave = _this$props.onBottomLeave,
          onTopArrive = _this$props.onTopArrive,
          onTopLeave = _this$props.onTopLeave;
      var _this$scrollTarget = _this.scrollTarget,
          scrollTop = _this$scrollTarget.scrollTop,
          scrollHeight = _this$scrollTarget.scrollHeight,
          clientHeight = _this$scrollTarget.clientHeight;
      var target = _this.scrollTarget;
      var isDeltaPositive = delta > 0;
      var availableScroll = scrollHeight - clientHeight - scrollTop;
      var shouldCancelScroll = false; // reset bottom/top flags

      if (availableScroll > delta && _this.isBottom) {
        if (onBottomLeave) onBottomLeave(event);
        _this.isBottom = false;
      }

      if (isDeltaPositive && _this.isTop) {
        if (onTopLeave) onTopLeave(event);
        _this.isTop = false;
      } // bottom limit


      if (isDeltaPositive && delta > availableScroll) {
        if (onBottomArrive && !_this.isBottom) {
          onBottomArrive(event);
        }

        target.scrollTop = scrollHeight;
        shouldCancelScroll = true;
        _this.isBottom = true; // top limit
      } else if (!isDeltaPositive && -delta > scrollTop) {
        if (onTopArrive && !_this.isTop) {
          onTopArrive(event);
        }

        target.scrollTop = 0;
        shouldCancelScroll = true;
        _this.isTop = true;
      } // cancel scroll


      if (shouldCancelScroll) {
        _this.cancelScroll(event);
      }
    };

    _this.onWheel = function (event) {
      _this.handleEventDelta(event, event.deltaY);
    };

    _this.onTouchStart = function (event) {
      // set touch start so we can calculate touchmove delta
      _this.touchStart = event.changedTouches[0].clientY;
    };

    _this.onTouchMove = function (event) {
      var deltaY = _this.touchStart - event.changedTouches[0].clientY;

      _this.handleEventDelta(event, deltaY);
    };

    _this.getScrollTarget = function (ref) {
      _this.scrollTarget = ref;
    };

    return _this;
  }

  var _proto = ScrollCaptor.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.startListening(this.scrollTarget);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.stopListening(this.scrollTarget);
  };

  _proto.startListening = function startListening(el) {
    // bail early if no element is available to attach to
    if (!el) return; // all the if statements are to appease Flow 😢

    if (typeof el.addEventListener === 'function') {
      el.addEventListener('wheel', this.onWheel, false);
    }

    if (typeof el.addEventListener === 'function') {
      el.addEventListener('touchstart', this.onTouchStart, false);
    }

    if (typeof el.addEventListener === 'function') {
      el.addEventListener('touchmove', this.onTouchMove, false);
    }
  };

  _proto.stopListening = function stopListening(el) {
    // all the if statements are to appease Flow 😢
    if (typeof el.removeEventListener === 'function') {
      el.removeEventListener('wheel', this.onWheel, false);
    }

    if (typeof el.removeEventListener === 'function') {
      el.removeEventListener('touchstart', this.onTouchStart, false);
    }

    if (typeof el.removeEventListener === 'function') {
      el.removeEventListener('touchmove', this.onTouchMove, false);
    }
  };

  _proto.render = function render() {
    return React.createElement(NodeResolver, {
      innerRef: this.getScrollTarget
    }, this.props.children);
  };

  return ScrollCaptor;
}(Component);

function ScrollCaptorSwitch(_ref) {
  var _ref$isEnabled = _ref.isEnabled,
      isEnabled = _ref$isEnabled === void 0 ? true : _ref$isEnabled,
      props = _objectWithoutPropertiesLoose$1$1(_ref, ["isEnabled"]);

  return isEnabled ? React.createElement(ScrollCaptor, props) : props.children;
}

var instructionsAriaMessage = function instructionsAriaMessage(event, context) {
  if (context === void 0) {
    context = {};
  }

  var _context = context,
      isSearchable = _context.isSearchable,
      isMulti = _context.isMulti,
      label = _context.label,
      isDisabled = _context.isDisabled;

  switch (event) {
    case 'menu':
      return "Use Up and Down to choose options" + (isDisabled ? '' : ', press Enter to select the currently focused option') + ", press Escape to exit the menu, press Tab to select the option and exit the menu.";

    case 'input':
      return (label ? label : 'Select') + " is focused " + (isSearchable ? ',type to refine list' : '') + ", press Down to open the menu, " + (isMulti ? ' press left to focus selected values' : '');

    case 'value':
      return 'Use left and right to toggle between focused values, press Backspace to remove the currently focused value';
  }
};
var valueEventAriaMessage = function valueEventAriaMessage(event, context) {
  var value = context.value,
      isDisabled = context.isDisabled;
  if (!value) return;

  switch (event) {
    case 'deselect-option':
    case 'pop-value':
    case 'remove-value':
      return "option " + value + ", deselected.";

    case 'select-option':
      return isDisabled ? "option " + value + " is disabled. Select another option." : "option " + value + ", selected.";
  }
};
var valueFocusAriaMessage = function valueFocusAriaMessage(_ref) {
  var focusedValue = _ref.focusedValue,
      getOptionLabel = _ref.getOptionLabel,
      selectValue = _ref.selectValue;
  return "value " + getOptionLabel(focusedValue) + " focused, " + (selectValue.indexOf(focusedValue) + 1) + " of " + selectValue.length + ".";
};
var optionFocusAriaMessage = function optionFocusAriaMessage(_ref2) {
  var focusedOption = _ref2.focusedOption,
      getOptionLabel = _ref2.getOptionLabel,
      options = _ref2.options;
  return "option " + getOptionLabel(focusedOption) + " focused" + (focusedOption.isDisabled ? ' disabled' : '') + ", " + (options.indexOf(focusedOption) + 1) + " of " + options.length + ".";
};
var resultsAriaMessage = function resultsAriaMessage(_ref3) {
  var inputValue = _ref3.inputValue,
      screenReaderMessage = _ref3.screenReaderMessage;
  return "" + screenReaderMessage + (inputValue ? ' for search term ' + inputValue : '') + ".";
};

var formatGroupLabel = function formatGroupLabel(group) {
  return group.label;
};
var getOptionLabel = function getOptionLabel(option) {
  return option.label;
};
var getOptionValue = function getOptionValue(option) {
  return option.value;
};
var isOptionDisabled = function isOptionDisabled(option) {
  return !!option.isDisabled;
};
var defaultStyles = {
  clearIndicator: clearIndicatorCSS,
  container: containerCSS,
  control: css$1,
  dropdownIndicator: dropdownIndicatorCSS,
  group: groupCSS,
  groupHeading: groupHeadingCSS,
  indicatorsContainer: indicatorsContainerCSS,
  indicatorSeparator: indicatorSeparatorCSS,
  input: inputCSS,
  loadingIndicator: loadingIndicatorCSS,
  loadingMessage: loadingMessageCSS,
  menu: menuCSS,
  menuList: menuListCSS,
  menuPortal: menuPortalCSS,
  multiValue: multiValueCSS,
  multiValueLabel: multiValueLabelCSS,
  multiValueRemove: multiValueRemoveCSS,
  noOptionsMessage: noOptionsMessageCSS,
  option: optionCSS,
  placeholder: placeholderCSS,
  singleValue: css$1$1,
  valueContainer: valueContainerCSS
}; // Merge Utility

var colors = {
  primary: '#2684FF',
  primary75: '#4C9AFF',
  primary50: '#B2D4FF',
  primary25: '#DEEBFF',
  danger: '#DE350B',
  dangerLight: '#FFBDAD',
  neutral0: 'hsl(0, 0%, 100%)',
  neutral5: 'hsl(0, 0%, 95%)',
  neutral10: 'hsl(0, 0%, 90%)',
  neutral20: 'hsl(0, 0%, 80%)',
  neutral30: 'hsl(0, 0%, 70%)',
  neutral40: 'hsl(0, 0%, 60%)',
  neutral50: 'hsl(0, 0%, 50%)',
  neutral60: 'hsl(0, 0%, 40%)',
  neutral70: 'hsl(0, 0%, 30%)',
  neutral80: 'hsl(0, 0%, 20%)',
  neutral90: 'hsl(0, 0%, 10%)'
};
var borderRadius = 4; // Used to calculate consistent margin/padding on elements

var baseUnit = 4; // The minimum height of the control

var controlHeight = 38; // The amount of space between the control and menu */

var menuGutter = baseUnit * 2;
var spacing = {
  baseUnit: baseUnit,
  controlHeight: controlHeight,
  menuGutter: menuGutter
};
var defaultTheme = {
  borderRadius: borderRadius,
  colors: colors,
  spacing: spacing
};

function _objectWithoutPropertiesLoose$2$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends$4$1() { _extends$4$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4$1.apply(this, arguments); }

function _inheritsLoose$4(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized$l(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
var defaultProps$1 = {
  backspaceRemovesValue: true,
  blurInputOnSelect: isTouchCapable(),
  captureMenuScroll: !isTouchCapable(),
  closeMenuOnSelect: true,
  closeMenuOnScroll: false,
  components: {},
  controlShouldRenderValue: true,
  escapeClearsValue: false,
  filterOption: createFilter(),
  formatGroupLabel: formatGroupLabel,
  getOptionLabel: getOptionLabel,
  getOptionValue: getOptionValue,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  isRtl: false,
  isSearchable: true,
  isOptionDisabled: isOptionDisabled,
  loadingMessage: function loadingMessage() {
    return 'Loading...';
  },
  maxMenuHeight: 300,
  minMenuHeight: 140,
  menuIsOpen: false,
  menuPlacement: 'bottom',
  menuPosition: 'absolute',
  menuShouldBlockScroll: false,
  menuShouldScrollIntoView: !isMobileDevice(),
  noOptionsMessage: function noOptionsMessage() {
    return 'No options';
  },
  openMenuOnFocus: false,
  openMenuOnClick: true,
  options: [],
  pageSize: 5,
  placeholder: 'Select...',
  screenReaderStatus: function screenReaderStatus(_ref) {
    var count = _ref.count;
    return count + " result" + (count !== 1 ? 's' : '') + " available";
  },
  styles: {},
  tabIndex: '0',
  tabSelectsValue: true
};
var instanceId = 1;

var Select =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose$4(Select, _Component);

  // Misc. Instance Properties
  // ------------------------------
  // TODO
  // Refs
  // ------------------------------
  // Lifecycle
  // ------------------------------
  function Select(_props) {
    var _this;

    _this = _Component.call(this, _props) || this;
    _this.state = {
      ariaLiveSelection: '',
      ariaLiveContext: '',
      focusedOption: null,
      focusedValue: null,
      inputIsHidden: false,
      isFocused: false,
      menuOptions: {
        render: [],
        focusable: []
      },
      selectValue: []
    };
    _this.blockOptionHover = false;
    _this.isComposing = false;
    _this.clearFocusValueOnUpdate = false;
    _this.commonProps = void 0;
    _this.components = void 0;
    _this.hasGroups = false;
    _this.initialTouchX = 0;
    _this.initialTouchY = 0;
    _this.inputIsHiddenAfterUpdate = void 0;
    _this.instancePrefix = '';
    _this.openAfterFocus = false;
    _this.scrollToFocusedOptionOnUpdate = false;
    _this.userIsDragging = void 0;
    _this.controlRef = null;

    _this.getControlRef = function (ref) {
      _this.controlRef = ref;
    };

    _this.focusedOptionRef = null;

    _this.getFocusedOptionRef = function (ref) {
      _this.focusedOptionRef = ref;
    };

    _this.menuListRef = null;

    _this.getMenuListRef = function (ref) {
      _this.menuListRef = ref;
    };

    _this.inputRef = null;

    _this.getInputRef = function (ref) {
      _this.inputRef = ref;
    };

    _this.cacheComponents = function (components) {
      _this.components = defaultComponents({
        components: components
      });
    };

    _this.focus = _this.focusInput;
    _this.blur = _this.blurInput;

    _this.onChange = function (newValue, actionMeta) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          name = _this$props.name;
      onChange(newValue, _extends$4$1({}, actionMeta, {
        name: name
      }));
    };

    _this.setValue = function (newValue, action, option) {
      if (action === void 0) {
        action = 'set-value';
      }

      var _this$props2 = _this.props,
          closeMenuOnSelect = _this$props2.closeMenuOnSelect,
          isMulti = _this$props2.isMulti;

      _this.onInputChange('', {
        action: 'set-value'
      });

      if (closeMenuOnSelect) {
        _this.inputIsHiddenAfterUpdate = !isMulti;

        _this.onMenuClose();
      } // when the select value should change, we should reset focusedValue


      _this.clearFocusValueOnUpdate = true;

      _this.onChange(newValue, {
        action: action,
        option: option
      });
    };

    _this.selectOption = function (newValue) {
      var _this$props3 = _this.props,
          blurInputOnSelect = _this$props3.blurInputOnSelect,
          isMulti = _this$props3.isMulti;
      var selectValue = _this.state.selectValue;

      if (isMulti) {
        if (_this.isOptionSelected(newValue, selectValue)) {
          var candidate = _this.getOptionValue(newValue);

          _this.setValue(selectValue.filter(function (i) {
            return _this.getOptionValue(i) !== candidate;
          }), 'deselect-option', newValue);

          _this.announceAriaLiveSelection({
            event: 'deselect-option',
            context: {
              value: _this.getOptionLabel(newValue)
            }
          });
        } else {
          if (!_this.isOptionDisabled(newValue, selectValue)) {
            _this.setValue([].concat(selectValue, [newValue]), 'select-option', newValue);

            _this.announceAriaLiveSelection({
              event: 'select-option',
              context: {
                value: _this.getOptionLabel(newValue)
              }
            });
          } else {
            // announce that option is disabled
            _this.announceAriaLiveSelection({
              event: 'select-option',
              context: {
                value: _this.getOptionLabel(newValue),
                isDisabled: true
              }
            });
          }
        }
      } else {
        if (!_this.isOptionDisabled(newValue, selectValue)) {
          _this.setValue(newValue, 'select-option');

          _this.announceAriaLiveSelection({
            event: 'select-option',
            context: {
              value: _this.getOptionLabel(newValue)
            }
          });
        } else {
          // announce that option is disabled
          _this.announceAriaLiveSelection({
            event: 'select-option',
            context: {
              value: _this.getOptionLabel(newValue),
              isDisabled: true
            }
          });
        }
      }

      if (blurInputOnSelect) {
        _this.blurInput();
      }
    };

    _this.removeValue = function (removedValue) {
      var selectValue = _this.state.selectValue;

      var candidate = _this.getOptionValue(removedValue);

      var newValue = selectValue.filter(function (i) {
        return _this.getOptionValue(i) !== candidate;
      });

      _this.onChange(newValue.length ? newValue : null, {
        action: 'remove-value',
        removedValue: removedValue
      });

      _this.announceAriaLiveSelection({
        event: 'remove-value',
        context: {
          value: removedValue ? _this.getOptionLabel(removedValue) : ''
        }
      });

      _this.focusInput();
    };

    _this.clearValue = function () {
      var isMulti = _this.props.isMulti;

      _this.onChange(isMulti ? [] : null, {
        action: 'clear'
      });
    };

    _this.popValue = function () {
      var selectValue = _this.state.selectValue;
      var lastSelectedValue = selectValue[selectValue.length - 1];
      var newValue = selectValue.slice(0, selectValue.length - 1);

      _this.announceAriaLiveSelection({
        event: 'pop-value',
        context: {
          value: lastSelectedValue ? _this.getOptionLabel(lastSelectedValue) : ''
        }
      });

      _this.onChange(newValue.length ? newValue : null, {
        action: 'pop-value',
        removedValue: lastSelectedValue
      });
    };

    _this.getOptionLabel = function (data) {
      return _this.props.getOptionLabel(data);
    };

    _this.getOptionValue = function (data) {
      return _this.props.getOptionValue(data);
    };

    _this.getStyles = function (key, props) {
      var base = defaultStyles[key](props);
      base.boxSizing = 'border-box';
      var custom = _this.props.styles[key];
      return custom ? custom(base, props) : base;
    };

    _this.getElementId = function (element) {
      return _this.instancePrefix + "-" + element;
    };

    _this.getActiveDescendentId = function () {
      var menuIsOpen = _this.props.menuIsOpen;
      var _this$state = _this.state,
          menuOptions = _this$state.menuOptions,
          focusedOption = _this$state.focusedOption;
      if (!focusedOption || !menuIsOpen) return undefined;
      var index = menuOptions.focusable.indexOf(focusedOption);
      var option = menuOptions.render[index];
      return option && option.key;
    };

    _this.announceAriaLiveSelection = function (_ref2) {
      var event = _ref2.event,
          context = _ref2.context;

      _this.setState({
        ariaLiveSelection: valueEventAriaMessage(event, context)
      });
    };

    _this.announceAriaLiveContext = function (_ref3) {
      var event = _ref3.event,
          context = _ref3.context;

      _this.setState({
        ariaLiveContext: instructionsAriaMessage(event, _extends$4$1({}, context, {
          label: _this.props['aria-label']
        }))
      });
    };

    _this.onMenuMouseDown = function (event) {
      if (event.button !== 0) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();

      _this.focusInput();
    };

    _this.onMenuMouseMove = function (event) {
      _this.blockOptionHover = false;
    };

    _this.onControlMouseDown = function (event) {
      var openMenuOnClick = _this.props.openMenuOnClick;

      if (!_this.state.isFocused) {
        if (openMenuOnClick) {
          _this.openAfterFocus = true;
        }

        _this.focusInput();
      } else if (!_this.props.menuIsOpen) {
        if (openMenuOnClick) {
          _this.openMenu('first');
        }
      } else {
        if ( // $FlowFixMe
        event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
          _this.onMenuClose();
        }
      }

      if ( // $FlowFixMe
      event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
        event.preventDefault();
      }
    };

    _this.onDropdownIndicatorMouseDown = function (event) {
      // ignore mouse events that weren't triggered by the primary button
      if (event && event.type === 'mousedown' && event.button !== 0) {
        return;
      }

      if (_this.props.isDisabled) return;
      var _this$props4 = _this.props,
          isMulti = _this$props4.isMulti,
          menuIsOpen = _this$props4.menuIsOpen;

      _this.focusInput();

      if (menuIsOpen) {
        _this.inputIsHiddenAfterUpdate = !isMulti;

        _this.onMenuClose();
      } else {
        _this.openMenu('first');
      }

      event.preventDefault();
      event.stopPropagation();
    };

    _this.onClearIndicatorMouseDown = function (event) {
      // ignore mouse events that weren't triggered by the primary button
      if (event && event.type === 'mousedown' && event.button !== 0) {
        return;
      }

      _this.clearValue();

      event.stopPropagation();
      _this.openAfterFocus = false;

      if (event.type === 'touchend') {
        _this.focusInput();
      } else {
        setTimeout(function () {
          return _this.focusInput();
        });
      }
    };

    _this.onScroll = function (event) {
      if (typeof _this.props.closeMenuOnScroll === 'boolean') {
        if (event.target instanceof HTMLElement && isDocumentElement(event.target)) {
          _this.props.onMenuClose();
        }
      } else if (typeof _this.props.closeMenuOnScroll === 'function') {
        if (_this.props.closeMenuOnScroll(event)) {
          _this.props.onMenuClose();
        }
      }
    };

    _this.onCompositionStart = function () {
      _this.isComposing = true;
    };

    _this.onCompositionEnd = function () {
      _this.isComposing = false;
    };

    _this.onTouchStart = function (_ref4) {
      var touches = _ref4.touches;
      var touch = touches.item(0);

      if (!touch) {
        return;
      }

      _this.initialTouchX = touch.clientX;
      _this.initialTouchY = touch.clientY;
      _this.userIsDragging = false;
    };

    _this.onTouchMove = function (_ref5) {
      var touches = _ref5.touches;
      var touch = touches.item(0);

      if (!touch) {
        return;
      }

      var deltaX = Math.abs(touch.clientX - _this.initialTouchX);
      var deltaY = Math.abs(touch.clientY - _this.initialTouchY);
      var moveThreshold = 5;
      _this.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
    };

    _this.onTouchEnd = function (event) {
      if (_this.userIsDragging) return; // close the menu if the user taps outside
      // we're checking on event.target here instead of event.currentTarget, because we want to assert information
      // on events on child elements, not the document (which we've attached this handler to).

      if (_this.controlRef && !_this.controlRef.contains(event.target) && _this.menuListRef && !_this.menuListRef.contains(event.target)) {
        _this.blurInput();
      } // reset move vars


      _this.initialTouchX = 0;
      _this.initialTouchY = 0;
    };

    _this.onControlTouchEnd = function (event) {
      if (_this.userIsDragging) return;

      _this.onControlMouseDown(event);
    };

    _this.onClearIndicatorTouchEnd = function (event) {
      if (_this.userIsDragging) return;

      _this.onClearIndicatorMouseDown(event);
    };

    _this.onDropdownIndicatorTouchEnd = function (event) {
      if (_this.userIsDragging) return;

      _this.onDropdownIndicatorMouseDown(event);
    };

    _this.handleInputChange = function (event) {
      var inputValue = event.currentTarget.value;
      _this.inputIsHiddenAfterUpdate = false;

      _this.onInputChange(inputValue, {
        action: 'input-change'
      });

      _this.onMenuOpen();
    };

    _this.onInputFocus = function (event) {
      var _this$props5 = _this.props,
          isSearchable = _this$props5.isSearchable,
          isMulti = _this$props5.isMulti;

      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }

      _this.inputIsHiddenAfterUpdate = false;

      _this.announceAriaLiveContext({
        event: 'input',
        context: {
          isSearchable: isSearchable,
          isMulti: isMulti
        }
      });

      _this.setState({
        isFocused: true
      });

      if (_this.openAfterFocus || _this.props.openMenuOnFocus) {
        _this.openMenu('first');
      }

      _this.openAfterFocus = false;
    };

    _this.onInputBlur = function (event) {
      if (_this.menuListRef && _this.menuListRef.contains(document.activeElement)) {
        _this.inputRef.focus();

        return;
      }

      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }

      _this.onInputChange('', {
        action: 'input-blur'
      });

      _this.onMenuClose();

      _this.setState({
        focusedValue: null,
        isFocused: false
      });
    };

    _this.onOptionHover = function (focusedOption) {
      if (_this.blockOptionHover || _this.state.focusedOption === focusedOption) {
        return;
      }

      _this.setState({
        focusedOption: focusedOption
      });
    };

    _this.shouldHideSelectedOptions = function () {
      var _this$props6 = _this.props,
          hideSelectedOptions = _this$props6.hideSelectedOptions,
          isMulti = _this$props6.isMulti;
      if (hideSelectedOptions === undefined) return isMulti;
      return hideSelectedOptions;
    };

    _this.onKeyDown = function (event) {
      var _this$props7 = _this.props,
          isMulti = _this$props7.isMulti,
          backspaceRemovesValue = _this$props7.backspaceRemovesValue,
          escapeClearsValue = _this$props7.escapeClearsValue,
          inputValue = _this$props7.inputValue,
          isClearable = _this$props7.isClearable,
          isDisabled = _this$props7.isDisabled,
          menuIsOpen = _this$props7.menuIsOpen,
          onKeyDown = _this$props7.onKeyDown,
          tabSelectsValue = _this$props7.tabSelectsValue,
          openMenuOnFocus = _this$props7.openMenuOnFocus;
      var _this$state2 = _this.state,
          focusedOption = _this$state2.focusedOption,
          focusedValue = _this$state2.focusedValue,
          selectValue = _this$state2.selectValue;
      if (isDisabled) return;

      if (typeof onKeyDown === 'function') {
        onKeyDown(event);

        if (event.defaultPrevented) {
          return;
        }
      } // Block option hover events when the user has just pressed a key


      _this.blockOptionHover = true;

      switch (event.key) {
        case 'ArrowLeft':
          if (!isMulti || inputValue) return;

          _this.focusValue('previous');

          break;

        case 'ArrowRight':
          if (!isMulti || inputValue) return;

          _this.focusValue('next');

          break;

        case 'Delete':
        case 'Backspace':
          if (inputValue) return;

          if (focusedValue) {
            _this.removeValue(focusedValue);
          } else {
            if (!backspaceRemovesValue) return;

            if (isMulti) {
              _this.popValue();
            } else if (isClearable) {
              _this.clearValue();
            }
          }

          break;

        case 'Tab':
          if (_this.isComposing) return;

          if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption || // don't capture the event if the menu opens on focus and the focused
          // option is already selected; it breaks the flow of navigation
          openMenuOnFocus && _this.isOptionSelected(focusedOption, selectValue)) {
            return;
          }

          _this.selectOption(focusedOption);

          break;

        case 'Enter':
          if (event.keyCode === 229) {
            // ignore the keydown event from an Input Method Editor(IME)
            // ref. https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
            break;
          }

          if (menuIsOpen) {
            if (!focusedOption) return;
            if (_this.isComposing) return;

            _this.selectOption(focusedOption);

            break;
          }

          return;

        case 'Escape':
          if (menuIsOpen) {
            _this.inputIsHiddenAfterUpdate = false;

            _this.onInputChange('', {
              action: 'menu-close'
            });

            _this.onMenuClose();
          } else if (isClearable && escapeClearsValue) {
            _this.clearValue();
          }

          break;

        case ' ':
          // space
          if (inputValue) {
            return;
          }

          if (!menuIsOpen) {
            _this.openMenu('first');

            break;
          }

          if (!focusedOption) return;

          _this.selectOption(focusedOption);

          break;

        case 'ArrowUp':
          if (menuIsOpen) {
            _this.focusOption('up');
          } else {
            _this.openMenu('last');
          }

          break;

        case 'ArrowDown':
          if (menuIsOpen) {
            _this.focusOption('down');
          } else {
            _this.openMenu('first');
          }

          break;

        case 'PageUp':
          if (!menuIsOpen) return;

          _this.focusOption('pageup');

          break;

        case 'PageDown':
          if (!menuIsOpen) return;

          _this.focusOption('pagedown');

          break;

        case 'Home':
          if (!menuIsOpen) return;

          _this.focusOption('first');

          break;

        case 'End':
          if (!menuIsOpen) return;

          _this.focusOption('last');

          break;

        default:
          return;
      }

      event.preventDefault();
    };

    _this.buildMenuOptions = function (props, selectValue) {
      var _props$inputValue = props.inputValue,
          inputValue = _props$inputValue === void 0 ? '' : _props$inputValue,
          options = props.options;

      var toOption = function toOption(option, id) {
        var isDisabled = _this.isOptionDisabled(option, selectValue);

        var isSelected = _this.isOptionSelected(option, selectValue);

        var label = _this.getOptionLabel(option);

        var value = _this.getOptionValue(option);

        if (_this.shouldHideSelectedOptions() && isSelected || !_this.filterOption({
          label: label,
          value: value,
          data: option
        }, inputValue)) {
          return;
        }

        var onHover = isDisabled ? undefined : function () {
          return _this.onOptionHover(option);
        };
        var onSelect = isDisabled ? undefined : function () {
          return _this.selectOption(option);
        };
        var optionId = _this.getElementId('option') + "-" + id;
        return {
          innerProps: {
            id: optionId,
            onClick: onSelect,
            onMouseMove: onHover,
            onMouseOver: onHover,
            tabIndex: -1
          },
          data: option,
          isDisabled: isDisabled,
          isSelected: isSelected,
          key: optionId,
          label: label,
          type: 'option',
          value: value
        };
      };

      return options.reduce(function (acc, item, itemIndex) {
        if (item.options) {
          // TODO needs a tidier implementation
          if (!_this.hasGroups) _this.hasGroups = true;
          var items = item.options;
          var children = items.map(function (child, i) {
            var option = toOption(child, itemIndex + "-" + i);
            if (option) acc.focusable.push(child);
            return option;
          }).filter(Boolean);

          if (children.length) {
            var groupId = _this.getElementId('group') + "-" + itemIndex;
            acc.render.push({
              type: 'group',
              key: groupId,
              data: item,
              options: children
            });
          }
        } else {
          var option = toOption(item, "" + itemIndex);

          if (option) {
            acc.render.push(option);
            acc.focusable.push(item);
          }
        }

        return acc;
      }, {
        render: [],
        focusable: []
      });
    };

    var _value = _props.value;
    _this.cacheComponents = memoizeOne(_this.cacheComponents, exportedEqual).bind(_assertThisInitialized$l(_assertThisInitialized$l(_this)));

    _this.cacheComponents(_props.components);

    _this.instancePrefix = 'react-select-' + (_this.props.instanceId || ++instanceId);

    var _selectValue = cleanValue(_value);

    _this.buildMenuOptions = memoizeOne(_this.buildMenuOptions, function (newArgs, lastArgs) {
      var _ref6 = newArgs,
          newProps = _ref6[0],
          newSelectValue = _ref6[1];
      var _ref7 = lastArgs,
          lastProps = _ref7[0],
          lastSelectValue = _ref7[1];
      return exportedEqual(newSelectValue, lastSelectValue) && exportedEqual(newProps.inputValue, lastProps.inputValue) && exportedEqual(newProps.options, lastProps.options);
    }).bind(_assertThisInitialized$l(_assertThisInitialized$l(_this)));

    var _menuOptions = _props.menuIsOpen ? _this.buildMenuOptions(_props, _selectValue) : {
      render: [],
      focusable: []
    };

    _this.state.menuOptions = _menuOptions;
    _this.state.selectValue = _selectValue;
    return _this;
  }

  var _proto = Select.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.startListeningComposition();
    this.startListeningToTouch();

    if (this.props.closeMenuOnScroll && document && document.addEventListener) {
      // Listen to all scroll events, and filter them out inside of 'onScroll'
      document.addEventListener('scroll', this.onScroll, true);
    }

    if (this.props.autoFocus) {
      this.focusInput();
    }
  };

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    var _this$props8 = this.props,
        options = _this$props8.options,
        value = _this$props8.value,
        menuIsOpen = _this$props8.menuIsOpen,
        inputValue = _this$props8.inputValue; // re-cache custom components

    this.cacheComponents(nextProps.components); // rebuild the menu options

    if (nextProps.value !== value || nextProps.options !== options || nextProps.menuIsOpen !== menuIsOpen || nextProps.inputValue !== inputValue) {
      var selectValue = cleanValue(nextProps.value);
      var menuOptions = nextProps.menuIsOpen ? this.buildMenuOptions(nextProps, selectValue) : {
        render: [],
        focusable: []
      };
      var focusedValue = this.getNextFocusedValue(selectValue);
      var focusedOption = this.getNextFocusedOption(menuOptions.focusable);
      this.setState({
        menuOptions: menuOptions,
        selectValue: selectValue,
        focusedOption: focusedOption,
        focusedValue: focusedValue
      });
    } // some updates should toggle the state of the input visibility


    if (this.inputIsHiddenAfterUpdate != null) {
      this.setState({
        inputIsHidden: this.inputIsHiddenAfterUpdate
      });
      delete this.inputIsHiddenAfterUpdate;
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props9 = this.props,
        isDisabled = _this$props9.isDisabled,
        menuIsOpen = _this$props9.menuIsOpen;
    var isFocused = this.state.isFocused;

    if ( // ensure focus is restored correctly when the control becomes enabled
    isFocused && !isDisabled && prevProps.isDisabled || // ensure focus is on the Input when the menu opens
    isFocused && menuIsOpen && !prevProps.menuIsOpen) {
      this.focusInput();
    } // scroll the focused option into view if necessary


    if (this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
      scrollIntoView(this.menuListRef, this.focusedOptionRef);
      this.scrollToFocusedOptionOnUpdate = false;
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.stopListeningComposition();
    this.stopListeningToTouch();
    document.removeEventListener('scroll', this.onScroll, true);
  };

  // ==============================
  // Consumer Handlers
  // ==============================
  _proto.onMenuOpen = function onMenuOpen() {
    this.props.onMenuOpen();
  };

  _proto.onMenuClose = function onMenuClose() {
    var _this$props10 = this.props,
        isSearchable = _this$props10.isSearchable,
        isMulti = _this$props10.isMulti;
    this.announceAriaLiveContext({
      event: 'input',
      context: {
        isSearchable: isSearchable,
        isMulti: isMulti
      }
    });
    this.onInputChange('', {
      action: 'menu-close'
    });
    this.props.onMenuClose();
  };

  _proto.onInputChange = function onInputChange(newValue, actionMeta) {
    this.props.onInputChange(newValue, actionMeta);
  } // ==============================
  // Methods
  // ==============================
  ;

  _proto.focusInput = function focusInput() {
    if (!this.inputRef) return;
    this.inputRef.focus();
  };

  _proto.blurInput = function blurInput() {
    if (!this.inputRef) return;
    this.inputRef.blur();
  } // aliased for consumers
  ;

  _proto.openMenu = function openMenu(focusOption) {
    var _this2 = this;

    var _this$state3 = this.state,
        selectValue = _this$state3.selectValue,
        isFocused = _this$state3.isFocused;
    var menuOptions = this.buildMenuOptions(this.props, selectValue);
    var isMulti = this.props.isMulti;
    var openAtIndex = focusOption === 'first' ? 0 : menuOptions.focusable.length - 1;

    if (!isMulti) {
      var selectedIndex = menuOptions.focusable.indexOf(selectValue[0]);

      if (selectedIndex > -1) {
        openAtIndex = selectedIndex;
      }
    } // only scroll if the menu isn't already open


    this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef);
    this.inputIsHiddenAfterUpdate = false;
    this.setState({
      menuOptions: menuOptions,
      focusedValue: null,
      focusedOption: menuOptions.focusable[openAtIndex]
    }, function () {
      _this2.onMenuOpen();

      _this2.announceAriaLiveContext({
        event: 'menu'
      });
    });
  };

  _proto.focusValue = function focusValue(direction) {
    var _this$props11 = this.props,
        isMulti = _this$props11.isMulti,
        isSearchable = _this$props11.isSearchable;
    var _this$state4 = this.state,
        selectValue = _this$state4.selectValue,
        focusedValue = _this$state4.focusedValue; // Only multiselects support value focusing

    if (!isMulti) return;
    this.setState({
      focusedOption: null
    });
    var focusedIndex = selectValue.indexOf(focusedValue);

    if (!focusedValue) {
      focusedIndex = -1;
      this.announceAriaLiveContext({
        event: 'value'
      });
    }

    var lastIndex = selectValue.length - 1;
    var nextFocus = -1;
    if (!selectValue.length) return;

    switch (direction) {
      case 'previous':
        if (focusedIndex === 0) {
          // don't cycle from the start to the end
          nextFocus = 0;
        } else if (focusedIndex === -1) {
          // if nothing is focused, focus the last value first
          nextFocus = lastIndex;
        } else {
          nextFocus = focusedIndex - 1;
        }

        break;

      case 'next':
        if (focusedIndex > -1 && focusedIndex < lastIndex) {
          nextFocus = focusedIndex + 1;
        }

        break;
    }

    if (nextFocus === -1) {
      this.announceAriaLiveContext({
        event: 'input',
        context: {
          isSearchable: isSearchable,
          isMulti: isMulti
        }
      });
    }

    this.setState({
      inputIsHidden: nextFocus !== -1,
      focusedValue: selectValue[nextFocus]
    });
  };

  _proto.focusOption = function focusOption(direction) {
    if (direction === void 0) {
      direction = 'first';
    }

    var pageSize = this.props.pageSize;
    var _this$state5 = this.state,
        focusedOption = _this$state5.focusedOption,
        menuOptions = _this$state5.menuOptions;
    var options = menuOptions.focusable;
    if (!options.length) return;
    var nextFocus = 0; // handles 'first'

    var focusedIndex = options.indexOf(focusedOption);

    if (!focusedOption) {
      focusedIndex = -1;
      this.announceAriaLiveContext({
        event: 'menu'
      });
    }

    if (direction === 'up') {
      nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
    } else if (direction === 'down') {
      nextFocus = (focusedIndex + 1) % options.length;
    } else if (direction === 'pageup') {
      nextFocus = focusedIndex - pageSize;
      if (nextFocus < 0) nextFocus = 0;
    } else if (direction === 'pagedown') {
      nextFocus = focusedIndex + pageSize;
      if (nextFocus > options.length - 1) nextFocus = options.length - 1;
    } else if (direction === 'last') {
      nextFocus = options.length - 1;
    }

    this.scrollToFocusedOptionOnUpdate = true;
    this.setState({
      focusedOption: options[nextFocus],
      focusedValue: null
    });
    this.announceAriaLiveContext({
      event: 'menu',
      context: {
        isDisabled: isOptionDisabled(options[nextFocus])
      }
    });
  };

  // ==============================
  // Getters
  // ==============================
  _proto.getTheme = function getTheme() {
    // Use the default theme if there are no customizations.
    if (!this.props.theme) {
      return defaultTheme;
    } // If the theme prop is a function, assume the function
    // knows how to merge the passed-in default theme with
    // its own modifications.


    if (typeof this.props.theme === 'function') {
      return this.props.theme(defaultTheme);
    } // Otherwise, if a plain theme object was passed in,
    // overlay it with the default theme.


    return _extends$4$1({}, defaultTheme, this.props.theme);
  };

  _proto.getCommonProps = function getCommonProps() {
    var clearValue = this.clearValue,
        getStyles = this.getStyles,
        setValue = this.setValue,
        selectOption = this.selectOption,
        props = this.props;
    var classNamePrefix = props.classNamePrefix,
        isMulti = props.isMulti,
        isRtl = props.isRtl,
        options = props.options;
    var selectValue = this.state.selectValue;
    var hasValue = this.hasValue();

    var getValue = function getValue() {
      return selectValue;
    };

    var cx = classNames.bind(null, classNamePrefix);
    return {
      cx: cx,
      clearValue: clearValue,
      getStyles: getStyles,
      getValue: getValue,
      hasValue: hasValue,
      isMulti: isMulti,
      isRtl: isRtl,
      options: options,
      selectOption: selectOption,
      setValue: setValue,
      selectProps: props,
      theme: this.getTheme()
    };
  };

  _proto.getNextFocusedValue = function getNextFocusedValue(nextSelectValue) {
    if (this.clearFocusValueOnUpdate) {
      this.clearFocusValueOnUpdate = false;
      return null;
    }

    var _this$state6 = this.state,
        focusedValue = _this$state6.focusedValue,
        lastSelectValue = _this$state6.selectValue;
    var lastFocusedIndex = lastSelectValue.indexOf(focusedValue);

    if (lastFocusedIndex > -1) {
      var nextFocusedIndex = nextSelectValue.indexOf(focusedValue);

      if (nextFocusedIndex > -1) {
        // the focused value is still in the selectValue, return it
        return focusedValue;
      } else if (lastFocusedIndex < nextSelectValue.length) {
        // the focusedValue is not present in the next selectValue array by
        // reference, so return the new value at the same index
        return nextSelectValue[lastFocusedIndex];
      }
    }

    return null;
  };

  _proto.getNextFocusedOption = function getNextFocusedOption(options) {
    var lastFocusedOption = this.state.focusedOption;
    return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
  };

  _proto.hasValue = function hasValue() {
    var selectValue = this.state.selectValue;
    return selectValue.length > 0;
  };

  _proto.hasOptions = function hasOptions() {
    return !!this.state.menuOptions.render.length;
  };

  _proto.countOptions = function countOptions() {
    return this.state.menuOptions.focusable.length;
  };

  _proto.isClearable = function isClearable() {
    var _this$props12 = this.props,
        isClearable = _this$props12.isClearable,
        isMulti = _this$props12.isMulti; // single select, by default, IS NOT clearable
    // multi select, by default, IS clearable

    if (isClearable === undefined) return isMulti;
    return isClearable;
  };

  _proto.isOptionDisabled = function isOptionDisabled(option, selectValue) {
    return typeof this.props.isOptionDisabled === 'function' ? this.props.isOptionDisabled(option, selectValue) : false;
  };

  _proto.isOptionSelected = function isOptionSelected(option, selectValue) {
    var _this3 = this;

    if (selectValue.indexOf(option) > -1) return true;

    if (typeof this.props.isOptionSelected === 'function') {
      return this.props.isOptionSelected(option, selectValue);
    }

    var candidate = this.getOptionValue(option);
    return selectValue.some(function (i) {
      return _this3.getOptionValue(i) === candidate;
    });
  };

  _proto.filterOption = function filterOption(option, inputValue) {
    return this.props.filterOption ? this.props.filterOption(option, inputValue) : true;
  };

  _proto.formatOptionLabel = function formatOptionLabel(data, context) {
    if (typeof this.props.formatOptionLabel === 'function') {
      var inputValue = this.props.inputValue;
      var selectValue = this.state.selectValue;
      return this.props.formatOptionLabel(data, {
        context: context,
        inputValue: inputValue,
        selectValue: selectValue
      });
    } else {
      return this.getOptionLabel(data);
    }
  };

  _proto.formatGroupLabel = function formatGroupLabel(data) {
    return this.props.formatGroupLabel(data);
  } // ==============================
  // Mouse Handlers
  // ==============================
  ;

  // ==============================
  // Composition Handlers
  // ==============================
  _proto.startListeningComposition = function startListeningComposition() {
    if (document && document.addEventListener) {
      document.addEventListener('compositionstart', this.onCompositionStart, false);
      document.addEventListener('compositionend', this.onCompositionEnd, false);
    }
  };

  _proto.stopListeningComposition = function stopListeningComposition() {
    if (document && document.removeEventListener) {
      document.removeEventListener('compositionstart', this.onCompositionStart);
      document.removeEventListener('compositionend', this.onCompositionEnd);
    }
  };

  // ==============================
  // Touch Handlers
  // ==============================
  _proto.startListeningToTouch = function startListeningToTouch() {
    if (document && document.addEventListener) {
      document.addEventListener('touchstart', this.onTouchStart, false);
      document.addEventListener('touchmove', this.onTouchMove, false);
      document.addEventListener('touchend', this.onTouchEnd, false);
    }
  };

  _proto.stopListeningToTouch = function stopListeningToTouch() {
    if (document && document.removeEventListener) {
      document.removeEventListener('touchstart', this.onTouchStart);
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchend', this.onTouchEnd);
    }
  };

  // ==============================
  // Renderers
  // ==============================
  _proto.constructAriaLiveMessage = function constructAriaLiveMessage() {
    var _this$state7 = this.state,
        ariaLiveContext = _this$state7.ariaLiveContext,
        selectValue = _this$state7.selectValue,
        focusedValue = _this$state7.focusedValue,
        focusedOption = _this$state7.focusedOption;
    var _this$props13 = this.props,
        options = _this$props13.options,
        menuIsOpen = _this$props13.menuIsOpen,
        inputValue = _this$props13.inputValue,
        screenReaderStatus = _this$props13.screenReaderStatus; // An aria live message representing the currently focused value in the select.

    var focusedValueMsg = focusedValue ? valueFocusAriaMessage({
      focusedValue: focusedValue,
      getOptionLabel: this.getOptionLabel,
      selectValue: selectValue
    }) : ''; // An aria live message representing the currently focused option in the select.

    var focusedOptionMsg = focusedOption && menuIsOpen ? optionFocusAriaMessage({
      focusedOption: focusedOption,
      getOptionLabel: this.getOptionLabel,
      options: options
    }) : ''; // An aria live message representing the set of focusable results and current searchterm/inputvalue.

    var resultsMsg = resultsAriaMessage({
      inputValue: inputValue,
      screenReaderMessage: screenReaderStatus({
        count: this.countOptions()
      })
    });
    return focusedValueMsg + " " + focusedOptionMsg + " " + resultsMsg + " " + ariaLiveContext;
  };

  _proto.renderInput = function renderInput() {
    var _this$props14 = this.props,
        isDisabled = _this$props14.isDisabled,
        isSearchable = _this$props14.isSearchable,
        inputId = _this$props14.inputId,
        inputValue = _this$props14.inputValue,
        tabIndex = _this$props14.tabIndex;
    var Input = this.components.Input;
    var inputIsHidden = this.state.inputIsHidden;
    var id = inputId || this.getElementId('input'); // aria attributes makes the JSX "noisy", separated for clarity

    var ariaAttributes = {
      'aria-autocomplete': 'list',
      'aria-label': this.props['aria-label'],
      'aria-labelledby': this.props['aria-labelledby']
    };

    if (!isSearchable) {
      // use a dummy input to maintain focus/blur functionality
      return React.createElement(DummyInput, _extends$4$1({
        id: id,
        innerRef: this.getInputRef,
        onBlur: this.onInputBlur,
        onChange: noop,
        onFocus: this.onInputFocus,
        readOnly: true,
        disabled: isDisabled,
        tabIndex: tabIndex,
        value: ""
      }, ariaAttributes));
    }

    var _this$commonProps = this.commonProps,
        cx = _this$commonProps.cx,
        theme = _this$commonProps.theme,
        selectProps = _this$commonProps.selectProps;
    return React.createElement(Input, _extends$4$1({
      autoCapitalize: "none",
      autoComplete: "off",
      autoCorrect: "off",
      cx: cx,
      getStyles: this.getStyles,
      id: id,
      innerRef: this.getInputRef,
      isDisabled: isDisabled,
      isHidden: inputIsHidden,
      onBlur: this.onInputBlur,
      onChange: this.handleInputChange,
      onFocus: this.onInputFocus,
      selectProps: selectProps,
      spellCheck: "false",
      tabIndex: tabIndex,
      theme: theme,
      type: "text",
      value: inputValue
    }, ariaAttributes));
  };

  _proto.renderPlaceholderOrValue = function renderPlaceholderOrValue() {
    var _this4 = this;

    var _this$components = this.components,
        MultiValue = _this$components.MultiValue,
        MultiValueContainer = _this$components.MultiValueContainer,
        MultiValueLabel = _this$components.MultiValueLabel,
        MultiValueRemove = _this$components.MultiValueRemove,
        SingleValue = _this$components.SingleValue,
        Placeholder = _this$components.Placeholder;
    var commonProps = this.commonProps;
    var _this$props15 = this.props,
        controlShouldRenderValue = _this$props15.controlShouldRenderValue,
        isDisabled = _this$props15.isDisabled,
        isMulti = _this$props15.isMulti,
        inputValue = _this$props15.inputValue,
        placeholder = _this$props15.placeholder;
    var _this$state8 = this.state,
        selectValue = _this$state8.selectValue,
        focusedValue = _this$state8.focusedValue,
        isFocused = _this$state8.isFocused;

    if (!this.hasValue() || !controlShouldRenderValue) {
      return inputValue ? null : React.createElement(Placeholder, _extends$4$1({}, commonProps, {
        key: "placeholder",
        isDisabled: isDisabled,
        isFocused: isFocused
      }), placeholder);
    }

    if (isMulti) {
      var selectValues = selectValue.map(function (opt, index) {
        var isOptionFocused = opt === focusedValue;
        return React.createElement(MultiValue, _extends$4$1({}, commonProps, {
          components: {
            Container: MultiValueContainer,
            Label: MultiValueLabel,
            Remove: MultiValueRemove
          },
          isFocused: isOptionFocused,
          isDisabled: isDisabled,
          key: _this4.getOptionValue(opt),
          index: index,
          removeProps: {
            onClick: function onClick() {
              return _this4.removeValue(opt);
            },
            onTouchEnd: function onTouchEnd() {
              return _this4.removeValue(opt);
            },
            onMouseDown: function onMouseDown(e) {
              e.preventDefault();
              e.stopPropagation();
            }
          },
          data: opt
        }), _this4.formatOptionLabel(opt, 'value'));
      });
      return selectValues;
    }

    if (inputValue) {
      return null;
    }

    var singleValue = selectValue[0];
    return React.createElement(SingleValue, _extends$4$1({}, commonProps, {
      data: singleValue,
      isDisabled: isDisabled
    }), this.formatOptionLabel(singleValue, 'value'));
  };

  _proto.renderClearIndicator = function renderClearIndicator() {
    var ClearIndicator = this.components.ClearIndicator;
    var commonProps = this.commonProps;
    var _this$props16 = this.props,
        isDisabled = _this$props16.isDisabled,
        isLoading = _this$props16.isLoading;
    var isFocused = this.state.isFocused;

    if (!this.isClearable() || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) {
      return null;
    }

    var innerProps = {
      onMouseDown: this.onClearIndicatorMouseDown,
      onTouchEnd: this.onClearIndicatorTouchEnd,
      'aria-hidden': 'true'
    };
    return React.createElement(ClearIndicator, _extends$4$1({}, commonProps, {
      innerProps: innerProps,
      isFocused: isFocused
    }));
  };

  _proto.renderLoadingIndicator = function renderLoadingIndicator() {
    var LoadingIndicator = this.components.LoadingIndicator;
    var commonProps = this.commonProps;
    var _this$props17 = this.props,
        isDisabled = _this$props17.isDisabled,
        isLoading = _this$props17.isLoading;
    var isFocused = this.state.isFocused;
    if (!LoadingIndicator || !isLoading) return null;
    var innerProps = {
      'aria-hidden': 'true'
    };
    return React.createElement(LoadingIndicator, _extends$4$1({}, commonProps, {
      innerProps: innerProps,
      isDisabled: isDisabled,
      isFocused: isFocused
    }));
  };

  _proto.renderIndicatorSeparator = function renderIndicatorSeparator() {
    var _this$components2 = this.components,
        DropdownIndicator = _this$components2.DropdownIndicator,
        IndicatorSeparator = _this$components2.IndicatorSeparator; // separator doesn't make sense without the dropdown indicator

    if (!DropdownIndicator || !IndicatorSeparator) return null;
    var commonProps = this.commonProps;
    var isDisabled = this.props.isDisabled;
    var isFocused = this.state.isFocused;
    return React.createElement(IndicatorSeparator, _extends$4$1({}, commonProps, {
      isDisabled: isDisabled,
      isFocused: isFocused
    }));
  };

  _proto.renderDropdownIndicator = function renderDropdownIndicator() {
    var DropdownIndicator = this.components.DropdownIndicator;
    if (!DropdownIndicator) return null;
    var commonProps = this.commonProps;
    var isDisabled = this.props.isDisabled;
    var isFocused = this.state.isFocused;
    var innerProps = {
      onMouseDown: this.onDropdownIndicatorMouseDown,
      onTouchEnd: this.onDropdownIndicatorTouchEnd,
      'aria-hidden': 'true'
    };
    return React.createElement(DropdownIndicator, _extends$4$1({}, commonProps, {
      innerProps: innerProps,
      isDisabled: isDisabled,
      isFocused: isFocused
    }));
  };

  _proto.renderMenu = function renderMenu() {
    var _this5 = this;

    var _this$components3 = this.components,
        Group = _this$components3.Group,
        GroupHeading = _this$components3.GroupHeading,
        Menu = _this$components3.Menu,
        MenuList = _this$components3.MenuList,
        MenuPortal = _this$components3.MenuPortal,
        LoadingMessage = _this$components3.LoadingMessage,
        NoOptionsMessage = _this$components3.NoOptionsMessage,
        Option = _this$components3.Option;
    var commonProps = this.commonProps;
    var _this$state9 = this.state,
        focusedOption = _this$state9.focusedOption,
        menuOptions = _this$state9.menuOptions;
    var _this$props18 = this.props,
        captureMenuScroll = _this$props18.captureMenuScroll,
        inputValue = _this$props18.inputValue,
        isLoading = _this$props18.isLoading,
        loadingMessage = _this$props18.loadingMessage,
        minMenuHeight = _this$props18.minMenuHeight,
        maxMenuHeight = _this$props18.maxMenuHeight,
        menuIsOpen = _this$props18.menuIsOpen,
        menuPlacement = _this$props18.menuPlacement,
        menuPosition = _this$props18.menuPosition,
        menuPortalTarget = _this$props18.menuPortalTarget,
        menuShouldBlockScroll = _this$props18.menuShouldBlockScroll,
        menuShouldScrollIntoView = _this$props18.menuShouldScrollIntoView,
        noOptionsMessage = _this$props18.noOptionsMessage,
        onMenuScrollToTop = _this$props18.onMenuScrollToTop,
        onMenuScrollToBottom = _this$props18.onMenuScrollToBottom;
    if (!menuIsOpen) return null; // TODO: Internal Option Type here

    var render = function render(props) {
      // for performance, the menu options in state aren't changed when the
      // focused option changes so we calculate additional props based on that
      var isFocused = focusedOption === props.data;
      props.innerRef = isFocused ? _this5.getFocusedOptionRef : undefined;
      return React.createElement(Option, _extends$4$1({}, commonProps, props, {
        isFocused: isFocused
      }), _this5.formatOptionLabel(props.data, 'menu'));
    };

    var menuUI;

    if (this.hasOptions()) {
      menuUI = menuOptions.render.map(function (item) {
        if (item.type === 'group') {
          var type = item.type,
              group = _objectWithoutPropertiesLoose$2$1(item, ["type"]);

          var headingId = item.key + "-heading";
          return React.createElement(Group, _extends$4$1({}, commonProps, group, {
            Heading: GroupHeading,
            headingProps: {
              id: headingId
            },
            label: _this5.formatGroupLabel(item.data)
          }), item.options.map(function (option) {
            return render(option);
          }));
        } else if (item.type === 'option') {
          return render(item);
        }
      });
    } else if (isLoading) {
      var message = loadingMessage({
        inputValue: inputValue
      });
      if (message === null) return null;
      menuUI = React.createElement(LoadingMessage, commonProps, message);
    } else {
      var _message = noOptionsMessage({
        inputValue: inputValue
      });

      if (_message === null) return null;
      menuUI = React.createElement(NoOptionsMessage, commonProps, _message);
    }

    var menuPlacementProps = {
      minMenuHeight: minMenuHeight,
      maxMenuHeight: maxMenuHeight,
      menuPlacement: menuPlacement,
      menuPosition: menuPosition,
      menuShouldScrollIntoView: menuShouldScrollIntoView
    };
    var menuElement = React.createElement(MenuPlacer, _extends$4$1({}, commonProps, menuPlacementProps), function (_ref8) {
      var ref = _ref8.ref,
          _ref8$placerProps = _ref8.placerProps,
          placement = _ref8$placerProps.placement,
          maxHeight = _ref8$placerProps.maxHeight;
      return React.createElement(Menu, _extends$4$1({}, commonProps, menuPlacementProps, {
        innerRef: ref,
        innerProps: {
          onMouseDown: _this5.onMenuMouseDown,
          onMouseMove: _this5.onMenuMouseMove
        },
        isLoading: isLoading,
        placement: placement
      }), React.createElement(ScrollCaptorSwitch, {
        isEnabled: captureMenuScroll,
        onTopArrive: onMenuScrollToTop,
        onBottomArrive: onMenuScrollToBottom
      }, React.createElement(ScrollBlock, {
        isEnabled: menuShouldBlockScroll
      }, React.createElement(MenuList, _extends$4$1({}, commonProps, {
        innerRef: _this5.getMenuListRef,
        isLoading: isLoading,
        maxHeight: maxHeight
      }), menuUI))));
    }); // positioning behaviour is almost identical for portalled and fixed,
    // so we use the same component. the actual portalling logic is forked
    // within the component based on `menuPosition`

    return menuPortalTarget || menuPosition === 'fixed' ? React.createElement(MenuPortal, _extends$4$1({}, commonProps, {
      appendTo: menuPortalTarget,
      controlElement: this.controlRef,
      menuPlacement: menuPlacement,
      menuPosition: menuPosition
    }), menuElement) : menuElement;
  };

  _proto.renderFormField = function renderFormField() {
    var _this6 = this;

    var _this$props19 = this.props,
        delimiter = _this$props19.delimiter,
        isDisabled = _this$props19.isDisabled,
        isMulti = _this$props19.isMulti,
        name = _this$props19.name;
    var selectValue = this.state.selectValue;
    if (!name || isDisabled) return;

    if (isMulti) {
      if (delimiter) {
        var value = selectValue.map(function (opt) {
          return _this6.getOptionValue(opt);
        }).join(delimiter);
        return React.createElement("input", {
          name: name,
          type: "hidden",
          value: value
        });
      } else {
        var input = selectValue.length > 0 ? selectValue.map(function (opt, i) {
          return React.createElement("input", {
            key: "i-" + i,
            name: name,
            type: "hidden",
            value: _this6.getOptionValue(opt)
          });
        }) : React.createElement("input", {
          name: name,
          type: "hidden"
        });
        return React.createElement("div", null, input);
      }
    } else {
      var _value2 = selectValue[0] ? this.getOptionValue(selectValue[0]) : '';

      return React.createElement("input", {
        name: name,
        type: "hidden",
        value: _value2
      });
    }
  };

  _proto.renderLiveRegion = function renderLiveRegion() {
    if (!this.state.isFocused) return null;
    return React.createElement(A11yText, {
      "aria-live": "polite"
    }, React.createElement("p", {
      id: "aria-selection-event"
    }, "\xA0", this.state.ariaLiveSelection), React.createElement("p", {
      id: "aria-context"
    }, "\xA0", this.constructAriaLiveMessage()));
  };

  _proto.render = function render() {
    var _this$components4 = this.components,
        Control = _this$components4.Control,
        IndicatorsContainer = _this$components4.IndicatorsContainer,
        SelectContainer = _this$components4.SelectContainer,
        ValueContainer = _this$components4.ValueContainer;
    var _this$props20 = this.props,
        className = _this$props20.className,
        id = _this$props20.id,
        isDisabled = _this$props20.isDisabled,
        menuIsOpen = _this$props20.menuIsOpen;
    var isFocused = this.state.isFocused;
    var commonProps = this.commonProps = this.getCommonProps();
    return React.createElement(SelectContainer, _extends$4$1({}, commonProps, {
      className: className,
      innerProps: {
        id: id,
        onKeyDown: this.onKeyDown
      },
      isDisabled: isDisabled,
      isFocused: isFocused
    }), this.renderLiveRegion(), React.createElement(Control, _extends$4$1({}, commonProps, {
      innerRef: this.getControlRef,
      innerProps: {
        onMouseDown: this.onControlMouseDown,
        onTouchEnd: this.onControlTouchEnd
      },
      isDisabled: isDisabled,
      isFocused: isFocused,
      menuIsOpen: menuIsOpen
    }), React.createElement(ValueContainer, _extends$4$1({}, commonProps, {
      isDisabled: isDisabled
    }), this.renderPlaceholderOrValue(), this.renderInput()), React.createElement(IndicatorsContainer, _extends$4$1({}, commonProps, {
      isDisabled: isDisabled
    }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
  };

  return Select;
}(Component);

Select.defaultProps = defaultProps$1;

function _extends$c() { _extends$c = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$c.apply(this, arguments); }

function _objectWithoutPropertiesLoose$4(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose$5(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }
var defaultProps$2 = {
  defaultInputValue: '',
  defaultMenuIsOpen: false,
  defaultValue: null
};

var manageState = function manageState(SelectComponent) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose$5(StateManager, _Component);

    function StateManager() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _Component.call.apply(_Component, [this].concat(args)) || this;
      _this.select = void 0;
      _this.state = {
        inputValue: _this.props.inputValue !== undefined ? _this.props.inputValue : _this.props.defaultInputValue,
        menuIsOpen: _this.props.menuIsOpen !== undefined ? _this.props.menuIsOpen : _this.props.defaultMenuIsOpen,
        value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue
      };

      _this.onChange = function (value, actionMeta) {
        _this.callProp('onChange', value, actionMeta);

        _this.setState({
          value: value
        });
      };

      _this.onInputChange = function (value, actionMeta) {
        // TODO: for backwards compatibility, we allow the prop to return a new
        // value, but now inputValue is a controllable prop we probably shouldn't
        var newValue = _this.callProp('onInputChange', value, actionMeta);

        _this.setState({
          inputValue: newValue !== undefined ? newValue : value
        });
      };

      _this.onMenuOpen = function () {
        _this.callProp('onMenuOpen');

        _this.setState({
          menuIsOpen: true
        });
      };

      _this.onMenuClose = function () {
        _this.callProp('onMenuClose');

        _this.setState({
          menuIsOpen: false
        });
      };

      return _this;
    }

    var _proto = StateManager.prototype;

    _proto.focus = function focus() {
      this.select.focus();
    };

    _proto.blur = function blur() {
      this.select.blur();
    } // FIXME: untyped flow code, return any
    ;

    _proto.getProp = function getProp(key) {
      return this.props[key] !== undefined ? this.props[key] : this.state[key];
    } // FIXME: untyped flow code, return any
    ;

    _proto.callProp = function callProp(name) {
      if (typeof this.props[name] === 'function') {
        var _this$props;

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        return (_this$props = this.props)[name].apply(_this$props, args);
      }
    };

    _proto.render = function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          defaultInputValue = _this$props2.defaultInputValue,
          defaultMenuIsOpen = _this$props2.defaultMenuIsOpen,
          defaultValue = _this$props2.defaultValue,
          props = _objectWithoutPropertiesLoose$4(_this$props2, ["defaultInputValue", "defaultMenuIsOpen", "defaultValue"]);

      return React.createElement(SelectComponent, _extends$c({}, props, {
        ref: function ref(_ref) {
          _this2.select = _ref;
        },
        inputValue: this.getProp('inputValue'),
        menuIsOpen: this.getProp('menuIsOpen'),
        onChange: this.onChange,
        onInputChange: this.onInputChange,
        onMenuClose: this.onMenuClose,
        onMenuOpen: this.onMenuOpen,
        value: this.getProp('value')
      }));
    };

    return StateManager;
  }(Component), _class.defaultProps = defaultProps$2, _temp;
};

var index = manageState(Select);

function _typeof$n(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$n = function _typeof(obj) { return typeof obj; }; } else { _typeof$n = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$n(obj); }

function _classCallCheck$m(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$l(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$l(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$l(Constructor.prototype, protoProps); if (staticProps) _defineProperties$l(Constructor, staticProps); return Constructor; }

function _inherits$l(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$l(subClass, superClass); }

function _setPrototypeOf$l(o, p) { _setPrototypeOf$l = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$l(o, p); }

function _createSuper$l(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$l(); return function _createSuperInternal() { var Super = _getPrototypeOf$l(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$l(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$l(this, result); }; }

function _possibleConstructorReturn$l(self, call) { if (call && (_typeof$n(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$m(self); }

function _assertThisInitialized$m(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$l() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$l(o) { _getPrototypeOf$l = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$l(o); }

var Option$1 = function Option(props) {
  var value = props.value,
      options = props.options;
  var checkedOptions = options.filter(function (option) {
    return option.checked;
  }).map(function (option) {
    return option.columnId;
  });
  var checked = value === "*" ? checkedOptions.length === options.length : checkedOptions.includes(value);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(components.Option, props, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: function onChange() {}
  }), " ", /*#__PURE__*/React.createElement("label", null, props.label)));
};
/*const MultiValue = props => (<components.MultiValue {...props}/>)*/


var QuickColumns = /*#__PURE__*/function (_React$Component) {
  _inherits$l(QuickColumns, _React$Component);

  var _super = _createSuper$l(QuickColumns);

  function QuickColumns(props) {
    var _this;

    _classCallCheck$m(this, QuickColumns);

    _this = _super.call(this, props);
    _this.state = _this.createStateFromProps(_this.props);
    _this.updateDataTableQuickColumns = _this.updateDataTableQuickColumns.bind(_assertThisInitialized$m(_this));
    _this.quickHandleChange = _this.quickHandleChange.bind(_assertThisInitialized$m(_this));
    return _this;
  }

  _createClass$l(QuickColumns, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      bus.listen("updateDataTableQuickColumns", this.updateDataTableQuickColumns);
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.meta._ts_ > this.props.meta._ts_) {
        this.setState(this.createStateFromProps(nextProps));
      }
    }
  }, {
    key: "createStateFromProps",
    value: function createStateFromProps(props) {
      var table_name = props.category;
      var query_name = props.page;
      if (props.columns.length === 0) return []; //const firstRow=props.rows[0].cells;

      return {
        quickColumns: props.columns.map(function (col, idx) {
          if (col.quick) {
            var quickInfo = {
              columnId: idx,
              visible: col.quick === 'yes'
            };

            if (isGuest) {
              var visible = getColumnSettings(table_name, query_name, col.name, "visible");
              if (visible) quickInfo.visible = visible === 'yes';
            }

            return quickInfo;
          } else return null;
        }).filter(function (col) {
          return col !== null;
        })
      };
    }
  }, {
    key: "quickHandleChange",
    value: function quickHandleChange(idx, visible) {
      var quickColumn = this.state.quickColumns[idx];
      quickColumn.visible = visible !== undefined ? visible : !quickColumn.visible;
      var value = quickColumn.visible ? "yes" : "no";
      var table_name = this.props.category;
      var query_name = this.props.page;
      var column_name = this.props.columns[quickColumn.columnId].name;

      if (isGuest) {
        setColumnSettings(table_name, query_name, column_name, "visible", value);
      } else {
        be5.net.request("quick", {
          "table_name": this.props.category,
          "query_name": this.props.page,
          "column_name": this.props.columns[quickColumn.columnId].name,
          "quick": value
        });
      }

      this.forceUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.state.quickColumns.length === 0) {
        return null;
      }

      this.updateDataTableQuickColumns();

      var handleSelect = function handleSelect(selected, event) {
        var action = event.action,
            option = event.option,
            removedValue = event.removedValue;
        var indexes = [];
        var visible;

        var allIndexes = _this2.state.quickColumns.map(function (el, i) {
          return i;
        });

        if (action === "select-option" && option && option.value !== "*") {
          indexes.push(option.idx);
        } else if (action === "select-option" && option && option.value === "*") {
          indexes = allIndexes;
          visible = !option.checked;
        } else if (action === "deselect-option" && option && option.value !== "*") {
          indexes.push(option.idx);
        } else if (action === "deselect-option" && option && option.value == "*") {
          indexes = allIndexes;
          visible = false;
        } else if (action === "remove-value" && removedValue) {
          indexes.push(removedValue.idx);
        } else if (action === "clear") {
          indexes = allIndexes;
          visible = false;
        }

        indexes.forEach(function (idx) {
          return _this2.quickHandleChange(idx, visible);
        });
      };

      var checks = function checks() {
        return _this2.state.quickColumns.map(function (cell, idx) {
          var column = _this2.props.columns[cell.columnId];
          var title = column.title.replace(/<br\s*[\/]?>/gi, " ");
          return /*#__PURE__*/React.createElement("span", {
            key: idx
          }, /*#__PURE__*/React.createElement("input", {
            className: "checkbox-input",
            id: "quick" + idx,
            type: "checkbox",
            checked: cell.visible,
            onChange: function onChange() {
              return _this2.quickHandleChange(idx);
            }
          }), /*#__PURE__*/React.createElement("label", {
            htmlFor: "quick" + idx,
            className: "rowIndex"
          }, title, " "));
        });
      };

      var select = function select() {
        var id = "quick-select-" + _this2.props.page;
        var showAllOption = {
          idx: "-1",
          columnId: "-1",
          value: "*",
          label: be5.messages.showAllColumns,
          checked: _this2.state.quickColumns.find(function (el) {
            return !el.visible;
          }) === undefined //if has false than unchecked

        };
        var options = _this2.state.quickColumns.length > 0 ? [showAllOption] : [];
        var values = [];

        _this2.state.quickColumns.forEach(function (cell, idx) {
          var column = _this2.props.columns[cell.columnId];
          var title = column.title.replace(/<br\s*[\/]?>/gi, " ");
          var option = {
            idx: idx,
            columnId: cell.columnId,
            value: cell.columnId,
            label: title,
            checked: cell.visible
          };
          options.push(option);

          if (cell.visible) {
            values.push(option);
          }
        });

        var selectAttr = {
          id: id,
          ref: id,
          name: id,
          onChange: handleSelect,
          value: values,
          options: options,
          allowSelectAll: true,
          closeMenuOnSelect: false,
          hideSelectedOptions: false,
          isDisabled: false,
          isMulti: true,
          components: {
            Option: Option$1
          },

          /*don't show value in input box*/
          controlShouldRenderValue: false,
          isClearable: false,
          backspaceRemovesValue: false,
          classNamePrefix: 'be5-select'
          /*menuIsOpen: true, uncomment for css debug*/

        };
        return /*#__PURE__*/React.createElement(index, selectAttr);
      };

      var getQuickColumns = function getQuickColumns() {
        if (_this2.props.layout && _this2.props.layout.quickType === "select") {
          return /*#__PURE__*/React.createElement("div", {
            id: "quickColumns",
            className: "d-flex flex-row flex-wrap align-items-center"
          }, /*#__PURE__*/React.createElement("div", null, be5.messages.otherColumns, ":"), /*#__PURE__*/React.createElement("div", {
            className: "Select-outer select-container Select--sm ml-2"
          }, select()));
        } else {
          return /*#__PURE__*/React.createElement("div", {
            id: "quickColumns"
          }, /*#__PURE__*/React.createElement("span", {
            id: "checkbox-container"
          }, be5.messages.otherColumns, ":"), checks());
        }
      };

      return getQuickColumns();
    }
  }, {
    key: "updateDataTableQuickColumns",
    value: function updateDataTableQuickColumns() {
      var table = $('#dataTables' + this.props.meta._ts_);

      if (table.length > 0) {
        var dataTable = table.dataTable();
        var columnsCount = dataTable.fnSettings().aoColumns.length;
        this.state.quickColumns.forEach(function (col) {
          var columnId = col.columnId + 1;

          if (columnId < columnsCount) {
            var dtColumn = dataTable.api().column(columnId);
            if (dtColumn.visible) dtColumn.visible(col.visible);
          }
        });
      }
    }
  }]);

  return QuickColumns;
}(React.Component);

function _typeof$o(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$o = function _typeof(obj) { return typeof obj; }; } else { _typeof$o = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$o(obj); }

function _classCallCheck$n(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$m(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$m(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$m(Constructor.prototype, protoProps); if (staticProps) _defineProperties$m(Constructor, staticProps); return Constructor; }

function _inherits$m(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$m(subClass, superClass); }

function _setPrototypeOf$m(o, p) { _setPrototypeOf$m = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$m(o, p); }

function _createSuper$m(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$m(); return function _createSuperInternal() { var Super = _getPrototypeOf$m(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$m(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$m(this, result); }; }

function _possibleConstructorReturn$m(self, call) { if (call && (_typeof$o(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$n(self); }

function _assertThisInitialized$n(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$m() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$m(o) { _getPrototypeOf$m = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$m(o); }

var TableForm = /*#__PURE__*/function (_React$Component) {
  _inherits$m(TableForm, _React$Component);

  var _super = _createSuper$m(TableForm);

  function TableForm() {
    _classCallCheck$n(this, TableForm);

    return _super.apply(this, arguments);
  }

  _createClass$m(TableForm, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateDocuments();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateDocuments();
    }
  }, {
    key: "updateDocuments",
    value: function updateDocuments() {
      changeDocument("form", {
        value: null
      });
      changeDocument("table", {
        value: this.props.value
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "table-form"
      }, /*#__PURE__*/React.createElement(Document$1, {
        frontendParams: {
          documentName: "table",
          operationDocumentName: "form"
        },
        type: "table"
      }), /*#__PURE__*/React.createElement(HelpInfo, {
        value: this.props.value.data.attributes.layout.helpInfo
      }), /*#__PURE__*/React.createElement(Document$1, {
        frontendParams: {
          documentName: "form",
          parentDocumentName: "table"
        }
      }));
    }
  }]);

  return TableForm;
}(React.Component);

TableForm.propTypes = {
  value: PropTypes.object.isRequired,
  frontendParams: PropTypes.object.isRequired
};
registerDocument('tableForm', TableForm);

function _typeof$p(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$p = function _typeof(obj) { return typeof obj; }; } else { _typeof$p = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$p(obj); }

function _classCallCheck$o(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$n(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$n(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$n(Constructor.prototype, protoProps); if (staticProps) _defineProperties$n(Constructor, staticProps); return Constructor; }

function _inherits$n(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$n(subClass, superClass); }

function _setPrototypeOf$n(o, p) { _setPrototypeOf$n = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$n(o, p); }

function _createSuper$n(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$n(); return function _createSuperInternal() { var Super = _getPrototypeOf$n(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$n(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$n(this, result); }; }

function _possibleConstructorReturn$n(self, call) { if (call && (_typeof$p(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$o(self); }

function _assertThisInitialized$o(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$n() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$n(o) { _getPrototypeOf$n = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$n(o); }

var FormTable = /*#__PURE__*/function (_TableForm) {
  _inherits$n(FormTable, _TableForm);

  var _super = _createSuper$n(FormTable);

  function FormTable() {
    _classCallCheck$o(this, FormTable);

    return _super.apply(this, arguments);
  }

  _createClass$n(FormTable, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "form-table"
      }, /*#__PURE__*/React.createElement(Document$1, {
        frontendParams: {
          documentName: "form",
          parentDocumentName: "table"
        }
      }), /*#__PURE__*/React.createElement(HelpInfo, {
        value: this.props.value.data.attributes.layout.helpInfo
      }), /*#__PURE__*/React.createElement(Document$1, {
        frontendParams: {
          documentName: "table",
          operationDocumentName: "form"
        },
        type: "table"
      }));
    }
  }]);

  return FormTable;
}(TableForm);

FormTable.propTypes = {
  value: PropTypes.object.isRequired,
  frontendParams: PropTypes.object.isRequired
};
registerDocument('formTable', FormTable);

function _typeof$q(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$q = function _typeof(obj) { return typeof obj; }; } else { _typeof$q = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$q(obj); }

function _classCallCheck$p(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$o(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$o(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$o(Constructor.prototype, protoProps); if (staticProps) _defineProperties$o(Constructor, staticProps); return Constructor; }

function _inherits$o(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$o(subClass, superClass); }

function _setPrototypeOf$o(o, p) { _setPrototypeOf$o = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$o(o, p); }

function _createSuper$o(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$o(); return function _createSuperInternal() { var Super = _getPrototypeOf$o(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$o(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$o(this, result); }; }

function _possibleConstructorReturn$o(self, call) { if (call && (_typeof$q(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$p(self); }

function _assertThisInitialized$p(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$o() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$o(o) { _getPrototypeOf$o = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$o(o); }

var TableFormRow = /*#__PURE__*/function (_TableForm) {
  _inherits$o(TableFormRow, _TableForm);

  var _super = _createSuper$o(TableFormRow);

  function TableFormRow() {
    _classCallCheck$p(this, TableFormRow);

    return _super.apply(this, arguments);
  }

  _createClass$o(TableFormRow, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-lg-6"
      }, /*#__PURE__*/React.createElement(Document$1, {
        frontendParams: {
          documentName: "form",
          parentDocumentName: "table"
        }
      })), /*#__PURE__*/React.createElement("div", {
        className: "col-lg-6"
      }, /*#__PURE__*/React.createElement(Document$1, {
        frontendParams: {
          documentName: "table",
          operationDocumentName: "form"
        },
        type: "table"
      })));
    }
  }]);

  return TableFormRow;
}(TableForm);

TableFormRow.propTypes = {
  value: PropTypes.object.isRequired,
  frontendParams: PropTypes.object.isRequired
};
registerDocument('tableFormRow', TableFormRow);

function _typeof$r(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$r = function _typeof(obj) { return typeof obj; }; } else { _typeof$r = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$r(obj); }

function _classCallCheck$q(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$p(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$p(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$p(Constructor.prototype, protoProps); if (staticProps) _defineProperties$p(Constructor, staticProps); return Constructor; }

function _get$2(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get$2 = Reflect.get; } else { _get$2 = function _get(target, property, receiver) { var base = _superPropBase$1(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get$2(target, property, receiver || target); }

function _superPropBase$1(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf$p(object); if (object === null) break; } return object; }

function _inherits$p(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$p(subClass, superClass); }

function _setPrototypeOf$p(o, p) { _setPrototypeOf$p = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$p(o, p); }

function _createSuper$p(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$p(); return function _createSuperInternal() { var Super = _getPrototypeOf$p(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$p(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$p(this, result); }; }

function _possibleConstructorReturn$p(self, call) { if (call && (_typeof$r(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$q(self); }

function _assertThisInitialized$q(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$p() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$p(o) { _getPrototypeOf$p = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$p(o); }

var ModalTable = /*#__PURE__*/function (_Table) {
  _inherits$p(ModalTable, _Table);

  var _super = _createSuper$p(ModalTable);

  function ModalTable() {
    _classCallCheck$q(this, ModalTable);

    return _super.apply(this, arguments);
  }

  _createClass$p(ModalTable, [{
    key: "render",
    value: function render() {
      var attributes = this.props.value.data.attributes;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ModalHeader, {
        tag: "h5",
        toggle: function toggle() {
          return bus.fire("mainModalClose");
        }
      }, attributes.title), /*#__PURE__*/React.createElement(ModalBody, null, _get$2(_getPrototypeOf$p(ModalTable.prototype), "render", this).call(this)), /*#__PURE__*/React.createElement(ModalFooter, null, this._createModalCloseAction()));
    }
  }, {
    key: "_createModalCloseAction",
    value: function _createModalCloseAction() {
      var _this = this;

      var layout = this.props.value.data.attributes.layout;
      var action = layout.cancelAction || new FrontendAction(CLOSE_MAIN_MODAL);
      return /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "btn btn-secondary",
        onClick: function onClick() {
          return executeFrontendActions(action, _this.props.frontendParams);
        }
      }, layout.cancelActionText || be5.messages.close);
    }
  }]);

  return ModalTable;
}(Table);

registerDocument('modalTable', ModalTable);

function _typeof$s(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$s = function _typeof(obj) { return typeof obj; }; } else { _typeof$s = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$s(obj); }

function _classCallCheck$r(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$q(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$q(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$q(Constructor.prototype, protoProps); if (staticProps) _defineProperties$q(Constructor, staticProps); return Constructor; }

function _inherits$q(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$q(subClass, superClass); }

function _setPrototypeOf$q(o, p) { _setPrototypeOf$q = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$q(o, p); }

function _createSuper$q(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$q(); return function _createSuperInternal() { var Super = _getPrototypeOf$q(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$q(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$q(this, result); }; }

function _possibleConstructorReturn$q(self, call) { if (call && (_typeof$s(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$r(self); }

function _assertThisInitialized$r(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$q() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$q(o) { _getPrototypeOf$q = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$q(o); }

var TablePagination = /*#__PURE__*/function (_React$Component) {
  _inherits$q(TablePagination, _React$Component);

  var _super = _createSuper$q(TablePagination);

  function TablePagination(props) {
    var _this;

    _classCallCheck$r(this, TablePagination);

    _this = _super.call(this, props);
    _this.handlePageChange = _this.handlePageChange.bind(_assertThisInitialized$r(_this));
    return _this;
  }

  _createClass$q(TablePagination, [{
    key: "handlePageChange",
    value: function handlePageChange(pageNumber) {
      openTablePage(this.props.value.data.attributes, this.props.frontendParams, pageNumber);
    }
  }, {
    key: "render",
    value: function render() {
      var attr = this.props.value.data.attributes;
      if (attr.totalNumberOfRows <= attr.length && !this.props.showAlways) return null;
      var currentPage = attr.offset / attr.length + 1;
      return /*#__PURE__*/React.createElement(Pagination, {
        prevPageText: be5.messages.table.previousPage,
        nextPageText: be5.messages.table.nextPage,
        firstPageText: be5.messages.table.firstPage,
        lastPageText: be5.messages.table.lastPage,
        activePage: currentPage,
        itemsCountPerPage: attr.length,
        totalItemsCount: attr.totalNumberOfRows,
        onChange: this.handlePageChange,
        innerClass: this.props.innerClass,
        itemClass: "page-item",
        linkClass: "page-link",
        activeLinkClass: ""
      });
    }
  }]);

  return TablePagination;
}(React.Component);

TablePagination.propTypes = {
  value: PropTypes.object.isRequired,
  frontendParams: PropTypes.object.isRequired,
  innerClass: PropTypes.string,
  showAlways: PropTypes.bool
};
TablePagination.defaultProps = {
  showAlways: false
};

var factory = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = plotComponentFactory;

var _react = _interopRequireWildcard(React);

var _propTypes = _interopRequireDefault(PropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// The naming convention is:
//   - events are attached as `'plotly_' + eventName.toLowerCase()`
//   - react props are `'on' + eventName`
var eventNames = ['AfterExport', 'AfterPlot', 'Animated', 'AnimatingFrame', 'AnimationInterrupted', 'AutoSize', 'BeforeExport', 'ButtonClicked', 'Click', 'ClickAnnotation', 'Deselect', 'DoubleClick', 'Framework', 'Hover', 'LegendClick', 'LegendDoubleClick', 'Relayout', 'Relayouting', 'Restyle', 'Redraw', 'Selected', 'Selecting', 'SliderChange', 'SliderEnd', 'SliderStart', 'SunburstClick', 'Transitioning', 'TransitionInterrupted', 'Unhover'];
var updateEvents = ['plotly_restyle', 'plotly_redraw', 'plotly_relayout', 'plotly_relayouting', 'plotly_doubleclick', 'plotly_animated', 'plotly_sunburstclick']; // Check if a window is available since SSR (server-side rendering)
// breaks unnecessarily if you try to use it server-side.

var isBrowser = typeof window !== 'undefined';

function plotComponentFactory(Plotly) {
  var PlotlyComponent = /*#__PURE__*/function (_Component) {
    _inherits(PlotlyComponent, _Component);

    var _super = _createSuper(PlotlyComponent);

    function PlotlyComponent(props) {
      var _this;

      _classCallCheck(this, PlotlyComponent);

      _this = _super.call(this, props);
      _this.p = Promise.resolve();
      _this.resizeHandler = null;
      _this.handlers = {};
      _this.syncWindowResize = _this.syncWindowResize.bind(_assertThisInitialized(_this));
      _this.syncEventHandlers = _this.syncEventHandlers.bind(_assertThisInitialized(_this));
      _this.attachUpdateEvents = _this.attachUpdateEvents.bind(_assertThisInitialized(_this));
      _this.getRef = _this.getRef.bind(_assertThisInitialized(_this));
      _this.handleUpdate = _this.handleUpdate.bind(_assertThisInitialized(_this));
      _this.figureCallback = _this.figureCallback.bind(_assertThisInitialized(_this));
      _this.updatePlotly = _this.updatePlotly.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(PlotlyComponent, [{
      key: "updatePlotly",
      value: function updatePlotly(shouldInvokeResizeHandler, figureCallbackFunction, shouldAttachUpdateEvents) {
        var _this2 = this;

        this.p = this.p.then(function () {
          if (_this2.unmounting) {
            return;
          }

          if (!_this2.el) {
            throw new Error('Missing element reference');
          } // eslint-disable-next-line consistent-return


          return Plotly.react(_this2.el, {
            data: _this2.props.data,
            layout: _this2.props.layout,
            config: _this2.props.config,
            frames: _this2.props.frames
          });
        }).then(function () {
          if (_this2.unmounting) {
            return;
          }

          _this2.syncWindowResize(shouldInvokeResizeHandler);

          _this2.syncEventHandlers();

          _this2.figureCallback(figureCallbackFunction);

          if (shouldAttachUpdateEvents) {
            _this2.attachUpdateEvents();
          }
        })["catch"](function (err) {
          if (_this2.props.onError) {
            _this2.props.onError(err);
          }
        });
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.unmounting = false;
        this.updatePlotly(true, this.props.onInitialized, true);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        this.unmounting = false; // frames *always* changes identity so fall back to check length only :(

        var numPrevFrames = prevProps.frames && prevProps.frames.length ? prevProps.frames.length : 0;
        var numNextFrames = this.props.frames && this.props.frames.length ? this.props.frames.length : 0;
        var figureChanged = !(prevProps.layout === this.props.layout && prevProps.data === this.props.data && prevProps.config === this.props.config && numNextFrames === numPrevFrames);
        var revisionDefined = prevProps.revision !== void 0;
        var revisionChanged = prevProps.revision !== this.props.revision;

        if (!figureChanged && (!revisionDefined || revisionDefined && !revisionChanged)) {
          return;
        }

        this.updatePlotly(false, this.props.onUpdate, false);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.unmounting = true;
        this.figureCallback(this.props.onPurge);

        if (this.resizeHandler && isBrowser) {
          window.removeEventListener('resize', this.resizeHandler);
          this.resizeHandler = null;
        }

        this.removeUpdateEvents();
        Plotly.purge(this.el);
      }
    }, {
      key: "attachUpdateEvents",
      value: function attachUpdateEvents() {
        var _this3 = this;

        if (!this.el || !this.el.removeListener) {
          return;
        }

        updateEvents.forEach(function (updateEvent) {
          _this3.el.on(updateEvent, _this3.handleUpdate);
        });
      }
    }, {
      key: "removeUpdateEvents",
      value: function removeUpdateEvents() {
        var _this4 = this;

        if (!this.el || !this.el.removeListener) {
          return;
        }

        updateEvents.forEach(function (updateEvent) {
          _this4.el.removeListener(updateEvent, _this4.handleUpdate);
        });
      }
    }, {
      key: "handleUpdate",
      value: function handleUpdate() {
        this.figureCallback(this.props.onUpdate);
      }
    }, {
      key: "figureCallback",
      value: function figureCallback(callback) {
        if (typeof callback === 'function') {
          var _this$el = this.el,
              data = _this$el.data,
              layout = _this$el.layout;
          var frames = this.el._transitionData ? this.el._transitionData._frames : null;
          var figure = {
            data: data,
            layout: layout,
            frames: frames
          };
          callback(figure, this.el);
        }
      }
    }, {
      key: "syncWindowResize",
      value: function syncWindowResize(invoke) {
        var _this5 = this;

        if (!isBrowser) {
          return;
        }

        if (this.props.useResizeHandler && !this.resizeHandler) {
          this.resizeHandler = function () {
            return Plotly.Plots.resize(_this5.el);
          };

          window.addEventListener('resize', this.resizeHandler);

          if (invoke) {
            this.resizeHandler();
          }
        } else if (!this.props.useResizeHandler && this.resizeHandler) {
          window.removeEventListener('resize', this.resizeHandler);
          this.resizeHandler = null;
        }
      }
    }, {
      key: "getRef",
      value: function getRef(el) {
        this.el = el;

        if (this.props.debug && isBrowser) {
          window.gd = this.el;
        }
      } // Attach and remove event handlers as they're added or removed from props:

    }, {
      key: "syncEventHandlers",
      value: function syncEventHandlers() {
        var _this6 = this;

        eventNames.forEach(function (eventName) {
          var prop = _this6.props['on' + eventName];
          var handler = _this6.handlers[eventName];
          var hasHandler = Boolean(handler);

          if (prop && !hasHandler) {
            _this6.addEventHandler(eventName, prop);
          } else if (!prop && hasHandler) {
            // Needs to be removed:
            _this6.removeEventHandler(eventName);
          } else if (prop && hasHandler && prop !== handler) {
            // replace the handler
            _this6.removeEventHandler(eventName);

            _this6.addEventHandler(eventName, prop);
          }
        });
      }
    }, {
      key: "addEventHandler",
      value: function addEventHandler(eventName, prop) {
        this.handlers[eventName] = prop;
        this.el.on(this.getPlotlyEventName(eventName), this.handlers[eventName]);
      }
    }, {
      key: "removeEventHandler",
      value: function removeEventHandler(eventName) {
        this.el.removeListener(this.getPlotlyEventName(eventName), this.handlers[eventName]);
        delete this.handlers[eventName];
      }
    }, {
      key: "getPlotlyEventName",
      value: function getPlotlyEventName(eventName) {
        return 'plotly_' + eventName.toLowerCase();
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/_react["default"].createElement("div", {
          id: this.props.divId,
          style: this.props.style,
          ref: this.getRef,
          className: this.props.className
        });
      }
    }]);

    return PlotlyComponent;
  }(_react.Component);

  PlotlyComponent.propTypes = {
    data: _propTypes["default"].arrayOf(_propTypes["default"].object),
    config: _propTypes["default"].object,
    layout: _propTypes["default"].object,
    frames: _propTypes["default"].arrayOf(_propTypes["default"].object),
    revision: _propTypes["default"].number,
    onInitialized: _propTypes["default"].func,
    onPurge: _propTypes["default"].func,
    onError: _propTypes["default"].func,
    onUpdate: _propTypes["default"].func,
    debug: _propTypes["default"].bool,
    style: _propTypes["default"].object,
    className: _propTypes["default"].string,
    useResizeHandler: _propTypes["default"].bool,
    divId: _propTypes["default"].string
  };
  eventNames.forEach(function (eventName) {
    PlotlyComponent.propTypes['on' + eventName] = _propTypes["default"].func;
  });
  PlotlyComponent.defaultProps = {
    debug: false,
    useResizeHandler: false,
    data: [],
    style: {
      position: 'relative',
      display: 'inline-block'
    }
  };
  return PlotlyComponent;
}

});

var createPlotlyComponent = /*@__PURE__*/getDefaultExportFromCjs(factory);

function _typeof$t(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$t = function _typeof(obj) { return typeof obj; }; } else { _typeof$t = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$t(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck$s(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$r(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$r(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$r(Constructor.prototype, protoProps); if (staticProps) _defineProperties$r(Constructor, staticProps); return Constructor; }

function _inherits$r(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$r(subClass, superClass); }

function _setPrototypeOf$r(o, p) { _setPrototypeOf$r = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$r(o, p); }

function _createSuper$r(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$r(); return function _createSuperInternal() { var Super = _getPrototypeOf$r(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$r(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$r(this, result); }; }

function _possibleConstructorReturn$r(self, call) { if (call && (_typeof$t(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$s(self); }

function _assertThisInitialized$s(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$r() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$r(o) { _getPrototypeOf$r = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$r(o); }
var Plot = createPlotlyComponent(Plotly);
/**
 *  The plotlyjs library is used for ploting charts
 *
 * @see https://plotly.com/javascript/ for detailed
 *
 * CreatePlotlyComponent and plotly.js-basic-dist-min are used because plotly.js library is too big.
 * @see https://github.com/plotly/plotly.js/tree/master/dist about plotly dist
 **/

var Chart = /*#__PURE__*/function (_React$Component) {
  _inherits$r(Chart, _React$Component);

  var _super = _createSuper$r(Chart);

  function Chart(props) {
    var _this;

    _classCallCheck$s(this, Chart);

    _this = _super.call(this, props);
    _this.state = {
      data: [],
      layout: {},
      frames: [],
      config: {}
    };
    _this.storeChartState = _this.storeChartState.bind(_assertThisInitialized$s(_this));
    return _this;
  }

  _createClass$r(Chart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.storeChartState(this.props);
    }
  }, {
    key: "storeChartState",
    value: function storeChartState(props) {
      var _props$value$data$att = props.value.data.attributes.layout,
          xData = _props$value$data$att.xData,
          yData = _props$value$data$att.yData;

      if (!xData || !yData) {
        return;
      }

      var _props$value$data$att2 = props.value.data.attributes,
          columns = _props$value$data$att2.columns,
          rows = _props$value$data$att2.rows,
          page = _props$value$data$att2.page;
      var columnNames = columns.map(function (column) {
        return column.name;
      });
      var columnTitles = columns.map(function (column) {
        return column.title;
      });
      var xIdx = columnNames.indexOf(xData);

      if (xIdx === -1) {
        return;
      }

      var yIdxs = yData.split(",").filter(function (column) {
        return columnNames.includes(column);
      }).map(function (column) {
        return columnNames.indexOf(column);
      });

      if (yIdxs.length === 0) {
        return;
      }

      var values = rows.map(function (row) {
        return row.cells.map(function (cell) {
          return cell.content;
        });
      });
      var xVals = values.map(function (array) {
        return array[xIdx];
      });
      var data = [];
      yIdxs.forEach(function (idx) {
        var lineData = {
          x: xVals,
          y: values.map(function (array) {
            return array[idx];
          }),
          type: 'scatter',
          name: columnTitles[idx],
          mode: 'lines',
          hoverlabel: {
            namelength: -1
          },
          line: {
            shape: 'spline',
            width: '2',
            smoothing: 1.3
          }
        };

        if (rows && rows.length > 0 && rows[0].cells.length - 1 >= idx && rows[0].cells[idx].options.chart) {
          //copy column attributes
          var chartAttr = rows[0].cells[idx].options.chart;

          for (var _i = 0, _Object$entries = Object.entries(chartAttr); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                key = _Object$entries$_i[0],
                value = _Object$entries$_i[1];

            if (value.startsWith('{') && value.endsWith('}')) {
              (function () {
                var tmpValue = value.substring(1, value.length - 1);
                var obj = {};
                tmpValue.split(';').forEach(function (array) {
                  var entry = array.split(":");

                  if (entry.length === 2) {
                    obj[entry[0]] = entry[1];
                  }
                });
                chartAttr[key] = obj;
              })();
            }
          }

          lineData = Object.assign({}, lineData, chartAttr);
        }

        data.push(lineData);
      });
      var layout = {
        title: page,
        xaxis: {
          title: columnTitles[xIdx]
        },
        // yaxis: {title: "", rangemode: 'tozero'},
        width: 1050,
        height: 675,
        showlegend: true
      };
      this.setState(function (state) {
        return {
          data: data,
          layout: layout
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React.createElement(Plot, {
        data: this.state.data,
        layout: this.state.layout,
        frames: this.state.frames,
        config: this.state.config,
        onInitialized: function onInitialized(figure) {
          return _this2.setState(figure);
        },
        onUpdate: function onUpdate(figure) {
          return _this2.setState(figure);
        }
      });
    }
  }]);

  return Chart;
}(React.Component);

Chart.propTypes = {
  value: PropTypes.object.isRequired
};
registerDocument("chart", Chart);

function _typeof$u(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$u = function _typeof(obj) { return typeof obj; }; } else { _typeof$u = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$u(obj); }

function _classCallCheck$t(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$s(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$s(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$s(Constructor.prototype, protoProps); if (staticProps) _defineProperties$s(Constructor, staticProps); return Constructor; }

function _inherits$s(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$s(subClass, superClass); }

function _setPrototypeOf$s(o, p) { _setPrototypeOf$s = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$s(o, p); }

function _createSuper$s(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$s(); return function _createSuperInternal() { var Super = _getPrototypeOf$s(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$s(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$s(this, result); }; }

function _possibleConstructorReturn$s(self, call) { if (call && (_typeof$u(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$t(self); }

function _assertThisInitialized$t(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$s() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$s(o) { _getPrototypeOf$s = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$s(o); }

var route = function route(frontendParams, page) {
  changeDocument(frontendParams.documentName, {});
};

var Loading = /*#__PURE__*/function (_React$Component) {
  _inherits$s(Loading, _React$Component);

  var _super = _createSuper$s(Loading);

  function Loading() {
    _classCallCheck$t(this, Loading);

    return _super.apply(this, arguments);
  }

  _createClass$s(Loading, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "document-loader"
      });
    }
  }]);

  return Loading;
}(React.Component);

registerRoute("loading", route);

function _defineProperty$8(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var route$1 = function route(frontendParams, entity, query, operation, contextParams) {
  var _operationInfo;

  var operationInfo = (_operationInfo = {}, _defineProperty$8(_operationInfo, ENTITY_NAME_PARAM, entity), _defineProperty$8(_operationInfo, QUERY_NAME_PARAM, query || 'All records'), _defineProperty$8(_operationInfo, OPERATION_NAME_PARAM, operation), _defineProperty$8(_operationInfo, CONTEXT_PARAMS, JSON.stringify(contextParams || {})), _operationInfo);
  loadForm(operationInfo, frontendParams);
};

registerRoute("form", route$1);

var route$2 = function route() {
  openOperationByUrl('form/users/All records/Login', {
    documentName: MAIN_MODAL_DOCUMENT
  });
};

registerRoute("login", route$2);

var route$3 = function route() {
  openOperationByUrl('form/users/All records/Logout', {
    documentName: MAIN_DOCUMENT
  });
};

registerRoute("logout", route$3);

var route$4 = function route(frontendParams, page) {
  var requestParams = {
    _ts_: new Date().getTime()
  };
  be5.net.request('static/' + page, requestParams, function (json) {
    if (frontendParams.documentName === MAIN_DOCUMENT) be5.ui.setTitle(json.data.attributes.title);
    changeDocument(frontendParams.documentName, {
      value: json
    });
  }, function (error) {
    changeDocument(frontendParams.documentName, {
      value: error
    });
  });
};

registerRoute("static", route$4);

function _defineProperty$9(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var route$5 = function route(frontendParams, entity, query, params) {
  var _paramsObject;

  var paramsObject = (_paramsObject = {}, _defineProperty$9(_paramsObject, ENTITY_NAME_PARAM, entity), _defineProperty$9(_paramsObject, QUERY_NAME_PARAM, query || 'All records'), _defineProperty$9(_paramsObject, CONTEXT_PARAMS, params || {}), _paramsObject);
  loadTable(paramsObject, frontendParams);
};

registerRoute("table", route$5);

var BeSqlHighlightRules;
var BeSqlMode;
var brace = false;

try {
  require('brace');

  require('brace/mode/sql');

  brace = true;
} catch (e) {
  console.log('AceEditor (brace) is not available, skip init BeSqlHighlightRules');
}

if (brace) {
  var oop = window.ace.acequire("ace/lib/oop");
  var TextHighlightRules = window.ace.acequire("ace/mode/text_highlight_rules").TextHighlightRules;

  BeSqlHighlightRules = function BeSqlHighlightRules() {
    var keywords = "select|insert|update|delete|from|where|and|or|group|by|order|limit|offset|having|as|case|" + "when|else|end|type|left|right|join|on|outer|desc|asc|union|create|table|primary|key|if|" + "foreign|not|references|default|null|inner|cross|natural|database|drop|grant";
    var builtinConstants = "true|false";
    var builtinFunctions = "avg|count|first|last|max|min|sum|ucase|lcase|mid|len|round|rank|now|format|" + "coalesce|ifnull|isnull|nvl|" + beSqlFunctions;
    var dataTypes = "int|numeric|decimal|date|varchar|char|bigint|float|double|bit|binary|text|set|timestamp|" + "money|real|number|integer";
    var keywordMapper = this.createKeywordMapper({
      "support.function": builtinFunctions,
      "keyword": keywords,
      "constant.language": builtinConstants,
      "storage.type": dataTypes
    }, "identifier", true);
    this.$rules = {
      "start": [{
        token: "comment",
        regex: "--.*$"
      }, {
        token: "comment",
        start: "/\\*",
        end: "\\*/"
      }, {
        token: "string",
        // " string
        regex: '".*?"'
      }, {
        token: "string",
        // ' string
        regex: "'.*?'"
      }, {
        token: "string",
        // ` string (apache drill)
        regex: "`.*?`"
      }, {
        token: "constant.numeric",
        // float
        regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
      }, {
        token: keywordMapper,
        regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
      }, {
        token: "keyword.operator",
        regex: "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
      }, {
        token: "paren.lparen",
        regex: "[\\(]"
      }, {
        token: "paren.rparen",
        regex: "[\\)]"
      }, {
        token: "text",
        regex: "\\s+"
      }]
    };
  };

  oop.inherits(BeSqlHighlightRules, TextHighlightRules);
  var Mode = window.ace.acequire("ace/mode/sql").Mode;

  BeSqlMode = function BeSqlMode() {
    this.HighlightRules = BeSqlHighlightRules;
  };

  oop.inherits(BeSqlMode, Mode);
}

var beSqlFunctions = '';
var tableNames = [];
var BeSqlMode$1 = BeSqlMode;
var initBeSqlEditor = function initBeSqlEditor(callback) {
  if (beSqlFunctions === '') {
    be5.net.request('queryBuilder/editor', null, function (json) {
      beSqlFunctions = json.data.attributes.functions.map(function (x) {
        return x.toUpperCase();
      }).join('|');
      tableNames = json.data.attributes.tableNames;
      callback();
    });
  } else {
    callback();
  }
};
var upperCaseKeyWordCompleter = {
  getCompletions: function getCompletions(editor, session, pos, prefix, callback) {
    if (session.$mode.completer) {
      return session.$mode.completer.getCompletions(editor, session, pos, prefix, callback);
    }

    var state = editor.session.getState(pos.row);
    var keywordCompletions;

    if (prefix === prefix.toUpperCase()) {
      keywordCompletions = session.$mode.getCompletions(state, session, pos, prefix);
      keywordCompletions = keywordCompletions.map(function (obj) {
        var copy = obj;
        copy.value = obj.value.toUpperCase();
        copy.score = obj.score + 10;
        return copy;
      });
    } else {
      keywordCompletions = session.$mode.getCompletions(state, session, pos, prefix);
    }

    return callback(null, keywordCompletions);
  }
};
var tableNamesCompleter = {
  getCompletions: function getCompletions(editor, session, pos, prefix, callback) {
    var keywordCompletions = [];

    for (var i in tableNames) {
      keywordCompletions.push({
        value: tableNames[i],
        score: 9,
        meta: "table"
      });
    }

    return callback(null, keywordCompletions);
  }
};

function _defineProperty$a(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var route$6 = function route(frontendParams, params) {
  var _requestParams;

  var requestParams = (_requestParams = {}, _defineProperty$a(_requestParams, CONTEXT_PARAMS, be5.net.paramString(params)), _defineProperty$a(_requestParams, TIMESTAMP_PARAM, new Date().getTime()), _requestParams);
  initBeSqlEditor(function () {
    be5.net.request('queryBuilder', requestParams, function (data) {
      if (frontendParams.documentName === MAIN_DOCUMENT) be5.ui.setTitle("Query Builder");
      changeDocument(frontendParams.documentName, {
        value: Object.assign({}, data, {
          params: be5.net.paramString(params)
        })
      });
    });
  });
};

registerRoute("queryBuilder", route$6);

var route$7 = function route(frontendParams, text) {
  if (frontendParams.documentName === MAIN_DOCUMENT) be5.ui.setTitle();
  var data = createStaticValue(undefined, text, {
    self: "text/" + text
  });
  changeDocument(frontendParams.documentName, {
    value: data
  });
};

registerRoute("text", route$7);

function _defineProperty$b(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var route$8 = function route(frontendParams, entity) {
  var requestParams = _defineProperty$b({}, ENTITY_NAME_PARAM, entity);

  be5.net.request('categories/forest/', requestParams, function (data) {
    changeDocument(frontendParams.documentName, {
      value: createStaticValue('', "<pre>" + JSON.stringify(data, null, 4) + "</pre>")
    });
  });
};

registerRoute("categories", route$8);

function _typeof$v(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$v = function _typeof(obj) { return typeof obj; }; } else { _typeof$v = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$v(obj); }

function _defineProperty$c(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck$u(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$t(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$t(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$t(Constructor.prototype, protoProps); if (staticProps) _defineProperties$t(Constructor, staticProps); return Constructor; }

function _inherits$t(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$t(subClass, superClass); }

function _setPrototypeOf$t(o, p) { _setPrototypeOf$t = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$t(o, p); }

function _createSuper$t(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$t(); return function _createSuperInternal() { var Super = _getPrototypeOf$t(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$t(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$t(this, result); }; }

function _possibleConstructorReturn$t(self, call) { if (call && (_typeof$v(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$u(self); }

function _assertThisInitialized$u(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$t() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$t(o) { _getPrototypeOf$t = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$t(o); }
var AceEditor;

try {
  require('brace/mode/sql');

  require('brace/theme/xcode');

  require('brace/ext/language_tools');

  AceEditor = require("react-ace")["default"];
} catch (e) {
  console.log('AceEditor (brace) is not available, use textarea');
}

var QueryBuilder = /*#__PURE__*/function (_React$Component) {
  _inherits$t(QueryBuilder, _React$Component);

  var _super = _createSuper$t(QueryBuilder);

  function QueryBuilder(props) {
    var _this;

    _classCallCheck$u(this, QueryBuilder);

    _this = _super.call(this, props);
    _this.state = {
      sql: _this.props.value.data.attributes.sql,
      value: _this.props.value
    };
    _this.updateCode = _this.updateCode.bind(_assertThisInitialized$u(_this));
    _this.submit = _this.submit.bind(_assertThisInitialized$u(_this));
    _this.setSqlFromHistory = _this.setSqlFromHistory.bind(_assertThisInitialized$u(_this));
    return _this;
  }

  _createClass$t(QueryBuilder, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initBeSqlMode();
      this.update(this.props.value);
    }
  }, {
    key: "initBeSqlMode",
    value: function initBeSqlMode() {
      if (AceEditor !== undefined) {
        var beSqlMode = new BeSqlMode$1();
        this.refs.aceEditor.editor.getSession().setMode(beSqlMode);
        var langTools = window.ace.acequire('ace/ext/language_tools');
        langTools.addCompleter(upperCaseKeyWordCompleter);
        langTools.addCompleter(tableNamesCompleter);
      }
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      this.update(nextProps.value);
    }
  }, {
    key: "updateCode",
    value: function updateCode(newSql) {
      this.setState({
        sql: newSql
      });
    }
  }, {
    key: "submit",
    value: function submit() {
      var _requestParams,
          _this2 = this;

      var requestParams = (_requestParams = {
        sql: this.state.sql,
        updateWithoutBeSql: this.state.updateWithoutBeSql
      }, _defineProperty$c(_requestParams, CONTEXT_PARAMS, this.props.value.params), _defineProperty$c(_requestParams, TIMESTAMP_PARAM, new Date().getTime()), _requestParams);
      be5.net.request('queryBuilder', requestParams, function (json) {
        _this2.update(json);
      });
    }
  }, {
    key: "update",
    value: function update(json) {
      this.setState({
        value: json
      });
    }
  }, {
    key: "setSqlFromHistory",
    value: function setSqlFromHistory(event) {
      this.setState({
        sql: event.target.value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          value = _this$state.value,
          sql = _this$state.sql;
      return /*#__PURE__*/React.createElement("div", {
        className: "queryBuilder"
      }, /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-md-6"
      }, /*#__PURE__*/React.createElement("h1", null, "Query Builder"), /*#__PURE__*/React.createElement("div", {
        className: "form-group form-check"
      }, /*#__PURE__*/React.createElement("input", {
        type: "checkbox",
        className: "form-check-input",
        id: "updateWithoutBeSql",
        onChange: function onChange() {
          _this3.setState({
            updateWithoutBeSql: !_this3.state.updateWithoutBeSql
          });
        },
        checked: this.state.updateWithoutBeSql === true
      }), /*#__PURE__*/React.createElement("label", {
        className: "form-check-label",
        htmlFor: "updateWithoutBeSql"
      }, "raw sql"))), /*#__PURE__*/React.createElement("div", {
        className: "col-md-6"
      }, /*#__PURE__*/React.createElement("select", {
        multiple: true,
        style: {
          width: '100%'
        },
        onClick: this.setSqlFromHistory
      }, value.data.attributes.history.slice().reverse().map(function (value, i) {
        return /*#__PURE__*/React.createElement("option", {
          value: value,
          key: i
        }, value);
      })), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null))), /*#__PURE__*/React.createElement(SplitPane, {
        split: "horizontal",
        defaultSize: 300
      }, this.getEditor(sql), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        className: "btn btn-primary btn-sm mt-2 mb-2",
        onClick: this.submit,
        title: "Alt-Enter - submit, Ctrl + space - auto completion"
      }, "Submit"), /*#__PURE__*/React.createElement(QueryBuilderOutput, {
        value: value,
        finalSql: this.state.value.data.attributes.finalSql
      }))));
    }
  }, {
    key: "getEditor",
    value: function getEditor(sql) {
      var _this4 = this;

      if (AceEditor === undefined) {
        return /*#__PURE__*/React.createElement("textarea", {
          rows: 10,
          onChange: function onChange(e) {
            return _this4.updateCode(e.target.value);
          },
          value: sql,
          style: {
            width: '100%'
          }
        });
      }

      return /*#__PURE__*/React.createElement(AceEditor, {
        ref: "aceEditor",
        value: sql,
        mode: "sql",
        theme: "xcode",
        fontSize: 13,
        onChange: this.updateCode,
        name: "queryBuilder_editor",
        width: "100%",
        height: "100%",
        showPrintMargin: true,
        showGutter: true,
        highlightActiveLine: true,
        editorProps: {
          $blockScrolling: Infinity
        },
        setOptions: {
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2
        },
        commands: [{
          name: 'Submit',
          bindKey: {
            win: 'Alt-Enter',
            mac: 'Command-Enter'
          },
          exec: this.submit
        }]
      });
    }
  }]);

  return QueryBuilder;
}(React.Component);

var QueryBuilderOutput = /*#__PURE__*/function (_React$Component2) {
  _inherits$t(QueryBuilderOutput, _React$Component2);

  var _super2 = _createSuper$t(QueryBuilderOutput);

  function QueryBuilderOutput() {
    _classCallCheck$u(this, QueryBuilderOutput);

    return _super2.apply(this, arguments);
  }

  _createClass$t(QueryBuilderOutput, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.value.meta._ts_ > this.props.value.meta._ts_;
    }
  }, {
    key: "render",
    value: function render() {
      var value = this.props.value;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Document$1, {
        value: getModelByID(value.included, value.meta, "result"),
        frontendParams: {
          documentName: "queryBuilder-result"
        }
      }), /*#__PURE__*/React.createElement("div", null, value.data.attributes.finalSql), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(ErrorPane, {
        value: value
      }));
    }
  }]);

  return QueryBuilderOutput;
}(React.Component);

registerDocument("queryBuilder", QueryBuilder);

var UiPanel = function UiPanel(props) {
  be5.ui.setTitle(props.value.data.attributes.title);
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var ARGUMENT_NAMES = /([^\s,]+)/g;

  function getParamNamesString(func) {
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null) return [];
    return result;
  }

  function getParamNames(func) {
    var arr = getParamNamesString(func);
    return arr.map(function (name, i) {
      if (i === 0) {
        return /*#__PURE__*/React.createElement("span", {
          key: name
        }, name);
      } else {
        return /*#__PURE__*/React.createElement("span", {
          key: name
        }, ", ", name);
      }
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    className: classNames$1('ui-panel row')
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-12"
  }, /*#__PURE__*/React.createElement("h1", null, "Core")), /*#__PURE__*/React.createElement("div", {
    className: "col-md-4"
  }, /*#__PURE__*/React.createElement("h3", null, "documents"), getAllDocumentTypes().sort().map(function (name) {
    //let doc = getDocument(name);
    //console.log('document', doc.name, doc);
    return /*#__PURE__*/React.createElement("div", {
      key: "documents-" + name
    }, /*#__PURE__*/React.createElement("span", {
      className: "badge badge-primary"
    }, name), " - ", getDocument(name).name);
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-md-8"
  }, /*#__PURE__*/React.createElement("h3", null, "routes"), getAllRoutes().sort().map(function (name) {
    //let route = getRoute(name);
    //console.log('route', route.name, route);
    return /*#__PURE__*/React.createElement("div", {
      key: "documents-" + name
    }, /*#__PURE__*/React.createElement("span", {
      className: "badge badge-primary"
    }, name), "(", getParamNames(getRoute(name)), ")");
  })));
};

registerPage("uiPanel", UiPanel, function (frontendParams) {
  changeDocument(frontendParams.documentName, createPageValue("uiPanel", {
    attributes: {
      title: "UI panel"
    }
  }));
});

var SystemCard = function SystemCard(props) {
  var title = props.value.title;
  be5.ui.setTitle(title);
  var steps = [{
    title: 'Cache',
    url: '#!table/_system_/Cache'
  }, {
    title: 'Session',
    url: '#!table/_system_/Session variables'
  }, {
    title: 'System Settings',
    url: '#!table/systemSettings/All%20records'
  }, {
    title: 'Daemons',
    url: '#!table/_system_/Daemons'
  }, {
    title: 'DataSource',
    url: '#!table/_system_/DataSource'
  }, {
    title: 'Http Headers',
    url: '#!table/_system_/Http Headers'
  }, {
    title: 'Properties',
    url: '#!table/_system_/System properties'
  }, {
    title: 'Threads',
    url: '#!table/_system_/Threads'
  }, {
    title: 'UI panel',
    url: '#!uiPanel'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      marginBottom: 13 + 'px'
    }
  }, title), /*#__PURE__*/React.createElement(Navs, {
    steps: steps,
    tabs: true,
    onOpenNav: function onOpenNav(id) {
      return setDocumentState("#!systemCard", id);
    },
    startAtStep: getDocumentState("#!systemCard") || 0
  }));
};

registerDocument('SystemCard', SystemCard);
registerRoute('systemCard', function (frontendParams) {
  changeDocument(frontendParams.documentName, {
    value: {
      title: "System card"
    },
    frontendParams: {
      type: 'SystemCard'
    }
  });
});

function _typeof$w(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$w = function _typeof(obj) { return typeof obj; }; } else { _typeof$w = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$w(obj); }

function _defineProperty$d(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck$v(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$u(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$u(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$u(Constructor.prototype, protoProps); if (staticProps) _defineProperties$u(Constructor, staticProps); return Constructor; }

function _inherits$u(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$u(subClass, superClass); }

function _setPrototypeOf$u(o, p) { _setPrototypeOf$u = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$u(o, p); }

function _createSuper$u(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$u(); return function _createSuperInternal() { var Super = _getPrototypeOf$u(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$u(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$u(this, result); }; }

function _possibleConstructorReturn$u(self, call) { if (call && (_typeof$w(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$v(self); }

function _assertThisInitialized$v(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$u() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$u(o) { _getPrototypeOf$u = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$u(o); }
/**
 * https://datatables.net/
 * https://habr.com/ru/post/330656/
 * https://medium.com/@zbzzn/integrating-react-and-datatables-not-as-hard-as-advertised-f3364f395dfa
 */

var DataTablesWrapper = /*#__PURE__*/function (_Component) {
  _inherits$u(DataTablesWrapper, _Component);

  var _super = _createSuper$u(DataTablesWrapper);

  function DataTablesWrapper(props) {
    _classCallCheck$v(this, DataTablesWrapper);

    return _super.call(this, props);
  }

  _createClass$u(DataTablesWrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.applyTable(this.props, this.refs.main);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.value.meta._ts_ > this.props.value.meta._ts_) {
        $("#" + getTableId(this.props)).DataTable().destroy(true);
        $(this.refs.main).empty();
        this.applyTable(nextProps, this.refs.main);
      }

      return false;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      $("#" + getTableId(this.props)).DataTable().destroy(true);
    }
  }, {
    key: "applyTable",
    value: function applyTable(props, node) {
      if (!hasRows(props.value.data.attributes)) return;
      var tableTag = $('<table id="' + getTableId(props) + '" ' + 'class="table table-striped table-striped-light table-bordered display table-sm" cellspacing="0"/>');
      tableTag.appendTo(node);
      tableTag.dataTable(this.getTableConfiguration(props));
      $('.dataTables_length select').removeClass('form-control-sm');
      tableTag.on("click", '.edit-operation-btn', function (e) {
        if (!e.ctrlKey) {
          e.preventDefault();
          props.onOperationClick(DataTablesWrapper.getEditOperation(props), $(this).data("val"));
        }
      });
      tableTag.on("click", 'th.default_order', function (e) {
        e.preventDefault();
        $("#" + getTableId(props)).DataTable().order([]).draw();
      });
      addUrlHandlers(tableTag, props.frontendParams.documentName);
      tableTag.on('draw.dt', function () {
        props.setSelectedRows([]);
      }); // $('#rowCheckboxAll').click(function (e) {
      //   e.stopPropagation();
      //
      //   if (!$('#rowCheckboxAll').prop('checked')) {
      //     $('.rowCheckbox').prop('checked', false);
      //     be5.tableState.selectedRows = [];
      //   }else{
      //     $('.rowCheckbox').prop('checked', true);
      //
      //     for(let i=0; i< attributes.rows.length; i++){
      //       be5.tableState.selectedRows.push(attributes.rows[i].id);
      //     }
      //   }
      // });

      bus.fire("updateDataTableQuickColumns");
    }
  }, {
    key: "getTableConfiguration",
    value: function getTableConfiguration(props) {
      var _this = this;

      var attributes = props.value.data.attributes;
      var hasCheckBoxes = attributes.selectable;
      var editOperation = DataTablesWrapper.getEditOperation(props);
      var lengths = [5, 10, 20, 50, 100, 500, 1000];
      var pageLength = attributes.length;
      var tableDom = 'r <"table-responsive-md"t> <"dataTables-nav clearfix"pli>';

      if (lengths.indexOf(pageLength) === -1) {
        if (pageLength < 5) {
          tableDom = tableDom.replace("pli", "pi");
        } else {
          lengths.push(pageLength);
          lengths.sort(function (a, b) {
            return a - b;
          });
        }
      }

      var lengthsTitles = lengths.map(function (x) {
        return x + ' ' + be5.locale.msg('entries');
      });
      lengths = [lengths, lengthsTitles];
      var language = {};

      if (be5.locale.value !== 'en') {
        language = be5.messages.dataTables || {};
      }

      language.lengthMenu = "_MENU_";
      var tableConfiguration = {
        data: this.getData(props),
        columns: this.getColumns(props),
        dom: tableDom,
        processing: true,
        serverSide: true,
        language: language,
        searching: false,
        autoWidth: false,
        aaSorting: [],
        displayStart: attributes.offset,
        order: attributes.orderColumn >= 0 ? [[attributes.orderColumn, attributes.orderDir]] : undefined,
        ajax: function ajax(data, callback, settings) {
          var _requestParams;

          clearTableFilter(attributes.category, attributes.page, attributes.parameters);
          var params = initFilterParams(attributes.parameters);
          params._offset_ = data.start;
          params._limit_ = data.length;

          if (data.order && data.order.length > 0) {
            params._orderColumn_ = data.order[0].column;
            params._orderDir_ = data.order[0].dir;
          }

          var requestParams = (_requestParams = {}, _defineProperty$d(_requestParams, ENTITY_NAME_PARAM, attributes.category), _defineProperty$d(_requestParams, QUERY_NAME_PARAM, attributes.page), _defineProperty$d(_requestParams, CONTEXT_PARAMS, params), _requestParams);
          updateTable(requestParams, function (jsonApiModel) {
            var json = jsonApiModel.data.attributes;

            if (json.type === "error") {
              be5.log.error(json.value.code + "\n" + json.value.message);
            } else {
              for (var i = 0; i < json.data.length; i++) {
                for (var j = 0; j < json.data[0].length; j++) {
                  json.data[i][j] = jQueryFormatCell(json.data[i][j].content, json.data[i][j].options);
                }
              }
            } // call react callback - update table and filter operations
            // $.get('myUrl', function(newDataArray) {
            //   datatable.clear();
            //   datatable.rows.add(newDataArray);
            //   datatable.draw();
            // });


            return callback(json);
          });
        },
        lengthMenu: lengths,
        pageLength: pageLength,
        // This both tells
        // that the first bunch of data is already loaded (so no request is required), and
        // which is the total length of the result.
        // See https://datatables.net/reference/option/deferLoading
        deferLoading: attributes.totalNumberOfRows,
        columnDefs: [{
          render: function render(data, type, row, meta) {
            var val = row[0];
            if (val === 'aggregate') return '';
            var id = "row-" + val + "-checkbox";
            var dataTable = $("#" + getTableId(props)).DataTable();
            var display = (dataTable.page.info() ? dataTable.page.info().start : 0) + meta.row + 1;

            if (!hasCheckBoxes) {
              return display;
            }

            var params = Object.assign({}, attributes.parameters, {
              _selectedRows_: val
            });
            var url = be5.url.create(['form', attributes.category, attributes.page, 'Edit'], params);

            if (editOperation !== undefined) {
              display = '<a href="#!' + url + '" data-val="' + val + '" class="edit-operation-btn">' + display + '</a>';
            }

            return ('<input id="{id}" type="checkbox" class="rowCheckbox"/> ' + '<label for="{id}" class="rowIndex">{val}</label>').replace('{id}', id).replace('{id}', id).replace('{val}', display);
          },
          targets: 0
        }, {
          render: function render(data, type, row) {
            if (type === 'display') {
              var container = $('<div/>').html(jQueryFormatCell(data)); //be5.ui.convertLinks(container);

              return container.html();
            }

            return data;
          },
          targets: "_all"
        }],
        createdRow: function createdRow(row, data, index) {
          // see http://datatables.net/examples/advanced_init/row_callback.html
          var rowId = data[0];
          $(row).addClass("table-row-" + rowId);
          $(row).attr("data-table-row", rowId);
          $('input', row).change(function () {
            var checked = this.checked;

            if (checked) {
              // && $.inArray(rowId, selectedRows) === -1
              var newRows = Array.from(props.getSelectedRows());
              newRows.push(rowId);
              props.setSelectedRows(newRows); // if(attributes.rows.length === be5.tableState.selectedRows.length){
              //   $('#rowCheckboxAll').prop('checked', true);
              // }
            } else {
              //if (!checked && $.inArray(rowId, selectedRows) !== -1) {
              var _newRows = Array.from(props.getSelectedRows());

              _newRows.splice($.inArray(rowId, _newRows), 1);

              props.setSelectedRows(_newRows); //$('#rowCheckboxAll').prop('checked', false);
            }
          });
        }
      };
      var groupingColumn = null;
      var nColumns = attributes.rows[0].cells.length;

      for (var i = 0; i < nColumns; i++) {
        var column = attributes.rows[0].cells[i];

        if (_typeof$w(column) === 'object') {
          if ('options' in column) {
            if ('grouping' in column.options) {
              groupingColumn = i;
            }
          }
        }
      } // const hideControls = () => {
      //   if ( $(_this.refs.main).find('.paging_simple_numbers span .paginate_button')
      //     && $(_this.refs.main).find('.paging_simple_numbers span .paginate_button').length > 1) {
      //     $(_this.refs.main).find('.dataTables_length').show();
      //     $(_this.refs.main).find('.paging_simple_numbers').show()
      //   } else {
      //     $(_this.refs.main).find('.dataTables_length').hide();
      //     $(_this.refs.main).find('.paging_simple_numbers').hide()
      //   }
      // };


      var drawGrouping;

      if (groupingColumn !== null) {
        var resultGroupingColumn = groupingColumn + 1;
        tableConfiguration.columnDefs.push({
          visible: false,
          targets: resultGroupingColumn
        });

        drawGrouping = function drawGrouping(api) {
          var rows = api.rows({
            page: 'current'
          }).nodes();
          var last = null;
          api.column(resultGroupingColumn, {
            page: 'current'
          }).data().each(function (group, i) {
            if (last !== group) {
              $(rows).eq(i).before('<tr class="table-group"><td colspan="' + nColumns + '">' + group + '</td></tr>');
              last = group;
            }
          });
        };
      }

      tableConfiguration.drawCallback = function (settings) {
        if (_this.refs && _this.refs.main) {
          var dataTable = $("#" + getTableId(props)).DataTable();
          if (groupingColumn !== null) drawGrouping(dataTable);
        } //hideControls();

      };

      return tableConfiguration;
    }
  }, {
    key: "getColumns",
    value: function getColumns(props) {
      var columns = [{
        "title": "#",
        "orderable": false,
        className: "default_order"
      }];
      props.value.data.attributes.columns.forEach(function (column) {
        columns.push({
          "title": column.title,
          "orderable": !column.nosort
        });
      });
      return columns;
    }
  }, {
    key: "getData",
    value: function getData(props) {
      return props.value.data.attributes.rows.map(function (row) {
        var finalRow = [row.id];
        row.cells.forEach(function (cell) {
          finalRow.push(jQueryFormatCell(cell.content, cell.options));
        });
        return finalRow;
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "row data-table-wrapper",
        ref: "main"
      });
    }
  }], [{
    key: "getEditOperation",
    value: function getEditOperation(props) {
      return props.operations === undefined ? undefined : props.operations.attributes.find(function (operation) {
        return operation.name === 'Edit';
      });
    }
  }]);

  return DataTablesWrapper;
}(Component);

var DataTablesTableBox = /*#__PURE__*/function (_Component2) {
  _inherits$u(DataTablesTableBox, _Component2);

  var _super2 = _createSuper$u(DataTablesTableBox);

  function DataTablesTableBox() {
    _classCallCheck$v(this, DataTablesTableBox);

    return _super2.apply(this, arguments);
  }

  _createClass$u(DataTablesTableBox, [{
    key: "render",
    value: function render() {
      var attr = this.props.value.data.attributes;

      if (!hasRows(attr)) {
        if (attr.totalNumberOfRows > 0) {
          var previousPage = attr.offset / attr.length;
          var currentPage = previousPage + 1;
          return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, be5.messages.table.noRecordsOnThePage.replace('{0}', currentPage + '')), /*#__PURE__*/React.createElement(TablePagination, this.props));
        }

        var whenEmpty = be5.messages.table.emptyTable;
        if (attr.messageWhenEmpty && attr.messageWhenEmpty != '') whenEmpty = attr.messageWhenEmpty;
        return /*#__PURE__*/React.createElement("div", null, whenEmpty);
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "table-wrap"
      }, /*#__PURE__*/React.createElement(QuickColumns, {
        columns: attr.columns,
        category: attr.category,
        page: attr.page,
        selectable: attr.selectable,
        meta: this.props.value.meta,
        layout: attr.layout
      }), /*#__PURE__*/React.createElement(DataTablesWrapper, this.props));
    }
  }]);

  return DataTablesTableBox;
}(Component);

function hasRows(attr) {
  return attr.rows.length > 0;
}

function getTableId(props) {
  return 'dataTables' + props.value.meta._ts_;
}

registerTableBox('dataTable', DataTablesTableBox);

function _typeof$x(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$x = function _typeof(obj) { return typeof obj; }; } else { _typeof$x = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$x(obj); }

function _classCallCheck$w(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$v(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$v(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$v(Constructor.prototype, protoProps); if (staticProps) _defineProperties$v(Constructor, staticProps); return Constructor; }

function _inherits$v(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$v(subClass, superClass); }

function _setPrototypeOf$v(o, p) { _setPrototypeOf$v = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$v(o, p); }

function _createSuper$v(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$v(); return function _createSuperInternal() { var Super = _getPrototypeOf$v(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$v(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$v(this, result); }; }

function _possibleConstructorReturn$v(self, call) { if (call && (_typeof$x(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$w(self); }

function _assertThisInitialized$w(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$v() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$v(o) { _getPrototypeOf$v = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$v(o); }

var JsonFormatTableBox = /*#__PURE__*/function (_Component) {
  _inherits$v(JsonFormatTableBox, _Component);

  var _super = _createSuper$v(JsonFormatTableBox);

  function JsonFormatTableBox() {
    _classCallCheck$w(this, JsonFormatTableBox);

    return _super.apply(this, arguments);
  }

  _createClass$v(JsonFormatTableBox, [{
    key: "render",
    value: function render() {
      var _this$props$value$dat = this.props.value.data.attributes,
          columns = _this$props$value$dat.columns,
          rows = _this$props$value$dat.rows,
          parameters = _this$props$value$dat.parameters,
          layout = _this$props$value$dat.layout;
      var names = columns.map(function (col) {
        return col.name;
      });
      var array = rows.map(function (row) {
        var obj = {};
        names.forEach(function (name, idx) {
          if (row.cells.length - 1 >= idx) {
            obj[name] = row.cells[idx].content;
          }
        });
        return obj;
      });
      var prettyJson = parameters._prettyJson_ === 'yes' || layout._prettyJson_ === 'yes';
      var content = prettyJson ? /*#__PURE__*/React.createElement("pre", {
        className: "jsonTableBox",
        dangerouslySetInnerHTML: {
          __html: JSON.stringify(array, null, 4)
        }
      }) : /*#__PURE__*/React.createElement("div", {
        className: "jsonTableBox",
        dangerouslySetInnerHTML: {
          __html: JSON.stringify(array)
        }
      });
      return content;
    }
  }]);

  return JsonFormatTableBox;
}(Component);

registerTableBox('json', JsonFormatTableBox);

function _typeof$y(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$y = function _typeof(obj) { return typeof obj; }; } else { _typeof$y = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$y(obj); }

function _classCallCheck$x(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$w(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$w(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$w(Constructor.prototype, protoProps); if (staticProps) _defineProperties$w(Constructor, staticProps); return Constructor; }

function _inherits$w(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$w(subClass, superClass); }

function _setPrototypeOf$w(o, p) { _setPrototypeOf$w = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$w(o, p); }

function _createSuper$w(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$w(); return function _createSuperInternal() { var Super = _getPrototypeOf$w(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$w(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$w(this, result); }; }

function _possibleConstructorReturn$w(self, call) { if (call && (_typeof$y(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$x(self); }

function _assertThisInitialized$x(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$w() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$w(o) { _getPrototypeOf$w = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$w(o); }

var OneColumnListTableBox = /*#__PURE__*/function (_Component) {
  _inherits$w(OneColumnListTableBox, _Component);

  var _super = _createSuper$w(OneColumnListTableBox);

  function OneColumnListTableBox() {
    _classCallCheck$x(this, OneColumnListTableBox);

    return _super.apply(this, arguments);
  }

  _createClass$w(OneColumnListTableBox, [{
    key: "render",
    value: function render() {
      var list = this.props.value.data.attributes.rows.map(function (col, idx) {
        return /*#__PURE__*/React.createElement("li", {
          key: idx,
          dangerouslySetInnerHTML: {
            __html: col.cells[0].content
          }
        });
      });
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", {
        className: "listTableBox"
      }, list), /*#__PURE__*/React.createElement(TablePagination, this.props));
    }
  }]);

  return OneColumnListTableBox;
}(Component);

registerTableBox('oneColumnList', OneColumnListTableBox);

function _typeof$z(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$z = function _typeof(obj) { return typeof obj; }; } else { _typeof$z = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$z(obj); }

function _classCallCheck$y(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$x(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$x(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$x(Constructor.prototype, protoProps); if (staticProps) _defineProperties$x(Constructor, staticProps); return Constructor; }

function _inherits$x(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$x(subClass, superClass); }

function _setPrototypeOf$x(o, p) { _setPrototypeOf$x = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$x(o, p); }

function _createSuper$x(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$x(); return function _createSuperInternal() { var Super = _getPrototypeOf$x(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$x(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$x(this, result); }; }

function _possibleConstructorReturn$x(self, call) { if (call && (_typeof$z(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$y(self); }

function _assertThisInitialized$y(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$x() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$x(o) { _getPrototypeOf$x = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$x(o); }

var ReactTableBox = /*#__PURE__*/function (_Component) {
  _inherits$x(ReactTableBox, _Component);

  var _super = _createSuper$x(ReactTableBox);

  function ReactTableBox(props) {
    var _this;

    _classCallCheck$y(this, ReactTableBox);

    _this = _super.call(this, props);
    _this.onOperationClick = _this.onOperationClick.bind(_assertThisInitialized$y(_this));
    return _this;
  }

  _createClass$x(ReactTableBox, [{
    key: "onOperationClick",
    value: function onOperationClick(operation) {
      if (operation.clientSide === true) {
        return;
      }

      var name = operation.name;
      var attr = this.props.value.data.attributes;
      var params = {
        entity: attr.category,
        query: attr.page || 'All records',
        operation: name,
        contextParams: attr.parameters
      };
      forms.load(params, {
        documentName: this.props.frontendParams.operationDocumentName || this.props.frontendParams.documentName,
        parentDocumentName: this.props.frontendParams.documentName
      });
    }
  }, {
    key: "onSelectionChange",
    value: function onSelectionChange() {
      if (this.props.hasOwnProperty('callbacks') && this.props.callbacks !== undefined && this.props.callbacks.hasOwnProperty('onSelectionChange')) {
        this.props.callbacks.onSelectionChange(be5.tableState.selectedRows);
      }
    } //
    // applyTableStyle(node) {
    //   const attributes = this.props.value.data.attributes;
    //   if (attributes.columns.length === 0) return;
    //
    //   //$(node).empty();
    //   be5.tableState.selectedRows = [];
    //
    //   const _this = this;
    //
    //   const hasCheckBoxes = attributes.selectable;
    //   const editable = attributes.operations.filter((op) => op.name === 'Edit').length === 1;
    //
    //   let columnIndexShift = hasCheckBoxes ? 1 : 0;
    //
    //   const tableDiv = $('#table' + this.props.value.meta._ts_);
    //
    //   let lengths = [5,10,20,50,100,500,1000];
    //   const pageLength = attributes.length;
    //
    //   if (lengths.indexOf(pageLength) === -1) {
    //     lengths.push(pageLength);
    //     lengths.sort(function(a,b) {return a-b;});
    //   }
    //
    //   const lengthsTitles = lengths.map(x => x + ' записей');
    //
    //   lengths = [lengths, lengthsTitles];
    //
    //   let language = null;
    //   if(be5.locale.value !== 'en'){
    //     language = be5.messages.dataTables || {};
    //     language.lengthMenu = "_MENU_";
    //   }
    //
    //   const tableConfiguration = {
    //     dom: 'rt il p <"row">',
    //     processing: true,
    //     serverSide: true,
    //     language: language,
    //     searching: false,
    //     autoWidth: false,
    //     aaSorting: [],
    //     ajax: {
    //       url: utils.getBaseUrl() + be5.net.url('document/moreRows'),
    //       data: {
    //         entity: attributes.category,
    //         query: attributes.page,
    //         contextParams: be5.net.paramString(attributes.parameters),
    //         selectable: attributes.selectable,
    //         totalNumberOfRows: attributes.totalNumberOfRows
    //       },
    //       dataSrc: function(d){
    //         if(d.type === "error"){
    //           be5.log.error(d.value.code + "\n" + d.value.message);
    //         }else{
    //           for(let i=0; i < d.data.length; i++){
    //             for(let j=0; j < d.data[0].length - columnIndexShift; j++){
    //               d.data[i][j + columnIndexShift] = formatCell(d.data[i][j + columnIndexShift].content, d.data[i][j + columnIndexShift].options)
    //             }
    //           }
    //         }
    //         return d.data;
    //       }
    //     },
    //     lengthMenu: lengths,
    //     pageLength: pageLength,
    //     // This both tells
    //     // that the first bunch of data is already loaded (so no request is required), and
    //     // which is the total length of the result.
    //     // See https://datatables.net/reference/option/deferLoading
    //     deferLoading: attributes.totalNumberOfRows,
    //     columnDefs: [
    //       {
    //         render: (data, type, row, meta) => {
    //           if (!hasCheckBoxes) {
    //             return row[0]; // default behavior
    //           }
    //           const val = row[0];
    //           const id = "row-" + val + "-checkbox";
    //           let display = meta.row+1;
    //           if(editable) {
    //             display = '<a href="#!'+be5.url.create('form', [attributes.category, attributes.page, 'Edit'], {selectedRows: val})+'">'+display+'</a>';
    //           }
    //           // Pure HTML! Have no idea how to convert some react.js to string.
    //           return '\
    //               <input id="{id}" type="checkbox" class="rowCheckbox"></input>\
    //               <label for="{id}" class="rowIndex"><span class="checkBox" ></span>{val}</label>'
    //             .replace('{id}', id)
    //             .replace('{id}', id)
    //             .replace('{val}', display);
    //         },
    //         targets: 0
    //       }, {
    //         render: (data, type, row) => {
    //           if (type === 'display') {
    //             const container = $('<div/>').html(formatCell(data));
    //             //be5.ui.convertLinks(container);
    //             return container.html();
    //           }
    //           return data;
    //         },
    //         targets: "_all"
    //       }
    //     ],
    //     createdRow(row, data, index) { // see http://datatables.net/examples/advanced_init/row_callback.html
    //       $('input', row).change(function() {
    //         const rowId = data[0];
    //         const checked = this.checked;
    //         if (checked && $.inArray(rowId, be5.tableState.selectedRows) == -1) {
    //           be5.tableState.selectedRows.push(rowId);
    //         } else if (!checked && $.inArray(rowId, be5.tableState.selectedRows) != -1) {
    //           be5.tableState.selectedRows.splice($.inArray(rowId, be5.tableState.selectedRows), 1);
    //         }
    //         _this.onSelectionChange();
    //       });
    //     }
    //   };
    //
    //   let groupingColumn = null;
    //   const nColumns = attributes.rows[0].cells.length;
    //   for (let i = 0; i < nColumns; i++) {
    //     const column = attributes.rows[0].cells[i];
    //     if (typeof column === 'object') {
    //       if ('options' in column) {
    //         if ('grouping' in column.options) {
    //           groupingColumn = i;
    //         }
    //       }
    //     }
    //   }
    //
    //   let drawGrouping;
    //
    //   if (groupingColumn !== null) {
    //     const resultGroupingColumn = columnIndexShift + groupingColumn;
    //     tableConfiguration.columnDefs.push({ visible: false, targets: resultGroupingColumn });
    //     drawGrouping = (api) => {
    //       const rows = api.rows({ page:'current' }).nodes();
    //       let last = null;
    //
    //       api.column(resultGroupingColumn, { page: 'current' }).data().each(function(group, i) {
    //         if (last !== group) {
    //           $(rows).eq(i).before('<tr class="table-group"><td colspan="' + nColumns + '">' + group + '</td></tr>');
    //           last = group;
    //         }
    //       });
    //     };
    //   }
    //
    //   tableConfiguration.drawCallback = (settings) => {
    //     if(this.refs && this.refs.table)
    //     {
    //       const dataTable = $(this.refs.table).find('table').dataTable();
    //       if (groupingColumn !== null) drawGrouping(dataTable.api());
    //     }
    //   };
    //
    //   tableDiv.dataTable(tableConfiguration);
    //
    //   tableDiv.on( 'draw.dt', function () {
    //     be5.tableState.selectedRows = [];
    //     _this._refreshEnablementIfNeeded();
    //   } );
    //
    //   //fix pagination position
    //   tableDiv.parent().css('margin', 0).css('width', tableDiv.width() + 32);
    //
    //   this.refs.quickColumns.setTable(this.refs.table);
    //
    //   this.onSelectionChange();
    // }

  }, {
    key: "render",
    value: function render() {
      var attributes = this.props.value.data.attributes;

      if (attributes.columns.length === 0) {
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(OperationBox, {
          ref: "operations",
          operations: attributes.operations,
          onOperationClick: this.onOperationClick,
          hasRows: attributes.rows.length !== 0
        }), be5.messages.emptyTable);
      }

      var hasCheckBoxes = attributes.selectable;
      var theadrow = [];

      if (hasCheckBoxes) {
        theadrow.push( /*#__PURE__*/React.createElement("th", {
          key: -1
        }, "#"));
      }

      attributes.columns.forEach(function (column, idx) {
        var title = _typeof$z(column) === 'object' ? column.title : column;
        theadrow.push( /*#__PURE__*/React.createElement("th", {
          key: idx
        }, title)); //formatCell(title, 'th', true)
      });
      var trs = [];
      attributes.rows.forEach(function (row, rowId, rows) {
        var tr = [];

        if (hasCheckBoxes) {
          tr.push( /*#__PURE__*/React.createElement("td", {
            key: -1
          }, row.id));
        }

        row.cells.forEach(function (cell, idx) {
          tr.push( /*#__PURE__*/React.createElement("td", {
            key: idx
          }, cell.content)); //formatCell(cell.content, cell.options)
        });
        trs.push( /*#__PURE__*/React.createElement("tr", {
          key: rowId
        }, tr));
      });
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(OperationBox, {
        ref: "operations",
        operations: attributes.operations,
        onOperationClick: this.onOperationClick,
        hasRows: attributes.rows.length !== 0
      }), /*#__PURE__*/React.createElement(QuickColumns, {
        ref: "quickColumns",
        columns: attributes.columns,
        firstRow: attributes.rows[0].cells,
        table: this.refs.table,
        selectable: attributes.selectable,
        layout: attributes.layout
      }), /*#__PURE__*/React.createElement("div", {
        className: "scroll"
      }, /*#__PURE__*/React.createElement("table", {
        id: "table" + this.props.value.meta._ts_,
        className: "table table-striped table-bordered table-hover display table-sm",
        cellSpacing: "0"
      }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, theadrow)), /*#__PURE__*/React.createElement("tbody", null, trs))));
    }
  }], [{
    key: "formatReactCell",
    value: function formatReactCell(data, options, isColumn) {
      if (!Array.isArray(data)) {
        if (data === '') {
          if (options && options.blankNulls && options.blankNulls.value) return options.blankNulls.value;
        }
      } else {
        data = data.map(function (row) {
          return row.join(', ');
        }).join('<br/>');
      }

      if (options) {
        if (options.format) {
          data = numberFormatter(options.format.mask, data);
        }

        if (!isColumn && options.link) {
          data = $('<a>', {
            text: data,
            href: "#!" + options.link.url
          });
        }

        if (options.css || options === 'th') {
          var wrap = $('<div>');
          if (options.css && options.css["class"]) wrap.addClass(options.css["class"]);
          if (options === 'th') wrap.addClass("ta-center td-strong");
          data = wrap.html(data);
        }
      }

      if (data instanceof $) {
        data = $('<div>').append($(data).clone()).html();
      }

      return data;
    }
  }]);

  return ReactTableBox;
}(Component);

registerTableBox('reactTable', ReactTableBox);

var updateHashUrl = function updateHashUrl(url) {
  return {
    type: 'CHANGE_HASH',
    hash: url
  };
};

var hashChange = function hashChange() {
  var hash = be5.url.get();

  if (getHashUrl(be5.store.getState()) !== hash) {
    be5.store.dispatch(updateHashUrl(hash));
  }

  be5.url.process({
    documentName: MAIN_DOCUMENT
  }, be5.url.get());
};
var initBe5App = function initBe5App(store, callback) {
  Preconditions.passed(store, 'store in required');
  be5.appInfo = {
    "title": document.title
  };
  be5.store = store;
  be5.api = api;
  window.be5 = be5;
  be5.store.dispatch(updateHashUrl(be5.url.get()));
  initGetUser(store, callback);
  be5.net.request('languageSelector', {}, function (data) {
    be5.locale.set(data.selected, data.messages);
    be5.locale.setLanguages(data.languages); //be5.url.process(MAIN_DOCUMENT, be5.url.get());

    store.dispatch(fetchUserInfo());
  });
  window.addEventListener("hashchange", hashChange, false);
};

var initGetUser = function initGetUser(store, callback) {
  initOnLoad(store, undefined, getDefaultRoute, function () {
    if (callback) callback();
    processHashUrlForDocument(be5.url.get(), MAIN_DOCUMENT);
  });
};

var initOnLoad = function initOnLoad(store, initState, select, onChange) {
  function handleChange() {
    var nextState = select(store.getState());

    if (nextState !== initState) {
      onChange(nextState);
      unsubscribe();
    }
  }

  var unsubscribe = store.subscribe(handleChange);
};

var middleware = [thunkMiddleware];

{
  middleware.push(createLogger());
}

var enhancer = compose(applyMiddleware.apply(void 0, middleware),  window.devToolsExtension ? window.devToolsExtension() : function (f) {
  return f;
});

var createBaseStore = function createBaseStore(rootReducer) {
  return createStore(rootReducer, {}, enhancer);
};

var initialState = {
  "availableRoles": ["FrontendInit"],
  "currentRoles": ["FrontendInit"],
  "loggedIn": false,
  "userName": "Guest",
  "getCreationTime": "0",
  "defaultRoute": undefined
};
function users() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case UPDATE_USER_INFO:
      return action.user;

    case SELECT_ROLES:
      return Object.assign({}, state, {
        currentRoles: action.currentRoles
      });

    default:
      return state;
  }
}

function users$1() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case UPDATE_MENU:
      return action.data;

    default:
      return state;
  }
}

function changeHash() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var action = arguments.length > 1 ? arguments[1] : undefined;
  if (action.type === 'CHANGE_HASH') return action.hash;
  return state;
}

var index$1 = combineReducers({
  user: users,
  menu: users$1,
  hashUrl: changeHash
});

export { API_URL_PREFIX, Application, Be5Components, CLOSE_MAIN_MODAL, COLUMN_SETTINGS, CONTEXT_PARAMS, CategoryNavigation, Chart, DEFAULT_TABLE_BOX, DEFAULT_VIEW, DOCUMENT_REFRESH_SUFFIX, DOWNLOAD_OPERATION, Document$1 as Document, ENTITY_NAME_PARAM, ErrorPane, FinishedResult, Form, FormTable, FormWizard, FrontendAction, GO_BACK, HelpInfo, HorizontalForm, InlineMiniForm, LIMIT, LanguageBox as LanguageSelector, MAIN_DOCUMENT, MAIN_MODAL_DOCUMENT, MainDocumentOnly, Menu, MenuBody, MenuContainer$1 as MenuContainer, MenuFooter, MenuNode, MenuSearchField, ModalForm, ModalTable, NavMenu, NavbarMenu, NavbarMenuContainer$1 as NavbarMenuContainer, Navs, OFFSET, OPEN_DEFAULT_ROUTE, OPEN_NEW_WINDOW, OPERATION_NAME_PARAM, ORDER_COLUMN, ORDER_DIR, OperationBox, QUERY_NAME_PARAM, QUERY_SETTINGS, QuickColumns, QuickFiltersBox, RECORDS_PER_PAGE_SETTINGS, REDIRECT, REFRESH_DOCUMENT, REFRESH_MENU, REFRESH_PARENT_DOCUMENT, RELOAD_CONTROL_NAME, ROLE_ADMINISTRATOR, ROLE_GUEST, ROLE_SYSTEM_DEVELOPER, RoleSelector, SEARCH_PARAM, SEARCH_PRESETS_PARAM, SELECTED_ROWS, SET_URL, SUCCESS_ALERT, SideBar, StaticPage, SubmitOnChangeForm, TIMESTAMP_PARAM, Table, TableForm, TableFormRow, TablePagination, UPDATE_DOCUMENT, UPDATE_PARENT_DOCUMENT, UserControl, UserControlContainer, actions as action, addFilterParams, addUrlHandlers, arraysEqual, be5, bus, changeDocument, clearDocumentState, createBaseStore, createPageValue, createStaticValue, executeFrontendActions, fetchMenu, fetchOperationByUrl, fetchTableByUrl, fetchUserInfo, route$1 as formAction, getActionsMap, getAllDocumentTypes, getAllRoutes, getAllTypes, getBackAction, getBackOrOpenDefaultRouteAction, getCurrentRoles, getDocument, getDocumentState, getDocumentStates, getFilterParams, getMenu, getModelByID, getOperationInfoFromUrl, getResourceByID, getResourceByType, getRoute, getSelfUrl, getTableBox, getUser, initBe5App, initFilterParams, initOnLoad, loadDocumentByUrl, loadOperation, loadTable, loadTableByUrl, route as loadingAction, route$2 as loginAction, route$3 as logoutAction, users$1 as menuReduser, openInModal, openOperationByUrl, openOperationByUrlWithValues, Preconditions as preconditions, processHashUrl, processHashUrlForDocument, route$6 as queryBuilderAction, registerDocument, registerPage, registerRoute, registerTableBox, index$1 as rootReducer, setDocumentState, route$4 as staticAction, submitOperation, route$5 as tableAction, route$7 as textAction, toggleRoles, updateMenu, updateTable, updateUserInfo, users as userReduser };
