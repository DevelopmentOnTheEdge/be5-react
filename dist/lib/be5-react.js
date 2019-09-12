import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, Navbar, NavbarToggler, UncontrolledDropdown, UncontrolledTooltip } from 'reactstrap';
import classNames from 'classnames';
import { connect } from 'react-redux';
import 'formdata-polyfill';
import SplitPane from 'react-split-pane';
import Alert from 'react-s-alert';
import PropertySet, { Property, PropertyInput } from 'beanexplorer-react';
import JsonPointer from 'json-pointer';
import Transition from 'react-transition-group/Transition';
import numberFormatter from 'number-format.js';
import Pagination from 'react-js-pagination';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

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
      throw createArgumentEqualityError(message || arg1 + ' should be equal to ' + arg2);
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

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
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











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var FrontendAction = function FrontendAction(type, value) {
  classCallCheck(this, FrontendAction);

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
  listeners(eventType).push(listener);
  //console.log("listen: " + eventType + " " + listener);
}

//function notListen(eventType, listener) {//fix not work
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

var SELECT_ROLES = 'SELECT_ROLES';

//LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
//LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
//LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

var fetchUserInfo = function fetchUserInfo() {
  return function (dispatch) {
    be5.net.request('userInfo', {}, function (data) {
      dispatch({ type: UPDATE_USER_INFO, user: data });
    });
  };
};

var updateUserInfo = function updateUserInfo(data) {
  return { type: UPDATE_USER_INFO, user: data };
};

// function logout() {
//   userService.logout();
//   return { type: userConstants.LOGOUT };
// }

var toggleRoles = function toggleRoles(roles) {
  return function (dispatch) {
    be5.net.request('userInfo/selectRoles', { roles: roles }, function (data) {
      dispatch({ type: UPDATE_USER_INFO, user: data });
    });
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

  if (actions[SUCCESS_ALERT]) {
    bus.fire("alert", { msg: actions[SUCCESS_ALERT], type: 'success' });
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
    redirect(actions[SET_URL], { documentName: MAIN_DOCUMENT });
  }

  if (actions.hasOwnProperty(OPEN_DEFAULT_ROUTE)) {
    redirect("", { documentName: MAIN_DOCUMENT });
  }

  if (actions.hasOwnProperty(GO_BACK)) {
    if (actions[GO_BACK] !== undefined && documentName !== MAIN_DOCUMENT) {
      redirect(actions[GO_BACK], frontendParams);
    } else {
      window.history.back();
    }
  }

  if (actions[UPDATE_PARENT_DOCUMENT] !== undefined) {
    var tableJson = Object.assign({}, actions[UPDATE_PARENT_DOCUMENT], { meta: { _ts_: new Date().getTime() } });
    changeDocument(frontendParams.parentDocumentName || documentName, { value: tableJson });
  }

  if (actions[UPDATE_DOCUMENT] !== undefined) {
    var _tableJson = Object.assign({}, actions[UPDATE_DOCUMENT], { meta: { _ts_: new Date().getTime() } });
    changeDocument(documentName, { value: _tableJson });
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

  bus.fire("executeFrontendActions", { actions: actions, frontendParams: frontendParams });
};

function redirect(url, frontendParams) {
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://")) {
    window.location.href = url;
  } else {
    clearDocumentState('#!' + url);
    if (frontendParams.documentName === MAIN_DOCUMENT) {
      bus.fire("mainModalClose");
      be5.url.open({ documentName: MAIN_DOCUMENT }, '#!' + url);
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
    return { data: res, included: included, meta: meta };
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
    meta: meta || { _ts_: new Date().getTime() }
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
  var url = void 0;
  if (e.currentTarget) {
    url = e.currentTarget.getAttribute("href");
    if (!(/^#/.test(url) || url === '' || url === '#' || url === '#!')) return;
    e.preventDefault();
  } else {
    url = e;
    if (!url.startsWith("#!")) url = "#!" + url;
  }

  clearDocumentState(url);

  be5.url.open({ documentName: documentName || MAIN_DOCUMENT }, url);
};

var loadDocumentByUrl = function loadDocumentByUrl(url, frontendParams) {
  var attr = be5.url.parse(url);
  var params = Object.assign(attr.named, defineProperty({}, TIMESTAMP_PARAM, new Date().getTime()));
  be5.net.request(be5.url.form(attr.positional), params, function (json) {
    changeDocument(frontendParams.documentName, { value: json, frontendParams: frontendParams });
  }, function (json) {
    changeDocument(frontendParams.documentName, { value: json, frontendParams: frontendParams });
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
    return React.createElement(
      'button',
      { type: 'button', className: 'btn btn-secondary back-action-btn',
        onClick: function onClick() {
          return executeFrontendActions(action, frontendParams);
        } },
      layout.cancelActionText || be5.messages.back
    );
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
};

// createDocument(type, props) {
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
    value: { data: Object.assign({}, data, { links: { self: url || actionName } }) },
    frontendParams: { type: actionName }
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
    set: function set$$1(loc, addMessages) {
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
    get: function get$$1() {
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
    get: function get$$1() {
      return decodeURI(document.location.hash);
    },
    set: function set$$1(url) {
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

      return { positional: positional, named: _.object(named) };
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
      var urlParts = url.split('/');
      // if (!be5.hasAction(urlParts[0])) {
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
        changeDocument(frontendParams.documentName, { value: createStaticValue(msg, null, { self: url }) });
        console.info(msg);
      }
    }
  },

  net: {
    url: function url(path) {
      return API_URL_PREFIX + path;
    },
    paramString: function paramString(params) {
      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') {
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
          if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data.type === 'error') {
            if (_typeof(data.value) !== 'object') {
              data.value = { message: be5.messages.errorInvalidErrorResponse, code: 'CLIENT_ERROR' };
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
        bus.fire("alert", { msg: value, type: 'error' });
      } else if (value.errors !== undefined) {
        value.errors.forEach(function (e) {
          bus.fire("alert", { msg: e.title, type: 'error' });
        });
      } else {
        bus.fire("alert", { msg: 'unknown error', type: 'error' });
      }
      console.error(value);
    }
  }

  // isRemoteUrl(url) {
  //   const prefix = 'http';
  //   return url.substr(0, prefix.length) === prefix;
  // },

};

// // transforms parameters!
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

  return React.createElement(
    'div',
    { className: "role" },
    React.createElement('input', {
      type: 'checkbox',
      id: id,
      checked: props.checked,
      onChange: props.onChange
    }),
    React.createElement(
      'label',
      { htmlFor: id },
      React.createElement('span', { className: "checkBox" }),
      props.name
    )
  );
};

Role.propTypes = {
  onChange: PropTypes.func.isRequired
};

var RoleSelector = function RoleSelector(props) {

  function onRoleChange(name) {
    var roles = [].concat(toConsumableArray(props.currentRoles));
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
    return React.createElement('div', null);
  }

  var roleNodes = props.availableRoles.map(function (role) {
    return React.createElement(Role, { key: role, name: role, checked: props.currentRoles.indexOf(role) !== -1, onChange: function onChange() {
        return onRoleChange(role);
      } });
  });

  return React.createElement(
    UncontrolledDropdown,
    { size: props.size, className: 'roleBox mr-sm-2', id: props.id, hidden: isHidden() },
    React.createElement(
      DropdownToggle,
      { caret: true },
      be5.messages.roles
    ),
    React.createElement(
      DropdownMenu,
      null,
      roleNodes,
      React.createElement(DropdownItem, { divider: true }),
      React.createElement(
        'div',
        { className: 'roleBox_add-actions' },
        be5.locale.msg('selectRoles') + ' ',
        React.createElement(
          Button,
          { onClick: handleSelectAll, color: 'primary', className: 'enable-all',
            size: 'sm' },
          be5.locale.msg('allRoles')
        ),
        ' ',
        React.createElement(
          Button,
          { onClick: handleClear, color: 'secondary', className: 'disable-all',
            size: 'sm' },
          be5.locale.msg('clearRoles')
        )
      )
    )
  );
};

RoleSelector.propTypes = {
  id: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  currentRoles: PropTypes.array.isRequired,
  availableRoles: PropTypes.array.isRequired,
  toggleRoles: PropTypes.func.isRequired
};

var img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAATdEVYdFRpdGxlAE9wdGljYWwgRHJpdmU+Z7oMAAAC+ElEQVQ4jZWS329TZRjHP+ft6dJ2djNxHcgyunb+KIyNwfRG0mZgNgfeAJNBUBO8NEswITPEGHIy1I1lcTEzhn/Aq5mIFwp2yGSMzAsCyMIAp7hWOXjD+LGW03bnPe/rxSyZ7spv8tw9z+f75Ps8htaasvr7+81Apfm6oY1dGrpAV4BhY5AV2vjME4ZjKHUSjBxKHTt69MNpszw8ODj4TCBUMdbasnnH5pYt1NREEEIgpbs2l8u1/TAxvjebyeT27z8YXrh3j7MT4wFgmwkwPPzx8z6/L713zxuxeKyRUqmI4+RRSiGEIBQKsa/7ALZ9J1xfv56qcBg0rwCYAArxxVsH346tqV3L4uJDrv58lfn52+TyeZ6qrGTjxk0kXkwQiUT4r8yhTwd2xmPxjnXPruP+/QXOpE9zx7YnQQwIrUOFUnHwwtRk4vbvv9HVuZNAIAiAUmoZYCh9+NUdHRSLRWZvXMe27XMlx+2yLEueGP7kXE/3gUQ81rjKWUq5DNAY64PBEK5b4uatWwiMjyzLkgCuK8OPHj3kwYOFVQDXdSlnUCeEgVIKx3mMlFx/0uR575765usvtdaJ5WtrtC7XPxlIzysUS8VqIUyqq5/mcc5uBs4DHD92/DKwYZX9yhCl532fyWQONcYbadrQRCabtXq+6pka2zfmrXiwwJIsngB2a60mPJf3hoaGcgCmWpKnr1y5fKghGqW5uYX5zHy7d809+8HM+wM+7d2U2teKxkol21/e1NTEj5MT78zOzl4CTgKYQvhPzc39cn7q4lR7Kpliz+5utrRu3X5x+sL2u3f/4oVolOS2JNFoA/l8HtP0I6UXKG9naK3p6+urEaa+1NnxWkPb1jaCwRB+vx8hfCilcN0lCgWH9Hia6Z+mb5ii4qWRkZHCEwDAkSO9zyl8n9dGartSqSSRSC1V4Socx2Hu1zmuzczwx5/Zb02j4s3R0dHFf22wUr2HezsNLXuVMuo1ug7Ia80Zhf6ubk1d2rIstbJ/FeD/6m8m/lj+PIxQ9QAAAABJRU5ErkJggg==';

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
      return React.createElement(
        'span',
        { onClick: props.openReLoginForm, className: "document-reload float-right" },
        React.createElement('img', { src: img, alt: "Login", title: "Login" })
      );
    }
    return null;
  }

  return React.createElement(
    'div',
    { className: classNames('user-control', props.className || 'form-inline mb-2') },
    React.createElement(RoleSelector, {
      size: props.size,
      currentRoles: currentRoles,
      availableRoles: availableRoles,
      toggleRoles: props.toggleRoles
    }),
    React.createElement(
      'label',
      null,
      userName
    ),
    reLogin()
  );
};

UserControl.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  user: PropTypes.shape({})
};

var _get = function _get(operationInfo, callback, failure) {
  var data = Object.assign({}, operationInfo, defineProperty({}, TIMESTAMP_PARAM, new Date().getTime()));

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
          bus.fire("alert", { msg: result.message, type: 'error', timeout: result.timeout });
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
                bus.fire("alert", { msg: result.message || be5.messages.successfullyCompleted, type: 'success', timeout: result.timeout });
                bus.fire("mainModalClose");
              } else {
                changeDocument(documentName, { value: json, frontendParams: frontendParams });
              }

              if (frontendParams.parentDocumentName !== undefined && frontendParams.parentDocumentName !== frontendParams.documentName) {
                executeFrontendActions(new FrontendAction(REFRESH_PARENT_DOCUMENT), frontendParams);
              }
            } else {
              if (result.message !== undefined) {
                if (documentName === MAIN_MODAL_DOCUMENT) {
                  bus.fire("alert", { msg: result.message, type: 'success', timeout: result.timeout });
                } else {
                  changeDocument(documentName, { value: json, frontendParams: frontendParams });
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
      bus.fire("alert", { msg: error.status + " " + error.title, type: 'error' });
    } else {
      bus.fire("alert", { msg: json, type: 'error' });
    }
    changeDocument(documentName, { value: json, frontendParams: frontendParams });
  }
};

var _performForm = function _performForm(json, frontendParams) {
  var documentName = frontendParams.documentName;
  var operationResult = json.data.attributes.operationResult;

  if (operationResult.status === 'ERROR') {
    bus.fire("alert", { msg: operationResult.message, type: 'error', operationResult: operationResult.timeout });
  }

  if (documentName === MAIN_MODAL_DOCUMENT) {
    bus.fire("mainModalOpen");
    changeDocument(MAIN_MODAL_DOCUMENT, { value: json, frontendParams: frontendParams });
  } else {
    if (documentName === MAIN_DOCUMENT) be5.ui.setTitle(json.data.attributes.title);
    changeDocument(documentName, { value: json, frontendParams: frontendParams });
  }
};

