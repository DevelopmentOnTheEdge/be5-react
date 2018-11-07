import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, Navbar, NavbarToggler, UncontrolledDropdown, UncontrolledTooltip } from 'reactstrap';
import classNames from 'classnames';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import Alert from 'react-s-alert';
import PropertySet, { Property, PropertyInput } from 'beanexplorer-react';
import JsonPointer from 'json-pointer';
import Transition from 'react-transition-group/Transition';
import ReactDOM from 'react-dom';
import numberFormatter from 'number-format.js';
import AceEditor from 'react-ace';
import 'brace/mode/mysql';
import 'brace/theme/xcode';
import 'brace/ext/language_tools';
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

var UPDATE_DOCUMENT = 'UPDATE_DOCUMENT';
var UPDATE_PARENT_DOCUMENT = 'UPDATE_PARENT_DOCUMENT';

var REFRESH_DOCUMENT = 'REFRESH_DOCUMENT';
var REFRESH_PARENT_DOCUMENT = 'REFRESH_PARENT_DOCUMENT';

var SEARCH_PARAM = "_search_";
var SEARCH_PRESETS_PARAM = "_search_presets_";

var MAIN_DOCUMENT = "MAIN_DOCUMENT";
var MAIN_MODAL_DOCUMENT = "MAIN_MODAL_DOCUMENT";
var DOCUMENT_REFRESH_SUFFIX = "_refresh";

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
      return "#!" + value.data.links.self;
    } else if (value.errors && value.errors.length > 0 && value.errors[0].links && value.errors[0].links.self !== undefined) {
      return "#!" + value.errors[0].links.self;
    }
  }

  return undefined;
};

var processHashUrl = function processHashUrl(e) {
  processHashUrlForDocument(e, MAIN_DOCUMENT);
};

var processHashUrlForDocument = function processHashUrlForDocument(e, documentName) {
  var url = e.target ? e.target.getAttribute("href") : e;
  if (/^#/.test(url) || url === '' || url === '#' || url === '#!') {
    if (e.target) e.preventDefault();
    if (url.startsWith("#!table/")) {
      url = url + "/_cleanNav_=true";
    }
    //console.log(url, documentName);
    be5.url.process(documentName || MAIN_DOCUMENT, url);
  }
};

var openInModal = function openInModal(e) {
  if (/^#/.test(e.target.getAttribute("href"))) {
    e.preventDefault();
    be5.url.process(MAIN_MODAL_DOCUMENT, e.target.getAttribute("href"));
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

    helpInfo: "Help",
    details: "Details",

    NotFound: "Not Found",

    table: {
      noRecordsOnThePage: 'No records on page {0}',
      emptyTable: 'Nothing found',
      previousPage: 'Previous',
      nextPage: 'Next',
      clearFilter: 'Clear filter',
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
      datePatternError: 'Введите дату в формате дд.мм.гггг'
    },

    formComponentNotFound: 'Компонент формы не найден: ',
    tableComponentNotFound: 'Компонент таблицы не найден: ',
    componentForTypeNotRegistered: 'Компонент для типа "$type" не зарегистрирован.',

    helpInfo: "Справка",
    details: "Подробнее",

    NotFound: "Не найдено",
    table: {
      noRecordsOnThePage: 'Нет записей на {0} странице',
      emptyTable: 'Нет данных',
      previousPage: 'Предыдущая',
      nextPage: 'Следующая',
      clearFilter: 'Очистить фильтр',
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
      var titleComponents = [docTitle, be5.appInfo.title];
      document.title = titleComponents.filter(function (c) {
        return typeof c === 'string';
      }).join(' - ');
    }
  },

  url: {
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
      return url === '' || url === '#' || url === '!' || url === '#!';
    },
    clear: function clear() {
      document.location.hash = '';
    },


    // escapeComponent(hashUriComponent) {
    //   return encodeURIComponent(hashUriComponent);
    // },

    create: function create() {
      var positional = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var named = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return be5.url.form(positional, named);
    },
    form: function form(positional) {
      var named = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var res = [];
      for (var i = 0; i < positional.length; i++) {
        res.push(positional[i]);
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
          positional.push(s);
        } else {
          named.push(s.split('='));
        }
      }

      return { positional: positional, named: _.object(named) };
    },
    process: function process(documentName, url) {
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
      var positional = [documentName];
      var hashParams = {};
      var hasHashParam = false;
      for (var i = 1; i < urlParts.length; i++) {
        var urlPart = urlParts[i];
        var pos = urlPart.indexOf('=');
        if (pos >= 0) {
          var name = decodeURIComponent(urlPart.substring(0, pos).replace(/\+/g, ' '));
          var value = decodeURIComponent(urlPart.substring(pos + 1).replace(/\+/g, ' '));
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
        changeDocument(documentName, { value: createStaticValue(msg, null, { self: url }) });
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
    requestUrl: function requestUrl(url, type, params, _success, failureFunc) {
      var result = null;
      var failure = function failure(data) {
        result = data;
        be5.log.error(data);
        if (typeof failureFunc === 'function') failureFunc(data);
      };

      $.ajax({
        url: be5.be5ServerUrl + url,
        dataType: type,
        type: 'POST',
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
          if (_success) {
            _success(data);
          } else {
            result = data;
          }
        },
        error: function error(xhr, status, errorThrown) {
          var data = {
            type: 'error',
            value: {
              code: 'CLIENT_ERROR'
            }
          };
          if (errorThrown && errorThrown.result === 0x80004005)
            // Special case for FireFox
            // see http://helpful.knobs-dials.com/index.php/0x80004005_%28NS_ERROR_FAILURE%29_and_other_firefox_errors
            data.value.message = be5.messages.errorCannotConnect;else data.value.message = be5.messages.errorServerQueryException.replace("$message", errorThrown === undefined ? status + (xhr.status >= 500 ? " " + xhr.status + " " + xhr.statusText : "") : errorThrown.message === undefined ? errorThrown.toString() : errorThrown.message);
          failure(data);
        }
      });
      return result;
    },

    errorHandlers: {}
  },

  log: {
    error: function error(data) {
      bus.fire("alert", { msg: data.value.message, type: 'error' }); //, time: 0
      console.error(data);
    }
  },

  tableState: {
    selectedRows: []
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
    { size: props.size, className: 'roleBox mr-sm-2', id: props.id },
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
          { onClick: handleSelectAll, color: 'primary', className: 'enable-all', size: 'sm' },
          be5.locale.msg('allRoles')
        ),
        ' ',
        React.createElement(
          Button,
          { onClick: handleClear, color: 'secondary', className: 'disable-all', size: 'sm' },
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
      dispatch({ type: SELECT_ROLES, currentRoles: data });
    });
  };
};

var FrontendAction = function FrontendAction(type, value) {
  classCallCheck(this, FrontendAction);

  this.type = type;
  this.value = value;
};

function simpleFinishInModalDocument(documentName) {
  return documentName === MAIN_MODAL_DOCUMENT;
}

var executeFrontendActions = function executeFrontendActions(actionsArrayOrOneObject, frontendParams) {
  var documentName = frontendParams.documentName;

  var actions = getActionsMap(actionsArrayOrOneObject);

  if (simpleFinishInModalDocument(documentName) || actions.hasOwnProperty(CLOSE_MAIN_MODAL)) {
    bus.fire("mainModalClose");
  }

  if (actions[UPDATE_USER_INFO] !== undefined) {
    be5.store.dispatch(updateUserInfo(actions[UPDATE_USER_INFO]));
  }

  if (actions[REDIRECT] !== undefined) {
    var url = actions[REDIRECT];

    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://")) {
      window.location.href = url;
    } else {
      if (documentName === MAIN_DOCUMENT) {
        be5.url.process(MAIN_DOCUMENT, '#!' + url);
      } else {
        if (be5.url.parse(url).positional[0] === 'form') {
          openOperationByUrl(url, frontendParams);
        } else {
          be5.url.process(documentName, '#!' + url);
        }
      }
    }
  }

  if (actions[OPEN_NEW_WINDOW] !== undefined) {
    window.open(actions[OPEN_NEW_WINDOW]);
  }

  if (actions[SET_URL]) {
    be5.url.process(MAIN_DOCUMENT, '#!' + actions[SET_URL]);
  }

  if (actions.hasOwnProperty(OPEN_DEFAULT_ROUTE)) {
    be5.url.process(MAIN_DOCUMENT, '#!' + getDefaultRoute(be5.getStoreState()));
  }

  if (actions.hasOwnProperty(GO_BACK)) {
    window.history.back();
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
      console.log(actions[REFRESH_DOCUMENT]);
      bus.fire(actions[REFRESH_DOCUMENT] + DOCUMENT_REFRESH_SUFFIX);
    } else {
      bus.fire(frontendParams.documentName + DOCUMENT_REFRESH_SUFFIX);
    }
  }

  if (actions.hasOwnProperty(REFRESH_PARENT_DOCUMENT)) {
    if (frontendParams.parentDocumentName !== undefined && frontendParams.parentDocumentName !== frontendParams.documentName) {
      bus.fire(frontendParams.parentDocumentName + DOCUMENT_REFRESH_SUFFIX);
    }
  }

  bus.fire("executeFrontendActions", { actions: actions, frontendParams: frontendParams });
};

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

var getBackOrOpenDefaultRouteAction = function getBackOrOpenDefaultRouteAction() {
  if (window.history.length > 1) {
    return new FrontendAction(GO_BACK);
  } else {
    return new FrontendAction(OPEN_DEFAULT_ROUTE);
  }
};

var loadOperation = function loadOperation(params, frontendParams) {
  _send('form', params, frontendParams);
};

var submitOperation = function submitOperation(params, frontendParams) {
  _send('form/apply', params, frontendParams);
};

var _send = function _send(action, params, frontendParams) {
  _request(action, params, function (data) {
    _performOperationResult(data, frontendParams, params);
  }, function (data) {
    bus.fire("alert", { msg: be5.messages.errorServerQueryException.replace('$message', data.value.code), type: 'error' });
  });
};

var openOperationByUrl = function openOperationByUrl(url, frontendParams) {
  _send('form', getOperationParams(url), frontendParams);
};

var openOperationByUrlWithValues = function openOperationByUrlWithValues(url, values, frontendParams) {
  _send('form', getOperationParams(url, values), frontendParams);
};

var fetchOperationByUrl = function fetchOperationByUrl(url, callback, failure) {
  _request('form', getOperationParams(url), callback, failure);
};

