import React from 'react';
import { Button, Card, CardBody, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';
import ReactDOM from 'react-dom';
import AceEditor from 'react-ace';
import classNames from 'classnames';
import Datetime from 'react-datetime';
import moment from 'moment';
import Select, { Creatable } from 'react-select';
import VirtualizedSelect from 'react-virtualized-select';
import NumericInput from 'react-numeric-input';
import CKEditor from 'react-ckeditor-component';

var settings = {};

var Const = Object.freeze({
  DEFAULT_VIEW: 'All records'
});

var utils = {
  getBaseUrl: function getBaseUrl() {
    var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host;
    if (getUrl.pathname.split('/')[1] !== "") baseUrl += "/" + getUrl.pathname.split('/')[1];
    return baseUrl;
  }
};

var messages = {
    en: {
        errorCannotConnect: 'Cannot connect to server',
        errorServerQueryException: 'Error during server query: $message',
        errorInvalidErrorResponse: 'Server returned unknown error',
        errorNoData: 'Error communicating with server: no data received',
        errorUnknownAction: 'Unknown action: $action',
        errorUrlParameterAbsent: 'Invalid URL: $parameter is absent',

        welcome: 'Hello!',
        loading: 'Page is loading...',
        settings: 'Settings',
        emptyTable: 'Nothing found',
        roles: 'Roles',
        back: 'Back',
        error: 'Error:',
        cancel: 'Cancel',
        reload: 'reload',
        All: 'All',
        successfullyCompleted: 'Successfully completed.',

        filter: 'Filter...',

        Submit: 'Submit',

        property: {
            locale: 'en',
            clearAllText: 'Clear all',
            clearValueText: 'Clear value',
            noResultsText: 'No results found',
            searchPromptText: 'Type to search',
            placeholder: 'Select ...',
            loadingPlaceholder: 'Loading...'
        },

        formComponentNotFound: 'Form component not found: ',
        tableComponentNotFound: 'Table component not found: ',
        helpInfo: "Help",
        details: "Details",

        NotFound: "Not Found"
    },

    ru: {
        errorCannotConnect: 'Не могу подключиться к серверу',
        errorServerQueryException: 'Ошибка сервера: $message',
        errorInvalidErrorResponse: 'Сервер вернул неизвестную ошибку',
        errorNoData: 'Ошибка связи с сервером: ответ не получен',
        errorUnknownAction: 'Неизвестная операция: $action',
        errorUrlParameterAbsent: 'Неверный URL: отсутствует $parameter',

        welcome: 'Добро пожаловать!',
        loading: 'Загрузка...',
        settings: 'Настройки',
        emptyTable: 'Нет данных',
        roles: 'Роли',
        back: 'Назад',
        error: 'Ошибка:',
        cancel: 'Отмена',
        reload: 'Перезагрузить',
        All: 'Все',
        successfullyCompleted: 'Успешно выполнено.',

        filter: 'Фильтр...',

        Submit: 'Выполнить',

        property: {
            locale: 'ru',
            clearAllText: 'Очистить всё',
            clearValueText: 'Очистить',
            noResultsText: 'Нет результатов',
            searchPromptText: 'Начните вводить для поиска',
            placeholder: 'Выберите...',
            loadingPlaceholder: 'Загрузка...'
        },

        formComponentNotFound: 'Компонент формы не найден: ',
        tableComponentNotFound: 'Компонент таблицы не найден: ',
        helpInfo: "Справка",
        details: "Подробнее",

        NotFound: "Не найдено"
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
      throw createMandatoryArgumentError(message || 'argument is missing');
    }
    return argument;
  },
  eq: function eq(arg1, arg2, message) {
    if (arg1 !== arg2) {
      throw createArgumentEqualityError(message || arg1 + ' should be equal to ' + arg2);
    }
  }
};

var changeDocument = (function (documentName, value) {
  Preconditions.passed(documentName);
  bus.fire(documentName, value);
});

var actionsCollection = {
  types: {},

  getAction: function getAction(actionName) {
    return this.types[actionName];
  },
  registerAction: function registerAction(actionName, fn) {
    //console.log("registerTable: " + actionName, fn)
    this.types[actionName] = fn;
  }
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

var be5 = {
  debug: true,

  def: {
    URL_PREFIX: '/api/',
    APPLICATION_PREFIX: '/'
  },

  messages: messages.en,
  mainDocumentName: 'MainDocument',
  mainModalDocumentName: 'MainModalDocument',
  documentRefreshSuffix: "_refresh",

  appInfo: {},

  // load: {
  //   css(url) {
  //     var link = document.createElement("link");
  //     link.type = "text/css";
  //     link.rel = "stylesheet";
  //     if(be5.isRemoteUrl(url)){
  //       link.href = url;
  //     }else{
  //       link.href = '/' + url;
  //     }
  //     document.getElementsByTagName("head")[0].appendChild(link);
  //   }
  // },

  locale: {
    set: function set$$1(loc, addMessages) {
      if (!loc) return;
      loc = loc.toLowerCase();
      if (be5.locale.value === loc) return;
      be5.locale.value = loc;
      be5.messages = {};
      var newMessages = messages[loc];
      var defMessages = messages.en;
      for (var key in defMessages) {
        var msg = newMessages[key];
        if (msg === undefined) msg = defMessages[key];
        be5.messages[key] = msg;
      }
      if (addMessages !== null) {
        for (var _key in addMessages) {
          be5.messages[_key] = addMessages[_key];
        }
      }

      var dataTablesLocal = 'en';
      switch (be5.locale.value) {
        case "ru":
          dataTablesLocal = 'Russian';break;
        case "ja":
          dataTablesLocal = 'Japanese';break;
      }
      if (dataTablesLocal !== 'en') {
        $.getJSON("//cdn.datatables.net/plug-ins/1.10.13/i18n/" + dataTablesLocal + ".json", function (data) {
          be5.messages['dataTables'] = data;
          bus.fire('LanguageChanged');
        });
      } else {
        bus.fire('LanguageChanged');
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
        for (var key in msgs) {
          be5.messages[key] = msgs[key];
        }
      }
    },
    get: function get$$1() {
      return be5.locale.value;
    }
  },

  ui: {
    //documentTypes: {},
    /*
     * Note that creator doesn't create a document,
     * it creates a description of a component as React's <ComponentName /> does.
     */
    //    registerDocumentType(type, creator) {
    //      be5.ui.documentTypes[type] = creator;
    //    },

    //    createDocument(type, props) {
    //      return be5.ui.documentTypes[type](props);
    //    },

    setTitle: function setTitle(docTitle) {
      var titleComponents = [docTitle, be5.appInfo.title];
      document.title = titleComponents.filter(function (c) {
        return typeof c === 'string';
      }).join(' - ');
    }
  },

  url: {
    set: function set$$1(url) {
      if (url.substring(0, 1) === '#') url = url.substring(1);
      if (url.substring(0, 1) !== '!') url = '!' + url;
      url = '#' + url;
      if (document.location.hash !== url) {
        document.location.hash = url;
      } else {
        be5.url.process(be5.mainDocumentName, url);
      }
    },
    empty: function empty() {
      var url = document.location.hash;
      return url === '' || url === '#' || url === '!' || url === '#!';
    },
    clear: function clear() {
      document.location.hash = '';
    },


    // escapeComponent(hashUriComponent) {
    //   return encodeURIComponent(hashUriComponent);
    // },

    create: function create(action) {
      var positional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var named = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return be5.url.form([action].concat(positional), named);
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
        bus.fire('CallDefaultAction');
      }
      if (url.substring(0, 1) === '#') url = url.substring(1);
      if (url.substring(0, 1) !== '!') return;
      url = url.substring(1);
      if (url === '') {
        return;
      }
      var urlParts = url.split('/');
      // if (!be5.hasAction(urlParts[0])) {
      //   be5.log.error(be5.messages.errorUnknownAction.replace(
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
      var action = actionsCollection.getAction(actionName);

      if (action !== undefined) {
        //console.log("process", documentName, url);
        //changeDocument(documentName, { loading: true });
        action.apply(be5, positional);
      } else {
        changeDocument(documentName, { value: be5.messages.errorUnknownAction.replace('$action', actionName) });
        console.error(be5.messages.errorUnknownAction.replace('$action', actionName));
      }
    }
  },

  net: {
    url: function url(path) {
      return be5.def.URL_PREFIX + path;
    },
    resourceUrl: function resourceUrl(resource) {
      return '/be5/' + resource;
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


    // transforms parameters!
    requestJson: function requestJson(path, params, success, failure) {
      return be5.net.requestUrl(be5.def.APPLICATION_PREFIX + path, 'json', be5.net.transform(params), success, failure);
    },
    requestHtml: function requestHtml(path, success, failure) {
      return be5.net.requestUrl(be5.def.APPLICATION_PREFIX + path, 'html', {}, success, failure);
    },
    transform: function transform(params) {
      var copy = {};
      for (var key in params) {
        if (_typeof(params[key]) === 'object') {
          copy[key] = be5.net.paramString(params[key]);
        } else {
          copy[key] = params[key];
        }
      }
      return copy;
    },
    requestUrl: function requestUrl(url, type, params, _success, failureFunc) {
      var result = null;
      var failure = function failure(data) {
        result = data;
        be5.log.error(data);
        if (typeof failureFunc === 'function') failureFunc(data);
      };

      $.ajax({
        url: utils.getBaseUrl() + url,
        dataType: type,
        type: 'POST',
        data: params,
        async: !!_success,
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: function success(data, status, xhr) {
          if (xhr.status == 0) {
            if (xhr.aborted) return null;
            if (data == undefined) {
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
          if (data == undefined) {
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
          if (errorThrown && errorThrown.result == 0x80004005)
            // Special case for FireFox
            // see http://helpful.knobs-dials.com/index.php/0x80004005_%28NS_ERROR_FAILURE%29_and_other_firefox_errors
            data.value.message = be5.messages.errorCannotConnect;else data.value.message = be5.messages.errorServerQueryException.replace("$message", errorThrown == undefined ? status + (xhr.status >= 500 ? " " + xhr.status + " " + xhr.statusText : "") : errorThrown.message == undefined ? errorThrown.toString() : errorThrown.message);
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
      console.error(data.value.code + "\n\n" + data.value.message);
      //changeDocument("errors-document", { component: StaticPage, value: StaticPage.createValue(data.value.code, data.value.message)})
    }
  },

  tableState: {
    selectedRows: []
  },

  isRemoteUrl: function isRemoteUrl(url) {
    var prefix = 'http';
    return url.substr(0, prefix.length) === prefix;
  }
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

var action = function action(documentName, page) {
  changeDocument(documentName, { component: Loading });
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

actionsCollection.registerAction("loading", action);

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

{
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1 = invariant;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction_1;

{
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var warning_1 = warning;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

{
  var invariant$1 = invariant_1;
  var warning$1 = warning_1;
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant$1(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        warning$1(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning$1(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

var checkPropTypes_1 = checkPropTypes;

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant_1(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning_1(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction_1.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      warning_1(false, 'Invalid argument supplied to oneOf, expected an instance of array.');
      return emptyFunction_1.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      warning_1(false, 'Invalid argument supplied to oneOfType, expected an instance of array.');
      return emptyFunction_1.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning_1(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction_1.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

{
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
}
});

var FinishedResult = function (_React$Component) {
  inherits(FinishedResult, _React$Component);

  function FinishedResult() {
    classCallCheck(this, FinishedResult);
    return possibleConstructorReturn(this, (FinishedResult.__proto__ || Object.getPrototypeOf(FinishedResult)).apply(this, arguments));
  }

  createClass(FinishedResult, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      forms.changeLocationHash(this.props);
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      console.info("FinishedResult not support refresh");
    }
  }, {
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
  value: propTypes.shape({
    data: propTypes.shape({
      attributes: propTypes.object.isRequired,
      meta: propTypes.shape({
        _ts_: propTypes.isRequired
      })
    })
  })
};

var StaticPage = function (_React$Component) {
  inherits(StaticPage, _React$Component);

  function StaticPage() {
    classCallCheck(this, StaticPage);
    return possibleConstructorReturn(this, (StaticPage.__proto__ || Object.getPrototypeOf(StaticPage)).apply(this, arguments));
  }

  createClass(StaticPage, [{
    key: 'render',
    value: function render() {
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
  }, {
    key: 'refresh',
    value: function refresh() {
      if (this.props.value.links.self !== undefined) {
        be5.url.process(this.props.frontendParams.documentName, "#!" + this.props.value.links.self);
      } else {
        console.info("staticPage without links.self");
      }
    }
  }], [{
    key: 'createValue',
    value: function createValue(title, text) {
      return StaticPage.createValue(title, text, { _ts_: new Date().getTime() }, {});
    }
  }, {
    key: 'createValue',
    value: function createValue(title, text, meta, links) {
      return {
        data: {
          type: 'staticPage',
          attributes: {
            title: title,
            content: text
          }
        },
        meta: meta,
        links: links
      };
    }
  }]);
  return StaticPage;
}(React.Component);

// StaticPage.defaultProps = {
//   value: ''
// };

StaticPage.propTypes = {
  value: propTypes.shape({
    data: propTypes.shape({
      attributes: propTypes.shape({
        title: propTypes.string.isRequired,
        content: propTypes.string.isRequired
      }),
      meta: propTypes.shape({
        _ts_: propTypes.isRequired
      })
    })
  })
};

var ErrorPane = function (_React$Component) {
  inherits(ErrorPane, _React$Component);

  function ErrorPane() {
    classCallCheck(this, ErrorPane);

    var _this = possibleConstructorReturn(this, (ErrorPane.__proto__ || Object.getPrototypeOf(ErrorPane)).call(this));

    _this.state = { helpCollapse: false };
    _this.helpCollapseToggle = _this.helpCollapseToggle.bind(_this);
    return _this;
  }

  createClass(ErrorPane, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      forms.changeLocationHash(this.props);
    }
  }, {
    key: 'helpCollapseToggle',
    value: function helpCollapseToggle() {
      this.setState({ helpCollapse: !this.state.helpCollapse });
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      if (this.props.value.links.self !== undefined) {
        be5.url.process(this.props.frontendParams.documentName, "#!" + this.props.value.links.self);
      } else {
        console.info("errorPane without links.self, most likely error on the execute operation");
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var error = this.props.value.errors ? this.props.value.errors[0] : this.props.value;
      return React.createElement(
        'div',
        { className: 'errorPane' },
        React.createElement(
          'h1',
          { className: 'errorPane__title' },
          error.status,
          ' - ',
          error.title
        ),
        React.createElement('br', null),
        error.code !== undefined ? React.createElement('pre', { className: 'errorPane__code', dangerouslySetInnerHTML: { __html: error.code } }) : null,
        error.detail !== undefined ? React.createElement(
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
                  error.detail
                )
              )
            )
          )
        ) : null
      );
    }

    // static createValue(title, text)
    // {
    //   const date = new Date().getTime();
    //   return {
    //     data: {
    //       type: 'staticPage',
    //       attributes: {
    //         title: title,
    //         content: text
    //       }
    //     },
    //     meta: {_ts_: date}
    //   }
    // }

  }]);
  return ErrorPane;
}(React.Component);

// StaticPage.defaultProps = {
//   value: ''
// };

ErrorPane.propTypes = {
  value: propTypes.shape({
    errors: propTypes.array.isRequired,
    meta: propTypes.shape({
      _ts_: propTypes.isRequired
    }),
    links: propTypes.object.isRequired
  })
};

var formsCollection = {
  types: {},

  getForm: function getForm(formName) {
    return this.types[formName];
  },
  registerForm: function registerForm(formName, component) {
    this.types[formName] = component;
  }
};

var tablesCollection = {
  types: {},

  getTable: function getTable(tableName) {
    return this.types[tableName];
  },
  registerTable: function registerTable(tableName, component) {
    this.types[tableName] = component;
  }
};

var Tables = {
  load: function load(params, documentName) {
    this._send(params, this._performData, documentName);
  },
  refresh: function refresh(params, documentName) {
    this._send(params, function (json, documentName) {
      if (json.data !== undefined) {
        changeDocument(documentName, { component: Table, value: json });
      } else {
        changeDocument(documentName, { component: ErrorPane, value: json });
      }
    }, documentName);
  },
  _send: function _send(params, performData, documentName) {
    Preconditions.passed(params.entity);
    Preconditions.passed(params.query);

    var requestParams = {
      entity: params.entity,
      query: params.query,
      values: be5.net.paramString(params.params),
      _ts_: new Date().getTime()
    };

    be5.net.request('document', requestParams, function (json) {
      performData(json, documentName);
    }, function (data) {
      changeDocument(documentName, { component: StaticPage, value: StaticPage.createValue(data.value.code, data.value.message) });
    });
  },
  _performData: function _performData(json, documentName) {
    if (json.data !== undefined) {
      var tableComponentName = json.data.attributes.layout.type || 'table';
      var tableComponent = tablesCollection.getTable(tableComponentName);

      if (tableComponent === undefined) {
        changeDocument(documentName, { component: StaticPage,
          value: StaticPage.createValue(be5.messages.tableComponentNotFound + tableComponentName, '', json.meta, json.links) });
      } else {
        changeDocument(documentName, { component: tableComponent, value: json });
      }
    } else {
      changeDocument(documentName, { component: ErrorPane, value: json });
    }
  }
};

var format_min = createCommonjsModule(function (module) {
/*! javascript-number-formatter - v1.1.11 - http://mottie.github.com/javascript-number-formatter/ * © ecava */
!function(a,b){"function"==typeof undefined&&undefined.amd?undefined([],b):module.exports=b();}(commonjsGlobal,function(){return function(a,b){if(!a||isNaN(+b))return b;var c,d,e,f,g,h,i,j,k,l,m=a.length,n=a.search(/[0-9\-\+#]/),o=n>0?a.substring(0,n):"",p=a.split("").reverse().join(""),q=p.search(/[0-9\-\+#]/),r=m-q,s=a.substring(r,r+1),t=r+("."===s||","===s?1:0),u=q>0?a.substring(t,m):"";if(a=a.substring(n,t), b="-"===a.charAt(0)?-b:+b, c=b<0?b=-b:0, d=a.match(/[^\d\-\+#]/g), e=d&&d[d.length-1]||".", f=d&&d[1]&&d[0]||",", a=a.split(e), b=b.toFixed(a[1]&&a[1].length), b=+b+"", h=a[1]&&a[1].lastIndexOf("0"), j=b.split("."), (!j[1]||j[1]&&j[1].length<=h)&&(b=(+b).toFixed(h+1)), k=a[0].split(f), a[0]=k.join(""), g=a[0]&&a[0].indexOf("0"), g>-1)for(;j[0].length<a[0].length-g;)j[0]="0"+j[0];else 0===+j[0]&&(j[0]="");if(b=b.split("."), b[0]=j[0], i=k[1]&&k[k.length-1].length){for(l=b[0], p="", r=l.length%i, m=l.length, t=0;t<m;t++)p+=l.charAt(t), !((t-r+1)%i)&&t<m-i&&(p+=f);b[0]=p;}return b[1]=a[1]&&b[1]?e+b[1]:"", d=b.join(""), "0"!==d&&""!==d||(c=!1), o+((c?"-":"")+d)+u}});
});

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
        var operation = this.props.operations.find(function (operation) {
          return operation.name === name;
        });
        if (!operation.requiresConfirmation || confirm(operation.title + "?")) {
          this.props.onOperationClick(name);
        }
      }
      e.preventDefault();
    }
  }, {
    key: 'refreshEnablement',
    value: function refreshEnablement() {
      var _this2 = this;

      this.props.operations.forEach(function (operation) {
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
      var operations = this.props.operations.map(function (operation) {
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
          { key: operation.name, ref: operation.name, onClick: _this3.onClick.bind(_this3, operation.name), className: 'btn btn-secondary btn-secondary-old btn-sm' },
          operation.title
        );
      });

      if (this.props.operations.length === 0) {
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
      return { quickColumns: props.firstRow.map(function (col, idx) {
          if (col.options.quick) return { columnId: idx, visible: col.options.quick.visible === 'true' };else return null;
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
      this.state.quickColumns[idx].visible = !this.state.quickColumns[idx].visible;
      this.forceUpdate();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state.quickColumns.length === 0) {
        return React.createElement('div', null);
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
        var title = column.replace(/<br\s*[\/]?>/gi, " ");
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
      data = format_min(options.format.mask, data);
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
};

var TableBox = function (_React$Component) {
  inherits(TableBox, _React$Component);

  function TableBox(props) {
    classCallCheck(this, TableBox);

    var _this2 = possibleConstructorReturn(this, (TableBox.__proto__ || Object.getPrototypeOf(TableBox)).call(this, props));

    _this2.onOperationClick = _this2.onOperationClick.bind(_this2);
    return _this2;
  }

  createClass(TableBox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.refs.table) this.applyTableStyle(ReactDOM.findDOMNode(this.refs.table));

      this._refreshEnablementIfNeeded();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return JSON.stringify(nextProps) !== JSON.stringify(this.props) || JSON.stringify(nextState) !== JSON.stringify(this.state);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.refs.table) this.applyTableStyle(ReactDOM.findDOMNode(this.refs.table));
    }
  }, {
    key: 'onOperationClick',
    value: function onOperationClick(name) {
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
      var editable = attributes.operations.filter(function (op) {
        return op.name === 'Edit';
      }).length === 1;
      var columnIndexShift = 0;

      if (hasCheckBoxes) {
        theadrow.append($("<th>").text("#"));
        tfootrow.append($("<th>").text("#"));
        columnIndexShift = 1;
      }

      attributes.columns.forEach(function (column, idx) {
        var title = (typeof column === 'undefined' ? 'undefined' : _typeof(column)) === 'object' ? column.title : column;
        theadrow.append($("<th>").html(formatCell(title, 'th', true)));
        tfootrow.append($("<th>").html(formatCell(title, 'th', true)));
      });
      attributes.rows.forEach(function (row, rowId, rows) {
        var tr = $('<tr>');
        row.cells.forEach(function (cell, idx) {
          tr.append($('<td>').html(formatCell(cell.content, cell.options)));
        });
        if (hasCheckBoxes) {
          tr.prepend($('<td>').text(row.id));
        }
        tbody.append(tr);
      });

      var tableDiv = $('<table class="display compact" cellspacing="0"/>').append(thead).append(tbody).append(attributes.rows.length > 10 ? tfoot : '').appendTo(node);

      var lengths = [5, 10, 20, 50, 100, 500, 1000];
      var pageLength = attributes.length;

      if (lengths.indexOf(pageLength) === -1) {
        lengths.push(pageLength);
        lengths.sort(function (a, b) {
          return a - b;
        });
      }

      var language = null;
      if (be5.locale.value !== 'en') {
        language = be5.messages.dataTables;
      }

      var tableConfiguration = {
        processing: true,
        serverSide: true,
        language: language,
        searching: false,
        autoWidth: false,
        aaSorting: [],
        ajax: {
          url: utils.getBaseUrl() + be5.net.url('document/moreRows'),
          data: {
            entity: attributes.category,
            query: attributes.page,
            values: be5.net.paramString(attributes.parameters),
            selectable: attributes.selectable,
            totalNumberOfRows: attributes.totalNumberOfRows
          },
          dataSrc: function dataSrc(d) {
            if (d.type === "error") {
              be5.log.error(d.value.code + "\n" + d.value.message);
            } else {
              for (var i = 0; i < d.data.length; i++) {
                for (var j = 0; j < d.data[0].length - columnIndexShift; j++) {
                  d.data[i][j + columnIndexShift] = formatCell(d.data[i][j + columnIndexShift].content, d.data[i][j + columnIndexShift].options);
                }
              }
            }
            return d.data;
          }
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
            if (!hasCheckBoxes) {
              return row[0]; // default behavior
            }
            var val = row[0];
            var id = "row-" + val + "-checkbox";
            var display = meta.row + 1;
            if (editable) {
              display = '<a href="#!' + be5.url.create('form', [attributes.category, attributes.page, 'Edit'], { selectedRows: val }) + '">' + display + '</a>';
            }
            // Pure HTML! Have no idea how to convert some react.js to string.
            return '\
                <input id="{id}" type="checkbox" class="rowCheckbox"></input>\
                <label for="{id}" class="rowIndex"><span class="checkBox" ></span>{val}</label>'.replace('{id}', id).replace('{id}', id).replace('{val}', display);
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
          $('input', row).change(function () {
            var rowId = data[0];
            var checked = this.checked;
            if (checked && $.inArray(rowId, be5.tableState.selectedRows) == -1) {
              be5.tableState.selectedRows.push(rowId);
            } else if (!checked && $.inArray(rowId, be5.tableState.selectedRows) != -1) {
              be5.tableState.selectedRows.splice($.inArray(rowId, be5.tableState.selectedRows), 1);
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
        var resultGroupingColumn = columnIndexShift + groupingColumn;
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

      tableDiv.on('draw.dt', function () {
        be5.tableState.selectedRows = [];
        _this._refreshEnablementIfNeeded();
      });

      this.refs.quickColumns.setTable(this.refs.table);

      this.onSelectionChange();
    }
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

      return React.createElement(
        'div',
        null,
        React.createElement(OperationBox, { ref: 'operations', operations: attributes.operations, onOperationClick: this.onOperationClick, hasRows: attributes.rows.length !== 0 }),
        React.createElement(QuickColumns, { ref: 'quickColumns', columns: attributes.columns, firstRow: attributes.rows[0].cells, table: this.refs.table, selectable: attributes.selectable }),
        React.createElement(
          'div',
          { className: 'scroll' },
          React.createElement('div', { ref: 'table' })
        )
      );
    }
  }, {
    key: '_refreshEnablementIfNeeded',
    value: function _refreshEnablementIfNeeded() {
      if (this.refs !== undefined && this.refs.operations !== undefined) {
        this.refs.operations.refreshEnablement();
      }
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

    var _this5 = possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this5.state = { runReload: "" };
    return _this5;
  }

  createClass(Table, [{
    key: 'render',
    value: function render() {
      var value = this.props.value;
      //const reloadClass = "table-reload float-xs-right " + this.state.runReload;
      var table = null;

      if (value.data.attributes.parameters && value.data.attributes.parameters.displayType === 'list') {
        table = React.createElement(ListTableBox, { ref: 'tableBox', value: value });
      } else {
        table = React.createElement(TableBox, {
          ref: 'tableBox',
          value: value,
          frontendParams: this.props.frontendParams
        });
      }

      var TitleTag = 'h' + (value.data.attributes.parameters && value.data.attributes.parameters.titleLevel || 1);

      return React.createElement(
        'div',
        { className: 'table-component' },
        React.createElement(
          TitleTag,
          { className: 'table-component__title' },
          value.data.attributes.title
        ),
        table
      );
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      var attr = this.props.value.data.attributes;
      var params = {
        entity: attr.category,
        query: attr.page,
        params: attr.parameters
      };

      Tables.refresh(params, this.props.frontendParams.documentName);
    }
  }]);
  return Table;
}(React.Component);

Table.propTypes = {
  value: propTypes.object.isRequired
};

tablesCollection.registerTable('table', Table);

var forms = {
  apply: function apply(params, frontendParams) {
    this._send('form/apply', params, frontendParams);
  },
  load: function load(params, frontendParams) {
    this._send('form', params, frontendParams);
  },
  _send: function _send(action, params, frontendParams) {
    var _this = this;

    Preconditions.passed(params.entity);
    Preconditions.passed(params.query);
    Preconditions.passed(params.operation);

    var selectedRows = params.selectedRows;
    if (!selectedRows) {
      selectedRows = params.operationParams === undefined || params.operationParams.selectedRows === undefined ? be5.tableState.selectedRows.join() : params.operationParams.selectedRows;
    }
    if (params.operationParams !== undefined && params.operationParams.selectedRows !== undefined) {
      delete params.operationParams.selectedRows;
    }

    var requestParams = {
      entity: params.entity,
      query: params.query,
      operation: params.operation,
      values: be5.net.paramString(params.values),
      operationParams: be5.net.paramString(params.operationParams),
      selectedRows: selectedRows || '',
      _ts_: new Date().getTime()
    };

    be5.net.request(action, requestParams, function (data) {
      _this._performOperationResult(data, frontendParams, params);
    }, function (data) {
      bus.fire("alert", { msg: be5.messages.errorServerQueryException.replace('$message', data.value.code), type: 'error' });
    });
  },
  _performOperationResult: function _performOperationResult(json, frontendParams, applyParams) {
    var documentName = frontendParams.documentName;

    Preconditions.passed(documentName);

    if (json.data !== undefined) {
      switch (json.data.type) {
        case 'form':
          this._performForm(json, frontendParams);
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

          if (attributes.status !== 'table' && frontendParams.parentDocumentName !== undefined && frontendParams.parentDocumentName !== frontendParams.documentName) {
            console.log("bus.fire() " + frontendParams.parentDocumentName + be5.documentRefreshSuffix);
            bus.fire(frontendParams.parentDocumentName + be5.documentRefreshSuffix);
          }

          switch (attributes.status) {
            case 'redirect':
              bus.fire("alert", { msg: be5.messages.successfullyCompleted, type: 'success' });
              if (attributes.details === 'refreshAll' || attributes.details === 'refreshAllAndGoBack') {
                if (attributes.details === 'refreshAll') {
                  be5.url.set("");
                } else {
                  window.history.back();
                }
                bus.fire('LoggedIn');
                if (documentName === be5.mainModalDocumentName) bus.fire("mainModalClose");
              } else if (attributes.details.startsWith("http://") || attributes.details.startsWith("https://") || attributes.details.startsWith("ftp://")) {
                window.location.href = attributes.details;
              } else {
                if (documentName === be5.mainDocumentName) {
                  be5.url.set(attributes.details);
                } else {
                  be5.url.process(documentName, '#!' + attributes.details);
                }
              }
              return;
            case 'finished':
              if (documentName === be5.mainModalDocumentName) {
                bus.fire("alert", { msg: json.data.attributes.message || be5.messages.successfullyCompleted, type: 'success' });
                bus.fire("mainModalClose");
              } else {
                changeDocument(documentName, { component: FinishedResult, value: json, frontendParams: frontendParams });
              }
              return;
            case 'table':
              var tableJson = {
                data: {
                  attributes: attributes.details
                },
                meta: json.meta
              };
              changeDocument(frontendParams.parentDocumentName, { component: Table, value: tableJson });
              if (documentName === be5.mainModalDocumentName) {
                bus.fire("mainModalClose");
              }
              return;
            default:
              bus.fire("alert", {
                msg: be5.messages.errorUnknownAction.replace('$action', 'status = ' + attributes.status),
                type: 'error'
              });
            //changeDocument(documentName, {  value: be5.messages.errorUnknownAction.replace('$action', 'status = ' + attributes.status) });
          }
          return;
        default:
          bus.fire("alert", {
            msg: be5.messages.errorUnknownAction.replace('$action', 'data.type = ' + json.data.attributes.type),
            type: 'error'
          });
        //changeDocument(documentName, { value: be5.messages.errorUnknownAction.replace('$action', 'data.type = ' + json.data.attributes.type) });
      }
    } else {
      var error = json.errors[0];
      bus.fire("alert", { msg: error.status + " " + error.title, type: 'error' });

      changeDocument(documentName, { component: ErrorPane, value: json, frontendParams: frontendParams });
    }
  },
  _performForm: function _performForm(json, frontendParams) {
    var operationResult = json.data.attributes.operationResult;

    if (operationResult.status === 'error') {
      bus.fire("alert", { msg: operationResult.message, type: 'error' });
    }

    var formComponentName = json.data.attributes.layout.type || 'form';
    var formComponent = formsCollection.getForm(formComponentName);

    if (formComponentName === 'modal' || frontendParams.documentName === be5.mainModalDocumentName) {
      bus.fire("mainModalOpen");

      changeDocument(be5.mainModalDocumentName, { component: formsCollection.getForm('modal'), value: json, frontendParams: frontendParams });
    } else {
      if (formComponent === undefined) {
        changeDocument(frontendParams.documentName, { component: StaticPage,
          value: StaticPage.createValue(be5.messages.formComponentNotFound + formComponentName, '') });
      } else {
        changeDocument(frontendParams.documentName, { component: formComponent, value: json, frontendParams: frontendParams });
      }
    }
  },
  changeLocationHash: function changeLocationHash(props) {
    if (props.frontendParams && props.frontendParams.documentName === be5.mainDocumentName && document.location.hash !== '#!' + props.value.links.self) {
      document.location.hash = '#!' + props.value.links.self;
    }
  },
  getOperationParams: function getOperationParams(url) {
    var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var attr = be5.url.parse(url);

    return {
      entity: attr.positional[1],
      query: attr.positional[2],
      operation: attr.positional[3],
      values: values,
      operationParams: attr.named
    };
  }
};

var action$2 = function action(documentName, entity, query, operation, operationParams) {

  var params = {
    entity: entity,
    query: query || 'All records',
    operation: operation,
    values: {},
    operationParams: operationParams
  };

  forms.load(params, { documentName: documentName });
};

actionsCollection.registerAction("form", action$2);

var action$4 = function action() {
  forms.load(forms.getOperationParams('form/users/All records/Login'), {
    documentName: be5.mainModalDocumentName
  });
};

actionsCollection.registerAction("login", action$4);



// const action = function(type = 'dialog', param1 = undefined, param2 = undefined) {
//   let redirectUrl = undefined;
//
//   if (type === 'dialog' && param1) {
//     redirectUrl = decodeURIComponent(param1);
//   }
//
//   const confirm = (username, password, onSuccess, loginError) => {
//     be5.net.request(
//       'login',
//       { username : username, password : password },
//       data => {
//         if (data.type === 'ok') {
//           onSuccess();
//         }
//         else {
//           loginError('Not okay');
//         }
//       },
//       data => {
//         loginError('Incorrect name or password')
//       }
//     );
//   };
//
//   const goBack = () => {
//     if (redirectUrl) {
//       be5.url.set(redirectUrl);
//     }else {
//       be5.url.clear();
//       window.history.back();
//     }
//   };
//
//   const redirectAndRefresh = () => {
//     if(redirectUrl){
//       be5.url.set(redirectUrl);
//     }else{
//       //bus.fire('CallDefaultAction');
//       window.history.back();
//     }
//
//     bus.fire('LoggedIn');
//   };
//
//   switch (type) {
//     case 'auto':
//       const username = param1 || '';
//       const password = param2 || '';
//       confirm(username, password);
//       return;
//     default:
//       const parameters = { onConfirm: confirm, onCancel: goBack, onSuccess: redirectAndRefresh };
//       const loginComponent = ReactDOM.render(React.createElement(Login, parameters), document.getElementById('login'));
//       loginComponent.show();
//       return;
//   }
// };

var action$6 = function action() {
  forms.load(forms.getOperationParams('form/users/All records/Logout'), {
    documentName: be5.mainDocumentName, onSuccess: function onSuccess(result, applyParams) {
      //not used document.cookie = 'be_auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

      bus.fire('LoggedOut');
      bus.fire('CallDefaultAction');
    }

  });
};

actionsCollection.registerAction("logout", action$6);

var action$8 = function action(documentName, page) {
  var requestParams = {
    _ts_: new Date().getTime()
  };

  be5.net.request('static/' + page, requestParams, function (data) {
    changeDocument(documentName, { component: StaticPage, value: data });
  });
};

actionsCollection.registerAction("static", action$8);

var action$10 = function action(documentName, entity, query, params) {

  var paramsObject = {
    entity: entity,
    query: query || 'All records',
    params: params
  };
  Tables.load(paramsObject, documentName);
};

actionsCollection.registerAction("table", action$10);

var img = new Image();img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAATdEVYdFRpdGxlAE9wdGljYWwgRHJpdmU+Z7oMAAAC+ElEQVQ4jZWS329TZRjHP+ft6dJ2djNxHcgyunb+KIyNwfRG0mZgNgfeAJNBUBO8NEswITPEGHIy1I1lcTEzhn/Aq5mIFwp2yGSMzAsCyMIAp7hWOXjD+LGW03bnPe/rxSyZ7spv8tw9z+f75Ps8htaasvr7+81Apfm6oY1dGrpAV4BhY5AV2vjME4ZjKHUSjBxKHTt69MNpszw8ODj4TCBUMdbasnnH5pYt1NREEEIgpbs2l8u1/TAxvjebyeT27z8YXrh3j7MT4wFgmwkwPPzx8z6/L713zxuxeKyRUqmI4+RRSiGEIBQKsa/7ALZ9J1xfv56qcBg0rwCYAArxxVsH346tqV3L4uJDrv58lfn52+TyeZ6qrGTjxk0kXkwQiUT4r8yhTwd2xmPxjnXPruP+/QXOpE9zx7YnQQwIrUOFUnHwwtRk4vbvv9HVuZNAIAiAUmoZYCh9+NUdHRSLRWZvXMe27XMlx+2yLEueGP7kXE/3gUQ81rjKWUq5DNAY64PBEK5b4uatWwiMjyzLkgCuK8OPHj3kwYOFVQDXdSlnUCeEgVIKx3mMlFx/0uR575765usvtdaJ5WtrtC7XPxlIzysUS8VqIUyqq5/mcc5uBs4DHD92/DKwYZX9yhCl532fyWQONcYbadrQRCabtXq+6pka2zfmrXiwwJIsngB2a60mPJf3hoaGcgCmWpKnr1y5fKghGqW5uYX5zHy7d809+8HM+wM+7d2U2teKxkol21/e1NTEj5MT78zOzl4CTgKYQvhPzc39cn7q4lR7Kpliz+5utrRu3X5x+sL2u3f/4oVolOS2JNFoA/l8HtP0I6UXKG9naK3p6+urEaa+1NnxWkPb1jaCwRB+vx8hfCilcN0lCgWH9Hia6Z+mb5ii4qWRkZHCEwDAkSO9zyl8n9dGartSqSSRSC1V4Socx2Hu1zmuzczwx5/Zb02j4s3R0dHFf22wUr2HezsNLXuVMuo1ug7Ia80Zhf6ubk1d2rIstbJ/FeD/6m8m/lj+PIxQ9QAAAABJRU5ErkJggg==';

var Document = function (_React$Component) {
  inherits(Document, _React$Component);

  function Document(props) {
    classCallCheck(this, Document);

    var _this = possibleConstructorReturn(this, (Document.__proto__ || Object.getPrototypeOf(Document)).call(this, props));

    _this.state = { value: "" };

    _this.reload = _this.reload.bind(_this);
    _this.refresh = _this.refresh.bind(_this);
    return _this;
  }

  createClass(Document, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      bus.replaceListeners(this.props.frontendParams.documentName, function (data) {
        if (_this2.state.value.meta !== undefined && !Number.isInteger(Number.parseInt(_this2.state.value.meta._ts_))) {
          console.error("meta._ts_ mast be string of Integer " + _this2.state.value.meta._ts_);
        }
        if (_this2.state.value.meta === undefined || data.value.meta === undefined || data.value.meta._ts_ > _this2.state.value.meta._ts_) {
          if (!data.component) {
            data.component = undefined;
          }
          _this2.setState({ value: data.value, component: data.component });
          if (data.frontendParams && data.frontendParams.parentDocumentName) {
            _this2.setState({ frontendParams: { parentDocumentName: data.frontendParams.parentDocumentName } });
          }
        }
        // if(!data.loading)this.setState({ loading: false });
        // if(!data.error)this.setState({ error: null });
      });

      bus.replaceListeners(this.props.frontendParams.documentName + be5.documentRefreshSuffix, function () {
        _this2.refresh();
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      bus.replaceListeners(this.props.frontendParams.documentName, function (data) {});
      bus.replaceListeners(this.props.frontendParams.documentName + be5.documentRefreshSuffix, function (data) {});
    }
  }, {
    key: 'reload',
    value: function reload() {
      if (this.state.value.links.self !== undefined) {
        be5.url.process(this.props.frontendParams.documentName, "#!" + this.state.value.links.self);
      }
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      //console.log("refresh() ", JSON.stringify(this.props.frontendParams), JSON.stringify(this.state.frontendParams));
      this.refs.documentContent.refresh();
    }
  }, {
    key: 'render',
    value: function render() {
      documentState.set(this.props.frontendParams.documentName, this.state);

      var loadingItem = null; //this.state.loading
      //? (<div className={"document-loader " + (this.state.error ? "error" : "")}/>): null;

      var devRole = false; //todo
      var devTools = React.createElement(
        'span',
        { onClick: this.refresh, className: "document-reload float-right" },
        React.createElement('img', { src: img, alt: be5.messages.reload,
          title: be5.messages.reload + " " + this.props.frontendParams.documentName })
      );

      var contentItem = null;
      if (this.state.value) be5.ui.setTitle(this.state.value.title);

      if (this.state.component) {
        if (this.state.component === 'text') {
          contentItem = React.createElement(
            'h1',
            null,
            this.state.value
          );
        } else if (this.state.component !== null) {
          var DocumentContent = this.state.component;
          contentItem = React.createElement(
            'div',
            null,
            devRole ? devTools : null,
            React.createElement(DocumentContent, {
              ref: 'documentContent',
              value: this.state.value,
              frontendParams: Object.assign({}, this.props.frontendParams, this.state.frontendParams)
            })
          );
        }
      } else {
        if (this.state.value) {
          contentItem = React.createElement(
            'h1',
            null,
            this.state.value
          );
        }
      }

      return React.createElement(
        'div',
        { className: 'document-content', id: 'document-content___' + this.props.frontendParams.documentName },
        loadingItem,
        contentItem
      );
    }
  }]);
  return Document;
}(React.Component);

Document.propTypes = {
  frontendParams: propTypes.shape({
    documentName: propTypes.string.isRequired,
    operationDocumentName: propTypes.string,
    parentDocumentName: propTypes.string
  })
};

var bowser = createCommonjsModule(function (module) {
/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (root, name, definition) {
  if ('object' != 'undefined' && module.exports) module.exports = definition();
  else if (typeof undefined == 'function' && undefined.amd) undefined(name, definition);
  else root[name] = definition();
}(commonjsGlobal, 'bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true;

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)os/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , samsungBrowser = /SamsungBrowser/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getSecondMatch(/edg([ea]|ios)\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua) && !/tablet pc/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result;

    if (/opera/i.test(ua)) {
      //  an old Opera
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      };
    } else if (/opr\/|opios/i.test(ua)) {
      // a new Opera
      result = {
        name: 'Opera'
        , opera: t
        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/SamsungBrowser/i.test(ua)) {
      result = {
        name: 'Samsung Internet for Android'
        , samsungBrowser: t
        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      };
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      };
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      };
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      };
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      };
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      };
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      };
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      };
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      };
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , osname: 'Windows Phone'
      , windowsphone: t
      };
      if (edgeVersion) {
        result.msedge = t;
        result.version = edgeVersion;
      }
      else {
        result.msie = t;
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i);
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      };
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , osname: 'Chrome OS'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      };
    } else if (/edg([ea]|ios)/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      };
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , osname: 'Sailfish OS'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      };
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t;
        result.osname = 'Firefox OS';
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , osname: 'BlackBerry OS'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      };
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , osname: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t);
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , osname: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , osname: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      };
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      };
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      };
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      };
      if (versionIdentifier) {
        result.version = versionIdentifier;
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      };
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier;
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      };
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink";
        result.blink = t;
      } else {
        result.name = result.name || "Webkit";
        result.webkit = t;
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier;
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko";
      result.gecko = t;
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i);
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.windowsphone && (android || result.silk)) {
      result.android = t;
      result.osname = 'Android';
    } else if (!result.windowsphone && iosdevice) {
      result[iosdevice] = t;
      result.ios = t;
      result.osname = 'iOS';
    } else if (mac) {
      result.mac = t;
      result.osname = 'macOS';
    } else if (xbox) {
      result.xbox = t;
      result.osname = 'Xbox';
    } else if (windows) {
      result.windows = t;
      result.osname = 'Windows';
    } else if (linux) {
      result.linux = t;
      result.osname = 'Linux';
    }

    function getWindowsVersion (s) {
      switch (s) {
        case 'NT': return 'NT'
        case 'XP': return 'XP'
        case 'NT 5.0': return '2000'
        case 'NT 5.1': return 'XP'
        case 'NT 5.2': return '2003'
        case 'NT 6.0': return 'Vista'
        case 'NT 6.1': return '7'
        case 'NT 6.2': return '8'
        case 'NT 6.3': return '8.1'
        case 'NT 10.0': return '10'
        default: return undefined
      }
    }

    // OS version extraction
    var osVersion = '';
    if (result.windows) {
      osVersion = getWindowsVersion(getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i));
    } else if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (result.mac) {
      osVersion = getFirstMatch(/Mac OS X (\d+([_\.\s]\d+)*)/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = !result.windows && osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t;
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t;
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.samsungBrowser && result.version >= 4) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t;
    } else result.x = t;

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '');

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  };

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          if (typeof minVersions[browser] !== 'string') {
            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
          }

          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  /*
   * Set our detect public method to the main bowser object
   * This is needed to implement bowser in server side
   */
  bowser.detect = detect;
  return bowser
});
});