var getOperationInfoFromUrl = function getOperationInfoFromUrl(url) {
  var _operationInfo;

  var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var attr = be5.url.parse(url);
  var operationInfo = (_operationInfo = {}, defineProperty(_operationInfo, ENTITY_NAME_PARAM, attr.positional[1]), defineProperty(_operationInfo, QUERY_NAME_PARAM, attr.positional[2]), defineProperty(_operationInfo, OPERATION_NAME_PARAM, attr.positional[3]), defineProperty(_operationInfo, CONTEXT_PARAMS, JSON.stringify(attr.named)), _operationInfo);
  return getOperationInfo(operationInfo, values);
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
      formData.append(k, value);
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
    toggleRoles: function toggleRoles$$1(roles) {
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
    return { href: href, target: target, classes: classes, hasAction: hasAction };
  }

  var hasChildren = props.data.children !== undefined;

  if (!hasChildren) {
    var key = 'menu node ' + props.data.title;
    return React.createElement(
      'div',
      { className: 'menuNode', key: key },
      _getHead(),
      _getOperations()
    );
  }

  var nextLevel = props.level + 1;
  var children = props.data.children.map(function (child) {
    var childKey = 'li ' + child.title;
    return React.createElement(
      'li',
      { key: childKey },
      React.createElement(MenuNode, { key: child.title, data: child, level: nextLevel })
    );
  });

  return React.createElement(
    'div',
    { className: 'menuNode', key: 'menu node ' + props.data.title },
    _getHead(),
    _getOperations(),
    React.createElement(
      'ul',
      { key: 'ul ' + props.data.title },
      children
    )
  );

  function _getHead() {
    var data = getData(props);
    if (data.hasAction) {
      return React.createElement(
        'a',
        {
          href: data.href,
          className: data.classes,
          target: data.target,
          onClick: processHashUrl,
          key: 'a ' + props.data.title
        },
        props.data.title
      );
    } else {
      return React.createElement(
        'span',
        { className: data.classes },
        props.data.title
      );
    }
  }

  function _getOperations() {
    var hasOperations = props.data.operations !== undefined;

    if (!hasOperations) {
      var _key = 'operations ' + props.data.title;
      return React.createElement('div', { key: _key });
    }

    return props.data.operations.map(function (operation) {
      var href = '#!' + operation.action.arg;
      var title = operation.title === 'Insert' ? '+' : operation.title;
      var opBoxKey = 'operation box ' + title;
      var opKey = 'operation a ' + title;
      return React.createElement(
        'div',
        { className: 'menuOperationBox', key: opBoxKey },
        React.createElement(
          'a',
          { href: href, className: 'menuOperation', key: opKey },
          '[',
          title,
          ']'
        )
      );
    });
  }
};

var propTypes$1 = {
  menu: PropTypes.shape({})
};

var MenuBody = function (_Component) {
  inherits(MenuBody, _Component);

  function MenuBody(props) {
    classCallCheck(this, MenuBody);

    var _this = possibleConstructorReturn(this, (MenuBody.__proto__ || Object.getPrototypeOf(MenuBody)).call(this, props));

    _this.state = { query: '' };

    _this._getFilteredRoot = _this._getFilteredRoot.bind(_this);
    return _this;
  }

  createClass(MenuBody, [{
    key: 'render',
    value: function render() {
      if (this.props.menu === null) {
        return React.createElement(
          'p',
          null,
          'Loading...'
        );
      }
      var filteredRoot = this._getFilteredRoot();
      var rootNodes = filteredRoot.map(function (node) {
        return React.createElement(MenuNode, { key: JSON.stringify(node), data: node, level: 1 });
      });
      return React.createElement(
        'div',
        { className: 'menu' },
        rootNodes
      );
    }
  }, {
    key: '_getFilteredRoot',
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
        return _.extend({}, node, { children: filterByTitle(node.children, query) });
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

MenuBody.propTypes = propTypes$1;

var MenuSearchField = function (_React$Component) {
  inherits(MenuSearchField, _React$Component);

  function MenuSearchField(props) {
    classCallCheck(this, MenuSearchField);

    var _this = possibleConstructorReturn(this, (MenuSearchField.__proto__ || Object.getPrototypeOf(MenuSearchField)).call(this, props));

    _this.state = { value: '' };

    _this._handleChange = _this._handleChange.bind(_this);
    return _this;
  }

  createClass(MenuSearchField, [{
    key: 'render',
    value: function render() {
      return React.createElement('input', { type: 'text', className: 'searchField form-control', onChange: this._handleChange, value: this.state.value,
        placeholder: be5.messages.filter });
    }
  }, {
    key: '_handleChange',
    value: function _handleChange(event) {
      this.setState({ value: event.target.value });
      this.props.onChange(event.target.value);
    }
  }]);
  return MenuSearchField;
}(React.Component);

MenuSearchField.propTypes = {
  onChange: PropTypes.func.isRequired
};

var propTypes = {
  menu: PropTypes.shape({}),
  currentRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchMenu: PropTypes.func.isRequired,
  searchField: PropTypes.bool
};

var defaultProps = {
  searchField: true
};

var Menu = function (_Component) {
  inherits(Menu, _Component);

  function Menu(props) {
    classCallCheck(this, Menu);

    var _this = possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

    _this._handleQueryChange = _this._handleQueryChange.bind(_this);
    return _this;
  }

  createClass(Menu, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.fetchMenu();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          currentRoles = _props.currentRoles,
          fetchMenu = _props.fetchMenu;

      if (!arraysEqual(currentRoles, nextProps.currentRoles)) {
        fetchMenu();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'menuContainer' },
        this.props.searchField ? React.createElement(MenuSearchField, { ref: 'searchfield', onChange: this._handleQueryChange }) : null,
        React.createElement(MenuBody, { ref: 'menubody', menu: this.props.menu })
      );
    }
  }, {
    key: '_handleQueryChange',
    value: function _handleQueryChange(query) {
      this.refs.menubody.setState({ query: query });
    }
  }]);
  return Menu;
}(Component);

Menu.propTypes = propTypes;

Menu.defaultProps = defaultProps;

var UPDATE_MENU = 'UPDATE_MENU';

var fetchMenu = function fetchMenu(path) {
  return function (dispatch) {
    be5.net.request(path, {}, function (data) {
      dispatch({ type: UPDATE_MENU, data: data });
    });
  };
};

var getMenu = function getMenu(state) {
  return state.menu;
};

var MenuContainer = function MenuContainer(props) {
  return React.createElement(Menu, props);
};

var mapStateToProps$1 = function mapStateToProps(state) {
  return {
    menu: getMenu(state),
    currentRoles: getCurrentRoles(state)
  };
};

var mapDispatchToProps$1 = function mapDispatchToProps(dispatch) {
  return {
    fetchMenu: function fetchMenu$$1(roles) {
      return dispatch(fetchMenu('menu'));
    }
  };
};

var MenuContainer$1 = connect(mapStateToProps$1, mapDispatchToProps$1)(MenuContainer);

var MenuFooter = function MenuFooter() {
  return React.createElement("div", { className: "menuFooter" });
};

var Language = function (_React$Component) {
  inherits(Language, _React$Component);

  function Language(props) {
    classCallCheck(this, Language);
    return possibleConstructorReturn(this, (Language.__proto__ || Object.getPrototypeOf(Language)).call(this, props));
  }

  createClass(Language, [{
    key: 'onClick',
    value: function onClick(e) {
      this.props.onLanguageClick(this.props.code);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.selected) {
        return React.createElement(
          'div',
          { className: "language selectedLanguage" },
          this.props.code
        );
      }
      return React.createElement(
        'div',
        { className: "language", onClick: this.onClick },
        this.props.code
      );
    }
  }]);
  return Language;
}(React.Component);

Language.propTypes = {
  onLanguageClick: PropTypes.func.isRequired
};

var LanguageList = function (_React$Component2) {
  inherits(LanguageList, _React$Component2);

  function LanguageList(props) {
    classCallCheck(this, LanguageList);
    return possibleConstructorReturn(this, (LanguageList.__proto__ || Object.getPrototypeOf(LanguageList)).call(this, props));
  }

  createClass(LanguageList, [{
    key: 'render',
    value: function render() {
      var selected = this.props.data.selected;
      var onLanguageClick = this.props.onLanguageClick;
      var languageNodes = this.props.data.languages.map(function (language) {
        return React.createElement(Language, { key: language, code: language, selected: language === selected, onLanguageClick: onLanguageClick });
      });
      return React.createElement(
        'div',
        { className: "languageList" },
        languageNodes
      );
    }
  }]);
  return LanguageList;
}(React.Component);

var LanguageBox = function (_React$Component3) {
  inherits(LanguageBox, _React$Component3);

  function LanguageBox(props) {
    classCallCheck(this, LanguageBox);

    var _this3 = possibleConstructorReturn(this, (LanguageBox.__proto__ || Object.getPrototypeOf(LanguageBox)).call(this, props));

    _this3.state = { data: { languages: [], selected: '' } };
    return _this3;
  }

  createClass(LanguageBox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      //this.refresh();
    }
  }, {
    key: 'changeLanguage',


    // refresh() {
    //   be5.net.request('languageSelector', {}, function(data) {
    //       be5.locale.set(data.selected, data.messages);
    //       this.setState({ data: {selected: data.selected, languages: data.languages} });
    //     }.bind(this));
    // };

    value: function changeLanguage(language) {
      be5.net.request('languageSelector/select', { language: language }, function (data) {
        this.setState({ data: { selected: data.selected, languages: data.languages } });
        be5.locale.set(language, data.messages);
      }.bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.data && this.state.data.languages.length <= 1) {
        return null;
      }
      return React.createElement(
        'div',
        { className: "languageBox" },
        React.createElement(LanguageList, { data: this.state.data, onLanguageClick: this.changeLanguage })
      );
    }
  }]);
  return LanguageBox;
}(React.Component);

var SideBar = function SideBar() {
  return React.createElement(
    'div',
    { className: "side-bar" },
    React.createElement(UserControlContainer, { size: 'sm' }),
    React.createElement(MenuContainer$1, null),
    React.createElement(MenuFooter, null),
    React.createElement(LanguageBox, null)
  );
};