var _request = function _request(action, params, callback, failure) {
  Preconditions.passed(params.entity);
  Preconditions.passed(params.query);
  Preconditions.passed(params.operation);

  var requestParams = {
    entity: params.entity,
    query: params.query,
    operation: params.operation,
    values: be5.net.paramString(params.values),
    operationParams: be5.net.paramString(params.operationParams),
    _ts_: new Date().getTime()
  };

  be5.net.request(action, requestParams, function (data) {
    return callback(data);
  }, function (data) {
    return failure(data);
  });
};

var _performOperationResult = function _performOperationResult(json, frontendParams, applyParams) {
  var documentName = frontendParams.documentName;

  Preconditions.passed(documentName);

  if (json.data !== undefined) {
    switch (json.data.type) {
      case 'form':
        _performForm(json, frontendParams);
        return;
      case 'operationResult':
        var attributes = json.data.attributes;

        if (attributes.status === 'error') {
          bus.fire("alert", { msg: attributes.message, type: 'error' });
          return;
        }

        if (frontendParams.onSuccess) {
          frontendParams.onSuccess(json, applyParams);
        }

        switch (attributes.status) {
          case 'redirect':
            bus.fire("alert", { msg: attributes.message || be5.messages.successfullyCompleted, type: 'success' });

            executeFrontendActions(new FrontendAction(REDIRECT, attributes.details), frontendParams);

            return;
          case 'finished':
            if (attributes.details !== undefined) {
              executeFrontendActions(attributes.details, frontendParams);

              if (attributes.message !== undefined) {
                bus.fire("alert", { msg: attributes.message, type: 'success' });
              }
            } else {
              if (documentName === MAIN_MODAL_DOCUMENT) {
                bus.fire("mainModalClose");
                bus.fire("alert", { msg: attributes.message || be5.messages.successfullyCompleted, type: 'success' });
              } else {
                changeDocument(documentName, { value: json, frontendParams: frontendParams });
              }

              if (frontendParams.parentDocumentName !== undefined) {
                //for TableForm
                executeFrontendActions(new FrontendAction(REFRESH_PARENT_DOCUMENT), frontendParams);
              } else {
                if (frontendParams.documentName === MAIN_MODAL_DOCUMENT) {
                  executeFrontendActions(new FrontendAction(REFRESH_DOCUMENT, MAIN_DOCUMENT), frontendParams);
                }
              }
            }
            return;
          default:
            bus.fire("alert", {
              msg: be5.messages.errorUnknownRoute.replace('$action', 'status = ' + attributes.status),
              type: 'error'
            });
          //changeDocument(documentName, {  value: be5.messages.errorUnknownRoute.replace('$action', 'status = ' + attributes.status) });
        }
        return;
      default:
        bus.fire("alert", {
          msg: be5.messages.errorUnknownRoute.replace('$action', 'data.type = ' + json.data.attributes.type),
          type: 'error'
        });
      //changeDocument(documentName, { value: be5.messages.errorUnknownRoute.replace('$action', 'data.type = ' + json.data.attributes.type) });
    }
  } else {
    var error = json.errors[0];
    bus.fire("alert", { msg: error.status + " " + error.title, type: 'error' });

    changeDocument(documentName, { value: json, frontendParams: frontendParams });
  }
};

var _performForm = function _performForm(json, frontendParams) {
  if (frontendParams.documentName === MAIN_DOCUMENT) be5.ui.setTitle(json.data.attributes.title);
  var operationResult = json.data.attributes.operationResult;

  if (operationResult.status === 'error') {
    bus.fire("alert", { msg: operationResult.message, type: 'error' });
  }

  var formComponentName = json.data.attributes.layout.type;

  if (formComponentName === 'modalForm' || frontendParams.documentName === MAIN_MODAL_DOCUMENT) {
    bus.fire("mainModalOpen");

    changeDocument(MAIN_MODAL_DOCUMENT, { value: json, frontendParams: frontendParams });
  } else {
    changeDocument(frontendParams.documentName, { value: json, frontendParams: frontendParams });
  }
};