var getBrowserInformation_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBrowserInformation;



var _bowser2 = _interopRequireDefault(bowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixByBrowser = {
  chrome: 'Webkit',
  safari: 'Webkit',
  ios: 'Webkit',
  android: 'Webkit',
  phantom: 'Webkit',
  opera: 'Webkit',
  webos: 'Webkit',
  blackberry: 'Webkit',
  bada: 'Webkit',
  tizen: 'Webkit',
  chromium: 'Webkit',
  vivaldi: 'Webkit',
  firefox: 'Moz',
  seamoney: 'Moz',
  sailfish: 'Moz',
  msie: 'ms',
  msedge: 'ms'
};


var browserByCanIuseAlias = {
  chrome: 'chrome',
  chromium: 'chrome',
  safari: 'safari',
  firfox: 'firefox',
  msedge: 'edge',
  opera: 'opera',
  vivaldi: 'opera',
  msie: 'ie'
};

function getBrowserName(browserInfo) {
  if (browserInfo.firefox) {
    return 'firefox';
  }

  if (browserInfo.mobile || browserInfo.tablet) {
    if (browserInfo.ios) {
      return 'ios_saf';
    } else if (browserInfo.android) {
      return 'android';
    } else if (browserInfo.opera) {
      return 'op_mini';
    }
  }

  for (var browser in browserByCanIuseAlias) {
    if (browserInfo.hasOwnProperty(browser)) {
      return browserByCanIuseAlias[browser];
    }
  }
}

/**
 * Uses bowser to get default browser browserInformation such as version and name
 * Evaluates bowser browserInfo and adds vendorPrefix browserInformation
 * @param {string} userAgent - userAgent that gets evaluated
 */
function getBrowserInformation(userAgent) {
  var browserInfo = _bowser2.default._detect(userAgent);

  if (browserInfo.yandexbrowser) {
    browserInfo = _bowser2.default._detect(userAgent.replace(/YaBrowser\/[0-9.]*/, ''));
  }

  for (var browser in prefixByBrowser) {
    if (browserInfo.hasOwnProperty(browser)) {
      var prefix = prefixByBrowser[browser];

      browserInfo.jsPrefix = prefix;
      browserInfo.cssPrefix = '-' + prefix.toLowerCase() + '-';
      break;
    }
  }

  browserInfo.browserName = getBrowserName(browserInfo);

  // For cordova IOS 8 the version is missing, set truncated osversion to prevent NaN
  if (browserInfo.version) {
    browserInfo.browserVersion = parseFloat(browserInfo.version);
  } else {
    browserInfo.browserVersion = parseInt(parseFloat(browserInfo.osversion), 10);
  }

  browserInfo.osVersion = parseFloat(browserInfo.osversion);

  // iOS forces all browsers to use Safari under the hood
  // as the Safari version seems to match the iOS version
  // we just explicitely use the osversion instead
  // https://github.com/rofrischmann/inline-style-prefixer/issues/72
  if (browserInfo.browserName === 'ios_saf' && browserInfo.browserVersion > browserInfo.osVersion) {
    browserInfo.browserVersion = browserInfo.osVersion;
  }

  // seperate native android chrome
  // https://github.com/rofrischmann/inline-style-prefixer/issues/45
  if (browserInfo.browserName === 'android' && browserInfo.chrome && browserInfo.browserVersion > 37) {
    browserInfo.browserName = 'and_chr';
  }

  // For android < 4.4 we want to check the osversion
  // not the chrome version, see issue #26
  // https://github.com/rofrischmann/inline-style-prefixer/issues/26
  if (browserInfo.browserName === 'android' && browserInfo.osVersion < 5) {
    browserInfo.browserVersion = browserInfo.osVersion;
  }

  // Samsung browser are basically build on Chrome > 44
  // https://github.com/rofrischmann/inline-style-prefixer/issues/102
  if (browserInfo.browserName === 'android' && browserInfo.samsungBrowser) {
    browserInfo.browserName = 'and_chr';
    browserInfo.browserVersion = 44;
  }

  return browserInfo;
}
module.exports = exports['default'];
});

unwrapExports(getBrowserInformation_1);

var getPrefixedKeyframes_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPrefixedKeyframes;
function getPrefixedKeyframes(browserName, browserVersion, cssPrefix) {
  var prefixedKeyframes = 'keyframes';

  if (browserName === 'chrome' && browserVersion < 43 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 9 || browserName === 'opera' && browserVersion < 30 || browserName === 'android' && browserVersion <= 4.4 || browserName === 'and_uc') {
    return cssPrefix + prefixedKeyframes;
  }
  return prefixedKeyframes;
}
module.exports = exports['default'];
});

unwrapExports(getPrefixedKeyframes_1);

var capitalizeString_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capitalizeString;
function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
module.exports = exports["default"];
});

unwrapExports(capitalizeString_1);

var addNewValuesOnly_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addNewValuesOnly;
function addIfNew(list, value) {
  if (list.indexOf(value) === -1) {
    list.push(value);
  }
}

function addNewValuesOnly(list, values) {
  if (Array.isArray(values)) {
    for (var i = 0, len = values.length; i < len; ++i) {
      addIfNew(list, values[i]);
    }
  } else {
    addIfNew(list, values);
  }
}
module.exports = exports["default"];
});

unwrapExports(addNewValuesOnly_1);

var isObject_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;
function isObject(value) {
  return value instanceof Object && !Array.isArray(value);
}
module.exports = exports["default"];
});

unwrapExports(isObject_1);

var prefixValue_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixValue;
function prefixValue(plugins, property, value, style, metaData) {
  for (var i = 0, len = plugins.length; i < len; ++i) {
    var processedValue = plugins[i](property, value, style, metaData);

    // we can stop processing if a value is returned
    // as all plugin criteria are unique
    if (processedValue) {
      return processedValue;
    }
  }
}
module.exports = exports["default"];
});

unwrapExports(prefixValue_1);

var createPrefixer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createPrefixer;



var _getBrowserInformation2 = _interopRequireDefault(getBrowserInformation_1);



var _getPrefixedKeyframes2 = _interopRequireDefault(getPrefixedKeyframes_1);



var _capitalizeString2 = _interopRequireDefault(capitalizeString_1);



var _addNewValuesOnly2 = _interopRequireDefault(addNewValuesOnly_1);



var _isObject2 = _interopRequireDefault(isObject_1);



var _prefixValue2 = _interopRequireDefault(prefixValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createPrefixer(_ref) {
  var prefixMap = _ref.prefixMap,
      plugins = _ref.plugins;
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (style) {
    return style;
  };

  return function () {
    /**
    * Instantiante a new prefixer
    * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
    * @param {string} keepUnprefixed - keeps unprefixed properties and values
    */
    function Prefixer() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Prefixer);

      var defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;

      this._userAgent = options.userAgent || defaultUserAgent;
      this._keepUnprefixed = options.keepUnprefixed || false;

      if (this._userAgent) {
        this._browserInfo = (0, _getBrowserInformation2.default)(this._userAgent);
      }

      // Checks if the userAgent was resolved correctly
      if (this._browserInfo && this._browserInfo.cssPrefix) {
        this.prefixedKeyframes = (0, _getPrefixedKeyframes2.default)(this._browserInfo.browserName, this._browserInfo.browserVersion, this._browserInfo.cssPrefix);
      } else {
        this._useFallback = true;
        return false;
      }

      var prefixData = this._browserInfo.browserName && prefixMap[this._browserInfo.browserName];
      if (prefixData) {
        this._requiresPrefix = {};

        for (var property in prefixData) {
          if (prefixData[property] >= this._browserInfo.browserVersion) {
            this._requiresPrefix[property] = true;
          }
        }

        this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0;
      } else {
        this._useFallback = true;
      }

      this._metaData = {
        browserVersion: this._browserInfo.browserVersion,
        browserName: this._browserInfo.browserName,
        cssPrefix: this._browserInfo.cssPrefix,
        jsPrefix: this._browserInfo.jsPrefix,
        keepUnprefixed: this._keepUnprefixed,
        requiresPrefix: this._requiresPrefix
      };
    }

    _createClass(Prefixer, [{
      key: 'prefix',
      value: function prefix(style) {
        // use static prefixer as fallback if userAgent can not be resolved
        if (this._useFallback) {
          return fallback(style);
        }

        // only add prefixes if needed
        if (!this._hasPropsRequiringPrefix) {
          return style;
        }

        return this._prefixStyle(style);
      }
    }, {
      key: '_prefixStyle',
      value: function _prefixStyle(style) {
        for (var property in style) {
          var value = style[property];

          // handle nested objects
          if ((0, _isObject2.default)(value)) {
            style[property] = this.prefix(value);
            // handle array values
          } else if (Array.isArray(value)) {
            var combinedValue = [];

            for (var i = 0, len = value.length; i < len; ++i) {
              var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, this._metaData);
              (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
            }

            // only modify the value if it was touched
            // by any plugin to prevent unnecessary mutations
            if (combinedValue.length > 0) {
              style[property] = combinedValue;
            }
          } else {
            var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, this._metaData);

            // only modify the value if it was touched
            // by any plugin to prevent unnecessary mutations
            if (_processedValue) {
              style[property] = _processedValue;
            }

            // add prefixes to properties
            if (this._requiresPrefix.hasOwnProperty(property)) {
              style[this._browserInfo.jsPrefix + (0, _capitalizeString2.default)(property)] = value;
              if (!this._keepUnprefixed) {
                delete style[property];
              }
            }
          }
        }

        return style;
      }

      /**
      * Returns a prefixed version of the style object using all vendor prefixes
      * @param {Object} styles - Style object that gets prefixed properties added
      * @returns {Object} - Style object with prefixed properties and values
      */

    }], [{
      key: 'prefixAll',
      value: function prefixAll(styles) {
        return fallback(styles);
      }
    }]);

    return Prefixer;
  }();
}
module.exports = exports['default'];
});

unwrapExports(createPrefixer_1);

var getPrefixedValue_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPrefixedValue;
function getPrefixedValue(prefixedValue, value, keepUnprefixed) {
  if (keepUnprefixed) {
    return [prefixedValue, value];
  }
  return prefixedValue;
}
module.exports = exports["default"];
});

unwrapExports(getPrefixedValue_1);

var cursor_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursor;



var _getPrefixedValue2 = _interopRequireDefault(getPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var grabValues = {
  grab: true,
  grabbing: true
};


var zoomValues = {
  'zoom-in': true,
  'zoom-out': true
};

function cursor(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  // adds prefixes for firefox, chrome, safari, and opera regardless of
  // version until a reliable browser support info can be found
  // see: https://github.com/rofrischmann/inline-style-prefixer/issues/79
  if (property === 'cursor' && grabValues[value] && (browserName === 'firefox' || browserName === 'chrome' || browserName === 'safari' || browserName === 'opera')) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }

  if (property === 'cursor' && zoomValues[value] && (browserName === 'firefox' && browserVersion < 24 || browserName === 'chrome' && browserVersion < 37 || browserName === 'safari' && browserVersion < 9 || browserName === 'opera' && browserVersion < 24)) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
});

unwrapExports(cursor_1);

var crossFade_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = crossFade;



var _getPrefixedValue2 = _interopRequireDefault(getPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function crossFade(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('cross-fade(') > -1 && (browserName === 'chrome' || browserName === 'opera' || browserName === 'and_chr' || (browserName === 'ios_saf' || browserName === 'safari') && browserVersion < 10)) {
    return (0, _getPrefixedValue2.default)(value.replace(/cross-fade\(/g, cssPrefix + 'cross-fade('), value, keepUnprefixed);
  }
}
module.exports = exports['default'];
});

unwrapExports(crossFade_1);

var filter_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;



var _getPrefixedValue2 = _interopRequireDefault(getPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filter(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('filter(') > -1 && (browserName === 'ios_saf' || browserName === 'safari' && browserVersion < 9.1)) {
    return (0, _getPrefixedValue2.default)(value.replace(/filter\(/g, cssPrefix + 'filter('), value, keepUnprefixed);
  }
}
module.exports = exports['default'];
});

unwrapExports(filter_1);

var flex_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;



var _getPrefixedValue2 = _interopRequireDefault(getPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = {
  flex: true,
  'inline-flex': true
};
function flex(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (property === 'display' && values[value] && (browserName === 'chrome' && browserVersion < 29 && browserVersion > 20 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 9 && browserVersion > 6 || browserName === 'opera' && (browserVersion === 15 || browserVersion === 16))) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
});

unwrapExports(flex_1);

var flexboxOld_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;



var _getPrefixedValue2 = _interopRequireDefault(getPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple',
  flex: 'box',
  'inline-flex': 'inline-box'
};


var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

var otherProps = ['alignContent', 'alignSelf', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection'];
var properties = Object.keys(alternativeProps).concat(otherProps);

function flexboxOld(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed,
      requiresPrefix = _ref.requiresPrefix;

  if ((properties.indexOf(property) > -1 || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browserName === 'firefox' && browserVersion < 22 || browserName === 'chrome' && browserVersion < 21 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion <= 6.1 || browserName === 'android' && browserVersion < 4.4 || browserName === 'and_uc')) {
    delete requiresPrefix[property];

    if (!keepUnprefixed && !Array.isArray(style[property])) {
      delete style[property];
    }
    if (property === 'flexDirection' && typeof value === 'string') {
      if (value.indexOf('column') > -1) {
        style.WebkitBoxOrient = 'vertical';
      } else {
        style.WebkitBoxOrient = 'horizontal';
      }
      if (value.indexOf('reverse') > -1) {
        style.WebkitBoxDirection = 'reverse';
      } else {
        style.WebkitBoxDirection = 'normal';
      }
    }
    if (property === 'display' && alternativeValues.hasOwnProperty(value)) {
      return (0, _getPrefixedValue2.default)(cssPrefix + alternativeValues[value], value, keepUnprefixed);
    }
    if (alternativeProps.hasOwnProperty(property)) {
      style[alternativeProps[property]] = alternativeValues[value] || value;
    }
  }
}
module.exports = exports['default'];
});

unwrapExports(flexboxOld_1);

var gradient_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;



var _getPrefixedValue2 = _interopRequireDefault(getPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;
function gradient(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && values.test(value) && (browserName === 'firefox' && browserVersion < 16 || browserName === 'chrome' && browserVersion < 26 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 7 || (browserName === 'opera' || browserName === 'op_mini') && browserVersion < 12.1 || browserName === 'android' && browserVersion < 4.4 || browserName === 'and_uc')) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
});

unwrapExports(gradient_1);

var imageSet_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = imageSet;



var _getPrefixedValue2 = _interopRequireDefault(getPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function imageSet(property, value, style, _ref) {
  var browserName = _ref.browserName,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('image-set(') > -1 && (browserName === 'chrome' || browserName === 'opera' || browserName === 'and_chr' || browserName === 'and_uc' || browserName === 'ios_saf' || browserName === 'safari')) {
    return (0, _getPrefixedValue2.default)(value.replace(/image-set\(/g, cssPrefix + 'image-set('), value, keepUnprefixed);
  }
}
module.exports = exports['default'];
});

unwrapExports(imageSet_1);

var position_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;



var _getPrefixedValue2 = _interopRequireDefault(getPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function position(property, value, style, _ref) {
  var browserName = _ref.browserName,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (property === 'position' && value === 'sticky' && (browserName === 'safari' || browserName === 'ios_saf')) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
});

unwrapExports(position_1);

var sizing_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;



var _getPrefixedValue2 = _interopRequireDefault(getPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};

var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true

  // TODO: chrome & opera support it
};function sizing(property, value, style, _ref) {
  var cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  // This might change in the future
  // Keep an eye on it
  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
});

unwrapExports(sizing_1);

var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};

function hyphenateStyleName(string) {
    return string in cache
    ? cache[string]
    : cache[string] = string
      .replace(uppercasePattern, '-$&')
      .toLowerCase()
      .replace(msPattern, '-ms-');
}

var hyphenateStyleName_1 = hyphenateStyleName;

var hyphenateProperty_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenateProperty;



var _hyphenateStyleName2 = _interopRequireDefault(hyphenateStyleName_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hyphenateProperty(property) {
  return (0, _hyphenateStyleName2.default)(property);
}
module.exports = exports['default'];
});

unwrapExports(hyphenateProperty_1);

var transition_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transition;



var _hyphenateProperty2 = _interopRequireDefault(hyphenateProperty_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true
};


var requiresPrefixDashCased = void 0;

function transition(property, value, style, _ref) {
  var cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed,
      requiresPrefix = _ref.requiresPrefix;

  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
    // memoize the prefix array for later use
    if (!requiresPrefixDashCased) {
      requiresPrefixDashCased = Object.keys(requiresPrefix).map(function (prop) {
        return (0, _hyphenateProperty2.default)(prop);
      });
    }

    // only split multi values, not cubic beziers
    var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

    requiresPrefixDashCased.forEach(function (prop) {
      multipleValues.forEach(function (val, index) {
        if (val.indexOf(prop) > -1 && prop !== 'order') {
          multipleValues[index] = val.replace(prop, cssPrefix + prop) + (keepUnprefixed ? ',' + val : '');
        }
      });
    });

    return multipleValues.join(',');
  }
}
module.exports = exports['default'];
});

unwrapExports(transition_1);

var prefixProperty_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixProperty;



var _capitalizeString2 = _interopRequireDefault(capitalizeString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prefixProperty(prefixProperties, property, style) {
  if (prefixProperties.hasOwnProperty(property)) {
    var requiredPrefixes = prefixProperties[property];
    for (var i = 0, len = requiredPrefixes.length; i < len; ++i) {
      style[requiredPrefixes[i] + (0, _capitalizeString2.default)(property)] = style[property];
    }
  }
}
module.exports = exports['default'];
});

unwrapExports(prefixProperty_1);

var createPrefixer_1$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPrefixer;



var _prefixProperty2 = _interopRequireDefault(prefixProperty_1);



var _prefixValue2 = _interopRequireDefault(prefixValue_1);



var _addNewValuesOnly2 = _interopRequireDefault(addNewValuesOnly_1);



var _isObject2 = _interopRequireDefault(isObject_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPrefixer(_ref) {
  var prefixMap = _ref.prefixMap,
      plugins = _ref.plugins;

  function prefixAll(style) {
    for (var property in style) {
      var value = style[property];

      // handle nested objects
      if ((0, _isObject2.default)(value)) {
        style[property] = prefixAll(value);
        // handle array values
      } else if (Array.isArray(value)) {
        var combinedValue = [];

        for (var i = 0, len = value.length; i < len; ++i) {
          var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, prefixMap);
          (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
        }

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (combinedValue.length > 0) {
          style[property] = combinedValue;
        }
      } else {
        var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, prefixMap);

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (_processedValue) {
          style[property] = _processedValue;
        }

        (0, _prefixProperty2.default)(prefixMap, property, style);
      }
    }

    return style;
  }

  return prefixAll;
}
module.exports = exports['default'];
});

unwrapExports(createPrefixer_1$1);

var staticData = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var w = ["Webkit"];
var m = ["Moz"];
var ms = ["ms"];
var wm = ["Webkit", "Moz"];
var wms = ["Webkit", "ms"];
var wmms = ["Webkit", "Moz", "ms"];

exports.default = {
  plugins: [],
  prefixMap: { "appearance": wm, "userSelect": wmms, "textEmphasisPosition": w, "textEmphasis": w, "textEmphasisStyle": w, "textEmphasisColor": w, "boxDecorationBreak": w, "clipPath": w, "maskImage": w, "maskMode": w, "maskRepeat": w, "maskPosition": w, "maskClip": w, "maskOrigin": w, "maskSize": w, "maskComposite": w, "mask": w, "maskBorderSource": w, "maskBorderMode": w, "maskBorderSlice": w, "maskBorderWidth": w, "maskBorderOutset": w, "maskBorderRepeat": w, "maskBorder": w, "maskType": w, "textDecorationStyle": w, "textDecorationSkip": w, "textDecorationLine": w, "textDecorationColor": w, "filter": w, "fontFeatureSettings": w, "breakAfter": wmms, "breakBefore": wmms, "breakInside": wmms, "columnCount": wm, "columnFill": wm, "columnGap": wm, "columnRule": wm, "columnRuleColor": wm, "columnRuleStyle": wm, "columnRuleWidth": wm, "columns": wm, "columnSpan": wm, "columnWidth": wm, "writingMode": wms, "flex": w, "flexBasis": w, "flexDirection": w, "flexGrow": w, "flexFlow": w, "flexShrink": w, "flexWrap": w, "alignContent": w, "alignItems": w, "alignSelf": w, "justifyContent": w, "order": w, "transform": w, "transformOrigin": w, "transformOriginX": w, "transformOriginY": w, "backfaceVisibility": w, "perspective": w, "perspectiveOrigin": w, "transformStyle": w, "transformOriginZ": w, "animation": w, "animationDelay": w, "animationDirection": w, "animationFillMode": w, "animationDuration": w, "animationIterationCount": w, "animationName": w, "animationPlayState": w, "animationTimingFunction": w, "backdropFilter": w, "fontKerning": w, "scrollSnapType": wms, "scrollSnapPointsX": wms, "scrollSnapPointsY": wms, "scrollSnapDestination": wms, "scrollSnapCoordinate": wms, "shapeImageThreshold": w, "shapeImageMargin": w, "shapeImageOutside": w, "hyphens": wmms, "flowInto": wms, "flowFrom": wms, "regionFragment": wms, "textAlignLast": m, "tabSize": m, "wrapFlow": ms, "wrapThrough": ms, "wrapMargin": ms, "gridTemplateColumns": ms, "gridTemplateRows": ms, "gridTemplateAreas": ms, "gridTemplate": ms, "gridAutoColumns": ms, "gridAutoRows": ms, "gridAutoFlow": ms, "grid": ms, "gridRowStart": ms, "gridColumnStart": ms, "gridRowEnd": ms, "gridRow": ms, "gridColumn": ms, "gridColumnEnd": ms, "gridColumnGap": ms, "gridRowGap": ms, "gridArea": ms, "gridGap": ms, "textSizeAdjust": wms, "borderImage": w, "borderImageOutset": w, "borderImageRepeat": w, "borderImageSlice": w, "borderImageSource": w, "borderImageWidth": w, "transitionDelay": w, "transitionDuration": w, "transitionProperty": w, "transitionTimingFunction": w }
};
module.exports = exports["default"];
});

unwrapExports(staticData);

var cursor_1$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursor;
var prefixes = ['-webkit-', '-moz-', ''];

var values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
};

function cursor(property, value) {
  if (property === 'cursor' && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];
});

unwrapExports(cursor_1$1);

var isPrefixedValue_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPrefixedValue;
var regex = /-webkit-|-moz-|-ms-/;

function isPrefixedValue(value) {
  return typeof value === 'string' && regex.test(value);
}
module.exports = exports['default'];
});

unwrapExports(isPrefixedValue_1);

var crossFade_1$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = crossFade;



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#search=cross-fade
var prefixes = ['-webkit-', ''];
function crossFade(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('cross-fade(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/cross-fade\(/g, prefix + 'cross-fade(');
    });
  }
}
module.exports = exports['default'];
});

unwrapExports(crossFade_1$1);

var filter_1$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#feat=css-filter-function
var prefixes = ['-webkit-', ''];
function filter(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('filter(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/filter\(/g, prefix + 'filter(');
    });
  }
}
module.exports = exports['default'];
});

unwrapExports(filter_1$1);

var flex_1$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;
var values = {
  flex: ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex'],
  'inline-flex': ['-webkit-inline-box', '-moz-inline-box', '-ms-inline-flexbox', '-webkit-inline-flex', 'inline-flex']
};

function flex(property, value) {
  if (property === 'display' && values.hasOwnProperty(value)) {
    return values[value];
  }
}
module.exports = exports['default'];
});

unwrapExports(flex_1$1);

var flexboxOld_1$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;
var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

function flexboxOld(property, value, style) {
  if (property === 'flexDirection' && typeof value === 'string') {
    if (value.indexOf('column') > -1) {
      style.WebkitBoxOrient = 'vertical';
    } else {
      style.WebkitBoxOrient = 'horizontal';
    }
    if (value.indexOf('reverse') > -1) {
      style.WebkitBoxDirection = 'reverse';
    } else {
      style.WebkitBoxDirection = 'normal';
    }
  }
  if (alternativeProps.hasOwnProperty(property)) {
    style[alternativeProps[property]] = alternativeValues[value] || value;
  }
}
module.exports = exports['default'];
});

unwrapExports(flexboxOld_1$1);

var gradient_1$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixes = ['-webkit-', '-moz-', ''];

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && values.test(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];
});

unwrapExports(gradient_1$1);

var imageSet_1$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = imageSet;



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#feat=css-image-set
var prefixes = ['-webkit-', ''];
function imageSet(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('image-set(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/image-set\(/g, prefix + 'image-set(');
    });
  }
}
module.exports = exports['default'];
});

unwrapExports(imageSet_1$1);

var position_1$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;
function position(property, value) {
  if (property === 'position' && value === 'sticky') {
    return ['-webkit-sticky', 'sticky'];
  }
}
module.exports = exports['default'];
});

unwrapExports(position_1$1);

var sizing_1$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;
var prefixes = ['-webkit-', '-moz-', ''];

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(property, value) {
  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];
});

unwrapExports(sizing_1$1);

var transition_1$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transition;



var _hyphenateProperty2 = _interopRequireDefault(hyphenateProperty_1);



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);



var _capitalizeString2 = _interopRequireDefault(capitalizeString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true
};


var prefixMapping = {
  Webkit: '-webkit-',
  Moz: '-moz-',
  ms: '-ms-'
};

function prefixValue(value, propertyPrefixMap) {
  if ((0, _isPrefixedValue2.default)(value)) {
    return value;
  }

  // only split multi values, not cubic beziers
  var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

  for (var i = 0, len = multipleValues.length; i < len; ++i) {
    var singleValue = multipleValues[i];
    var values = [singleValue];
    for (var property in propertyPrefixMap) {
      var dashCaseProperty = (0, _hyphenateProperty2.default)(property);

      if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
        var prefixes = propertyPrefixMap[property];
        for (var j = 0, pLen = prefixes.length; j < pLen; ++j) {
          // join all prefixes and create a new value
          values.unshift(singleValue.replace(dashCaseProperty, prefixMapping[prefixes[j]] + dashCaseProperty));
        }
      }
    }

    multipleValues[i] = values.join(',');
  }

  return multipleValues.join(',');
}

function transition(property, value, style, propertyPrefixMap) {
  // also check for already prefixed transitions
  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
    var outputValue = prefixValue(value, propertyPrefixMap);
    // if the property is already prefixed
    var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-moz-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Webkit') > -1) {
      return webkitOutput;
    }

    var mozOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-webkit-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Moz') > -1) {
      return mozOutput;
    }

    style['Webkit' + (0, _capitalizeString2.default)(property)] = webkitOutput;
    style['Moz' + (0, _capitalizeString2.default)(property)] = mozOutput;
    return outputValue;
  }
}
module.exports = exports['default'];
});

unwrapExports(transition_1$1);

var _static = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});



var _createPrefixer2 = _interopRequireDefault(createPrefixer_1$1);



var _staticData2 = _interopRequireDefault(staticData);



var _cursor2 = _interopRequireDefault(cursor_1$1);



var _crossFade2 = _interopRequireDefault(crossFade_1$1);



var _filter2 = _interopRequireDefault(filter_1$1);



var _flex2 = _interopRequireDefault(flex_1$1);



var _flexboxOld2 = _interopRequireDefault(flexboxOld_1$1);



var _gradient2 = _interopRequireDefault(gradient_1$1);



var _imageSet2 = _interopRequireDefault(imageSet_1$1);



var _position2 = _interopRequireDefault(position_1$1);



var _sizing2 = _interopRequireDefault(sizing_1$1);



var _transition2 = _interopRequireDefault(transition_1$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = [_crossFade2.default, _cursor2.default, _filter2.default, _flexboxOld2.default, _gradient2.default, _imageSet2.default, _position2.default, _sizing2.default, _transition2.default, _flex2.default];

exports.default = (0, _createPrefixer2.default)({
  prefixMap: _staticData2.default.prefixMap,
  plugins: plugins
});
module.exports = exports['default'];
});

unwrapExports(_static);