var StaticPage = function (_React$Component) {
  inherits(StaticPage, _React$Component);

  function StaticPage() {
    classCallCheck(this, StaticPage);
    return possibleConstructorReturn(this, (StaticPage.__proto__ || Object.getPrototypeOf(StaticPage)).apply(this, arguments));
  }

  createClass(StaticPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      addUrlHandlers($('.staticPage'), this.props.frontendParams.documentName);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.value) return null;
      var attributes = this.props.value.data.attributes;
      var title = attributes.title ? React.createElement(
        'h1',
        { className: 'staticPage__title' },
        attributes.title
      ) : null;

      return React.createElement(
        'div',
        { className: 'staticPage' },
        title,
        React.createElement('div', { className: 'staticPage__text', dangerouslySetInnerHTML: { __html: attributes.content } })
      );
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

var Document$1 = function (_React$Component) {
  inherits(Document, _React$Component);

  function Document(props) {
    classCallCheck(this, Document);

    var _this = possibleConstructorReturn(this, (Document.__proto__ || Object.getPrototypeOf(Document)).call(this, props));

    _this.setStateValue(props);
    _this.refresh = _this.refresh.bind(_this);
    return _this;
  }

  createClass(Document, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps && (!this.props.value || this.props.value.meta === undefined || !nextProps.value || nextProps.value.meta === undefined || nextProps.value.meta._ts_ > this.props.value.meta._ts_)) {
        this.setStateValue(nextProps);
      }
    }
  }, {
    key: 'setStateValue',
    value: function setStateValue(props) {
      this.addBaseLayout(props.value);
      this.state = {
        value: props.value || null,
        frontendParams: props.frontendParams || {}
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      bus.replaceListeners(this.props.frontendParams.documentName, function (data) {
        if (_this2.state.value && _this2.state.value.meta && !Number.isInteger(Number.parseInt(_this2.state.value.meta._ts_))) {
          console.error("meta._ts_ mast be string of Integer " + _this2.state.value.meta._ts_);
        }

        if (!_this2.state.value || !_this2.state.value.meta || !data.value || !data.value.meta || data.value.meta._ts_ > _this2.state.value.meta._ts_) {
          _this2.addBaseLayout(data.value);
          _this2.setState(Object.assign({ value: {}, frontendParams: {} }, data));
        }
        // if(!data.loading)this.setState({ loading: false });
        // if(!data.error)this.setState({ error: null });
      });

      bus.replaceListeners(this.props.frontendParams.documentName + DOCUMENT_REFRESH_SUFFIX, function () {
        _this2.refresh();
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      bus.replaceListeners(this.props.frontendParams.documentName, function (data) {});
      bus.replaceListeners(this.props.frontendParams.documentName + DOCUMENT_REFRESH_SUFFIX, function (data) {});
    }
  }, {
    key: 'addBaseLayout',
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
    key: 'render',
    value: function render() {
      var loadingItem = null; //this.state.loading
      //? (<div className={"document-loader " + (this.state.error ? "error" : "")}/>): null;

      //if(this.state.value)be5.ui.setTitle(this.state.value.title);

      var document = this.getDocument();
      if (document === null) {
        return null;
      }

      return React.createElement(
        'div',
        { className: 'document-content', id: 'document-content___' + this.props.frontendParams.documentName },
        loadingItem,
        document
      );
    }
  }, {
    key: 'getDocument',
    value: function getDocument$$1() {
      var documentType = this.getDocumentName();
      if (documentType === null) {
        return null;
      }

      if (documentType === undefined) {
        var info = "<br/>props.type: " + this.props.type + "<br/>frontendParams: " + JSON.stringify(this.state.frontendParams);
        var value = createStaticValue("Document type is undefined", info, { self: "#!" });
        return React.createElement(StaticPage, {
          value: value,
          frontendParams: this.getComponentFrontendParams()
        });
      }

      var DocumentContent = getDocument(documentType);

      if (DocumentContent === undefined) {
        var title = be5.messages.componentForTypeNotRegistered.replace('$type', documentType);
        var _value = createStaticValue(title, '', { self: "#!" });

        return React.createElement(StaticPage, {
          value: _value,
          frontendParams: this.getComponentFrontendParams()
        });
      }

      return React.createElement(
        'div',
        null,
        this.getDevTools(),
        React.createElement(DocumentContent, {
          value: this.state.value,
          frontendParams: this.getComponentFrontendParams()
        })
      );
    }
  }, {
    key: 'getDocumentName',
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
        if (this.state.value.data.attributes && this.state.value.data.attributes.layout && this.state.value.data.attributes.layout.type !== undefined) {
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
    key: 'getDevTools',
    value: function getDevTools() {
      if (!hasDevRole() || !getSelfUrl(this.state.value)) {
        return null;
      }

      return React.createElement(
        'span',
        { onClick: this.refresh, className: "document-reload float-right" },
        React.createElement('img', { src: img, alt: be5.messages.reload,
          title: be5.messages.reload + " " + this.props.frontendParams.documentName + " - " + getSelfUrl(this.state.value) })
      );
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      be5.url.process(this.props.frontendParams, "#!" + getSelfUrl(this.state.value));
    }
  }, {
    key: 'getComponentFrontendParams',
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
    onSuccess: PropTypes.function
  }),
  value: PropTypes.object,
  baseLayout: PropTypes.object,
  type: PropTypes.string
};

var Be5Components = function (_React$Component) {
  inherits(Be5Components, _React$Component);

  function Be5Components(props) {
    classCallCheck(this, Be5Components);

    var _this = possibleConstructorReturn(this, (Be5Components.__proto__ || Object.getPrototypeOf(Be5Components)).call(this, props));

    _this.state = {
      modal: false
    };

    _this.open = _this.open.bind(_this);
    _this.close = _this.close.bind(_this);
    return _this;
  }

  createClass(Be5Components, [{
    key: 'open',
    value: function open() {
      this.setState({ modal: true });
    }
  }, {
    key: 'close',
    value: function close() {
      this.setState({ modal: false });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      bus.listen("mainModalClose", this.close);
      bus.listen("mainModalOpen", this.open);

      bus.listen("alert", function (data) {
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
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(Alert, { stack: { limit: 10 }, html: true }),
        React.createElement(
          Modal,
          { isOpen: this.state.modal, toggle: this.close, className: this.props.className, backdrop: "static" },
          React.createElement(Document$1, { ref: 'document', frontendParams: { documentName: MAIN_MODAL_DOCUMENT } })
        )
      );
    }
  }]);
  return Be5Components;
}(React.Component);

var Application = function Application() {
  return React.createElement(
    'div',
    null,
    React.createElement(Be5Components, null),
    React.createElement(
      SplitPane,
      { split: 'vertical', defaultSize: 280, className: 'main-split-pane' },
      React.createElement(
        'div',
        { className: 'side-pane' },
        React.createElement(SideBar, null)
      ),
      React.createElement(
        'div',
        { className: 'main-pane' },
        React.createElement(Document$1, { frontendParams: { documentName: MAIN_DOCUMENT } })
      )
    )
  );
};

var MainDocumentOnly = function MainDocumentOnly() {
  return React.createElement(
    'div',
    { className: 'MainDocument-only' },
    React.createElement(Be5Components, null),
    React.createElement(Document$1, { frontendParams: { documentName: MAIN_DOCUMENT } })
  );
};

var propTypes$3 = {
  menu: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
  defaultRoute: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

var NavMenu = function (_Component) {
  inherits(NavMenu, _Component);

  function NavMenu(props) {
    classCallCheck(this, NavMenu);
    return possibleConstructorReturn(this, (NavMenu.__proto__ || Object.getPrototypeOf(NavMenu)).call(this, props));
  }

  createClass(NavMenu, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.fetchMenu();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props$user = this.props.user,
          loggedIn = _props$user.loggedIn,
          currentRoles = _props$user.currentRoles;

      if (!arraysEqual(currentRoles, nextProps.user.currentRoles) || loggedIn !== nextProps.user.loggedIn) {
        this.props.fetchMenu();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.menu === null) {
        return null;
      }

      return React.createElement(
        Nav,
        { className: '', navbar: true },
        this._renderMenuItems(this.props.menu.root, false)
      );
    }
  }, {
    key: '_renderMenuItems',
    value: function _renderMenuItems(items, inDropdown) {
      var _this2 = this;

      return _(items).map(function (item) {
        if (!item.children || item.children.length === 0) {
          var _actions$parse = actions.parse(item.action),
              href = _actions$parse.href,
              target = _actions$parse.target;

          var _active = false;
          if (_this2.isActive(href)) _active = true;
          return React.createElement(
            NavItem,
            { key: target + href },
            React.createElement(
              NavLink,
              { onClick: processHashUrl, href: href, active: _active },
              item.title
            )
          );
        }

        var _renderDropdownMenuIt = _this2._renderDropdownMenuItems(item.children, true),
            dropdownMenuItems = _renderDropdownMenuIt.dropdownMenuItems,
            active = _renderDropdownMenuIt.active;

        return React.createElement(
          UncontrolledDropdown,
          { nav: true, inNavbar: true, key: item.title },
          React.createElement(
            DropdownToggle,
            { nav: true, caret: true, className: classNames({ active: active }) },
            item.title
          ),
          React.createElement(
            DropdownMenu,
            null,
            dropdownMenuItems
          )
        );
      });
    }
  }, {
    key: '_renderDropdownMenuItems',
    value: function _renderDropdownMenuItems(items) {
      var _this3 = this;

      var anyActive = false;
      var dropdownMenuItems = _(items).map(function (item) {
        var _actions$parse2 = actions.parse(item.action),
            href = _actions$parse2.href,
            target = _actions$parse2.target;

        if (_this3.isActive(href)) anyActive = true;
        return React.createElement(
          DropdownItem,
          {
            onClick: processHashUrl,
            href: href,
            key: target + href,
            active: _this3.isActive(href)
          },
          item.title
        );
      });

      return {
        dropdownMenuItems: dropdownMenuItems,
        active: anyActive
      };
    }
  }, {
    key: 'isActive',
    value: function isActive(href) {
      return this.props.url.startsWith(href) || href === "#!" + this.props.defaultRoute && hashUrlIsEmpty(this.props.url);
    }
  }]);
  return NavMenu;
}(Component);

NavMenu.propTypes = propTypes$3;

var propTypes$2 = {
  menu: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
  defaultRoute: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  brand: PropTypes.string,
  containerClass: PropTypes.string
};

var NavbarMenu = function (_Component) {
  inherits(NavbarMenu, _Component);

  function NavbarMenu(props) {
    classCallCheck(this, NavbarMenu);

    var _this = possibleConstructorReturn(this, (NavbarMenu.__proto__ || Object.getPrototypeOf(NavbarMenu)).call(this, props));

    _this.state = { isOpen: false };

    _this.toggle = _this.toggle.bind(_this);
    return _this;
  }

  createClass(NavbarMenu, [{
    key: 'toggle',
    value: function toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        Navbar,
        { color: 'dark', dark: true, expand: 'md' },
        React.createElement(
          'div',
          { className: this.props.containerClass },
          this.navbarBrand(),
          React.createElement(NavbarToggler, { onClick: this.toggle }),
          React.createElement(
            Collapse,
            { isOpen: this.state.isOpen, navbar: true },
            React.createElement(NavMenu, this.props),
            this.rightButtons()
          )
        )
      );
    }
  }, {
    key: 'navbarBrand',
    value: function navbarBrand() {
      return this.props.brand ? React.createElement(
        'a',
        { href: '#!', onClick: processHashUrl, className: 'navbar-brand' },
        this.props.brand
      ) : undefined;
    }
  }, {
    key: 'rightButtons',
    value: function rightButtons() {
      if (!this.props.user.loggedIn) {
        return this.notLoggedInForm();
      } else {
        return this.loggedInForm();
      }
    }
  }, {
    key: 'loggedInForm',
    value: function loggedInForm() {
      var _props$user = this.props.user,
          userName = _props$user.userName,
          currentRoles = _props$user.currentRoles,
          availableRoles = _props$user.availableRoles;


      return React.createElement(
        'form',
        { className: 'form-inline ml-auto' },
        React.createElement(
          UncontrolledTooltip,
          { placement: 'left', target: 'RoleSelector' },
          userName
        ),
        React.createElement(RoleSelector, {
          id: "RoleSelector",
          availableRoles: availableRoles,
          currentRoles: currentRoles,
          toggleRoles: this.props.toggleRoles
        }),
        ' ',
        React.createElement(
          Button,
          { onClick: processHashUrl, href: '#!logout', color: 'secondary' },
          be5.messages.logout
        )
      );
    }
  }, {
    key: 'notLoggedInForm',
    value: function notLoggedInForm() {
      return React.createElement(
        'form',
        { className: 'form-inline ml-auto' },
        React.createElement(
          Button,
          { onClick: processHashUrl, href: '#!login', color: 'secondary' },
          be5.messages.login
        )
      );
    }
  }]);
  return NavbarMenu;
}(Component);

NavbarMenu.propTypes = propTypes$2;

NavbarMenu.defaultProps = {
  containerClass: "container"
};