var getOperationParams = function getOperationParams(url) {
  var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var attr = be5.url.parse(url);

  return {
    entity: attr.positional[1],
    query: attr.positional[2],
    operation: attr.positional[3],
    values: values,
    operationParams: attr.named
  };
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
      return React.createElement('input', { type: 'text', className: 'searchField form-control', onChange: this._handleChange, value: this.state.value, placeholder: be5.messages.filter });
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

var img$1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAAAjCAYAAAANIjHoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAEN9JREFUeNrsXHtsHMUd/u3e03bseJ3EOC8CZwQJCVEUp0CTlEe5U1uUYCp6bishWtrqXAn+7p2E+keLVN0JqapERXWGCtRKpfhaUQjQijsiEgQtrQ9Kg+KQ4EsMCc7D8cXPe+91Zj1j/7yeffgRK0YeaXV3u7Oz8/jmm2++mT2pWq3Ccgv7X3tHIR9tgkvpdw/elcUn9h06SuMpBkllSPyM6AK9j1xLG1zz0eeT6wmjPLI49AASL8XPX9eywW9SNP48XrbMhfNfZNC9uNxpci1LzonKZ3mfWf2yNHE+aVopo/sM8jDrOQbxZuVZVEfkWgr/du49dJQid0iWJHuoIfGqpRKow1koDZyF4qcnIPe/HihmTpLUnCA5nAsGZi6XgwtDw2tMotAKSBoAppMApQudiuoaAYcIOWKCNGj8bvLZqu8ILPjYdf2zcAiyZ2u1hs4nTcoVYODtZg2cYud46GZloQ28x6x8pPHpvR0MPLi+AixdIwAa1RftJDGSXkxwzSgPNH5kHm2RFKRFyxEh6Wn1zVHWZBtVhKEllwuczevBuXEz1N6+Hxoe/D6Mv3sYrrz0PKhjI+S6eykJWM9ScQKotIAtsyguPicKYQackAjYKNBngQl4zUKGHTPyw1iUNmKcNjL5HiTnEvQTNXpEwH68fJzV/AwonXYyw1iuGzEiTSvBOmmQnY+SeD7ybKM0eR54PsMkfoaDbR5tkWHneZnitENSZp4fPRLwVitlAHJoQkOWof4b7eDatAUu/foXoI6PLgrz2gwROhQzluQ91S+oGArmgFViTFr4EYBjFrfMF7xdBuxFh8UuBFQKljQDMrAhWyRR6NAcYLKAM3PIDnDRPQoDSgcemllHirL0QgyMMYs89LH0aDm6RPHs1hHrVEk0ksVkqztLahXyFRWKqgpl8p1+lshRwdqY/FbHRsG7fRcoD5N6qlQ0cC9lwDpygSGEvisElCEb98RtxptTh0SyJImY0BSIjInnWhdhlH6HXk/SNBnLcjKIMnCa5SG9WBWhzw+WCiJSBbdDvtS+pflJxe0uDeaLzv7xiVUEu9eNlUo3DeZLey8XCk1eh2Mav+NjULf3Xhg/8ibkP/4AJI93SUBLQKPoACeqNB+JFxawcEo3oQqhYcrHGrXLQqq0zYN5qQzQn0vwCQr5TFONyJ7vQxIhY2NihctgJwQRE5qBPsaYGQyYFMuONpM8+EicsICFjbR3WC8pjMdzMp2oVNXshVzx6fs2NMNoqQyey0QSkAkYATRsrPVuentg8OdvnrsYcsnytP4l1+v2fR3yx9KCzlAFOy6GShh8DkEv5BMG7OtDkyXMaikd8/DKDrDhjgI+ZALIGGvE4BzB6xdMVNK6ho6hPGWNpAXqCFUD1rYKvGMkLJgvgTqbYiMPWQNw22kLzuxRXf0kzIFLgkOS5VPDY94XTvbn716/FqigLTJQNdd4zj5+q6/zYr5w6weDw/s9jknwVsslcLfeDFLdKgDyHaRpNeL1esuqSqBbVTV3YpGAm9YJ+CABT1BgVWVEWsuAbWPUJiPnutg5M9bNkrgdJG6cxY2zEcAqpAQNlRGAewoolMlMGBEPzxkTLbxUgdZXzGCEMG0LE+nUxSelljMoCsjPx3PwxucX4ObV9eB1TAKOdqsrxRLsXtP4Qnrwyn6sd+X6BpAJcCtDlwkDTwK3XC7DV26/4yd333Pv+6VSSdLAa6SrCbvPY3JGwdKDenNC4NnGLHTelM6l4EesYsW6lGU7Kdsy8EZtNETKjEGZhozrtTQ5Wo06sM0Jj5HDwd0DszwFLVyANKszzec2kTUZi9ED0AjAn6lgJ0W2UyoqBS4XitA3MqbJhDqXE45nR+FYdoQy8HEP0blVJAeooyC5PAzejL1JnN7e46c+OdF7Yv36Db3r1jX3rl3brH3qj+bm5t55TM7wsOSbo0b26TQydxbaDIBtCF6Uh7YFMhaeMEVMtOFiBN7J2ywWSMKCe/Ss34nSii6C1RlB1lpwTsCdlA0SjJcroLhdsNbjJuB1QC3Rs7VORxkP+hJdoKA2Wakww3en58nhPnz4LTh65G3tmqpWNCaecVQq2rHACVp2jrdjJulg+pYfEcS6/jmCd16BTbDCaEIWQ7IibDajn2eIoTrr1oOXPo8ccdQZI0araEzKYLAtyG3RlT3O6gZsma3U+lpDwLqvZY3GoaMEYC1eD6z2uOBiLr+5UFGBa1zq6aojI5rDIDnkWZMzCmA3ScvhpCxdFU7giBaeS9miBFBY4xqxQRuJlxQwTQKBpEugjVPM6uIOQ8oOeJFsMLTdBOxGAYE9W6wFI0wKKTCHhQVRfbFVKCwxIuRcANluSeYd6xcgTP1nDDZWtikfmpULEBsnBY6KUYfvQL4wBW/AFuOqBF+riDxYX+Ml3ye93CzRtzfV18Enw2OPqAiAVCIUThzTgIsnZhSQRC7kDzzQDnfdfY8GYJfLJTw8Hs9cGoIP6wqa9Ihm0wqayfvRPSF0b8yEkbTJkh3Wtcm8PlF+mBSYxWys4btMQD/X+vJjOcTSx8vBfPmX1w9fcrXbYTrZPRxsio22MPOFO3G+LBi3qhLo5V2ypA3tVC5QZmUTs1VPHTv1syMDg+3cy5WcLqiMDsPoW68TtnXMZG0y/G/dtm13S0sLnDp10nB9ggBccrmcBPVwzEL7iCYiok0zEZNKybBrAQa2jIkGzKB7suj5aQvm1acZsOGQBAyM9wgaTTK68mXnUV8zZBUH71w32YjyQCdmJJ09uvmGVVvo6yijs+L28Pulr756ZHLVVmdP0ZMuSTq31ut+tEJIlkgFuW1tY/1ALn/jUKG4/fToxL0Xc4Wb3LI0qV/pYgPRrJef/Q2MHf47yDU1s3UyAXPFQr9SZq6pqfnwRN+Z3bASVoJBMGRcCuNytbrxfK7wJv1NtKzmIlBdStnSKU+yr+bHEulQOP4RDL/yIuQ/6hGClltiVoEtUqgrTbMS5gXcWUCmmlQCmLlDT7sAam4cch9/CKWz/ZMTMIpswQKDZHPrJIlXXWmalbAg4FZnTNKq2kYbyrYSlxd0waGuAZTvPgoN9z8EI4e6YeS1xKTGleWrkukbNrYsRd3QoreC/fX+lTA96eyGmXsVWhfzAWfOnTcHLmG+Cbck/Qs0eFah0e2WFI+75lKusHasXNkyXip7KIgdoIKaz4HsrQHlkZ+CvKoervzp2SXbZLMSrqkQZhPIPVfzIbIZ3TjJ5EzxuO6rczoC5HvgznVN/se2+fZ9a/N1O0Nbb9jZvmX9Ex5ZHi2xvQV04UGdGIeGA0Go2X2nBuZ5hhqL636WRXz4DM4Ds3T47z4WVx8vzA7tjRB2X5L9TiIrpg/F4VbOEDqf1N3LmacH5ROnUwXxWwFJQTlAkG8/yjc/4gIw9ejKalQvPkFZquj+HuQUxNH9uI7a0PmQ4Fk9ut+4LLyOkiwfSZRGHzssV84kAlgPXfKlqdGFCApSIhAKq13Ok9/c1PyrJ3bdcqDB5Rqd2p+rTm6gaWj/nsbA2PciDP4h+Ths43jHBrgzTHBLBudbdZZPgJ2n14PsewDFTzDfkjJFB7uP+qZNMG3Cx1k8Gh9v8VOY1cPjhtFz/agx8XDaydKJgHg5mdt0omG2FZUFWN5wekZDeCsrX5TlR1Qv9FqKnfMjkKZQvCg7n2JpNsFMPz3L4nawOuP7LjpQGn6U3y72PYWIqU3H2nh7py2NK1EflzCrNt+SWJcoE0DWu5ywZ23j0f6xiaee6T39y1rnpHdbLRbA7bsF3FtaoXDqOEhujzYxq62reyw3MfFPaonZnagtou7yIVbIGMTJ6HzZBGuEFLuuoMrlQMdxAWaurKVgejkZbxjJoo7gM8lP2sT3xKGDsVgcdTh9wFsmuX8tqpcOxIb49aKUrkwZFi+IyuVjZUvo6i8oqKOgSXniDNBZ1InD7FzIDuNOjRNuAlz6NkSF/HJKMhD5oK2e/WfwCrTUel8iIC6q057W5HtpGzYR+VCZsrmcTqenvqFB27Y4MTGhvRQ562DnFxm0UcSeaRMG9+nYkTMIf0Exi4b1IMw0/YMobhaBhW/sTukahk9aRCALwfRihJ3An9lkwrhtqHw+xJz6euHLyhJKW/+JQdvJmBGXOYjqBAM2qMuvUYjoGJZvK83O2Q6ju8I+HhoBuohGd4P9+2JWY12K/DJULxBWvlIqV5t5cSmjOhoaZ0gFCl7Kttt37IAbb/QJ993Sc273vF623EeOPwiAwFm0B31XDIDL9wPwCooykHXB9OpZN6vILJIUoBs+uxCwU6yhEogROVtz4Cg6EMYFpk4SgSajkxRhHUOJQpbrQxbXqF4irIx8a2YagS7MfnegMg8hNleQhOJ550u/nUhapXV1pw8JllY3uzcL0xv2J/FltnJGWPbTdV73beRrnlphdM/CNqUeblhVq1ljMruFMHHjy/0DJ8dL5XU8HbmmDrIvPgfDf/0jyLV12jmPx3PPzVu3Hnn44UegUVGgIgCutvBRLsPB9geXix3GX+RbLO3DgduqY+AgmC8XW830/Qu4vwomr7UvdbC0w9DIr+1TeOD6Fsqu2ncyOYOdTas1T/ezsdzGP2fOKfqyVqmrwIBMwbhz167KD374Y6itrYFCoWD4vMo8tjV+iUJKMCHrggVuldSFbjQqpMDilZ1luQChDd8EhHTv7R3NTXD0/CDIBKxfTORhM2He7Y31kMic+xFhW2eNc3pjDdW25cGLILFFCJl8Dl2+/MxzXb8bLpVKpgRVKOTh2w9952tXwV/ks3k7QZoD0KRrvJ1jMHPnWwxJhMgi1sU1BVyVDv9Uz1LLi6+YUc2bL1fg1c8G2l/pP/+4B++9lR3afyuUzvXTnTVTwD1z+vRtdth0kSdnK0HsMEjLuQCylbRxSpKTHNTIdZRV1U0A3DBRrmy6lCvu/1v/wNNPH88kilXVjTWy7PVC7oP3oTxwVtvqONVLCGvTvbZ2DhtDXZQJ+CoS/T2MWfVmt4Jm1noT3k5ICgx+I1NfaJgL0ggbmPhhtHDB04oiYz4uWGhI6ox+PpHr05n/IfQMXl99yxG4VrvDrr+YL75f1dRCVX7yv5+4xkrl+kJFrS+oan2xogL1eJ0ItPT1dHV0BEZe/8tV26uALJc0mtBwqyfAZrp72PU4alQFLRL0wMx9tlaBbwzHNg039fmLmimBNMkI0oijmXqQpZFlafBZfxTlOcTKxU1+PmnsAfO3LPj9URPplP3SMS5RBu5cubKDSIKdeVXd8dnYxC1XiqUN+UqlXnMJiDyY4UZQWeByQfbF30PxzKdX8z/EEshvTSFLKA2zl1hDyIPkXmAa+bagYyXRkqlZB8ro7CC9RWUFqjTyiFNIg069+sLi8EUQvCSLX1eKg/Fyb8LAQovBMg2WlKitlrEVM7r0Sx0FClYJRaBv9WqWF9Gv2ed/C6PJQ5PLvVcvcLBwY59/T8C0cb8HppeEA4jhFMTQad3Mnce3O4ETmfocLF022CyL7lVQB+PeMX8NiS8583I3obzGEJvr8270x31hVFfLMmhSgb69a/03o3SxQQKv0wFE60KRmrp003e5DJXhISj0HoPRf7wMhVO92q4wqVSC+W6qtTk5S8H0y4sKYt8sTC8kAPrNwxBq6IUOkyJTn5/HhjnXnJ2CkQNrUZ5/P+t43IDvYGlw+TOEOnCHBaNHBHKI10nbcgUuXYDQvrx38K5rKmNvvHZo7/0HDr4nurZECxB27LWFmPorYZ6BLkBIy/EfyVeAuwLc/wswAGp0zuOHQHkBAAAAAElFTkSuQmCC';

var MenuFooter = function MenuFooter() {
  return React.createElement(
    'div',
    { className: 'menuFooter' },
    React.createElement('img', { src: img$1 })
  );
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

var states = [];

function set$1(name, value) {
  states[name] = value;
}

function get$1(name) {
  return states[name];
}

function getAll() {
  return states;
}

var documentState = {
  set: set$1,
  get: get$1,
  getAll: getAll
};

var StaticPage = function StaticPage(props) {
  if (!props.value) return null;

  var attributes = props.value.data.attributes;

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
};

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

    _this.state = {
      value: props.value || null,
      frontendParams: props.frontendParams || {}
    };

    _this.refresh = _this.refresh.bind(_this);
    return _this;
  }

  createClass(Document, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps && (!this.props.value || this.props.value.meta === undefined || !nextProps.value || nextProps.value.meta === undefined || nextProps.value.meta._ts_ > this.props.value.meta._ts_)) {
        this.setState({
          value: nextProps.value || "",
          frontendParams: nextProps.frontendParams
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      documentState.set(this.props.frontendParams.documentName, this.state);
      this.updateLocationHashIfNeeded();

      bus.replaceListeners(this.props.frontendParams.documentName, function (data) {
        if (_this2.state.value && _this2.state.value.meta && !Number.isInteger(Number.parseInt(_this2.state.value.meta._ts_))) {
          console.error("meta._ts_ mast be string of Integer " + _this2.state.value.meta._ts_);
        }

        if (!_this2.state.value || !_this2.state.value.meta || !data.value || !data.value.meta || data.value.meta._ts_ > _this2.state.value.meta._ts_) {
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
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      documentState.set(this.props.frontendParams.documentName, this.state);
      this.updateLocationHashIfNeeded();
    }
  }, {
    key: 'updateLocationHashIfNeeded',
    value: function updateLocationHashIfNeeded() {
      var value = this.state.value;
      var self = void 0;
      if (value === null || !value.data && !value.errors) return;
      if (value.data !== undefined) {
        self = value.data.links.self;
      } else {
        self = value.errors[0].links.self;
      }

      if (this.props.frontendParams.documentName === MAIN_DOCUMENT && be5.url.get() !== '#!' + self) {
        //console.log(be5.url.get(), self);
        if (self === defaultRoute()) {
          if (be5.url.get() !== "") be5.url.set("");
        } else {
          be5.url.set(self);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      bus.replaceListeners(this.props.frontendParams.documentName, function (data) {});
      bus.replaceListeners(this.props.frontendParams.documentName + DOCUMENT_REFRESH_SUFFIX, function (data) {});
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

      var DocumentContent = getDocument(documentType);

      if (DocumentContent === undefined) {
        var title = be5.messages.componentForTypeNotRegistered.replace('$type', documentType);
        var value = createStaticValue(title, '', { self: "#!" });

        return React.createElement(StaticPage, {
          value: value,
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
      be5.url.process(this.props.frontendParams.documentName, getSelfUrl(this.state.value));
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

function defaultRoute() {
  return be5.store ? getDefaultRoute(be5.store.getState()) : undefined;
}

Document$1.propTypes = {
  frontendParams: PropTypes.shape({
    documentName: PropTypes.string.isRequired,
    operationDocumentName: PropTypes.string,
    parentDocumentName: PropTypes.string,
    onSuccess: PropTypes.function
  }),
  value: PropTypes.object,
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
            timeout: 5000
          });
        } else {
          Alert.success(data.msg, {
            position: 'top-right',
            timeout: 5000
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
        React.createElement(Alert, { stack: { limit: 10 } }),
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

var NavbarMenu = React.createClass({
  displayName: 'NavbarMenu',

  propTypes: {
    //show: PropTypes.bool,
    menu: PropTypes.shape({}),
    user: PropTypes.shape({}),
    brand: PropTypes.string
  },

  // defaultProps: {
  //   show: true
  // },

  getInitialState: function getInitialState() {
    return { isOpen: false };
  },
  componentWillMount: function componentWillMount() {
    this.props.fetchMenu();
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _props$user = this.props.user,
        loggedIn = _props$user.loggedIn,
        currentRoles = _props$user.currentRoles;

    if (!arraysEqual(currentRoles, nextProps.user.currentRoles) || loggedIn !== nextProps.user.loggedIn) {
      this.props.fetchMenu();
    }
  },
  toggle: function toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  },
  render: function render() {
    if (this.props.menu === null) {
      return null;
    }

    var rootMenuItems = this._renderMenuItems(this.props.menu.root, false);
    var brand = this.props.brand ? React.createElement(
      'a',
      { href: '#!', onClick: processHashUrl, className: 'navbar-brand' },
      this.props.brand
    ) : undefined;
    var rightButtons = this._renderRightButtons();

    return React.createElement(
      Navbar,
      { color: 'dark', dark: true, expand: 'md' },
      React.createElement(
        'div',
        { className: 'container' },
        brand,
        React.createElement(NavbarToggler, { onClick: this.toggle }),
        React.createElement(
          Collapse,
          { isOpen: this.state.isOpen, navbar: true },
          React.createElement(
            Nav,
            { className: '', navbar: true },
            rootMenuItems
          ),
          rightButtons
        )
      )
    );
  },
  _renderRightButtons: function _renderRightButtons() {
    var _props$user2 = this.props.user,
        userName = _props$user2.userName,
        loggedIn = _props$user2.loggedIn,
        currentRoles = _props$user2.currentRoles,
        availableRoles = _props$user2.availableRoles;


    if (!loggedIn) {
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
  },
  _renderDropdownMenuItems: function _renderDropdownMenuItems(items) {
    var active = false;
    var dropdownMenuItems = _(items).map(function (item) {
      // if (item.default) {
      //   return undefined;
      // }
      var _actions$parse = actions.parse(item.action),
          href = _actions$parse.href,
          target = _actions$parse.target;

      //TODO after store url in redux if(this.props.url === href)active = true;


      return React.createElement(
        DropdownItem,
        { onClick: processHashUrl, href: href, key: target + href },
        item.title
      );
    });

    return {
      dropdownMenuItems: dropdownMenuItems,
      active: active
    };
  },
  _renderMenuItems: function _renderMenuItems(items, inDropdown) {
    var _this = this;

    return _(items).map(function (item) {
      // if (item.default) {
      //   return undefined;
      // }

      if (!item.children || item.children.length === 0) {
        var _actions$parse2 = actions.parse(item.action),
            href = _actions$parse2.href,
            target = _actions$parse2.target;
        // const liClass = inDropdown ? '' : 'nav-item';
        // const aClass = inDropdown ? 'dropdown-item' : 'nav-link';
        // return <li className={liClass} key={target+href}><a className={aClass} href={href} target={target}>{item.title}</a></li>;


        var _active = false;
        //if(this.props.url === href)active = true;
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

      var _renderDropdownMenuIt = _this._renderDropdownMenuItems(item.children, true),
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
});

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
        be5.url.process(this.props.documentName, "#!" + this.props.value);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.value) {
        be5.url.process(this.props.documentName, "#!" + this.props.value);
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

var Error = function (_React$Component) {
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
          { className: 'errorPane__title' },
          status,
          ' - ',
          title
        ),
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
          return React.createElement(Error, _extends({}, error, { key: i }));
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
          ' ',
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
    key: 'init',
    value: function init() {
      processHashUrlForDocument(this.props.steps[this.state.compState].url, this.props.documentName);
    }
  }, {
    key: 'setNavState',
    value: function setNavState(e) {
      processHashUrlForDocument(e, this.props.documentName);
      var id = this.getIDbyUrl(e.target.getAttribute("href"));
      this.setState({ compState: id });
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
      var _this2 = this;

      return this.props.steps.map(function (s, i) {
        return React.createElement(
          NavItem,
          { key: "NavItem" + i },
          React.createElement(
            NavLink,
            { href: _this2.props.steps[i].url, active: i === _this2.state.compState, onClick: _this2.setNavState,
              key: "NavLink" + i },
            _this2.props.steps[i].title
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

  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })).isRequired,
  startAtStep: PropTypes.number,
  documentName: PropTypes.string
};

var NavbarMenuContainer = function NavbarMenuContainer(props) {
  return React.createElement(NavbarMenu, props);
};

var mapStateToProps$2 = function mapStateToProps(state) {
  return {
    menu: getMenu(state),
    user: getUser(state),
    url: be5.url.get()
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

var Form = function (_React$Component) {
  inherits(Form, _React$Component);

  function Form(props) {
    classCallCheck(this, Form);

    var _this = possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.state = _this.props.value;

    _this._onFieldChange = _this._onFieldChange.bind(_this);
    _this._setValue = _this._setValue.bind(_this);
    _this._applyOnSubmit = _this._applyOnSubmit.bind(_this);
    _this.apply = _this.apply.bind(_this);
    return _this;
  }

  createClass(Form, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(Object.assign({}, nextProps.value, { wasValidated: false, submitted: false }));
    }
  }, {
    key: 'getParams',
    value: function getParams(values) {
      var attributes = this.state.data.attributes;
      return {
        entity: attributes.entity,
        query: attributes.query,
        operation: attributes.operation,
        operationParams: attributes.operationParams,
        values: values
      };
    }
  }, {
    key: '_reloadOnChange',
    value: function _reloadOnChange(controlName) {
      var _this2 = this;

      if (!this.state.submitted) {
        this.setState({ submitted: true }, function () {
          var values = Object.assign({}, _this2.state.data.attributes.bean.values, { '_reloadcontrol_': controlName });

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
          forms.apply(_this3.getParams(_this3.state.data.attributes.bean.values), _this3.props.frontendParams);
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
    value: function _setValue(name, value) {
      if (!this.state.submitted) {
        JsonPointer.set(this.state.data.attributes.bean, "/values" + name, value);
      }
    }
  }, {
    key: '_onFieldChange',
    value: function _onFieldChange(name, value) {
      var _this4 = this;

      var attributes = this.state.data.attributes;
      this._setValue(name, value);

      this.forceUpdate(function () {
        if (attributes.bean.meta[name].reloadOnChange === true || attributes.bean.meta[name].autoRefresh === true) {
          _this4._reloadOnChange(name);
        }
      });
    }
  }, {
    key: '_createForm',
    value: function _createForm() {
      var attributes = this.state.data.attributes;
      return React.createElement(
        'form',
        {
          id: this.state.meta._ts_,
          onSubmit: this._applyOnSubmit,
          className: classNames(this.state.wasValidated ? 'was-validated' : '', attributes.layout.formClassName)
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
      var attributes = this.state.data.attributes;
      return React.createElement(PropertySet, {
        bean: attributes.bean,
        onChange: this._onFieldChange,
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
        this._createCancelAction()
      );
    }
  }, {
    key: '_createSubmitAction',
    value: function _createSubmitAction(actionData, name) {
      var _this5 = this;

      var _state$data$attribute = this.state.data.attributes.layout,
          bsSize = _state$data$attribute.bsSize,
          submitText = _state$data$attribute.submitText;

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
                  formAction: actionData || 'defaultAction'
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

    /**
     * layout: '{"cancelActionText":"Back"}'
     * layout: '{"cancelAction": {"type": "SET_URL","value":"text/test123"}}'
     */

  }, {
    key: '_createCancelAction',
    value: function _createCancelAction() {
      var _this6 = this;

      var layout = this.state.data.attributes.layout;

      if (layout.hasOwnProperty('cancelAction') || layout.cancelActionText || this.props.frontendParams.documentName === MAIN_DOCUMENT) {
        var action = layout.cancelAction || this.getDefaultCancelAction();
        return React.createElement(
          'button',
          { type: 'button', className: 'btn btn-secondary', onClick: function onClick() {
              return executeFrontendActions(action, _this6.props.frontendParams);
            } },
          layout.cancelActionText || be5.messages.back
        );
      } else {
        return null;
      }
    }
  }, {
    key: 'getDefaultCancelAction',
    value: function getDefaultCancelAction() {
      if (window.history.length > 1) {
        return new FrontendAction(GO_BACK);
      } else {
        return new FrontendAction(OPEN_DEFAULT_ROUTE);
      }
    }
  }, {
    key: '_getErrorPane',
    value: function _getErrorPane() {
      var errorModel = this.state.data.attributes.errorModel;

      if (errorModel) {
        return React.createElement(ErrorPane, { value: { errors: [errorModel], meta: this.state.meta } });
      } else {
        return null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var attributes = this.state.data.attributes;

      return React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'formBox ' + (attributes.layout.formBoxCssClasses || 'col-12 max-width-970 formBoxDefault') },
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
      var attributes = this.state.data.attributes;
      return React.createElement(PropertySet, {
        bean: attributes.bean,
        onChange: this._onFieldChange,
        localization: be5.messages.property,
        bsSize: attributes.layout.bsSize,
        horizontal: true,
        horizontalColSize: attributes.layout.horizontalColSize || 2
      });
    }
  }, {
    key: '_createFormActions',
    value: function _createFormActions() {
      var horizontalColSize = this.state.data.attributes.layout.horizontalColSize || 2;
      var colTag = 'col-lg-' + (12 - horizontalColSize);
      var offsetTag = 'offset-lg-' + horizontalColSize;

      return React.createElement(
        'div',
        { className: 'formActions row' },
        React.createElement(
          'div',
          { className: classNames(colTag, offsetTag) },
          this._createSubmitAction(),
          ' ',
          this._createCancelAction()
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

    _this.state = _this.props.value;

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
      var attributes = this.state.data.attributes;
      return React.createElement(
        'form',
        {
          id: this.state.meta._ts_,
          className: classNames('submit-onchange-form', this.state.wasValidated ? 'was-validated' : '', attributes.layout.formClassName)
        },
        React.createElement(PropertyInput, {
          id: 0,
          bean: attributes.bean,
          localization: be5.messages.property,
          onChange: this._onFieldChangeAndSubmit,
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
          this._createCancelAction()
        )
      );
    }
  }, {
    key: '_createCancelAction',
    value: function _createCancelAction() {
      var _this2 = this;

      var layout = this.state.data.attributes.layout;
      var action = layout.cancelAction || new FrontendAction(CLOSE_MAIN_MODAL);
      return React.createElement(
        'button',
        { type: 'button', className: 'btn btn-secondary', onClick: function onClick() {
            return executeFrontendActions(action, _this2.props.frontendParams);
          } },
        layout.cancelActionText || be5.messages.close
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var attributes = this.state.data.attributes;
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
      var attributes = this.state.data.attributes;

      var commonProps = {
        bean: attributes.bean,
        onChange: this._onFieldChange,
        localization: be5.messages.property,
        inline: true,
        rowClass: "d-flex",
        bsSize: attributes.layout.bsSize,
        className: 'mr-sm-2'
      };

      var properties = attributes.bean.order.map(function (p) {
        return React.createElement(Property, _extends({ key: p, path: p }, commonProps));
      });

      return React.createElement(
        'form',
        {
          id: this.state.meta._ts_,
          onSubmit: this._applyOnSubmit,
          className: classNames('form-inline', this.state.wasValidated ? 'was-validated' : '', attributes.layout.formClassName || 'form-inline-mini')
        },
        React.createElement(
          'label',
          { className: classNames("mr-sm-2", { 'col-form-label-sm': attributes.layout.bsSize === "sm" }, { 'col-form-label-lg': attributes.layout.bsSize === "lg" }) },
          React.createElement(
            'strong',
            null,
            attributes.title
          )
        ),
        properties,
        this._createSubmitAction(),
        this._getErrorPane()
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
    key: 'render',
    value: function render() {
      var attributes = this.props.value.data.attributes;

      var message = attributes.message;
      if (attributes.status === 'finished' && attributes.message === undefined) {
        message = be5.messages.successfullyCompleted;
      }

      return React.createElement(
        'div',
        { className: 'finishedResult' },
        React.createElement('div', { dangerouslySetInnerHTML: { __html: message } })
      );
      //    <div className="linkBack">
      //              <button className="btn btn-secondary btn-sm" onClick={back}>
      //                {be5.messages.back}
      //              </button>
      //            </div>
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
    key: 'onClick',
    value: function onClick(name, e) {
      if (!$(ReactDOM.findDOMNode(this.refs[name])).hasClass('disabled')) {
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
    key: 'refreshEnablement',
    value: function refreshEnablement() {
      var _this2 = this;

      if (!this.props.operations) return;
      this.props.operations.attributes.forEach(function (operation) {
        var visible = false;
        switch (operation.visibleWhen) {
          case 'always':
            visible = true;
            break;
          case 'oneSelected':
            visible = be5.tableState.selectedRows.length === 1;
            break;
          case 'anySelected':
            visible = be5.tableState.selectedRows.length !== 0;
            break;
          case 'hasRecords':
            visible = _this2.props.hasRows;
            break;
        }
        if (visible) {
          $(ReactDOM.findDOMNode(_this2.refs[operation.name])).addClass('enabled');
          $(ReactDOM.findDOMNode(_this2.refs[operation.name])).removeClass('disabled');
        } else {
          $(ReactDOM.findDOMNode(_this2.refs[operation.name])).addClass('disabled');
          $(ReactDOM.findDOMNode(_this2.refs[operation.name])).removeClass('enabled');
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (!this.props.operations) return null;
      var splitWithSpaces = function splitWithSpaces(elements) {
        var out = [];
        _(elements).each(function (e) {
          if (out.length !== 0) {
            out.push(' ');
          }
          out.push(e);
        });
        return out;
      };
      var operations = this.props.operations.attributes.filter(function (operation) {
        return _this3.props.hideOperations.indexOf(operation.name) === -1;
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
            onClick: _this3.onClick.bind(_this3, operation.name),
            className: 'btn btn-secondary btn-secondary-old btn-sm'
          },
          operation.title
        );
      });

      if (this.props.operations.attributes.length === 0) {
        return React.createElement('div', null);
      }
      return React.createElement(
        'div',
        { className: 'operationList' },
        splitWithSpaces(operations)
      );
    }
  }]);
  return OperationBox;
}(React.Component);

OperationBox.defaultProps = {
  hideOperations: []
};

var QuickColumns = function (_React$Component) {
  inherits(QuickColumns, _React$Component);

  function QuickColumns(props) {
    classCallCheck(this, QuickColumns);

    var _this = possibleConstructorReturn(this, (QuickColumns.__proto__ || Object.getPrototypeOf(QuickColumns)).call(this, props));

    _this.state = _this.createStateFromProps(_this.props);
    return _this;
  }

  createClass(QuickColumns, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(this.createStateFromProps(nextProps));
    }
  }, {
    key: 'createStateFromProps',
    value: function createStateFromProps(props) {
      if (props.columns.length === 0) return [];
      //const firstRow=props.rows[0].cells;
      return { quickColumns: props.columns.map(function (col, idx) {
          if (col.quick) return { columnId: idx, visible: col.quick === 'yes' };else return null;
        }).filter(function (col) {
          return col !== null;
        })
      };
    }
  }, {
    key: 'setTable',
    value: function setTable(_table) {
      this.setState({ table: _table });
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
      var _this2 = this;

      if (this.state.quickColumns.length === 0) {
        return null;
      }
      if (this.state.table) {
        var dataTable = $(this.state.table).find('table').dataTable();
        var columnsCount = dataTable.fnSettings().aoColumns.length;
        this.state.quickColumns.forEach(function (col) {
          var columnId = col.columnId + (_this2.props.selectable ? 1 : 0);
          if (columnId < columnsCount) {
            var dtColumn = dataTable.api().column(columnId);
            if (dtColumn.visible) dtColumn.visible(col.visible);
          }
        });
      }

      var checks = this.state.quickColumns.map(function (cell, idx) {
        var _this3 = this;

        var column = this.props.columns[cell.columnId];
        var title = column.title.replace(/<br\s*[\/]?>/gi, " ");
        return React.createElement(
          'span',
          { key: idx },
          React.createElement('input', { id: "quick" + idx, type: 'checkbox', checked: cell.visible, onChange: function onChange() {
              return _this3.quickHandleChange(idx);
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
          '\u0414\u0440\u0443\u0433\u0438\u0435 \u043A\u043E\u043B\u043E\u043D\u043A\u0438:'
        ),
        checks
      );
    }
  }]);
  return QuickColumns;
}(React.Component);

var loadTable = function loadTable(params, frontendParams) {
  getTable(params, function (json) {
    //todo remove 'json.data' check after change error code
    changeDocument(frontendParams.documentName, { value: json, frontendParams: frontendParams });
  }, function (json) {
    changeDocument(frontendParams.documentName, { value: json, frontendParams: frontendParams });
  });
};

var loadTableByUrl = function loadTableByUrl(url, frontendParams) {
  getTable(getTableParams(url), function (json) {
    changeDocument(frontendParams.documentName, { value: json, frontendParams: frontendParams });
  }, function (json) {
    changeDocument(frontendParams.documentName, { value: json, frontendParams: frontendParams });
  });
};

var fetchTableByUrl = function fetchTableByUrl(url, callback, failure) {
  getTable(getTableParams(url + "/_cleanNav_=true"), callback, failure);
};

var getTableParams = function getTableParams(url) {
  var attr = be5.url.parse(url);

  return {
    entity: attr.positional[1],
    query: attr.positional[2],
    params: attr.named
  };
};

var getTable = function getTable(params, callback, failure) {
  be5.net.request('table', getRequestParams(params), function (data) {
    return callback(data);
  }, function (data) {
    return failure(data);
  });
};

var updateTable = function updateTable(params, callback) {
  be5.net.request('table/update', getRequestParams(params), function (data) {
    callback(data);
  }, function (data) {
    console.error(data);
  });
};

var getRequestParams = function getRequestParams(params) {
  Preconditions.passed(params.entity);
  Preconditions.passed(params.query);

  return {
    entity: params.entity,
    query: params.query,
    values: be5.net.paramString(params.params),
    _ts_: new Date().getTime()
  };
};

var propTypes$2 = {
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
  var currentCat = pUrl.named['_cat_'];

  if (currentCat === undefined) {
    return React.createElement(
      'div',
      { className: 'category-navigation category-navigation__not-select' },
      React.createElement(
        'a',
        { href: be5.url.create(pUrl.positional, Object.assign({}, pUrl.named, { _cat_: categories[0].id })) },
        be5.locale.msg('Switch to categorized view')
      )
    );
  }

  var row = [];

  function tableTd(categories) {
    return categories.map(function (cat) {
      if (parseInt(currentCat) !== cat.id) {
        return React.createElement(
          'a',
          { className: 'd-block',
            href: be5.url.create(pUrl.positional, Object.assign({}, pUrl.named, { _cat_: cat.id })), key: cat.id },
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

CategoryNavigation.propTypes = propTypes$2;

var getFilterParams = function getFilterParams(params) {
  if (params[SEARCH_PARAM] !== "true") {
    return {};
  }

  var searchPresets = params[SEARCH_PRESETS_PARAM] === undefined ? [] : params[SEARCH_PRESETS_PARAM].split(',');
  return Object.keys(params).filter(function (key) {
    return !key.startsWith("_");
  }).filter(function (key) {
    return !searchPresets.includes(key);
  }).reduce(function (obj, key) {
    obj[key] = params[key];
    return obj;
  }, {});
};

var propTypes$3 = {};

var FilterUI = function FilterUI(_ref) {
  var entity = _ref.entity,
      query = _ref.query,
      params = _ref.params,
      frontendParams = _ref.frontendParams;

  var filterParams = getFilterParams(params);

  function clearFilter(e) {
    e.preventDefault();
    var searchPresets = params['_search_presets_'] === undefined ? [] : params['_search_presets_'].split(',');
    var newParams = {};
    searchPresets.forEach(function (x) {
      return newParams[x] = params[x];
    });
    newParams['_search_'] = "true";
    newParams['_search_presets_'] = params['_search_presets_'];
    //console.log(newParams);

    var paramsObject = {
      entity: entity,
      query: query || 'All records',
      params: newParams
    };
    loadTable(paramsObject, frontendParams);
  }

  if (Object.keys(filterParams).length > 0) {
    return React.createElement(
      'div',
      { className: 'table-filter-ui mb-2' },
      React.createElement(
        'a',
        { href: '#', onClick: clearFilter },
        be5.messages.table.clearFilter
      )
    );
  }

  return null;
};

FilterUI.propTypes = propTypes$3;

var formatCell = function formatCell(data, options, isColumn) {
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
        html: data,
        href: "#!" + options.link.url,
        class: "process-hash-url"
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

var TableBox = function (_React$Component) {
  inherits(TableBox, _React$Component);

  function TableBox(props) {
    classCallCheck(this, TableBox);
    return possibleConstructorReturn(this, (TableBox.__proto__ || Object.getPrototypeOf(TableBox)).call(this, props));
  }

  createClass(TableBox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.refs.table) this.applyTableStyle(ReactDOM.findDOMNode(this.refs.table));

      this.props._refreshEnablementIfNeeded();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.refs.table) this.applyTableStyle(ReactDOM.findDOMNode(this.refs.table));
    }
  }, {
    key: 'onSelectionChange',
    value: function onSelectionChange() {
      this.props._refreshEnablementIfNeeded();

      if (this.props.hasOwnProperty('callbacks') && this.props.callbacks !== undefined && this.props.callbacks.hasOwnProperty('onSelectionChange')) {
        this.props.callbacks.onSelectionChange(be5.tableState.selectedRows);
      }
    }
  }, {
    key: 'applyTableStyle',
    value: function applyTableStyle(node) {
      var _this3 = this;

      // see http://datatables.net/examples/index
      $(node).empty();
      var attributes = this.props.value.data.attributes;
      if (attributes.columns.length === 0) return;

      var _this = this;
      be5.tableState.selectedRows = [];

      var thead = $('<thead>');
      var theadrow = $('<tr>').appendTo(thead);
      var tbody = $('<tbody>');
      var tfoot = $('<tfoot>');
      var tfootrow = $('<tr>').appendTo(tfoot);
      var hasCheckBoxes = attributes.selectable;
      var editOperation = this.props.operations === undefined ? undefined : this.props.operations.attributes.find(function (operation) {
        return operation.name === 'Edit';
      });

      theadrow.append($("<th>").text("#"));
      tfootrow.append($("<th>").text("#"));
      attributes.columns.forEach(function (column) {
        var title = (typeof column === 'undefined' ? 'undefined' : _typeof(column)) === 'object' ? column.title : column;
        theadrow.append($("<th>").html(formatCell(title, 'th', true)));
        tfootrow.append($("<th>").html(formatCell(title, 'th', true)));
      });
      attributes.rows.forEach(function (row) {
        var tr = $('<tr>');
        row.cells.forEach(function (cell) {
          tr.append($('<td>').html(formatCell(cell.content, cell.options)));
        });
        tr.prepend($('<td>').text(row.id));
        tbody.append(tr);
      });

      var tableDiv = $('<table id="' + this.props.value.meta._ts_ + '" ' + 'class="table table-striped table-striped-light table-bordered display table-sm" cellspacing="0"/>').append(thead).append(tbody).append(attributes.rows.length > 10 ? tfoot : '').appendTo(node);

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
          var params = {
            entity: attributes.category,
            query: attributes.page,
            params: Object.assign({}, attributes.parameters, {
              _offset_: data.start,
              _limit_: data.length
            })
          };
          if (data.order && data.order.length > 0) {
            params.params._orderColumn_ = data.order[0].column;
            params.params._orderDir_ = data.order[0].dir;
          }
          updateTable(params, function (jsonApiModel) {
            var json = jsonApiModel.data.attributes;
            if (json.type === "error") {
              be5.log.error(json.value.code + "\n" + json.value.message);
            } else {
              for (var i = 0; i < json.data.length; i++) {
                for (var j = 0; j < json.data[0].length; j++) {
                  json.data[i][j] = formatCell(json.data[i][j].content, json.data[i][j].options);
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
            var dataTable = $(_this3.refs.table).find('table').dataTable();
            var display = dataTable.api().page.info().start + meta.row + 1;
            if (!hasCheckBoxes) {
              return display;
            }

            if (editOperation !== undefined) {
              display = '<a href="#" data-val="' + val + '" class="edit-operation-btn">' + display + '</a>';
            }

            return ('<input id="{id}" type="checkbox" class="rowCheckbox"/> ' + '<label for="{id}" class="rowIndex">{val}</label>').replace('{id}', id).replace('{id}', id).replace('{val}', display);
          },
          targets: 0
        }, {
          render: function render(data, type, row) {
            if (type === 'display') {
              var container = $('<div/>').html(formatCell(data));
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
            if (checked && $.inArray(rowId, be5.tableState.selectedRows) === -1) {
              be5.tableState.selectedRows.push(rowId);
              // if(attributes.rows.length === be5.tableState.selectedRows.length){
              //   $('#rowCheckboxAll').prop('checked', true);
              // }
            } else if (!checked && $.inArray(rowId, be5.tableState.selectedRows) !== -1) {
              be5.tableState.selectedRows.splice($.inArray(rowId, be5.tableState.selectedRows), 1);
              //$('#rowCheckboxAll').prop('checked', false);
            }
            _this.onSelectionChange();
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
      //   if ( $(_this.refs.table).find('.paging_simple_numbers span .paginate_button')
      //     && $(_this.refs.table).find('.paging_simple_numbers span .paginate_button').length > 1) {
      //     $(_this.refs.table).find('.dataTables_length').show();
      //     $(_this.refs.table).find('.paging_simple_numbers').show()
      //   } else {
      //     $(_this.refs.table).find('.dataTables_length').hide();
      //     $(_this.refs.table).find('.paging_simple_numbers').hide()
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
        if (_this3.refs && _this3.refs.table) {
          var dataTable = $(_this3.refs.table).find('table').dataTable();
          if (groupingColumn !== null) drawGrouping(dataTable.api());
        }
        //hideControls();
      };

      tableDiv.dataTable(tableConfiguration);

      $('.dataTables_length select').removeClass('form-control-sm');

      tableDiv.on("click", '.edit-operation-btn', function (e) {
        e.preventDefault();
        _this.props.onOperationClick(editOperation, $(this).data("val"));
      });

      tableDiv.on("click", '.process-hash-url', function (e) {
        e.preventDefault();
        processHashUrlForDocument(e, _this.props.frontendParams.documentName);
      });

      tableDiv.on("click", '.open-hash-url', function (e) {
        e.preventDefault();
        processHashUrl(e, MAIN_DOCUMENT);
      });

      tableDiv.on('draw.dt', function () {
        be5.tableState.selectedRows = [];
        _this.props._refreshEnablementIfNeeded();
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
      //
      //   _this.onSelectionChange();
      // });

      this.refs.quickColumns.setTable(this.refs.table);

      this.onSelectionChange();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var a = this.props.value.data.attributes;


      if (a.rows.length === 0) {
        var currentPage = a.offset / a.length + 1;
        if (a.totalNumberOfRows > 0) {
          return React.createElement(
            'div',
            null,
            React.createElement(
              'p',
              null,
              be5.messages.table.noRecordsOnThePage.replace('{0}', currentPage)
            ),
            React.createElement(
              'ul',
              { className: 'pagination' },
              React.createElement(
                'li',
                { className: 'paginate_button page-item' },
                React.createElement(
                  'a',
                  {
                    href: '#',
                    className: 'page-link',
                    onClick: function onClick(e) {
                      e.preventDefault();
                      loadTableByUrl("table/equipments/All records/_offset_=" + (a.offset - a.length), _this4.props.frontendParams);
                    }
                  },
                  be5.messages.table.previousPage
                )
              ),
              React.createElement(
                'li',
                { className: 'paginate_button page-item' },
                React.createElement(
                  'a',
                  {
                    href: '#',
                    className: 'page-link',
                    onClick: function onClick(e) {
                      e.preventDefault();
                      loadTableByUrl("table/equipments/All records/_offset_=0", _this4.props.frontendParams);
                    }
                  },
                  '1'
                )
              ),
              React.createElement(
                'li',
                { className: 'paginate_button page-item disabled' },
                React.createElement(
                  'a',
                  { href: '#', className: 'page-link' },
                  be5.messages.table.nextPage
                )
              )
            )
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
        null,
        React.createElement(QuickColumns, {
          ref: 'quickColumns',
          columns: a.columns,
          category: a.category,
          page: a.page,
          table: this.refs.table,
          selectable: a.selectable
        }),
        React.createElement(
          'div',
          { className: '' },
          React.createElement('div', { ref: 'table', className: 'row' })
        )
      );
    }
  }]);
  return TableBox;
}(React.Component);

//todo add register new component and move to condo, add base types


var ListTableBox = function (_React$Component2) {
  inherits(ListTableBox, _React$Component2);

  function ListTableBox() {
    classCallCheck(this, ListTableBox);
    return possibleConstructorReturn(this, (ListTableBox.__proto__ || Object.getPrototypeOf(ListTableBox)).apply(this, arguments));
  }

  createClass(ListTableBox, [{
    key: 'render',
    value: function render() {
      var list = this.props.value.data.attributes.rows.map(function (col, idx) {
        return React.createElement('li', { key: idx, dangerouslySetInnerHTML: { __html: col.cells[0].content } });
      });

      return React.createElement(
        'ul',
        { className: 'listTableBox' },
        list
      );
    }
  }]);
  return ListTableBox;
}(React.Component);

var Table = function (_React$Component3) {
  inherits(Table, _React$Component3);

  function Table(props) {
    classCallCheck(this, Table);

    var _this6 = possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this6.state = { runReload: "" };
    _this6.onOperationClick = _this6.onOperationClick.bind(_this6);
    _this6._refreshEnablementIfNeeded = _this6._refreshEnablementIfNeeded.bind(_this6);
    return _this6;
  }

  createClass(Table, [{
    key: 'onOperationClick',
    value: function onOperationClick(operation, selectedRow) {
      var frontendParams = {
        documentName: this.props.frontendParams.operationDocumentName || this.props.frontendParams.documentName,
        parentDocumentName: this.props.frontendParams.documentName
      };

      if (operation.clientSide === true) {
        executeFrontendActions(JSON.parse(operation.action), frontendParams);
        return;
      }

      var name = operation.name;
      var attr = this.props.value.data.attributes;

      var operationParams = void 0;

      if (be5.tableState.selectedRows.length > 0 || selectedRow) {
        operationParams = Object.assign({}, attr.parameters, { "_selectedRows_": selectedRow || be5.tableState.selectedRows.join() });
      } else {
        operationParams = attr.parameters;
      }

      var params = {
        entity: attr.category,
        query: attr.page || 'All records',
        operation: name,
        values: {},
        operationParams: operationParams
      };

      forms.load(params, frontendParams);
    }
  }, {
    key: 'render',
    value: function render() {
      var value = this.props.value;
      var _props$value = this.props.value,
          data = _props$value.data,
          included = _props$value.included;

      if (this.props.frontendParams.documentName === MAIN_DOCUMENT) be5.ui.setTitle(data.attributes.title + ' ' + this.getOperationParamsInfo());
      var hasRows = data.attributes.rows.length !== 0;
      var operations = getResourceByType(included, "documentOperations");

      //const reloadClass = "table-reload float-xs-right " + this.state.runReload;
      var table = null;

      if (value.data.attributes.parameters && value.data.attributes.parameters._displayType_ === 'list') {
        table = React.createElement(ListTableBox, { ref: 'tableBox', value: value });
      } else {
        table = React.createElement(TableBox, {
          _refreshEnablementIfNeeded: this._refreshEnablementIfNeeded,
          ref: 'tableBox',
          value: value,
          operations: operations,
          onOperationClick: this.onOperationClick,
          frontendParams: this.props.frontendParams
        });
      }

      var TitleTag = 'h' + (value.data.attributes.parameters && value.data.attributes.parameters._titleLevel_ || 1);

      var topFormJson = value.included !== undefined ? getModelByID(value.included, value.meta, "topForm") : undefined;
      var topForm = void 0;
      var hideOperations = data.attributes.layout.hideOperations || [];
      if (topFormJson) {
        hideOperations.push(topFormJson.data.attributes.operation);
        topForm = React.createElement(Document$1, {
          frontendParams: { documentName: "documentTopForm", parentDocumentName: this.props.frontendParams.documentName },
          value: topFormJson
        });
      }

      return React.createElement(
        'div',
        { className: 'table-component' },
        topForm,
        React.createElement(
          TitleTag,
          { className: 'table-component__title' },
          value.data.attributes.title,
          this.getOperationParamsInfo().length > 0 ? React.createElement(
            'small',
            null,
            ' ',
            this.getOperationParamsInfo()
          ) : null
        ),
        React.createElement(CategoryNavigation, {
          data: getResourceByType(included, "documentCategories"),
          url: getSelfUrl(this.props.value)
        }),
        React.createElement(OperationBox, {
          ref: 'operations',
          operations: operations,
          onOperationClick: this.onOperationClick,
          hasRows: hasRows,
          hideOperations: hideOperations
        }),
        React.createElement(FilterUI, {
          entity: data.attributes.category,
          query: data.attributes.page,
          params: data.attributes.parameters,
          frontendParams: this.props.frontendParams
        }),
        table,
        this._createCancelAction()
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
    key: '_createCancelAction',
    value: function _createCancelAction() {
      var _this7 = this;

      var layout = this.props.value.data.attributes.layout;

      if (layout.hasOwnProperty('cancelAction') || layout.cancelActionText || this.props.frontendParams.documentName === MAIN_DOCUMENT) {
        var action = layout.cancelAction || getBackOrOpenDefaultRouteAction();
        return React.createElement(
          'button',
          {
            type: 'button',
            className: 'btn btn-light mt-2',
            onClick: function onClick() {
              return executeFrontendActions(action, _this7.props.frontendParams);
            }
          },
          layout.cancelActionText || be5.messages.back
        );
      } else {
        return null;
      }
    }
  }, {
    key: '_refreshEnablementIfNeeded',
    value: function _refreshEnablementIfNeeded() {
      this.refs.operations.refreshEnablement();
    }
  }]);
  return Table;
}(React.Component);

Table.propTypes = {
  value: PropTypes.object.isRequired
};

registerDocument('table', Table);

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

var route = function route(documentName, page) {
  changeDocument(documentName, {});
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

var route$2 = function route(documentName, entity, query, operation, operationParams) {

  var params = {
    entity: entity,
    query: query || 'All records',
    operation: operation,
    values: {},
    operationParams: operationParams
  };

  forms.load(params, { documentName: documentName });
};

registerRoute("form", route$2);

var route$4 = function route() {
  openOperationByUrl('form/users/All records/Login', {
    documentName: MAIN_MODAL_DOCUMENT
  });
};

registerRoute("login", route$4);

var route$6 = function route() {
  openOperationByUrl('form/users/All records/Logout', {
    documentName: MAIN_DOCUMENT, onSuccess: function onSuccess(result, applyParams) {
      //not used document.cookie = 'be_auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    }

  });
};

registerRoute("logout", route$6);

var route$8 = function route(documentName, page) {
  var requestParams = {
    _ts_: new Date().getTime()
  };

  be5.net.request('static/' + page, requestParams, function (json) {
    if (documentName === MAIN_DOCUMENT) be5.ui.setTitle(json.data.attributes.title);
    changeDocument(documentName, { value: json });
  });
};

registerRoute("static", route$8);

var route$10 = function route(documentName, entity, query, params) {

  var paramsObject = {
    entity: entity,
    query: query || 'All records',
    params: params
  };
  loadTable(paramsObject, { documentName: documentName });
};

registerRoute("table", route$10);

var route$12 = function route(documentName, params) {
  var requestParams = {
    values: be5.net.paramString(params),
    _ts_: new Date().getTime()
  };

  be5.net.request('queryBuilder', requestParams, function (data) {
    if (documentName === MAIN_DOCUMENT) be5.ui.setTitle("Query Builder");
    changeDocument(documentName, { value: Object.assign({}, data, { params: be5.net.paramString(params) }) });
  });
};

registerRoute("queryBuilder", route$12);

var route$14 = function route(documentName, text) {
  if (documentName === MAIN_DOCUMENT) be5.ui.setTitle();
  var data = createStaticValue(undefined, text, { self: "text/" + text });
  changeDocument(documentName, { value: data });
};

registerRoute("text", route$14);

var route$16 = function route(documentName, entity) {
  var requestParams = {
    entity: entity
  };

  be5.net.request('categories/forest/', requestParams, function (data) {
    changeDocument(documentName, {
      value: createStaticValue('', "<pre>" + JSON.stringify(data, null, 4) + "</pre>")
    });
  });
};

registerRoute("categories", route$16);

var TableBox$1 = function (_React$Component) {
  inherits(TableBox, _React$Component);

  function TableBox(props) {
    classCallCheck(this, TableBox);

    var _this = possibleConstructorReturn(this, (TableBox.__proto__ || Object.getPrototypeOf(TableBox)).call(this, props));

    _this.onOperationClick = _this.onOperationClick.bind(_this);
    return _this;
  }

  // componentDidMount() {
  //   if(this.refs.table)
  //     this.applyTableStyle(ReactDOM.findDOMNode(this.refs.table));
  //
  //   this._refreshEnablementIfNeeded();
  // }

  // componentWillReceiveProps(nextProps)
  // {
  //   $('#table' + this.props.value.meta._ts_).dataTable().fnDestroy();
  // }

  // componentWillUpdate() {
  //   if(this.refs.table)
  //     this.applyTableStyle(ReactDOM.findDOMNode(this.refs.table));
  // }

  // componentDidUnMount() {
  //   $('#table' + this.props.value.meta._ts_).dataTable().fnDestroy();
  // }

  createClass(TableBox, [{
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
        values: {},
        operationParams: attr.parameters
      };

      forms.load(params, {
        documentName: this.props.frontendParams.operationDocumentName || this.props.frontendParams.documentName,
        parentDocumentName: this.props.frontendParams.documentName
      });
    }
  }, {
    key: 'onSelectionChange',
    value: function onSelectionChange() {
      this._refreshEnablementIfNeeded();

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
    //         values: be5.net.paramString(attributes.parameters),
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
          React.createElement(OperationBox, { ref: 'operations', operations: attributes.operations, onOperationClick: this.onOperationClick, hasRows: attributes.rows.length !== 0 }),
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
        React.createElement(OperationBox, { ref: 'operations', operations: attributes.operations, onOperationClick: this.onOperationClick, hasRows: attributes.rows.length !== 0 }),
        React.createElement(QuickColumns, { ref: 'quickColumns', columns: attributes.columns, firstRow: attributes.rows[0].cells, table: this.refs.table, selectable: attributes.selectable }),
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

    // _refreshEnablementIfNeeded() {
    //   if (this.refs !== undefined && this.refs.operations !== undefined) {
    //     this.refs.operations.refreshEnablement();
    //   }
    // }

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
  return TableBox;
}(React.Component);

//todo add register new component and move to condo, add base types
// class ListTableBox extends React.Component
// {
//   render(){
//     const list = this.props.value.data.attributes.rows.map( (col, idx) => {
//       return <li key={idx} dangerouslySetInnerHTML={ {__html: col.cells[0].content}}/>;
//     });
//
//     return (
//       <ul className="listTableBox">
//         {list}
//       </ul>
//     );
//   }
// }

var ReactTable = function (_React$Component2) {
  inherits(ReactTable, _React$Component2);

  function ReactTable(props) {
    classCallCheck(this, ReactTable);

    var _this2 = possibleConstructorReturn(this, (ReactTable.__proto__ || Object.getPrototypeOf(ReactTable)).call(this, props));

    _this2.state = { runReload: "" };
    return _this2;
  }

  createClass(ReactTable, [{
    key: 'render',
    value: function render() {
      var value = this.props.value;
      //const reloadClass = "table-reload float-xs-right " + this.state.runReload;
      var table = null;

      // if(value.data.attributes.parameters && value.data.attributes.parameters._displayType_ === 'list')
      // {
      //   table = (
      //     <ListTableBox ref="tableBox" value={value} />
      //   )
      // }
      // else
      {
        table = React.createElement(TableBox$1, {
          ref: 'tableBox',
          value: value,
          frontendParams: this.props.frontendParams
        });
      }

      var TitleTag = 'h' + (value.data.attributes.parameters && value.data.attributes.parameters._titleLevel_ || 1);

      //todo use getModelByID() instead getResourceByID()
      var topFormJson = value.included !== undefined ? getModelByID(value.included, value.meta, "topForm") : undefined;
      var topForm = void 0;
      if (topFormJson) {
        topForm = React.createElement(Document$1, {
          frontendParams: { documentName: "documentTopForm", parentDocumentName: this.props.frontendParams.documentName },
          value: topFormJson
        });
      }

      return React.createElement(
        'div',
        { className: 'table-component' },
        topForm,
        React.createElement(
          TitleTag,
          { className: 'table-component__title' },
          value.data.attributes.title
        ),
        table
      );
    }
  }]);
  return ReactTable;
}(React.Component);

ReactTable.propTypes = {
  value: PropTypes.object.isRequired
};

registerDocument('rTable', ReactTable);

//import brace from 'brace';
//todo create file for BE-SQL
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
      this.update(this.props.value);
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
      var _this2 = this;

      var requestParams = {
        sql: this.state.sql,
        updateWithoutBeSql: this.state.updateWithoutBeSql,
        values: this.props.value.params,
        _ts_: new Date().getTime()
      };

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
                'update without be sql'
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
          React.createElement(AceEditor, {
            value: sql,
            mode: 'mysql',
            theme: 'xcode',
            fontSize: 13,
            onChange: this.updateCode,
            name: 'queryBuilder_editor',
            width: '100%',
            height: '100%',
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            editorProps: {
              $blockScrolling: Infinity,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2
            },
            commands: [{
              name: 'Submit',
              bindKey: { win: 'Alt-Enter', mac: 'Command-Enter' },
              exec: this.submit
            }]
          }),
          React.createElement(
            'div',
            null,
            React.createElement(
              'button',
              {
                className: 'btn btn-primary btn-sm mt-2 mb-2',
                onClick: this.submit,
                title: 'Alt-Enter'
              },
              '\u0412\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C'
            ),
            React.createElement(Document$1, {
              value: getModelByID(value.included, value.meta, "result"),
              frontendParams: { documentName: "queryBuilder-result" }
            }),
            React.createElement(StaticPage, { value: getModelByID(value.included, value.meta, "finalSql") }),
            React.createElement('br', null),
            React.createElement(ErrorPane, { value: value })
          )
        )
      );
    }
  }]);
  return QueryBuilder;
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

registerPage("uiPanel", UiPanel, function (documentName) {
  changeDocument(documentName, createPageValue("uiPanel", { attributes: { title: "UI panel" } }));
});

var SystemCard = function SystemCard(props) {
  var title = props.value.data.attributes.title;
  be5.ui.setTitle(title);
  var steps = [{ title: 'Cache', url: '#!table/_system_/Cache' }, { title: 'Daemons', url: '#!table/_system_/Daemons' }, { title: 'Entities', url: '#!table/_system_/Entities' }, { title: 'Session variables', url: '#!table/_system_/Session variables' }, { title: 'Query builder', url: '#!queryBuilder' }];

  return React.createElement(
    "div",
    { className: "info-card" },
    React.createElement(
      "h1",
      { style: { marginBottom: 13 + 'px' } },
      title
    ),
    React.createElement(Navs, { steps: steps, tabs: true, startAtStep: 0 })
  );
};

registerDocument('SystemCard', SystemCard);

registerRoute('systemCard', function (documentName) {
  changeDocument(documentName, {
    value: { data: { attributes: { title: "System card" }, links: { self: "systemCard" } } },
    frontendParams: { type: 'SystemCard' }
  });
});

var be5init$$1 = {
  hashChange: function hashChange() {
    bus.fire("mainModalClose");

    var state = documentState.get(MAIN_DOCUMENT);

    if (!state.value || !state.value.data || !state.value.data.links || "#!" + state.value.data.links.self !== be5.url.get()) {
      if (state.value && state.value.data && state.value.data.links && getDefaultRoute(be5.store.getState()) === state.value.data.links.self && (be5.url.get() === "" || be5.url.get() === "#!")) {
        return;
      }
      //console.log(state.value, be5.url.get());
      be5.url.process(MAIN_DOCUMENT, be5.url.get());
    }
  },
  init: function init(store, callback) {
    Preconditions.passed(store, 'store in required');

    be5.appInfo = { "title": document.title };
    be5.store = store;
    be5.api = api;
    window.be5 = be5;

    this.initGetUser(store, callback);

    be5.net.request('languageSelector', {}, function (data) {
      be5.locale.set(data.selected, data.messages);
      //be5.url.process(MAIN_DOCUMENT, be5.url.get());

      store.dispatch(fetchUserInfo());
    });

    window.addEventListener("hashchange", this.hashChange, false);
  },
  initGetUser: function initGetUser(store, callback) {
    this.initOnLoad(store, undefined, getDefaultRoute, function () {
      if (callback) callback();
      processHashUrlForDocument(be5.url.get(), MAIN_DOCUMENT);
    });
  },
  initOnLoad: function initOnLoad(store, initState, select, onChange) {
    function handleChange() {
      var nextState = select(store.getState());

      if (nextState !== initState) {
        onChange(nextState);
        unsubscribe();
      }
    }

    var unsubscribe = store.subscribe(handleChange);
  }
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

var index = combineReducers({
  user: users,
  menu: users$1
});

//import be5styles from './be5styles.js';
// core
// actions
// services
// store


var api = Object.freeze({
	be5init: be5init$$1,
	preconditions: Preconditions,
	arraysEqual: arraysEqual,
	createPageValue: createPageValue,
	registerPage: registerPage,
	getSelfUrl: getSelfUrl,
	getModelByID: getModelByID,
	createStaticValue: createStaticValue,
	getResourceByID: getResourceByID,
	processHashUrl: processHashUrl,
	processHashUrlForDocument: processHashUrlForDocument,
	openInModal: openInModal,
	bus: bus,
	changeDocument: changeDocument,
	getDocument: getDocument,
	registerDocument: registerDocument,
	getAllDocumentTypes: getAllDocumentTypes,
	registerRoute: registerRoute,
	getRoute: getRoute,
	getAllRoutes: getAllRoutes,
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
	getOperationParams: getOperationParams,
	openOperationByUrl: openOperationByUrl,
	openOperationByUrlWithValues: openOperationByUrlWithValues,
	fetchOperationByUrl: fetchOperationByUrl,
	loadTable: loadTable,
	updateTable: updateTable,
	fetchTableByUrl: fetchTableByUrl,
	executeFrontendActions: executeFrontendActions,
	getActionsMap: getActionsMap,
	getBackOrOpenDefaultRouteAction: getBackOrOpenDefaultRouteAction,
	FrontendAction: FrontendAction,
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
	UPDATE_DOCUMENT: UPDATE_DOCUMENT,
	UPDATE_PARENT_DOCUMENT: UPDATE_PARENT_DOCUMENT,
	REFRESH_DOCUMENT: REFRESH_DOCUMENT,
	REFRESH_PARENT_DOCUMENT: REFRESH_PARENT_DOCUMENT,
	SEARCH_PARAM: SEARCH_PARAM,
	SEARCH_PRESETS_PARAM: SEARCH_PRESETS_PARAM,
	MAIN_DOCUMENT: MAIN_DOCUMENT,
	MAIN_MODAL_DOCUMENT: MAIN_MODAL_DOCUMENT,
	DOCUMENT_REFRESH_SUFFIX: DOCUMENT_REFRESH_SUFFIX
});

// components
// forms
// tables
// menu

export { be5, Application, MainDocumentOnly, Be5Components, NavbarMenu as Be5Menu, HelpInfo, LanguageBox as LanguageSelector, SideBar, StaticPage, ErrorPane, FormWizard, Navs, RoleSelector, UserControl, Document$1 as Document, MenuContainer$1 as MenuContainer, NavbarMenuContainer$1 as NavbarMenuContainer, UserControlContainer, Form, HorizontalForm, SubmitOnChangeForm, ModalForm, InlineMiniForm as InlineForm, FinishedResult, Table, QuickColumns, OperationBox, CategoryNavigation, FormTable, TableForm, TableFormRow, Menu, MenuBody, MenuSearchField, MenuFooter, MenuNode, be5init$$1 as be5init, Preconditions as preconditions, arraysEqual, createPageValue, registerPage, getSelfUrl, getModelByID, createStaticValue, getResourceByID, processHashUrl, processHashUrlForDocument, openInModal, bus, changeDocument, getDocument, registerDocument, getAllDocumentTypes, registerRoute, getRoute, getAllRoutes, createBaseStore, index as rootReducer, users as userReduser, users$1 as menuReduser, toggleRoles, fetchUserInfo, updateUserInfo, fetchMenu, getCurrentRoles, getUser, getMenu, route$2 as formAction, route as loadingAction, route$4 as loginAction, route$6 as logoutAction, route$12 as queryBuilderAction, route$8 as staticAction, route$10 as tableAction, route$14 as textAction, actions as action, loadOperation, submitOperation, getOperationParams, openOperationByUrl, openOperationByUrlWithValues, fetchOperationByUrl, loadTable, updateTable, fetchTableByUrl, executeFrontendActions, getActionsMap, getBackOrOpenDefaultRouteAction, FrontendAction, API_URL_PREFIX, DEFAULT_VIEW, ROLE_ADMINISTRATOR, ROLE_SYSTEM_DEVELOPER, ROLE_GUEST, SET_URL, REDIRECT, OPEN_DEFAULT_ROUTE, OPEN_NEW_WINDOW, GO_BACK, CLOSE_MAIN_MODAL, UPDATE_DOCUMENT, UPDATE_PARENT_DOCUMENT, REFRESH_DOCUMENT, REFRESH_PARENT_DOCUMENT, SEARCH_PARAM, SEARCH_PRESETS_PARAM, MAIN_DOCUMENT, MAIN_MODAL_DOCUMENT, DOCUMENT_REFRESH_SUFFIX };