var dynamicData = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  plugins: [],
  prefixMap: { "chrome": { "appearance": 64, "userSelect": 53, "textEmphasisPosition": 64, "textEmphasis": 64, "textEmphasisStyle": 64, "textEmphasisColor": 64, "boxDecorationBreak": 64, "clipPath": 54, "maskImage": 64, "maskMode": 64, "maskRepeat": 64, "maskPosition": 64, "maskClip": 64, "maskOrigin": 64, "maskSize": 64, "maskComposite": 64, "mask": 64, "maskBorderSource": 64, "maskBorderMode": 64, "maskBorderSlice": 64, "maskBorderWidth": 64, "maskBorderOutset": 64, "maskBorderRepeat": 64, "maskBorder": 64, "maskType": 64, "textDecorationStyle": 56, "textDecorationSkip": 56, "textDecorationLine": 56, "textDecorationColor": 56, "filter": 52, "fontFeatureSettings": 47, "breakAfter": 49, "breakBefore": 49, "breakInside": 49, "columnCount": 49, "columnFill": 49, "columnGap": 49, "columnRule": 49, "columnRuleColor": 49, "columnRuleStyle": 49, "columnRuleWidth": 49, "columns": 49, "columnSpan": 49, "columnWidth": 49, "writingMode": 47 }, "safari": { "flex": 8, "flexBasis": 8, "flexDirection": 8, "flexGrow": 8, "flexFlow": 8, "flexShrink": 8, "flexWrap": 8, "alignContent": 8, "alignItems": 8, "alignSelf": 8, "justifyContent": 8, "order": 8, "transform": 8, "transformOrigin": 8, "transformOriginX": 8, "transformOriginY": 8, "backfaceVisibility": 8, "perspective": 8, "perspectiveOrigin": 8, "transformStyle": 8, "transformOriginZ": 8, "animation": 8, "animationDelay": 8, "animationDirection": 8, "animationFillMode": 8, "animationDuration": 8, "animationIterationCount": 8, "animationName": 8, "animationPlayState": 8, "animationTimingFunction": 8, "appearance": 11, "userSelect": 11, "backdropFilter": 11, "fontKerning": 9, "scrollSnapType": 10.1, "scrollSnapPointsX": 10.1, "scrollSnapPointsY": 10.1, "scrollSnapDestination": 10.1, "scrollSnapCoordinate": 10.1, "boxDecorationBreak": 11, "clipPath": 11, "maskImage": 11, "maskMode": 11, "maskRepeat": 11, "maskPosition": 11, "maskClip": 11, "maskOrigin": 11, "maskSize": 11, "maskComposite": 11, "mask": 11, "maskBorderSource": 11, "maskBorderMode": 11, "maskBorderSlice": 11, "maskBorderWidth": 11, "maskBorderOutset": 11, "maskBorderRepeat": 11, "maskBorder": 11, "maskType": 11, "textDecorationStyle": 11, "textDecorationSkip": 11, "textDecorationLine": 11, "textDecorationColor": 11, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 8, "breakAfter": 8, "breakInside": 8, "regionFragment": 11, "columnCount": 8, "columnFill": 8, "columnGap": 8, "columnRule": 8, "columnRuleColor": 8, "columnRuleStyle": 8, "columnRuleWidth": 8, "columns": 8, "columnSpan": 8, "columnWidth": 8, "writingMode": 11 }, "firefox": { "appearance": 58, "userSelect": 58, "textAlignLast": 48, "tabSize": 58, "hyphens": 42, "breakAfter": 51, "breakBefore": 51, "breakInside": 51, "columnCount": 51, "columnFill": 51, "columnGap": 51, "columnRule": 51, "columnRuleColor": 51, "columnRuleStyle": 51, "columnRuleWidth": 51, "columns": 51, "columnSpan": 51, "columnWidth": 51 }, "opera": { "flex": 16, "flexBasis": 16, "flexDirection": 16, "flexGrow": 16, "flexFlow": 16, "flexShrink": 16, "flexWrap": 16, "alignContent": 16, "alignItems": 16, "alignSelf": 16, "justifyContent": 16, "order": 16, "transform": 22, "transformOrigin": 22, "transformOriginX": 22, "transformOriginY": 22, "backfaceVisibility": 22, "perspective": 22, "perspectiveOrigin": 22, "transformStyle": 22, "transformOriginZ": 22, "animation": 29, "animationDelay": 29, "animationDirection": 29, "animationFillMode": 29, "animationDuration": 29, "animationIterationCount": 29, "animationName": 29, "animationPlayState": 29, "animationTimingFunction": 29, "appearance": 49, "userSelect": 40, "fontKerning": 19, "textEmphasisPosition": 49, "textEmphasis": 49, "textEmphasisStyle": 49, "textEmphasisColor": 49, "boxDecorationBreak": 49, "clipPath": 41, "maskImage": 49, "maskMode": 49, "maskRepeat": 49, "maskPosition": 49, "maskClip": 49, "maskOrigin": 49, "maskSize": 49, "maskComposite": 49, "mask": 49, "maskBorderSource": 49, "maskBorderMode": 49, "maskBorderSlice": 49, "maskBorderWidth": 49, "maskBorderOutset": 49, "maskBorderRepeat": 49, "maskBorder": 49, "maskType": 49, "textDecorationStyle": 43, "textDecorationSkip": 43, "textDecorationLine": 43, "textDecorationColor": 43, "filter": 39, "fontFeatureSettings": 34, "breakAfter": 36, "breakBefore": 36, "breakInside": 36, "columnCount": 36, "columnFill": 36, "columnGap": 36, "columnRule": 36, "columnRuleColor": 36, "columnRuleStyle": 36, "columnRuleWidth": 36, "columns": 36, "columnSpan": 36, "columnWidth": 36, "writingMode": 34 }, "ie": { "userSelect": 11, "wrapFlow": 11, "wrapThrough": 11, "wrapMargin": 11, "scrollSnapType": 11, "scrollSnapPointsX": 11, "scrollSnapPointsY": 11, "scrollSnapDestination": 11, "scrollSnapCoordinate": 11, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 11, "breakAfter": 11, "breakInside": 11, "regionFragment": 11, "gridTemplateColumns": 11, "gridTemplateRows": 11, "gridTemplateAreas": 11, "gridTemplate": 11, "gridAutoColumns": 11, "gridAutoRows": 11, "gridAutoFlow": 11, "grid": 11, "gridRowStart": 11, "gridColumnStart": 11, "gridRowEnd": 11, "gridRow": 11, "gridColumn": 11, "gridColumnEnd": 11, "gridColumnGap": 11, "gridRowGap": 11, "gridArea": 11, "gridGap": 11, "textSizeAdjust": 11, "writingMode": 11 }, "edge": { "userSelect": 16, "wrapFlow": 16, "wrapThrough": 16, "wrapMargin": 16, "scrollSnapType": 16, "scrollSnapPointsX": 16, "scrollSnapPointsY": 16, "scrollSnapDestination": 16, "scrollSnapCoordinate": 16, "hyphens": 16, "flowInto": 16, "flowFrom": 16, "breakBefore": 16, "breakAfter": 16, "breakInside": 16, "regionFragment": 16, "gridTemplateColumns": 15, "gridTemplateRows": 15, "gridTemplateAreas": 15, "gridTemplate": 15, "gridAutoColumns": 15, "gridAutoRows": 15, "gridAutoFlow": 15, "grid": 15, "gridRowStart": 15, "gridColumnStart": 15, "gridRowEnd": 15, "gridRow": 15, "gridColumn": 15, "gridColumnEnd": 15, "gridColumnGap": 15, "gridRowGap": 15, "gridArea": 15, "gridGap": 15 }, "ios_saf": { "flex": 8.1, "flexBasis": 8.1, "flexDirection": 8.1, "flexGrow": 8.1, "flexFlow": 8.1, "flexShrink": 8.1, "flexWrap": 8.1, "alignContent": 8.1, "alignItems": 8.1, "alignSelf": 8.1, "justifyContent": 8.1, "order": 8.1, "transform": 8.1, "transformOrigin": 8.1, "transformOriginX": 8.1, "transformOriginY": 8.1, "backfaceVisibility": 8.1, "perspective": 8.1, "perspectiveOrigin": 8.1, "transformStyle": 8.1, "transformOriginZ": 8.1, "animation": 8.1, "animationDelay": 8.1, "animationDirection": 8.1, "animationFillMode": 8.1, "animationDuration": 8.1, "animationIterationCount": 8.1, "animationName": 8.1, "animationPlayState": 8.1, "animationTimingFunction": 8.1, "appearance": 11, "userSelect": 11, "backdropFilter": 11, "fontKerning": 11, "scrollSnapType": 11, "scrollSnapPointsX": 11, "scrollSnapPointsY": 11, "scrollSnapDestination": 11, "scrollSnapCoordinate": 11, "boxDecorationBreak": 11, "clipPath": 11, "maskImage": 11, "maskMode": 11, "maskRepeat": 11, "maskPosition": 11, "maskClip": 11, "maskOrigin": 11, "maskSize": 11, "maskComposite": 11, "mask": 11, "maskBorderSource": 11, "maskBorderMode": 11, "maskBorderSlice": 11, "maskBorderWidth": 11, "maskBorderOutset": 11, "maskBorderRepeat": 11, "maskBorder": 11, "maskType": 11, "textSizeAdjust": 11, "textDecorationStyle": 11, "textDecorationSkip": 11, "textDecorationLine": 11, "textDecorationColor": 11, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 8.1, "breakAfter": 8.1, "breakInside": 8.1, "regionFragment": 11, "columnCount": 8.1, "columnFill": 8.1, "columnGap": 8.1, "columnRule": 8.1, "columnRuleColor": 8.1, "columnRuleStyle": 8.1, "columnRuleWidth": 8.1, "columns": 8.1, "columnSpan": 8.1, "columnWidth": 8.1, "writingMode": 11 }, "android": { "borderImage": 4.2, "borderImageOutset": 4.2, "borderImageRepeat": 4.2, "borderImageSlice": 4.2, "borderImageSource": 4.2, "borderImageWidth": 4.2, "flex": 4.2, "flexBasis": 4.2, "flexDirection": 4.2, "flexGrow": 4.2, "flexFlow": 4.2, "flexShrink": 4.2, "flexWrap": 4.2, "alignContent": 4.2, "alignItems": 4.2, "alignSelf": 4.2, "justifyContent": 4.2, "order": 4.2, "transition": 4.2, "transitionDelay": 4.2, "transitionDuration": 4.2, "transitionProperty": 4.2, "transitionTimingFunction": 4.2, "transform": 4.4, "transformOrigin": 4.4, "transformOriginX": 4.4, "transformOriginY": 4.4, "backfaceVisibility": 4.4, "perspective": 4.4, "perspectiveOrigin": 4.4, "transformStyle": 4.4, "transformOriginZ": 4.4, "animation": 4.4, "animationDelay": 4.4, "animationDirection": 4.4, "animationFillMode": 4.4, "animationDuration": 4.4, "animationIterationCount": 4.4, "animationName": 4.4, "animationPlayState": 4.4, "animationTimingFunction": 4.4, "appearance": 56, "userSelect": 4.4, "fontKerning": 4.4, "textEmphasisPosition": 56, "textEmphasis": 56, "textEmphasisStyle": 56, "textEmphasisColor": 56, "boxDecorationBreak": 56, "clipPath": 4.4, "maskImage": 56, "maskMode": 56, "maskRepeat": 56, "maskPosition": 56, "maskClip": 56, "maskOrigin": 56, "maskSize": 56, "maskComposite": 56, "mask": 56, "maskBorderSource": 56, "maskBorderMode": 56, "maskBorderSlice": 56, "maskBorderWidth": 56, "maskBorderOutset": 56, "maskBorderRepeat": 56, "maskBorder": 56, "maskType": 56, "filter": 4.4, "fontFeatureSettings": 4.4, "breakAfter": 4.4, "breakBefore": 4.4, "breakInside": 4.4, "columnCount": 4.4, "columnFill": 4.4, "columnGap": 4.4, "columnRule": 4.4, "columnRuleColor": 4.4, "columnRuleStyle": 4.4, "columnRuleWidth": 4.4, "columns": 4.4, "columnSpan": 4.4, "columnWidth": 4.4, "writingMode": 4.4 }, "and_chr": { "appearance": 61, "textEmphasisPosition": 61, "textEmphasis": 61, "textEmphasisStyle": 61, "textEmphasisColor": 61, "boxDecorationBreak": 61, "maskImage": 61, "maskMode": 61, "maskRepeat": 61, "maskPosition": 61, "maskClip": 61, "maskOrigin": 61, "maskSize": 61, "maskComposite": 61, "mask": 61, "maskBorderSource": 61, "maskBorderMode": 61, "maskBorderSlice": 61, "maskBorderWidth": 61, "maskBorderOutset": 61, "maskBorderRepeat": 61, "maskBorder": 61, "maskType": 61 }, "and_uc": { "flex": 11.4, "flexBasis": 11.4, "flexDirection": 11.4, "flexGrow": 11.4, "flexFlow": 11.4, "flexShrink": 11.4, "flexWrap": 11.4, "alignContent": 11.4, "alignItems": 11.4, "alignSelf": 11.4, "justifyContent": 11.4, "order": 11.4, "transform": 11.4, "transformOrigin": 11.4, "transformOriginX": 11.4, "transformOriginY": 11.4, "backfaceVisibility": 11.4, "perspective": 11.4, "perspectiveOrigin": 11.4, "transformStyle": 11.4, "transformOriginZ": 11.4, "animation": 11.4, "animationDelay": 11.4, "animationDirection": 11.4, "animationFillMode": 11.4, "animationDuration": 11.4, "animationIterationCount": 11.4, "animationName": 11.4, "animationPlayState": 11.4, "animationTimingFunction": 11.4, "appearance": 11.4, "userSelect": 11.4, "textEmphasisPosition": 11.4, "textEmphasis": 11.4, "textEmphasisStyle": 11.4, "textEmphasisColor": 11.4, "clipPath": 11.4, "maskImage": 11.4, "maskMode": 11.4, "maskRepeat": 11.4, "maskPosition": 11.4, "maskClip": 11.4, "maskOrigin": 11.4, "maskSize": 11.4, "maskComposite": 11.4, "mask": 11.4, "maskBorderSource": 11.4, "maskBorderMode": 11.4, "maskBorderSlice": 11.4, "maskBorderWidth": 11.4, "maskBorderOutset": 11.4, "maskBorderRepeat": 11.4, "maskBorder": 11.4, "maskType": 11.4, "textSizeAdjust": 11.4, "filter": 11.4, "hyphens": 11.4, "fontFeatureSettings": 11.4, "breakAfter": 11.4, "breakBefore": 11.4, "breakInside": 11.4, "columnCount": 11.4, "columnFill": 11.4, "columnGap": 11.4, "columnRule": 11.4, "columnRuleColor": 11.4, "columnRuleStyle": 11.4, "columnRuleWidth": 11.4, "columns": 11.4, "columnSpan": 11.4, "columnWidth": 11.4, "writingMode": 11.4 }, "op_mini": {} }
};
module.exports = exports["default"];
});

unwrapExports(dynamicData);

var dynamic = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});



var _createPrefixer2 = _interopRequireDefault(createPrefixer_1);



var _cursor2 = _interopRequireDefault(cursor_1);



var _crossFade2 = _interopRequireDefault(crossFade_1);



var _filter2 = _interopRequireDefault(filter_1);



var _flex2 = _interopRequireDefault(flex_1);



var _flexboxOld2 = _interopRequireDefault(flexboxOld_1);



var _gradient2 = _interopRequireDefault(gradient_1);



var _imageSet2 = _interopRequireDefault(imageSet_1);



var _position2 = _interopRequireDefault(position_1);



var _sizing2 = _interopRequireDefault(sizing_1);



var _transition2 = _interopRequireDefault(transition_1);



var _static2 = _interopRequireDefault(_static);



var _dynamicData2 = _interopRequireDefault(dynamicData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = [_crossFade2.default, _cursor2.default, _filter2.default, _flexboxOld2.default, _gradient2.default, _imageSet2.default, _position2.default, _sizing2.default, _transition2.default, _flex2.default];

var Prefixer = (0, _createPrefixer2.default)({
  prefixMap: _dynamicData2.default.prefixMap,
  plugins: plugins
}, _static2.default);
exports.default = Prefixer;
module.exports = exports['default'];
});

unwrapExports(dynamic);

// GENERATED DO NOT EDIT
var cssProperties = [
  "alignContent",
  "MozAlignContent",
  "WebkitAlignContent",
  "MSAlignContent",
  "OAlignContent",
  "alignItems",
  "MozAlignItems",
  "WebkitAlignItems",
  "MSAlignItems",
  "OAlignItems",
  "alignSelf",
  "MozAlignSelf",
  "WebkitAlignSelf",
  "MSAlignSelf",
  "OAlignSelf",
  "all",
  "MozAll",
  "WebkitAll",
  "MSAll",
  "OAll",
  "animation",
  "MozAnimation",
  "WebkitAnimation",
  "MSAnimation",
  "OAnimation",
  "animationDelay",
  "MozAnimationDelay",
  "WebkitAnimationDelay",
  "MSAnimationDelay",
  "OAnimationDelay",
  "animationDirection",
  "MozAnimationDirection",
  "WebkitAnimationDirection",
  "MSAnimationDirection",
  "OAnimationDirection",
  "animationDuration",
  "MozAnimationDuration",
  "WebkitAnimationDuration",
  "MSAnimationDuration",
  "OAnimationDuration",
  "animationFillMode",
  "MozAnimationFillMode",
  "WebkitAnimationFillMode",
  "MSAnimationFillMode",
  "OAnimationFillMode",
  "animationIterationCount",
  "MozAnimationIterationCount",
  "WebkitAnimationIterationCount",
  "MSAnimationIterationCount",
  "OAnimationIterationCount",
  "animationName",
  "MozAnimationName",
  "WebkitAnimationName",
  "MSAnimationName",
  "OAnimationName",
  "animationPlayState",
  "MozAnimationPlayState",
  "WebkitAnimationPlayState",
  "MSAnimationPlayState",
  "OAnimationPlayState",
  "animationTimingFunction",
  "MozAnimationTimingFunction",
  "WebkitAnimationTimingFunction",
  "MSAnimationTimingFunction",
  "OAnimationTimingFunction",
  "backfaceVisibility",
  "MozBackfaceVisibility",
  "WebkitBackfaceVisibility",
  "MSBackfaceVisibility",
  "OBackfaceVisibility",
  "background",
  "MozBackground",
  "WebkitBackground",
  "MSBackground",
  "OBackground",
  "backgroundAttachment",
  "MozBackgroundAttachment",
  "WebkitBackgroundAttachment",
  "MSBackgroundAttachment",
  "OBackgroundAttachment",
  "backgroundBlendMode",
  "MozBackgroundBlendMode",
  "WebkitBackgroundBlendMode",
  "MSBackgroundBlendMode",
  "OBackgroundBlendMode",
  "backgroundClip",
  "MozBackgroundClip",
  "WebkitBackgroundClip",
  "MSBackgroundClip",
  "OBackgroundClip",
  "backgroundColor",
  "MozBackgroundColor",
  "WebkitBackgroundColor",
  "MSBackgroundColor",
  "OBackgroundColor",
  "backgroundImage",
  "MozBackgroundImage",
  "WebkitBackgroundImage",
  "MSBackgroundImage",
  "OBackgroundImage",
  "backgroundOrigin",
  "MozBackgroundOrigin",
  "WebkitBackgroundOrigin",
  "MSBackgroundOrigin",
  "OBackgroundOrigin",
  "backgroundPosition",
  "MozBackgroundPosition",
  "WebkitBackgroundPosition",
  "MSBackgroundPosition",
  "OBackgroundPosition",
  "backgroundRepeat",
  "MozBackgroundRepeat",
  "WebkitBackgroundRepeat",
  "MSBackgroundRepeat",
  "OBackgroundRepeat",
  "backgroundSize",
  "MozBackgroundSize",
  "WebkitBackgroundSize",
  "MSBackgroundSize",
  "OBackgroundSize",
  "blockSize",
  "MozBlockSize",
  "WebkitBlockSize",
  "MSBlockSize",
  "OBlockSize",
  "border",
  "MozBorder",
  "WebkitBorder",
  "MSBorder",
  "OBorder",
  "borderBlockEnd",
  "MozBorderBlockEnd",
  "WebkitBorderBlockEnd",
  "MSBorderBlockEnd",
  "OBorderBlockEnd",
  "borderBlockEndColor",
  "MozBorderBlockEndColor",
  "WebkitBorderBlockEndColor",
  "MSBorderBlockEndColor",
  "OBorderBlockEndColor",
  "borderBlockEndStyle",
  "MozBorderBlockEndStyle",
  "WebkitBorderBlockEndStyle",
  "MSBorderBlockEndStyle",
  "OBorderBlockEndStyle",
  "borderBlockEndWidth",
  "MozBorderBlockEndWidth",
  "WebkitBorderBlockEndWidth",
  "MSBorderBlockEndWidth",
  "OBorderBlockEndWidth",
  "borderBlockStart",
  "MozBorderBlockStart",
  "WebkitBorderBlockStart",
  "MSBorderBlockStart",
  "OBorderBlockStart",
  "borderBlockStartColor",
  "MozBorderBlockStartColor",
  "WebkitBorderBlockStartColor",
  "MSBorderBlockStartColor",
  "OBorderBlockStartColor",
  "borderBlockStartStyle",
  "MozBorderBlockStartStyle",
  "WebkitBorderBlockStartStyle",
  "MSBorderBlockStartStyle",
  "OBorderBlockStartStyle",
  "borderBlockStartWidth",
  "MozBorderBlockStartWidth",
  "WebkitBorderBlockStartWidth",
  "MSBorderBlockStartWidth",
  "OBorderBlockStartWidth",
  "borderBottom",
  "MozBorderBottom",
  "WebkitBorderBottom",
  "MSBorderBottom",
  "OBorderBottom",
  "borderBottomColor",
  "MozBorderBottomColor",
  "WebkitBorderBottomColor",
  "MSBorderBottomColor",
  "OBorderBottomColor",
  "borderBottomLeftRadius",
  "MozBorderBottomLeftRadius",
  "WebkitBorderBottomLeftRadius",
  "MSBorderBottomLeftRadius",
  "OBorderBottomLeftRadius",
  "borderBottomRightRadius",
  "MozBorderBottomRightRadius",
  "WebkitBorderBottomRightRadius",
  "MSBorderBottomRightRadius",
  "OBorderBottomRightRadius",
  "borderBottomStyle",
  "MozBorderBottomStyle",
  "WebkitBorderBottomStyle",
  "MSBorderBottomStyle",
  "OBorderBottomStyle",
  "borderBottomWidth",
  "MozBorderBottomWidth",
  "WebkitBorderBottomWidth",
  "MSBorderBottomWidth",
  "OBorderBottomWidth",
  "borderCollapse",
  "MozBorderCollapse",
  "WebkitBorderCollapse",
  "MSBorderCollapse",
  "OBorderCollapse",
  "borderColor",
  "MozBorderColor",
  "WebkitBorderColor",
  "MSBorderColor",
  "OBorderColor",
  "borderImage",
  "MozBorderImage",
  "WebkitBorderImage",
  "MSBorderImage",
  "OBorderImage",
  "borderImageOutset",
  "MozBorderImageOutset",
  "WebkitBorderImageOutset",
  "MSBorderImageOutset",
  "OBorderImageOutset",
  "borderImageRepeat",
  "MozBorderImageRepeat",
  "WebkitBorderImageRepeat",
  "MSBorderImageRepeat",
  "OBorderImageRepeat",
  "borderImageSlice",
  "MozBorderImageSlice",
  "WebkitBorderImageSlice",
  "MSBorderImageSlice",
  "OBorderImageSlice",
  "borderImageSource",
  "MozBorderImageSource",
  "WebkitBorderImageSource",
  "MSBorderImageSource",
  "OBorderImageSource",
  "borderImageWidth",
  "MozBorderImageWidth",
  "WebkitBorderImageWidth",
  "MSBorderImageWidth",
  "OBorderImageWidth",
  "borderInlineEnd",
  "MozBorderInlineEnd",
  "WebkitBorderInlineEnd",
  "MSBorderInlineEnd",
  "OBorderInlineEnd",
  "borderInlineEndColor",
  "MozBorderInlineEndColor",
  "WebkitBorderInlineEndColor",
  "MSBorderInlineEndColor",
  "OBorderInlineEndColor",
  "borderInlineEndStyle",
  "MozBorderInlineEndStyle",
  "WebkitBorderInlineEndStyle",
  "MSBorderInlineEndStyle",
  "OBorderInlineEndStyle",
  "borderInlineEndWidth",
  "MozBorderInlineEndWidth",
  "WebkitBorderInlineEndWidth",
  "MSBorderInlineEndWidth",
  "OBorderInlineEndWidth",
  "borderInlineStart",
  "MozBorderInlineStart",
  "WebkitBorderInlineStart",
  "MSBorderInlineStart",
  "OBorderInlineStart",
  "borderInlineStartColor",
  "MozBorderInlineStartColor",
  "WebkitBorderInlineStartColor",
  "MSBorderInlineStartColor",
  "OBorderInlineStartColor",
  "borderInlineStartStyle",
  "MozBorderInlineStartStyle",
  "WebkitBorderInlineStartStyle",
  "MSBorderInlineStartStyle",
  "OBorderInlineStartStyle",
  "borderInlineStartWidth",
  "MozBorderInlineStartWidth",
  "WebkitBorderInlineStartWidth",
  "MSBorderInlineStartWidth",
  "OBorderInlineStartWidth",
  "borderLeft",
  "MozBorderLeft",
  "WebkitBorderLeft",
  "MSBorderLeft",
  "OBorderLeft",
  "borderLeftColor",
  "MozBorderLeftColor",
  "WebkitBorderLeftColor",
  "MSBorderLeftColor",
  "OBorderLeftColor",
  "borderLeftStyle",
  "MozBorderLeftStyle",
  "WebkitBorderLeftStyle",
  "MSBorderLeftStyle",
  "OBorderLeftStyle",
  "borderLeftWidth",
  "MozBorderLeftWidth",
  "WebkitBorderLeftWidth",
  "MSBorderLeftWidth",
  "OBorderLeftWidth",
  "borderRadius",
  "MozBorderRadius",
  "WebkitBorderRadius",
  "MSBorderRadius",
  "OBorderRadius",
  "borderRight",
  "MozBorderRight",
  "WebkitBorderRight",
  "MSBorderRight",
  "OBorderRight",
  "borderRightColor",
  "MozBorderRightColor",
  "WebkitBorderRightColor",
  "MSBorderRightColor",
  "OBorderRightColor",
  "borderRightStyle",
  "MozBorderRightStyle",
  "WebkitBorderRightStyle",
  "MSBorderRightStyle",
  "OBorderRightStyle",
  "borderRightWidth",
  "MozBorderRightWidth",
  "WebkitBorderRightWidth",
  "MSBorderRightWidth",
  "OBorderRightWidth",
  "borderSpacing",
  "MozBorderSpacing",
  "WebkitBorderSpacing",
  "MSBorderSpacing",
  "OBorderSpacing",
  "borderStyle",
  "MozBorderStyle",
  "WebkitBorderStyle",
  "MSBorderStyle",
  "OBorderStyle",
  "borderTop",
  "MozBorderTop",
  "WebkitBorderTop",
  "MSBorderTop",
  "OBorderTop",
  "borderTopColor",
  "MozBorderTopColor",
  "WebkitBorderTopColor",
  "MSBorderTopColor",
  "OBorderTopColor",
  "borderTopLeftRadius",
  "MozBorderTopLeftRadius",
  "WebkitBorderTopLeftRadius",
  "MSBorderTopLeftRadius",
  "OBorderTopLeftRadius",
  "borderTopRightRadius",
  "MozBorderTopRightRadius",
  "WebkitBorderTopRightRadius",
  "MSBorderTopRightRadius",
  "OBorderTopRightRadius",
  "borderTopStyle",
  "MozBorderTopStyle",
  "WebkitBorderTopStyle",
  "MSBorderTopStyle",
  "OBorderTopStyle",
  "borderTopWidth",
  "MozBorderTopWidth",
  "WebkitBorderTopWidth",
  "MSBorderTopWidth",
  "OBorderTopWidth",
  "borderWidth",
  "MozBorderWidth",
  "WebkitBorderWidth",
  "MSBorderWidth",
  "OBorderWidth",
  "bottom",
  "MozBottom",
  "WebkitBottom",
  "MSBottom",
  "OBottom",
  "boxDecorationBreak",
  "MozBoxDecorationBreak",
  "WebkitBoxDecorationBreak",
  "MSBoxDecorationBreak",
  "OBoxDecorationBreak",
  "boxShadow",
  "MozBoxShadow",
  "WebkitBoxShadow",
  "MSBoxShadow",
  "OBoxShadow",
  "boxSizing",
  "MozBoxSizing",
  "WebkitBoxSizing",
  "MSBoxSizing",
  "OBoxSizing",
  "breakAfter",
  "MozBreakAfter",
  "WebkitBreakAfter",
  "MSBreakAfter",
  "OBreakAfter",
  "breakBefore",
  "MozBreakBefore",
  "WebkitBreakBefore",
  "MSBreakBefore",
  "OBreakBefore",
  "breakInside",
  "MozBreakInside",
  "WebkitBreakInside",
  "MSBreakInside",
  "OBreakInside",
  "captionSide",
  "MozCaptionSide",
  "WebkitCaptionSide",
  "MSCaptionSide",
  "OCaptionSide",
  "caretColor",
  "MozCaretColor",
  "WebkitCaretColor",
  "MSCaretColor",
  "OCaretColor",
  "ch",
  "MozCh",
  "WebkitCh",
  "MSCh",
  "OCh",
  "clear",
  "MozClear",
  "WebkitClear",
  "MSClear",
  "OClear",
  "clip",
  "MozClip",
  "WebkitClip",
  "MSClip",
  "OClip",
  "clipPath",
  "MozClipPath",
  "WebkitClipPath",
  "MSClipPath",
  "OClipPath",
  "cm",
  "MozCm",
  "WebkitCm",
  "MSCm",
  "OCm",
  "color",
  "MozColor",
  "WebkitColor",
  "MSColor",
  "OColor",
  "columnCount",
  "MozColumnCount",
  "WebkitColumnCount",
  "MSColumnCount",
  "OColumnCount",
  "columnFill",
  "MozColumnFill",
  "WebkitColumnFill",
  "MSColumnFill",
  "OColumnFill",
  "columnGap",
  "MozColumnGap",
  "WebkitColumnGap",
  "MSColumnGap",
  "OColumnGap",
  "columnRule",
  "MozColumnRule",
  "WebkitColumnRule",
  "MSColumnRule",
  "OColumnRule",
  "columnRuleColor",
  "MozColumnRuleColor",
  "WebkitColumnRuleColor",
  "MSColumnRuleColor",
  "OColumnRuleColor",
  "columnRuleStyle",
  "MozColumnRuleStyle",
  "WebkitColumnRuleStyle",
  "MSColumnRuleStyle",
  "OColumnRuleStyle",
  "columnRuleWidth",
  "MozColumnRuleWidth",
  "WebkitColumnRuleWidth",
  "MSColumnRuleWidth",
  "OColumnRuleWidth",
  "columnSpan",
  "MozColumnSpan",
  "WebkitColumnSpan",
  "MSColumnSpan",
  "OColumnSpan",
  "columnWidth",
  "MozColumnWidth",
  "WebkitColumnWidth",
  "MSColumnWidth",
  "OColumnWidth",
  "columns",
  "MozColumns",
  "WebkitColumns",
  "MSColumns",
  "OColumns",
  "content",
  "MozContent",
  "WebkitContent",
  "MSContent",
  "OContent",
  "counterIncrement",
  "MozCounterIncrement",
  "WebkitCounterIncrement",
  "MSCounterIncrement",
  "OCounterIncrement",
  "counterReset",
  "MozCounterReset",
  "WebkitCounterReset",
  "MSCounterReset",
  "OCounterReset",
  "cursor",
  "MozCursor",
  "WebkitCursor",
  "MSCursor",
  "OCursor",
  "deg",
  "MozDeg",
  "WebkitDeg",
  "MSDeg",
  "ODeg",
  "direction",
  "MozDirection",
  "WebkitDirection",
  "MSDirection",
  "ODirection",
  "display",
  "MozDisplay",
  "WebkitDisplay",
  "MSDisplay",
  "ODisplay",
  "dpcm",
  "MozDpcm",
  "WebkitDpcm",
  "MSDpcm",
  "ODpcm",
  "dpi",
  "MozDpi",
  "WebkitDpi",
  "MSDpi",
  "ODpi",
  "dppx",
  "MozDppx",
  "WebkitDppx",
  "MSDppx",
  "ODppx",
  "em",
  "MozEm",
  "WebkitEm",
  "MSEm",
  "OEm",
  "emptyCells",
  "MozEmptyCells",
  "WebkitEmptyCells",
  "MSEmptyCells",
  "OEmptyCells",
  "ex",
  "MozEx",
  "WebkitEx",
  "MSEx",
  "OEx",
  "filter",
  "MozFilter",
  "WebkitFilter",
  "MSFilter",
  "OFilter",
  "flexBasis",
  "MozFlexBasis",
  "WebkitFlexBasis",
  "MSFlexBasis",
  "OFlexBasis",
  "flexDirection",
  "MozFlexDirection",
  "WebkitFlexDirection",
  "MSFlexDirection",
  "OFlexDirection",
  "flexFlow",
  "MozFlexFlow",
  "WebkitFlexFlow",
  "MSFlexFlow",
  "OFlexFlow",
  "flexGrow",
  "MozFlexGrow",
  "WebkitFlexGrow",
  "MSFlexGrow",
  "OFlexGrow",
  "flexShrink",
  "MozFlexShrink",
  "WebkitFlexShrink",
  "MSFlexShrink",
  "OFlexShrink",
  "flexWrap",
  "MozFlexWrap",
  "WebkitFlexWrap",
  "MSFlexWrap",
  "OFlexWrap",
  "float",
  "MozFloat",
  "WebkitFloat",
  "MSFloat",
  "OFloat",
  "font",
  "MozFont",
  "WebkitFont",
  "MSFont",
  "OFont",
  "fontFamily",
  "MozFontFamily",
  "WebkitFontFamily",
  "MSFontFamily",
  "OFontFamily",
  "fontFeatureSettings",
  "MozFontFeatureSettings",
  "WebkitFontFeatureSettings",
  "MSFontFeatureSettings",
  "OFontFeatureSettings",
  "fontKerning",
  "MozFontKerning",
  "WebkitFontKerning",
  "MSFontKerning",
  "OFontKerning",
  "fontLanguageOverride",
  "MozFontLanguageOverride",
  "WebkitFontLanguageOverride",
  "MSFontLanguageOverride",
  "OFontLanguageOverride",
  "fontSize",
  "MozFontSize",
  "WebkitFontSize",
  "MSFontSize",
  "OFontSize",
  "fontSizeAdjust",
  "MozFontSizeAdjust",
  "WebkitFontSizeAdjust",
  "MSFontSizeAdjust",
  "OFontSizeAdjust",
  "fontStretch",
  "MozFontStretch",
  "WebkitFontStretch",
  "MSFontStretch",
  "OFontStretch",
  "fontStyle",
  "MozFontStyle",
  "WebkitFontStyle",
  "MSFontStyle",
  "OFontStyle",
  "fontSynthesis",
  "MozFontSynthesis",
  "WebkitFontSynthesis",
  "MSFontSynthesis",
  "OFontSynthesis",
  "fontVariant",
  "MozFontVariant",
  "WebkitFontVariant",
  "MSFontVariant",
  "OFontVariant",
  "fontVariantAlternates",
  "MozFontVariantAlternates",
  "WebkitFontVariantAlternates",
  "MSFontVariantAlternates",
  "OFontVariantAlternates",
  "fontVariantCaps",
  "MozFontVariantCaps",
  "WebkitFontVariantCaps",
  "MSFontVariantCaps",
  "OFontVariantCaps",
  "fontVariantEastAsian",
  "MozFontVariantEastAsian",
  "WebkitFontVariantEastAsian",
  "MSFontVariantEastAsian",
  "OFontVariantEastAsian",
  "fontVariantLigatures",
  "MozFontVariantLigatures",
  "WebkitFontVariantLigatures",
  "MSFontVariantLigatures",
  "OFontVariantLigatures",
  "fontVariantNumeric",
  "MozFontVariantNumeric",
  "WebkitFontVariantNumeric",
  "MSFontVariantNumeric",
  "OFontVariantNumeric",
  "fontVariantPosition",
  "MozFontVariantPosition",
  "WebkitFontVariantPosition",
  "MSFontVariantPosition",
  "OFontVariantPosition",
  "fontWeight",
  "MozFontWeight",
  "WebkitFontWeight",
  "MSFontWeight",
  "OFontWeight",
  "fr",
  "MozFr",
  "WebkitFr",
  "MSFr",
  "OFr",
  "grad",
  "MozGrad",
  "WebkitGrad",
  "MSGrad",
  "OGrad",
  "grid",
  "MozGrid",
  "WebkitGrid",
  "MSGrid",
  "OGrid",
  "gridArea",
  "MozGridArea",
  "WebkitGridArea",
  "MSGridArea",
  "OGridArea",
  "gridAutoColumns",
  "MozGridAutoColumns",
  "WebkitGridAutoColumns",
  "MSGridAutoColumns",
  "OGridAutoColumns",
  "gridAutoFlow",
  "MozGridAutoFlow",
  "WebkitGridAutoFlow",
  "MSGridAutoFlow",
  "OGridAutoFlow",
  "gridAutoRows",
  "MozGridAutoRows",
  "WebkitGridAutoRows",
  "MSGridAutoRows",
  "OGridAutoRows",
  "gridColumn",
  "MozGridColumn",
  "WebkitGridColumn",
  "MSGridColumn",
  "OGridColumn",
  "gridColumnEnd",
  "MozGridColumnEnd",
  "WebkitGridColumnEnd",
  "MSGridColumnEnd",
  "OGridColumnEnd",
  "gridColumnGap",
  "MozGridColumnGap",
  "WebkitGridColumnGap",
  "MSGridColumnGap",
  "OGridColumnGap",
  "gridColumnStart",
  "MozGridColumnStart",
  "WebkitGridColumnStart",
  "MSGridColumnStart",
  "OGridColumnStart",
  "gridGap",
  "MozGridGap",
  "WebkitGridGap",
  "MSGridGap",
  "OGridGap",
  "gridRow",
  "MozGridRow",
  "WebkitGridRow",
  "MSGridRow",
  "OGridRow",
  "gridRowEnd",
  "MozGridRowEnd",
  "WebkitGridRowEnd",
  "MSGridRowEnd",
  "OGridRowEnd",
  "gridRowGap",
  "MozGridRowGap",
  "WebkitGridRowGap",
  "MSGridRowGap",
  "OGridRowGap",
  "gridRowStart",
  "MozGridRowStart",
  "WebkitGridRowStart",
  "MSGridRowStart",
  "OGridRowStart",
  "gridTemplate",
  "MozGridTemplate",
  "WebkitGridTemplate",
  "MSGridTemplate",
  "OGridTemplate",
  "gridTemplateAreas",
  "MozGridTemplateAreas",
  "WebkitGridTemplateAreas",
  "MSGridTemplateAreas",
  "OGridTemplateAreas",
  "gridTemplateColumns",
  "MozGridTemplateColumns",
  "WebkitGridTemplateColumns",
  "MSGridTemplateColumns",
  "OGridTemplateColumns",
  "gridTemplateRows",
  "MozGridTemplateRows",
  "WebkitGridTemplateRows",
  "MSGridTemplateRows",
  "OGridTemplateRows",
  "height",
  "MozHeight",
  "WebkitHeight",
  "MSHeight",
  "OHeight",
  "hyphens",
  "MozHyphens",
  "WebkitHyphens",
  "MSHyphens",
  "OHyphens",
  "hz",
  "MozHz",
  "WebkitHz",
  "MSHz",
  "OHz",
  "imageOrientation",
  "MozImageOrientation",
  "WebkitImageOrientation",
  "MSImageOrientation",
  "OImageOrientation",
  "imageRendering",
  "MozImageRendering",
  "WebkitImageRendering",
  "MSImageRendering",
  "OImageRendering",
  "imageResolution",
  "MozImageResolution",
  "WebkitImageResolution",
  "MSImageResolution",
  "OImageResolution",
  "imeMode",
  "MozImeMode",
  "WebkitImeMode",
  "MSImeMode",
  "OImeMode",
  "in",
  "MozIn",
  "WebkitIn",
  "MSIn",
  "OIn",
  "inherit",
  "MozInherit",
  "WebkitInherit",
  "MSInherit",
  "OInherit",
  "initial",
  "MozInitial",
  "WebkitInitial",
  "MSInitial",
  "OInitial",
  "inlineSize",
  "MozInlineSize",
  "WebkitInlineSize",
  "MSInlineSize",
  "OInlineSize",
  "isolation",
  "MozIsolation",
  "WebkitIsolation",
  "MSIsolation",
  "OIsolation",
  "justifyContent",
  "MozJustifyContent",
  "WebkitJustifyContent",
  "MSJustifyContent",
  "OJustifyContent",
  "khz",
  "MozKhz",
  "WebkitKhz",
  "MSKhz",
  "OKhz",
  "left",
  "MozLeft",
  "WebkitLeft",
  "MSLeft",
  "OLeft",
  "letterSpacing",
  "MozLetterSpacing",
  "WebkitLetterSpacing",
  "MSLetterSpacing",
  "OLetterSpacing",
  "lineBreak",
  "MozLineBreak",
  "WebkitLineBreak",
  "MSLineBreak",
  "OLineBreak",
  "lineHeight",
  "MozLineHeight",
  "WebkitLineHeight",
  "MSLineHeight",
  "OLineHeight",
  "listStyle",
  "MozListStyle",
  "WebkitListStyle",
  "MSListStyle",
  "OListStyle",
  "listStyleImage",
  "MozListStyleImage",
  "WebkitListStyleImage",
  "MSListStyleImage",
  "OListStyleImage",
  "listStylePosition",
  "MozListStylePosition",
  "WebkitListStylePosition",
  "MSListStylePosition",
  "OListStylePosition",
  "listStyleType",
  "MozListStyleType",
  "WebkitListStyleType",
  "MSListStyleType",
  "OListStyleType",
  "margin",
  "MozMargin",
  "WebkitMargin",
  "MSMargin",
  "OMargin",
  "marginBlockEnd",
  "MozMarginBlockEnd",
  "WebkitMarginBlockEnd",
  "MSMarginBlockEnd",
  "OMarginBlockEnd",
  "marginBlockStart",
  "MozMarginBlockStart",
  "WebkitMarginBlockStart",
  "MSMarginBlockStart",
  "OMarginBlockStart",
  "marginBottom",
  "MozMarginBottom",
  "WebkitMarginBottom",
  "MSMarginBottom",
  "OMarginBottom",
  "marginInlineEnd",
  "MozMarginInlineEnd",
  "WebkitMarginInlineEnd",
  "MSMarginInlineEnd",
  "OMarginInlineEnd",
  "marginInlineStart",
  "MozMarginInlineStart",
  "WebkitMarginInlineStart",
  "MSMarginInlineStart",
  "OMarginInlineStart",
  "marginLeft",
  "MozMarginLeft",
  "WebkitMarginLeft",
  "MSMarginLeft",
  "OMarginLeft",
  "marginRight",
  "MozMarginRight",
  "WebkitMarginRight",
  "MSMarginRight",
  "OMarginRight",
  "marginTop",
  "MozMarginTop",
  "WebkitMarginTop",
  "MSMarginTop",
  "OMarginTop",
  "mask",
  "MozMask",
  "WebkitMask",
  "MSMask",
  "OMask",
  "maskClip",
  "MozMaskClip",
  "WebkitMaskClip",
  "MSMaskClip",
  "OMaskClip",
  "maskComposite",
  "MozMaskComposite",
  "WebkitMaskComposite",
  "MSMaskComposite",
  "OMaskComposite",
  "maskImage",
  "MozMaskImage",
  "WebkitMaskImage",
  "MSMaskImage",
  "OMaskImage",
  "maskMode",
  "MozMaskMode",
  "WebkitMaskMode",
  "MSMaskMode",
  "OMaskMode",
  "maskOrigin",
  "MozMaskOrigin",
  "WebkitMaskOrigin",
  "MSMaskOrigin",
  "OMaskOrigin",
  "maskPosition",
  "MozMaskPosition",
  "WebkitMaskPosition",
  "MSMaskPosition",
  "OMaskPosition",
  "maskRepeat",
  "MozMaskRepeat",
  "WebkitMaskRepeat",
  "MSMaskRepeat",
  "OMaskRepeat",
  "maskSize",
  "MozMaskSize",
  "WebkitMaskSize",
  "MSMaskSize",
  "OMaskSize",
  "maskType",
  "MozMaskType",
  "WebkitMaskType",
  "MSMaskType",
  "OMaskType",
  "maxHeight",
  "MozMaxHeight",
  "WebkitMaxHeight",
  "MSMaxHeight",
  "OMaxHeight",
  "maxWidth",
  "MozMaxWidth",
  "WebkitMaxWidth",
  "MSMaxWidth",
  "OMaxWidth",
  "minBlockSize",
  "MozMinBlockSize",
  "WebkitMinBlockSize",
  "MSMinBlockSize",
  "OMinBlockSize",
  "minHeight",
  "MozMinHeight",
  "WebkitMinHeight",
  "MSMinHeight",
  "OMinHeight",
  "minInlineSize",
  "MozMinInlineSize",
  "WebkitMinInlineSize",
  "MSMinInlineSize",
  "OMinInlineSize",
  "minWidth",
  "MozMinWidth",
  "WebkitMinWidth",
  "MSMinWidth",
  "OMinWidth",
  "mixBlendMode",
  "MozMixBlendMode",
  "WebkitMixBlendMode",
  "MSMixBlendMode",
  "OMixBlendMode",
  "mm",
  "MozMm",
  "WebkitMm",
  "MSMm",
  "OMm",
  "ms",
  "MozMs",
  "WebkitMs",
  "MSMs",
  "OMs",
  "objectFit",
  "MozObjectFit",
  "WebkitObjectFit",
  "MSObjectFit",
  "OObjectFit",
  "objectPosition",
  "MozObjectPosition",
  "WebkitObjectPosition",
  "MSObjectPosition",
  "OObjectPosition",
  "offsetBlockEnd",
  "MozOffsetBlockEnd",
  "WebkitOffsetBlockEnd",
  "MSOffsetBlockEnd",
  "OOffsetBlockEnd",
  "offsetBlockStart",
  "MozOffsetBlockStart",
  "WebkitOffsetBlockStart",
  "MSOffsetBlockStart",
  "OOffsetBlockStart",
  "offsetInlineEnd",
  "MozOffsetInlineEnd",
  "WebkitOffsetInlineEnd",
  "MSOffsetInlineEnd",
  "OOffsetInlineEnd",
  "offsetInlineStart",
  "MozOffsetInlineStart",
  "WebkitOffsetInlineStart",
  "MSOffsetInlineStart",
  "OOffsetInlineStart",
  "opacity",
  "MozOpacity",
  "WebkitOpacity",
  "MSOpacity",
  "OOpacity",
  "order",
  "MozOrder",
  "WebkitOrder",
  "MSOrder",
  "OOrder",
  "orphans",
  "MozOrphans",
  "WebkitOrphans",
  "MSOrphans",
  "OOrphans",
  "outline",
  "MozOutline",
  "WebkitOutline",
  "MSOutline",
  "OOutline",
  "outlineColor",
  "MozOutlineColor",
  "WebkitOutlineColor",
  "MSOutlineColor",
  "OOutlineColor",
  "outlineOffset",
  "MozOutlineOffset",
  "WebkitOutlineOffset",
  "MSOutlineOffset",
  "OOutlineOffset",
  "outlineStyle",
  "MozOutlineStyle",
  "WebkitOutlineStyle",
  "MSOutlineStyle",
  "OOutlineStyle",
  "outlineWidth",
  "MozOutlineWidth",
  "WebkitOutlineWidth",
  "MSOutlineWidth",
  "OOutlineWidth",
  "overflow",
  "MozOverflow",
  "WebkitOverflow",
  "MSOverflow",
  "OOverflow",
  "overflowWrap",
  "MozOverflowWrap",
  "WebkitOverflowWrap",
  "MSOverflowWrap",
  "OOverflowWrap",
  "overflowX",
  "MozOverflowX",
  "WebkitOverflowX",
  "MSOverflowX",
  "OOverflowX",
  "overflowY",
  "MozOverflowY",
  "WebkitOverflowY",
  "MSOverflowY",
  "OOverflowY",
  "padding",
  "MozPadding",
  "WebkitPadding",
  "MSPadding",
  "OPadding",
  "paddingBlockEnd",
  "MozPaddingBlockEnd",
  "WebkitPaddingBlockEnd",
  "MSPaddingBlockEnd",
  "OPaddingBlockEnd",
  "paddingBlockStart",
  "MozPaddingBlockStart",
  "WebkitPaddingBlockStart",
  "MSPaddingBlockStart",
  "OPaddingBlockStart",
  "paddingBottom",
  "MozPaddingBottom",
  "WebkitPaddingBottom",
  "MSPaddingBottom",
  "OPaddingBottom",
  "paddingInlineEnd",
  "MozPaddingInlineEnd",
  "WebkitPaddingInlineEnd",
  "MSPaddingInlineEnd",
  "OPaddingInlineEnd",
  "paddingInlineStart",
  "MozPaddingInlineStart",
  "WebkitPaddingInlineStart",
  "MSPaddingInlineStart",
  "OPaddingInlineStart",
  "paddingLeft",
  "MozPaddingLeft",
  "WebkitPaddingLeft",
  "MSPaddingLeft",
  "OPaddingLeft",
  "paddingRight",
  "MozPaddingRight",
  "WebkitPaddingRight",
  "MSPaddingRight",
  "OPaddingRight",
  "paddingTop",
  "MozPaddingTop",
  "WebkitPaddingTop",
  "MSPaddingTop",
  "OPaddingTop",
  "pageBreakAfter",
  "MozPageBreakAfter",
  "WebkitPageBreakAfter",
  "MSPageBreakAfter",
  "OPageBreakAfter",
  "pageBreakBefore",
  "MozPageBreakBefore",
  "WebkitPageBreakBefore",
  "MSPageBreakBefore",
  "OPageBreakBefore",
  "pageBreakInside",
  "MozPageBreakInside",
  "WebkitPageBreakInside",
  "MSPageBreakInside",
  "OPageBreakInside",
  "pc",
  "MozPc",
  "WebkitPc",
  "MSPc",
  "OPc",
  "perspective",
  "MozPerspective",
  "WebkitPerspective",
  "MSPerspective",
  "OPerspective",
  "perspectiveOrigin",
  "MozPerspectiveOrigin",
  "WebkitPerspectiveOrigin",
  "MSPerspectiveOrigin",
  "OPerspectiveOrigin",
  "pointerEvents",
  "MozPointerEvents",
  "WebkitPointerEvents",
  "MSPointerEvents",
  "OPointerEvents",
  "position",
  "MozPosition",
  "WebkitPosition",
  "MSPosition",
  "OPosition",
  "pt",
  "MozPt",
  "WebkitPt",
  "MSPt",
  "OPt",
  "px",
  "MozPx",
  "WebkitPx",
  "MSPx",
  "OPx",
  "q",
  "MozQ",
  "WebkitQ",
  "MSQ",
  "OQ",
  "quotes",
  "MozQuotes",
  "WebkitQuotes",
  "MSQuotes",
  "OQuotes",
  "rad",
  "MozRad",
  "WebkitRad",
  "MSRad",
  "ORad",
  "rem",
  "MozRem",
  "WebkitRem",
  "MSRem",
  "ORem",
  "resize",
  "MozResize",
  "WebkitResize",
  "MSResize",
  "OResize",
  "revert",
  "MozRevert",
  "WebkitRevert",
  "MSRevert",
  "ORevert",
  "right",
  "MozRight",
  "WebkitRight",
  "MSRight",
  "ORight",
  "rubyAlign",
  "MozRubyAlign",
  "WebkitRubyAlign",
  "MSRubyAlign",
  "ORubyAlign",
  "rubyMerge",
  "MozRubyMerge",
  "WebkitRubyMerge",
  "MSRubyMerge",
  "ORubyMerge",
  "rubyPosition",
  "MozRubyPosition",
  "WebkitRubyPosition",
  "MSRubyPosition",
  "ORubyPosition",
  "s",
  "MozS",
  "WebkitS",
  "MSS",
  "OS",
  "scrollBehavior",
  "MozScrollBehavior",
  "WebkitScrollBehavior",
  "MSScrollBehavior",
  "OScrollBehavior",
  "scrollSnapCoordinate",
  "MozScrollSnapCoordinate",
  "WebkitScrollSnapCoordinate",
  "MSScrollSnapCoordinate",
  "OScrollSnapCoordinate",
  "scrollSnapDestination",
  "MozScrollSnapDestination",
  "WebkitScrollSnapDestination",
  "MSScrollSnapDestination",
  "OScrollSnapDestination",
  "scrollSnapType",
  "MozScrollSnapType",
  "WebkitScrollSnapType",
  "MSScrollSnapType",
  "OScrollSnapType",
  "shapeImageThreshold",
  "MozShapeImageThreshold",
  "WebkitShapeImageThreshold",
  "MSShapeImageThreshold",
  "OShapeImageThreshold",
  "shapeMargin",
  "MozShapeMargin",
  "WebkitShapeMargin",
  "MSShapeMargin",
  "OShapeMargin",
  "shapeOutside",
  "MozShapeOutside",
  "WebkitShapeOutside",
  "MSShapeOutside",
  "OShapeOutside",
  "tabSize",
  "MozTabSize",
  "WebkitTabSize",
  "MSTabSize",
  "OTabSize",
  "tableLayout",
  "MozTableLayout",
  "WebkitTableLayout",
  "MSTableLayout",
  "OTableLayout",
  "textAlign",
  "MozTextAlign",
  "WebkitTextAlign",
  "MSTextAlign",
  "OTextAlign",
  "textAlignLast",
  "MozTextAlignLast",
  "WebkitTextAlignLast",
  "MSTextAlignLast",
  "OTextAlignLast",
  "textCombineUpright",
  "MozTextCombineUpright",
  "WebkitTextCombineUpright",
  "MSTextCombineUpright",
  "OTextCombineUpright",
  "textDecoration",
  "MozTextDecoration",
  "WebkitTextDecoration",
  "MSTextDecoration",
  "OTextDecoration",
  "textDecorationColor",
  "MozTextDecorationColor",
  "WebkitTextDecorationColor",
  "MSTextDecorationColor",
  "OTextDecorationColor",
  "textDecorationLine",
  "MozTextDecorationLine",
  "WebkitTextDecorationLine",
  "MSTextDecorationLine",
  "OTextDecorationLine",
  "textDecorationStyle",
  "MozTextDecorationStyle",
  "WebkitTextDecorationStyle",
  "MSTextDecorationStyle",
  "OTextDecorationStyle",
  "textEmphasis",
  "MozTextEmphasis",
  "WebkitTextEmphasis",
  "MSTextEmphasis",
  "OTextEmphasis",
  "textEmphasisColor",
  "MozTextEmphasisColor",
  "WebkitTextEmphasisColor",
  "MSTextEmphasisColor",
  "OTextEmphasisColor",
  "textEmphasisPosition",
  "MozTextEmphasisPosition",
  "WebkitTextEmphasisPosition",
  "MSTextEmphasisPosition",
  "OTextEmphasisPosition",
  "textEmphasisStyle",
  "MozTextEmphasisStyle",
  "WebkitTextEmphasisStyle",
  "MSTextEmphasisStyle",
  "OTextEmphasisStyle",
  "textIndent",
  "MozTextIndent",
  "WebkitTextIndent",
  "MSTextIndent",
  "OTextIndent",
  "textOrientation",
  "MozTextOrientation",
  "WebkitTextOrientation",
  "MSTextOrientation",
  "OTextOrientation",
  "textOverflow",
  "MozTextOverflow",
  "WebkitTextOverflow",
  "MSTextOverflow",
  "OTextOverflow",
  "textRendering",
  "MozTextRendering",
  "WebkitTextRendering",
  "MSTextRendering",
  "OTextRendering",
  "textShadow",
  "MozTextShadow",
  "WebkitTextShadow",
  "MSTextShadow",
  "OTextShadow",
  "textTransform",
  "MozTextTransform",
  "WebkitTextTransform",
  "MSTextTransform",
  "OTextTransform",
  "textUnderlinePosition",
  "MozTextUnderlinePosition",
  "WebkitTextUnderlinePosition",
  "MSTextUnderlinePosition",
  "OTextUnderlinePosition",
  "top",
  "MozTop",
  "WebkitTop",
  "MSTop",
  "OTop",
  "touchAction",
  "MozTouchAction",
  "WebkitTouchAction",
  "MSTouchAction",
  "OTouchAction",
  "transform",
  "MozTransform",
  "WebkitTransform",
  "msTransform",
  "OTransform",
  "transformBox",
  "MozTransformBox",
  "WebkitTransformBox",
  "MSTransformBox",
  "OTransformBox",
  "transformOrigin",
  "MozTransformOrigin",
  "WebkitTransformOrigin",
  "MSTransformOrigin",
  "OTransformOrigin",
  "transformStyle",
  "MozTransformStyle",
  "WebkitTransformStyle",
  "MSTransformStyle",
  "OTransformStyle",
  "transition",
  "MozTransition",
  "WebkitTransition",
  "MSTransition",
  "OTransition",
  "transitionDelay",
  "MozTransitionDelay",
  "WebkitTransitionDelay",
  "MSTransitionDelay",
  "OTransitionDelay",
  "transitionDuration",
  "MozTransitionDuration",
  "WebkitTransitionDuration",
  "MSTransitionDuration",
  "OTransitionDuration",
  "transitionProperty",
  "MozTransitionProperty",
  "WebkitTransitionProperty",
  "MSTransitionProperty",
  "OTransitionProperty",
  "transitionTimingFunction",
  "MozTransitionTimingFunction",
  "WebkitTransitionTimingFunction",
  "MSTransitionTimingFunction",
  "OTransitionTimingFunction",
  "turn",
  "MozTurn",
  "WebkitTurn",
  "MSTurn",
  "OTurn",
  "unicodeBidi",
  "MozUnicodeBidi",
  "WebkitUnicodeBidi",
  "MSUnicodeBidi",
  "OUnicodeBidi",
  "unset",
  "MozUnset",
  "WebkitUnset",
  "MSUnset",
  "OUnset",
  "verticalAlign",
  "MozVerticalAlign",
  "WebkitVerticalAlign",
  "MSVerticalAlign",
  "OVerticalAlign",
  "vh",
  "MozVh",
  "WebkitVh",
  "MSVh",
  "OVh",
  "visibility",
  "MozVisibility",
  "WebkitVisibility",
  "MSVisibility",
  "OVisibility",
  "vmax",
  "MozVmax",
  "WebkitVmax",
  "MSVmax",
  "OVmax",
  "vmin",
  "MozVmin",
  "WebkitVmin",
  "MSVmin",
  "OVmin",
  "vw",
  "MozVw",
  "WebkitVw",
  "MSVw",
  "OVw",
  "whiteSpace",
  "MozWhiteSpace",
  "WebkitWhiteSpace",
  "MSWhiteSpace",
  "OWhiteSpace",
  "widows",
  "MozWidows",
  "WebkitWidows",
  "MSWidows",
  "OWidows",
  "width",
  "MozWidth",
  "WebkitWidth",
  "MSWidth",
  "OWidth",
  "willChange",
  "MozWillChange",
  "WebkitWillChange",
  "MSWillChange",
  "OWillChange",
  "wordBreak",
  "MozWordBreak",
  "WebkitWordBreak",
  "MSWordBreak",
  "OWordBreak",
  "wordSpacing",
  "MozWordSpacing",
  "WebkitWordSpacing",
  "MSWordSpacing",
  "OWordSpacing",
  "wordWrap",
  "MozWordWrap",
  "WebkitWordWrap",
  "MSWordWrap",
  "OWordWrap",
  "writingMode",
  "MozWritingMode",
  "WebkitWritingMode",
  "MSWritingMode",
  "OWritingMode",
  "zIndex",
  "MozZIndex",
  "WebkitZIndex",
  "MSZIndex",
  "OZIndex",
  "fontSize",
  "MozFontSize",
  "WebkitFontSize",
  "MSFontSize",
  "OFontSize",
  "flex",
  "MozFlex",
  "WebkitFlex",
  "MSFlex",
  "OFlex",
  "fr",
  "MozFr",
  "WebkitFr",
  "MSFr",
  "OFr",
  "overflowScrolling",
  "MozOverflowScrolling",
  "WebkitOverflowScrolling",
  "MSOverflowScrolling",
  "OOverflowScrolling",
  "userSelect",
  "MozUserSelect",
  "WebkitUserSelect",
  "MSUserSelect",
  "OUserSelect"
];