var HelpInfo = function (_React$Component) {
  inherits(HelpInfo, _React$Component);

  function HelpInfo(props) {
    classCallCheck(this, HelpInfo);

    var _this = possibleConstructorReturn(this, (HelpInfo.__proto__ || Object.getPrototypeOf(HelpInfo)).call(this));

    _this.state = { isOpen: props.isOpen };

    _this.helpCollapseToggle = _this.helpCollapseToggle.bind(_this);
    return _this;
  }

  createClass(HelpInfo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.value) {
        be5.url.process({ documentName: this.props.documentName }, "#!" + this.props.value);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.value) {
        be5.url.process({ documentName: this.props.documentName }, "#!" + this.props.value);
      }
    }
  }, {
    key: 'helpCollapseToggle',
    value: function helpCollapseToggle() {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.value) {
        return React.createElement(
          'div',
          { className: 'helpInfo clearfix' },
          React.createElement(
            Button,
            { color: 'info', className: classNames('btn-sm', this.props.className),
              onClick: this.helpCollapseToggle },
            be5.messages.helpInfo
          ),
          React.createElement(
            Collapse,
            { isOpen: this.state.isOpen, tag: this.props.tag },
            React.createElement(
              'div',
              { className: 'alert alert-success max-width-970', role: 'alert' },
              React.createElement(Document$1, { frontendParams: { documentName: this.props.documentName } })
            )
          )
        );
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

var Error$1 = function (_React$Component) {
  inherits(Error, _React$Component);

  function Error() {
    classCallCheck(this, Error);

    var _this = possibleConstructorReturn(this, (Error.__proto__ || Object.getPrototypeOf(Error)).call(this));

    _this.state = { helpCollapse: false };
    _this.helpCollapseToggle = _this.helpCollapseToggle.bind(_this);
    return _this;
  }

  createClass(Error, [{
    key: 'helpCollapseToggle',
    value: function helpCollapseToggle() {
      this.setState({ helpCollapse: !this.state.helpCollapse });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          status = _props.status,
          title = _props.title,
          code = _props.code,
          detail = _props.detail;


      return React.createElement(
        'div',
        { className: 'errorPane__error' },
        React.createElement(
          'h1',
          { className: 'errorPane__title errorPane__title_' + status },
          status,
          ' - ',
          title
        ),
        this.frontendHelp(),
        React.createElement('br', null),
        code !== undefined ? React.createElement('pre', { className: 'errorPane__code', dangerouslySetInnerHTML: { __html: code } }) : null,
        detail !== undefined ? React.createElement(
          'div',
          null,
          React.createElement(
            Button,
            { color: 'info', className: 'btn-sm', onClick: this.helpCollapseToggle, style: { marginBottom: '1rem' } },
            be5.messages.details
          ),
          React.createElement(
            Collapse,
            { isOpen: this.state.helpCollapse },
            React.createElement(
              Card,
              null,
              React.createElement(
                CardBody,
                null,
                React.createElement(
                  'pre',
                  { className: 'errorPane__detail' },
                  detail
                )
              )
            )
          )
        ) : null
      );
    }
  }, {
    key: 'frontendHelp',
    value: function frontendHelp() {
      var status = this.props.status;

      var content = void 0;
      if (status === '404' || status === '403') {
        if (status === '404') {
          content = React.createElement(
            'div',
            null,
            React.createElement(
              'a',
              { href: '#!', className: 'btn btn-primary' },
              be5.messages.goToHomepage
            )
          );
        }
        if (status === '403') {
          content = React.createElement(
            'div',
            null,
            React.createElement(
              'a',
              { href: '/', className: 'btn btn-primary' },
              be5.messages.goToHomepage
            )
          );
        }
        return React.createElement(
          'div',
          null,
          React.createElement('br', null),
          React.createElement(
            'h6',
            null,
            content
          )
        );
      }
      return null;
    }
  }]);
  return Error;
}(React.Component);

var ErrorPane = function (_React$Component2) {
  inherits(ErrorPane, _React$Component2);

  function ErrorPane() {
    classCallCheck(this, ErrorPane);
    return possibleConstructorReturn(this, (ErrorPane.__proto__ || Object.getPrototypeOf(ErrorPane)).apply(this, arguments));
  }

  createClass(ErrorPane, [{
    key: 'render',
    value: function render() {
      var errors = this.props.value.errors;

      if (!errors || errors.length === 0) {
        return null;
      }

      return React.createElement(
        'div',
        { className: 'errorPane' },
        errors.map(function (error, i) {
          return React.createElement(Error$1, _extends({}, error, { key: i }));
        })
      );
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

var FormWizard = function (_React$Component) {
  inherits(FormWizard, _React$Component);

  function FormWizard(props) {
    classCallCheck(this, FormWizard);

    var _this = possibleConstructorReturn(this, (FormWizard.__proto__ || Object.getPrototypeOf(FormWizard)).call(this, props));

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

  createClass(FormWizard, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: 'init',
    value: function init() {
      this.setState(this.getPrevNextBtnState(this.props.startAtStep));
      processHashUrlForDocument(this.props.steps[this.state.compState].url, this.props.documentName);
    }
  }, {
    key: 'getNavStates',
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

      return { current: indx, styles: styles };
    }
  }, {
    key: 'getPrevNextBtnState',
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
    key: 'checkNavState',
    value: function checkNavState(currentStep) {
      this.setState(this.getPrevNextBtnState(currentStep));
    }
  }, {
    key: 'setNavState',
    value: function setNavState(next) {
      this.setState({ navState: this.getNavStates(next, this.props.steps.length) });

      if (next < this.props.steps.length) {
        this.setState({ compState: next });
      }

      processHashUrlForDocument(this.props.steps[next].url, this.props.documentName);

      this.checkNavState(next);
    }
  }, {
    key: 'jumpToStep',
    value: function jumpToStep(evt) {
      this.setNavState(evt);
    }
  }, {
    key: 'next',
    value: function next() {
      if (this.state.compState + 1 < this.props.steps.length) {
        this.setNavState(this.state.compState + 1);
      }
    }
  }, {
    key: 'previous',
    value: function previous() {
      if (this.state.compState > 0) {
        this.setNavState(this.state.compState - 1);
      }
    }
  }, {
    key: 'getClassName',
    value: function getClassName(className, i) {
      var liClassName = className + "-" + this.state.navState.styles[i];

      // if step ui based navigation is disabled, then dont highlight step
      if (!this.props.stepsNavigation) liClassName += " no-hl";

      return liClassName;
    }
  }, {
    key: 'renderSteps',
    value: function renderSteps() {
      var _this2 = this;

      return this.props.steps.map(function (s, i) {
        return React.createElement(
          'li',
          { className: _this2.getClassName("progtrckr", i), onClick: function onClick() {
              return _this2.jumpToStep(i);
            }, key: i, value: i },
          React.createElement(
            'em',
            null,
            i + 1
          ),
          React.createElement('span', { dangerouslySetInnerHTML: { __html: _this2.props.steps[i].title } })
        )
        //{this.props.steps[i].name}
        ;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var props = this.props,
          state = this.state;


      return React.createElement(
        'div',
        { className: 'formWizard' },
        this.props.showSteps ? React.createElement(
          'ol',
          { className: 'progtrckr clearfix' },
          this.renderSteps()
        ) : React.createElement('span', null),
        React.createElement(Document$1, { frontendParams: { documentName: props.documentName } }),
        React.createElement('br', null),
        React.createElement(
          'div',
          { style: props.showNavigation ? {} : this.hidden, className: 'footer-buttons' },
          React.createElement(
            'button',
            {
              className: classNames(props.backButtonCls, { disabled: !state.showPreviousBtn }),
              onClick: function onClick() {
                _this3.previous();
              },
              id: 'prev-button'
            },
            props.backButtonText
          ),
          React.createElement(
            'button',
            {
              className: classNames(props.nextButtonCls, { disabled: !state.showNextBtn }),
              onClick: function onClick() {
                _this3.next();
              },
              id: 'next-button'
            },
            state.nextStepText
          )
        )
      );
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

var Navs = function (_React$Component) {
  inherits(Navs, _React$Component);

  function Navs(props) {
    classCallCheck(this, Navs);

    var _this = possibleConstructorReturn(this, (Navs.__proto__ || Object.getPrototypeOf(Navs)).call(this, props));

    _this.state = {
      compState: _this.props.startAtStep
    };

    _this.init = _this.init.bind(_this);
    _this.setNavState = _this.setNavState.bind(_this);
    return _this;
  }

  createClass(Navs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this2 = this;

      if (this.props.baseUrl !== undefined && this.state.compState !== this.props.startAtStep) {
        this.setState({ compState: this.props.startAtStep }, function () {
          _this2.init();
        });
      }
    }
  }, {
    key: 'init',
    value: function init() {
      processHashUrlForDocument(this.props.steps[this.state.compState].url, this.props.documentName);
    }
  }, {
    key: 'setNavState',
    value: function setNavState(e) {
      if (!e.ctrlKey) {
        e.preventDefault();
        var id = this.getIDbyUrl(e.target.getAttribute("href"));

        if (this.props.onOpenNav !== undefined) this.props.onOpenNav(id);

        if (this.props.baseUrl !== undefined && this.getUrl(id) !== be5.url.get()) {
          processHashUrlForDocument(this.getUrl(id), this.props.parentDocumentName);
        } else {
          processHashUrlForDocument(e, this.props.documentName);
          this.setState({ compState: id });
        }
      }
    }
  }, {
    key: 'getUrl',
    value: function getUrl(id) {
      if (id === 0) return "#!" + this.props.baseUrl;else return "#!" + this.props.baseUrl + "/" + id;
    }
  }, {
    key: 'getIDbyUrl',
    value: function getIDbyUrl(url) {
      for (var i = 0; i < this.props.steps.length; i++) {
        if (this.props.steps[i].url === url) return i;
      }
      return 0;
    }
  }, {
    key: 'renderSteps',
    value: function renderSteps() {
      var _this3 = this;

      return this.props.steps.map(function (s, i) {
        return React.createElement(
          NavItem,
          { key: "NavItem" + i },
          React.createElement(
            NavLink,
            { href: _this3.props.steps[i].url, active: i === _this3.state.compState, onClick: _this3.setNavState,
              key: "NavLink" + i },
            _this3.props.steps[i].title
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var navProps = {
        tabs: this.props.tabs,
        pills: this.props.pills,
        vertical: this.props.vertical,
        navbar: this.props.navbar,
        tag: this.props.tag
      };

      return React.createElement(
        'div',
        { className: 'navs-component' },
        React.createElement(
          Nav,
          navProps,
          this.renderSteps()
        ),
        React.createElement(
          'div',
          { className: 'tab-content' },
          React.createElement(Document$1, { frontendParams: { documentName: this.props.documentName } })
        )
      );
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
  var Component$$1 = props.component || NavbarMenu;
  return React.createElement(Component$$1, props);
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
    toggleRoles: function toggleRoles$$1(roles) {
      return dispatch(toggleRoles(roles));
    },
    fetchMenu: function fetchMenu$$1(roles) {
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
    obj[key] = params[key];return obj;
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
    obj[key] = params[key];return obj;
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
    changeDocument(frontendParams.documentName, { value: json, frontendParams: frontendParams });
  });
};

var loadTableByUrl = function loadTableByUrl(url, frontendParams) {
  getTable(getTableParams(url), function (json) {
    _performTable(json, frontendParams);
  }, function (json) {
    changeDocument(frontendParams.documentName, { value: json, frontendParams: frontendParams });
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

  var url = be5.url.create(["table", entity, query || '*** Selection view ***'], { asyncValue: input });
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
    options.push({ value: rows[i].cells[0].content, label: rows[i].cells[1].content });
  }
  return options;
};

var getTableParams = function getTableParams(url) {
  var _ref;

  var attr = be5.url.parse(url);

  return _ref = {}, defineProperty(_ref, ENTITY_NAME_PARAM, attr.positional[1]), defineProperty(_ref, QUERY_NAME_PARAM, attr.positional[2]), defineProperty(_ref, CONTEXT_PARAMS, attr.named), _ref;
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
    changeDocument(MAIN_MODAL_DOCUMENT, { value: json, frontendParams: frontendParams });
  } else {
    changeDocument(documentName, { value: json, frontendParams: frontendParams });
  }
};

var getRequestParams = function getRequestParams(params) {
  var _ref2;

  var entity = params[ENTITY_NAME_PARAM];
  var query = params[QUERY_NAME_PARAM];
  Preconditions.passed(entity);
  Preconditions.passed(query);

  var finalParams = withSavedTableFilter(entity, query, params[CONTEXT_PARAMS]);

  return _ref2 = {}, defineProperty(_ref2, ENTITY_NAME_PARAM, entity), defineProperty(_ref2, QUERY_NAME_PARAM, query), defineProperty(_ref2, CONTEXT_PARAMS, be5.net.paramString(finalParams)), defineProperty(_ref2, TIMESTAMP_PARAM, new Date().getTime()), _ref2;
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
        class: options.link.class || "process-hash-url"
      });
    }
    if (options.css || options === 'th') {
      var wrap = $('<div>');
      if (options.css && options.css.class) wrap.addClass(options.css.class);
      if (options === 'th') wrap.addClass("ta-center td-strong");
      data = wrap.html(data);
    }
  }
  if (data instanceof $) {
    data = $('<div>').append($(data).clone()).html();
  }
  return data === undefined || data === null ? '' : data;
};

var Form = function (_React$Component) {
  inherits(Form, _React$Component);

  function Form(props) {
    classCallCheck(this, Form);

    var _this = possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.state = { values: _this.props.value.data.attributes.bean.values };

    _this._onFieldChange = _this._onFieldChange.bind(_this);
    _this._onReloadOnChange = _this._onReloadOnChange.bind(_this);
    _this._setValue = _this._setValue.bind(_this);
    _this._applyOnSubmit = _this._applyOnSubmit.bind(_this);
    _this.apply = _this.apply.bind(_this);
    return _this;
  }

  createClass(Form, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      addUrlHandlers($('.be5-form'), this.props.frontendParams.documentName);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(Object.assign({}, {
        values: nextProps.value.data.attributes.bean.values,
        wasValidated: false,
        submitted: false
      }));
    }
  }, {
    key: 'getParams',
    value: function getParams(values) {
      var _operationInfo;

      var attr = this.props.value.data.attributes;
      var positional = void 0;
      if (this.state.formAction) {
        positional = be5.url.parse(this.state.formAction).positional;
      } else {
        positional = ['form', attr.entity, attr.query, attr.operation];
      }
      var operationInfo = (_operationInfo = {}, defineProperty(_operationInfo, ENTITY_NAME_PARAM, positional[1]), defineProperty(_operationInfo, QUERY_NAME_PARAM, positional[2]), defineProperty(_operationInfo, OPERATION_NAME_PARAM, positional[3]), defineProperty(_operationInfo, CONTEXT_PARAMS, JSON.stringify(attr.operationParams)), _operationInfo);
      return getOperationInfo(operationInfo, values);
    }
  }, {
    key: '_reloadOnChange',
    value: function _reloadOnChange(controlName) {
      var _this2 = this;

      if (!this.state.submitted) {
        this.setState({ submitted: true }, function () {
          var values = Object.assign({}, _this2.state.values);
          values[RELOAD_CONTROL_NAME] = controlName;

          forms.load(_this2.getParams(values), _this2.props.frontendParams);
        });
      }
    }
  }, {
    key: 'apply',
    value: function apply() {
      var _this3 = this;

      this.setState({ wasValidated: false });
      if (!this.state.submitted) {
        this.setState({ submitted: true }, function () {
          forms.apply(_this3.getParams(_this3.state.values), _this3.props.frontendParams);
        });
      }
    }
  }, {
    key: '_applyOnSubmit',
    value: function _applyOnSubmit(e) {
      // Hitting <enter> in any textbox in Chrome triggers the form submit,
      // even when there is no submit button.
      // That's why I explicitly define the cancellation.
      e.preventDefault();
      this.apply();
    }
  }, {
    key: '_setValue',
    value: function _setValue(name, value, callback) {
      if (!this.state.submitted) {
        var newValues = Object.assign({}, this.state.values);
        JsonPointer.set(newValues, name, value);
        this.setState({ values: newValues }, callback);
      }
    }
  }, {
    key: '_onFieldChange',
    value: function _onFieldChange(name, value) {
      this._setValue(name, value);
    }
  }, {
    key: '_onReloadOnChange',
    value: function _onReloadOnChange(name, value) {
      var _this4 = this;

      var attributes = this.props.value.data.attributes;
      var callback = function callback() {
        if (attributes.bean.meta[name].reloadOnChange === true || attributes.bean.meta[name].autoRefresh === true) {
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
    key: '_createForm',
    value: function _createForm() {
      return React.createElement(
        'form',
        {
          onSubmit: this._applyOnSubmit,
          className: classNames(this.state.wasValidated ? 'was-validated' : '')
        },
        this._createFormContent()
      );
    }
  }, {
    key: '_createFormContent',
    value: function _createFormContent() {
      return React.createElement(
        'div',
        null,
        this._createFormProperties(),
        this._createFormActions()
      );
    }
  }, {
    key: '_createFormProperties',
    value: function _createFormProperties() {
      var attributes = this.props.value.data.attributes;
      return React.createElement(PropertySet, {
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
    key: '_createFormActions',
    value: function _createFormActions() {
      return React.createElement(
        'div',
        { className: 'formActions' },
        this._createSubmitAction(),
        ' ',
        _createBackAction(this.props.value.data.attributes.layout, this.props.frontendParams)
      );
    }
  }, {
    key: '_createSubmitAction',
    value: function _createSubmitAction(actionUrl, name) {
      var _this5 = this;

      var attr = this.props.value.data.attributes;
      var _attr$layout = attr.layout,
          bsSize = _attr$layout.bsSize,
          submitText = _attr$layout.submitText;

      return React.createElement(
        Transition,
        { 'in': this.state.submitted, timeout: 600 },
        function (state) {
          return React.createElement(
            'button',
            {
              type: 'submit',
              className: classNames("btn btn-primary", { 'btn-sm': bsSize === 'sm' }, { 'btn-lg': bsSize === 'lg' }),
              onClick: function onClick() {
                return _this5.setState({
                  wasValidated: true,
                  formAction: actionUrl
                });
              },
              title: _this5.state.submitted ? be5.messages.submitted : "",
              disabled: state === 'entered'
            },
            name || submitText || be5.messages.Submit
          );
        }
      );
    }
  }, {
    key: '_getErrorPane',
    value: function _getErrorPane() {
      var errorModel = this.props.value.data.attributes.errorModel;

      if (errorModel) {
        return React.createElement(ErrorPane, { value: { errors: [errorModel], meta: this.props.meta } });
      } else {
        return null;
      }
    }
  }, {
    key: 'getFormClass',
    value: function getFormClass() {
      var attributes = this.props.value.data.attributes;
      var entity = makeSafeForClassName(attributes.entity);
      var operation = makeSafeForClassName(attributes.operation);
      return entity + '_' + operation;
    }
  }, {
    key: 'render',
    value: function render() {
      var attributes = this.props.value.data.attributes;
      var baseClasses = attributes.layout.baseClasses || 'formBox col-12 max-width-970 formBoxDefault';
      return React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: classNames('be5-form', this.getFormClass(), baseClasses, attributes.layout.classes) },
          React.createElement(
            'h1',
            { className: 'form-component__title' },
            attributes.title
          ),
          this._createForm()
        ),
        React.createElement(
          'div',
          { className: 'col-12' },
          this._getErrorPane()
        )
      );
    }
  }]);
  return Form;
}(React.Component);

Form.propTypes = {
  value: PropTypes.object.isRequired,
  frontendParams: PropTypes.object.isRequired
};

registerDocument('verticalForm', Form);

var HorizontalForm = function (_Form) {
  inherits(HorizontalForm, _Form);

  function HorizontalForm() {
    classCallCheck(this, HorizontalForm);
    return possibleConstructorReturn(this, (HorizontalForm.__proto__ || Object.getPrototypeOf(HorizontalForm)).apply(this, arguments));
  }

  createClass(HorizontalForm, [{
    key: '_createFormProperties',
    value: function _createFormProperties() {
      var attributes = this.props.value.data.attributes;
      return React.createElement(PropertySet, {
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
    key: '_createFormActions',
    value: function _createFormActions() {
      var horizontalColSize = this.props.value.data.attributes.layout.horizontalColSize || 3;
      var colTag = 'col-lg-' + (12 - horizontalColSize);
      var offsetTag = 'offset-lg-' + horizontalColSize;

      return React.createElement(
        'div',
        { className: 'formActions form-row' },
        React.createElement(
          'div',
          { className: classNames(colTag, offsetTag) },
          this._createSubmitAction(),
          ' ',
          _createBackAction(this.props.value.data.attributes.layout, this.props.frontendParams)
        )
      );
    }
  }]);
  return HorizontalForm;
}(Form);

registerDocument('form', HorizontalForm);

var SubmitOnChangeForm = function (_Form) {
  inherits(SubmitOnChangeForm, _Form);

  function SubmitOnChangeForm(props) {
    classCallCheck(this, SubmitOnChangeForm);

    var _this = possibleConstructorReturn(this, (SubmitOnChangeForm.__proto__ || Object.getPrototypeOf(SubmitOnChangeForm)).call(this, props));

    _this._onFieldChangeAndSubmit = _this._onFieldChangeAndSubmit.bind(_this);
    return _this;
  }

  createClass(SubmitOnChangeForm, [{
    key: '_onFieldChangeAndSubmit',
    value: function _onFieldChangeAndSubmit(name, value) {
      get(SubmitOnChangeForm.prototype.__proto__ || Object.getPrototypeOf(SubmitOnChangeForm.prototype), '_setValue', this).call(this, name, value);
      get(SubmitOnChangeForm.prototype.__proto__ || Object.getPrototypeOf(SubmitOnChangeForm.prototype), 'apply', this).call(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var attributes = this.props.value.data.attributes;
      return React.createElement(
        'form',
        {
          className: classNames('submit-onchange-form', this.props.wasValidated ? 'was-validated' : '', attributes.layout.classes)
        },
        React.createElement(PropertyInput, {
          id: 0,
          bean: attributes.bean,
          value: JsonPointer.get(attributes.bean.values, attributes.bean.order[0]),
          localization: be5.messages.property,
          onChange: function onChange() {},
          reloadOnChange: this._onFieldChangeAndSubmit,
          selectLoadOptions: asyncSelectLoadOptions,
          bsSize: attributes.layout.bsSize
        }),
        React.createElement(
          'div',
          { className: 'col-12' },
          this._getErrorPane()
        )
      );
    }
  }]);
  return SubmitOnChangeForm;
}(Form);

registerDocument('submitOnChange', SubmitOnChangeForm);

var ModalForm = function (_Form) {
  inherits(ModalForm, _Form);

  function ModalForm() {
    classCallCheck(this, ModalForm);
    return possibleConstructorReturn(this, (ModalForm.__proto__ || Object.getPrototypeOf(ModalForm)).apply(this, arguments));
  }

  createClass(ModalForm, [{
    key: '_createFormContent',
    value: function _createFormContent() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          ModalBody,
          null,
          this._createFormProperties()
        ),
        React.createElement(
          'div',
          { className: 'col-12' },
          this._getErrorPane()
        ),
        React.createElement(
          ModalFooter,
          null,
          this._createSubmitAction(),
          ' ',
          this._createModalCloseAction()
        )
      );
    }
  }, {
    key: '_createModalCloseAction',
    value: function _createModalCloseAction() {
      var _this2 = this;

      var layout = this.props.value.data.attributes.layout;
      var action = layout.cancelAction || new FrontendAction(CLOSE_MAIN_MODAL);
      return React.createElement(
        'button',
        { type: 'button', className: 'btn btn-secondary close-action-btn',
          onClick: function onClick() {
            return executeFrontendActions(action, _this2.props.frontendParams);
          } },
        layout.cancelActionText || be5.messages.close
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var attributes = this.props.value.data.attributes;
      return React.createElement(
        'div',
        { className: classNames('be5-form', this.getFormClass(), attributes.layout.classes) },
        React.createElement(
          ModalHeader,
          { tag: 'h5', toggle: function toggle() {
              return bus.fire("mainModalClose");
            } },
          attributes.title
        ),
        this._createForm()
      );
    }
  }]);
  return ModalForm;
}(Form);

registerDocument('modalForm', ModalForm);

var InlineMiniForm = function (_Form) {
  inherits(InlineMiniForm, _Form);

  function InlineMiniForm() {
    classCallCheck(this, InlineMiniForm);
    return possibleConstructorReturn(this, (InlineMiniForm.__proto__ || Object.getPrototypeOf(InlineMiniForm)).apply(this, arguments));
  }

  createClass(InlineMiniForm, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

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
        return React.createElement(Property, _extends({ key: path, path: path }, commonProps, { value: JsonPointer.get(_this2.state.values, path) }));
      });

      var baseClasses = attributes.layout.baseClasses || 'form-inline-mini';
      return React.createElement(
        'div',
        { className: classNames('be5-form', this.getFormClass(), baseClasses, attributes.layout.classes) },
        React.createElement(
          'form',
          {
            onSubmit: this._applyOnSubmit,
            className: classNames('form-inline', this.state.wasValidated ? 'was-validated' : '')
          },
          attributes.title !== "" ? React.createElement(
            'label',
            { className: classNames("mr-sm-2", { 'col-form-label-sm': attributes.layout.bsSize === "sm" }, { 'col-form-label-lg': attributes.layout.bsSize === "lg" }) },
            React.createElement(
              'strong',
              null,
              attributes.title
            )
          ) : null,
          properties,
          this._createSubmitAction(),
          this._getErrorPane()
        )
      );
    }
  }]);
  return InlineMiniForm;
}(Form);

registerDocument('inlineMiniForm', InlineMiniForm);

var FinishedResult = function (_React$Component) {
  inherits(FinishedResult, _React$Component);

  function FinishedResult() {
    classCallCheck(this, FinishedResult);
    return possibleConstructorReturn(this, (FinishedResult.__proto__ || Object.getPrototypeOf(FinishedResult)).apply(this, arguments));
  }

  createClass(FinishedResult, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      addUrlHandlers($('.finishedResult'), this.props.frontendParams.documentName);
    }
  }, {
    key: 'render',
    value: function render() {
      var attributes = this.props.value.data.attributes;
      var result = attributes.operationResult;

      var message = result.message;
      if (result.status === 'FINISHED' && result.message === undefined) {
        message = be5.messages.successfullyCompleted;
      }

      return React.createElement(
        'div',
        { className: 'finishedResult' },
        React.createElement('div', { dangerouslySetInnerHTML: { __html: message }, className: 'mb-3' }),
        _createBackAction(attributes.layout, this.props.frontendParams)
      );
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

var OperationBox = function (_React$Component) {
  inherits(OperationBox, _React$Component);

  function OperationBox(props) {
    classCallCheck(this, OperationBox);
    return possibleConstructorReturn(this, (OperationBox.__proto__ || Object.getPrototypeOf(OperationBox)).call(this, props));
  }

  createClass(OperationBox, [{
    key: 'render',
    value: function render() {
      if (!this.props.operations) return null;

      var operationItems = this.splitWithSpaces(this.getOperations());
      if (operationItems === 0) {
        return null;
      } else {
        return React.createElement(
          'div',
          { className: 'operationList' },
          operationItems
        );
      }
    }
  }, {
    key: 'getOperations',
    value: function getOperations() {
      var _this2 = this;

      return this.props.operations.attributes.filter(function (operation) {
        return _this2.props.hideOperations.indexOf(operation.name) === -1;
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
        return React.createElement(
          'button',
          {
            key: operation.name,
            ref: operation.name,
            onClick: _this2.onClick.bind(_this2, operation.name),
            className: 'btn btn-secondary btn-secondary-old btn-sm',
            disabled: !_this2.isEnabled(operation.name)
          },
          operation.title
        );
      });
    }
  }, {
    key: 'onClick',
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
    key: 'isEnabled',
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
    key: 'splitWithSpaces',
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
    var _url = be5.url.create(pUrl.positional, Object.assign({}, pUrl.named, { cat: categories[0].id }));
    return React.createElement(
      'div',
      { className: 'category-navigation category-navigation__not-select' },
      React.createElement(
        'a',
        { href: "#!" + _url },
        be5.locale.msg('Switch to categorized view')
      )
    );
  }

  var row = [];

  function tableTd(categories) {
    return categories.map(function (cat) {
      if (parseInt(currentCat) !== cat.id) {
        var _url2 = be5.url.create(pUrl.positional, Object.assign({}, pUrl.named, { cat: cat.id }));
        return React.createElement(
          'a',
          { className: 'd-block',
            href: "#!" + _url2, key: cat.id },
          cat.name
        );
      } else {
        return React.createElement(
          'span',
          { className: 'd-block', key: cat.id },
          cat.name
        );
      }
    });
  }

  function tableRow(categories, lvl) {
    var td = React.createElement(
      'td',
      { key: lvl },
      tableTd(categories)
    );
    row.push(td);
    if (categories.length === 1 && categories[0].children !== undefined && categories[0].children.length > 0) {
      row.push(React.createElement(
        'td',
        { key: "nav" + lvl },
        React.createElement(
          'span',
          null,
          '->'
        )
      ));
      tableRow(categories[0].children, lvl + 1);
    }
  }

  tableRow(categories, 0);

  return React.createElement(
    'div',
    { className: 'category-navigation' },
    React.createElement(
      'table',
      null,
      React.createElement(
        'tbody',
        null,
        React.createElement(
          'tr',
          null,
          row
        )
      )
    )
  );
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
    var paramsObject = (_paramsObject = {}, defineProperty(_paramsObject, ENTITY_NAME_PARAM, entity), defineProperty(_paramsObject, QUERY_NAME_PARAM, query || 'All records'), defineProperty(_paramsObject, CONTEXT_PARAMS, newParams), _paramsObject);
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
    return React.createElement(
      "div",
      { className: "table-filter-ui mb-2" },
      React.createElement(
        "strong",
        null,
        be5.messages.table.filter + ': '
      ),
      React.createElement(
        "span",
        null,
        getOperationParamsInfo()
      ),
      ' ',
      React.createElement(
        "a",
        { href: "#", onClick: clearFilter },
        be5.messages.table.clearFilter
      )
    );
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

var Table = function (_Component) {
  inherits(Table, _Component);

  function Table(props) {
    classCallCheck(this, Table);

    var _this = possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this.state = { runReload: "", selectedRows: [] };
    _this.onOperationClick = _this.onOperationClick.bind(_this);
    _this.setSelectedRows = _this.setSelectedRows.bind(_this);
    _this.getSelectedRows = _this.getSelectedRows.bind(_this);
    return _this;
  }

  createClass(Table, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      Table.storeDocumentState(this.props);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.value.meta._ts_ > this.props.value.meta._ts_) {
        Table.storeDocumentState(nextProps);
      }
      return true;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      if (this.state.selectedRows.length > 0) this.setState({ selectedRows: [] });
    }
  }, {
    key: 'onOperationClick',
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

      var contextParams = void 0;
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
    key: 'render',
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
      var operations = getResourceByType(included, "documentOperations");
      var filterInfo = getResourceByType(included, "filterInfo");

      return React.createElement(
        'div',
        { className: classNames("table-component", this.getTableClass(), data.attributes.layout.classes) },
        this.topForm(topFormJson),
        this.getTitleTag(value),
        React.createElement(CategoryNavigation, {
          data: categories,
          url: getSelfUrl(this.props.value)
        }),
        React.createElement(OperationBox, {
          operations: operations,
          onOperationClick: this.onOperationClick,
          selectedRows: this.state.selectedRows,
          hasRows: data.attributes.rows.length > 0,
          hideOperations: this.getHideOperations(data, topFormJson)
        }),
        React.createElement(FilterUI, {
          data: filterInfo,
          entity: data.attributes.category,
          query: data.attributes.page,
          params: data.attributes.parameters,
          frontendParams: this.props.frontendParams
        }),
        this.tableBox(value, data, operations),
        this._createTableCancelAction()
      );
    }
  }, {
    key: 'getHideOperations',
    value: function getHideOperations(data, topFormJson) {
      var hideOperations = data.attributes.layout.hideOperations || [];
      if (topFormJson) hideOperations.push(topFormJson.data.attributes.operation);
      return hideOperations;
    }
  }, {
    key: 'tableBox',
    value: function tableBox(value, data, operations) {
      var displayType = value.data.attributes.parameters && value.data.attributes.parameters._displayType_ || data.attributes.layout.tableBox || data.attributes.layout._displayType_ || DEFAULT_TABLE_BOX;

      var TableBoxComponent = getTableBox(displayType);
      if (TableBoxComponent === undefined) {
        return React.createElement(
          'div',
          null,
          be5.messages.tableBoxForTypeNotRegistered.replace('$type', displayType)
        );
      }
      return React.createElement(TableBoxComponent, {
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
    key: 'setSelectedRows',
    value: function setSelectedRows(newRows) {
      this.setState({ selectedRows: newRows });
    }
  }, {
    key: 'getSelectedRows',
    value: function getSelectedRows() {
      return this.state.selectedRows;
    }
  }, {
    key: 'getTableClass',
    value: function getTableClass() {
      var attributes = this.props.value.data.attributes;
      var entity = makeSafeForClassName(attributes.category);
      var query = makeSafeForClassName(attributes.page);
      return entity + '_' + query;
    }
  }, {
    key: 'getTitleTag',
    value: function getTitleTag(value) {
      if (value.data.attributes.layout.hasOwnProperty('hideTitle')) return null;

      var TitleTag = 'h' + (value.data.attributes.parameters && value.data.attributes.parameters._titleLevel_ || 1);
      var operationParamsInfo = this.getOperationParamsInfo();
      return React.createElement(
        TitleTag,
        { className: 'table-component__title' },
        value.data.attributes.title,
        operationParamsInfo.length > 0 ? ' ' : null,
        operationParamsInfo.length > 0 ? React.createElement(
          'small',
          null,
          operationParamsInfo
        ) : null
      );
    }
  }, {
    key: 'getOperationParamsInfo',
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
    key: '_createTableCancelAction',
    value: function _createTableCancelAction() {
      var _this2 = this;

      var layout = this.props.value.data.attributes.layout;

      if (layout.hasOwnProperty('cancelAction') || layout.cancelActionText || this.props.frontendParams.documentName === MAIN_DOCUMENT) {
        var action = layout.cancelAction || getBackAction();
        if (action !== undefined) {
          return React.createElement(
            'button',
            {
              type: 'button',
              className: 'btn btn-light mt-2 btn-back',
              onClick: function onClick() {
                return executeFrontendActions(action, _this2.props.frontendParams);
              }
            },
            layout.cancelActionText || be5.messages.back
          );
        }
      }
      return null;
    }
  }, {
    key: 'topForm',
    value: function topForm(topFormJson) {
      if (topFormJson) {
        return React.createElement(Document$1, {
          frontendParams: {
            documentName: "topForm",
            parentDocumentName: this.props.frontendParams.documentName
          },
          value: topFormJson,
          baseLayout: { type: 'inlineMiniForm', bsSize: 'sm' }
        });
      }
      return null;
    }
  }], [{
    key: 'storeDocumentState',
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

var QuickColumns = function (_React$Component) {
  inherits(QuickColumns, _React$Component);

  function QuickColumns(props) {
    classCallCheck(this, QuickColumns);

    var _this = possibleConstructorReturn(this, (QuickColumns.__proto__ || Object.getPrototypeOf(QuickColumns)).call(this, props));

    _this.state = _this.createStateFromProps(_this.props);
    _this.updateDataTableQuickColumns = _this.updateDataTableQuickColumns.bind(_this);
    return _this;
  }

  createClass(QuickColumns, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      bus.listen("updateDataTableQuickColumns", this.updateDataTableQuickColumns);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.meta._ts_ > this.props.meta._ts_) {
        this.setState(this.createStateFromProps(nextProps));
      }
    }
  }, {
    key: 'createStateFromProps',
    value: function createStateFromProps(props) {
      if (props.columns.length === 0) return [];
      //const firstRow=props.rows[0].cells;
      return {
        quickColumns: props.columns.map(function (col, idx) {
          if (col.quick) return { columnId: idx, visible: col.quick === 'yes' };else return null;
        }).filter(function (col) {
          return col !== null;
        })
      };
    }
  }, {
    key: 'quickHandleChange',
    value: function quickHandleChange(idx) {
      var quickColumn = this.state.quickColumns[idx];
      quickColumn.visible = !quickColumn.visible;
      var value = quickColumn.visible === true ? "yes" : "no";
      be5.net.request("quick", {
        "table_name": this.props.category,
        "query_name": this.props.page,
        "column_name": this.props.columns[quickColumn.columnId].name,
        "quick": value
      });
      this.forceUpdate();
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.quickColumns.length === 0) {
        return null;
      }
      this.updateDataTableQuickColumns();

      var checks = this.state.quickColumns.map(function (cell, idx) {
        var _this2 = this;

        var column = this.props.columns[cell.columnId];
        var title = column.title.replace(/<br\s*[\/]?>/gi, " ");
        return React.createElement(
          'span',
          { key: idx },
          React.createElement('input', { id: "quick" + idx, type: 'checkbox', checked: cell.visible,
            onChange: function onChange() {
              return _this2.quickHandleChange(idx);
            } }),
          React.createElement(
            'label',
            { htmlFor: "quick" + idx, className: 'rowIndex' },
            title,
            ' '
          )
        );
      }.bind(this));

      return React.createElement(
        'div',
        { id: 'quickColumns' },
        React.createElement(
          'span',
          null,
          be5.messages.otherColumns,
          ':'
        ),
        checks
      );
    }
  }, {
    key: 'updateDataTableQuickColumns',
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

var TableForm = function (_React$Component) {
  inherits(TableForm, _React$Component);

  function TableForm() {
    classCallCheck(this, TableForm);
    return possibleConstructorReturn(this, (TableForm.__proto__ || Object.getPrototypeOf(TableForm)).apply(this, arguments));
  }

  createClass(TableForm, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateDocuments();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateDocuments();
    }
  }, {
    key: 'updateDocuments',
    value: function updateDocuments() {
      changeDocument("form", { value: null });
      changeDocument("table", { value: this.props.value });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'table-form' },
        React.createElement(Document$1, { frontendParams: { documentName: "table", operationDocumentName: "form" }, type: 'table' }),
        React.createElement(HelpInfo, { value: this.props.value.data.attributes.layout.helpInfo }),
        React.createElement(Document$1, { frontendParams: { documentName: "form", parentDocumentName: "table" } })
      );
    }
  }]);
  return TableForm;
}(React.Component);

TableForm.propTypes = {
  value: PropTypes.object.isRequired,
  frontendParams: PropTypes.object.isRequired
};

registerDocument('tableForm', TableForm);

var FormTable = function (_TableForm) {
  inherits(FormTable, _TableForm);

  function FormTable() {
    classCallCheck(this, FormTable);
    return possibleConstructorReturn(this, (FormTable.__proto__ || Object.getPrototypeOf(FormTable)).apply(this, arguments));
  }

  createClass(FormTable, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'form-table' },
        React.createElement(Document$1, { frontendParams: { documentName: "form", parentDocumentName: "table" } }),
        React.createElement(HelpInfo, { value: this.props.value.data.attributes.layout.helpInfo }),
        React.createElement(Document$1, { frontendParams: { documentName: "table", operationDocumentName: "form" }, type: 'table' })
      );
    }
  }]);
  return FormTable;
}(TableForm);

FormTable.propTypes = {
  value: PropTypes.object.isRequired,
  frontendParams: PropTypes.object.isRequired
};

registerDocument('formTable', FormTable);

var TableFormRow = function (_TableForm) {
  inherits(TableFormRow, _TableForm);

  function TableFormRow() {
    classCallCheck(this, TableFormRow);
    return possibleConstructorReturn(this, (TableFormRow.__proto__ || Object.getPrototypeOf(TableFormRow)).apply(this, arguments));
  }

  createClass(TableFormRow, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col-lg-6' },
          React.createElement(Document$1, { frontendParams: { documentName: "form", parentDocumentName: "table" } })
        ),
        React.createElement(
          'div',
          { className: 'col-lg-6' },
          React.createElement(Document$1, { frontendParams: { documentName: "table", operationDocumentName: "form" }, type: 'table' })
        )
      );
    }
  }]);
  return TableFormRow;
}(TableForm);

