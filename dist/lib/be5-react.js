import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, Nav, NavItem, NavLink, Navbar, NavbarToggler, Collapse, UncontrolledTooltip, Card, CardBody, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import classNames from 'classnames';
import { connect } from 'react-redux';
import 'formdata-polyfill';
import SplitPane from 'react-split-pane';
import Alert from 'react-s-alert';
import PropertySet, { PropertyInput, Property } from 'beanexplorer-react';
import JsonPointer from 'json-pointer';
import Transition from 'react-transition-group/Transition';
import numberFormatter from 'number-format.js';
import { findDOMNode } from 'react-dom';
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
  get rootReducer () { return index; },
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
  get DEFAULT_TABLE_BOX () { return DEFAULT_TABLE_BOX; }
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

var FrontendAction = function FrontendAction(type, value) {
  babelHelpers.classCallCheck(this, FrontendAction);
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
  var params = Object.assign(attr.named, babelHelpers.defineProperty({}, TIMESTAMP_PARAM, new Date().getTime()));
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
        res.push(key + '=' + named[key]);
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
      if (babelHelpers["typeof"](params) !== 'object') {
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

          if (babelHelpers["typeof"](data) === 'object' && data.type === 'error') {
            if (babelHelpers["typeof"](data.value) !== 'object') {
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
    var roles = babelHelpers.toConsumableArray(props.currentRoles);
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
    className: classNames('user-control', props.className || 'form-inline mb-2')
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

var _get = function _get(operationInfo, callback, failure) {
  var data = Object.assign({}, operationInfo, babelHelpers.defineProperty({}, TIMESTAMP_PARAM, new Date().getTime()));
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
  var operationInfo = (_operationInfo = {}, babelHelpers.defineProperty(_operationInfo, ENTITY_NAME_PARAM, attr.positional[1]), babelHelpers.defineProperty(_operationInfo, QUERY_NAME_PARAM, attr.positional[2]), babelHelpers.defineProperty(_operationInfo, OPERATION_NAME_PARAM, attr.positional[3]), babelHelpers.defineProperty(_operationInfo, CONTEXT_PARAMS, JSON.stringify(attr.named)), _operationInfo);
  return getOperationInfo(operationInfo, values);
};

var _buildFormDateFromObject = function _buildFormDateFromObject(formData, data, parentKey) {
  if (data && babelHelpers["typeof"](data) === 'object' && !(data instanceof Date) && !(data instanceof File)) {
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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var propTypes = {
  menu: PropTypes.shape({})
};

var MenuBody = /*#__PURE__*/function (_Component) {
  babelHelpers.inherits(MenuBody, _Component);

  var _super = _createSuper(MenuBody);

  function MenuBody(props) {
    var _this;

    babelHelpers.classCallCheck(this, MenuBody);
    _this = _super.call(this, props);
    _this.state = {
      query: ''
    };
    _this._getFilteredRoot = _this._getFilteredRoot.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(MenuBody, [{
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

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var MenuSearchField = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(MenuSearchField, _React$Component);

  var _super = _createSuper$1(MenuSearchField);

  function MenuSearchField(props) {
    var _this;

    babelHelpers.classCallCheck(this, MenuSearchField);
    _this = _super.call(this, props);
    _this.state = {
      value: ''
    };
    _this._handleChange = _this._handleChange.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(MenuSearchField, [{
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

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
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
  babelHelpers.inherits(Menu, _Component);

  var _super = _createSuper$2(Menu);

  function Menu(props) {
    var _this;

    babelHelpers.classCallCheck(this, Menu);
    _this = _super.call(this, props);
    _this._handleQueryChange = _this._handleQueryChange.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(Menu, [{
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

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Language = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Language, _React$Component);

  var _super = _createSuper$3(Language);

  function Language(props) {
    var _this;

    babelHelpers.classCallCheck(this, Language);
    _this = _super.call(this, props);
    _this.onClick = _this.onClick.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(Language, [{
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
  babelHelpers.inherits(LanguageList, _React$Component2);

  var _super2 = _createSuper$3(LanguageList);

  function LanguageList(props) {
    babelHelpers.classCallCheck(this, LanguageList);
    return _super2.call(this, props);
  }

  babelHelpers.createClass(LanguageList, [{
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
  babelHelpers.inherits(LanguageBox, _React$Component3);

  var _super3 = _createSuper$3(LanguageBox);

  function LanguageBox(props) {
    var _this2;

    babelHelpers.classCallCheck(this, LanguageBox);
    _this2 = _super3.call(this, props);
    _this2.state = {
      data: {
        languages: [],
        selected: ''
      }
    };
    _this2.changeLanguage = _this2.changeLanguage.bind(babelHelpers.assertThisInitialized(_this2));
    return _this2;
  }

  babelHelpers.createClass(LanguageBox, [{
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
        className: classNames('languageBox', this.props.className)
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

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var StaticPage = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(StaticPage, _React$Component);

  var _super = _createSuper$4(StaticPage);

  function StaticPage() {
    babelHelpers.classCallCheck(this, StaticPage);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(StaticPage, [{
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

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Document$1 = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Document, _React$Component);

  var _super = _createSuper$5(Document);

  function Document(props) {
    var _this;

    babelHelpers.classCallCheck(this, Document);
    _this = _super.call(this, props);

    _this.setStateValue(props);

    _this.refresh = _this.refresh.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(Document, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if ('value' in nextProps && (!this.props.value || this.props.value.meta === undefined || !nextProps.value || nextProps.value.meta === undefined || nextProps.value.meta._ts_ > this.props.value.meta._ts_)) {
        this.setStateValue(nextProps);
      }
    }
  }, {
    key: "setStateValue",
    value: function setStateValue(props) {
      this.addBaseLayout(props.value);
      this.state = {
        value: props.value || null,
        frontendParams: props.frontendParams || {}
      };
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

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Be5Components = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Be5Components, _React$Component);

  var _super = _createSuper$6(Be5Components);

  function Be5Components(props) {
    var _this;

    babelHelpers.classCallCheck(this, Be5Components);
    _this = _super.call(this, props);
    _this.state = {
      modal: false
    };
    _this.open = _this.open.bind(babelHelpers.assertThisInitialized(_this));
    _this.close = _this.close.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(Be5Components, [{
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

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var propTypes$2 = {
  menu: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
  defaultRoute: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

var NavMenu = /*#__PURE__*/function (_Component) {
  babelHelpers.inherits(NavMenu, _Component);

  var _super = _createSuper$7(NavMenu);

  function NavMenu(props) {
    babelHelpers.classCallCheck(this, NavMenu);
    return _super.call(this, props);
  }

  babelHelpers.createClass(NavMenu, [{
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
          className: classNames({
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

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
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
  babelHelpers.inherits(NavbarMenu, _Component);

  var _super = _createSuper$8(NavbarMenu);

  function NavbarMenu(props) {
    var _this;

    babelHelpers.classCallCheck(this, NavbarMenu);
    _this = _super.call(this, props);
    _this.state = {
      isOpen: false
    };
    _this.toggle = _this.toggle.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(NavbarMenu, [{
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

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var HelpInfo = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(HelpInfo, _React$Component);

  var _super = _createSuper$9(HelpInfo);

  function HelpInfo(props) {
    var _this;

    babelHelpers.classCallCheck(this, HelpInfo);
    _this = _super.call(this);
    _this.state = {
      isOpen: props.isOpen
    };
    _this.helpCollapseToggle = _this.helpCollapseToggle.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(HelpInfo, [{
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
          className: classNames('btn-sm', this.props.className),
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

function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Error$1 = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Error, _React$Component);

  var _super = _createSuper$a(Error);

  function Error() {
    var _this;

    babelHelpers.classCallCheck(this, Error);
    _this = _super.call(this);
    _this.state = {
      helpCollapse: false
    };
    _this.helpCollapseToggle = _this.helpCollapseToggle.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(Error, [{
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
  babelHelpers.inherits(ErrorPane, _React$Component2);

  var _super2 = _createSuper$a(ErrorPane);

  function ErrorPane() {
    babelHelpers.classCallCheck(this, ErrorPane);
    return _super2.apply(this, arguments);
  }

  babelHelpers.createClass(ErrorPane, [{
    key: "render",
    value: function render() {
      var errors = this.props.value.errors;

      if (!errors || errors.length === 0) {
        return null;
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "errorPane"
      }, errors.map(function (error, i) {
        return /*#__PURE__*/React.createElement(Error$1, babelHelpers["extends"]({}, error, {
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

function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var FormWizard = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(FormWizard, _React$Component);

  var _super = _createSuper$b(FormWizard);

  function FormWizard(props) {
    var _this;

    babelHelpers.classCallCheck(this, FormWizard);
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

  babelHelpers.createClass(FormWizard, [{
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
        className: classNames(props.backButtonCls, {
          disabled: !state.showPreviousBtn
        }),
        onClick: function onClick() {
          _this3.previous();
        },
        id: "prev-button"
      }, props.backButtonText), /*#__PURE__*/React.createElement("button", {
        className: classNames(props.nextButtonCls, {
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

function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Navs = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Navs, _React$Component);

  var _super = _createSuper$c(Navs);

  function Navs(props) {
    var _this;

    babelHelpers.classCallCheck(this, Navs);
    _this = _super.call(this, props);
    _this.state = {
      compState: _this.props.startAtStep
    };
    _this.init = _this.init.bind(babelHelpers.assertThisInitialized(_this));
    _this.setNavState = _this.setNavState.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(Navs, [{
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
  return _ref = {}, babelHelpers.defineProperty(_ref, ENTITY_NAME_PARAM, attr.positional[1]), babelHelpers.defineProperty(_ref, QUERY_NAME_PARAM, attr.positional[2]), babelHelpers.defineProperty(_ref, CONTEXT_PARAMS, attr.named), _ref;
};
var getTable = function getTable(params, callback) {
  var failure = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : be5.log.error;
  be5.net.request('table', getRequestParams(params), callback, failure);
};
var updateTable = function updateTable(params, callback) {
  var failure = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : be5.log.error;
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
  return _ref2 = {}, babelHelpers.defineProperty(_ref2, ENTITY_NAME_PARAM, entity), babelHelpers.defineProperty(_ref2, QUERY_NAME_PARAM, query), babelHelpers.defineProperty(_ref2, CONTEXT_PARAMS, be5.net.paramString(finalParams)), babelHelpers.defineProperty(_ref2, TIMESTAMP_PARAM, new Date().getTime()), _ref2;
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

function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Form = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Form, _React$Component);

  var _super = _createSuper$d(Form);

  function Form(props) {
    var _this;

    babelHelpers.classCallCheck(this, Form);
    _this = _super.call(this, props);
    _this.state = {
      values: _this.props.value.data.attributes.bean.values
    };
    _this._onFieldChange = _this._onFieldChange.bind(babelHelpers.assertThisInitialized(_this));
    _this._onReloadOnChange = _this._onReloadOnChange.bind(babelHelpers.assertThisInitialized(_this));
    _this._setValue = _this._setValue.bind(babelHelpers.assertThisInitialized(_this));
    _this._applyOnSubmit = _this._applyOnSubmit.bind(babelHelpers.assertThisInitialized(_this));
    _this.apply = _this.apply.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(Form, [{
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

      var operationInfo = (_operationInfo = {}, babelHelpers.defineProperty(_operationInfo, ENTITY_NAME_PARAM, positional[1]), babelHelpers.defineProperty(_operationInfo, QUERY_NAME_PARAM, positional[2]), babelHelpers.defineProperty(_operationInfo, OPERATION_NAME_PARAM, positional[3]), babelHelpers.defineProperty(_operationInfo, CONTEXT_PARAMS, JSON.stringify(attr.operationParams)), _operationInfo);
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
        className: classNames(this.state.wasValidated ? 'was-validated' : '')
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
          className: classNames("btn btn-primary", {
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
        className: classNames('be5-form', this.getFormClass(), baseClasses, attributes.layout.classes)
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

function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var HorizontalForm = /*#__PURE__*/function (_Form) {
  babelHelpers.inherits(HorizontalForm, _Form);

  var _super = _createSuper$e(HorizontalForm);

  function HorizontalForm() {
    babelHelpers.classCallCheck(this, HorizontalForm);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(HorizontalForm, [{
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
        className: classNames(colTag, offsetTag)
      }, this._createSubmitAction(), ' ', _createBackAction(this.props.value.data.attributes.layout, this.props.frontendParams)));
    }
  }]);
  return HorizontalForm;
}(Form);

registerDocument('form', HorizontalForm);

function _createSuper$f(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$f(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$f() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SubmitOnChangeForm = /*#__PURE__*/function (_Form) {
  babelHelpers.inherits(SubmitOnChangeForm, _Form);

  var _super = _createSuper$f(SubmitOnChangeForm);

  function SubmitOnChangeForm(props) {
    var _this;

    babelHelpers.classCallCheck(this, SubmitOnChangeForm);
    _this = _super.call(this, props);
    _this._onFieldChangeAndSubmit = _this._onFieldChangeAndSubmit.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(SubmitOnChangeForm, [{
    key: "_onFieldChangeAndSubmit",
    value: function _onFieldChangeAndSubmit(name, value) {
      babelHelpers.get(babelHelpers.getPrototypeOf(SubmitOnChangeForm.prototype), "_setValue", this).call(this, name, value);
      babelHelpers.get(babelHelpers.getPrototypeOf(SubmitOnChangeForm.prototype), "apply", this).call(this);
    }
  }, {
    key: "render",
    value: function render() {
      var attributes = this.props.value.data.attributes;
      return /*#__PURE__*/React.createElement("form", {
        className: classNames('submit-onchange-form', this.props.wasValidated ? 'was-validated' : '', attributes.layout.classes)
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

function _createSuper$g(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$g(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$g() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ModalForm = /*#__PURE__*/function (_Form) {
  babelHelpers.inherits(ModalForm, _Form);

  var _super = _createSuper$g(ModalForm);

  function ModalForm() {
    babelHelpers.classCallCheck(this, ModalForm);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(ModalForm, [{
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
        className: classNames('be5-form', this.getFormClass(), attributes.layout.classes)
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

function _createSuper$h(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$h(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$h() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var InlineMiniForm = /*#__PURE__*/function (_Form) {
  babelHelpers.inherits(InlineMiniForm, _Form);

  var _super = _createSuper$h(InlineMiniForm);

  function InlineMiniForm() {
    babelHelpers.classCallCheck(this, InlineMiniForm);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(InlineMiniForm, [{
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
        return /*#__PURE__*/React.createElement(Property, babelHelpers["extends"]({
          key: path,
          path: path
        }, commonProps, {
          value: JsonPointer.get(_this.state.values, path)
        }));
      });
      var baseClasses = attributes.layout.baseClasses || 'form-inline-mini';
      return /*#__PURE__*/React.createElement("div", {
        className: classNames('be5-form', this.getFormClass(), baseClasses, attributes.layout.classes)
      }, /*#__PURE__*/React.createElement("form", {
        onSubmit: this._applyOnSubmit,
        className: classNames('form-inline', this.state.wasValidated ? 'was-validated' : '')
      }, attributes.title !== "" ? /*#__PURE__*/React.createElement("label", {
        className: classNames("mr-sm-2", {
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

function _createSuper$i(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$i(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$i() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var FinishedResult = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(FinishedResult, _React$Component);

  var _super = _createSuper$i(FinishedResult);

  function FinishedResult() {
    babelHelpers.classCallCheck(this, FinishedResult);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(FinishedResult, [{
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

function _createSuper$j(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$j(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$j() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var OperationBox = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(OperationBox, _React$Component);

  var _super = _createSuper$j(OperationBox);

  function OperationBox(props) {
    babelHelpers.classCallCheck(this, OperationBox);
    return _super.call(this, props);
  }

  babelHelpers.createClass(OperationBox, [{
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
          operations = [].concat(babelHelpers.toConsumableArray(operations), [operation], babelHelpers.toConsumableArray(tail));
        } else if (layout && _this.props.operations.attributes.length < layout.order) {
          orderOutSize.push(operation);
        } else {
          operations.push(operation);
        }
      });

      if (orderOutSize.length > 0) {
        operations = [].concat(babelHelpers.toConsumableArray(operations), babelHelpers.toConsumableArray(orderOutSize.sort(function (a, b) {
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

var positionsParamNames = [ORDER_COLUMN, ORDER_DIR, OFFSET, LIMIT];
var propTypes$5 = {};

var FilterUI = function FilterUI(_ref) {
  var data = _ref.data,
      entity = _ref.entity,
      query = _ref.query,
      params = _ref.params,
      frontendParams = _ref.frontendParams;
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
    var paramsObject = (_paramsObject = {}, babelHelpers.defineProperty(_paramsObject, ENTITY_NAME_PARAM, entity), babelHelpers.defineProperty(_paramsObject, QUERY_NAME_PARAM, query || 'All records'), babelHelpers.defineProperty(_paramsObject, CONTEXT_PARAMS, newParams), _paramsObject);
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

  if (Object.keys(filterParams).length > positionsParamCount) {
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
      url = be5.url.create(pUrl.positional, Object.assign({}, pUrl.named, babelHelpers.defineProperty({}, param, tag[0])));

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

function _createSuper$k(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$k(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$k() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Table = /*#__PURE__*/function (_Component) {
  babelHelpers.inherits(Table, _Component);

  var _super = _createSuper$k(Table);

  function Table(props) {
    var _this;

    babelHelpers.classCallCheck(this, Table);
    _this = _super.call(this, props);
    _this.state = {
      runReload: "",
      selectedRows: []
    };
    _this.onOperationClick = _this.onOperationClick.bind(babelHelpers.assertThisInitialized(_this));
    _this.setSelectedRows = _this.setSelectedRows.bind(babelHelpers.assertThisInitialized(_this));
    _this.getSelectedRows = _this.getSelectedRows.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(Table, [{
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

      if (this.props.frontendParams.documentName === MAIN_DOCUMENT) {
        be5.ui.setTitle(data.attributes.title + ' ' + this.getOperationParamsInfo());
      }

      var topFormJson = getModelByID(included, meta, "topForm");
      var categories = getResourceByType(included, "documentCategories");
      var quickFilters = getResourceByType(included, "quickFilters");
      var operations = getResourceByType(included, "documentOperations");
      var filterInfo = getResourceByType(included, "filterInfo");
      return /*#__PURE__*/React.createElement("div", {
        className: classNames("table-component", this.getTableClass(), data.attributes.layout.classes)
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
        hasRows: data.attributes.rows.length > 0,
        hideOperations: this.getHideOperations(data, topFormJson)
      }), /*#__PURE__*/React.createElement(FilterUI, {
        data: filterInfo,
        entity: data.attributes.category,
        query: data.attributes.page,
        params: data.attributes.parameters,
        frontendParams: this.props.frontendParams
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

var arrowRenderer = function arrowRenderer(_ref) {
	var onMouseDown = _ref.onMouseDown;

	return React.createElement('span', {
		className: 'Select-arrow',
		onMouseDown: onMouseDown
	});
};

arrowRenderer.propTypes = {
	onMouseDown: PropTypes.func
};

var clearRenderer = function clearRenderer() {
	return React.createElement('span', {
		className: 'Select-clear',
		dangerouslySetInnerHTML: { __html: '&times;' }
	});
};

var map = [{ 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g }, { 'base': 'AA', 'letters': /[\uA732]/g }, { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g }, { 'base': 'AO', 'letters': /[\uA734]/g }, { 'base': 'AU', 'letters': /[\uA736]/g }, { 'base': 'AV', 'letters': /[\uA738\uA73A]/g }, { 'base': 'AY', 'letters': /[\uA73C]/g }, { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g }, { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g }, { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g }, { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g }, { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g }, { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g }, { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g }, { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g }, { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g }, { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g }, { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g }, { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g }, { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g }, { 'base': 'LJ', 'letters': /[\u01C7]/g }, { 'base': 'Lj', 'letters': /[\u01C8]/g }, { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g }, { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g }, { 'base': 'NJ', 'letters': /[\u01CA]/g }, { 'base': 'Nj', 'letters': /[\u01CB]/g }, { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g }, { 'base': 'OI', 'letters': /[\u01A2]/g }, { 'base': 'OO', 'letters': /[\uA74E]/g }, { 'base': 'OU', 'letters': /[\u0222]/g }, { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g }, { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g }, { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g }, { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g }, { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g }, { 'base': 'TZ', 'letters': /[\uA728]/g }, { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g }, { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g }, { 'base': 'VY', 'letters': /[\uA760]/g }, { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g }, { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g }, { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g }, { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g }, { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g }, { 'base': 'aa', 'letters': /[\uA733]/g }, { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g }, { 'base': 'ao', 'letters': /[\uA735]/g }, { 'base': 'au', 'letters': /[\uA737]/g }, { 'base': 'av', 'letters': /[\uA739\uA73B]/g }, { 'base': 'ay', 'letters': /[\uA73D]/g }, { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g }, { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g }, { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g }, { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g }, { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g }, { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g }, { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g }, { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g }, { 'base': 'hv', 'letters': /[\u0195]/g }, { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g }, { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g }, { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g }, { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g }, { 'base': 'lj', 'letters': /[\u01C9]/g }, { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g }, { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g }, { 'base': 'nj', 'letters': /[\u01CC]/g }, { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g }, { 'base': 'oi', 'letters': /[\u01A3]/g }, { 'base': 'ou', 'letters': /[\u0223]/g }, { 'base': 'oo', 'letters': /[\uA74F]/g }, { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g }, { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g }, { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g }, { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g }, { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g }, { 'base': 'tz', 'letters': /[\uA729]/g }, { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g }, { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g }, { 'base': 'vy', 'letters': /[\uA761]/g }, { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g }, { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g }, { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }, { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }];

var stripDiacritics = function stripDiacritics(str) {
	for (var i = 0; i < map.length; i++) {
		str = str.replace(map[i].letters, map[i].base);
	}
	return str;
};

var trim = function trim(str) {
  return str.replace(/^\s+|\s+$/g, '');
};

var isValid = function isValid(value) {
	return typeof value !== 'undefined' && value !== null && value !== '';
};

var filterOptions = function filterOptions(options, filterValue, excludeOptions, props) {
	if (props.ignoreAccents) {
		filterValue = stripDiacritics(filterValue);
	}

	if (props.ignoreCase) {
		filterValue = filterValue.toLowerCase();
	}

	if (props.trimFilter) {
		filterValue = trim(filterValue);
	}

	if (excludeOptions) excludeOptions = excludeOptions.map(function (i) {
		return i[props.valueKey];
	});

	return options.filter(function (option) {
		if (excludeOptions && excludeOptions.indexOf(option[props.valueKey]) > -1) return false;
		if (props.filterOption) return props.filterOption.call(undefined, option, filterValue);
		if (!filterValue) return true;

		var value = option[props.valueKey];
		var label = option[props.labelKey];
		var hasValue = isValid(value);
		var hasLabel = isValid(label);

		if (!hasValue && !hasLabel) {
			return false;
		}

		var valueTest = hasValue ? String(value) : null;
		var labelTest = hasLabel ? String(label) : null;

		if (props.ignoreAccents) {
			if (valueTest && props.matchProp !== 'label') valueTest = stripDiacritics(valueTest);
			if (labelTest && props.matchProp !== 'value') labelTest = stripDiacritics(labelTest);
		}

		if (props.ignoreCase) {
			if (valueTest && props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
			if (labelTest && props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
		}

		return props.matchPos === 'start' ? valueTest && props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || labelTest && props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : valueTest && props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || labelTest && props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
	});
};

var menuRenderer = function menuRenderer(_ref) {
	var focusedOption = _ref.focusedOption,
	    focusOption = _ref.focusOption,
	    inputValue = _ref.inputValue,
	    instancePrefix = _ref.instancePrefix,
	    onFocus = _ref.onFocus,
	    onOptionRef = _ref.onOptionRef,
	    onSelect = _ref.onSelect,
	    optionClassName = _ref.optionClassName,
	    optionComponent = _ref.optionComponent,
	    optionRenderer = _ref.optionRenderer,
	    options = _ref.options,
	    removeValue = _ref.removeValue,
	    selectValue = _ref.selectValue,
	    valueArray = _ref.valueArray,
	    valueKey = _ref.valueKey;

	var Option = optionComponent;

	return options.map(function (option, i) {
		var isSelected = valueArray && valueArray.some(function (x) {
			return x[valueKey] === option[valueKey];
		});
		var isFocused = option === focusedOption;
		var optionClass = classNames(optionClassName, {
			'Select-option': true,
			'is-selected': isSelected,
			'is-focused': isFocused,
			'is-disabled': option.disabled
		});

		return React.createElement(
			Option,
			{
				className: optionClass,
				focusOption: focusOption,
				inputValue: inputValue,
				instancePrefix: instancePrefix,
				isDisabled: option.disabled,
				isFocused: isFocused,
				isSelected: isSelected,
				key: 'option-' + i + '-' + option[valueKey],
				onFocus: onFocus,
				onSelect: onSelect,
				option: option,
				optionIndex: i,
				ref: function ref(_ref2) {
					onOptionRef(_ref2, isFocused);
				},
				removeValue: removeValue,
				selectValue: selectValue
			},
			optionRenderer(option, i, inputValue)
		);
	});
};

menuRenderer.propTypes = {
	focusOption: PropTypes.func,
	focusedOption: PropTypes.object,
	inputValue: PropTypes.string,
	instancePrefix: PropTypes.string,
	onFocus: PropTypes.func,
	onOptionRef: PropTypes.func,
	onSelect: PropTypes.func,
	optionClassName: PropTypes.string,
	optionComponent: PropTypes.func,
	optionRenderer: PropTypes.func,
	options: PropTypes.array,
	removeValue: PropTypes.func,
	selectValue: PropTypes.func,
	valueArray: PropTypes.array,
	valueKey: PropTypes.string
};

var blockEvent = (function (event) {
	event.preventDefault();
	event.stopPropagation();
	if (event.target.tagName !== 'A' || !('href' in event.target)) {
		return;
	}
	if (event.target.target) {
		window.open(event.target.href, event.target.target);
	} else {
		window.location.href = event.target.href;
	}
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Option = function (_React$Component) {
	inherits(Option, _React$Component);

	function Option(props) {
		classCallCheck(this, Option);

		var _this = possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).call(this, props));

		_this.handleMouseDown = _this.handleMouseDown.bind(_this);
		_this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
		_this.handleMouseMove = _this.handleMouseMove.bind(_this);
		_this.handleTouchStart = _this.handleTouchStart.bind(_this);
		_this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
		_this.handleTouchMove = _this.handleTouchMove.bind(_this);
		_this.onFocus = _this.onFocus.bind(_this);
		return _this;
	}

	createClass(Option, [{
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onSelect(this.props.option, event);
		}
	}, {
		key: 'handleMouseEnter',
		value: function handleMouseEnter(event) {
			this.onFocus(event);
		}
	}, {
		key: 'handleMouseMove',
		value: function handleMouseMove(event) {
			this.onFocus(event);
		}
	}, {
		key: 'handleTouchEnd',
		value: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			this.handleMouseDown(event);
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove() {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart() {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'onFocus',
		value: function onFocus(event) {
			if (!this.props.isFocused) {
				this.props.onFocus(this.props.option, event);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    option = _props.option,
			    instancePrefix = _props.instancePrefix,
			    optionIndex = _props.optionIndex;

			var className = classNames(this.props.className, option.className);

			return option.disabled ? React.createElement(
				'div',
				{ className: className,
					onMouseDown: blockEvent,
					onClick: blockEvent },
				this.props.children
			) : React.createElement(
				'div',
				{ className: className,
					style: option.style,
					role: 'option',
					'aria-label': option.label,
					onMouseDown: this.handleMouseDown,
					onMouseEnter: this.handleMouseEnter,
					onMouseMove: this.handleMouseMove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove,
					onTouchEnd: this.handleTouchEnd,
					id: instancePrefix + '-option-' + optionIndex,
					title: option.title },
				this.props.children
			);
		}
	}]);
	return Option;
}(React.Component);

Option.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string, // className (based on mouse position)
	instancePrefix: PropTypes.string.isRequired, // unique prefix for the ids (used for aria)
	isDisabled: PropTypes.bool, // the option is disabled
	isFocused: PropTypes.bool, // the option is focused
	isSelected: PropTypes.bool, // the option is selected
	onFocus: PropTypes.func, // method to handle mouseEnter on option element
	onSelect: PropTypes.func, // method to handle click on option element
	onUnfocus: PropTypes.func, // method to handle mouseLeave on option element
	option: PropTypes.object.isRequired, // object that is base for that option
	optionIndex: PropTypes.number // index of the option, used to generate unique ids for aria
};

var Value = function (_React$Component) {
	inherits(Value, _React$Component);

	function Value(props) {
		classCallCheck(this, Value);

		var _this = possibleConstructorReturn(this, (Value.__proto__ || Object.getPrototypeOf(Value)).call(this, props));

		_this.handleMouseDown = _this.handleMouseDown.bind(_this);
		_this.onRemove = _this.onRemove.bind(_this);
		_this.handleTouchEndRemove = _this.handleTouchEndRemove.bind(_this);
		_this.handleTouchMove = _this.handleTouchMove.bind(_this);
		_this.handleTouchStart = _this.handleTouchStart.bind(_this);
		return _this;
	}

	createClass(Value, [{
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			if (event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			if (this.props.onClick) {
				event.stopPropagation();
				this.props.onClick(this.props.value, event);
				return;
			}
			if (this.props.value.href) {
				event.stopPropagation();
			}
		}
	}, {
		key: 'onRemove',
		value: function onRemove(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onRemove(this.props.value);
		}
	}, {
		key: 'handleTouchEndRemove',
		value: function handleTouchEndRemove(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.onRemove(event);
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove() {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart() {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'renderRemoveIcon',
		value: function renderRemoveIcon() {
			if (this.props.disabled || !this.props.onRemove) return;
			return React.createElement(
				'span',
				{ className: 'Select-value-icon',
					'aria-hidden': 'true',
					onMouseDown: this.onRemove,
					onTouchEnd: this.handleTouchEndRemove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove },
				'\xD7'
			);
		}
	}, {
		key: 'renderLabel',
		value: function renderLabel() {
			var className = 'Select-value-label';
			return this.props.onClick || this.props.value.href ? React.createElement(
				'a',
				{ className: className, href: this.props.value.href, target: this.props.value.target, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
				this.props.children
			) : React.createElement(
				'span',
				{ className: className, role: 'option', 'aria-selected': 'true', id: this.props.id },
				this.props.children
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: classNames('Select-value', this.props.value.disabled ? 'Select-value-disabled' : '', this.props.value.className),
					style: this.props.value.style,
					title: this.props.value.title
				},
				this.renderRemoveIcon(),
				this.renderLabel()
			);
		}
	}]);
	return Value;
}(React.Component);

Value.propTypes = {
	children: PropTypes.node,
	disabled: PropTypes.bool, // disabled prop passed to ReactSelect
	id: PropTypes.string, // Unique id for the value - used for aria
	onClick: PropTypes.func, // method to handle click on value label
	onRemove: PropTypes.func, // method to handle removal of the value
	value: PropTypes.object.isRequired // the option object for this value
};

/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/react-select
*/
var stringifyValue = function stringifyValue(value) {
	return typeof value === 'string' ? value : value !== null && JSON.stringify(value) || '';
};

var stringOrNode = PropTypes.oneOfType([PropTypes.string, PropTypes.node]);
var stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

var instanceId = 1;

var shouldShowValue = function shouldShowValue(state, props) {
	var inputValue = state.inputValue,
	    isPseudoFocused = state.isPseudoFocused,
	    isFocused = state.isFocused;
	var onSelectResetsInput = props.onSelectResetsInput;


	if (!inputValue) return true;

	if (!onSelectResetsInput) {
		return !(!isFocused && isPseudoFocused || isFocused && !isPseudoFocused);
	}

	return false;
};

var shouldShowPlaceholder = function shouldShowPlaceholder(state, props, isOpen) {
	var inputValue = state.inputValue,
	    isPseudoFocused = state.isPseudoFocused,
	    isFocused = state.isFocused;
	var onSelectResetsInput = props.onSelectResetsInput;


	return !inputValue || !onSelectResetsInput && !isOpen && !isPseudoFocused && !isFocused;
};

/**
 * Retrieve a value from the given options and valueKey
 * @param {String|Number|Array} value	- the selected value(s)
 * @param {Object}		 props	- the Select component's props (or nextProps)
 */
var expandValue = function expandValue(value, props) {
	var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
	var options = props.options,
	    valueKey = props.valueKey;

	if (!options) return;
	for (var i = 0; i < options.length; i++) {
		if (String(options[i][valueKey]) === String(value)) return options[i];
	}
};

var handleRequired = function handleRequired(value, multi) {
	if (!value) return true;
	return multi ? value.length === 0 : Object.keys(value).length === 0;
};

var Select$1 = function (_React$Component) {
	inherits(Select, _React$Component);

	function Select(props) {
		classCallCheck(this, Select);

		var _this = possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

		['clearValue', 'focusOption', 'getOptionLabel', 'handleInputBlur', 'handleInputChange', 'handleInputFocus', 'handleInputValueChange', 'handleKeyDown', 'handleMenuScroll', 'handleMouseDown', 'handleMouseDownOnArrow', 'handleMouseDownOnMenu', 'handleTouchEnd', 'handleTouchEndClearValue', 'handleTouchMove', 'handleTouchOutside', 'handleTouchStart', 'handleValueClick', 'onOptionRef', 'removeValue', 'selectValue'].forEach(function (fn) {
			return _this[fn] = _this[fn].bind(_this);
		});

		_this.state = {
			inputValue: '',
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false,
			required: false
		};
		return _this;
	}

	createClass(Select, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this._instancePrefix = 'react-select-' + (this.props.instanceId || ++instanceId) + '-';
			var valueArray = this.getValueArray(this.props.value);

			if (this.props.required) {
				this.setState({
					required: handleRequired(valueArray[0], this.props.multi)
				});
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (typeof this.props.autofocus !== 'undefined' && typeof console !== 'undefined') {
				console.warn('Warning: The autofocus prop has changed to autoFocus, support will be removed after react-select@1.0');
			}
			if (this.props.autoFocus || this.props.autofocus) {
				this.focus();
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var valueArray = this.getValueArray(nextProps.value, nextProps);

			if (nextProps.required) {
				this.setState({
					required: handleRequired(valueArray[0], nextProps.multi)
				});
			} else if (this.props.required) {
				// Used to be required but it's not any more
				this.setState({ required: false });
			}

			if (this.state.inputValue && this.props.value !== nextProps.value && nextProps.onSelectResetsInput) {
				this.setState({ inputValue: this.handleInputValueChange('') });
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			// focus to the selected option
			if (this.menu && this.focused && this.state.isOpen && !this.hasScrolledToOption) {
				var focusedOptionNode = findDOMNode(this.focused);
				var menuNode = findDOMNode(this.menu);

				var scrollTop = menuNode.scrollTop;
				var scrollBottom = scrollTop + menuNode.offsetHeight;
				var optionTop = focusedOptionNode.offsetTop;
				var optionBottom = optionTop + focusedOptionNode.offsetHeight;

				if (scrollTop > optionTop || scrollBottom < optionBottom) {
					menuNode.scrollTop = focusedOptionNode.offsetTop;
				}

				// We still set hasScrolledToOption to true even if we didn't
				// actually need to scroll, as we've still confirmed that the
				// option is in view.
				this.hasScrolledToOption = true;
			} else if (!this.state.isOpen) {
				this.hasScrolledToOption = false;
			}

			if (this._scrollToFocusedOptionOnUpdate && this.focused && this.menu) {
				this._scrollToFocusedOptionOnUpdate = false;
				var focusedDOM = findDOMNode(this.focused);
				var menuDOM = findDOMNode(this.menu);
				var focusedRect = focusedDOM.getBoundingClientRect();
				var menuRect = menuDOM.getBoundingClientRect();
				if (focusedRect.bottom > menuRect.bottom) {
					menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
				} else if (focusedRect.top < menuRect.top) {
					menuDOM.scrollTop = focusedDOM.offsetTop;
				}
			}
			if (this.props.scrollMenuIntoView && this.menuContainer) {
				var menuContainerRect = this.menuContainer.getBoundingClientRect();
				if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
					window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
				}
			}
			if (prevProps.disabled !== this.props.disabled) {
				this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
				this.closeMenu();
			}
			if (prevState.isOpen !== this.state.isOpen) {
				this.toggleTouchOutsideEvent(this.state.isOpen);
				var handler = this.state.isOpen ? this.props.onOpen : this.props.onClose;
				handler && handler();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.toggleTouchOutsideEvent(false);
		}
	}, {
		key: 'toggleTouchOutsideEvent',
		value: function toggleTouchOutsideEvent(enabled) {
			var eventTogglerName = enabled ? document.addEventListener ? 'addEventListener' : 'attachEvent' : document.removeEventListener ? 'removeEventListener' : 'detachEvent';
			var pref = document.addEventListener ? '' : 'on';

			document[eventTogglerName](pref + 'touchstart', this.handleTouchOutside);
			document[eventTogglerName](pref + 'mousedown', this.handleTouchOutside);
		}
	}, {
		key: 'handleTouchOutside',
		value: function handleTouchOutside(event) {
			// handle touch outside on ios to dismiss menu
			if (this.wrapper && !this.wrapper.contains(event.target)) {
				this.closeMenu();
			}
		}
	}, {
		key: 'focus',
		value: function focus() {
			if (!this.input) return;
			this.input.focus();
		}
	}, {
		key: 'blurInput',
		value: function blurInput() {
			if (!this.input) return;
			this.input.blur();
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove() {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart() {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'handleTouchEnd',
		value: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.handleMouseDown(event);
		}
	}, {
		key: 'handleTouchEndClearValue',
		value: function handleTouchEndClearValue(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Clear the value
			this.clearValue(event);
		}
	}, {
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			if (event.target.tagName === 'INPUT') {
				if (!this.state.isFocused) {
					this._openAfterFocus = this.props.openOnClick;
					this.focus();
				} else if (!this.state.isOpen) {
					this.setState({
						isOpen: true,
						isPseudoFocused: false,
						focusedOption: null
					});
				}

				return;
			}

			// prevent default event handlers
			event.preventDefault();

			// for the non-searchable select, toggle the menu
			if (!this.props.searchable) {
				// This code means that if a select is searchable, onClick the options menu will not appear, only on subsequent click will it open.
				this.focus();
				return this.setState({
					isOpen: !this.state.isOpen,
					focusedOption: null
				});
			}

			if (this.state.isFocused) {
				// On iOS, we can get into a state where we think the input is focused but it isn't really,
				// since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
				// Call focus() again here to be safe.
				this.focus();

				var input = this.input;
				var toOpen = true;

				if (typeof input.getInput === 'function') {
					// Get the actual DOM input if the ref is an <AutosizeInput /> component
					input = input.getInput();
				}

				// clears the value so that the cursor will be at the end of input when the component re-renders
				input.value = '';

				if (this._focusAfterClear) {
					toOpen = false;
					this._focusAfterClear = false;
				}

				// if the input is focused, ensure the menu is open
				this.setState({
					isOpen: toOpen,
					isPseudoFocused: false,
					focusedOption: null
				});
			} else {
				// otherwise, focus the input and open the menu
				this._openAfterFocus = this.props.openOnClick;
				this.focus();
				this.setState({ focusedOption: null });
			}
		}
	}, {
		key: 'handleMouseDownOnArrow',
		value: function handleMouseDownOnArrow(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			if (this.state.isOpen) {
				// prevent default event handlers
				event.stopPropagation();
				event.preventDefault();
				// close the menu
				this.closeMenu();
			} else {
				// If the menu isn't open, let the event bubble to the main handleMouseDown
				this.setState({
					isOpen: true
				});
			}
		}
	}, {
		key: 'handleMouseDownOnMenu',
		value: function handleMouseDownOnMenu(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			event.stopPropagation();
			event.preventDefault();

			this._openAfterFocus = true;
			this.focus();
		}
	}, {
		key: 'closeMenu',
		value: function closeMenu() {
			if (this.props.onCloseResetsInput) {
				this.setState({
					inputValue: this.handleInputValueChange(''),
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi
				});
			} else {
				this.setState({
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi
				});
			}
			this.hasScrolledToOption = false;
		}
	}, {
		key: 'handleInputFocus',
		value: function handleInputFocus(event) {
			if (this.props.disabled) return;

			var toOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
			toOpen = this._focusAfterClear ? false : toOpen; //if focus happens after clear values, don't open dropdown yet.

			if (this.props.onFocus) {
				this.props.onFocus(event);
			}

			this.setState({
				isFocused: true,
				isOpen: !!toOpen
			});

			this._focusAfterClear = false;
			this._openAfterFocus = false;
		}
	}, {
		key: 'handleInputBlur',
		value: function handleInputBlur(event) {
			// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
			if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
				this.focus();
				return;
			}

			if (this.props.onBlur) {
				this.props.onBlur(event);
			}
			var onBlurredState = {
				isFocused: false,
				isOpen: false,
				isPseudoFocused: false
			};
			if (this.props.onBlurResetsInput) {
				onBlurredState.inputValue = this.handleInputValueChange('');
			}
			this.setState(onBlurredState);
		}
	}, {
		key: 'handleInputChange',
		value: function handleInputChange(event) {
			var newInputValue = event.target.value;

			if (this.state.inputValue !== event.target.value) {
				newInputValue = this.handleInputValueChange(newInputValue);
			}

			this.setState({
				inputValue: newInputValue,
				isOpen: true,
				isPseudoFocused: false
			});
		}
	}, {
		key: 'setInputValue',
		value: function setInputValue(newValue) {
			if (this.props.onInputChange) {
				var nextState = this.props.onInputChange(newValue);
				if (nextState != null && (typeof nextState === 'undefined' ? 'undefined' : _typeof(nextState)) !== 'object') {
					newValue = '' + nextState;
				}
			}
			this.setState({
				inputValue: newValue
			});
		}
	}, {
		key: 'handleInputValueChange',
		value: function handleInputValueChange(newValue) {
			if (this.props.onInputChange) {
				var nextState = this.props.onInputChange(newValue);
				// Note: != used deliberately here to catch undefined and null
				if (nextState != null && (typeof nextState === 'undefined' ? 'undefined' : _typeof(nextState)) !== 'object') {
					newValue = '' + nextState;
				}
			}
			return newValue;
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(event) {
			if (this.props.disabled) return;

			if (typeof this.props.onInputKeyDown === 'function') {
				this.props.onInputKeyDown(event);
				if (event.defaultPrevented) {
					return;
				}
			}

			switch (event.keyCode) {
				case 8:
					// backspace
					if (!this.state.inputValue && this.props.backspaceRemoves) {
						event.preventDefault();
						this.popValue();
					}
					break;
				case 9:
					// tab
					if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
						break;
					}
					event.preventDefault();
					this.selectFocusedOption();
					break;
				case 13:
					// enter
					event.preventDefault();
					event.stopPropagation();
					if (this.state.isOpen) {
						this.selectFocusedOption();
					} else {
						this.focusNextOption();
					}
					break;
				case 27:
					// escape
					event.preventDefault();
					if (this.state.isOpen) {
						this.closeMenu();
						event.stopPropagation();
					} else if (this.props.clearable && this.props.escapeClearsValue) {
						this.clearValue(event);
						event.stopPropagation();
					}
					break;
				case 32:
					// space
					if (this.props.searchable) {
						break;
					}
					event.preventDefault();
					if (!this.state.isOpen) {
						this.focusNextOption();
						break;
					}
					event.stopPropagation();
					this.selectFocusedOption();
					break;
				case 38:
					// up
					event.preventDefault();
					this.focusPreviousOption();
					break;
				case 40:
					// down
					event.preventDefault();
					this.focusNextOption();
					break;
				case 33:
					// page up
					event.preventDefault();
					this.focusPageUpOption();
					break;
				case 34:
					// page down
					event.preventDefault();
					this.focusPageDownOption();
					break;
				case 35:
					// end key
					if (event.shiftKey) {
						break;
					}
					event.preventDefault();
					this.focusEndOption();
					break;
				case 36:
					// home key
					if (event.shiftKey) {
						break;
					}
					event.preventDefault();
					this.focusStartOption();
					break;
				case 46:
					// delete
					if (!this.state.inputValue && this.props.deleteRemoves) {
						event.preventDefault();
						this.popValue();
					}
					break;
			}
		}
	}, {
		key: 'handleValueClick',
		value: function handleValueClick(option, event) {
			if (!this.props.onValueClick) return;
			this.props.onValueClick(option, event);
		}
	}, {
		key: 'handleMenuScroll',
		value: function handleMenuScroll(event) {
			if (!this.props.onMenuScrollToBottom) return;
			var target = event.target;

			if (target.scrollHeight > target.offsetHeight && target.scrollHeight - target.offsetHeight - target.scrollTop <= 0) {
				this.props.onMenuScrollToBottom();
			}
		}
	}, {
		key: 'getOptionLabel',
		value: function getOptionLabel(op) {
			return op[this.props.labelKey];
		}

		/**
   * Turns a value into an array from the given options
   * @param {String|Number|Array} value		- the value of the select input
   * @param {Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
   * @returns	{Array}	the value of the select represented in an array
   */

	}, {
		key: 'getValueArray',
		value: function getValueArray(value) {
			var nextProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

			/** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
			var props = (typeof nextProps === 'undefined' ? 'undefined' : _typeof(nextProps)) === 'object' ? nextProps : this.props;
			if (props.multi) {
				if (typeof value === 'string') {
					value = value.split(props.delimiter);
				}
				if (!Array.isArray(value)) {
					if (value === null || value === undefined) return [];
					value = [value];
				}
				return value.map(function (value) {
					return expandValue(value, props);
				}).filter(function (i) {
					return i;
				});
			}
			var expandedValue = expandValue(value, props);
			return expandedValue ? [expandedValue] : [];
		}
	}, {
		key: 'setValue',
		value: function setValue(value) {
			var _this2 = this;

			if (this.props.autoBlur) {
				this.blurInput();
			}
			if (this.props.required) {
				var required = handleRequired(value, this.props.multi);
				this.setState({ required: required });
			}
			if (this.props.simpleValue && value) {
				value = this.props.multi ? value.map(function (i) {
					return i[_this2.props.valueKey];
				}).join(this.props.delimiter) : value[this.props.valueKey];
			}
			if (this.props.onChange) {
				this.props.onChange(value);
			}
		}
	}, {
		key: 'selectValue',
		value: function selectValue(value) {
			var _this3 = this;

			// NOTE: we actually add/set the value in a callback to make sure the
			// input value is empty to avoid styling issues in Chrome
			if (this.props.closeOnSelect) {
				this.hasScrolledToOption = false;
			}
			var updatedValue = this.props.onSelectResetsInput ? '' : this.state.inputValue;
			if (this.props.multi) {
				this.setState({
					focusedIndex: null,
					inputValue: this.handleInputValueChange(updatedValue),
					isOpen: !this.props.closeOnSelect
				}, function () {
					var valueArray = _this3.getValueArray(_this3.props.value);
					if (valueArray.some(function (i) {
						return i[_this3.props.valueKey] === value[_this3.props.valueKey];
					})) {
						_this3.removeValue(value);
					} else {
						_this3.addValue(value);
					}
				});
			} else {
				this.setState({
					inputValue: this.handleInputValueChange(updatedValue),
					isOpen: !this.props.closeOnSelect,
					isPseudoFocused: this.state.isFocused
				}, function () {
					_this3.setValue(value);
				});
			}
		}
	}, {
		key: 'addValue',
		value: function addValue(value) {
			var valueArray = this.getValueArray(this.props.value);
			var visibleOptions = this._visibleOptions.filter(function (val) {
				return !val.disabled;
			});
			var lastValueIndex = visibleOptions.indexOf(value);
			this.setValue(valueArray.concat(value));
			if (!this.props.closeOnSelect) {
				return;
			}
			if (visibleOptions.length - 1 === lastValueIndex) {
				// the last option was selected; focus the second-last one
				this.focusOption(visibleOptions[lastValueIndex - 1]);
			} else if (visibleOptions.length > lastValueIndex) {
				// focus the option below the selected one
				this.focusOption(visibleOptions[lastValueIndex + 1]);
			}
		}
	}, {
		key: 'popValue',
		value: function popValue() {
			var valueArray = this.getValueArray(this.props.value);
			if (!valueArray.length) return;
			if (valueArray[valueArray.length - 1].clearableValue === false) return;
			this.setValue(this.props.multi ? valueArray.slice(0, valueArray.length - 1) : null);
		}
	}, {
		key: 'removeValue',
		value: function removeValue(value) {
			var _this4 = this;

			var valueArray = this.getValueArray(this.props.value);
			this.setValue(valueArray.filter(function (i) {
				return i[_this4.props.valueKey] !== value[_this4.props.valueKey];
			}));
			this.focus();
		}
	}, {
		key: 'clearValue',
		value: function clearValue(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, ignore it.
			if (event && event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			event.preventDefault();

			this.setValue(this.getResetValue());
			this.setState({
				inputValue: this.handleInputValueChange(''),
				isOpen: false
			}, this.focus);

			this._focusAfterClear = true;
		}
	}, {
		key: 'getResetValue',
		value: function getResetValue() {
			if (this.props.resetValue !== undefined) {
				return this.props.resetValue;
			} else if (this.props.multi) {
				return [];
			} else {
				return null;
			}
		}
	}, {
		key: 'focusOption',
		value: function focusOption(option) {
			this.setState({
				focusedOption: option
			});
		}
	}, {
		key: 'focusNextOption',
		value: function focusNextOption() {
			this.focusAdjacentOption('next');
		}
	}, {
		key: 'focusPreviousOption',
		value: function focusPreviousOption() {
			this.focusAdjacentOption('previous');
		}
	}, {
		key: 'focusPageUpOption',
		value: function focusPageUpOption() {
			this.focusAdjacentOption('page_up');
		}
	}, {
		key: 'focusPageDownOption',
		value: function focusPageDownOption() {
			this.focusAdjacentOption('page_down');
		}
	}, {
		key: 'focusStartOption',
		value: function focusStartOption() {
			this.focusAdjacentOption('start');
		}
	}, {
		key: 'focusEndOption',
		value: function focusEndOption() {
			this.focusAdjacentOption('end');
		}
	}, {
		key: 'focusAdjacentOption',
		value: function focusAdjacentOption(dir) {
			var options = this._visibleOptions.map(function (option, index) {
				return { option: option, index: index };
			}).filter(function (option) {
				return !option.option.disabled;
			});
			this._scrollToFocusedOptionOnUpdate = true;
			if (!this.state.isOpen) {
				var newState = {
					focusedOption: this._focusedOption || (options.length ? options[dir === 'next' ? 0 : options.length - 1].option : null),
					isOpen: true
				};
				if (this.props.onSelectResetsInput) {
					newState.inputValue = '';
				}
				this.setState(newState);
				return;
			}
			if (!options.length) return;
			var focusedIndex = -1;
			for (var i = 0; i < options.length; i++) {
				if (this._focusedOption === options[i].option) {
					focusedIndex = i;
					break;
				}
			}
			if (dir === 'next' && focusedIndex !== -1) {
				focusedIndex = (focusedIndex + 1) % options.length;
			} else if (dir === 'previous') {
				if (focusedIndex > 0) {
					focusedIndex = focusedIndex - 1;
				} else {
					focusedIndex = options.length - 1;
				}
			} else if (dir === 'start') {
				focusedIndex = 0;
			} else if (dir === 'end') {
				focusedIndex = options.length - 1;
			} else if (dir === 'page_up') {
				var potentialIndex = focusedIndex - this.props.pageSize;
				if (potentialIndex < 0) {
					focusedIndex = 0;
				} else {
					focusedIndex = potentialIndex;
				}
			} else if (dir === 'page_down') {
				var _potentialIndex = focusedIndex + this.props.pageSize;
				if (_potentialIndex > options.length - 1) {
					focusedIndex = options.length - 1;
				} else {
					focusedIndex = _potentialIndex;
				}
			}

			if (focusedIndex === -1) {
				focusedIndex = 0;
			}

			this.setState({
				focusedIndex: options[focusedIndex].index,
				focusedOption: options[focusedIndex].option
			});
		}
	}, {
		key: 'getFocusedOption',
		value: function getFocusedOption() {
			return this._focusedOption;
		}
	}, {
		key: 'selectFocusedOption',
		value: function selectFocusedOption() {
			if (this._focusedOption) {
				return this.selectValue(this._focusedOption);
			}
		}
	}, {
		key: 'renderLoading',
		value: function renderLoading() {
			if (!this.props.isLoading) return;
			return React.createElement(
				'span',
				{ className: 'Select-loading-zone', 'aria-hidden': 'true' },
				React.createElement('span', { className: 'Select-loading' })
			);
		}
	}, {
		key: 'renderValue',
		value: function renderValue(valueArray, isOpen) {
			var _this5 = this;

			var renderLabel = this.props.valueRenderer || this.getOptionLabel;
			var ValueComponent = this.props.valueComponent;
			if (!valueArray.length) {
				var showPlaceholder = shouldShowPlaceholder(this.state, this.props, isOpen);
				return showPlaceholder ? React.createElement(
					'div',
					{ className: 'Select-placeholder' },
					this.props.placeholder
				) : null;
			}
			var onClick = this.props.onValueClick ? this.handleValueClick : null;
			if (this.props.multi) {
				return valueArray.map(function (value, i) {
					return React.createElement(
						ValueComponent,
						{
							disabled: _this5.props.disabled || value.clearableValue === false,
							id: _this5._instancePrefix + '-value-' + i,
							instancePrefix: _this5._instancePrefix,
							key: 'value-' + i + '-' + value[_this5.props.valueKey],
							onClick: onClick,
							onRemove: _this5.removeValue,
							placeholder: _this5.props.placeholder,
							value: value,
							values: valueArray
						},
						renderLabel(value, i),
						React.createElement(
							'span',
							{ className: 'Select-aria-only' },
							'\xA0'
						)
					);
				});
			} else if (shouldShowValue(this.state, this.props)) {
				if (isOpen) onClick = null;
				return React.createElement(
					ValueComponent,
					{
						disabled: this.props.disabled,
						id: this._instancePrefix + '-value-item',
						instancePrefix: this._instancePrefix,
						onClick: onClick,
						placeholder: this.props.placeholder,
						value: valueArray[0]
					},
					renderLabel(valueArray[0])
				);
			}
		}
	}, {
		key: 'renderInput',
		value: function renderInput(valueArray, focusedOptionIndex) {
			var _classNames,
			    _this6 = this;

			var className = classNames('Select-input', this.props.inputProps.className);
			var isOpen = this.state.isOpen;

			var ariaOwns = classNames((_classNames = {}, defineProperty(_classNames, this._instancePrefix + '-list', isOpen), defineProperty(_classNames, this._instancePrefix + '-backspace-remove-message', this.props.multi && !this.props.disabled && this.state.isFocused && !this.state.inputValue), _classNames));

			var value = this.state.inputValue;
			if (value && !this.props.onSelectResetsInput && !this.state.isFocused) {
				// it hides input value when it is not focused and was not reset on select
				value = '';
			}

			var inputProps = _extends({}, this.props.inputProps, {
				'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
				'aria-describedby': this.props['aria-describedby'],
				'aria-expanded': '' + isOpen,
				'aria-haspopup': '' + isOpen,
				'aria-label': this.props['aria-label'],
				'aria-labelledby': this.props['aria-labelledby'],
				'aria-owns': ariaOwns,
				onBlur: this.handleInputBlur,
				onChange: this.handleInputChange,
				onFocus: this.handleInputFocus,
				ref: function ref(_ref) {
					return _this6.input = _ref;
				},
				role: 'combobox',
				required: this.state.required,
				tabIndex: this.props.tabIndex,
				value: value
			});

			if (this.props.inputRenderer) {
				return this.props.inputRenderer(inputProps);
			}

			if (this.props.disabled || !this.props.searchable) {
				var divProps = objectWithoutProperties(this.props.inputProps, []);


				var _ariaOwns = classNames(defineProperty({}, this._instancePrefix + '-list', isOpen));
				return React.createElement('div', _extends({}, divProps, {
					'aria-expanded': isOpen,
					'aria-owns': _ariaOwns,
					'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
					'aria-disabled': '' + this.props.disabled,
					'aria-label': this.props['aria-label'],
					'aria-labelledby': this.props['aria-labelledby'],
					className: className,
					onBlur: this.handleInputBlur,
					onFocus: this.handleInputFocus,
					ref: function ref(_ref2) {
						return _this6.input = _ref2;
					},
					role: 'combobox',
					style: { border: 0, width: 1, display: 'inline-block' },
					tabIndex: this.props.tabIndex || 0
				}));
			}

			if (this.props.autosize) {
				return React.createElement(AutosizeInput, _extends({ id: this.props.id }, inputProps, { className: className, minWidth: '5' }));
			}
			return React.createElement(
				'div',
				{ className: className, key: 'input-wrap', style: { display: 'inline-block' } },
				React.createElement('input', _extends({ id: this.props.id }, inputProps))
			);
		}
	}, {
		key: 'renderClear',
		value: function renderClear() {
			var valueArray = this.getValueArray(this.props.value);
			if (!this.props.clearable || !valueArray.length || this.props.disabled || this.props.isLoading) return;
			var ariaLabel = this.props.multi ? this.props.clearAllText : this.props.clearValueText;
			var clear = this.props.clearRenderer();

			return React.createElement(
				'span',
				{
					'aria-label': ariaLabel,
					className: 'Select-clear-zone',
					onMouseDown: this.clearValue,
					onTouchEnd: this.handleTouchEndClearValue,
					onTouchMove: this.handleTouchMove,
					onTouchStart: this.handleTouchStart,
					title: ariaLabel
				},
				clear
			);
		}
	}, {
		key: 'renderArrow',
		value: function renderArrow() {
			if (!this.props.arrowRenderer) return;

			var onMouseDown = this.handleMouseDownOnArrow;
			var isOpen = this.state.isOpen;
			var arrow = this.props.arrowRenderer({ onMouseDown: onMouseDown, isOpen: isOpen });

			if (!arrow) {
				return null;
			}

			return React.createElement(
				'span',
				{
					className: 'Select-arrow-zone',
					onMouseDown: onMouseDown
				},
				arrow
			);
		}
	}, {
		key: 'filterOptions',
		value: function filterOptions$$1(excludeOptions) {
			var filterValue = this.state.inputValue;
			var options = this.props.options || [];
			if (this.props.filterOptions) {
				// Maintain backwards compatibility with boolean attribute
				var filterOptions$$1 = typeof this.props.filterOptions === 'function' ? this.props.filterOptions : filterOptions;

				return filterOptions$$1(options, filterValue, excludeOptions, {
					filterOption: this.props.filterOption,
					ignoreAccents: this.props.ignoreAccents,
					ignoreCase: this.props.ignoreCase,
					labelKey: this.props.labelKey,
					matchPos: this.props.matchPos,
					matchProp: this.props.matchProp,
					trimFilter: this.props.trimFilter,
					valueKey: this.props.valueKey
				});
			} else {
				return options;
			}
		}
	}, {
		key: 'onOptionRef',
		value: function onOptionRef(ref, isFocused) {
			if (isFocused) {
				this.focused = ref;
			}
		}
	}, {
		key: 'renderMenu',
		value: function renderMenu(options, valueArray, focusedOption) {
			if (options && options.length) {
				return this.props.menuRenderer({
					focusedOption: focusedOption,
					focusOption: this.focusOption,
					inputValue: this.state.inputValue,
					instancePrefix: this._instancePrefix,
					labelKey: this.props.labelKey,
					onFocus: this.focusOption,
					onOptionRef: this.onOptionRef,
					onSelect: this.selectValue,
					optionClassName: this.props.optionClassName,
					optionComponent: this.props.optionComponent,
					optionRenderer: this.props.optionRenderer || this.getOptionLabel,
					options: options,
					removeValue: this.removeValue,
					selectValue: this.selectValue,
					valueArray: valueArray,
					valueKey: this.props.valueKey
				});
			} else if (this.props.noResultsText) {
				return React.createElement(
					'div',
					{ className: 'Select-noresults' },
					this.props.noResultsText
				);
			} else {
				return null;
			}
		}
	}, {
		key: 'renderHiddenField',
		value: function renderHiddenField(valueArray) {
			var _this7 = this;

			if (!this.props.name) return;
			if (this.props.joinValues) {
				var value = valueArray.map(function (i) {
					return stringifyValue(i[_this7.props.valueKey]);
				}).join(this.props.delimiter);
				return React.createElement('input', {
					disabled: this.props.disabled,
					name: this.props.name,
					ref: function ref(_ref3) {
						return _this7.value = _ref3;
					},
					type: 'hidden',
					value: value
				});
			}
			return valueArray.map(function (item, index) {
				return React.createElement('input', {
					disabled: _this7.props.disabled,
					key: 'hidden.' + index,
					name: _this7.props.name,
					ref: 'value' + index,
					type: 'hidden',
					value: stringifyValue(item[_this7.props.valueKey])
				});
			});
		}
	}, {
		key: 'getFocusableOptionIndex',
		value: function getFocusableOptionIndex(selectedOption) {
			var options = this._visibleOptions;
			if (!options.length) return null;

			var valueKey = this.props.valueKey;
			var focusedOption = this.state.focusedOption || selectedOption;
			if (focusedOption && !focusedOption.disabled) {
				var focusedOptionIndex = -1;
				options.some(function (option, index) {
					var isOptionEqual = option[valueKey] === focusedOption[valueKey];
					if (isOptionEqual) {
						focusedOptionIndex = index;
					}
					return isOptionEqual;
				});
				if (focusedOptionIndex !== -1) {
					return focusedOptionIndex;
				}
			}

			for (var i = 0; i < options.length; i++) {
				if (!options[i].disabled) return i;
			}
			return null;
		}
	}, {
		key: 'renderOuter',
		value: function renderOuter(options, valueArray, focusedOption) {
			var _this8 = this;

			var menu = this.renderMenu(options, valueArray, focusedOption);
			if (!menu) {
				return null;
			}

			return React.createElement(
				'div',
				{ ref: function ref(_ref5) {
						return _this8.menuContainer = _ref5;
					}, className: 'Select-menu-outer', style: this.props.menuContainerStyle },
				React.createElement(
					'div',
					{
						className: 'Select-menu',
						id: this._instancePrefix + '-list',
						onMouseDown: this.handleMouseDownOnMenu,
						onScroll: this.handleMenuScroll,
						ref: function ref(_ref4) {
							return _this8.menu = _ref4;
						},
						role: 'listbox',
						style: this.props.menuStyle,
						tabIndex: -1
					},
					menu
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this9 = this;

			var valueArray = this.getValueArray(this.props.value);
			var options = this._visibleOptions = this.filterOptions(this.props.multi && this.props.removeSelected ? valueArray : null);
			var isOpen = this.state.isOpen;
			if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
			var focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

			var focusedOption = null;
			if (focusedOptionIndex !== null) {
				focusedOption = this._focusedOption = options[focusedOptionIndex];
			} else {
				focusedOption = this._focusedOption = null;
			}
			var className = classNames('Select', this.props.className, {
				'has-value': valueArray.length,
				'is-clearable': this.props.clearable,
				'is-disabled': this.props.disabled,
				'is-focused': this.state.isFocused,
				'is-loading': this.props.isLoading,
				'is-open': isOpen,
				'is-pseudo-focused': this.state.isPseudoFocused,
				'is-searchable': this.props.searchable,
				'Select--multi': this.props.multi,
				'Select--rtl': this.props.rtl,
				'Select--single': !this.props.multi
			});

			var removeMessage = null;
			if (this.props.multi && !this.props.disabled && valueArray.length && !this.state.inputValue && this.state.isFocused && this.props.backspaceRemoves) {
				removeMessage = React.createElement(
					'span',
					{ id: this._instancePrefix + '-backspace-remove-message', className: 'Select-aria-only', 'aria-live': 'assertive' },
					this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey])
				);
			}

			return React.createElement(
				'div',
				{ ref: function ref(_ref7) {
						return _this9.wrapper = _ref7;
					},
					className: className,
					style: this.props.wrapperStyle },
				this.renderHiddenField(valueArray),
				React.createElement(
					'div',
					{ ref: function ref(_ref6) {
							return _this9.control = _ref6;
						},
						className: 'Select-control',
						onKeyDown: this.handleKeyDown,
						onMouseDown: this.handleMouseDown,
						onTouchEnd: this.handleTouchEnd,
						onTouchMove: this.handleTouchMove,
						onTouchStart: this.handleTouchStart,
						style: this.props.style
					},
					React.createElement(
						'div',
						{ className: 'Select-multi-value-wrapper', id: this._instancePrefix + '-value' },
						this.renderValue(valueArray, isOpen),
						this.renderInput(valueArray, focusedOptionIndex)
					),
					removeMessage,
					this.renderLoading(),
					this.renderClear(),
					this.renderArrow()
				),
				isOpen ? this.renderOuter(options, valueArray, focusedOption) : null
			);
		}
	}]);
	return Select;
}(React.Component);

Select$1.propTypes = {
	'aria-describedby': PropTypes.string, // html id(s) of element(s) that should be used to describe this input (for assistive tech)
	'aria-label': PropTypes.string, // aria label (for assistive tech)
	'aria-labelledby': PropTypes.string, // html id of an element that should be used as the label (for assistive tech)
	arrowRenderer: PropTypes.func, // create the drop-down caret element
	autoBlur: PropTypes.bool, // automatically blur the component when an option is selected
	autoFocus: PropTypes.bool, // autofocus the component on mount
	autofocus: PropTypes.bool, // deprecated; use autoFocus instead
	autosize: PropTypes.bool, // whether to enable autosizing or not
	backspaceRemoves: PropTypes.bool, // whether backspace removes an item if there is no text input
	backspaceToRemoveMessage: PropTypes.string, // message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
	className: PropTypes.string, // className for the outer element
	clearAllText: stringOrNode, // title for the "clear" control when multi: true
	clearRenderer: PropTypes.func, // create clearable x element
	clearValueText: stringOrNode, // title for the "clear" control
	clearable: PropTypes.bool, // should it be possible to reset value
	closeOnSelect: PropTypes.bool, // whether to close the menu when a value is selected
	deleteRemoves: PropTypes.bool, // whether delete removes an item if there is no text input
	delimiter: PropTypes.string, // delimiter to use to join multiple values for the hidden field value
	disabled: PropTypes.bool, // whether the Select is disabled or not
	escapeClearsValue: PropTypes.bool, // whether escape clears the value when the menu is closed
	filterOption: PropTypes.func, // method to filter a single option (option, filterString)
	filterOptions: PropTypes.any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
	id: PropTypes.string, // html id to set on the input element for accessibility or tests
	ignoreAccents: PropTypes.bool, // whether to strip diacritics when filtering
	ignoreCase: PropTypes.bool, // whether to perform case-insensitive filtering
	inputProps: PropTypes.object, // custom attributes for the Input
	inputRenderer: PropTypes.func, // returns a custom input component
	instanceId: PropTypes.string, // set the components instanceId
	isLoading: PropTypes.bool, // whether the Select is loading externally or not (such as options being loaded)
	joinValues: PropTypes.bool, // joins multiple values into a single form field with the delimiter (legacy mode)
	labelKey: PropTypes.string, // path of the label value in option objects
	matchPos: PropTypes.string, // (any|start) match the start or entire string when filtering
	matchProp: PropTypes.string, // (any|label|value) which option property to filter on
	menuBuffer: PropTypes.number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
	menuContainerStyle: PropTypes.object, // optional style to apply to the menu container
	menuRenderer: PropTypes.func, // renders a custom menu with options
	menuStyle: PropTypes.object, // optional style to apply to the menu
	multi: PropTypes.bool, // multi-value input
	name: PropTypes.string, // generates a hidden <input /> tag with this field name for html forms
	noResultsText: stringOrNode, // placeholder displayed when there are no matching search results
	onBlur: PropTypes.func, // onBlur handler: function (event) {}
	onBlurResetsInput: PropTypes.bool, // whether input is cleared on blur
	onChange: PropTypes.func, // onChange handler: function (newValue) {}
	onClose: PropTypes.func, // fires when the menu is closed
	onCloseResetsInput: PropTypes.bool, // whether input is cleared when menu is closed through the arrow
	onFocus: PropTypes.func, // onFocus handler: function (event) {}
	onInputChange: PropTypes.func, // onInputChange handler: function (inputValue) {}
	onInputKeyDown: PropTypes.func, // input keyDown handler: function (event) {}
	onMenuScrollToBottom: PropTypes.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
	onOpen: PropTypes.func, // fires when the menu is opened
	onSelectResetsInput: PropTypes.bool, // whether input is cleared on select (works only for multiselect)
	onValueClick: PropTypes.func, // onClick handler for value labels: function (value, event) {}
	openOnClick: PropTypes.bool, // boolean to control opening the menu when the control is clicked
	openOnFocus: PropTypes.bool, // always open options menu on focus
	optionClassName: PropTypes.string, // additional class(es) to apply to the <Option /> elements
	optionComponent: PropTypes.func, // option component to render in dropdown
	optionRenderer: PropTypes.func, // optionRenderer: function (option) {}
	options: PropTypes.array, // array of options
	pageSize: PropTypes.number, // number of entries to page when using page up/down keys
	placeholder: stringOrNode, // field placeholder, displayed when there's no value
	removeSelected: PropTypes.bool, // whether the selected option is removed from the dropdown on multi selects
	required: PropTypes.bool, // applies HTML5 required attribute when needed
	resetValue: PropTypes.any, // value to use when you clear the control
	rtl: PropTypes.bool, // set to true in order to use react-select in right-to-left direction
	scrollMenuIntoView: PropTypes.bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
	searchable: PropTypes.bool, // whether to enable searching feature or not
	simpleValue: PropTypes.bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
	style: PropTypes.object, // optional style to apply to the control
	tabIndex: stringOrNumber, // optional tab index of the control
	tabSelectsValue: PropTypes.bool, // whether to treat tabbing out while focused to be value selection
	trimFilter: PropTypes.bool, // whether to trim whitespace around filter value
	value: PropTypes.any, // initial field value
	valueComponent: PropTypes.func, // value component to render
	valueKey: PropTypes.string, // path of the label value in option objects
	valueRenderer: PropTypes.func, // valueRenderer: function (option) {}
	wrapperStyle: PropTypes.object // optional style to apply to the component wrapper
};

Select$1.defaultProps = {
	arrowRenderer: arrowRenderer,
	autosize: true,
	backspaceRemoves: true,
	backspaceToRemoveMessage: 'Press backspace to remove {label}',
	clearable: true,
	clearAllText: 'Clear all',
	clearRenderer: clearRenderer,
	clearValueText: 'Clear value',
	closeOnSelect: true,
	deleteRemoves: true,
	delimiter: ',',
	disabled: false,
	escapeClearsValue: true,
	filterOptions: filterOptions,
	ignoreAccents: true,
	ignoreCase: true,
	inputProps: {},
	isLoading: false,
	joinValues: false,
	labelKey: 'label',
	matchPos: 'any',
	matchProp: 'any',
	menuBuffer: 0,
	menuRenderer: menuRenderer,
	multi: false,
	noResultsText: 'No results found',
	onBlurResetsInput: true,
	onCloseResetsInput: true,
	onSelectResetsInput: true,
	openOnClick: true,
	optionComponent: Option,
	pageSize: 5,
	placeholder: 'Select...',
	removeSelected: true,
	required: false,
	rtl: false,
	scrollMenuIntoView: true,
	searchable: true,
	simpleValue: false,
	tabSelectsValue: true,
	trimFilter: true,
	valueComponent: Value,
	valueKey: 'value'
};

var propTypes$7 = {
	autoload: PropTypes.bool.isRequired, // automatically call the `loadOptions` prop on-mount; defaults to true
	cache: PropTypes.any, // object to use to cache results; set to null/false to disable caching
	children: PropTypes.func.isRequired, // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
	ignoreAccents: PropTypes.bool, // strip diacritics when filtering; defaults to true
	ignoreCase: PropTypes.bool, // perform case-insensitive filtering; defaults to true
	loadOptions: PropTypes.func.isRequired, // callback to load options asynchronously; (inputValue: string, callback: Function): ?Promise
	loadingPlaceholder: PropTypes.oneOfType([// replaces the placeholder while options are loading
	PropTypes.string, PropTypes.node]),
	multi: PropTypes.bool, // multi-value input
	noResultsText: PropTypes.oneOfType([// field noResultsText, displayed when no options come back from the server
	PropTypes.string, PropTypes.node]),
	onChange: PropTypes.func, // onChange handler: function (newValue) {}
	onInputChange: PropTypes.func, // optional for keeping track of what is being typed
	options: PropTypes.array.isRequired, // array of options
	placeholder: PropTypes.oneOfType([// field placeholder, displayed when there's no value (shared with Select)
	PropTypes.string, PropTypes.node]),
	searchPromptText: PropTypes.oneOfType([// label to prompt for search input
	PropTypes.string, PropTypes.node]),
	value: PropTypes.any // initial field value
};

var defaultCache = {};

var defaultChildren = function defaultChildren(props) {
	return React.createElement(Select$1, props);
};

var defaultProps$1 = {
	autoload: true,
	cache: defaultCache,
	children: defaultChildren,
	ignoreAccents: true,
	ignoreCase: true,
	loadingPlaceholder: 'Loading...',
	options: [],
	searchPromptText: 'Type to search'
};

var Async = function (_Component) {
	inherits(Async, _Component);

	function Async(props, context) {
		classCallCheck(this, Async);

		var _this = possibleConstructorReturn(this, (Async.__proto__ || Object.getPrototypeOf(Async)).call(this, props, context));

		_this._cache = props.cache === defaultCache ? {} : props.cache;

		_this.state = {
			inputValue: '',
			isLoading: false,
			options: props.options
		};

		_this.onInputChange = _this.onInputChange.bind(_this);
		return _this;
	}

	createClass(Async, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var autoload = this.props.autoload;


			if (autoload) {
				this.loadOptions('');
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.options !== this.props.options) {
				this.setState({
					options: nextProps.options
				});
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this._callback = null;
		}
	}, {
		key: 'loadOptions',
		value: function loadOptions(inputValue) {
			var _this2 = this;

			var loadOptions = this.props.loadOptions;

			var cache = this._cache;

			if (cache && Object.prototype.hasOwnProperty.call(cache, inputValue)) {
				this._callback = null;

				this.setState({
					isLoading: false,
					options: cache[inputValue]
				});

				return;
			}

			var callback = function callback(error, data) {
				var options = data && data.options || [];

				if (cache) {
					cache[inputValue] = options;
				}

				if (callback === _this2._callback) {
					_this2._callback = null;

					_this2.setState({
						isLoading: false,
						options: options
					});
				}
			};

			// Ignore all but the most recent request
			this._callback = callback;

			var promise = loadOptions(inputValue, callback);
			if (promise) {
				promise.then(function (data) {
					return callback(null, data);
				}, function (error) {
					return callback();
				});
			}

			if (this._callback && !this.state.isLoading) {
				this.setState({
					isLoading: true
				});
			}
		}
	}, {
		key: 'onInputChange',
		value: function onInputChange(inputValue) {
			var _props = this.props,
			    ignoreAccents = _props.ignoreAccents,
			    ignoreCase = _props.ignoreCase,
			    onInputChange = _props.onInputChange;

			var newInputValue = inputValue;

			if (onInputChange) {
				var value = onInputChange(newInputValue);
				// Note: != used deliberately here to catch undefined and null
				if (value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
					newInputValue = '' + value;
				}
			}

			var transformedInputValue = newInputValue;

			if (ignoreAccents) {
				transformedInputValue = stripDiacritics(transformedInputValue);
			}

			if (ignoreCase) {
				transformedInputValue = transformedInputValue.toLowerCase();
			}

			this.setState({ inputValue: newInputValue });
			this.loadOptions(transformedInputValue);

			// Return new input value, but without applying toLowerCase() to avoid modifying the user's view case of the input while typing.
			return newInputValue;
		}
	}, {
		key: 'noResultsText',
		value: function noResultsText() {
			var _props2 = this.props,
			    loadingPlaceholder = _props2.loadingPlaceholder,
			    noResultsText = _props2.noResultsText,
			    searchPromptText = _props2.searchPromptText;
			var _state = this.state,
			    inputValue = _state.inputValue,
			    isLoading = _state.isLoading;


			if (isLoading) {
				return loadingPlaceholder;
			}
			if (inputValue && noResultsText) {
				return noResultsText;
			}
			return searchPromptText;
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props3 = this.props,
			    children = _props3.children,
			    loadingPlaceholder = _props3.loadingPlaceholder,
			    placeholder = _props3.placeholder;
			var _state2 = this.state,
			    isLoading = _state2.isLoading,
			    options = _state2.options;


			var props = {
				noResultsText: this.noResultsText(),
				placeholder: isLoading ? loadingPlaceholder : placeholder,
				options: isLoading && loadingPlaceholder ? [] : options,
				ref: function ref(_ref) {
					return _this3.select = _ref;
				}
			};

			return children(_extends({}, this.props, props, {
				isLoading: isLoading,
				onInputChange: this.onInputChange
			}));
		}
	}]);
	return Async;
}(Component);

Async.propTypes = propTypes$7;
Async.defaultProps = defaultProps$1;

var CreatableSelect = function (_React$Component) {
	inherits(CreatableSelect, _React$Component);

	function CreatableSelect(props, context) {
		classCallCheck(this, CreatableSelect);

		var _this = possibleConstructorReturn(this, (CreatableSelect.__proto__ || Object.getPrototypeOf(CreatableSelect)).call(this, props, context));

		_this.filterOptions = _this.filterOptions.bind(_this);
		_this.menuRenderer = _this.menuRenderer.bind(_this);
		_this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
		_this.onInputChange = _this.onInputChange.bind(_this);
		_this.onOptionSelect = _this.onOptionSelect.bind(_this);
		return _this;
	}

	createClass(CreatableSelect, [{
		key: 'createNewOption',
		value: function createNewOption() {
			var _props = this.props,
			    isValidNewOption = _props.isValidNewOption,
			    newOptionCreator = _props.newOptionCreator,
			    onNewOptionClick = _props.onNewOptionClick,
			    _props$options = _props.options,
			    options = _props$options === undefined ? [] : _props$options;


			if (isValidNewOption({ label: this.inputValue })) {
				var option = newOptionCreator({ label: this.inputValue, labelKey: this.labelKey, valueKey: this.valueKey });
				var _isOptionUnique = this.isOptionUnique({ option: option, options: options });

				// Don't add the same option twice.
				if (_isOptionUnique) {
					if (onNewOptionClick) {
						onNewOptionClick(option);
					} else {
						options.unshift(option);

						this.select.selectValue(option);
					}
				}
			}
		}
	}, {
		key: 'filterOptions',
		value: function filterOptions$$1() {
			var _props2 = this.props,
			    filterOptions$$1 = _props2.filterOptions,
			    isValidNewOption = _props2.isValidNewOption,
			    promptTextCreator = _props2.promptTextCreator,
			    showNewOptionAtTop = _props2.showNewOptionAtTop;

			// TRICKY Check currently selected options as well.
			// Don't display a create-prompt for a value that's selected.
			// This covers async edge-cases where a newly-created Option isn't yet in the async-loaded array.

			var excludeOptions = (arguments.length <= 2 ? undefined : arguments[2]) || [];

			var filteredOptions = filterOptions$$1.apply(undefined, arguments) || [];

			if (isValidNewOption({ label: this.inputValue })) {
				var _newOptionCreator = this.props.newOptionCreator;


				var option = _newOptionCreator({
					label: this.inputValue,
					labelKey: this.labelKey,
					valueKey: this.valueKey
				});

				// TRICKY Compare to all options (not just filtered options) in case option has already been selected).
				// For multi-selects, this would remove it from the filtered list.
				var _isOptionUnique2 = this.isOptionUnique({
					option: option,
					options: excludeOptions.concat(filteredOptions)
				});

				if (_isOptionUnique2) {
					var prompt = promptTextCreator(this.inputValue);

					this._createPlaceholderOption = _newOptionCreator({
						label: prompt,
						labelKey: this.labelKey,
						valueKey: this.valueKey
					});

					if (showNewOptionAtTop) {
						filteredOptions.unshift(this._createPlaceholderOption);
					} else {
						filteredOptions.push(this._createPlaceholderOption);
					}
				}
			}

			return filteredOptions;
		}
	}, {
		key: 'isOptionUnique',
		value: function isOptionUnique(_ref) {
			var option = _ref.option,
			    options = _ref.options;
			var isOptionUnique = this.props.isOptionUnique;


			options = options || this.props.options;

			return isOptionUnique({
				labelKey: this.labelKey,
				option: option,
				options: options,
				valueKey: this.valueKey
			});
		}
	}, {
		key: 'menuRenderer',
		value: function menuRenderer$$1(params) {
			var menuRenderer$$1 = this.props.menuRenderer;


			return menuRenderer$$1(_extends({}, params, {
				onSelect: this.onOptionSelect,
				selectValue: this.onOptionSelect
			}));
		}
	}, {
		key: 'onInputChange',
		value: function onInputChange(input) {
			var onInputChange = this.props.onInputChange;

			// This value may be needed in between Select mounts (when this.select is null)

			this.inputValue = input;

			if (onInputChange) {
				this.inputValue = onInputChange(input);
			}

			return this.inputValue;
		}
	}, {
		key: 'onInputKeyDown',
		value: function onInputKeyDown(event) {
			var _props3 = this.props,
			    shouldKeyDownEventCreateNewOption = _props3.shouldKeyDownEventCreateNewOption,
			    onInputKeyDown = _props3.onInputKeyDown;

			var focusedOption = this.select.getFocusedOption();

			if (focusedOption && focusedOption === this._createPlaceholderOption && shouldKeyDownEventCreateNewOption(event)) {
				this.createNewOption();

				// Prevent decorated Select from doing anything additional with this keyDown event
				event.preventDefault();
			} else if (onInputKeyDown) {
				onInputKeyDown(event);
			}
		}
	}, {
		key: 'onOptionSelect',
		value: function onOptionSelect(option) {
			if (option === this._createPlaceholderOption) {
				this.createNewOption();
			} else {
				this.select.selectValue(option);
			}
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props4 = this.props,
			    refProp = _props4.ref,
			    restProps = objectWithoutProperties(_props4, ['ref']);
			var children = this.props.children;

			// We can't use destructuring default values to set the children,
			// because it won't apply work if `children` is null. A falsy check is
			// more reliable in real world use-cases.

			if (!children) {
				children = defaultChildren$2;
			}

			var props = _extends({}, restProps, {
				allowCreate: true,
				filterOptions: this.filterOptions,
				menuRenderer: this.menuRenderer,
				onInputChange: this.onInputChange,
				onInputKeyDown: this.onInputKeyDown,
				ref: function ref(_ref2) {
					_this2.select = _ref2;

					// These values may be needed in between Select mounts (when this.select is null)
					if (_ref2) {
						_this2.labelKey = _ref2.props.labelKey;
						_this2.valueKey = _ref2.props.valueKey;
					}
					if (refProp) {
						refProp(_ref2);
					}
				}
			});

			return children(props);
		}
	}]);
	return CreatableSelect;
}(React.Component);

var defaultChildren$2 = function defaultChildren(props) {
	return React.createElement(Select$1, props);
};

var isOptionUnique = function isOptionUnique(_ref3) {
	var option = _ref3.option,
	    options = _ref3.options,
	    labelKey = _ref3.labelKey,
	    valueKey = _ref3.valueKey;

	if (!options || !options.length) {
		return true;
	}

	return options.filter(function (existingOption) {
		return existingOption[labelKey] === option[labelKey] || existingOption[valueKey] === option[valueKey];
	}).length === 0;
};

var isValidNewOption = function isValidNewOption(_ref4) {
	var label = _ref4.label;
	return !!label;
};

var newOptionCreator = function newOptionCreator(_ref5) {
	var label = _ref5.label,
	    labelKey = _ref5.labelKey,
	    valueKey = _ref5.valueKey;

	var option = {};
	option[valueKey] = label;
	option[labelKey] = label;
	option.className = 'Select-create-option-placeholder';

	return option;
};

var promptTextCreator = function promptTextCreator(label) {
	return 'Create option "' + label + '"';
};

var shouldKeyDownEventCreateNewOption = function shouldKeyDownEventCreateNewOption(_ref6) {
	var keyCode = _ref6.keyCode;

	switch (keyCode) {
		case 9: // TAB
		case 13: // ENTER
		case 188:
			// COMMA
			return true;
		default:
			return false;
	}
};

// Default prop methods
CreatableSelect.isOptionUnique = isOptionUnique;
CreatableSelect.isValidNewOption = isValidNewOption;
CreatableSelect.newOptionCreator = newOptionCreator;
CreatableSelect.promptTextCreator = promptTextCreator;
CreatableSelect.shouldKeyDownEventCreateNewOption = shouldKeyDownEventCreateNewOption;

CreatableSelect.defaultProps = {
	filterOptions: filterOptions,
	isOptionUnique: isOptionUnique,
	isValidNewOption: isValidNewOption,
	menuRenderer: menuRenderer,
	newOptionCreator: newOptionCreator,
	promptTextCreator: promptTextCreator,
	shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption,
	showNewOptionAtTop: true
};

CreatableSelect.propTypes = {
	// Child function responsible for creating the inner Select component
	// This component can be used to compose HOCs (eg Creatable and Async)
	// (props: Object): PropTypes.element
	children: PropTypes.func,

	// See Select.propTypes.filterOptions
	filterOptions: PropTypes.any,

	// Searches for any matching option within the set of options.
	// This function prevents duplicate options from being created.
	// ({ option: Object, options: Array, labelKey: string, valueKey: string }): boolean
	isOptionUnique: PropTypes.func,

	// Determines if the current input text represents a valid option.
	// ({ label: string }): boolean
	isValidNewOption: PropTypes.func,

	// See Select.propTypes.menuRenderer
	menuRenderer: PropTypes.any,

	// Factory to create new option.
	// ({ label: string, labelKey: string, valueKey: string }): Object
	newOptionCreator: PropTypes.func,

	// input change handler: function (inputValue) {}
	onInputChange: PropTypes.func,

	// input keyDown handler: function (event) {}
	onInputKeyDown: PropTypes.func,

	// new option click handler: function (option) {}
	onNewOptionClick: PropTypes.func,

	// See Select.propTypes.options
	options: PropTypes.array,

	// Creates prompt/placeholder option text.
	// (filterText: string): string
	promptTextCreator: PropTypes.func,

	ref: PropTypes.func,

	// Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option.
	shouldKeyDownEventCreateNewOption: PropTypes.func,

	// Where to show prompt/placeholder option text.
	// true: new option prompt at top of list (default)
	// false: new option prompt at bottom of list
	showNewOptionAtTop: PropTypes.bool
};

var AsyncCreatableSelect = function (_React$Component) {
	inherits(AsyncCreatableSelect, _React$Component);

	function AsyncCreatableSelect() {
		classCallCheck(this, AsyncCreatableSelect);
		return possibleConstructorReturn(this, (AsyncCreatableSelect.__proto__ || Object.getPrototypeOf(AsyncCreatableSelect)).apply(this, arguments));
	}

	createClass(AsyncCreatableSelect, [{
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return React.createElement(
				Async,
				this.props,
				function (_ref) {
					var ref = _ref.ref,
					    asyncProps = objectWithoutProperties(_ref, ['ref']);

					var asyncRef = ref;
					return React.createElement(
						CreatableSelect,
						asyncProps,
						function (_ref2) {
							var ref = _ref2.ref,
							    creatableProps = objectWithoutProperties(_ref2, ['ref']);

							var creatableRef = ref;
							return _this2.props.children(_extends({}, creatableProps, {
								ref: function ref(select) {
									creatableRef(select);
									asyncRef(select);
									_this2.select = select;
								}
							}));
						}
					);
				}
			);
		}
	}]);
	return AsyncCreatableSelect;
}(React.Component);

var defaultChildren$1 = function defaultChildren(props) {
	return React.createElement(Select$1, props);
};

AsyncCreatableSelect.propTypes = {
	children: PropTypes.func.isRequired // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
};

AsyncCreatableSelect.defaultProps = {
	children: defaultChildren$1
};

Select$1.Async = Async;
Select$1.AsyncCreatable = AsyncCreatableSelect;
Select$1.Creatable = CreatableSelect;
Select$1.Value = Value;
Select$1.Option = Option;

function _createSuper$l(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$l(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$l() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
// @see https://github.com/JedWatson/react-select/blob/v1.x/examples/src/components/CustomComponents.js

var CheckBoxOption = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(CheckBoxOption, _React$Component);

  var _super = _createSuper$l(CheckBoxOption);

  function CheckBoxOption(props) {
    var _this;

    babelHelpers.classCallCheck(this, CheckBoxOption);
    _this = _super.call(this, props);
    _this.checkBoxOnChange = _this.checkBoxOnChange.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(CheckBoxOption, [{
    key: "checkBoxOnChange",
    value: function checkBoxOnChange() {
      this.props.option.quickHandleChange(this.props.option.idx);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$option = this.props.option,
          label = _this$props$option.label,
          columnId = _this$props$option.columnId,
          checked = _this$props$option.checked;
      var quickId = "quick" + columnId;
      return (
        /*#__PURE__*/

        /*
                <div className="Select-value" title={label}>
                      <span className="Select-value-label d-flex flex-row">
                        <input type="checkBox" id={quickId} name= {quickId} checked={checked}
                                    onChange={() => this.checkBoxOnChange()}/>
                        <label htmlFor={quickId}>{label}</label>
                      </span>
                </div>
        */
        React.createElement("div", {
          className: "d-flex flex-row align-items-center"
        }, /*#__PURE__*/React.createElement("div", {
          className: "ml-2"
        }, /*#__PURE__*/React.createElement("input", {
          type: "checkBox",
          id: quickId,
          name: quickId,
          checked: checked,
          onChange: function onChange() {
            return _this2.checkBoxOnChange();
          }
        })), /*#__PURE__*/React.createElement("div", {
          className: "ml-2 mt-1"
        }, /*#__PURE__*/React.createElement("label", {
          htmlFor: quickId
        }, label)))
      );
    }
  }]);
  return CheckBoxOption;
}(React.Component);

var QuickColumns = /*#__PURE__*/function (_React$Component2) {
  babelHelpers.inherits(QuickColumns, _React$Component2);

  var _super2 = _createSuper$l(QuickColumns);

  function QuickColumns(props) {
    var _this3;

    babelHelpers.classCallCheck(this, QuickColumns);
    _this3 = _super2.call(this, props);
    _this3.state = _this3.createStateFromProps(_this3.props);
    _this3.updateDataTableQuickColumns = _this3.updateDataTableQuickColumns.bind(babelHelpers.assertThisInitialized(_this3));
    _this3.quickHandleChange = _this3.quickHandleChange.bind(babelHelpers.assertThisInitialized(_this3));
    return _this3;
  }

  babelHelpers.createClass(QuickColumns, [{
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
      if (props.columns.length === 0) return []; //const firstRow=props.rows[0].cells;

      return {
        quickColumns: props.columns.map(function (col, idx) {
          if (col.quick) return {
            columnId: idx,
            visible: col.quick === 'yes'
          };else return null;
        }).filter(function (col) {
          return col !== null;
        })
      };
    }
  }, {
    key: "quickHandleChange",
    value: function quickHandleChange(idx) {
      var quickColumn = this.state.quickColumns[idx];
      quickColumn.visible = !quickColumn.visible;
      var value = quickColumn.visible ? "yes" : "no";
      be5.net.request("quick", {
        "table_name": this.props.category,
        "query_name": this.props.page,
        "column_name": this.props.columns[quickColumn.columnId].name,
        "quick": value
      });
      this.forceUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      if (this.state.quickColumns.length === 0) {
        return null;
      }

      this.updateDataTableQuickColumns();
      var checks = this.state.quickColumns.map(function (cell, idx) {
        var _this4 = this;

        var column = this.props.columns[cell.columnId];
        var title = column.title.replace(/<br\s*[\/]?>/gi, " ");
        return /*#__PURE__*/React.createElement("span", {
          key: idx
        }, /*#__PURE__*/React.createElement("input", {
          className: "checkbox-input",
          id: "quick" + idx,
          type: "checkbox",
          checked: cell.visible,
          onChange: function onChange() {
            return _this4.quickHandleChange(idx);
          }
        }), /*#__PURE__*/React.createElement("label", {
          htmlFor: "quick" + idx,
          className: "rowIndex"
        }, title, " "));
      }.bind(this));

      var select = function select() {
        var id = "quick-select-" + _this5.props.page;
        var options = [];
        var value = [];
        var localization = be5.messages.property || {}; //empty object for tests

        _this5.state.quickColumns.forEach(function (cell, idx) {
          var column = _this5.props.columns[cell.columnId];
          var title = column.title.replace(/<br\s*[\/]?>/gi, " ");
          options.push({
            idx: idx,
            columnId: cell.columnId,
            label: title,
            checked: cell.visible,
            quickHandleChange: _this5.quickHandleChange
          });

          if (cell.visible) {
            value.push(cell.columnId);
          }
        });

        var selectAttr = {
          id: id,
          ref: id,
          name: id,
          value: value,
          options: options,
          // onChange: this.handleChangeSelect,
          clearAllText: localization.clearAllText,
          clearValueText: localization.clearValueText,
          noResultsText: localization.noResultsText,
          searchPromptText: localization.searchPromptText,
          loadingPlaceholder: localization.loadingPlaceholder,
          placeholder: localization.placeholder,
          backspaceRemoves: false,
          disabled: false,
          multi: true,
          matchPos: "any",
          inputProps: {
            autoComplete: 'off'
          },
          width: '200px',
          optionComponent: CheckBoxOption
        };
        return /*#__PURE__*/React.createElement(Select$1, selectAttr);
      };

      var getQuickColumns = function getQuickColumns() {
        if (_this5.props.layout && _this5.props.layout.quickType === "select") {
          return /*#__PURE__*/React.createElement("div", {
            id: "quickColumns",
            className: "d-flex flex-row flex-wrap align-items-center"
          }, /*#__PURE__*/React.createElement("div", null, be5.messages.otherColumns, ":"), /*#__PURE__*/React.createElement("div", {
            className: "select-container ml-sm-2"
          }, select()));
        } else {
          return /*#__PURE__*/React.createElement("div", {
            id: "quickColumns"
          }, /*#__PURE__*/React.createElement("span", {
            id: "checkbox-container"
          }, be5.messages.otherColumns, ":"), checks);
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

function _createSuper$m(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$m(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$m() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TableForm = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(TableForm, _React$Component);

  var _super = _createSuper$m(TableForm);

  function TableForm() {
    babelHelpers.classCallCheck(this, TableForm);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(TableForm, [{
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

function _createSuper$n(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$n(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$n() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var FormTable = /*#__PURE__*/function (_TableForm) {
  babelHelpers.inherits(FormTable, _TableForm);

  var _super = _createSuper$n(FormTable);

  function FormTable() {
    babelHelpers.classCallCheck(this, FormTable);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(FormTable, [{
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

function _createSuper$o(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$o(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$o() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TableFormRow = /*#__PURE__*/function (_TableForm) {
  babelHelpers.inherits(TableFormRow, _TableForm);

  var _super = _createSuper$o(TableFormRow);

  function TableFormRow() {
    babelHelpers.classCallCheck(this, TableFormRow);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(TableFormRow, [{
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

function _createSuper$p(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$p(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$p() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ModalTable = /*#__PURE__*/function (_Table) {
  babelHelpers.inherits(ModalTable, _Table);

  var _super = _createSuper$p(ModalTable);

  function ModalTable() {
    babelHelpers.classCallCheck(this, ModalTable);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(ModalTable, [{
    key: "render",
    value: function render() {
      var attributes = this.props.value.data.attributes;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ModalHeader, {
        tag: "h5",
        toggle: function toggle() {
          return bus.fire("mainModalClose");
        }
      }, attributes.title), /*#__PURE__*/React.createElement(ModalBody, null, babelHelpers.get(babelHelpers.getPrototypeOf(ModalTable.prototype), "render", this).call(this)), /*#__PURE__*/React.createElement(ModalFooter, null, this._createModalCloseAction()));
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

function _createSuper$q(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$q(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$q() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TablePagination = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(TablePagination, _React$Component);

  var _super = _createSuper$q(TablePagination);

  function TablePagination(props) {
    var _this;

    babelHelpers.classCallCheck(this, TablePagination);
    _this = _super.call(this, props);
    _this.handlePageChange = _this.handlePageChange.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(TablePagination, [{
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

function _createSuper$r(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$r(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$r() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
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
  babelHelpers.inherits(Chart, _React$Component);

  var _super = _createSuper$r(Chart);

  function Chart(props) {
    var _this;

    babelHelpers.classCallCheck(this, Chart);
    _this = _super.call(this, props);
    _this.state = {
      data: [],
      layout: {},
      frames: [],
      config: {}
    };
    _this.storeChartState = _this.storeChartState.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(Chart, [{
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
            var _Object$entries$_i = babelHelpers.slicedToArray(_Object$entries[_i], 2),
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

function _createSuper$s(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$s(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$s() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var route = function route(frontendParams, page) {
  changeDocument(frontendParams.documentName, {});
};

var Loading = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Loading, _React$Component);

  var _super = _createSuper$s(Loading);

  function Loading() {
    babelHelpers.classCallCheck(this, Loading);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Loading, [{
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

var route$1 = function route(frontendParams, entity, query, operation, contextParams) {
  var _operationInfo;

  var operationInfo = (_operationInfo = {}, babelHelpers.defineProperty(_operationInfo, ENTITY_NAME_PARAM, entity), babelHelpers.defineProperty(_operationInfo, QUERY_NAME_PARAM, query || 'All records'), babelHelpers.defineProperty(_operationInfo, OPERATION_NAME_PARAM, operation), babelHelpers.defineProperty(_operationInfo, CONTEXT_PARAMS, JSON.stringify(contextParams || {})), _operationInfo);
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

var route$5 = function route(frontendParams, entity, query, params) {
  var _paramsObject;

  var paramsObject = (_paramsObject = {}, babelHelpers.defineProperty(_paramsObject, ENTITY_NAME_PARAM, entity), babelHelpers.defineProperty(_paramsObject, QUERY_NAME_PARAM, query || 'All records'), babelHelpers.defineProperty(_paramsObject, CONTEXT_PARAMS, params || {}), _paramsObject);
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

var route$6 = function route(frontendParams, params) {
  var _requestParams;

  var requestParams = (_requestParams = {}, babelHelpers.defineProperty(_requestParams, CONTEXT_PARAMS, be5.net.paramString(params)), babelHelpers.defineProperty(_requestParams, TIMESTAMP_PARAM, new Date().getTime()), _requestParams);
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

var route$8 = function route(frontendParams, entity) {
  var requestParams = babelHelpers.defineProperty({}, ENTITY_NAME_PARAM, entity);
  be5.net.request('categories/forest/', requestParams, function (data) {
    changeDocument(frontendParams.documentName, {
      value: createStaticValue('', "<pre>" + JSON.stringify(data, null, 4) + "</pre>")
    });
  });
};

registerRoute("categories", route$8);

function _createSuper$t(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$t(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$t() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
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
  babelHelpers.inherits(QueryBuilder, _React$Component);

  var _super = _createSuper$t(QueryBuilder);

  function QueryBuilder(props) {
    var _this;

    babelHelpers.classCallCheck(this, QueryBuilder);
    _this = _super.call(this, props);
    _this.state = {
      sql: _this.props.value.data.attributes.sql,
      value: _this.props.value
    };
    _this.updateCode = _this.updateCode.bind(babelHelpers.assertThisInitialized(_this));
    _this.submit = _this.submit.bind(babelHelpers.assertThisInitialized(_this));
    _this.setSqlFromHistory = _this.setSqlFromHistory.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(QueryBuilder, [{
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
      }, babelHelpers.defineProperty(_requestParams, CONTEXT_PARAMS, this.props.value.params), babelHelpers.defineProperty(_requestParams, TIMESTAMP_PARAM, new Date().getTime()), _requestParams);
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
  babelHelpers.inherits(QueryBuilderOutput, _React$Component2);

  var _super2 = _createSuper$t(QueryBuilderOutput);

  function QueryBuilderOutput() {
    babelHelpers.classCallCheck(this, QueryBuilderOutput);
    return _super2.apply(this, arguments);
  }

  babelHelpers.createClass(QueryBuilderOutput, [{
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
    className: classNames('ui-panel row')
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

function _createSuper$u(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$u(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$u() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * https://datatables.net/
 * https://habr.com/ru/post/330656/
 * https://medium.com/@zbzzn/integrating-react-and-datatables-not-as-hard-as-advertised-f3364f395dfa
 */

var DataTablesWrapper = /*#__PURE__*/function (_Component) {
  babelHelpers.inherits(DataTablesWrapper, _Component);

  var _super = _createSuper$u(DataTablesWrapper);

  function DataTablesWrapper(props) {
    babelHelpers.classCallCheck(this, DataTablesWrapper);
    return _super.call(this, props);
  }

  babelHelpers.createClass(DataTablesWrapper, [{
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

          var requestParams = (_requestParams = {}, babelHelpers.defineProperty(_requestParams, ENTITY_NAME_PARAM, attributes.category), babelHelpers.defineProperty(_requestParams, QUERY_NAME_PARAM, attributes.page), babelHelpers.defineProperty(_requestParams, CONTEXT_PARAMS, params), _requestParams);
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

        if (babelHelpers["typeof"](column) === 'object') {
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
  babelHelpers.inherits(DataTablesTableBox, _Component2);

  var _super2 = _createSuper$u(DataTablesTableBox);

  function DataTablesTableBox() {
    babelHelpers.classCallCheck(this, DataTablesTableBox);
    return _super2.apply(this, arguments);
  }

  babelHelpers.createClass(DataTablesTableBox, [{
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

function _createSuper$v(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$v(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$v() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var JsonFormatTableBox = /*#__PURE__*/function (_Component) {
  babelHelpers.inherits(JsonFormatTableBox, _Component);

  var _super = _createSuper$v(JsonFormatTableBox);

  function JsonFormatTableBox() {
    babelHelpers.classCallCheck(this, JsonFormatTableBox);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(JsonFormatTableBox, [{
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

function _createSuper$w(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$w(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$w() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var OneColumnListTableBox = /*#__PURE__*/function (_Component) {
  babelHelpers.inherits(OneColumnListTableBox, _Component);

  var _super = _createSuper$w(OneColumnListTableBox);

  function OneColumnListTableBox() {
    babelHelpers.classCallCheck(this, OneColumnListTableBox);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(OneColumnListTableBox, [{
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

function _createSuper$x(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$x(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$x() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ReactTableBox = /*#__PURE__*/function (_Component) {
  babelHelpers.inherits(ReactTableBox, _Component);

  var _super = _createSuper$x(ReactTableBox);

  function ReactTableBox(props) {
    var _this;

    babelHelpers.classCallCheck(this, ReactTableBox);
    _this = _super.call(this, props);
    _this.onOperationClick = _this.onOperationClick.bind(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  babelHelpers.createClass(ReactTableBox, [{
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
        var title = babelHelpers["typeof"](column) === 'object' ? column.title : column;
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

var index = combineReducers({
  user: users,
  menu: users$1,
  hashUrl: changeHash
});

export { API_URL_PREFIX, Application, Be5Components, CLOSE_MAIN_MODAL, CONTEXT_PARAMS, CategoryNavigation, Chart, DEFAULT_TABLE_BOX, DEFAULT_VIEW, DOCUMENT_REFRESH_SUFFIX, DOWNLOAD_OPERATION, Document$1 as Document, ENTITY_NAME_PARAM, ErrorPane, FinishedResult, Form, FormTable, FormWizard, FrontendAction, GO_BACK, HelpInfo, HorizontalForm, InlineMiniForm, LIMIT, LanguageBox as LanguageSelector, MAIN_DOCUMENT, MAIN_MODAL_DOCUMENT, MainDocumentOnly, Menu, MenuBody, MenuContainer$1 as MenuContainer, MenuFooter, MenuNode, MenuSearchField, ModalForm, ModalTable, NavMenu, NavbarMenu, NavbarMenuContainer$1 as NavbarMenuContainer, Navs, OFFSET, OPEN_DEFAULT_ROUTE, OPEN_NEW_WINDOW, OPERATION_NAME_PARAM, ORDER_COLUMN, ORDER_DIR, OperationBox, QUERY_NAME_PARAM, QuickColumns, QuickFiltersBox, REDIRECT, REFRESH_DOCUMENT, REFRESH_MENU, REFRESH_PARENT_DOCUMENT, RELOAD_CONTROL_NAME, ROLE_ADMINISTRATOR, ROLE_GUEST, ROLE_SYSTEM_DEVELOPER, RoleSelector, SEARCH_PARAM, SEARCH_PRESETS_PARAM, SELECTED_ROWS, SET_URL, SUCCESS_ALERT, SideBar, StaticPage, SubmitOnChangeForm, TIMESTAMP_PARAM, Table, TableForm, TableFormRow, TablePagination, UPDATE_DOCUMENT, UPDATE_PARENT_DOCUMENT, UserControl, UserControlContainer, actions as action, addFilterParams, addUrlHandlers, arraysEqual, be5, bus, changeDocument, clearDocumentState, createBaseStore, createPageValue, createStaticValue, executeFrontendActions, fetchMenu, fetchOperationByUrl, fetchTableByUrl, fetchUserInfo, route$1 as formAction, getActionsMap, getAllDocumentTypes, getAllRoutes, getAllTypes, getBackAction, getBackOrOpenDefaultRouteAction, getCurrentRoles, getDocument, getDocumentState, getDocumentStates, getFilterParams, getMenu, getModelByID, getOperationInfoFromUrl, getResourceByID, getResourceByType, getRoute, getSelfUrl, getTableBox, getUser, initBe5App, initFilterParams, initOnLoad, loadDocumentByUrl, loadOperation, loadTable, loadTableByUrl, route as loadingAction, route$2 as loginAction, route$3 as logoutAction, users$1 as menuReduser, openInModal, openOperationByUrl, openOperationByUrlWithValues, Preconditions as preconditions, processHashUrl, processHashUrlForDocument, route$6 as queryBuilderAction, registerDocument, registerPage, registerRoute, registerTableBox, index as rootReducer, setDocumentState, route$4 as staticAction, submitOperation, route$5 as tableAction, route$7 as textAction, toggleRoles, updateMenu, updateTable, updateUserInfo, users as userReduser };