var src = createCommonjsModule(function (module) {
module.exports = function(props, propName, componentName) {
  var styles = props[propName];
  if (!styles) {
    return;
  }

  var failures = [];
  Object.keys(styles).forEach(function(styleKey){
    if (cssProperties.indexOf(styleKey) === -1) {
      failures.push(styleKey);
    }
  });
  if (failures.length) {
    throw new Error('Prop ' + propName + ' passed to ' + componentName + '. Has invalid keys ' + failures.join(', '));
  }
};

module.exports.isRequired = function(props, propName, componentName) {
  if (!props[propName]) {
    throw new Error('Prop ' + propName + ' passed to ' + componentName + ' is required');
  }
  return module.exports(props, propName, componentName);
};

module.exports.supportingArrays = propTypes.oneOfType([
  propTypes.arrayOf(module.exports),
  module.exports
]);
});

var src_1 = src.isRequired;
var src_2 = src.supportingArrays;

var Pane_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _react2 = _interopRequireDefault(React);



var _propTypes2 = _interopRequireDefault(propTypes);



var _inlineStylePrefixer2 = _interopRequireDefault(dynamic);



var _reactStyleProptype2 = _interopRequireDefault(src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';
var USER_AGENT = typeof navigator !== 'undefined' ? navigator.userAgent : DEFAULT_USER_AGENT;

var Pane = function (_React$Component) {
  _inherits(Pane, _React$Component);

  function Pane(props) {
    _classCallCheck(this, Pane);

    var _this = _possibleConstructorReturn(this, (Pane.__proto__ || Object.getPrototypeOf(Pane)).call(this, props));

    _this.state = { size: _this.props.size };
    return _this;
  }

  _createClass(Pane, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          prefixer = _props.prefixer,
          split = _props.split,
          styleProps = _props.style;
      var size = this.state.size;

      var classes = ['Pane', split, className];

      var style = _extends({}, styleProps || {}, {
        flex: 1,
        position: 'relative',
        outline: 'none'
      });

      if (size !== undefined) {
        if (split === 'vertical') {
          style.width = size;
        } else {
          style.height = size;
          style.display = 'flex';
        }
        style.flex = 'none';
      }

      return _react2.default.createElement(
        'div',
        { className: classes.join(' '), style: prefixer.prefix(style) },
        children
      );
    }
  }]);

  return Pane;
}(_react2.default.Component);

Pane.propTypes = {
  className: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.node.isRequired,
  prefixer: _propTypes2.default.instanceOf(_inlineStylePrefixer2.default).isRequired,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  split: _propTypes2.default.oneOf(['vertical', 'horizontal']),
  style: _reactStyleProptype2.default
};

Pane.defaultProps = {
  prefixer: new _inlineStylePrefixer2.default({ userAgent: USER_AGENT })
};

exports.default = Pane;
module.exports = exports['default'];
});

unwrapExports(Pane_1);

var Resizer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RESIZER_DEFAULT_CLASSNAME = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _react2 = _interopRequireDefault(React);



var _propTypes2 = _interopRequireDefault(propTypes);



var _inlineStylePrefixer2 = _interopRequireDefault(dynamic);



var _reactStyleProptype2 = _interopRequireDefault(src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';
var USER_AGENT = typeof navigator !== 'undefined' ? navigator.userAgent : DEFAULT_USER_AGENT;
var RESIZER_DEFAULT_CLASSNAME = exports.RESIZER_DEFAULT_CLASSNAME = 'Resizer';

var Resizer = function (_React$Component) {
  _inherits(Resizer, _React$Component);

  function Resizer() {
    _classCallCheck(this, Resizer);

    return _possibleConstructorReturn(this, (Resizer.__proto__ || Object.getPrototypeOf(Resizer)).apply(this, arguments));
  }

  _createClass(Resizer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          _onClick = _props.onClick,
          _onDoubleClick = _props.onDoubleClick,
          _onMouseDown = _props.onMouseDown,
          _onTouchEnd = _props.onTouchEnd,
          _onTouchStart = _props.onTouchStart,
          prefixer = _props.prefixer,
          resizerClassName = _props.resizerClassName,
          split = _props.split,
          style = _props.style;

      var classes = [resizerClassName, split, className];

      return _react2.default.createElement('span', {
        className: classes.join(' '),
        style: prefixer.prefix(style) || {},
        onMouseDown: function onMouseDown(event) {
          return _onMouseDown(event);
        },
        onTouchStart: function onTouchStart(event) {
          event.preventDefault();
          _onTouchStart(event);
        },
        onTouchEnd: function onTouchEnd(event) {
          event.preventDefault();
          _onTouchEnd(event);
        },
        onClick: function onClick(event) {
          if (_onClick) {
            event.preventDefault();
            _onClick(event);
          }
        },
        onDoubleClick: function onDoubleClick(event) {
          if (_onDoubleClick) {
            event.preventDefault();
            _onDoubleClick(event);
          }
        }
      });
    }
  }]);

  return Resizer;
}(_react2.default.Component);

Resizer.propTypes = {
  className: _propTypes2.default.string.isRequired,
  onClick: _propTypes2.default.func,
  onDoubleClick: _propTypes2.default.func,
  onMouseDown: _propTypes2.default.func.isRequired,
  onTouchStart: _propTypes2.default.func.isRequired,
  onTouchEnd: _propTypes2.default.func.isRequired,
  prefixer: _propTypes2.default.instanceOf(_inlineStylePrefixer2.default).isRequired,
  split: _propTypes2.default.oneOf(['vertical', 'horizontal']),
  style: _reactStyleProptype2.default,
  resizerClassName: _propTypes2.default.string.isRequired
};

Resizer.defaultProps = {
  prefixer: new _inlineStylePrefixer2.default({ userAgent: USER_AGENT }),
  resizerClassName: RESIZER_DEFAULT_CLASSNAME
};

exports.default = Resizer;
});

unwrapExports(Resizer_1);
var Resizer_2 = Resizer_1.RESIZER_DEFAULT_CLASSNAME;

var SplitPane_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _react2 = _interopRequireDefault(React);



var _propTypes2 = _interopRequireDefault(propTypes);



var _reactDom2 = _interopRequireDefault(ReactDOM);



var _inlineStylePrefixer2 = _interopRequireDefault(dynamic);



var _reactStyleProptype2 = _interopRequireDefault(src);



var _Pane2 = _interopRequireDefault(Pane_1);



var _Resizer2 = _interopRequireDefault(Resizer_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';
var USER_AGENT = typeof navigator !== 'undefined' ? navigator.userAgent : DEFAULT_USER_AGENT;

function unFocus(document, window) {
  if (document.selection) {
    document.selection.empty();
  } else {
    try {
      window.getSelection().removeAllRanges();
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

var SplitPane = function (_React$Component) {
  _inherits(SplitPane, _React$Component);

  function SplitPane() {
    _classCallCheck(this, SplitPane);

    var _this = _possibleConstructorReturn(this, (SplitPane.__proto__ || Object.getPrototypeOf(SplitPane)).call(this));

    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onTouchStart = _this.onTouchStart.bind(_this);
    _this.onMouseMove = _this.onMouseMove.bind(_this);
    _this.onTouchMove = _this.onTouchMove.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);

    _this.state = {
      active: false,
      resized: false
    };
    return _this;
  }

  _createClass(SplitPane, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setSize(this.props, this.state);
      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('touchmove', this.onTouchMove);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setSize(props, this.state);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('touchmove', this.onTouchMove);
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(event) {
      var eventWithTouches = _extends({}, event, {
        touches: [{ clientX: event.clientX, clientY: event.clientY }]
      });
      this.onTouchStart(eventWithTouches);
    }
  }, {
    key: 'onTouchStart',
    value: function onTouchStart(event) {
      var _props = this.props,
          allowResize = _props.allowResize,
          onDragStarted = _props.onDragStarted,
          split = _props.split;

      if (allowResize) {
        unFocus(document, window);
        var position = split === 'vertical' ? event.touches[0].clientX : event.touches[0].clientY;

        if (typeof onDragStarted === 'function') {
          onDragStarted();
        }
        this.setState({
          active: true,
          position: position
        });
      }
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(event) {
      var eventWithTouches = _extends({}, event, {
        touches: [{ clientX: event.clientX, clientY: event.clientY }]
      });
      this.onTouchMove(eventWithTouches);
    }
  }, {
    key: 'onTouchMove',
    value: function onTouchMove(event) {
      var _props2 = this.props,
          allowResize = _props2.allowResize,
          maxSize = _props2.maxSize,
          minSize = _props2.minSize,
          onChange = _props2.onChange,
          split = _props2.split,
          step = _props2.step;
      var _state = this.state,
          active = _state.active,
          position = _state.position;

      if (allowResize && active) {
        unFocus(document, window);
        var isPrimaryFirst = this.props.primary === 'first';
        var ref = isPrimaryFirst ? this.pane1 : this.pane2;
        var ref2 = isPrimaryFirst ? this.pane2 : this.pane1;
        if (ref) {
          var node = _reactDom2.default.findDOMNode(ref);
          var node2 = _reactDom2.default.findDOMNode(ref2);

          if (node.getBoundingClientRect) {
            var width = node.getBoundingClientRect().width;
            var height = node.getBoundingClientRect().height;
            var current = split === 'vertical' ? event.touches[0].clientX : event.touches[0].clientY;
            var size = split === 'vertical' ? width : height;
            var positionDelta = position - current;
            if (step) {
              if (Math.abs(positionDelta) < step) {
                return;
              }
              // Integer division
              // eslint-disable-next-line no-bitwise
              positionDelta = ~~(positionDelta / step) * step;
            }
            var sizeDelta = isPrimaryFirst ? positionDelta : -positionDelta;

            var pane1Order = parseInt(window.getComputedStyle(node).order);
            var pane2Order = parseInt(window.getComputedStyle(node2).order);
            if (pane1Order > pane2Order) {
              sizeDelta = -sizeDelta;
            }

            var newMaxSize = maxSize;
            if (maxSize !== undefined && maxSize <= 0) {
              var splPane = this.splitPane;
              if (split === 'vertical') {
                newMaxSize = splPane.getBoundingClientRect().width + maxSize;
              } else {
                newMaxSize = splPane.getBoundingClientRect().height + maxSize;
              }
            }

            var newSize = size - sizeDelta;
            var newPosition = position - positionDelta;

            if (newSize < minSize) {
              newSize = minSize;
            } else if (maxSize !== undefined && newSize > newMaxSize) {
              newSize = newMaxSize;
            } else {
              this.setState({
                position: newPosition,
                resized: true
              });
            }

            if (onChange) onChange(newSize);
            this.setState({ draggedSize: newSize });
            ref.setState({ size: newSize });
          }
        }
      }
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp() {
      var _props3 = this.props,
          allowResize = _props3.allowResize,
          onDragFinished = _props3.onDragFinished;
      var _state2 = this.state,
          active = _state2.active,
          draggedSize = _state2.draggedSize;

      if (allowResize && active) {
        if (typeof onDragFinished === 'function') {
          onDragFinished(draggedSize);
        }
        this.setState({ active: false });
      }
    }
  }, {
    key: 'setSize',
    value: function setSize(props, state) {
      var isPrimaryFirst = props.primary === 'first';
      var ref = isPrimaryFirst ? this.pane1 : this.pane2;
      var ref2 = isPrimaryFirst ? this.pane2 : this.pane1;
      var newSize = void 0;
      if (ref) {
        newSize = props.size || state && state.draggedSize || props.defaultSize || props.minSize;
        ref.setState({
          size: newSize
        });
        if (props.size !== state.draggedSize) {
          this.setState({
            draggedSize: newSize
          });
        }
      }
      if (ref2 && props.primary !== this.props.primary) {
        ref2.setState({
          size: undefined
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props4 = this.props,
          allowResize = _props4.allowResize,
          children = _props4.children,
          className = _props4.className,
          defaultSize = _props4.defaultSize,
          minSize = _props4.minSize,
          onResizerClick = _props4.onResizerClick,
          onResizerDoubleClick = _props4.onResizerDoubleClick,
          paneClassName = _props4.paneClassName,
          pane1ClassName = _props4.pane1ClassName,
          pane2ClassName = _props4.pane2ClassName,
          paneStyle = _props4.paneStyle,
          pane1StyleProps = _props4.pane1Style,
          pane2StyleProps = _props4.pane2Style,
          primary = _props4.primary,
          prefixer = _props4.prefixer,
          resizerClassName = _props4.resizerClassName,
          resizerStyle = _props4.resizerStyle,
          size = _props4.size,
          split = _props4.split,
          styleProps = _props4.style;

      var disabledClass = allowResize ? '' : 'disabled';
      var resizerClassNamesIncludingDefault = resizerClassName ? resizerClassName + ' ' + Resizer_1.RESIZER_DEFAULT_CLASSNAME : resizerClassName;

      var style = _extends({}, {
        display: 'flex',
        flex: 1,
        height: '100%',
        position: 'absolute',
        outline: 'none',
        overflow: 'hidden',
        MozUserSelect: 'text',
        WebkitUserSelect: 'text',
        msUserSelect: 'text',
        userSelect: 'text'
      }, styleProps || {});

      if (split === 'vertical') {
        _extends(style, {
          flexDirection: 'row',
          left: 0,
          right: 0
        });
      } else {
        _extends(style, {
          bottom: 0,
          flexDirection: 'column',
          minHeight: '100%',
          top: 0,
          width: '100%'
        });
      }

      var classes = ['SplitPane', className, split, disabledClass];
      var pane1Style = prefixer.prefix(_extends({}, paneStyle || {}, pane1StyleProps || {}));
      var pane2Style = prefixer.prefix(_extends({}, paneStyle || {}, pane2StyleProps || {}));

      var pane1Classes = ['Pane1', paneClassName, pane1ClassName].join(' ');
      var pane2Classes = ['Pane2', paneClassName, pane2ClassName].join(' ');

      return _react2.default.createElement(
        'div',
        {
          className: classes.join(' '),
          ref: function ref(node) {
            _this2.splitPane = node;
          },
          style: prefixer.prefix(style)
        },
        _react2.default.createElement(
          _Pane2.default,
          {
            className: pane1Classes,
            key: 'pane1',
            ref: function ref(node) {
              _this2.pane1 = node;
            },
            size: primary === 'first' ? size || defaultSize || minSize : undefined,
            split: split,
            style: pane1Style
          },
          children[0]
        ),
        _react2.default.createElement(_Resizer2.default, {
          className: disabledClass,
          onClick: onResizerClick,
          onDoubleClick: onResizerDoubleClick,
          onMouseDown: this.onMouseDown,
          onTouchStart: this.onTouchStart,
          onTouchEnd: this.onMouseUp,
          key: 'resizer',
          ref: function ref(node) {
            _this2.resizer = node;
          },
          resizerClassName: resizerClassNamesIncludingDefault,
          split: split,
          style: resizerStyle || {}
        }),
        _react2.default.createElement(
          _Pane2.default,
          {
            className: pane2Classes,
            key: 'pane2',
            ref: function ref(node) {
              _this2.pane2 = node;
            },
            size: primary === 'second' ? size || defaultSize || minSize : undefined,
            split: split,
            style: pane2Style
          },
          children[1]
        )
      );
    }
  }]);

  return SplitPane;
}(_react2.default.Component);

SplitPane.propTypes = {
  allowResize: _propTypes2.default.bool,
  children: _propTypes2.default.arrayOf(_propTypes2.default.node).isRequired,
  className: _propTypes2.default.string,
  primary: _propTypes2.default.oneOf(['first', 'second']),
  minSize: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  maxSize: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  // eslint-disable-next-line react/no-unused-prop-types
  defaultSize: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  split: _propTypes2.default.oneOf(['vertical', 'horizontal']),
  onDragStarted: _propTypes2.default.func,
  onDragFinished: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onResizerClick: _propTypes2.default.func,
  onResizerDoubleClick: _propTypes2.default.func,
  prefixer: _propTypes2.default.instanceOf(_inlineStylePrefixer2.default).isRequired,
  style: _reactStyleProptype2.default,
  resizerStyle: _reactStyleProptype2.default,
  paneClassName: _propTypes2.default.string,
  pane1ClassName: _propTypes2.default.string,
  pane2ClassName: _propTypes2.default.string,
  paneStyle: _reactStyleProptype2.default,
  pane1Style: _reactStyleProptype2.default,
  pane2Style: _reactStyleProptype2.default,
  resizerClassName: _propTypes2.default.string,
  step: _propTypes2.default.number
};

SplitPane.defaultProps = {
  allowResize: true,
  minSize: 50,
  prefixer: new _inlineStylePrefixer2.default({ userAgent: USER_AGENT }),
  primary: 'first',
  split: 'vertical',
  paneClassName: '',
  pane1ClassName: '',
  pane2ClassName: ''
};

exports.default = SplitPane;
module.exports = exports['default'];
});

unwrapExports(SplitPane_1);

var reactSplitPane = SplitPane_1;

ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(acequire, exports, module) {
var oop = acequire("../lib/oop");
var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;

var DocCommentHighlightRules = function() {
    this.$rules = {
        "start" : [ {
            token : "comment.doc.tag",
            regex : "@[\\w\\d_]+" // TODO: fix email addresses
        }, 
        DocCommentHighlightRules.getTagRule(),
        {
            defaultToken : "comment.doc",
            caseInsensitive: true
        }]
    };
};

oop.inherits(DocCommentHighlightRules, TextHighlightRules);

DocCommentHighlightRules.getTagRule = function(start) {
    return {
        token : "comment.doc.tag.storage.type",
        regex : "\\b(?:TODO|FIXME|XXX|HACK)\\b"
    };
};

DocCommentHighlightRules.getStartRule = function(start) {
    return {
        token : "comment.doc", // doc comment
        regex : "\\/\\*(?=\\*)",
        next  : start
    };
};

DocCommentHighlightRules.getEndRule = function (start) {
    return {
        token : "comment.doc", // closing comment
        regex : "\\*\\/",
        next  : start
    };
};


exports.DocCommentHighlightRules = DocCommentHighlightRules;

});

ace.define("ace/mode/mysql_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"], function(acequire, exports, module) {

var oop = acequire("../lib/oop");
var lang = acequire("../lib/lang");
var DocCommentHighlightRules = acequire("./doc_comment_highlight_rules").DocCommentHighlightRules;
var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;

var MysqlHighlightRules = function() {

    var mySqlKeywords = /*sql*/ "alter|and|as|asc|between|count|create|delete|desc|distinct|drop|from|having|in|insert|into|is|join|like|not|on|or|order|select|set|table|union|update|values|where" + "|accessible|action|add|after|algorithm|all|analyze|asensitive|at|authors|auto_increment|autocommit|avg|avg_row_length|before|binary|binlog|both|btree|cache|call|cascade|cascaded|case|catalog_name|chain|change|changed|character|check|checkpoint|checksum|class_origin|client_statistics|close|coalesce|code|collate|collation|collations|column|columns|comment|commit|committed|completion|concurrent|condition|connection|consistent|constraint|contains|continue|contributors|convert|cross|current_date|current_time|current_timestamp|current_user|cursor|data|database|databases|day_hour|day_microsecond|day_minute|day_second|deallocate|dec|declare|default|delay_key_write|delayed|delimiter|des_key_file|describe|deterministic|dev_pop|dev_samp|deviance|directory|disable|discard|distinctrow|div|dual|dumpfile|each|elseif|enable|enclosed|end|ends|engine|engines|enum|errors|escape|escaped|even|event|events|every|execute|exists|exit|explain|extended|fast|fetch|field|fields|first|flush|for|force|foreign|found_rows|full|fulltext|function|general|global|grant|grants|group|groupby_concat|handler|hash|help|high_priority|hosts|hour_microsecond|hour_minute|hour_second|if|ignore|ignore_server_ids|import|index|index_statistics|infile|inner|innodb|inout|insensitive|insert_method|install|interval|invoker|isolation|iterate|key|keys|kill|language|last|leading|leave|left|level|limit|linear|lines|list|load|local|localtime|localtimestamp|lock|logs|low_priority|master|master_heartbeat_period|master_ssl_verify_server_cert|masters|match|max|max_rows|maxvalue|message_text|middleint|migrate|min|min_rows|minute_microsecond|minute_second|mod|mode|modifies|modify|mutex|mysql_errno|natural|next|no|no_write_to_binlog|offline|offset|one|online|open|optimize|option|optionally|out|outer|outfile|pack_keys|parser|partition|partitions|password|phase|plugin|plugins|prepare|preserve|prev|primary|privileges|procedure|processlist|profile|profiles|purge|query|quick|range|read|read_write|reads|real|rebuild|recover|references|regexp|relaylog|release|remove|rename|reorganize|repair|repeatable|replace|acequire|resignal|restrict|resume|return|returns|revoke|right|rlike|rollback|rollup|row|row_format|rtree|savepoint|schedule|schema|schema_name|schemas|second_microsecond|security|sensitive|separator|serializable|server|session|share|show|signal|slave|slow|smallint|snapshot|soname|spatial|specific|sql|sql_big_result|sql_buffer_result|sql_cache|sql_calc_found_rows|sql_no_cache|sql_small_result|sqlexception|sqlstate|sqlwarning|ssl|start|starting|starts|status|std|stddev|stddev_pop|stddev_samp|storage|straight_join|subclass_origin|sum|suspend|table_name|table_statistics|tables|tablespace|temporary|terminated|to|trailing|transaction|trigger|triggers|truncate|uncommitted|undo|uninstall|unique|unlock|upgrade|usage|use|use_frm|user|user_resources|user_statistics|using|utc_date|utc_time|utc_timestamp|value|variables|varying|view|views|warnings|when|while|with|work|write|xa|xor|year_month|zerofill|begin|do|then|else|loop|repeat";
    var builtins = "by|bool|boolean|bit|blob|decimal|double|enum|float|long|longblob|longtext|medium|mediumblob|mediumint|mediumtext|time|timestamp|tinyblob|tinyint|tinytext|text|bigint|int|int1|int2|int3|int4|int8|integer|float|float4|float8|double|char|varbinary|varchar|varcharacter|precision|date|datetime|year|unsigned|signed|numeric|ucase|lcase|mid|len|round|rank|now|format|coalesce|ifnull|isnull|nvl";
    var variable = "charset|clear|connect|edit|ego|exit|go|help|nopager|notee|nowarning|pager|print|prompt|quit|rehash|source|status|system|tee";

    var keywordMapper = this.createKeywordMapper({
        "support.function": builtins,
        "keyword": mySqlKeywords,
        "constant": "false|true|null|unknown|date|time|timestamp|ODBCdotTable|zerolessFloat",
        "variable.language": variable
    }, "identifier", true);

    
    function string(rule) {
        var start = rule.start;
        var escapeSeq = rule.escape;
        return {
            token: "string.start",
            regex: start,
            next: [
                {token: "constant.language.escape", regex: escapeSeq},
                {token: "string.end", next: "start", regex: start},
                {defaultToken: "string"}
            ]
        };
    }

    this.$rules = {
        "start" : [ {
            token : "comment", regex : "(?:-- |#).*$"
        },  
        string({start: '"', escape: /\\[0'"bnrtZ\\%_]?/}),
        string({start: "'", escape: /\\[0'"bnrtZ\\%_]?/}),
        DocCommentHighlightRules.getStartRule("doc-start"),
        {
            token : "comment", // multi line comment
            regex : /\/\*/,
            next : "comment"
        }, {
            token : "constant.numeric", // hex
            regex : /0[xX][0-9a-fA-F]+|[xX]'[0-9a-fA-F]+'|0[bB][01]+|[bB]'[01]+'/
        }, {
            token : "constant.numeric", // float
            regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
        }, {
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "constant.class",
            regex : "@@?[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "constant.buildin",
            regex : "`[^`]*`"
        }, {
            token : "keyword.operator",
            regex : "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
        }, {
            token : "paren.lparen",
            regex : "[\\(]"
        }, {
            token : "paren.rparen",
            regex : "[\\)]"
        }, {
            token : "text",
            regex : "\\s+"
        } ],
        "comment" : [
            {token : "comment", regex : "\\*\\/", next : "start"},
            {defaultToken : "comment"}
        ]
    };

    this.embedRules(DocCommentHighlightRules, "doc-", [ DocCommentHighlightRules.getEndRule("start") ]);
    this.normalizeRules();
};

oop.inherits(MysqlHighlightRules, TextHighlightRules);

exports.MysqlHighlightRules = MysqlHighlightRules;
});

ace.define("ace/mode/mysql",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/mysql_highlight_rules"], function(acequire, exports, module) {

var oop = acequire("../lib/oop");
var TextMode = acequire("../mode/text").Mode;
var MysqlHighlightRules = acequire("./mysql_highlight_rules").MysqlHighlightRules;

var Mode = function() {
    this.HighlightRules = MysqlHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {       
    this.lineCommentStart = ["--", "#"]; // todo space
    this.blockComment = {start: "/*", end: "*/"};

    this.$id = "ace/mode/mysql";
}).call(Mode.prototype);

exports.Mode = Mode;
});

ace.define("ace/theme/xcode",["require","exports","module","ace/lib/dom"], function(acequire, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-xcode";
exports.cssText = "\
.ace-xcode .ace_gutter {\
background: #e8e8e8;\
color: #333\
}\
.ace-xcode .ace_print-margin {\
width: 1px;\
background: #e8e8e8\
}\
.ace-xcode {\
background-color: #FFFFFF;\
color: #000000\
}\
.ace-xcode .ace_cursor {\
color: #000000\
}\
.ace-xcode .ace_marker-layer .ace_selection {\
background: #B5D5FF\
}\
.ace-xcode.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #FFFFFF;\
}\
.ace-xcode .ace_marker-layer .ace_step {\
background: rgb(198, 219, 174)\
}\
.ace-xcode .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #BFBFBF\
}\
.ace-xcode .ace_marker-layer .ace_active-line {\
background: rgba(0, 0, 0, 0.071)\
}\
.ace-xcode .ace_gutter-active-line {\
background-color: rgba(0, 0, 0, 0.071)\
}\
.ace-xcode .ace_marker-layer .ace_selected-word {\
border: 1px solid #B5D5FF\
}\
.ace-xcode .ace_constant.ace_language,\
.ace-xcode .ace_keyword,\
.ace-xcode .ace_meta,\
.ace-xcode .ace_variable.ace_language {\
color: #C800A4\
}\
.ace-xcode .ace_invisible {\
color: #BFBFBF\
}\
.ace-xcode .ace_constant.ace_character,\
.ace-xcode .ace_constant.ace_other {\
color: #275A5E\
}\
.ace-xcode .ace_constant.ace_numeric {\
color: #3A00DC\
}\
.ace-xcode .ace_entity.ace_other.ace_attribute-name,\
.ace-xcode .ace_support.ace_constant,\
.ace-xcode .ace_support.ace_function {\
color: #450084\
}\
.ace-xcode .ace_fold {\
background-color: #C800A4;\
border-color: #000000\
}\
.ace-xcode .ace_entity.ace_name.ace_tag,\
.ace-xcode .ace_support.ace_class,\
.ace-xcode .ace_support.ace_type {\
color: #790EAD\
}\
.ace-xcode .ace_storage {\
color: #C900A4\
}\
.ace-xcode .ace_string {\
color: #DF0002\
}\
.ace-xcode .ace_comment {\
color: #008E00\
}\
.ace-xcode .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==) right repeat-y\
}";

var dom = acequire("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});

//import brace from 'brace';
var QueryBuilder = function (_React$Component) {
  inherits(QueryBuilder, _React$Component);

  function QueryBuilder(props) {
    classCallCheck(this, QueryBuilder);

    var _this = possibleConstructorReturn(this, (QueryBuilder.__proto__ || Object.getPrototypeOf(QueryBuilder)).call(this, props));

    _this.state = {
      sql: _this.props.value.included[0].attributes.sql,
      finalSql: _this.props.value.included[0].attributes.finalSql
    };

    _this.updateCode = _this.updateCode.bind(_this);
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
      var _this2 = this;

      this.setState({
        sql: newSql
      });

      be5.net.request('queryBuilder', { sql: newSql, _ts_: new Date().getTime(), values: this.props.value.params }, function (json) {
        _this2.update(json);
      });
    }
  }, {
    key: 'update',
    value: function update(json) {
      this.setState({
        finalSql: json.included[0].attributes.finalSql
      });
      Tables._performData(json, 'queryBuilder-table');
    }
  }, {
    key: 'render',
    value: function render() {

      return React.createElement(
        'div',
        { className: 'queryBuilder' },
        React.createElement(
          'h1',
          null,
          'Query Builder'
        ),
        React.createElement(
          reactSplitPane,
          { split: 'horizontal', defaultSize: 300 },
          React.createElement(AceEditor, {
            value: this.state.sql,
            mode: 'mysql',
            theme: 'xcode',
            fontSize: 13,
            onChange: this.updateCode,
            name: 'UNIQUE_ID_OF_DIV',
            width: '100%',
            height: '100%',
            editorProps: {
              $blockScrolling: true,
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2
            }
          }),
          React.createElement(
            'div',
            null,
            React.createElement('br', null),
            React.createElement(Document, { frontendParams: { documentName: "queryBuilder-table" } }),
            React.createElement(
              'h2',
              null,
              'Final sql'
            ),
            React.createElement(
              'pre',
              null,
              this.state.finalSql
            )
          )
        )
      );
      //<button>Выполнить</button>
    }
  }]);
  return QueryBuilder;
}(React.Component);

var action$12 = function action(documentName, params) {
  var requestParams = {
    values: be5.net.paramString(params),
    _ts_: new Date().getTime()
  };

  be5.net.request('queryBuilder', requestParams, function (data) {
    changeDocument(documentName, { component: QueryBuilder, value: Object.assign({}, data, { params: be5.net.paramString(params) }) });
  });
};

actionsCollection.registerAction("qBuilder", action$12);

var action$14 = function action(documentName, text) {
  changeDocument(documentName, { value: text });
};

actionsCollection.registerAction("text", action$14);

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
              React.createElement(Document, { frontendParams: { documentName: this.props.documentName } })
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
  value: propTypes.string,
  documentName: propTypes.string,
  isOpen: propTypes.bool,
  tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
  className: propTypes.node
};

HelpInfo.defaultProps = {
  isOpen: false,
  tag: 'div',
  documentName: "helpInfo"
};

var TableForm = function (_React$Component) {
  inherits(TableForm, _React$Component);

  function TableForm() {
    classCallCheck(this, TableForm);

    var _this = possibleConstructorReturn(this, (TableForm.__proto__ || Object.getPrototypeOf(TableForm)).call(this));

    _this.state = { helpCollapse: false };
    return _this;
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

      changeDocument("table", { component: Table, value: this.props.value });

      //unused
      // const attr = this.props.value.data.attributes;
      // if(attr.layout.defaultOperation !== undefined){
      //   //console.log("attributes.layout.defaultOperation: " + attributes.layout.defaultOperation);
      //   //TODO вместо замены старой формы на StaticPage.createValue('', ''), делать все поля READ_ONLY и кнопку disabled
      //   //changeDocument("form", { component: StaticPage, value: StaticPage.createValue('', '')}); - баг форма пропадает, ошибки обновления
      //
      //   const params = {
      //     entity: attr.category,
      //     query: attr.page || 'All records',
      //     operation: attr.layout.defaultOperation,
      //     values: {},
      //     operationParams: attr.parameters
      //   };
      //
      //   forms.load(params, {documentName: "form", parentDocumentName: "table"});
      // }else{
      //   changeDocument("form", {
      //     component: StaticPage,
      //     value: StaticPage.createValue('', attr.layout.textInFormDocument || "")
      //   });
      // }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'table-form' },
        React.createElement(Document, { frontendParams: { documentName: "table", operationDocumentName: "form" } }),
        React.createElement(HelpInfo, { value: this.props.value.data.attributes.layout.helpInfo }),
        React.createElement(Document, { frontendParams: { documentName: "form" } })
      );
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      if (this.props.value.links.self !== undefined) {
        be5.url.process(this.props.frontendParams.documentName, "#!" + this.props.value.links.self);
      }
    }
  }]);
  return TableForm;
}(React.Component);

tablesCollection.registerTable('tableForm', TableForm);

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
          React.createElement(Document, { frontendParams: { documentName: "table", operationDocumentName: "form" } })
        ),
        React.createElement(
          'div',
          { className: 'col-lg-6' },
          React.createElement(Document, { frontendParams: { documentName: "form" } })
        )
      );
    }
  }]);
  return TableFormRow;
}(TableForm);