TableFormRow.propTypes = {
  value: PropTypes.object.isRequired,
  frontendParams: PropTypes.object.isRequired
};

registerDocument('tableFormRow', TableFormRow);

var ModalTable = function (_Table) {
  inherits(ModalTable, _Table);

  function ModalTable() {
    classCallCheck(this, ModalTable);
    return possibleConstructorReturn(this, (ModalTable.__proto__ || Object.getPrototypeOf(ModalTable)).apply(this, arguments));
  }

  createClass(ModalTable, [{
    key: 'render',
    value: function render() {
      var attributes = this.props.value.data.attributes;
      return React.createElement(
        'div',
        null,
        React.createElement(
          ModalHeader,
          { tag: 'h5', toggle: function toggle() {
              return bus.fire("mainModalClose");
            } },
          attributes.title
        ),
        React.createElement(
          ModalBody,
          null,
          get(ModalTable.prototype.__proto__ || Object.getPrototypeOf(ModalTable.prototype), 'render', this).call(this)
        ),
        React.createElement(
          ModalFooter,
          null,
          this._createModalCloseAction()
        )
      );
    }
  }, {
    key: '_createModalCloseAction',
    value: function _createModalCloseAction() {
      var _this2 = this;

      var layout = this.props.value.data.attributes.layout;
      var action = layout.cancelAction || new FrontendAction(CLOSE_MAIN_MODAL);
      return React.createElement(
        'button',
        { type: 'button', className: 'btn btn-secondary',
          onClick: function onClick() {
            return executeFrontendActions(action, _this2.props.frontendParams);
          } },
        layout.cancelActionText || be5.messages.close
      );
    }
  }]);
  return ModalTable;
}(Table);