tablesCollection.registerTable('tableFormRow', TableFormRow);

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
        React.createElement(Document, { frontendParams: { documentName: "form" } }),
        React.createElement(Document, { frontendParams: { documentName: "table", operationDocumentName: "form" } })
      );
    }
  }]);
  return FormTable;
}(TableForm);

tablesCollection.registerTable('formTable', FormTable);

function extend(dest, src) {
  if (src) {
    var props = Object.keys(src);
    for (var i = 0, l = props.length; i < l ; i++) {
      dest[props[i]] = src[props[i]];
    }
  }
  return dest
}

function copy(obj) {
  return extend({}, obj)
}

/**
 * Merge an object defining format characters into the defaults.
 * Passing null/undefined for en existing format character removes it.
 * Passing a definition for an existing format character overrides it.
 * @param {?Object} formatCharacters.
 */
function mergeFormatCharacters(formatCharacters) {
  var merged = copy(DEFAULT_FORMAT_CHARACTERS);
  if (formatCharacters) {
    var chars = Object.keys(formatCharacters);
    for (var i = 0, l = chars.length; i < l ; i++) {
      var char = chars[i];
      if (formatCharacters[char] == null) {
        delete merged[char];
      }
      else {
        merged[char] = formatCharacters[char];
      }
    }
  }
  return merged
}

var ESCAPE_CHAR = '\\';

var DIGIT_RE = /^\d$/;
var LETTER_RE = /^[A-Za-z]$/;
var ALPHANNUMERIC_RE = /^[\dA-Za-z]$/;

var DEFAULT_PLACEHOLDER_CHAR = '_';
var DEFAULT_FORMAT_CHARACTERS = {
  '*': {
    validate: function(char) { return ALPHANNUMERIC_RE.test(char) }
  },
  '1': {
    validate: function(char) { return DIGIT_RE.test(char) }
  },
  'a': {
    validate: function(char) { return LETTER_RE.test(char) }
  },
  'A': {
    validate: function(char) { return LETTER_RE.test(char) },
    transform: function(char) { return char.toUpperCase() }
  },
  '#': {
    validate: function(char) { return ALPHANNUMERIC_RE.test(char) },
    transform: function(char) { return char.toUpperCase() }
  }
};

/**
 * @param {string} source
 * @patam {?Object} formatCharacters
 */
function Pattern(source, formatCharacters, placeholderChar, isRevealingMask) {
  if (!(this instanceof Pattern)) {
    return new Pattern(source, formatCharacters, placeholderChar)
  }

  /** Placeholder character */
  this.placeholderChar = placeholderChar || DEFAULT_PLACEHOLDER_CHAR;
  /** Format character definitions. */
  this.formatCharacters = formatCharacters || DEFAULT_FORMAT_CHARACTERS;
  /** Pattern definition string with escape characters. */
  this.source = source;
  /** Pattern characters after escape characters have been processed. */
  this.pattern = [];
  /** Length of the pattern after escape characters have been processed. */
  this.length = 0;
  /** Index of the first editable character. */
  this.firstEditableIndex = null;
  /** Index of the last editable character. */
  this.lastEditableIndex = null;
  /** Lookup for indices of editable characters in the pattern. */
  this._editableIndices = {};
  /** If true, only the pattern before the last valid value character shows. */
  this.isRevealingMask = isRevealingMask || false;

  this._parse();
}

Pattern.prototype._parse = function parse() {
  var sourceChars = this.source.split('');
  var patternIndex = 0;
  var pattern = [];

  for (var i = 0, l = sourceChars.length; i < l; i++) {
    var char = sourceChars[i];
    if (char === ESCAPE_CHAR) {
      if (i === l - 1) {
        throw new Error('InputMask: pattern ends with a raw ' + ESCAPE_CHAR)
      }
      char = sourceChars[++i];
    }
    else if (char in this.formatCharacters) {
      if (this.firstEditableIndex === null) {
        this.firstEditableIndex = patternIndex;
      }
      this.lastEditableIndex = patternIndex;
      this._editableIndices[patternIndex] = true;
    }

    pattern.push(char);
    patternIndex++;
  }

  if (this.firstEditableIndex === null) {
    throw new Error(
      'InputMask: pattern "' + this.source + '" does not contain any editable characters.'
    )
  }

  this.pattern = pattern;
  this.length = pattern.length;
};

/**
 * @param {Array<string>} value
 * @return {Array<string>}
 */
Pattern.prototype.formatValue = function format(value) {
  var valueBuffer = new Array(this.length);
  var valueIndex = 0;

  for (var i = 0, l = this.length; i < l ; i++) {
    if (this.isEditableIndex(i)) {
      if (this.isRevealingMask &&
          value.length <= valueIndex &&
          !this.isValidAtIndex(value[valueIndex], i)) {
        break
      }
      valueBuffer[i] = (value.length > valueIndex && this.isValidAtIndex(value[valueIndex], i)
                        ? this.transform(value[valueIndex], i)
                        : this.placeholderChar);
      valueIndex++;
    }
    else {
      valueBuffer[i] = this.pattern[i];
      // Also allow the value to contain static values from the pattern by
      // advancing its index.
      if (value.length > valueIndex && value[valueIndex] === this.pattern[i]) {
        valueIndex++;
      }
    }
  }

  return valueBuffer
};

/**
 * @param {number} index
 * @return {boolean}
 */
Pattern.prototype.isEditableIndex = function isEditableIndex(index) {
  return !!this._editableIndices[index]
};

/**
 * @param {string} char
 * @param {number} index
 * @return {boolean}
 */
Pattern.prototype.isValidAtIndex = function isValidAtIndex(char, index) {
  return this.formatCharacters[this.pattern[index]].validate(char)
};

Pattern.prototype.transform = function transform(char, index) {
  var format = this.formatCharacters[this.pattern[index]];
  return typeof format.transform == 'function' ? format.transform(char) : char
};

function InputMask(options) {
  if (!(this instanceof InputMask)) { return new InputMask(options) }
  options = extend({
    formatCharacters: null,
    pattern: null,
    isRevealingMask: false,
    placeholderChar: DEFAULT_PLACEHOLDER_CHAR,
    selection: {start: 0, end: 0},
    value: ''
  }, options);

  if (options.pattern == null) {
    throw new Error('InputMask: you must provide a pattern.')
  }

  if (typeof options.placeholderChar !== 'string' || options.placeholderChar.length > 1) {
    throw new Error('InputMask: placeholderChar should be a single character or an empty string.')
  }

  this.placeholderChar = options.placeholderChar;
  this.formatCharacters = mergeFormatCharacters(options.formatCharacters);
  this.setPattern(options.pattern, {
    value: options.value,
    selection: options.selection,
    isRevealingMask: options.isRevealingMask
  });
}

// Editing

/**
 * Applies a single character of input based on the current selection.
 * @param {string} char
 * @return {boolean} true if a change has been made to value or selection as a
 *   result of the input, false otherwise.
 */
InputMask.prototype.input = function input(char) {
  // Ignore additional input if the cursor's at the end of the pattern
  if (this.selection.start === this.selection.end &&
      this.selection.start === this.pattern.length) {
    return false
  }

  var selectionBefore = copy(this.selection);
  var valueBefore = this.getValue();

  var inputIndex = this.selection.start;

  // If the cursor or selection is prior to the first editable character, make
  // sure any input given is applied to it.
  if (inputIndex < this.pattern.firstEditableIndex) {
    inputIndex = this.pattern.firstEditableIndex;
  }

  // Bail out or add the character to input
  if (this.pattern.isEditableIndex(inputIndex)) {
    if (!this.pattern.isValidAtIndex(char, inputIndex)) {
      return false
    }
    this.value[inputIndex] = this.pattern.transform(char, inputIndex);
  }

  // If multiple characters were selected, blank the remainder out based on the
  // pattern.
  var end = this.selection.end - 1;
  while (end > inputIndex) {
    if (this.pattern.isEditableIndex(end)) {
      this.value[end] = this.placeholderChar;
    }
    end--;
  }

  // Advance the cursor to the next character
  this.selection.start = this.selection.end = inputIndex + 1;

  // Skip over any subsequent static characters
  while (this.pattern.length > this.selection.start &&
         !this.pattern.isEditableIndex(this.selection.start)) {
    this.selection.start++;
    this.selection.end++;
  }

  // History
  if (this._historyIndex != null) {
    // Took more input after undoing, so blow any subsequent history away
    this._history.splice(this._historyIndex, this._history.length - this._historyIndex);
    this._historyIndex = null;
  }
  if (this._lastOp !== 'input' ||
      selectionBefore.start !== selectionBefore.end ||
      this._lastSelection !== null && selectionBefore.start !== this._lastSelection.start) {
    this._history.push({value: valueBefore, selection: selectionBefore, lastOp: this._lastOp});
  }
  this._lastOp = 'input';
  this._lastSelection = copy(this.selection);

  return true
};

/**
 * Attempts to delete from the value based on the current cursor position or
 * selection.
 * @return {boolean} true if the value or selection changed as the result of
 *   backspacing, false otherwise.
 */
InputMask.prototype.backspace = function backspace() {
  // If the cursor is at the start there's nothing to do
  if (this.selection.start === 0 && this.selection.end === 0) {
    return false
  }

  var selectionBefore = copy(this.selection);
  var valueBefore = this.getValue();

  // No range selected - work on the character preceding the cursor
  if (this.selection.start === this.selection.end) {
    if (this.pattern.isEditableIndex(this.selection.start - 1)) {
      this.value[this.selection.start - 1] = this.placeholderChar;
    }
    this.selection.start--;
    this.selection.end--;
  }
  // Range selected - delete characters and leave the cursor at the start of the selection
  else {
    var end = this.selection.end - 1;
    while (end >= this.selection.start) {
      if (this.pattern.isEditableIndex(end)) {
        this.value[end] = this.placeholderChar;
      }
      end--;
    }
    this.selection.end = this.selection.start;
  }

  // History
  if (this._historyIndex != null) {
    // Took more input after undoing, so blow any subsequent history away
    this._history.splice(this._historyIndex, this._history.length - this._historyIndex);
  }
  if (this._lastOp !== 'backspace' ||
      selectionBefore.start !== selectionBefore.end ||
      this._lastSelection !== null && selectionBefore.start !== this._lastSelection.start) {
    this._history.push({value: valueBefore, selection: selectionBefore, lastOp: this._lastOp});
  }
  this._lastOp = 'backspace';
  this._lastSelection = copy(this.selection);

  return true
};

/**
 * Attempts to paste a string of input at the current cursor position or over
 * the top of the current selection.
 * Invalid content at any position will cause the paste to be rejected, and it
 * may contain static parts of the mask's pattern.
 * @param {string} input
 * @return {boolean} true if the paste was successful, false otherwise.
 */
InputMask.prototype.paste = function paste(input) {
  // This is necessary because we're just calling input() with each character
  // and rolling back if any were invalid, rather than checking up-front.
  var initialState = {
    value: this.value.slice(),
    selection: copy(this.selection),
    _lastOp: this._lastOp,
    _history: this._history.slice(),
    _historyIndex: this._historyIndex,
    _lastSelection: copy(this._lastSelection)
  };

  // If there are static characters at the start of the pattern and the cursor
  // or selection is within them, the static characters must match for a valid
  // paste.
  if (this.selection.start < this.pattern.firstEditableIndex) {
    for (var i = 0, l = this.pattern.firstEditableIndex - this.selection.start; i < l; i++) {
      if (input.charAt(i) !== this.pattern.pattern[i]) {
        return false
      }
    }

    // Continue as if the selection and input started from the editable part of
    // the pattern.
    input = input.substring(this.pattern.firstEditableIndex - this.selection.start);
    this.selection.start = this.pattern.firstEditableIndex;
  }

  for (i = 0, l = input.length;
       i < l && this.selection.start <= this.pattern.lastEditableIndex;
       i++) {
    var valid = this.input(input.charAt(i));
    // Allow static parts of the pattern to appear in pasted input - they will
    // already have been stepped over by input(), so verify that the value
    // deemed invalid by input() was the expected static character.
    if (!valid) {
      if (this.selection.start > 0) {
        // XXX This only allows for one static character to be skipped
        var patternIndex = this.selection.start - 1;
        if (!this.pattern.isEditableIndex(patternIndex) &&
            input.charAt(i) === this.pattern.pattern[patternIndex]) {
          continue
        }
      }
      extend(this, initialState);
      return false
    }
  }

  return true
};

// History

InputMask.prototype.undo = function undo() {
  // If there is no history, or nothing more on the history stack, we can't undo
  if (this._history.length === 0 || this._historyIndex === 0) {
    return false
  }

  var historyItem;
  if (this._historyIndex == null) {
    // Not currently undoing, set up the initial history index
    this._historyIndex = this._history.length - 1;
    historyItem = this._history[this._historyIndex];
    // Add a new history entry if anything has changed since the last one, so we
    // can redo back to the initial state we started undoing from.
    var value = this.getValue();
    if (historyItem.value !== value ||
        historyItem.selection.start !== this.selection.start ||
        historyItem.selection.end !== this.selection.end) {
      this._history.push({value: value, selection: copy(this.selection), lastOp: this._lastOp, startUndo: true});
    }
  }
  else {
    historyItem = this._history[--this._historyIndex];
  }

  this.value = historyItem.value.split('');
  this.selection = historyItem.selection;
  this._lastOp = historyItem.lastOp;
  return true
};

InputMask.prototype.redo = function redo() {
  if (this._history.length === 0 || this._historyIndex == null) {
    return false
  }
  var historyItem = this._history[++this._historyIndex];
  // If this is the last history item, we're done redoing
  if (this._historyIndex === this._history.length - 1) {
    this._historyIndex = null;
    // If the last history item was only added to start undoing, remove it
    if (historyItem.startUndo) {
      this._history.pop();
    }
  }
  this.value = historyItem.value.split('');
  this.selection = historyItem.selection;
  this._lastOp = historyItem.lastOp;
  return true
};

// Getters & setters

InputMask.prototype.setPattern = function setPattern(pattern, options) {
  options = extend({
    selection: {start: 0, end: 0},
    value: ''
  }, options);
  this.pattern = new Pattern(pattern, this.formatCharacters, this.placeholderChar, options.isRevealingMask);
  this.setValue(options.value);
  this.emptyValue = this.pattern.formatValue([]).join('');
  this.selection = options.selection;
  this._resetHistory();
};

InputMask.prototype.setSelection = function setSelection(selection) {
  this.selection = copy(selection);
  if (this.selection.start === this.selection.end) {
    if (this.selection.start < this.pattern.firstEditableIndex) {
      this.selection.start = this.selection.end = this.pattern.firstEditableIndex;
      return true
    }
    // Set selection to the first editable, non-placeholder character before the selection
    // OR to the beginning of the pattern
    var index = this.selection.start;
    while (index >= this.pattern.firstEditableIndex) {
      if (this.pattern.isEditableIndex(index - 1) &&
          this.value[index - 1] !== this.placeholderChar ||
          index === this.pattern.firstEditableIndex) {
        this.selection.start = this.selection.end = index;
        break
      }
      index--;
    }
    return true
  }
  return false
};

InputMask.prototype.setValue = function setValue(value) {
  if (value == null) {
    value = '';
  }
  this.value = this.pattern.formatValue(value.split(''));
};

InputMask.prototype.getValue = function getValue() {
  return this.value.join('')
};

InputMask.prototype.getRawValue = function getRawValue() {
  var rawValue = [];
  for (var i = 0; i < this.value.length; i++) {
    if (this.pattern._editableIndices[i] === true) {
      rawValue.push(this.value[i]);
    }
  }
  return rawValue.join('')
};

InputMask.prototype._resetHistory = function _resetHistory() {
  this._history = [];
  this._historyIndex = null;
  this._lastOp = null;
  this._lastSelection = copy(this.selection);
};

InputMask.Pattern = Pattern;

var lib = InputMask;

var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KEYCODE_Z = 90;
var KEYCODE_Y = 89;

function isUndo(e) {
  return (e.ctrlKey || e.metaKey) && e.keyCode === (e.shiftKey ? KEYCODE_Y : KEYCODE_Z);
}

function isRedo(e) {
  return (e.ctrlKey || e.metaKey) && e.keyCode === (e.shiftKey ? KEYCODE_Z : KEYCODE_Y);
}

function getSelection(el) {
  var start, end, rangeEl, clone;

  if (el.selectionStart !== undefined) {
    start = el.selectionStart;
    end = el.selectionEnd;
  } else {
    try {
      el.focus();
      rangeEl = el.createTextRange();
      clone = rangeEl.duplicate();

      rangeEl.moveToBookmark(document.selection.createRange().getBookmark());
      clone.setEndPoint('EndToStart', rangeEl);

      start = clone.text.length;
      end = start + rangeEl.text.length;
    } catch (e) {/* not focused or not visible */}
  }

  return { start: start, end: end };
}

function setSelection(el, selection) {
  var rangeEl;

  try {
    if (el.selectionStart !== undefined) {
      el.focus();
      el.setSelectionRange(selection.start, selection.end);
    } else {
      el.focus();
      rangeEl = el.createTextRange();
      rangeEl.collapse(true);
      rangeEl.moveStart('character', selection.start);
      rangeEl.moveEnd('character', selection.end - selection.start);
      rangeEl.select();
    }
  } catch (e) {/* not focused or not visible */}
}

var MaskedInput = function (_React$Component) {
  _inherits(MaskedInput, _React$Component);

  function MaskedInput(props) {
    _classCallCheck(this, MaskedInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this._onChange = _this._onChange.bind(_this);
    _this._onKeyDown = _this._onKeyDown.bind(_this);
    _this._onPaste = _this._onPaste.bind(_this);
    _this._onKeyPress = _this._onKeyPress.bind(_this);
    return _this;
  }

  MaskedInput.prototype.componentWillMount = function componentWillMount() {
    var options = {
      pattern: this.props.mask,
      value: this.props.value,
      formatCharacters: this.props.formatCharacters
    };
    if (this.props.placeholderChar) {
      options.placeholderChar = this.props.placeholderChar;
    }
    this.mask = new lib(options);
  };

  MaskedInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.mask !== nextProps.mask && this.props.value !== nextProps.mask) {
      // if we get a new value and a new mask at the same time
      // check if the mask.value is still the initial value
      // - if so use the nextProps value
      // - otherwise the `this.mask` has a value for us (most likely from paste action)
      if (this.mask.getValue() === this.mask.emptyValue) {
        this.mask.setPattern(nextProps.mask, { value: nextProps.value });
      } else {
        this.mask.setPattern(nextProps.mask, { value: this.mask.getRawValue() });
      }
    } else if (this.props.mask !== nextProps.mask) {
      this.mask.setPattern(nextProps.mask, { value: this.mask.getRawValue() });
    } else if (this.props.value !== nextProps.value) {
      this.mask.setValue(nextProps.value);
    }
  };

  MaskedInput.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    if (nextProps.mask !== this.props.mask) {
      this._updatePattern(nextProps);
    }
  };

  MaskedInput.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.mask !== this.props.mask && this.mask.selection.start) {
      this._updateInputSelection();
    }
  };

  MaskedInput.prototype._updatePattern = function _updatePattern(props) {
    this.mask.setPattern(props.mask, {
      value: this.mask.getRawValue(),
      selection: getSelection(this.input)
    });
  };

  MaskedInput.prototype._updateMaskSelection = function _updateMaskSelection() {
    this.mask.selection = getSelection(this.input);
  };

  MaskedInput.prototype._updateInputSelection = function _updateInputSelection() {
    setSelection(this.input, this.mask.selection);
  };

  MaskedInput.prototype._onChange = function _onChange(e) {
    // console.log('onChange', JSON.stringify(getSelection(this.input)), e.target.value)

    var maskValue = this.mask.getValue();
    if (e.target.value !== maskValue) {
      // Cut or delete operations will have shortened the value
      if (e.target.value.length < maskValue.length) {
        var sizeDiff = maskValue.length - e.target.value.length;
        this._updateMaskSelection();
        this.mask.selection.end = this.mask.selection.start + sizeDiff;
        this.mask.backspace();
      }
      var value = this._getDisplayValue();
      e.target.value = value;
      if (value) {
        this._updateInputSelection();
      }
    }
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  MaskedInput.prototype._onKeyDown = function _onKeyDown(e) {
    // console.log('onKeyDown', JSON.stringify(getSelection(this.input)), e.key, e.target.value)

    if (isUndo(e)) {
      e.preventDefault();
      if (this.mask.undo()) {
        e.target.value = this._getDisplayValue();
        this._updateInputSelection();
        if (this.props.onChange) {
          this.props.onChange(e);
        }
      }
      return;
    } else if (isRedo(e)) {
      e.preventDefault();
      if (this.mask.redo()) {
        e.target.value = this._getDisplayValue();
        this._updateInputSelection();
        if (this.props.onChange) {
          this.props.onChange(e);
        }
      }
      return;
    }

    if (e.key === 'Backspace') {
      e.preventDefault();
      this._updateMaskSelection();
      if (this.mask.backspace()) {
        var value = this._getDisplayValue();
        e.target.value = value;
        if (value) {
          this._updateInputSelection();
        }
        if (this.props.onChange) {
          this.props.onChange(e);
        }
      }
    }
  };

  MaskedInput.prototype._onKeyPress = function _onKeyPress(e) {
    // console.log('onKeyPress', JSON.stringify(getSelection(this.input)), e.key, e.target.value)

    // Ignore modified key presses
    // Ignore enter key to allow form submission
    if (e.metaKey || e.altKey || e.ctrlKey || e.key === 'Enter') {
      return;
    }

    e.preventDefault();
    this._updateMaskSelection();
    if (this.mask.input(e.key || e.data)) {
      e.target.value = this.mask.getValue();
      this._updateInputSelection();
      if (this.props.onChange) {
        this.props.onChange(e);
      }
    }
  };

  MaskedInput.prototype._onPaste = function _onPaste(e) {
    // console.log('onPaste', JSON.stringify(getSelection(this.input)), e.clipboardData.getData('Text'), e.target.value)

    e.preventDefault();
    this._updateMaskSelection();
    // getData value needed for IE also works in FF & Chrome
    if (this.mask.paste(e.clipboardData.getData('Text'))) {
      e.target.value = this.mask.getValue();
      // Timeout needed for IE
      setTimeout(this._updateInputSelection, 0);
      if (this.props.onChange) {
        this.props.onChange(e);
      }
    }
  };

  MaskedInput.prototype._getDisplayValue = function _getDisplayValue() {
    var value = this.mask.getValue();
    return value === this.mask.emptyValue ? '' : value;
  };

  MaskedInput.prototype._keyPressPropName = function _keyPressPropName() {
    if (typeof navigator !== 'undefined') {
      return navigator.userAgent.match(/Android/i) ? 'onBeforeInput' : 'onKeyPress';
    }
    return 'onKeyPress';
  };

  MaskedInput.prototype._getEventHandlers = function _getEventHandlers() {
    var _ref;

    return _ref = {
      onChange: this._onChange,
      onKeyDown: this._onKeyDown,
      onPaste: this._onPaste
    }, _ref[this._keyPressPropName()] = this._onKeyPress, _ref;
  };

  MaskedInput.prototype.focus = function focus() {
    this.input.focus();
  };

  MaskedInput.prototype.blur = function blur() {
    this.input.blur();
  };

  MaskedInput.prototype.render = function render() {
    var _this2 = this;

    var ref = function ref(r) {
      _this2.input = r;
    };
    var maxLength = this.mask.pattern.length;
    var value = this._getDisplayValue();
    var eventHandlers = this._getEventHandlers();
    var _props = this.props,
        _props$size = _props.size,
        size = _props$size === undefined ? maxLength : _props$size,
        _props$placeholder = _props.placeholder,
        placeholder = _props$placeholder === undefined ? this.mask.emptyValue : _props$placeholder;

    var _props2 = this.props,
        placeholderChar = _props2.placeholderChar,
        formatCharacters = _props2.formatCharacters,
        cleanedProps = _objectWithoutProperties(_props2, ['placeholderChar', 'formatCharacters']); // eslint-disable-line


    var inputProps = _extends$1({}, cleanedProps, eventHandlers, { ref: ref, maxLength: maxLength, value: value, size: size, placeholder: placeholder });
    return React.createElement('input', inputProps);
  };

  return MaskedInput;
}(React.Component);

MaskedInput.propTypes = {
  mask: propTypes.string.isRequired,

  formatCharacters: propTypes.object,
  placeholderChar: propTypes.string
};

MaskedInput.defaultProps = {
  value: ''
};

var Property = function (_React$Component) {
  inherits(Property, _React$Component);

  function Property(props) {
    classCallCheck(this, Property);

    var _this = possibleConstructorReturn(this, (Property.__proto__ || Object.getPrototypeOf(Property)).call(this, props));

    _this.onDateChange = _this.onDateChange.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleChangeMulti = _this.handleChangeMulti.bind(_this);
    _this.numericHandleChange = _this.numericHandleChange.bind(_this);
    return _this;
  }

  createClass(Property, [{
    key: 'handleChange',
    value: function handleChange(event) {
      //console.log(this.props.path, Property._getValueFromEvent(event));
      this.props.onChange(this.props.path, Property._getValueFromEvent(event));
    }
  }, {
    key: 'handleChangeMulti',
    value: function handleChangeMulti(event) {
      var selectArray = [];
      Object.keys(event).forEach(function (key) {
        selectArray.push(event[key].value);
      });
      this.props.onChange(this.props.path, selectArray);
    }
  }, {
    key: 'numericHandleChange',
    value: function numericHandleChange(valueAsNumber, valueAsString, input) {
      this.props.onChange(this.props.path, valueAsNumber);
    }
  }, {
    key: 'onDateChange',
    value: function onDateChange(date) {
      //console.log(date);
      if (typeof date === "string") {
        if (date.match('(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d')) {
          //console.log("str 10: " + date);
          this.handleChange(date);
        }
      } else {
        this.handleChange(date);
      }
    }

    //todo error date status
    // onDateChange(date){
    //   //console.log(date);
    //   if(typeof date === "string"){
    //     if(date.match('(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d')){
    //       //console.log("str 10: " + date);
    //       this.handleChange(date);
    //       this.setState({status: 'none'});
    //     }else{
    //       this.handleChange(date);
    //       this.setState({status: 'error'});
    //     }
    //   }else{
    //     this.handleChange(date);
    //     this.setState({status: 'none'});
    //   }
    // }

  }, {
    key: 'render',
    value: function render() {
      var meta = this.props.meta;
      var id = this.props.name + "Field";

      var valueControl = Property.getControl(this.props, this.handleChange, this.handleChangeMulti, this.numericHandleChange, this.onDateChange);

      var label = React.createElement(
        'label',
        { htmlFor: id, className: meta.type === "Boolean" ? 'form-check-label' : 'form-control-label' },
        meta.displayName || id
      );

      var messageElement = meta.message ? React.createElement(
        'span',
        { className: this.props.messageClassName || "form-control-feedback" },
        meta.message
      ) : undefined;

      var hasStatusClasses = classNames({ 'has-danger': meta.status === 'error' }, { 'has-warning': meta.status === 'warning' }, { 'has-success': meta.status === 'success' });
      if (this.state && this.state.status === 'error') {
        hasStatusClasses = 'has-danger';
      }
      var classNameForm = meta.type === "Boolean" ? this.props.classNameFormCheck || 'form-check property' : this.props.classNameFormGroup || 'form-group property';

      var cssClasses = meta.cssClasses || 'col-lg-12';

      var outerClasses = classNames(cssClasses, { 'display-none': meta.hidden });

      var classes = classNames(classNameForm, hasStatusClasses, { 'required': !meta.canBeNull });

      if (meta.type === "Boolean") {
        return React.createElement(
          'div',
          { className: outerClasses },
          React.createElement(
            'div',
            { className: classes },
            valueControl,
            label,
            messageElement
          )
        );
      } else if (meta.labelField) {
        return React.createElement(
          'div',
          { className: classNames('form-group property property-label', meta.cssClasses || 'col-lg-12', hasStatusClasses) },
          valueControl
        );
      } else {
        return React.createElement(
          'div',
          { className: outerClasses },
          React.createElement(
            'div',
            { className: classes },
            label,
            React.createElement(
              'div',
              { className: 'controls' },
              valueControl,
              messageElement
            )
          )
        );
      }
    }
  }], [{
    key: '_getValueFromEvent',
    value: function _getValueFromEvent(event) {
      if (!event) return '';
      if (event._d) {
        console.log(Property.formatDate(event._d));
        return Property.formatDate(event._d);
      }
      if (!event.target) return event.value;
      var element = event.target;
      return element.type === 'checkbox' ? element.checked : element.value;
    }
  }, {
    key: 'getBase64',
    value: function getBase64(file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          return resolve(reader.result);
        };
        reader.onerror = function (error) {
          return reject(error);
        };
      });
    }
  }, {
    key: 'getExtraAttrsMap',
    value: function getExtraAttrsMap(extraAttrs) {
      var map = {};
      if (extraAttrs === undefined) return map;
      for (var i = 0; i < extraAttrs.length; i++) {
        map[extraAttrs[i][0]] = extraAttrs[i][1];
      }
      return map;
    }
  }, {
    key: 'getControl',
    value: function getControl(props, handleChange, handleChangeMulti, numericHandleChange, onDateChange) {
      var meta = props.meta;
      var value = props.value;
      var id = props.name + "Field";
      var handle = meta.multipleSelectionList ? handleChangeMulti : handleChange;
      var extraAttrsMap = Property.getExtraAttrsMap(meta.extraAttrs);

      var controls = {
        Boolean: function Boolean() {
          return React.createElement('input', { type: 'checkbox', id: id, key: id, checked: value === true || value === "true", onChange: handle,
            className: props.controlClassName || 'form-check-input', disabled: meta.readOnly });
        },
        select: function select() {
          var options = Property.optionsToArray(meta.tagList);
          // VirtualizedSelect css подправить (на длинных строках с переносами)
          var strValue = void 0;
          if (Array.isArray(value)) {
            strValue = [];
            for (var i = 0; i < value.length; i++) {
              strValue.push("" + value[i]);
            }
          } else {
            strValue = "" + value;
          }
          var selectProps = {
            ref: id, name: id, value: strValue, options: options, onChange: handle,
            clearAllText: props.localization.clearAllText,
            clearValueText: props.localization.clearValueText,
            noResultsText: props.localization.noResultsText,
            searchPromptText: props.localization.searchPromptText,
            loadingPlaceholder: props.localization.loadingPlaceholder,
            placeholder: meta.placeholder || props.localization.placeholder,
            backspaceRemoves: false,
            disabled: meta.readOnly,
            multi: meta.multipleSelectionList,
            matchPos: extraAttrsMap.matchPos || "any"
          };

          if (extraAttrsMap.inputType === "Creatable") {
            return React.createElement(Creatable, selectProps);
          }

          if (extraAttrsMap.inputType === "VirtualizedSelect") {
            return React.createElement(VirtualizedSelect, _extends({}, selectProps, { clearable: true, searchable: true, labelKey: 'label', valueKey: 'value' }));
          }
          return React.createElement(Select, selectProps);
        },
        Date: function Date() {
          return React.createElement(Datetime, { dateFormat: 'DD.MM.YYYY', value: moment(value === undefined ? "" : value),
            onChange: function onChange(v) {
              return onDateChange(v);
            }, id: id, key: id,
            timeFormat: false, closeOnSelect: true, closeOnTab: true, locale: props.localization.locale || "en",
            inputProps: { disabled: meta.readOnly } });
        },
        //      dateTime: {
        //        normal: () => {
        //          return ( React.createElement(Datetime, {id: id, key: id, value: value, parent: _this, onChange: handleChange, time: true, className: props.controlClassName}) );
        //        },
        //        readOnly: () => this.createStatic(value)
        //      },


        textArea: function textArea() {
          return React.createElement('textarea', { placeholder: meta.placeholder, id: id, rows: meta.rows || 3, cols: meta.columns, value: value === undefined ? "" : value,
            onChange: handle, className: props.controlClassName || "form-control", disabled: meta.readOnly });
        },
        maskTest: function maskTest() {
          return React.createElement(MaskedInput, { mask: Property.getMaskInput(meta.validationRules), onChange: handle, className: props.controlClassName || "form-control" });
        },
        textInput: function textInput() {
          return React.createElement('input', { type: 'text', placeholder: meta.placeholder, id: id, key: id, value: value === undefined ? "" : value,
            onChange: handle, className: props.controlClassName || "form-control", disabled: meta.readOnly });
        },
        numberInput: function numberInput() {
          var numericProps = Property.getNumericProps(meta);
          return React.createElement(NumericInput, _extends({}, numericProps, { placeholder: meta.placeholder, id: id, key: id, value: value,
            onChange: numericHandleChange, style: false,
            className: props.controlClassName || "form-control", disabled: meta.readOnly }));
        },
        passwordField: function passwordField() {
          return React.createElement('input', { type: 'password', placeholder: meta.placeholder, id: id, key: id, value: value === undefined ? "" : value,
            onChange: handle, className: props.controlClassName || "form-control", disabled: meta.readOnly });
        },
        file: function file() {
          return React.createElement('input', { type: 'file', placeholder: meta.placeholder, id: id, key: id,
            className: props.controlClassName || "form-control", disabled: meta.readOnly,
            multiple: meta.multipleSelectionList,
            onChange: function onChange(e) {
              if (e.target.files && e.target.files.length === 1) {
                var fileName = e.target.files[0].name;
                Property.getBase64(e.target.files[0]).then(function (data) {
                  handle({ value: { type: "Base64File", name: fileName, data: data } });
                });
              }
            } });
        },

        WYSIWYG: function WYSIWYG() {
          return React.createElement(CKEditor, { activeClass: 'p10', content: value,
            events: {
              "change": function change(evt) {
                handle({ value: evt.editor.getData() });
              }
            },
            config: { language: 'ru' }
          });
        },
        labelField: function labelField() {
          if (meta.rawValue) {
            return React.createElement('div', { dangerouslySetInnerHTML: { __html: value } });
          } else {
            return React.createElement(
              'label',
              { className: 'form-control-label' },
              value
            );
          }
        }
      };

      if (meta.tagList) {
        return controls['select']();
      }

      if (meta.passwordField) {
        return controls['passwordField']();
      }

      if (meta.labelField) {
        return controls['labelField']();
      }

      if (meta.validationRules !== undefined && Property.isNumberInput(meta.validationRules)) {
        return controls['numberInput']();
      }

      if (controls[meta.type] !== undefined) {
        return controls[meta.type]();
      }

      if (extraAttrsMap.inputType === 'WYSIWYG') {
        return controls['WYSIWYG']();
      }

      if (extraAttrsMap.inputType === 'textArea') {
        return controls['textArea']();
      }

      if (extraAttrsMap.inputType === 'file') {
        return controls['file']();
      }

      if (meta.validationRules !== undefined && Property.getMaskInput(meta.validationRules)) {
        return controls['maskTest']();
      }

      return controls['textInput']();
    }
  }, {
    key: 'getNumericProps',
    value: function getNumericProps(meta) {
      var props = {};
      props['maxLength'] = 14; //errors if more
      var rules = meta.validationRules;
      for (var i = 0; i < rules.length; i++) {
        if (rules[i].type === "baseRule" && rules[i].attr === "number") {
          props['precision'] = 10;
        }
        if (rules[i].type === "baseRule" && rules[i].attr === "integer") {
          props['min'] = -2147483648;
          props['max'] = 2147483647;
          props['maxLength'] = 10;
        }
        // if(rules[i].type === "digits")
        // {
        //   props['min'] = 0;//todo not work
        // }
      }
      if (meta.columnSize) {
        props['maxLength'] = parseInt(meta.columnSize);
      }
      return props;
    }
  }, {
    key: 'getMaskInput',
    value: function getMaskInput(rules) {
      for (var i = 0; i < rules.length; i++) {
        if ("mask" in rules[i]) {
          return rules[i].mask;
        }
      }
      return null;
    }
  }, {
    key: 'isNumberInput',
    value: function isNumberInput(rules) {
      for (var i = 0; i < rules.length; i++) {
        if (rules[i].type === "baseRule" && (rules[i].attr === "digits" || rules[i].attr === "integer" || rules[i].attr === "number")) return true;
      }
      return false;
    }
  }, {
    key: 'optionsToArray',
    value: function optionsToArray(options) {
      var optionObject = [];
      for (var i = 0; i < options.length; i++) {
        optionObject.push({ value: options[i][0], label: options[i][1] });
      }
      return optionObject;
    }

    //  createStatic(value) {
    //    return <p className="form-control-static" dangerouslySetInnerHTML={{__html: value}} />;
    //  }

    //ISO 8601 format

  }, {
    key: 'formatDate',
    value: function formatDate(date) {
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      return year + '-' + Property.format2digit(month) + '-' + Property.format2digit(day);
    }
  }, {
    key: 'format2digit',
    value: function format2digit(number) {
      return ("0" + number).slice(-2);
    }
  }]);
  return Property;
}(React.Component);

Property.defaultProps = {
  localization: {
    locale: 'en',
    clearAllText: 'Clear all',
    clearValueText: 'Clear value',
    noResultsText: 'No results found',
    searchPromptText: 'Type to search',
    placeholder: 'Select ...',
    loadingPlaceholder: 'Loading...'
  }
};

Property.propTypes = {
  localization: propTypes.object
};

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

var foreach = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};

var jsonPointer = api;


/**
 * Convenience wrapper around the api.
 * Calls `.get` when called with an `object` and a `pointer`.
 * Calls `.set` when also called with `value`.
 * If only supplied `object`, returns a partially applied function, mapped to the object.
 *
 * @param {Object} obj
 * @param {String|Array} pointer
 * @param value
 * @returns {*}
 */

function api (obj, pointer, value) {
    // .set()
    if (arguments.length === 3) {
        return api.set(obj, pointer, value);
    }
    // .get()
    if (arguments.length === 2) {
        return api.get(obj, pointer);
    }
    // Return a partially applied function on `obj`.
    var wrapped = api.bind(api, obj);

    // Support for oo style
    for (var name in api) {
        if (api.hasOwnProperty(name)) {
            wrapped[name] = api[name].bind(wrapped, obj);
        }
    }
    return wrapped;
}


/**
 * Lookup a json pointer in an object
 *
 * @param {Object} obj
 * @param {String|Array} pointer
 * @returns {*}
 */
api.get = function get (obj, pointer) {
    var refTokens = Array.isArray(pointer) ? pointer : api.parse(pointer);

    for (var i = 0; i < refTokens.length; ++i) {
        var tok = refTokens[i];
        if (!(typeof obj == 'object' && tok in obj)) {
            throw new Error('Invalid reference token: ' + tok);
        }
        obj = obj[tok];
    }
    return obj;
};

/**
 * Sets a value on an object
 *
 * @param {Object} obj
 * @param {String|Array} pointer
 * @param value
 */
api.set = function set (obj, pointer, value) {
    var refTokens = Array.isArray(pointer) ? pointer : api.parse(pointer),
      nextTok = refTokens[0];

    for (var i = 0; i < refTokens.length - 1; ++i) {
        var tok = refTokens[i];
        if (tok === '-' && Array.isArray(obj)) {
          tok = obj.length;
        }
        nextTok = refTokens[i + 1];

        if (!(tok in obj)) {
            if (nextTok.match(/^(\d+|-)$/)) {
                obj[tok] = [];
            } else {
                obj[tok] = {};
            }
        }
        obj = obj[tok];
    }
    if (nextTok === '-' && Array.isArray(obj)) {
      nextTok = obj.length;
    }
    obj[nextTok] = value;
    return this;
};

/**
 * Removes an attribute
 *
 * @param {Object} obj
 * @param {String|Array} pointer
 */
api.remove = function (obj, pointer) {
    var refTokens = Array.isArray(pointer) ? pointer : api.parse(pointer);
    var finalToken = refTokens[refTokens.length -1];
    if (finalToken === undefined) {
        throw new Error('Invalid JSON pointer for remove: "' + pointer + '"');
    }

    var parent = api.get(obj, refTokens.slice(0, -1));
    if (Array.isArray(parent)) {
      var index = +finalToken;
      if (finalToken === '' && isNaN(index)) {
        throw new Error('Invalid array index: "' + finalToken + '"');
      }

      Array.prototype.splice.call(parent, index, 1);
    } else {
      delete parent[finalToken];
    }
};

/**
 * Returns a (pointer -> value) dictionary for an object
 *
 * @param obj
 * @param {function} descend
 * @returns {}
 */
api.dict = function dict (obj, descend) {
    var results = {};
    api.walk(obj, function (value, pointer) {
        results[pointer] = value;
    }, descend);
    return results;
};

/**
 * Iterates over an object
 * Iterator: function (value, pointer) {}
 *
 * @param obj
 * @param {function} iterator
 * @param {function} descend
 */
api.walk = function walk (obj, iterator, descend) {
    var refTokens = [];

    descend = descend || function (value) {
        var type = Object.prototype.toString.call(value);
        return type === '[object Object]' || type === '[object Array]';
    };

    (function next (cur) {
        foreach(cur, function (value, key) {
            refTokens.push(String(key));
            if (descend(value)) {
                next(value);
            } else {
                iterator(value, api.compile(refTokens));
            }
            refTokens.pop();
        });
    }(obj));
};

/**
 * Tests if an object has a value for a json pointer
 *
 * @param obj
 * @param pointer
 * @returns {boolean}
 */
api.has = function has (obj, pointer) {
    try {
        api.get(obj, pointer);
    } catch (e) {
        return false;
    }
    return true;
};

/**
 * Escapes a reference token
 *
 * @param str
 * @returns {string}
 */
api.escape = function escape (str) {
    return str.toString().replace(/~/g, '~0').replace(/\//g, '~1');
};

/**
 * Unescapes a reference token
 *
 * @param str
 * @returns {string}
 */
api.unescape = function unescape (str) {
    return str.replace(/~1/g, '/').replace(/~0/g, '~');
};

/**
 * Converts a json pointer into a array of reference tokens
 *
 * @param pointer
 * @returns {Array}
 */
api.parse = function parse (pointer) {
    if (pointer === '') { return []; }
    if (pointer.charAt(0) !== '/') { throw new Error('Invalid JSON pointer: ' + pointer); }
    return pointer.substring(1).split(/\//).map(api.unescape);
};

/**
 * Builds a json pointer from a array of reference tokens
 *
 * @param refTokens
 * @returns {string}
 */
api.compile = function compile (refTokens) {
    if (refTokens.length === 0) { return ''; }
    return '/' + refTokens.map(api.escape).join('/');
};

var PropertySet = function (_React$Component) {
  inherits(PropertySet, _React$Component);

  function PropertySet() {
    classCallCheck(this, PropertySet);
    return possibleConstructorReturn(this, (PropertySet.__proto__ || Object.getPrototypeOf(PropertySet)).apply(this, arguments));
  }

  createClass(PropertySet, [{
    key: '_createGroup',
    value: function _createGroup(curGroup, curGroupId, curGroupName) {
      return React.createElement(
        'div',
        { className: 'property-group col-12', key: curGroupId, ref: curGroupId },
        React.createElement(
          'div',
          { className: 'property-groop-box' },
          React.createElement(
            'h3',
            null,
            curGroupName
          ),
          React.createElement(
            'div',
            { className: 'row' },
            curGroup
          )
        )
      );
    }
  }, {
    key: 'get',
    value: function get$$1(path) {
      var itemName = path.substring(path.lastIndexOf("/") + 1);
      var itemMeta = this.props.bean.meta[path];
      var itemValue = jsonPointer.get(this.props.bean, "/values" + path);
      return {
        meta: itemMeta,
        name: itemName,
        value: itemValue,
        path: path,
        key: itemName + "Property",
        ref: itemName + "Property",
        localization: this.props.localization
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var curGroup = [];
      var curGroupName = null,
          curGroupId = null;
      var fields = [];

      var finishGroup = function finishGroup() {
        if (curGroup.length > 0) {
          if (curGroupId) {
            fields.push(_this2._createGroup(curGroup, curGroupId, curGroupName));
          } else {
            Array.prototype.push.apply(fields, curGroup);
          }
        }
        curGroup = [];
      };

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.bean.order[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var path = _step.value;

          var itemProps = this.get(path);

          var newGroupId = itemProps.meta.groupId || null;
          var newGroupName = itemProps.meta.groupName || null;
          if (newGroupId !== curGroupId) {
            finishGroup();
            curGroupName = newGroupName;
            curGroupId = newGroupId;
          }
          var field = React.createElement(Property, _extends({}, itemProps, { onChange: this.props.onChange }));
          curGroup.push(field);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      finishGroup();

      return React.createElement(
        'div',
        { className: 'property-set row' },
        fields
      );
    }
  }]);
  return PropertySet;
}(React.Component);

PropertySet.defaultProps = {
  localization: {}
};

PropertySet.propTypes = {
  bean: propTypes.object.isRequired,
  onChange: propTypes.func,
  localization: propTypes.object
};

var Form = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired,
    frontendParams: React.PropTypes.object.isRequired
  },

  displayName: 'Form',

  getInitialState: function getInitialState() {
    return _.extend({}, this.props.value, { allFieldsFilled: false });
  },
  componentDidMount: function componentDidMount() {
    forms.changeLocationHash(this.props);

    this.initForm();
  },
  initForm: function initForm() {
    for (var key in this.refs) {
      if (this.refs[key].onFormDidMount) this.refs[key].onFormDidMount();
    }
    this.setState({ allFieldsFilled: this._allFieldsFilled() });
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _this = this;

    this.setState(nextProps.value, function () {
      _this.setState({ allFieldsFilled: _this._allFieldsFilled() });
    });
  },
  getFormValues: function getFormValues() {
    return this._getRawFormValues().filter(function (field) {
      return field.value !== null;
    });
  },
  getParams: function getParams(values) {
    var attributes = this.state.data.attributes;
    return {
      entity: attributes.entity,
      query: attributes.query,
      operation: attributes.operation,
      operationParams: attributes.operationParams,
      selectedRows: attributes.selectedRows,
      values: values
    };
  },
  refresh: function refresh() {
    forms.load(this.getParams(this.state.data.attributes.bean.values), this.props.frontendParams);
  },
  _reloadOnChange: function _reloadOnChange(controlName) {
    var values = Object.assign({}, this.state.data.attributes.bean.values, { '_reloadcontrol_': controlName });

    forms.load(this.getParams(values), this.props.frontendParams);
  },
  apply: function apply() {
    forms.apply(this.getParams(this.state.data.attributes.bean.values), this.props.frontendParams);
  },


  // cancel() {
  //   be5.url.set(be5.url.create('table', [this.state.entity, this.state.query], this.state.parameters));
  // },

  _applyOnSubmit: function _applyOnSubmit(e) {
    // Hitting <enter> in any textbox in Chrome triggers the form submit,
    // even when there is no submit button.
    // That's why I explicitly define the cancellation.
    e.preventDefault();
    this.apply();
  },
  _getRawFormValues: function _getRawFormValues() {
    var attributes = this.state.data.attributes;
    return attributes.bean.map(function (field) {
      return { name: field.name, value: field.value, required: !field.canBeNull };
    });
  },
  _getRequredValues: function _getRequredValues() {
    return this._getRawFormValues().filter(function (field) {
      return field.required;
    });
  },
  _onFieldChange: function _onFieldChange(name, value) {
    var _this2 = this;

    var attributes = this.state.data.attributes;
    jsonPointer.set(attributes.bean, "/values" + name, value);

    this.forceUpdate(function () {
      _this2.setState({ allFieldsFilled: _this2._allFieldsFilled() });

      if (attributes.bean.meta[name].hasOwnProperty('reloadOnChange') || attributes.bean.meta[name].hasOwnProperty('autoRefresh')) {
        _this2._reloadOnChange(name);
      }
    });
  },
  _createFormActions: function _createFormActions() {
    if (this.state.hideActions === true) {
      return null;
    }
    return React.createElement(
      'div',
      null,
      this._createOkAction(),
      ' ',
      this._createCancelAction()
    );
  },
  _createOkAction: function _createOkAction() {
    return React.createElement(
      'button',
      { type: 'button', className: 'btn btn-primary', onClick: this.apply, disabled: !this.state.allFieldsFilled },
      be5.messages.Submit
    );
  },
  _createCancelAction: function _createCancelAction() {
    //const attributes = this.state.data.attributes;
    if (!this.props.value.showCancel) {
      return null;
    }

    return React.createElement(
      'button',
      { type: 'button', className: 'btn btn-secondary', onClick: function onClick() {
          return history.back();
        } },
      be5.messages.cancel
    );
  },
  _allFieldsFilled: function _allFieldsFilled() {
    var attributes = this.state.data.attributes;
    return attributes.bean.order.every(function (field) {
      // if(be5.debug && !filled){
      //   console.log(field);
      // }
      return attributes.bean.meta[field].hasOwnProperty('canBeNull') || jsonPointer.get(attributes.bean, "/values" + field) !== '';
    });
  },
  _getErrorPane: function _getErrorPane() {
    var errorModel = this.state.data.attributes.errorModel;

    if (errorModel) {
      return React.createElement(ErrorPane, { value: { errors: [errorModel], meta: this.state.meta, links: {} } });
    } else {
      return null;
    }
  },
  render: function render() {
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
        React.createElement(
          'form',
          { onSubmit: this._applyOnSubmit },
          React.createElement(PropertySet, { bean: attributes.bean, onChange: this._onFieldChange, localization: be5.messages.property }),
          React.createElement(
            'div',
            { className: 'formActions' },
            this._createFormActions()
          )
        ),
        React.createElement('br', null)
      ),
      React.createElement(
        'div',
        { className: 'col-12' },
        this._getErrorPane()
      )
    );
    //<button onClick={this.refresh}>refresh</button>
  }
});

// Form.propTypes = {
//   value: PropTypes.object.isRequired
// };

formsCollection.registerForm('form', Form);

var PropertyInput = function (_React$Component) {
  inherits(PropertyInput, _React$Component);

  function PropertyInput(props) {
    classCallCheck(this, PropertyInput);

    var _this = possibleConstructorReturn(this, (PropertyInput.__proto__ || Object.getPrototypeOf(PropertyInput)).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleChangeMulti = _this.handleChangeMulti.bind(_this);
    _this.onDateChange = _this.onDateChange.bind(_this);
    return _this;
  }

  createClass(PropertyInput, [{
    key: 'handleChange',
    value: function handleChange(event) {
      var path = void 0;
      if (this.props.path) {
        path = this.props.path;
      } else {
        path = this.props.bean.order[this.props.id];
      }
      this.props.onChange(path, this._getValueFromEvent(event));
    }
  }, {
    key: 'onDateChange',
    value: function onDateChange(date) {
      //console.log(date);
      if (typeof date === "string") {
        if (date.match('(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d')) {
          //console.log("str 10: " + date);
          this.handleChange(date);
        }
      } else {
        this.handleChange(date);
      }
    }
  }, {
    key: 'handleChangeMulti',
    value: function handleChangeMulti(event) {
      var selectArray = [];
      Object.keys(event).forEach(function (key) {
        selectArray.push(event[key].value);
      });
      this.props.onChange(this.props.path, selectArray);
    }
  }, {
    key: '_getValueFromEvent',
    value: function _getValueFromEvent(event) {
      if (!event) return '';
      if (event._d) {
        return this.formatDate(event._d);
      }
      if (!event.target) return event.value;
      var element = event.target;
      return element.type === 'checkbox' ? element.checked : element.value;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var attr = void 0;
      if (this.props.path) {
        attr = PropertyInput.get(this.props.path, this.props.bean, this.props.localization);
      } else {
        attr = PropertyInput.get(this.props.bean.order[this.props.id], this.props.bean, this.props.localization);
      }
      var meta = attr.meta;
      var value = attr.value || attr.meta.defaultValue;
      var id = attr.name + "Field";
      var handle = meta.multipleSelectionList ? this.handleChangeMulti : this.handleChange;

      var controls = {
        Boolean: function Boolean() {
          return React.createElement('input', { type: 'checkbox', id: id, key: id, value: value, checked: value === undefined ? "" : value, onChange: handle,
            className: attr.controlClassName || 'form-check-input', disabled: meta.readOnly });
        },
        select: function select() {
          var options = _this2.optionsToArray(meta.tagList);
          //if(options.length > 100){
          var strValue = void 0;
          if (Array.isArray(value)) {
            strValue = [];
            for (var i = 0; i < value.length; i++) {
              strValue.push("" + value[i]);
            }
          } else {
            strValue = "" + value;
          }
          return React.createElement(VirtualizedSelect, { ref: id, name: id, value: strValue, options: options,
            disabled: meta.readOnly, onChange: handle,
            multi: meta.multipleSelectionList, matchPos: 'any',
            clearable: true,
            searchable: true,
            labelKey: 'label',
            valueKey: 'value',
            clearAllText: attr.localization.clearAllText,
            clearValueText: attr.localization.clearValueText,
            noResultsText: attr.localization.noResultsText,
            searchPromptText: attr.localization.searchPromptText,
            placeholder: attr.localization.placeholder,
            loadingPlaceholder: attr.localization.loadingPlaceholder
          });
          //        }else{
          //          return <Select ref={id} name={id} value={value} options={options}
          //                          disabled={meta.readOnly} onChange={handle} placeholder={meta.placeholder}
          //                          multi={meta.multipleSelectionList} matchPos="start"
          //                          clearAllText={attr.localization.clearAllText}
          //                          clearValueText={attr.localization.clearValueText}
          //                          noResultsText={attr.localization.noResultsText}
          //                          searchPromptText={attr.localization.searchPromptText}
          //                          placeholder={attr.localization.placeholder}
          //                          loadingPlaceholder={attr.localization.loadingPlaceholder}
          //          />
          //        }
        },
        Date: function Date() {
          return React.createElement(Datetime, { dateFormat: 'DD.MM.YYYY', value: moment(value === undefined ? "" : value),
            onChange: function onChange(v) {
              return onDateChange(v);
            }, id: id, key: id,
            timeFormat: false, closeOnSelect: true, closeOnTab: true, locale: props.localization.locale || "en",
            inputProps: { disabled: meta.readOnly } });
        },
        //      dateTime: {
        //        normal: () => {
        //          return ( React.createElement(Datetime, {id: id, key: id, value: value, parent: _this, onChange: handleChange, time: true, className: attr.controlClassName}) );
        //        },
        //        readOnly: () => this.createStatic(value)
        //      },
        textArea: function textArea() {
          return React.createElement('textarea', { placeholder: meta.placeholder, id: id, rows: meta.rows || 3, cols: meta.columns, value: value === undefined ? "" : value,
            onChange: handle, className: attr.controlClassName || "form-control", disabled: meta.readOnly });
        },
        textInput: function textInput() {
          return React.createElement('input', { type: 'text', placeholder: meta.placeholder, id: id, key: id, value: value === undefined ? "" : value,
            onChange: handle, className: attr.controlClassName || "form-control", disabled: meta.readOnly });
        },
        passwordField: function passwordField() {
          return React.createElement('input', { type: 'password', placeholder: meta.placeholder, id: id, key: id, value: value === undefined ? "" : value,
            onChange: handle, className: attr.controlClassName || "form-control", disabled: meta.readOnly });
        },
        labelField: function labelField() {
          if (meta.rawValue) {
            return React.createElement('div', { dangerouslySetInnerHTML: { __html: value } });
          } else {
            return React.createElement(
              'div',
              null,
              value
            );
          }
        }
      };

      //let valueControl;
      if (meta.tagList) {
        return controls['select']();
      } else if (meta.passwordField) {
        return controls['passwordField']();
      } else if (meta.labelField) {
        return controls['labelField']();
      } else {
        return (controls[meta.type] || controls['textInput'])();
      }
      //return ({valueControl})
      //    return (
      //      <ValueControl {...Properties.get(attr.bean, path, attr.localization)}
      //                    onChange={attr.onChange} />
      //    );
    }
  }, {
    key: 'optionsToArray',
    value: function optionsToArray(options) {
      var optionObject = [];
      for (var i = 0; i < options.length; i++) {
        optionObject.push({ value: options[i][0], label: options[i][1] });
      }
      return optionObject;
    }

    //  createStatic(value) {
    //    return <p className="form-control-static" dangerouslySetInnerHTML={{__html: value}} />;
    //  }

    //ISO 8601 format

  }, {
    key: 'formatDate',
    value: function formatDate(date) {
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      return year + '-' + this.format2digit(month) + '-' + this.format2digit(day);
    }
  }, {
    key: 'format2digit',
    value: function format2digit(number) {
      return ("0" + number).slice(-2);
    }
  }], [{
    key: 'get',
    value: function get$$1(path, bean, localization) {
      var itemName = path.substring(path.lastIndexOf("/") + 1);
      var itemMeta = bean.meta[path];
      var itemValue = jsonPointer.get(bean, "/values" + path);
      return {
        meta: itemMeta,
        name: itemName,
        value: itemValue,
        path: path,
        key: itemName + "Property",
        ref: itemName + "Property",
        localization: localization
      };
    }
  }]);
  return PropertyInput;
}(React.Component);

PropertyInput.defaultProps = {
  localization: {
    locale: 'en',
    clearAllText: 'Clear all',
    clearValueText: 'Clear value',
    noResultsText: 'No results found',
    searchPromptText: 'Type to search',
    placeholder: 'Select ...',
    loadingPlaceholder: 'Loading...'
  }
};

PropertyInput.propTypes = {
  bean: propTypes.object.isRequired,
  path: propTypes.string,
  id: propTypes.number,
  onChange: propTypes.func,
  localization: propTypes.object
};

var SubmitOnChangeForm = function (_Form) {
  inherits(SubmitOnChangeForm, _Form);

  function SubmitOnChangeForm(props) {
    classCallCheck(this, SubmitOnChangeForm);

    var _this = possibleConstructorReturn(this, (SubmitOnChangeForm.__proto__ || Object.getPrototypeOf(SubmitOnChangeForm)).call(this, props));

    _this.state = Object.assign({}, _this.props.value, { allFieldsFilled: false });

    _this._onFieldChangeAndSubmit = _this._onFieldChangeAndSubmit.bind(_this);
    return _this;
  }

  createClass(SubmitOnChangeForm, [{
    key: '_onFieldChangeAndSubmit',
    value: function _onFieldChangeAndSubmit(name, value) {
      get(SubmitOnChangeForm.prototype.__proto__ || Object.getPrototypeOf(SubmitOnChangeForm.prototype), '_onFieldChange', this).call(this, name, value);
      get(SubmitOnChangeForm.prototype.__proto__ || Object.getPrototypeOf(SubmitOnChangeForm.prototype), 'apply', this).call(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var attributes = this.state.data.attributes;
      return React.createElement(
        'div',
        { className: classNames('submit-onchange-form', attributes.cssClass) },
        React.createElement(PropertyInput, { id: 0, bean: attributes.bean, localization: be5.messages.property, onChange: this._onFieldChangeAndSubmit }),
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

formsCollection.registerForm('submitOnChange', SubmitOnChangeForm);

var ModalForm = function (_Form) {
  inherits(ModalForm, _Form);

  function ModalForm() {
    classCallCheck(this, ModalForm);
    return possibleConstructorReturn(this, (ModalForm.__proto__ || Object.getPrototypeOf(ModalForm)).apply(this, arguments));
  }

  createClass(ModalForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initForm();
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
        React.createElement(
          ModalBody,
          null,
          React.createElement(
            'form',
            { onSubmit: this._applyOnSubmit },
            React.createElement(PropertySet, { bean: attributes.bean, onChange: this._onFieldChange, localization: be5.messages.property })
          )
        ),
        React.createElement(
          'div',
          { className: 'col-12' },
          this._getErrorPane()
        ),
        React.createElement(
          ModalFooter,
          null,
          this._createOkAction()
        )
      );
    }
  }]);
  return ModalForm;
}(Form);

formsCollection.registerForm('modal', ModalForm);

var be5init = {
  init: function init() {
    var hashChange = function hashChange() {
      bus.fire("mainModalClose");

      var state = documentState.get(be5.mainDocumentName);

      if (state.value.links !== undefined && "#!" + state.value.links.self === document.location.hash && state.value.links.self.startsWith('form')) {
        //console.log('skip - form already opened');
      } else {
        be5.url.process(be5.mainDocumentName, document.location.hash);
      }
    };

    window.addEventListener("hashchange", hashChange, false);

    be5.net.request("appInfo", {}, function (data) {
      be5.appInfo = data;
      be5.ui.setTitle();
    });

    bus.listen('CallDefaultAction', function () {
      be5.net.request('menu/defaultAction', {}, function (data) {
        be5.url.set(data.arg);
      });
    });

    be5.net.request('languageSelector', {}, function (data) {
      be5.locale.set(data.selected, data.messages);
      be5.url.process(be5.mainDocumentName, document.location.hash);
    });
  }
};

// const createIllegalArgumentError = () => ({
//   name: 'IllegalArgumentError',
//   message: ''
// });
//
// const getColumnName = function(column) {
//   return typeof column === 'string' ? column : column.name;
// };
//
// const toRows = function(table) {
//   if (table.type && table.type === 'table') {
//     table = table.value;
//   }
//
//   return table.rows.map(row => {
//     const resultRow = { id: row.id };
//     for (var i = 0; i < row.cells.length; i++) {
//       resultRow[getColumnName(table.columns[i])] = row.cells[i];
//     }
//     return resultRow;
//   });
// };
//
// const getSortableColumns = function(table) {
//   if (table.type && table.type === 'table') {
//     table = table.value;
//   }
//
//   return table.columns.filter(column => !(column.options && column.options.nosort));
// };
//
// const toRow = function(table) {
//   const rows = toRows(table);
//   if (rows.length !== 1) {
//     throw createIllegalArgumentError();
//   }
//   return rows[0];
// };
//
// const createDocument = function(resource) {
//   return _.extend({
//     toRow: function() {
//       return toRow(this);
//     },
//     toRows: function() {
//       return toRows(this);
//     },
//   }, resource);
// };

var documentUtils = {
  // toRows: toRows,
  // toRow: toRow,
  // createDocument: createDocument,
  // getSortableColumns: getSortableColumns
};

var http = {
  get: be5.net.requestJson,
  getHtml: be5.net.requestHtml,
  post: be5.net.requestJson
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
  onLanguageClick: propTypes.func.isRequired
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
      this.refresh();
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      be5.net.request('languageSelector', {}, function (data) {
        be5.locale.set(data.selected, data.messages);
        this.setState({ data: { selected: data.selected, languages: data.languages } });
      }.bind(this));
    }
  }, {
    key: 'changeLanguage',
    value: function changeLanguage(language) {
      be5.net.request('languageSelector/select', { language: language }, function (data) {
        this.setState({ data: { selected: data.selected, languages: data.languages } });
        be5.locale.set(language, data.messages);
      }.bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: "languageBox" },
        React.createElement(LanguageList, { data: this.state.data, onLanguageClick: this.changeLanguage })
      );
    }
  }]);
  return LanguageBox;
}(React.Component);

var Role = function (_React$Component) {
  inherits(Role, _React$Component);

  function Role() {
    classCallCheck(this, Role);
    return possibleConstructorReturn(this, (Role.__proto__ || Object.getPrototypeOf(Role)).apply(this, arguments));
  }

  createClass(Role, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var id = this.props.name + "-checkbox";
      return React.createElement(
        'div',
        { className: "role" },
        React.createElement('input', { type: 'checkbox', id: id, checked: this.props.state, onChange: function onChange() {
            return _this2.props.onChange();
          } }),
        React.createElement(
          'label',
          { htmlFor: id },
          React.createElement('span', { className: "checkBox" }),
          this.props.name
        )
      );
    }
  }]);
  return Role;
}(React.Component);

Role.propTypes = {
  onChange: propTypes.func.isRequired
};