registerDocument('modalTable', ModalTable);

var TablePagination = function (_React$Component) {
  inherits(TablePagination, _React$Component);

  function TablePagination(props) {
    classCallCheck(this, TablePagination);

    var _this = possibleConstructorReturn(this, (TablePagination.__proto__ || Object.getPrototypeOf(TablePagination)).call(this, props));

    _this.handlePageChange = _this.handlePageChange.bind(_this);
    return _this;
  }

  createClass(TablePagination, [{
    key: 'handlePageChange',
    value: function handlePageChange(pageNumber) {
      openTablePage(this.props.value.data.attributes, this.props.frontendParams, pageNumber);
    }
  }, {
    key: 'render',
    value: function render() {
      var attr = this.props.value.data.attributes;
      if (attr.totalNumberOfRows <= attr.length && !this.props.showAlways) return null;
      var currentPage = attr.offset / attr.length + 1;
      return React.createElement(Pagination, {
        prevPageText: be5.messages.table.previousPage,
        nextPageText: be5.messages.table.nextPage,
        firstPageText: be5.messages.table.firstPage,
        lastPageText: be5.messages.table.lastPage,
        activePage: currentPage,
        itemsCountPerPage: attr.length,
        totalItemsCount: attr.totalNumberOfRows,
        onChange: this.handlePageChange,
        innerClass: this.props.innerClass,
        itemClass: 'page-item',
        linkClass: 'page-link',
        activeLinkClass: ''
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

var route = function route(frontendParams, page) {
  changeDocument(frontendParams.documentName, {});
};

var Loading = function (_React$Component) {
  inherits(Loading, _React$Component);

  function Loading() {
    classCallCheck(this, Loading);
    return possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
  }

  createClass(Loading, [{
    key: 'render',
    value: function render() {
      return React.createElement('div', { className: 'document-loader' });
    }
  }]);
  return Loading;
}(React.Component);

registerRoute("loading", route);

var route$2 = function route(frontendParams, entity, query, operation, contextParams) {
  var _operationInfo;

  var operationInfo = (_operationInfo = {}, defineProperty(_operationInfo, ENTITY_NAME_PARAM, entity), defineProperty(_operationInfo, QUERY_NAME_PARAM, query || 'All records'), defineProperty(_operationInfo, OPERATION_NAME_PARAM, operation), defineProperty(_operationInfo, CONTEXT_PARAMS, JSON.stringify(contextParams || {})), _operationInfo);
  loadForm(operationInfo, frontendParams);
};

registerRoute("form", route$2);

var route$4 = function route() {
  openOperationByUrl('form/users/All records/Login', { documentName: MAIN_MODAL_DOCUMENT });
};

registerRoute("login", route$4);

var route$6 = function route() {
  openOperationByUrl('form/users/All records/Logout', { documentName: MAIN_DOCUMENT });
};

registerRoute("logout", route$6);

var route$8 = function route(frontendParams, page) {
  var requestParams = {
    _ts_: new Date().getTime()
  };

  be5.net.request('static/' + page, requestParams, function (json) {
    if (frontendParams.documentName === MAIN_DOCUMENT) be5.ui.setTitle(json.data.attributes.title);
    changeDocument(frontendParams.documentName, { value: json });
  }, function (error) {
    changeDocument(frontendParams.documentName, { value: error });
  });
};

registerRoute("static", route$8);

var route$10 = function route(frontendParams, entity, query, params) {
  var _paramsObject;

  var paramsObject = (_paramsObject = {}, defineProperty(_paramsObject, ENTITY_NAME_PARAM, entity), defineProperty(_paramsObject, QUERY_NAME_PARAM, query || 'All records'), defineProperty(_paramsObject, CONTEXT_PARAMS, params || {}), _paramsObject);
  loadTable(paramsObject, frontendParams);
};

registerRoute("table", route$10);

var BeSqlHighlightRules = void 0;
var BeSqlMode = void 0;

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
        token: "string", // " string
        regex: '".*?"'
      }, {
        token: "string", // ' string
        regex: "'.*?'"
      }, {
        token: "string", // ` string (apache drill)
        regex: "`.*?`"
      }, {
        token: "constant.numeric", // float
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
    var keywordCompletions = void 0;
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
        value: tableNames[i], score: 9, meta: "table"
      });
    }
    return callback(null, keywordCompletions);
  }
};

var route$12 = function route(frontendParams, params) {
  var _requestParams;

  var requestParams = (_requestParams = {}, defineProperty(_requestParams, CONTEXT_PARAMS, be5.net.paramString(params)), defineProperty(_requestParams, TIMESTAMP_PARAM, new Date().getTime()), _requestParams);

  initBeSqlEditor(function () {
    be5.net.request('queryBuilder', requestParams, function (data) {
      if (frontendParams.documentName === MAIN_DOCUMENT) be5.ui.setTitle("Query Builder");
      changeDocument(frontendParams.documentName, { value: Object.assign({}, data, { params: be5.net.paramString(params) }) });
    });
  });
};

registerRoute("queryBuilder", route$12);

var route$14 = function route(frontendParams, text) {
  if (frontendParams.documentName === MAIN_DOCUMENT) be5.ui.setTitle();
  var data = createStaticValue(undefined, text, { self: "text/" + text });
  changeDocument(frontendParams.documentName, { value: data });
};

registerRoute("text", route$14);

var route$16 = function route(frontendParams, entity) {
  var requestParams = defineProperty({}, ENTITY_NAME_PARAM, entity);

  be5.net.request('categories/forest/', requestParams, function (data) {
    changeDocument(frontendParams.documentName, {
      value: createStaticValue('', "<pre>" + JSON.stringify(data, null, 4) + "</pre>")
    });
  });
};

registerRoute("categories", route$16);

var AceEditor = void 0;
try {
  require('brace/mode/sql');
  require('brace/theme/xcode');
  require('brace/ext/language_tools');
  AceEditor = require("react-ace").default;
} catch (e) {
  console.log('AceEditor (brace) is not available, use textarea');
}

var QueryBuilder = function (_React$Component) {
  inherits(QueryBuilder, _React$Component);

  function QueryBuilder(props) {
    classCallCheck(this, QueryBuilder);

    var _this = possibleConstructorReturn(this, (QueryBuilder.__proto__ || Object.getPrototypeOf(QueryBuilder)).call(this, props));

    _this.state = {
      sql: _this.props.value.data.attributes.sql,
      value: _this.props.value
    };

    _this.updateCode = _this.updateCode.bind(_this);
    _this.submit = _this.submit.bind(_this);
    _this.setSqlFromHistory = _this.setSqlFromHistory.bind(_this);
    return _this;
  }

  createClass(QueryBuilder, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initBeSqlMode();
      this.update(this.props.value);
    }
  }, {
    key: 'initBeSqlMode',
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
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.update(nextProps.value);
    }
  }, {
    key: 'updateCode',
    value: function updateCode(newSql) {
      this.setState({ sql: newSql });
    }
  }, {
    key: 'submit',
    value: function submit() {
      var _requestParams,
          _this2 = this;

      var requestParams = (_requestParams = {
        sql: this.state.sql,
        updateWithoutBeSql: this.state.updateWithoutBeSql
      }, defineProperty(_requestParams, CONTEXT_PARAMS, this.props.value.params), defineProperty(_requestParams, TIMESTAMP_PARAM, new Date().getTime()), _requestParams);

      be5.net.request('queryBuilder', requestParams, function (json) {
        _this2.update(json);
      });
    }
  }, {
    key: 'update',
    value: function update(json) {
      this.setState({ value: json });
    }
  }, {
    key: 'setSqlFromHistory',
    value: function setSqlFromHistory(event) {
      this.setState({ sql: event.target.value });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          value = _state.value,
          sql = _state.sql;


      return React.createElement(
        'div',
        { className: 'queryBuilder' },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-md-6' },
            React.createElement(
              'h1',
              null,
              'Query Builder'
            ),
            React.createElement(
              'div',
              { className: 'form-group form-check' },
              React.createElement('input', {
                type: 'checkbox',
                className: 'form-check-input',
                id: 'updateWithoutBeSql',
                onChange: function onChange() {
                  _this3.setState({ updateWithoutBeSql: !_this3.state.updateWithoutBeSql });
                },
                checked: this.state.updateWithoutBeSql === true }),
              React.createElement(
                'label',
                { className: 'form-check-label', htmlFor: 'updateWithoutBeSql' },
                'raw sql'
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'col-md-6' },
            React.createElement(
              'select',
              {
                multiple: true,
                style: { width: '100%' },
                onClick: this.setSqlFromHistory
              },
              value.data.attributes.history.slice().reverse().map(function (value, i) {
                return React.createElement(
                  'option',
                  { value: value, key: i },
                  value
                );
              })
            ),
            React.createElement('br', null),
            React.createElement('br', null)
          )
        ),
        React.createElement(
          SplitPane,
          { split: 'horizontal', defaultSize: 300 },
          this.getEditor(sql),
          React.createElement(
            'div',
            null,
            React.createElement(
              'button',
              {
                className: 'btn btn-primary btn-sm mt-2 mb-2',
                onClick: this.submit,
                title: 'Alt-Enter - submit, Ctrl + space - auto completion'
              },
              'Submit'
            ),
            React.createElement(QueryBuilderOutput, {
              value: value,
              finalSql: this.state.value.data.attributes.finalSql
            })
          )
        )
      );
    }
  }, {
    key: 'getEditor',
    value: function getEditor(sql) {
      var _this4 = this;

      if (AceEditor === undefined) {
        return React.createElement('textarea', {
          rows: 10,
          onChange: function onChange(e) {
            return _this4.updateCode(e.target.value);
          },
          value: sql,
          style: { width: '100%' }
        });
      }

      return React.createElement(AceEditor, {
        ref: 'aceEditor',
        value: sql,
        mode: 'sql',
        theme: 'xcode',
        fontSize: 13,
        onChange: this.updateCode,
        name: 'queryBuilder_editor',
        width: '100%',
        height: '100%',
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
          bindKey: { win: 'Alt-Enter', mac: 'Command-Enter' },
          exec: this.submit
        }]
      });
    }
  }]);
  return QueryBuilder;
}(React.Component);

var QueryBuilderOutput = function (_React$Component2) {
  inherits(QueryBuilderOutput, _React$Component2);

  function QueryBuilderOutput() {
    classCallCheck(this, QueryBuilderOutput);
    return possibleConstructorReturn(this, (QueryBuilderOutput.__proto__ || Object.getPrototypeOf(QueryBuilderOutput)).apply(this, arguments));
  }

  createClass(QueryBuilderOutput, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.value.meta._ts_ > this.props.value.meta._ts_;
    }
  }, {
    key: 'render',
    value: function render() {
      var value = this.props.value;

      return React.createElement(
        'div',
        null,
        React.createElement(Document$1, {
          value: getModelByID(value.included, value.meta, "result"),
          frontendParams: { documentName: "queryBuilder-result" }
        }),
        React.createElement(
          'div',
          null,
          value.data.attributes.finalSql
        ),
        React.createElement('br', null),
        React.createElement(ErrorPane, { value: value })
      );
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
        return React.createElement(
          'span',
          { key: name },
          name
        );
      } else {
        return React.createElement(
          'span',
          { key: name },
          ', ',
          name
        );
      }
    });
  }

  return React.createElement(
    'div',
    { className: classNames('ui-panel row') },
    React.createElement(
      'div',
      { className: 'col-md-12' },
      React.createElement(
        'h1',
        null,
        'Core'
      )
    ),
    React.createElement(
      'div',
      { className: 'col-md-4' },
      React.createElement(
        'h3',
        null,
        'documents'
      ),
      getAllDocumentTypes().sort().map(function (name) {
        //let doc = getDocument(name);
        //console.log('document', doc.name, doc);
        return React.createElement(
          'div',
          { key: "documents-" + name },
          React.createElement(
            'span',
            { className: 'badge badge-primary' },
            name
          ),
          ' - ',
          getDocument(name).name
        );
      })
    ),
    React.createElement(
      'div',
      { className: 'col-md-8' },
      React.createElement(
        'h3',
        null,
        'routes'
      ),
      getAllRoutes().sort().map(function (name) {
        //let route = getRoute(name);
        //console.log('route', route.name, route);
        return React.createElement(
          'div',
          { key: "documents-" + name },
          React.createElement(
            'span',
            { className: 'badge badge-primary' },
            name
          ),
          '(',
          getParamNames(getRoute(name)),
          ')'
        );
      })
    )
  );
};

registerPage("uiPanel", UiPanel, function (frontendParams) {
  changeDocument(frontendParams.documentName, createPageValue("uiPanel", { attributes: { title: "UI panel" } }));
});

var SystemCard = function SystemCard(props) {
  var title = props.value.title;

  be5.ui.setTitle(title);
  var steps = [{ title: 'Cache', url: '#!table/_system_/Cache' }, { title: 'Session', url: '#!table/_system_/Session variables' }, { title: 'System Settings', url: '#!table/systemSettings/All%20records' }, { title: 'Daemons', url: '#!table/_system_/Daemons' }, { title: 'DataSource', url: '#!table/_system_/DataSource' }, { title: 'Http Headers', url: '#!table/_system_/Http Headers' }, { title: 'Properties', url: '#!table/_system_/System properties' }, { title: 'Threads', url: '#!table/_system_/Threads' }, { title: 'UI panel', url: '#!uiPanel' }];

  return React.createElement(
    "div",
    { className: "info-card" },
    React.createElement(
      "h1",
      { style: { marginBottom: 13 + 'px' } },
      title
    ),
    React.createElement(Navs, {
      steps: steps,
      tabs: true,
      onOpenNav: function onOpenNav(id) {
        return setDocumentState("#!systemCard", id);
      },
      startAtStep: getDocumentState("#!systemCard") || 0
    })
  );
};

registerDocument('SystemCard', SystemCard);

registerRoute('systemCard', function (frontendParams) {
  changeDocument(frontendParams.documentName, {
    value: {
      title: "System card"
    },
    frontendParams: { type: 'SystemCard' }
  });
});

/**
 * https://datatables.net/
 * https://habr.com/ru/post/330656/
 * https://medium.com/@zbzzn/integrating-react-and-datatables-not-as-hard-as-advertised-f3364f395dfa
 */

var DataTablesWrapper = function (_Component) {
  inherits(DataTablesWrapper, _Component);

  function DataTablesWrapper(props) {
    classCallCheck(this, DataTablesWrapper);
    return possibleConstructorReturn(this, (DataTablesWrapper.__proto__ || Object.getPrototypeOf(DataTablesWrapper)).call(this, props));
  }

  createClass(DataTablesWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.applyTable(this.props, this.refs.main);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.value.meta._ts_ > this.props.value.meta._ts_) {
        $("#" + getTableId(this.props)).DataTable().destroy(true);
        $(this.refs.main).empty();
        this.applyTable(nextProps, this.refs.main);
      }
      return false;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      $("#" + getTableId(this.props)).DataTable().destroy(true);
    }
  }, {
    key: 'applyTable',
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
      });

      // $('#rowCheckboxAll').click(function (e) {
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
    key: 'getTableConfiguration',
    value: function getTableConfiguration(props) {
      var _this2 = this;

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

          var requestParams = (_requestParams = {}, defineProperty(_requestParams, ENTITY_NAME_PARAM, attributes.category), defineProperty(_requestParams, QUERY_NAME_PARAM, attributes.page), defineProperty(_requestParams, CONTEXT_PARAMS, params), _requestParams);
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
            }

            // call react callback - update table and filter operations
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

            var params = Object.assign({}, attributes.parameters, { _selectedRows_: val });
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
              var container = $('<div/>').html(jQueryFormatCell(data));
              //be5.ui.convertLinks(container);
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
              props.setSelectedRows(newRows);
              // if(attributes.rows.length === be5.tableState.selectedRows.length){
              //   $('#rowCheckboxAll').prop('checked', true);
              // }
            } else {
              //if (!checked && $.inArray(rowId, selectedRows) !== -1) {
              var _newRows = Array.from(props.getSelectedRows());
              _newRows.splice($.inArray(rowId, _newRows), 1);
              props.setSelectedRows(_newRows);
              //$('#rowCheckboxAll').prop('checked', false);
            }
          });
        }
      };
      var groupingColumn = null;
      var nColumns = attributes.rows[0].cells.length;
      for (var i = 0; i < nColumns; i++) {
        var column = attributes.rows[0].cells[i];
        if ((typeof column === 'undefined' ? 'undefined' : _typeof(column)) === 'object') {
          if ('options' in column) {
            if ('grouping' in column.options) {
              groupingColumn = i;
            }
          }
        }
      }

      // const hideControls = () => {
      //   if ( $(_this.refs.main).find('.paging_simple_numbers span .paginate_button')
      //     && $(_this.refs.main).find('.paging_simple_numbers span .paginate_button').length > 1) {
      //     $(_this.refs.main).find('.dataTables_length').show();
      //     $(_this.refs.main).find('.paging_simple_numbers').show()
      //   } else {
      //     $(_this.refs.main).find('.dataTables_length').hide();
      //     $(_this.refs.main).find('.paging_simple_numbers').hide()
      //   }
      // };

      var drawGrouping = void 0;

      if (groupingColumn !== null) {
        var resultGroupingColumn = groupingColumn + 1;
        tableConfiguration.columnDefs.push({ visible: false, targets: resultGroupingColumn });
        drawGrouping = function drawGrouping(api) {
          var rows = api.rows({ page: 'current' }).nodes();
          var last = null;

          api.column(resultGroupingColumn, { page: 'current' }).data().each(function (group, i) {
            if (last !== group) {
              $(rows).eq(i).before('<tr class="table-group"><td colspan="' + nColumns + '">' + group + '</td></tr>');
              last = group;
            }
          });
        };
      }

      tableConfiguration.drawCallback = function (settings) {
        if (_this2.refs && _this2.refs.main) {
          var dataTable = $("#" + getTableId(props)).DataTable();
          if (groupingColumn !== null) drawGrouping(dataTable);
        }
        //hideControls();
      };
      return tableConfiguration;
    }
  }, {
    key: 'getColumns',
    value: function getColumns(props) {
      var columns = [{ "title": "#", "orderable": false, className: "default_order" }];
      props.value.data.attributes.columns.forEach(function (column) {
        columns.push({ "title": column.title, "orderable": !column.nosort });
      });
      return columns;
    }
  }, {
    key: 'getData',
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
    key: 'render',
    value: function render() {
      return React.createElement('div', { className: 'row data-table-wrapper', ref: 'main' });
    }
  }], [{
    key: 'getEditOperation',
    value: function getEditOperation(props) {
      return props.operations === undefined ? undefined : props.operations.attributes.find(function (operation) {
        return operation.name === 'Edit';
      });
    }
  }]);
  return DataTablesWrapper;
}(Component);