var RoleBox = function (_React$Component2) {
  inherits(RoleBox, _React$Component2);

  function RoleBox(props) {
    classCallCheck(this, RoleBox);

    var _this3 = possibleConstructorReturn(this, (RoleBox.__proto__ || Object.getPrototypeOf(RoleBox)).call(this, props));

    _this3.state = {
      availableRoles: ["Unknown"], selectedRoles: ["Unknown"]
    };

    _this3._onRoleChange = _this3._onRoleChange.bind(_this3);
    _this3._changeRoles = _this3._changeRoles.bind(_this3);
    _this3.handleSelectAll = _this3.handleSelectAll.bind(_this3);
    _this3.handleClear = _this3.handleClear.bind(_this3);
    return _this3;
  }

  createClass(RoleBox, [{
    key: 'handleSelectAll',
    value: function handleSelectAll() {
      this._changeRoles(this.state.availableRoles.join(","));
    }
  }, {
    key: 'handleClear',
    value: function handleClear() {
      this._changeRoles("");
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      if (this.state.availableRoles.length < 1) {
        return React.createElement('div', { className: 'roleBox' });
      }
      var selectedRoles = this.state.selectedRoles;
      var roleNodes = this.state.availableRoles.map(function (role) {
        return React.createElement(Role, { key: role, ref: role, name: role, state: selectedRoles.indexOf(role) !== -1, onChange: function onChange() {
            return _this4._onRoleChange(role);
          } });
      });

      return React.createElement(
        'div',
        { className: 'roleBox' },
        React.createElement(
          UncontrolledDropdown,
          { size: 'sm' },
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
              '\u0412\u044B\u0431\u0440\u0430\u0442\u044C:',
              ' ',
              React.createElement(
                Button,
                { onClick: this.handleSelectAll, color: 'primary', className: 'enable-all', size: 'sm' },
                '\u0412\u0441\u0451'
              ),
              ' ',
              React.createElement(
                Button,
                { onClick: this.handleClear, color: 'secondary', className: 'disable-all', size: 'sm' },
                '\u041D\u0438\u0447\u0435\u0433\u043E'
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'roleBox_username' },
          this.state.username
        )
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refresh();
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      var _this5 = this;

      be5.net.request('roleSelector', {}, function (data) {
        return _this5.setState(data);
      });
    }
  }, {
    key: '_onRoleChange',
    value: function _onRoleChange(name) {
      var roles = this.state.selectedRoles;
      var containRoleIndex = roles.indexOf(name);

      if (containRoleIndex !== -1) {
        roles.splice(roles.indexOf(name), 1);
      } else {
        roles.push(name);
      }

      this._changeRoles(roles.join(","));
    }
  }, {
    key: '_changeRoles',
    value: function _changeRoles(roles) {
      var _this6 = this;

      be5.net.request('roleSelector/select', { roles: roles }, function (data) {
        _this6.setState(data);
        bus.fire('RoleChanged', {});
      });
    }
  }]);
  return RoleBox;
}(React.Component);

var img$1 = new Image();img$1.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAAAjCAYAAAANIjHoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAEN9JREFUeNrsXHtsHMUd/u3e03bseJ3EOC8CZwQJCVEUp0CTlEe5U1uUYCp6bishWtrqXAn+7p2E+keLVN0JqapERXWGCtRKpfhaUQjQijsiEgQtrQ9Kg+KQ4EsMCc7D8cXPe+91Zj1j/7yeffgRK0YeaXV3u7Oz8/jmm2++mT2pWq3Ccgv7X3tHIR9tgkvpdw/elcUn9h06SuMpBkllSPyM6AK9j1xLG1zz0eeT6wmjPLI49AASL8XPX9eywW9SNP48XrbMhfNfZNC9uNxpci1LzonKZ3mfWf2yNHE+aVopo/sM8jDrOQbxZuVZVEfkWgr/du49dJQid0iWJHuoIfGqpRKow1koDZyF4qcnIPe/HihmTpLUnCA5nAsGZi6XgwtDw2tMotAKSBoAppMApQudiuoaAYcIOWKCNGj8bvLZqu8ILPjYdf2zcAiyZ2u1hs4nTcoVYODtZg2cYud46GZloQ28x6x8pPHpvR0MPLi+AixdIwAa1RftJDGSXkxwzSgPNH5kHm2RFKRFyxEh6Wn1zVHWZBtVhKEllwuczevBuXEz1N6+Hxoe/D6Mv3sYrrz0PKhjI+S6eykJWM9ScQKotIAtsyguPicKYQackAjYKNBngQl4zUKGHTPyw1iUNmKcNjL5HiTnEvQTNXpEwH68fJzV/AwonXYyw1iuGzEiTSvBOmmQnY+SeD7ybKM0eR54PsMkfoaDbR5tkWHneZnitENSZp4fPRLwVitlAHJoQkOWof4b7eDatAUu/foXoI6PLgrz2gwROhQzluQ91S+oGArmgFViTFr4EYBjFrfMF7xdBuxFh8UuBFQKljQDMrAhWyRR6NAcYLKAM3PIDnDRPQoDSgcemllHirL0QgyMMYs89LH0aDm6RPHs1hHrVEk0ksVkqztLahXyFRWKqgpl8p1+lshRwdqY/FbHRsG7fRcoD5N6qlQ0cC9lwDpygSGEvisElCEb98RtxptTh0SyJImY0BSIjInnWhdhlH6HXk/SNBnLcjKIMnCa5SG9WBWhzw+WCiJSBbdDvtS+pflJxe0uDeaLzv7xiVUEu9eNlUo3DeZLey8XCk1eh2Mav+NjULf3Xhg/8ibkP/4AJI93SUBLQKPoACeqNB+JFxawcEo3oQqhYcrHGrXLQqq0zYN5qQzQn0vwCQr5TFONyJ7vQxIhY2NihctgJwQRE5qBPsaYGQyYFMuONpM8+EicsICFjbR3WC8pjMdzMp2oVNXshVzx6fs2NMNoqQyey0QSkAkYATRsrPVuentg8OdvnrsYcsnytP4l1+v2fR3yx9KCzlAFOy6GShh8DkEv5BMG7OtDkyXMaikd8/DKDrDhjgI+ZALIGGvE4BzB6xdMVNK6ho6hPGWNpAXqCFUD1rYKvGMkLJgvgTqbYiMPWQNw22kLzuxRXf0kzIFLgkOS5VPDY94XTvbn716/FqigLTJQNdd4zj5+q6/zYr5w6weDw/s9jknwVsslcLfeDFLdKgDyHaRpNeL1esuqSqBbVTV3YpGAm9YJ+CABT1BgVWVEWsuAbWPUJiPnutg5M9bNkrgdJG6cxY2zEcAqpAQNlRGAewoolMlMGBEPzxkTLbxUgdZXzGCEMG0LE+nUxSelljMoCsjPx3PwxucX4ObV9eB1TAKOdqsrxRLsXtP4Qnrwyn6sd+X6BpAJcCtDlwkDTwK3XC7DV26/4yd333Pv+6VSSdLAa6SrCbvPY3JGwdKDenNC4NnGLHTelM6l4EesYsW6lGU7Kdsy8EZtNETKjEGZhozrtTQ5Wo06sM0Jj5HDwd0DszwFLVyANKszzec2kTUZi9ED0AjAn6lgJ0W2UyoqBS4XitA3MqbJhDqXE45nR+FYdoQy8HEP0blVJAeooyC5PAzejL1JnN7e46c+OdF7Yv36Db3r1jX3rl3brH3qj+bm5t55TM7wsOSbo0b26TQydxbaDIBtCF6Uh7YFMhaeMEVMtOFiBN7J2ywWSMKCe/Ss34nSii6C1RlB1lpwTsCdlA0SjJcroLhdsNbjJuB1QC3Rs7VORxkP+hJdoKA2Wakww3en58nhPnz4LTh65G3tmqpWNCaecVQq2rHACVp2jrdjJulg+pYfEcS6/jmCd16BTbDCaEIWQ7IibDajn2eIoTrr1oOXPo8ccdQZI0araEzKYLAtyG3RlT3O6gZsma3U+lpDwLqvZY3GoaMEYC1eD6z2uOBiLr+5UFGBa1zq6aojI5rDIDnkWZMzCmA3ScvhpCxdFU7giBaeS9miBFBY4xqxQRuJlxQwTQKBpEugjVPM6uIOQ8oOeJFsMLTdBOxGAYE9W6wFI0wKKTCHhQVRfbFVKCwxIuRcANluSeYd6xcgTP1nDDZWtikfmpULEBsnBY6KUYfvQL4wBW/AFuOqBF+riDxYX+Ml3ye93CzRtzfV18Enw2OPqAiAVCIUThzTgIsnZhSQRC7kDzzQDnfdfY8GYJfLJTw8Hs9cGoIP6wqa9Ihm0wqayfvRPSF0b8yEkbTJkh3Wtcm8PlF+mBSYxWys4btMQD/X+vJjOcTSx8vBfPmX1w9fcrXbYTrZPRxsio22MPOFO3G+LBi3qhLo5V2ypA3tVC5QZmUTs1VPHTv1syMDg+3cy5WcLqiMDsPoW68TtnXMZG0y/G/dtm13S0sLnDp10nB9ggBccrmcBPVwzEL7iCYiok0zEZNKybBrAQa2jIkGzKB7suj5aQvm1acZsOGQBAyM9wgaTTK68mXnUV8zZBUH71w32YjyQCdmJJ09uvmGVVvo6yijs+L28Pulr756ZHLVVmdP0ZMuSTq31ut+tEJIlkgFuW1tY/1ALn/jUKG4/fToxL0Xc4Wb3LI0qV/pYgPRrJef/Q2MHf47yDU1s3UyAXPFQr9SZq6pqfnwRN+Z3bASVoJBMGRcCuNytbrxfK7wJv1NtKzmIlBdStnSKU+yr+bHEulQOP4RDL/yIuQ/6hGClltiVoEtUqgrTbMS5gXcWUCmmlQCmLlDT7sAam4cch9/CKWz/ZMTMIpswQKDZHPrJIlXXWmalbAg4FZnTNKq2kYbyrYSlxd0waGuAZTvPgoN9z8EI4e6YeS1xKTGleWrkukbNrYsRd3QoreC/fX+lTA96eyGmXsVWhfzAWfOnTcHLmG+Cbck/Qs0eFah0e2WFI+75lKusHasXNkyXip7KIgdoIKaz4HsrQHlkZ+CvKoervzp2SXbZLMSrqkQZhPIPVfzIbIZ3TjJ5EzxuO6rczoC5HvgznVN/se2+fZ9a/N1O0Nbb9jZvmX9Ex5ZHi2xvQV04UGdGIeGA0Go2X2nBuZ5hhqL636WRXz4DM4Ds3T47z4WVx8vzA7tjRB2X5L9TiIrpg/F4VbOEDqf1N3LmacH5ROnUwXxWwFJQTlAkG8/yjc/4gIw9ejKalQvPkFZquj+HuQUxNH9uI7a0PmQ4Fk9ut+4LLyOkiwfSZRGHzssV84kAlgPXfKlqdGFCApSIhAKq13Ok9/c1PyrJ3bdcqDB5Rqd2p+rTm6gaWj/nsbA2PciDP4h+Ths43jHBrgzTHBLBudbdZZPgJ2n14PsewDFTzDfkjJFB7uP+qZNMG3Cx1k8Gh9v8VOY1cPjhtFz/agx8XDaydKJgHg5mdt0omG2FZUFWN5wekZDeCsrX5TlR1Qv9FqKnfMjkKZQvCg7n2JpNsFMPz3L4nawOuP7LjpQGn6U3y72PYWIqU3H2nh7py2NK1EflzCrNt+SWJcoE0DWu5ywZ23j0f6xiaee6T39y1rnpHdbLRbA7bsF3FtaoXDqOEhujzYxq62reyw3MfFPaonZnagtou7yIVbIGMTJ6HzZBGuEFLuuoMrlQMdxAWaurKVgejkZbxjJoo7gM8lP2sT3xKGDsVgcdTh9wFsmuX8tqpcOxIb49aKUrkwZFi+IyuVjZUvo6i8oqKOgSXniDNBZ1InD7FzIDuNOjRNuAlz6NkSF/HJKMhD5oK2e/WfwCrTUel8iIC6q057W5HtpGzYR+VCZsrmcTqenvqFB27Y4MTGhvRQ562DnFxm0UcSeaRMG9+nYkTMIf0Exi4b1IMw0/YMobhaBhW/sTukahk9aRCALwfRihJ3An9lkwrhtqHw+xJz6euHLyhJKW/+JQdvJmBGXOYjqBAM2qMuvUYjoGJZvK83O2Q6ju8I+HhoBuohGd4P9+2JWY12K/DJULxBWvlIqV5t5cSmjOhoaZ0gFCl7Kttt37IAbb/QJ993Sc273vF623EeOPwiAwFm0B31XDIDL9wPwCooykHXB9OpZN6vILJIUoBs+uxCwU6yhEogROVtz4Cg6EMYFpk4SgSajkxRhHUOJQpbrQxbXqF4irIx8a2YagS7MfnegMg8hNleQhOJ550u/nUhapXV1pw8JllY3uzcL0xv2J/FltnJGWPbTdV73beRrnlphdM/CNqUeblhVq1ljMruFMHHjy/0DJ8dL5XU8HbmmDrIvPgfDf/0jyLV12jmPx3PPzVu3Hnn44UegUVGgIgCutvBRLsPB9geXix3GX+RbLO3DgduqY+AgmC8XW830/Qu4vwomr7UvdbC0w9DIr+1TeOD6Fsqu2ncyOYOdTas1T/ezsdzGP2fOKfqyVqmrwIBMwbhz167KD374Y6itrYFCoWD4vMo8tjV+iUJKMCHrggVuldSFbjQqpMDilZ1luQChDd8EhHTv7R3NTXD0/CDIBKxfTORhM2He7Y31kMic+xFhW2eNc3pjDdW25cGLILFFCJl8Dl2+/MxzXb8bLpVKpgRVKOTh2w9952tXwV/ks3k7QZoD0KRrvJ1jMHPnWwxJhMgi1sU1BVyVDv9Uz1LLi6+YUc2bL1fg1c8G2l/pP/+4B++9lR3afyuUzvXTnTVTwD1z+vRtdth0kSdnK0HsMEjLuQCylbRxSpKTHNTIdZRV1U0A3DBRrmy6lCvu/1v/wNNPH88kilXVjTWy7PVC7oP3oTxwVtvqONVLCGvTvbZ2DhtDXZQJ+CoS/T2MWfVmt4Jm1noT3k5ICgx+I1NfaJgL0ggbmPhhtHDB04oiYz4uWGhI6ox+PpHr05n/IfQMXl99yxG4VrvDrr+YL75f1dRCVX7yv5+4xkrl+kJFrS+oan2xogL1eJ0ItPT1dHV0BEZe/8tV26uALJc0mtBwqyfAZrp72PU4alQFLRL0wMx9tlaBbwzHNg039fmLmimBNMkI0oijmXqQpZFlafBZfxTlOcTKxU1+PmnsAfO3LPj9URPplP3SMS5RBu5cubKDSIKdeVXd8dnYxC1XiqUN+UqlXnMJiDyY4UZQWeByQfbF30PxzKdX8z/EEshvTSFLKA2zl1hDyIPkXmAa+bagYyXRkqlZB8ro7CC9RWUFqjTyiFNIg069+sLi8EUQvCSLX1eKg/Fyb8LAQovBMg2WlKitlrEVM7r0Sx0FClYJRaBv9WqWF9Gv2ed/C6PJQ5PLvVcvcLBwY59/T8C0cb8HppeEA4jhFMTQad3Mnce3O4ETmfocLF022CyL7lVQB+PeMX8NiS8583I3obzGEJvr8270x31hVFfLMmhSgb69a/03o3SxQQKv0wFE60KRmrp003e5DJXhISj0HoPRf7wMhVO92q4wqVSC+W6qtTk5S8H0y4sKYt8sTC8kAPrNwxBq6IUOkyJTn5/HhjnXnJ2CkQNrUZ5/P+t43IDvYGlw+TOEOnCHBaNHBHKI10nbcgUuXYDQvrx38K5rKmNvvHZo7/0HDr4nurZECxB27LWFmPorYZ6BLkBIy/EfyVeAuwLc/wswAGp0zuOHQHkBAAAAAElFTkSuQmCC';

var MenuFooter = React.createClass({
  displayName: 'MenuFooter',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'menuFooter' },
      React.createElement('img', { src: img$1 })
    );
  }
});

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

var MenuNode = React.createClass({
  displayName: 'MenuNode',

  getInitialState: function getInitialState() {
    return { href: '#', target: '', classes: '' };
  },
  componentDidMount: function componentDidMount() {
    var href = '#';
    var target = '';
    var classes = '';
    if (this.props.level == 1) {
      classes += 'rootMenuItem';
    } else {
      classes += 'menuItem';
    }
    var hasAction = this.props.data.action != null;
    if (hasAction) {
      classes += ' menuItemWithRef';
      var action = actions.parse(this.props.data.action);
      href = action.href;
      target = action.target;
    } else {
      classes += ' menuItemWithoutRef';
    }
    this.setState({ href: href, target: target, classes: classes, hasAction: hasAction });
  },
  render: function render() {
    var hasChildren = this.props.data.children != null;

    if (!hasChildren) {
      var key = 'menu node ' + this.props.data.title;
      return React.createElement(
        'div',
        { className: 'menuNode', key: key },
        this._getHead(),
        this._getOperations()
      );
    }

    var nextLevel = this.props.level + 1;
    var children = this.props.data.children.map(function (child) {
      var childKey = 'li ' + child.title;
      return React.createElement(
        'li',
        { key: childKey },
        React.createElement(MenuNode, { key: child.title, data: child, level: nextLevel })
      );
    });

    return React.DOM.div({ className: 'menuNode', key: 'menu node ' + this.props.data.title }, this._getHead(), this._getOperations(), React.DOM.ul({ key: 'ul ' + this.props.data.title }, children));
  },
  _onClick: function _onClick(event) {
    if (/^#/.test(this.state.href)) {
      be5.url.set(this.state.href);
    }
  },
  _getHead: function _getHead() {
    if (this.state.hasAction) {
      return React.DOM.a({ href: this.state.href, className: this.state.classes, target: this.state.target,
        onClick: this._onClick, key: 'a ' + this.props.data.title }, this.props.data.title);
    } else {
      return React.createElement(
        'span',
        { className: this.state.classes },
        this.props.data.title
      );
    }
  },
  _getOperations: function _getOperations() {
    var hasOperations = this.props.data.operations != null;

    if (!hasOperations) {
      var key = 'operations ' + this.props.data.title;
      return React.createElement('div', { key: key });
    }

    return this.props.data.operations.map(function (operation) {
      var href = '#!' + operation.action.arg;
      var title = operation.title == 'Insert' ? '+' : operation.title;
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
});

var MenuBody = function (_React$Component) {
  inherits(MenuBody, _React$Component);

  function MenuBody(props) {
    classCallCheck(this, MenuBody);

    var _this = possibleConstructorReturn(this, (MenuBody.__proto__ || Object.getPrototypeOf(MenuBody)).call(this, props));

    _this.state = { root: [{ title: 'Loading...' }], query: '' };

    _this._getFilteredRoot = _this._getFilteredRoot.bind(_this);
    return _this;
  }

  createClass(MenuBody, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refresh();
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      var _this2 = this;

      be5.net.request('menu', {}, function (data) {
        _this2.setState(data);
      });
    }
  }, {
    key: 'render',
    value: function render() {
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

      return filterByTitle(this.state.root, this.state.query);
    }
  }]);
  return MenuBody;
}(React.Component);

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
  onChange: propTypes.func.isRequired
};

var Menu = function (_React$Component) {
  inherits(Menu, _React$Component);

  function Menu(props) {
    classCallCheck(this, Menu);

    var _this = possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

    _this.state = {};

    _this._handleQueryChange = _this._handleQueryChange.bind(_this);
    return _this;
  }

  createClass(Menu, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'menuContainer' },
        React.createElement(MenuSearchField, { ref: 'searchfield', onChange: this._handleQueryChange }),
        React.createElement(MenuBody, { ref: 'menubody' }),
        React.createElement(MenuFooter, null)
      );
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      //this.refs.menuheader.setState({ message: be5.messages.welcome });
      this.refs.menubody.refresh();
    }
  }, {
    key: '_handleQueryChange',
    value: function _handleQueryChange(query) {
      this.refs.menubody.setState({ query: query });
    }
  }]);
  return Menu;
}(React.Component);

var SideBar = function (_React$Component) {
  inherits(SideBar, _React$Component);

  function SideBar(props) {
    classCallCheck(this, SideBar);
    return possibleConstructorReturn(this, (SideBar.__proto__ || Object.getPrototypeOf(SideBar)).call(this, props));
  }

  createClass(SideBar, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: "side" },
        React.createElement(RoleBox, { ref: 'roleSelector' }),
        React.createElement(Menu, { ref: 'menu' }),
        React.createElement('hr', null),
        React.createElement(LanguageBox, { ref: 'languageSelector' })
      );
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.setState({});
      if (this.refs.menu) this.refs.menu.refresh();
      if (this.refs.languageSelector) this.refs.languageSelector.refresh();
      if (this.refs.roleSelector) this.refs.roleSelector.refresh();
    }
  }]);
  return SideBar;
}(React.Component);

// Based on https://github.com/tomkp/react-split-pane
var Pane$1 = React.createClass({
  displayName: "SplitPane-Pane",

  getInitialState: function getInitialState() {
    return {};
  },
  render: function render() {
    var split = this.props.split;
    var classes = ['Pane', split, this.props.classes];

    var style = {
      flex: 1,
      position: 'relative',
      outline: 'none',
      overflow: 'auto'
    };

    if (this.state.hide) {
      style['display'] = 'none';
    }

    if (this.state.size) {
      if (split === 'horizontal') {
        style.height = this.state.size;
        style.display = 'flex';
      } else {
        style.width = this.state.size;
      }
      style.flex = 'none';
    }
    return React.DOM.div({ className: classes.join(' '), style: style }, this.props.children);
  }
});

var Resizer$1 = React.createClass({ displayName: "SplitPane-Resizer",
  handleDown: function handleDown(event) {
    this.props.down(event);
  },
  render: function render() {
    var split = this.props.split;
    var classes = ['Resizer', split];
    return React.DOM.span({ className: classes.join(' '), onMouseDown: this.handleDown });
  }
});

var SplitPane$3 = React.createClass({ displayName: "SplitPane",
  propTypes: {
    minSize: React.PropTypes.number,
    split: React.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return {
      active: false
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      minSize: 0
    };
  },
  componentDidMount: function componentDidMount() {
    document.addEventListener('mouseup', this.up);
    document.addEventListener('mousemove', this.move);
    var ref = this.refs.pane1;
    if (ref) {
      if (this.props.defaultSize) {
        ref.setState({ size: this.props.defaultSize });
        if (this.props.defaultSize < 32) {
          ref.setState({ hide: true });
        }
      }
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    document.removeEventListener('mouseup', this.up);
    document.removeEventListener('mousemove', this.move);
  },
  down: function down(event) {
    var position = this.props.split === 'vertical' ? event.clientX : event.clientY;
    this.setState({
      active: true,
      position: position
    });
    event.preventDefault();
  },
  move: function move(event) {
    if (this.state.active) {
      var ref = this.refs.pane1;
      if (ref) {
        var node = ReactDOM.findDOMNode(ref);
        if (window.getComputedStyle) {
          var styles = window.getComputedStyle(node);
          var rect = node.getBoundingClientRect();
          var width = rect.right - rect.left;
          var height = rect.bottom - rect.top;
          var current = this.props.split === 'vertical' ? event.clientX : event.clientY;
          var size = this.props.split === 'vertical' ? width : height;
          var position = this.state.position;
          var newSize = size - (position - current);
          this.setState({
            position: current
          });
          if (newSize < 32) {
            ref.setState({ hide: true });
          } else {
            ref.setState({ hide: false });
          }
          if (newSize >= this.props.minSize) {
            ref.setState({
              size: newSize
            });
          }
        }
        event.preventDefault();
      }
    }
  },
  up: function up() {
    this.setState({
      active: false
    });
  },
  merge: function merge(into, obj) {
    for (var attr in obj) {
      into[attr] = obj[attr];
    }
  },
  render: function render() {
    var split = this.props.split || 'vertical';

    var style = {
      display: 'flex',
      flex: 1,
      position: 'relative',
      outline: 'none',
      overflow: 'hidden'
    };

    if (split === 'horizontal') {
      this.merge(style, {
        flexDirection: 'column',
        height: '100%',
        minHeight: '100%',
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%'
      });
    } else {
      this.merge(style, {
        flexDirection: 'row',
        height: '100%',
        position: 'absolute',
        left: 0,
        right: 0
      });
    }

    var elements = [];
    var children = this.props.children;
    var child0 = children[0];
    var child1 = children[1];
    elements.push(React.createElement(Pane$1, { ref: "pane1", key: "pane1", split: split, classes: "pane1" }, child0));
    elements.push(React.createElement(Resizer$1, { ref: "resizer", key: "resizer", down: this.down, split: split }));
    elements.push(React.createElement(Pane$1, { ref: "pane2", key: "pane2", split: split, classes: "pane2" }, child1));

    var classes = ['SplitPane', split];

    return React.DOM.div({ className: classes.join(' '), style: style, ref: "splitPane" }, elements);
  }
});

var sAlertTools = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    if (typeof undefined === "function" && undefined.amd) {
        undefined(['exports'], factory);
    } else {
        factory(exports);
    }
})(commonjsGlobal, function (exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var actualGlobalConfig = void 0;

    var sAlertTools = {
        randomId: function randomId() {
            return Math.random().toString(36).split('.')[1];
        },
        returnFirstDefined: function returnFirstDefined() {
            var value = void 0;
            var i = void 0;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            for (i = 0; i < args.length; i++) {
                if (typeof args[i] !== 'undefined') {
                    value = args[i];
                    break;
                }
            }
            return value;
        },
        styleToObj: function styleToObj(input) {
            var result = {},
                i = void 0,
                entry = void 0,
                attributes = input && input.split(';').filter(Boolean);

            for (i = 0; i < attributes.length; i++) {
                entry = attributes[i].split(':');
                result[entry.splice(0, 1)[0].trim()] = entry.join(':').trim();
            }
            return result;
        },
        setGlobalConfig: function setGlobalConfig(config) {
            if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
                actualGlobalConfig = config;
            }
        },
        getGlobalConfig: function getGlobalConfig() {
            return actualGlobalConfig;
        }
    };

    exports.default = sAlertTools;
});
});

unwrapExports(sAlertTools);

var sAlertStore = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    if (typeof undefined === "function" && undefined.amd) {
        undefined(['exports'], factory);
    } else {
        factory(exports);
    }
})(commonjsGlobal, function (exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    // custom simple store based on a awesome Redux library https://github.com/rackt/redux

    var createSAlertStore = function createSAlertStore(reducer) {
        var state = void 0;
        var listeners = [];
        var getState = function getState() {
            return state;
        };
        var dispatch = function dispatch(action) {
            state = reducer(state, action);
            listeners.forEach(function (listener) {
                return listener();
            });
        };
        var subscribe = function subscribe(listener) {
            listeners.push(listener);
            return function () {
                listeners = listeners.filter(function (l) {
                    return l !== listener;
                });
            };
        };
        dispatch({});
        return {
            getState: getState, dispatch: dispatch, subscribe: subscribe
        };
    };

    var insert = function insert(state, action) {
        return [].concat(_toConsumableArray(state), [action.data]);
    };

    var remove = function remove(state, action) {
        var elemToRemoveArray = state.slice().filter(function (item) {
            return item.id === action.data.id;
        });
        if (Array.isArray(elemToRemoveArray)) {
            var elemToRemoveIndex = state.indexOf(elemToRemoveArray[0]);
            return [].concat(_toConsumableArray(state.slice(0, elemToRemoveIndex)), _toConsumableArray(state.slice(elemToRemoveIndex + 1)));
        }
        return state;
    };

    var alertsReducer = function alertsReducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var action = arguments[1];

        switch (action.type) {
            case 'INSERT':
                return insert(state, action);
            case 'REMOVE':
                return remove(state, action);
            case 'REMOVEALL':
                return [];
            default:
                return state;
        }
    };

    var sAlertStore = createSAlertStore(alertsReducer);

    exports.default = sAlertStore;
});
});

unwrapExports(sAlertStore);

var SAlertContentTmpl = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    if (typeof undefined === "function" && undefined.amd) {
        undefined(['exports', 'react', 'prop-types'], factory);
    } else {
        factory(exports, React, propTypes);
    }
})(commonjsGlobal, function (exports, _react, _propTypes) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _propTypes2 = _interopRequireDefault(_propTypes);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
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

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
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
    }

    var SAlertContentTmpl = function (_React$Component) {
        _inherits(SAlertContentTmpl, _React$Component);

        function SAlertContentTmpl(props) {
            _classCallCheck(this, SAlertContentTmpl);

            return _possibleConstructorReturn(this, (SAlertContentTmpl.__proto__ || Object.getPrototypeOf(SAlertContentTmpl)).call(this, props));
        }

        _createClass(SAlertContentTmpl, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    { className: this.props.classNames, id: this.props.id, style: this.props.styles },
                    _react2.default.createElement(
                        'div',
                        { className: 's-alert-box-inner' },
                        this.props.message
                    ),
                    _react2.default.createElement('span', { className: 's-alert-close', onClick: this.props.handleClose })
                );
            }
        }]);

        return SAlertContentTmpl;
    }(_react2.default.Component);

    SAlertContentTmpl.propTypes = {
        id: _propTypes2.default.string.isRequired,
        classNames: _propTypes2.default.string.isRequired,
        styles: _propTypes2.default.object.isRequired,
        message: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
        handleClose: _propTypes2.default.func.isRequired,
        customFields: _propTypes2.default.object
    };

    exports.default = SAlertContentTmpl;
});
});

unwrapExports(SAlertContentTmpl);

var SAlertContent = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    if (typeof undefined === "function" && undefined.amd) {
        undefined(['exports', 'react', 'react-dom', 'prop-types', './s-alert-parts/s-alert-tools', './s-alert-parts/s-alert-store', './SAlertContentTmpl'], factory);
    } else {
        factory(exports, React, ReactDOM, propTypes, sAlertTools, sAlertStore, SAlertContentTmpl);
    }
})(commonjsGlobal, function (exports, _react, _reactDom, _propTypes, _sAlertTools, _sAlertStore, _SAlertContentTmpl) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _propTypes2 = _interopRequireDefault(_propTypes);

    var _sAlertTools2 = _interopRequireDefault(_sAlertTools);

    var _sAlertStore2 = _interopRequireDefault(_sAlertStore);

    var _SAlertContentTmpl2 = _interopRequireDefault(_SAlertContentTmpl);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
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

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
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
    }

    var SAlertContent = function (_React$Component) {
        _inherits(SAlertContent, _React$Component);

        function SAlertContent(props) {
            _classCallCheck(this, SAlertContent);

            return _possibleConstructorReturn(this, (SAlertContent.__proto__ || Object.getPrototypeOf(SAlertContent)).call(this, props));
        }

        _createClass(SAlertContent, [{
            key: 'handleCloseAlert',
            value: function handleCloseAlert() {
                var closingTimeout = void 0;
                var alertId = this.props.id;
                var currentAlertElem = _reactDom2.default.findDOMNode(this);
                var animationClose = function animationClose() {
                    currentAlertElem.style.display = 'none';
                    _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: alertId } });
                    clearTimeout(closingTimeout);
                };
                if (document.hidden || document.webkitHidden || !currentAlertElem.classList.contains('s-alert-is-effect')) {
                    _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: alertId } });
                } else {
                    currentAlertElem.classList.remove('s-alert-show');
                    closingTimeout = setTimeout(function () {
                        currentAlertElem.classList.add('s-alert-hide');
                    }, 100);
                    currentAlertElem.removeEventListener('webkitAnimationEnd', animationClose, false);
                    currentAlertElem.removeEventListener('animationend', animationClose, false);
                    currentAlertElem.addEventListener('webkitAnimationEnd', animationClose, false);
                    currentAlertElem.addEventListener('animationend', animationClose, false);
                }
                // stop audio when closing
                this.alertAudio && this.alertAudio.load();
            }
        }, {
            key: 'componentWillMount',
            value: function componentWillMount() {
                var beep = this.props.beep;
                var condition = this.props.condition;
                if (beep && typeof beep === 'string') {
                    this.alertAudio = new Audio(beep);
                    this.alertAudio.load();
                    this.alertAudio.play();
                }
                if (beep && (typeof beep === 'undefined' ? 'undefined' : _typeof(beep)) === 'object' && condition === 'info') {
                    this.alertAudio = new Audio(beep.info);
                    this.alertAudio.load();
                    this.alertAudio.play();
                }
                if (beep && (typeof beep === 'undefined' ? 'undefined' : _typeof(beep)) === 'object' && condition === 'error') {
                    this.alertAudio = new Audio(beep.error);
                    this.alertAudio.load();
                    this.alertAudio.play();
                }
                if (beep && (typeof beep === 'undefined' ? 'undefined' : _typeof(beep)) === 'object' && condition === 'success') {
                    this.alertAudio = new Audio(beep.success);
                    this.alertAudio.load();
                    this.alertAudio.play();
                }
                if (beep && (typeof beep === 'undefined' ? 'undefined' : _typeof(beep)) === 'object' && condition === 'warning') {
                    this.alertAudio = new Audio(beep.warning);
                    this.alertAudio.load();
                    this.alertAudio.play();
                }
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                if (typeof this.props.timeout === 'number') {
                    this.closeTimer = setTimeout(function () {
                        _this2.handleCloseAlert();
                    }, this.props.timeout);
                }
                if (this.props.onShow) {
                    this.props.onShow();
                }
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                if (this.closeTimer) {
                    clearTimeout(this.closeTimer);
                }
                if (this.props.onClose) {
                    this.props.onClose();
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var classNames$$1 = 's-alert-box s-alert-' + this.props.condition + ' s-alert-' + this.props.position + ' ' + (this.props.effect ? 's-alert-is-effect s-alert-effect-' + this.props.effect : '') + ' s-alert-show';
                var message = this.props.html ? _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: this.props.message } }) : this.props.message;
                var styles = this.props.boxPosition ? _sAlertTools2.default.styleToObj(this.props.boxPosition) : {};
                var id = this.props.id;
                var handleClose = this.handleCloseAlert.bind(this);
                var contentTemplate = this.props.contentTemplate || _SAlertContentTmpl2.default;
                var customFields = this.props.customFields || {};

                return _react2.default.createElement(contentTemplate, { classNames: classNames$$1, id: id, styles: styles, message: message, handleClose: handleClose, customFields: customFields });
            }
        }]);

        return SAlertContent;
    }(_react2.default.Component);

    SAlertContent.propTypes = {
        condition: _propTypes2.default.string.isRequired,
        message: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
        position: _propTypes2.default.string.isRequired,
        boxPosition: _propTypes2.default.string,
        id: _propTypes2.default.string.isRequired,
        effect: _propTypes2.default.string,
        beep: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object, _propTypes2.default.bool]),
        timeout: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['none']), _propTypes2.default.number]),
        html: _propTypes2.default.bool,
        onClose: _propTypes2.default.func,
        onShow: _propTypes2.default.func,
        customFields: _propTypes2.default.object,
        contentTemplate: _propTypes2.default.func
    };

    exports.default = SAlertContent;
});
});

unwrapExports(SAlertContent);

var sAlertDataPrep = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    if (typeof undefined === "function" && undefined.amd) {
        undefined(['exports', 'react', 'react-dom', '../SAlertContent', './s-alert-store', './s-alert-tools'], factory);
    } else {
        factory(exports, React, ReactDOM, SAlertContent, sAlertStore, sAlertTools);
    }
})(commonjsGlobal, function (exports, _react, _reactDom, _SAlertContent, _sAlertStore, _sAlertTools) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _SAlertContent2 = _interopRequireDefault(_SAlertContent);

    var _sAlertStore2 = _interopRequireDefault(_sAlertStore);

    var _sAlertTools2 = _interopRequireDefault(_sAlertTools);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var getAlertData = function getAlertData(sAlertPosition) {
        var positionTop = 0;
        var positionBottom = 0;
        var padding = 0;
        var alerts = {};
        var style = void 0;
        var docElement = void 0;
        var sAlertBoxHeight = void 0;
        var positionTypeTop = void 0;
        var positionTypeBottom = void 0;
        var checkFirst = function checkFirst(type, objId) {
            var collectionOfType = sAlertCollection.filter(function (obj) {
                return obj.position === type || sAlertGlobalConfig.position === type;
            });
            return collectionOfType && collectionOfType[0].id === objId;
        };
        var positionFunc = function positionFunc(position, positionType, alert, docElement, sAlertBoxHeight, reactComponent) {
            padding = aStack.spacing || parseInt(getComputedStyle(_reactDom2.default.findDOMNode(reactComponent))[positionType]);
            if (checkFirst(aPosition, alert.id) && aOffset) {
                position = 0;
                position = position + parseInt(aOffset);
            }
            if (checkFirst(aPosition, alert.id) && aStack.spacing) {
                position = position;
            } else {
                position = position + parseInt(padding);
            }
            style = positionType + ': ' + position + 'px;';
            position = position + sAlertBoxHeight;
            return position;
        };

        var sAlertGlobalConfig = _sAlertTools2.default.getGlobalConfig();
        var aStack = void 0;
        var aContentTemplate = void 0;
        var aOffset = void 0;
        var aMessage = void 0;
        var aHtml = void 0;
        var aCustomFields = void 0;
        var aPosition = void 0;

        var query = {};
        if (sAlertPosition === 'left') {
            query = function query(item) {
                return item.position === 'top-left' || item.position === 'bottom-left' || !item.position && (sAlertGlobalConfig.position === 'top-left' || sAlertGlobalConfig.position === 'bottom-left');
            };
        }
        if (sAlertPosition === 'right') {
            query = function query(item) {
                return item.position === 'top-right' || item.position === 'bottom-right' || !item.position && (sAlertGlobalConfig.position === 'top-right' || sAlertGlobalConfig.position === 'bottom-right');
            };
        }
        if (sAlertPosition === 'full-top') {
            query = function query(item) {
                return item.position === 'top' || !item.position && sAlertGlobalConfig.position === 'top';
            };
        }
        if (sAlertPosition === 'full-bottom') {
            query = function query(item) {
                return item.position === 'bottom' || !item.position && sAlertGlobalConfig.position === 'bottom';
            };
        }

        var currentState = _sAlertStore2.default.getState();
        var sAlertCollection = currentState.slice().filter(query);

        return sAlertCollection.map(function (alert) {
            aStack = sAlertGlobalConfig.stack;
            aContentTemplate = sAlertGlobalConfig.contentTemplate;
            aOffset = _sAlertTools2.default.returnFirstDefined(alert.offset, sAlertGlobalConfig.offset);
            aMessage = _sAlertTools2.default.returnFirstDefined(alert.message, sAlertGlobalConfig.message);
            aHtml = _sAlertTools2.default.returnFirstDefined(alert.html, sAlertGlobalConfig.html);
            aCustomFields = _sAlertTools2.default.returnFirstDefined(alert.customFields, sAlertGlobalConfig.customFields);
            aPosition = _sAlertTools2.default.returnFirstDefined(alert.position, sAlertGlobalConfig.position);
            positionTypeTop = aPosition && /top/g.test(aPosition);
            positionTypeBottom = aPosition && /bottom/g.test(aPosition);
            if (aStack) {
                // checking alert box height - needed to calculate position
                docElement = document.createElement('div');
                docElement.classList.add('s-alert-box-height');

                // mock element, needed for positions calculations
                var reactElement = _react2.default.createElement(_SAlertContent2.default, {
                    key: _sAlertTools2.default.randomId(),
                    id: _sAlertTools2.default.randomId(),
                    condition: alert.condition,
                    message: aMessage,
                    position: aPosition,
                    effect: alert.effect,
                    boxPosition: alert.boxPosition,
                    beep: false,
                    timeout: 'none',
                    html: aHtml,
                    contentTemplate: aContentTemplate,
                    customFields: aCustomFields
                });
                var reactComponent = _reactDom2.default.render(reactElement, docElement);

                document.body.appendChild(docElement);
                sAlertBoxHeight = parseInt(getComputedStyle(_reactDom2.default.findDOMNode(reactComponent))['height']);
                if (positionTypeTop) {
                    positionTop = positionFunc(positionTop, 'top', alert, docElement, sAlertBoxHeight, reactComponent);
                }
                if (positionTypeBottom) {
                    positionBottom = positionFunc(positionBottom, 'bottom', alert, docElement, sAlertBoxHeight, reactComponent);
                }
                var sAlertComputedStyle = getComputedStyle(_reactDom2.default.findDOMNode(reactComponent));
                if (sAlertPosition === 'left') {
                    style = style + 'left: ' + (aStack.spacing || parseInt(sAlertComputedStyle.left)) + 'px;';
                }
                if (sAlertPosition === 'right') {
                    style = style + 'right: ' + (aStack.spacing || parseInt(sAlertComputedStyle.right)) + 'px;';
                }
                alerts = Object.assign({}, alert, { boxPosition: style });
                _reactDom2.default.unmountComponentAtNode(docElement);
                docElement.parentNode.removeChild(docElement);
            } else if (aOffset && positionTypeTop) {
                alerts = Object.assign({}, alert, { boxPosition: 'top: ' + parseInt(aOffset) + 'px;' });
            } else if (aOffset && positionTypeBottom) {
                alerts = Object.assign({}, alert, { boxPosition: 'bottom: ' + parseInt(aOffset) + 'px;' });
            } else {
                alerts = alert;
            }
            return alerts;
        });
    };

    exports.default = getAlertData;
});
});

unwrapExports(sAlertDataPrep);

var SAlert = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    if (typeof undefined === "function" && undefined.amd) {
        undefined(['exports', 'react', './SAlertContent', 'prop-types', './s-alert-parts/s-alert-store', './s-alert-parts/s-alert-tools', './s-alert-parts/s-alert-data-prep'], factory);
    } else {
        factory(exports, React, SAlertContent, propTypes, sAlertStore, sAlertTools, sAlertDataPrep);
    }
})(commonjsGlobal, function (exports, _react, _SAlertContent, _propTypes, _sAlertStore, _sAlertTools, _sAlertDataPrep) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _SAlertContent2 = _interopRequireDefault(_SAlertContent);

    var _propTypes2 = _interopRequireDefault(_propTypes);

    var _sAlertStore2 = _interopRequireDefault(_sAlertStore);

    var _sAlertTools2 = _interopRequireDefault(_sAlertTools);

    var _sAlertDataPrep2 = _interopRequireDefault(_sAlertDataPrep);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
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

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
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
    }

    var insertFunc = function insertFunc(msg, data, condition) {
        var id = _sAlertTools2.default.randomId();
        _sAlertStore2.default.dispatch({
            type: 'INSERT',
            data: Object.assign({}, data, {
                id: id,
                condition: condition,
                message: msg
            })
        });
        return id;
    };

    var SAlert = function (_React$Component) {
        _inherits(SAlert, _React$Component);

        function SAlert(props) {
            _classCallCheck(this, SAlert);

            var _this = _possibleConstructorReturn(this, (SAlert.__proto__ || Object.getPrototypeOf(SAlert)).call(this, props));

            _this.state = {
                dataRight: [],
                dataLeft: [],
                dataTop: [],
                dataBottom: []
            };
            return _this;
        }

        _createClass(SAlert, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                var storeStateLeft = void 0;
                var storeStateRight = void 0;
                var storeStateTop = void 0;
                var storeStateBottom = void 0;

                var addToStoreRight = function addToStoreRight() {
                    var length = void 0;
                    storeStateRight = (0, _sAlertDataPrep2.default)('right') || [];
                    length = storeStateRight.length;
                    if (_this2.props.stack && _this2.props.stack.limit && length > _this2.props.stack.limit) {
                        var id = storeStateRight[0].id;
                        _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
                        storeStateRight = (0, _sAlertDataPrep2.default)('right') || [];
                    }
                    _this2.setState({ dataRight: storeStateRight });
                };
                this.unsubStoreRight = _sAlertStore2.default.subscribe(addToStoreRight);

                var addToStoreLeft = function addToStoreLeft() {
                    var length = void 0;
                    storeStateLeft = (0, _sAlertDataPrep2.default)('left') || [];
                    length = storeStateLeft.length;
                    if (_this2.props.stack && _this2.props.stack.limit && length > _this2.props.stack.limit) {
                        var id = storeStateLeft[0].id;
                        _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
                        storeStateLeft = (0, _sAlertDataPrep2.default)('left') || [];
                    }
                    _this2.setState({ dataLeft: storeStateLeft });
                };
                this.unsubStoreLeft = _sAlertStore2.default.subscribe(addToStoreLeft);

                var addToStoreTop = function addToStoreTop() {
                    var length = void 0;
                    storeStateTop = (0, _sAlertDataPrep2.default)('full-top') || [];
                    length = storeStateTop.length;
                    if (_this2.props.stack && _this2.props.stack.limit && length > _this2.props.stack.limit) {
                        var id = storeStateTop[0].id;
                        _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
                        storeStateTop = (0, _sAlertDataPrep2.default)('full-top') || [];
                    }
                    _this2.setState({ dataTop: storeStateTop });
                };
                this.unsubStoreTop = _sAlertStore2.default.subscribe(addToStoreTop);

                var addToStoreBottom = function addToStoreBottom() {
                    var length = void 0;
                    storeStateBottom = (0, _sAlertDataPrep2.default)('full-bottom') || [];
                    length = storeStateBottom.length;
                    if (_this2.props.stack && _this2.props.stack.limit && length > _this2.props.stack.limit) {
                        var id = storeStateBottom[0].id;
                        _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
                        storeStateBottom = (0, _sAlertDataPrep2.default)('full-bottom') || [];
                    }
                    _this2.setState({ dataBottom: storeStateBottom });
                };
                this.unsubStoreBottom = _sAlertStore2.default.subscribe(addToStoreBottom);

                // set up global config from global SAlert props
                // only stuff needed for getAlertData
                var globalConfig = {
                    contentTemplate: this.props.contentTemplate,
                    offset: this.props.offset,
                    message: this.props.message,
                    stack: this.props.stack,
                    html: this.props.html,
                    customFields: this.props.customFields,
                    position: this.props.position || 'top-right'
                };
                _sAlertTools2.default.setGlobalConfig(globalConfig);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.unsubStoreTop();
                this.unsubStoreBottom();
                this.unsubStoreLeft();
                this.unsubStoreRight();
            }
        }, {
            key: 'render',
            value: function render() {
                var _this3 = this;

                var mapFunc = function mapFunc(alert, index) {
                    var customKey = 'alert-key-' + alert.id + '-' + alert.position;
                    var id = alert.id;
                    var condition = _sAlertTools2.default.returnFirstDefined(alert.condition, 'info');
                    var message = _sAlertTools2.default.returnFirstDefined(alert.message, _this3.props.message, '');
                    var position = _sAlertTools2.default.returnFirstDefined(alert.position, _this3.props.position, 'top-right');
                    var offset = _sAlertTools2.default.returnFirstDefined(alert.offset, _this3.props.offset, 0);
                    var effect = _sAlertTools2.default.returnFirstDefined(alert.effect, _this3.props.effect);
                    var boxPosition = alert.boxPosition;
                    var beep = _sAlertTools2.default.returnFirstDefined(alert.beep, _this3.props.beep, false);
                    var timeout = _sAlertTools2.default.returnFirstDefined(alert.timeout, _this3.props.timeout, 5000);
                    var html = _sAlertTools2.default.returnFirstDefined(alert.html, _this3.props.html);
                    var onClose = _sAlertTools2.default.returnFirstDefined(alert.onClose, _this3.props.onClose);
                    var onShow = _sAlertTools2.default.returnFirstDefined(alert.onShow, _this3.props.onShow);
                    var customFields = _sAlertTools2.default.returnFirstDefined(alert.customFields, _this3.props.customFields);
                    var contentTemplate = _this3.props.contentTemplate;
                    return _react2.default.createElement(_SAlertContent2.default, {
                        key: customKey,
                        id: id,
                        customFields: customFields,
                        condition: condition,
                        message: message,
                        position: position,
                        effect: effect,
                        boxPosition: boxPosition,
                        beep: beep,
                        timeout: timeout,
                        html: html,
                        onClose: onClose,
                        onShow: onShow,
                        contentTemplate: contentTemplate });
                };
                var sAlertElemsRight = this.state.dataRight.map(mapFunc);
                var sAlertElemsLeft = this.state.dataLeft.map(mapFunc);
                var sAlertElemsTop = this.state.dataTop.map(mapFunc);
                var sAlertElemsBottom = this.state.dataBottom.map(mapFunc);
                return _react2.default.createElement(
                    'div',
                    { className: 's-alert-wrapper' },
                    sAlertElemsRight,
                    sAlertElemsLeft,
                    sAlertElemsTop,
                    sAlertElemsBottom
                );
            }
        }], [{
            key: 'info',
            value: function info(msg, data) {
                return insertFunc(msg, data, 'info');
            }
        }, {
            key: 'error',
            value: function error(msg, data) {
                return insertFunc(msg, data, 'error');
            }
        }, {
            key: 'warning',
            value: function warning(msg, data) {
                return insertFunc(msg, data, 'warning');
            }
        }, {
            key: 'success',
            value: function success(msg, data) {
                return insertFunc(msg, data, 'success');
            }
        }, {
            key: 'close',
            value: function close(id) {
                _sAlertStore2.default.dispatch({ type: 'REMOVE', data: { id: id } });
            }
        }, {
            key: 'closeAll',
            value: function closeAll() {
                _sAlertStore2.default.dispatch({ type: 'REMOVEALL' });
            }
        }]);

        return SAlert;
    }(_react2.default.Component);

    SAlert.propTypes = {
        message: _propTypes2.default.string,
        position: _propTypes2.default.string,
        offset: _propTypes2.default.number,
        stack: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.object]),
        effect: _propTypes2.default.string,
        beep: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object, _propTypes2.default.bool]),
        timeout: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['none']), _propTypes2.default.number]),
        html: _propTypes2.default.bool,
        onClose: _propTypes2.default.func,
        onShow: _propTypes2.default.func,
        customFields: _propTypes2.default.object,
        contentTemplate: _propTypes2.default.func
    };

    exports.default = SAlert;
});
});

unwrapExports(SAlert);

var reactSAlert = SAlert;

var Be5Components = function (_React$Component) {
  inherits(Be5Components, _React$Component);

  function Be5Components(props) {
    classCallCheck(this, Be5Components);

    var _this = possibleConstructorReturn(this, (Be5Components.__proto__ || Object.getPrototypeOf(Be5Components)).call(this, props));

    _this.state = {
      modal: false
    };

    //this.toggle = this.toggle.bind(this);
    _this.open = _this.open.bind(_this);
    _this.close = _this.close.bind(_this);

    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  // toggle() {
  //   this.setState({
  //     modal: !this.state.modal
  //   });
  // }

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
          reactSAlert.error(data.msg, {
            position: 'top-right',
            timeout: 5000
          });
        } else {
          reactSAlert.success(data.msg, {
            position: 'top-right',
            timeout: 5000
          });
        }
      });
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      //todo
      console.log(this.props, this.state);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(reactSAlert, { stack: { limit: 10 } }),
        React.createElement(
          Modal,
          { isOpen: this.state.modal, toggle: this.close, className: this.props.className },
          React.createElement(Document, { ref: 'document', frontendParams: { documentName: be5.mainModalDocumentName } })
        )
      );
    }
  }, {
    key: 'refresh',
    value: function refresh() {}
  }]);
  return Be5Components;
}(React.Component);

var Application = function (_React$Component) {
  inherits(Application, _React$Component);

  function Application(props) {
    classCallCheck(this, Application);

    var _this = possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).call(this, props));

    _this.refresh = _this.refresh.bind(_this);
    return _this;
  }

  createClass(Application, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      //TODO refactoring to "RefreshAll"
      bus.listen('LoggedOut', this.refresh);
      bus.listen('LoggedIn', this.refresh);
      bus.listen('LanguageChanged', this.refresh);
      bus.listen('RoleChanged', this.refresh);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(Be5Components, { ref: 'be5Components' }),
        React.createElement(
          SplitPane$3,
          { split: 'vertical', defaultSize: 280 },
          React.createElement(SideBar, { ref: 'sideBar' }),
          React.createElement(Document, { ref: 'document', frontendParams: { documentName: be5.mainDocumentName } })
        )
      );
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.refs.sideBar.refresh();
      this.refs.be5Components.refresh();
    }
  }]);
  return Application;
}(React.Component);

var listeners$1 = [];

var actions$1 = []; // all actions from backend

var tree = {};

var menu = {
  find: function find(coords) {
    return _(actions$1).findWhere(coords);
  },
  getRaw: function getRaw() {
    return tree;
  }
};

var getMenu = function getMenu() {
  return menu;
};

var addListener = function addListener(listener) {
  listeners$1.push(listener);
};

var changed = function changed() {
  _(listeners$1).each(function (listener) {
    listener(menu);
  });
};

var updateActions = function updateActions() {
  var resultActions = [];

  _(tree.root).each(function (item) {
    if (item.hasOwnProperty('action')) {
      resultActions.push(_.extend({}, item.id, { action: item.action, title: item.title }));
    }
    _(item.children || []).each(function (qitem) {
      resultActions.push(_.extend({}, qitem.id, { action: qitem.action, title: qitem.title }));
    });
  });

  actions$1 = resultActions;
};

var load = function load() {
  be5.net.request('menu/withIds', {}, function (data) {
    tree = data;
    updateActions(data);
    changed();
  });
};

//load();

var Be5MenuHolder = {
  // function(listener)
  addListener: addListener,
  // function()
  changed: changed,
  // function()
  getMenu: getMenu,
  // function()
  reload: load
};

var Be5Menu = React.createClass({
  displayName: 'Be5Menu',

  propTypes: {
    // true => default menu
    // false => user lists all possible items using Be5MenuItem
    show: React.PropTypes.bool.isRequired,
    branding: React.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return { loaded: false };
  },
  componentDidMount: function componentDidMount() {
    if (this.props.show) {
      this._onMenuChanged(Be5MenuHolder.getMenu());
      Be5MenuHolder.addListener(this._onMenuChanged);
    }
  },
  _onMenuChanged: function _onMenuChanged(menu) {
    this.setState({
      loaded: Object.keys(menu.getRaw()).length !== 0,
      menu: menu.getRaw()
    });
  },
  render: function render() {
    if (!this.props.show) {
      return React.createElement('span', null);
    }

    var rootMenuItems = this.state.loaded ? this._renderMenuItems(this.state.menu.root, false) : React.createElement(
      'li',
      null,
      'Loading...'
    );
    var branding = this.props.branding ? React.createElement(
      'a',
      { className: 'navbar-brand', href: '#' },
      this.props.branding
    ) : undefined;
    var rightButtons = this._renderRightButtons();

    return React.createElement(
      'nav',
      { className: 'navbar navbar-light bg-faded' },
      React.createElement(
        'div',
        { className: 'container' },
        branding,
        React.createElement(
          'ul',
          { className: 'nav navbar-nav' },
          rootMenuItems
        ),
        rightButtons
      )
    );
  },
  _renderRightButtons: function _renderRightButtons() {
    if (!this.state.loaded) {
      return undefined;
    }
    if (!this.state.menu.loggedIn) {
      return React.createElement(
        'form',
        { className: 'form-inline pull-right' },
        React.createElement(
          'a',
          { className: 'btn btn-secondary', role: 'button', href: '#!login' },
          'Sign in'
        ),
        ' ',
        React.createElement(
          'a',
          { className: 'btn btn-primary', role: 'button', href: '#!register' },
          'Sign up'
        )
      );
    }
    return React.createElement(
      'form',
      { className: 'form-inline pull-right' },
      React.createElement(
        'a',
        { className: 'btn btn-secondary', role: 'button', href: '#!logout' },
        'Log out'
      )
    );
  },
  _renderMenuItems: function _renderMenuItems(items, inDropdown) {
    var _this = this;

    return _(items).map(function (item) {
      if (item.default) {
        return undefined;
      }

      if (!item.children || item.children.length === 0) {
        var _actions$parse = actions.parse(item.action),
            href = _actions$parse.href,
            target = _actions$parse.target;

        var liClass = inDropdown ? '' : 'nav-item';
        var aClass = inDropdown ? 'dropdown-item' : 'nav-link';
        return React.createElement(
          'li',
          { className: liClass, key: target + href },
          React.createElement(
            'a',
            { className: aClass, href: href, target: target },
            item.title
          )
        );
      }

      var dropdownMenuItems = _this._renderMenuItems(item.children, true);

      return React.createElement(
        'li',
        { className: 'nav-item dropdown', key: item.title },
        React.createElement(
          'a',
          { className: 'nav-link dropdown-toggle', href: '#', 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false', role: 'button' },
          item.title
        ),
        React.createElement(
          'ul',
          { className: 'dropdown-menu' },
          dropdownMenuItems
        )
      );
    });
  },


  /* public */
  refresh: function refresh() {
    Be5MenuHolder.reload();
  }
});

var Be5MenuItem = React.createClass({
  displayName: 'Be5MenuItem',

  propTypes: {
    entity: React.PropTypes.string,
    view: React.PropTypes.string,
    op: React.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return { available: false, title: '' };
  },
  componentDidMount: function componentDidMount() {
    this._onMenuChanged(Be5MenuHolder.getMenu());
    Be5MenuHolder.addListener(this._onMenuChanged);
  },
  render: function render() {
    if (!this.state.available) {
      return React.createElement('span', null);
    }

    var _actions$parse = actions.parse(Be5MenuHolder.getMenu().find(this._getCoordinates()).action),
        href = _actions$parse.href,
        target = _actions$parse.target;

    return React.createElement(
      'a',
      { className: 'menu-item', href: href, target: target },
      this.state.title
    );
  },
  _onMenuChanged: function _onMenuChanged(menu) {
    var item = Be5MenuHolder.getMenu().find(this._getCoordinates());
    if (!item) {
      this.setState({ available: false });
    } else {
      this.setState({ available: true, title: item.title });
    }
  },


  // Translates "op" to "operation" and "view" to "query"
  // Don't read it, it's boring.
  _getCoordinates: function _getCoordinates() {
    if (this.props.view && this.props.op) {
      return {
        entity: this.props.entity, query: this.props.view, operation: this.props.op
      };
    }
    if (this.props.op) {
      return {
        entity: this.props.entity, operation: this.props.op
      };
    }
    return {
      entity: this.props.entity,
      query: this.props.view || Const.DEFAULT_VIEW
    };
  }
});

var Sorter = React.createClass({
  displayName: 'Sorter',

  propTypes: {
    /**
     * An array of columns with name and title.
     */
    columns: React.PropTypes.array.isRequired,

    /**
     * A callback to call when the user clicks a sorting button.
     */
    onSelect: React.PropTypes.func.isRequired,

    /**
     * A name of the soring column, or undefined.
     */
    sortingColumnName: React.PropTypes.string,

    /**
     * A way to sort, or undefined.
     */
    sortingOrder: React.PropTypes.oneOf(['asc', 'desc'])
  },

  render: function render() {
    if (this.props.columns.length === 0) {
      return React.createElement('div', null);
    }

    return React.createElement(
      'form',
      { className: 'form-inline' },
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement(
          'label',
          null,
          'Sort by'
        ),
        ' ',
        React.createElement(
          'div',
          { className: 'btn-group btn-group-sm', role: 'group', 'aria-label': 'Sorting' },
          this.props.columns.map(this._renderColumn)
        )
      )
    );
  },
  _renderColumn: function _renderColumn(column) {
    var selected = this.props.sortingColumnName === column.name;
    var klass = classNames({
      'btn': true,
      'btn-primary': selected,
      'btn-secondary': !selected
    });
    var asc = this.props.sortingOrder === 'asc';
    var iconClass = classNames({
      'fa': true,
      'fa-sort': !selected,
      'fa-sort-asc': selected && asc,
      'fa-sort-desc': selected && !asc
    });
    return React.createElement(
      'button',
      { type: 'button', className: klass, onClick: this._onSelect.bind(this, column) },
      column.title,
      ' ',
      React.createElement('span', { className: iconClass })
    );
  },
  _onSelect: function _onSelect(column) {
    this.props.onSelect(column);
  }
});

var TreeMenu = React.createClass({
  displayName: 'TreeMenu',

  propTypes: {
    /*
     * Example:
     * [{ name: 'Menu', id: 1, children: [{ name: 'Child', id: 2 }] }]
     */
    rootItems: React.PropTypes.array.isRequired,
    /*
     * A node will be passed to the function.
     */
    onItemSelect: React.PropTypes.func.isRequired,
    /*
     * An item that should be highligted.
     */
    activeItemId: React.PropTypes.string.isRequired
  },

  render: function render() {
    var _this = this;

    return React.createElement(
      'div',
      { className: 'tree-menu' },
      React.createElement(
        'ul',
        { className: 'tree-menu-node-children' },
        this.props.rootItems.map(function (node) {
          return _this._renderNode(node);
        })
      )
    );
  },
  _renderNode: function _renderNode(node) {
    var _this2 = this;

    return React.createElement(
      'li',
      { className: 'tree-menu-node', key: node.name },
      React.createElement(
        'div',
        { className: 'tree-menu-node-title' },
        React.createElement(
          'a',
          { role: 'button', className: 'tree-menu-node-link' + (node.id === this.props.activeItemId ? ' active' : ''), href: 'javascript:void(0);', onClick: this._handleClick.bind(this, node) },
          node.name
        )
      ),
      node.children ? React.createElement(
        'div',
        { className: 'tree-menu-node-children-container' },
        React.createElement(
          'ul',
          { className: 'tree-menu-node-children' },
          node.children.map(function (node) {
            return _this2._renderNode(node);
          })
        )
      ) : undefined
    );
  },
  _handleClick: function _handleClick(node) {
    this.props.onItemSelect(node);
  }
});

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

    // if user did not give a custom nextTextOnFinalActionStep, the nextButtonText becomes the default
    _this.nextTextOnFinalActionStep = _this.props.nextTextOnFinalActionStep ? _this.props.nextTextOnFinalActionStep : _this.props.nextButtonText;

    //this.applyValidationFlagsToSteps();
    return _this;
  }

  createClass(FormWizard, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refresh();
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.setState(this.getPrevNextBtnState(this.props.startAtStep));
      be5.url.process(this.props.documentName, this.props.steps[this.state.compState].url);
    }

    // update the header nav states via classes so they can be styled via css

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
      // first set default values
      var showPreviousBtn = true;
      var showNextBtn = true;
      var nextStepText = this.props.nextButtonText;

      // first step hide previous btn
      if (currentStep === 0) {
        showPreviousBtn = false;
      }

      // second to last step change next btn text if supplied as props
      if (currentStep === this.props.steps.length - 2) {
        nextStepText = this.props.nextTextOnFinalActionStep || nextStepText;
      }

      // last step hide next btn, hide previous btn if supplied as props
      if (currentStep >= this.props.steps.length - 1) {
        showNextBtn = false;
        showPreviousBtn = this.props.prevBtnOnLastStep === false ? false : true;
      }

      return {
        showPreviousBtn: showPreviousBtn,
        showNextBtn: showNextBtn,
        nextStepText: nextStepText
      };
    }

    // which step are we in?

  }, {
    key: 'checkNavState',
    value: function checkNavState(currentStep) {
      this.setState(this.getPrevNextBtnState(currentStep));
    }

    // set the nav state

  }, {
    key: 'setNavState',
    value: function setNavState(next) {
      this.setState({ navState: this.getNavStates(next, this.props.steps.length) });

      if (next < this.props.steps.length) {
        this.setState({ compState: next });
      }

      be5.url.process(this.props.documentName, this.props.steps[next].url);

      this.checkNavState(next);
    }

    // handles keydown on enter being pressed in any Child component input area. in this case it goes to the next (ignore textareas as they should allow line breaks)

  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(evt) {
      if (evt.which === 13) {
        if (!this.props.preventEnterSubmission && evt.target.type !== 'textarea') {
          this.next();
        } else if (evt.target.type !== 'textarea') {
          evt.preventDefault();
        }
      }
    }

    // this utility method lets Child components invoke a direct jump to another step

  }, {
    key: 'jumpToStep',
    value: function jumpToStep(evt) {
      //if (evt.target == undefined) {
      // a child step wants to invoke a jump between steps. in this case 'evt' is the numeric step number and not the JS event
      this.setNavState(evt);
      //}
      //    else { // the main navigation step ui is invoking a jump between steps
      //      if (!this.props.stepsNavigation || evt.target.value == this.state.compState) { // if stepsNavigation is turned off or user clicked on existing step again (on step 2 and clicked on 2 again) then ignore
      //        evt.preventDefault();
      //        evt.stopPropagation();
      //
      //        return;
      //      }
      //
      //      evt.persist(); // evt is a react event so we need to persist it as we deal with aync promises which nullifies these events (https://facebook.github.io/react/docs/events.html#event-pooling)
      //
      //      const movingBack = evt.target.value < this.state.compState; // are we trying to move back or front?
      //      let passThroughStepsNotValid = false; // if we are jumping forward, only allow that if inbetween steps are all validated. This flag informs the logic...
      //      let proceed = false; // flag on if we should move on
      //
      //      this.abstractStepMoveAllowedToPromise(movingBack)
      //        .then((valid = true) => { // validation was a success (promise or sync validation). In it was a Promise's resolve() then proceed will be undefined, so make it true. Or else 'proceed' will carry the true/false value from sync v
      //          proceed = valid;
      //
      //          if (!movingBack) {
      //            this.updateStepValidationFlag(proceed);
      //          }
      //
      //          if (proceed) {
      //            if (!movingBack) {
      //              // looks like we are moving forward, 'reduce' a new array of step>validated values we need to check and 'some' that to get a decision on if we should allow moving forward
      //              passThroughStepsNotValid = this.props.steps
      //                .reduce((a, c, i) => {
      //                  if (i >= this.state.compState && i < evt.target.value) {
      //                    a.push(c.validated);
      //                  }
      //                  return a;
      //                }, [])
      //                .some((c) => {
      //                  return c === false
      //                })
      //            }
      //          }
      //        })
      //        .catch((e) => {
      //          // Promise based validation was a fail (i.e reject())
      //          if (!movingBack) {
      //            this.updateStepValidationFlag(false);
      //          }
      //        })
      //        .then(() => {
      //          // this is like finally(), executes if error no no error
      //          if (proceed && !passThroughStepsNotValid) {
      //            if (evt.target.value === (this.props.steps.length - 1) &&
      //              this.state.compState === (this.props.steps.length - 1)) {
      //                this.setNavState(this.props.steps.length);
      //            }
      //            else {
      //              this.setNavState(evt.target.value);
      //            }
      //          }
      //        })
      //        .catch(e => {
      //          if (e) {
      //            // see note below called "CatchRethrowing"
      //            // ... plus the finally then() above is what throws the JS Error so we need to catch that here specifically
      //            setTimeout(function() { throw e; });
      //          }
      //        });
      //    }
    }

    // move next via next button

  }, {
    key: 'next',
    value: function next() {
      if (this.state.compState + 1 < this.props.steps.length) {
        this.setNavState(this.state.compState + 1);
      }
      //    this.abstractStepMoveAllowedToPromise()
      //      .then((proceed = true) => {
      //        // validation was a success (promise or sync validation). In it was a Promise's resolve() then proceed will be undefined, so make it true. Or else 'proceed' will carry the true/false value from sync validation
      //        this.updateStepValidationFlag(proceed);
      //
      //        if (proceed) {
      //          this.setNavState(this.state.compState + 1);
      //        }
      //      })
      //      .catch((e) => {
      //        if (e) {
      //          // CatchRethrowing: as we wrap StepMoveAllowed() to resolve as a Promise, the then() is invoked and the next React Component is loaded.
      //          // ... during the render, if there are JS errors thrown (e.g. ReferenceError) it gets swallowed by the Promise library and comes in here (catch)
      //          // ... so we need to rethrow it outside the execution stack so it behaves like a notmal JS error (i.e. halts and prints to console)
      //          //
      //          setTimeout(function() { throw e; });
      //        }
      //
      //        // Promise based validation was a fail (i.e reject())
      //        this.updateStepValidationFlag(false);
      //      });
    }

    // move behind via previous button

  }, {
    key: 'previous',
    value: function previous() {
      if (this.state.compState > 0) {
        this.setNavState(this.state.compState - 1);
      }
    }

    // update step's validation flag
    //  updateStepValidationFlag(val = true) {
    //    this.props.steps[this.state.compState].validated = val; // note: if a step component returns 'underfined' then treat as "true".
    //  }

    // are we allowed to move forward? via the next button or via jumpToStep?
    //  stepMoveAllowed(skipValidationExecution = false) {
    //    let proceed = false;
    //
    //    if (this.props.dontValidate) {
    //      proceed = true;
    //    }
    //    else {
    //      if (skipValidationExecution) {
    //        // we are moving backwards in steps, in this case dont validate as it means the user is not commiting to "save"
    //        proceed = true;
    //      }
    //      else if (this.isStepAtIndexHOCValidationBased(this.state.compState)) {
    //        // the user is using a higer order component (HOC) for validation (e.g react-validation-mixin), this wraps the StepZilla steps as a HOC,
    //        // so use hocValidationAppliedTo to determine if this step needs the aync validation as per react-validation-mixin interface
    //        proceed = this.refs.activeComponent.refs.component.isValidated();
    //      }
    //      else if (Object.keys(this.refs).length == 0 || typeof this.refs.activeComponent.isValidated == 'undefined') {
    //        // if its a form component, it should have implemeted a public isValidated class (also pure componenets wont even have refs - i.e. a empty object). If not then continue
    //        proceed = true;
    //      }
    //      else {
    //        // user is moving forward in steps, invoke validation as its available
    //        proceed = this.refs.activeComponent.isValidated();
    //      }
    //    }
    //
    //    return proceed;
    //  }

    //  isStepAtIndexHOCValidationBased(stepIndex) {
    //    return (this.props.hocValidationAppliedTo.length > 0 && this.props.hocValidationAppliedTo.indexOf(stepIndex) > -1);
    //  }

    // a validation method is each step can be sync or async (Promise based), this utility abstracts the wrapper stepMoveAllowed to be Promise driven regardless of validation return type
    //  abstractStepMoveAllowedToPromise(movingBack) {
    //    return Promise.resolve(this.stepMoveAllowed(movingBack));
    //  }

    // get the classname of steps

  }, {
    key: 'getClassName',
    value: function getClassName(className, i) {
      var liClassName = className + "-" + this.state.navState.styles[i];

      // if step ui based navigation is disabled, then dont highlight step
      if (!this.props.stepsNavigation) liClassName += " no-hl";

      return liClassName;
    }

    // render the steps as stepsNavigation

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

      var props = this.props;
      //let compToRender;

      // clone the step component dynamically and tag it as activeComponent so we can validate it on next. also bind the jumpToStep piping method
      //    let cloneExtensions = {
      //      jumpToStep: (t) => {
      //        this.jumpToStep(t);
      //      }
      //    };

      //    const componentPointer = this.props.steps[this.state.compState].component;
      //
      //    // can only update refs if its a regular React component (not a pure component), so lets check that
      //    if (componentPointer instanceof Component || // unit test deteceted that instanceof Component can be in either of these locations so test both (not sure why this is the case)
      //        (componentPointer.type && componentPointer.type.prototype instanceof Component)) {
      //          cloneExtensions.ref = 'activeComponent';
      //    }

      //compToRender = React.cloneElement(componentPointer, cloneExtensions);
      //{compToRender}

      return React.createElement(
        'div',
        { className: 'formWizard', onKeyDown: function onKeyDown(evt) {
            _this3.handleKeyDown(evt);
          } },
        this.props.showSteps ? React.createElement(
          'ol',
          { className: 'progtrckr clearfix' },
          this.renderSteps()
        ) : React.createElement('span', null),
        React.createElement(Document, { frontendParams: { documentName: this.props.documentName } }),
        React.createElement('br', null),
        React.createElement(
          'div',
          { style: this.props.showNavigation ? {} : this.hidden, className: 'footer-buttons' },
          React.createElement(
            'button',
            {
              className: classNames(props.backButtonCls, { disabled: !this.state.showPreviousBtn }),
              onClick: function onClick() {
                _this3.previous();
              },
              id: 'prev-button'
            },
            this.props.backButtonText
          ),
          ' ',
          React.createElement(
            'button',
            {
              className: classNames(props.nextButtonCls, { disabled: !this.state.showNextBtn }),
              onClick: function onClick() {
                _this3.next();
              },
              id: 'next-button'
            },
            this.state.nextStepText
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
  preventEnterSubmission: false,
  startAtStep: 0,
  nextButtonText: "Next",
  nextButtonCls: "btn btn-prev btn-primary pull-right",
  backButtonText: "Previous",
  backButtonCls: "btn btn-next btn-primary pull-left",
  documentName: "FormWizard"
};

FormWizard.propTypes = {
  steps: propTypes.arrayOf(propTypes.shape({
    title: propTypes.string.isRequired,
    url: propTypes.string.isRequired
  })).isRequired,
  showSteps: propTypes.bool,
  showNavigation: propTypes.bool,
  stepsNavigation: propTypes.bool,
  prevBtnOnLastStep: propTypes.bool,
  preventEnterSubmission: propTypes.bool,
  startAtStep: propTypes.number,
  nextButtonText: propTypes.string,
  nextButtonCls: propTypes.string,
  backButtonCls: propTypes.string,
  backButtonText: propTypes.string,
  documentName: propTypes.string
};

var Navs = function (_React$Component) {
  inherits(Navs, _React$Component);

  function Navs(props) {
    classCallCheck(this, Navs);

    var _this = possibleConstructorReturn(this, (Navs.__proto__ || Object.getPrototypeOf(Navs)).call(this, props));

    _this.state = {
      compState: _this.props.startAtStep
    };

    _this.refresh = _this.refresh.bind(_this);
    return _this;
  }

  createClass(Navs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refresh();
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      be5.url.process(this.props.documentName, this.props.steps[this.state.compState].url);
    }
  }, {
    key: 'setNavState',
    value: function setNavState(id) {
      this.setState({ compState: id });
      be5.url.process(this.props.documentName, this.props.steps[id].url);
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
            { href: '#', active: i === _this2.state.compState, onClick: function onClick() {
                return _this2.setNavState(i);
              },
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
          React.createElement(Document, { frontendParams: { documentName: this.props.documentName } })
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
  tabs: propTypes.bool,
  pills: propTypes.bool,
  vertical: propTypes.bool,
  navbar: propTypes.bool,
  tag: propTypes.oneOfType([propTypes.func, propTypes.string]),

  steps: propTypes.arrayOf(propTypes.shape({
    title: propTypes.string.isRequired,
    url: propTypes.string.isRequired
  })).isRequired,
  startAtStep: propTypes.number,
  documentName: propTypes.string
};

var Properties = function (_React$Component) {
  inherits(Properties, _React$Component);

  function Properties() {
    classCallCheck(this, Properties);
    return possibleConstructorReturn(this, (Properties.__proto__ || Object.getPrototypeOf(Properties)).apply(this, arguments));
  }

  createClass(Properties, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var fields = this.props.bean.order.map(function (path, i) {
        if (_this2.props.ids === undefined || _this2.props.ids.includes(i)) {
          return React.createElement(Property, _extends({}, Properties.get(path, _this2.props.bean, _this2.props.localization), { onChange: _this2.props.onChange }));
        } else {
          return null;
        }
      });

      return React.createElement(
        'div',
        { className: this.props.className },
        fields
      );
    }
  }], [{
    key: 'get',
    value: function get$$1(path, bean, localization) {
      var itemName = path.substring(path.lastIndexOf("/") + 1);
      var itemMeta = bean.meta[path];
      var itemValue = jsonPointer.get(bean, "/values" + path);
      return {
        meta: itemMeta,
        name: itemName,
        value: itemValue,
        path: path,
        key: itemName + "Property",
        ref: itemName + "Property",
        localization: localization
      };
    }
  }]);
  return Properties;
}(React.Component);

Properties.defaultProps = {
  className: "row",
  localization: {}
};

Properties.propTypes = {
  className: propTypes.string.isRequired,
  bean: propTypes.object.isRequired,
  ids: propTypes.array,
  onChange: propTypes.func,
  localization: propTypes.object
};

// @create-index
//import be5styles from './be5styles.js';
// core
// components
// forms
// tables
// menu
// properties
// actions
// services

export { be5, be5init, Const as constants, Preconditions as preconditions, settings, bus, changeDocument, documentUtils, http, Application, Be5Menu, Be5MenuHolder, Be5MenuItem, Document, HelpInfo, LanguageBox as LanguageSelector, RoleBox as RoleSelector, SideBar, Sorter, SplitPane$3 as SplitPane, StaticPage, ErrorPane, TreeMenu, FormWizard, Navs, Form, SubmitOnChangeForm, Table, QuickColumns, OperationBox, FormTable, TableForm, TableFormRow, Menu, MenuBody, MenuSearchField, MenuFooter, MenuNode, Property, Properties, PropertyInput, PropertySet, action$2 as formAction, action$4 as loginAction, action$6 as logoutAction, action$8 as staticAction, action$10 as tableAction, actions as action, forms, Tables as tables, formsCollection, tablesCollection, actionsCollection };
//# sourceMappingURL=be5-react.es.js.map