var DataTablesTableBox = function (_Component2) {
  inherits(DataTablesTableBox, _Component2);

  function DataTablesTableBox() {
    classCallCheck(this, DataTablesTableBox);
    return possibleConstructorReturn(this, (DataTablesTableBox.__proto__ || Object.getPrototypeOf(DataTablesTableBox)).apply(this, arguments));
  }

  createClass(DataTablesTableBox, [{
    key: 'render',
    value: function render() {
      var attr = this.props.value.data.attributes;

      if (!hasRows(attr)) {
        if (attr.totalNumberOfRows > 0) {
          var previousPage = attr.offset / attr.length;
          var currentPage = previousPage + 1;
          return React.createElement(
            'div',
            null,
            React.createElement(
              'p',
              null,
              be5.messages.table.noRecordsOnThePage.replace('{0}', currentPage + '')
            ),
            React.createElement(TablePagination, this.props)
          );
        }
        return React.createElement(
          'div',
          null,
          be5.messages.table.emptyTable
        );
      }

      return React.createElement(
        'div',
        { className: 'table-wrap' },
        React.createElement(QuickColumns, {
          columns: attr.columns,
          category: attr.category,
          page: attr.page,
          selectable: attr.selectable,
          meta: this.props.value.meta
        }),
        React.createElement(DataTablesWrapper, this.props)
      );
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

var OneColumnListTableBox = function (_Component) {
  inherits(OneColumnListTableBox, _Component);

  function OneColumnListTableBox() {
    classCallCheck(this, OneColumnListTableBox);
    return possibleConstructorReturn(this, (OneColumnListTableBox.__proto__ || Object.getPrototypeOf(OneColumnListTableBox)).apply(this, arguments));
  }

  createClass(OneColumnListTableBox, [{
    key: "render",
    value: function render() {
      var list = this.props.value.data.attributes.rows.map(function (col, idx) {
        return React.createElement("li", { key: idx, dangerouslySetInnerHTML: { __html: col.cells[0].content } });
      });

      return React.createElement(
        "div",
        null,
        React.createElement(
          "ul",
          { className: "listTableBox" },
          list
        ),
        React.createElement(TablePagination, this.props)
      );
    }
  }]);
  return OneColumnListTableBox;
}(Component);

registerTableBox('oneColumnList', OneColumnListTableBox);

var ReactTableBox = function (_Component) {
  inherits(ReactTableBox, _Component);

  function ReactTableBox(props) {
    classCallCheck(this, ReactTableBox);

    var _this = possibleConstructorReturn(this, (ReactTableBox.__proto__ || Object.getPrototypeOf(ReactTableBox)).call(this, props));

    _this.onOperationClick = _this.onOperationClick.bind(_this);
    return _this;
  }

  createClass(ReactTableBox, [{
    key: 'onOperationClick',
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
    key: 'onSelectionChange',
    value: function onSelectionChange() {
      if (this.props.hasOwnProperty('callbacks') && this.props.callbacks !== undefined && this.props.callbacks.hasOwnProperty('onSelectionChange')) {
        this.props.callbacks.onSelectionChange(be5.tableState.selectedRows);
      }
    }

    //
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
    key: 'render',
    value: function render() {
      var attributes = this.props.value.data.attributes;
      if (attributes.columns.length === 0) {
        return React.createElement(
          'div',
          null,
          React.createElement(OperationBox, { ref: 'operations', operations: attributes.operations, onOperationClick: this.onOperationClick,
            hasRows: attributes.rows.length !== 0 }),
          be5.messages.emptyTable
        );
      }

      var hasCheckBoxes = attributes.selectable;

      var theadrow = [];

      if (hasCheckBoxes) {
        theadrow.push(React.createElement(
          'th',
          { key: -1 },
          '#'
        ));
      }

      attributes.columns.forEach(function (column, idx) {
        var title = (typeof column === 'undefined' ? 'undefined' : _typeof(column)) === 'object' ? column.title : column;

        theadrow.push(React.createElement(
          'th',
          { key: idx },
          title
        )); //formatCell(title, 'th', true)
      });

      var trs = [];

      attributes.rows.forEach(function (row, rowId, rows) {
        var tr = [];

        if (hasCheckBoxes) {
          tr.push(React.createElement(
            'td',
            { key: -1 },
            row.id
          ));
        }

        row.cells.forEach(function (cell, idx) {
          tr.push(React.createElement(
            'td',
            { key: idx },
            cell.content
          )); //formatCell(cell.content, cell.options)
        });

        trs.push(React.createElement(
          'tr',
          { key: rowId },
          tr
        ));
      });

      return React.createElement(
        'div',
        null,
        React.createElement(OperationBox, { ref: 'operations', operations: attributes.operations, onOperationClick: this.onOperationClick,
          hasRows: attributes.rows.length !== 0 }),
        React.createElement(QuickColumns, { ref: 'quickColumns', columns: attributes.columns, firstRow: attributes.rows[0].cells,
          table: this.refs.table, selectable: attributes.selectable }),
        React.createElement(
          'div',
          { className: 'scroll' },
          React.createElement(
            'table',
            {
              id: "table" + this.props.value.meta._ts_,
              className: 'table table-striped table-bordered table-hover display table-sm',
              cellSpacing: '0'
            },
            React.createElement(
              'thead',
              null,
              React.createElement(
                'tr',
                null,
                theadrow
              )
            ),
            React.createElement(
              'tbody',
              null,
              trs
            )
          )
        )
      );
    }
  }], [{
    key: 'formatReactCell',
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
          if (options.css && options.css.class) wrap.addClass(options.css.class);
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
  return { type: 'CHANGE_HASH', hash: url };
};

var hashChange = function hashChange() {
  var hash = be5.url.get();
  if (getHashUrl(be5.store.getState()) !== hash) {
    be5.store.dispatch(updateHashUrl(hash));
  }
  be5.url.process({ documentName: MAIN_DOCUMENT }, be5.url.get());
};

var initBe5App$$1 = function initBe5App$$1(store, callback) {
  Preconditions.passed(store, 'store in required');

  be5.appInfo = { "title": document.title };
  be5.store = store;
  be5.api = api;
  window.be5 = be5;

  be5.store.dispatch(updateHashUrl(be5.url.get()));
  initGetUser(store, callback);

  be5.net.request('languageSelector', {}, function (data) {
    be5.locale.set(data.selected, data.messages);
    //be5.url.process(MAIN_DOCUMENT, be5.url.get());

    store.dispatch(fetchUserInfo());
  });

  window.addEventListener("hashchange", hashChange, false);
};

var initGetUser = function initGetUser(store, callback) {
  initOnLoad$$1(store, undefined, getDefaultRoute, function () {
    if (callback) callback();
    processHashUrlForDocument(be5.url.get(), MAIN_DOCUMENT);
  });
};

var initOnLoad$$1 = function initOnLoad$$1(store, initState, select, onChange) {
  function handleChange() {
    var nextState = select(store.getState());

    if (nextState !== initState) {
      onChange(nextState);
      unsubscribe();
    }
  }

  var unsubscribe = store.subscribe(handleChange);
};

var isProduction = "development" === 'production';

var middleware = [thunkMiddleware];
if (!isProduction) {
  middleware.push(createLogger());
}

var enhancer = compose(applyMiddleware.apply(undefined, middleware), !isProduction && window.devToolsExtension ? window.devToolsExtension() : function (f) {
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
  var action = arguments[1];

  switch (action.type) {
    case UPDATE_USER_INFO:
      return action.user;
    case SELECT_ROLES:
      return Object.assign({}, state, { currentRoles: action.currentRoles });
    default:
      return state;
  }
}

function users$1() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments[1];

  switch (action.type) {
    case UPDATE_MENU:
      return action.data;
    default:
      return state;
  }
}

function changeHash() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var action = arguments[1];

  if (action.type === 'CHANGE_HASH') return action.hash;

  return state;
}

var index = combineReducers({
  user: users,
  menu: users$1,
  hashUrl: changeHash
});

//import be5styles from './be5styles.js';
// core
// actions
// services
// store


var api = Object.freeze({
	initBe5App: initBe5App$$1,
	initOnLoad: initOnLoad$$1,
	getDocumentStates: getDocumentStates,
	getDocumentState: getDocumentState,
	setDocumentState: setDocumentState,
	clearDocumentState: clearDocumentState,
	preconditions: Preconditions,
	arraysEqual: arraysEqual,
	createPageValue: createPageValue,
	registerPage: registerPage,
	getSelfUrl: getSelfUrl,
	getModelByID: getModelByID,
	createStaticValue: createStaticValue,
	getResourceByType: getResourceByType,
	getResourceByID: getResourceByID,
	processHashUrl: processHashUrl,
	processHashUrlForDocument: processHashUrlForDocument,
	openInModal: openInModal,
	addUrlHandlers: addUrlHandlers,
	loadDocumentByUrl: loadDocumentByUrl,
	bus: bus,
	changeDocument: changeDocument,
	getDocument: getDocument,
	registerDocument: registerDocument,
	getAllDocumentTypes: getAllDocumentTypes,
	registerRoute: registerRoute,
	getRoute: getRoute,
	getAllRoutes: getAllRoutes,
	registerTableBox: registerTableBox,
	getTableBox: getTableBox,
	getAllTypes: getAllTypes,
	createBaseStore: createBaseStore,
	rootReducer: index,
	userReduser: users,
	menuReduser: users$1,
	toggleRoles: toggleRoles,
	fetchUserInfo: fetchUserInfo,
	updateUserInfo: updateUserInfo,
	fetchMenu: fetchMenu,
	getCurrentRoles: getCurrentRoles,
	getUser: getUser,
	getMenu: getMenu,
	formAction: route$2,
	loadingAction: route,
	loginAction: route$4,
	logoutAction: route$6,
	queryBuilderAction: route$12,
	staticAction: route$8,
	tableAction: route$10,
	textAction: route$14,
	action: actions,
	loadOperation: loadOperation,
	submitOperation: submitOperation,
	getOperationInfoFromUrl: getOperationInfoFromUrl,
	openOperationByUrl: openOperationByUrl,
	openOperationByUrlWithValues: openOperationByUrlWithValues,
	fetchOperationByUrl: fetchOperationByUrl,
	loadTable: loadTable,
	loadTableByUrl: loadTableByUrl,
	updateTable: updateTable,
	fetchTableByUrl: fetchTableByUrl,
	executeFrontendActions: executeFrontendActions,
	getActionsMap: getActionsMap,
	getBackOrOpenDefaultRouteAction: getBackOrOpenDefaultRouteAction,
	getBackAction: getBackAction,
	FrontendAction: FrontendAction,
	getFilterParams: getFilterParams,
	addFilterParams: addFilterParams,
	initFilterParams: initFilterParams,
	API_URL_PREFIX: API_URL_PREFIX,
	DEFAULT_VIEW: DEFAULT_VIEW,
	ROLE_ADMINISTRATOR: ROLE_ADMINISTRATOR,
	ROLE_SYSTEM_DEVELOPER: ROLE_SYSTEM_DEVELOPER,
	ROLE_GUEST: ROLE_GUEST,
	SET_URL: SET_URL,
	REDIRECT: REDIRECT,
	OPEN_DEFAULT_ROUTE: OPEN_DEFAULT_ROUTE,
	OPEN_NEW_WINDOW: OPEN_NEW_WINDOW,
	GO_BACK: GO_BACK,
	CLOSE_MAIN_MODAL: CLOSE_MAIN_MODAL,
	SUCCESS_ALERT: SUCCESS_ALERT,
	UPDATE_DOCUMENT: UPDATE_DOCUMENT,
	UPDATE_PARENT_DOCUMENT: UPDATE_PARENT_DOCUMENT,
	REFRESH_DOCUMENT: REFRESH_DOCUMENT,
	REFRESH_PARENT_DOCUMENT: REFRESH_PARENT_DOCUMENT,
	SEARCH_PARAM: SEARCH_PARAM,
	SEARCH_PRESETS_PARAM: SEARCH_PRESETS_PARAM,
	MAIN_DOCUMENT: MAIN_DOCUMENT,
	MAIN_MODAL_DOCUMENT: MAIN_MODAL_DOCUMENT,
	DOCUMENT_REFRESH_SUFFIX: DOCUMENT_REFRESH_SUFFIX,
	DOWNLOAD_OPERATION: DOWNLOAD_OPERATION,
	RELOAD_CONTROL_NAME: RELOAD_CONTROL_NAME,
	SELECTED_ROWS: SELECTED_ROWS,
	TIMESTAMP_PARAM: TIMESTAMP_PARAM,
	ENTITY_NAME_PARAM: ENTITY_NAME_PARAM,
	QUERY_NAME_PARAM: QUERY_NAME_PARAM,
	OPERATION_NAME_PARAM: OPERATION_NAME_PARAM,
	CONTEXT_PARAMS: CONTEXT_PARAMS,
	OFFSET: OFFSET,
	LIMIT: LIMIT,
	ORDER_COLUMN: ORDER_COLUMN,
	ORDER_DIR: ORDER_DIR,
	DEFAULT_TABLE_BOX: DEFAULT_TABLE_BOX
});

// components
// forms
// tables
// menu

export { be5, Application, MainDocumentOnly, Be5Components, NavbarMenu, NavMenu, HelpInfo, LanguageBox as LanguageSelector, SideBar, StaticPage, ErrorPane, FormWizard, Navs, RoleSelector, UserControl, Document$1 as Document, MenuContainer$1 as MenuContainer, NavbarMenuContainer$1 as NavbarMenuContainer, UserControlContainer, Form, HorizontalForm, SubmitOnChangeForm, ModalForm, InlineMiniForm, FinishedResult, Table, QuickColumns, OperationBox, CategoryNavigation, FormTable, TableForm, TableFormRow, ModalTable, TablePagination, Menu, MenuBody, MenuSearchField, MenuFooter, MenuNode, initBe5App$$1 as initBe5App, initOnLoad$$1 as initOnLoad, getDocumentStates, getDocumentState, setDocumentState, clearDocumentState, Preconditions as preconditions, arraysEqual, createPageValue, registerPage, getSelfUrl, getModelByID, createStaticValue, getResourceByType, getResourceByID, processHashUrl, processHashUrlForDocument, openInModal, addUrlHandlers, loadDocumentByUrl, bus, changeDocument, getDocument, registerDocument, getAllDocumentTypes, registerRoute, getRoute, getAllRoutes, registerTableBox, getTableBox, getAllTypes, createBaseStore, index as rootReducer, users as userReduser, users$1 as menuReduser, toggleRoles, fetchUserInfo, updateUserInfo, fetchMenu, getCurrentRoles, getUser, getMenu, route$2 as formAction, route as loadingAction, route$4 as loginAction, route$6 as logoutAction, route$12 as queryBuilderAction, route$8 as staticAction, route$10 as tableAction, route$14 as textAction, actions as action, loadOperation, submitOperation, getOperationInfoFromUrl, openOperationByUrl, openOperationByUrlWithValues, fetchOperationByUrl, loadTable, loadTableByUrl, updateTable, fetchTableByUrl, executeFrontendActions, getActionsMap, getBackOrOpenDefaultRouteAction, getBackAction, FrontendAction, getFilterParams, addFilterParams, initFilterParams, API_URL_PREFIX, DEFAULT_VIEW, ROLE_ADMINISTRATOR, ROLE_SYSTEM_DEVELOPER, ROLE_GUEST, SET_URL, REDIRECT, OPEN_DEFAULT_ROUTE, OPEN_NEW_WINDOW, GO_BACK, CLOSE_MAIN_MODAL, SUCCESS_ALERT, UPDATE_DOCUMENT, UPDATE_PARENT_DOCUMENT, REFRESH_DOCUMENT, REFRESH_PARENT_DOCUMENT, SEARCH_PARAM, SEARCH_PRESETS_PARAM, MAIN_DOCUMENT, MAIN_MODAL_DOCUMENT, DOCUMENT_REFRESH_SUFFIX, DOWNLOAD_OPERATION, RELOAD_CONTROL_NAME, SELECTED_ROWS, TIMESTAMP_PARAM, ENTITY_NAME_PARAM, QUERY_NAME_PARAM, OPERATION_NAME_PARAM, CONTEXT_PARAMS, OFFSET, LIMIT, ORDER_COLUMN, ORDER_DIR, DEFAULT_TABLE_BOX };
