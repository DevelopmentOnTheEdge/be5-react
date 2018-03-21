import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, UncontrolledDropdown } from 'reactstrap';
import ReactDOM from 'react-dom';
import numberFormatter from 'number-format.js';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import SplitPane from 'react-split-pane';
import classNames from 'classnames';
import PropertySet, { Property, PropertyInput } from 'beanexplorer-react';
import JsonPointer from 'json-pointer';
import Alert from 'react-s-alert';

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
    logout: 'Logout',
    reload: 'reload',
    All: 'All',
    successfullyCompleted: 'Successfully completed.',

    filter: 'Filter...',

    Submit: 'Submit',
    submitted: 'In progress...',

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
    logout: 'Выход',
    reload: 'Перезагрузить',
    All: 'Все',
    successfullyCompleted: 'Успешно выполнено.',

    filter: 'Фильтр...',

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

var tablesCollection = {
  types: {},

  getTable: function getTable(tableName) {
    if (tableName !== undefined) return this.types[tableName];else return this.types['table'];
  },
  registerTable: function registerTable(tableName, component) {
    this.types[tableName] = component;
  }
};

var formsCollection = {
  types: {},

  getForm: function getForm(formName) {
    if (formName !== undefined) return this.types[formName];else return this.types['form'];
  },
  registerForm: function registerForm(formName, component) {
    this.types[formName] = component;
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



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
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
          bus.fire('RefreshAll');
        });
      } else {
        bus.fire('RefreshAll');
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
    actions: actionsCollection,

    tables: tablesCollection,

    forms: formsCollection,

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
      if (be5.url.get() !== url) {
        document.location.hash = url;
      } else {
        be5.url.process(be5.mainDocumentName, url);
      }
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

var userConstants = {
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',

  //LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
  //LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
  //LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

  LOGOUT: 'USERS_LOGOUT',

  SELECT_ROLES: 'SELECT_ROLES'
};

var be5Const = {
  DEFAULT_VIEW: 'All records'
};



var index = Object.freeze({
	userConstants: userConstants,
	be5Const: be5Const
});

var userActions = {
  updateUserInfo: updateUserInfo,
  toggleRoles: toggleRoles
};

function updateUserInfo() {
  return function (dispatch) {
    be5.net.request('userInfo', {}, function (data) {
      dispatch({ type: userConstants.UPDATE_USER_INFO, user: data });
    });
  };
}

// function logout() {
//   userService.logout();
//   return { type: userConstants.LOGOUT };
// }

function toggleRoles(roles) {
  //return { type: userConstants.TOGGLE_ROLE, roles };
  return function (dispatch) {
    be5.net.request('userInfo/selectRoles', { roles: roles }, function (data) {
      dispatch({ type: userConstants.SELECT_ROLES, currentRoles: data });
      bus.fire('RefreshAll');
    });
  };
}

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
  value: PropTypes.shape({
    data: PropTypes.shape({
      attributes: PropTypes.object.isRequired,
      meta: PropTypes.shape({
        _ts_: PropTypes.isRequired
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
      if (this.props.value.data.links.self !== undefined) {
        be5.url.process(this.props.frontendParams.documentName, "#!" + this.props.value.data.links.self);
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
  value: PropTypes.shape({
    data: PropTypes.shape({
      attributes: PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
      }),
      meta: PropTypes.shape({
        _ts_: PropTypes.isRequired
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
      if (this.props.value.errors[0].links.self !== undefined) {
        be5.url.process(this.props.frontendParams.documentName, "#!" + this.props.value.errors[0].links.self);
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
  value: PropTypes.shape({
    errors: PropTypes.array.isRequired,
    meta: PropTypes.shape({
      _ts_: PropTypes.isRequired
    })
  })
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
  getResourceByID: function getResourceByID(included, id) {
    for (var i = 0; i < included.length; i++) {
      if (included[i].id === id) return included[i];
    }
    return undefined;
  }
};

var tables = {
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
      var tableComponentName = json.data.attributes.layout.type;
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
          {
            key: operation.name,
            ref: operation.name,
            onClick: _this3.onClick.bind(_this3, operation.name),
            className: 'btn btn-secondary btn-secondary-old btn-sm'
          },
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

var userSelectors = {
  getUser: getUser,
  getCurrentRoles: getCurrentRoles
};

function getUser(state) {
  return {
    user: state.user
  };
}

function getCurrentRoles(state) {
  return {
    currentRoles: state.user.currentRoles
  };
}

var img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAATdEVYdFRpdGxlAE9wdGljYWwgRHJpdmU+Z7oMAAAC+ElEQVQ4jZWS329TZRjHP+ft6dJ2djNxHcgyunb+KIyNwfRG0mZgNgfeAJNBUBO8NEswITPEGHIy1I1lcTEzhn/Aq5mIFwp2yGSMzAsCyMIAp7hWOXjD+LGW03bnPe/rxSyZ7spv8tw9z+f75Ps8htaasvr7+81Apfm6oY1dGrpAV4BhY5AV2vjME4ZjKHUSjBxKHTt69MNpszw8ODj4TCBUMdbasnnH5pYt1NREEEIgpbs2l8u1/TAxvjebyeT27z8YXrh3j7MT4wFgmwkwPPzx8z6/L713zxuxeKyRUqmI4+RRSiGEIBQKsa/7ALZ9J1xfv56qcBg0rwCYAArxxVsH346tqV3L4uJDrv58lfn52+TyeZ6qrGTjxk0kXkwQiUT4r8yhTwd2xmPxjnXPruP+/QXOpE9zx7YnQQwIrUOFUnHwwtRk4vbvv9HVuZNAIAiAUmoZYCh9+NUdHRSLRWZvXMe27XMlx+2yLEueGP7kXE/3gUQ81rjKWUq5DNAY64PBEK5b4uatWwiMjyzLkgCuK8OPHj3kwYOFVQDXdSlnUCeEgVIKx3mMlFx/0uR575765usvtdaJ5WtrtC7XPxlIzysUS8VqIUyqq5/mcc5uBs4DHD92/DKwYZX9yhCl532fyWQONcYbadrQRCabtXq+6pka2zfmrXiwwJIsngB2a60mPJf3hoaGcgCmWpKnr1y5fKghGqW5uYX5zHy7d809+8HM+wM+7d2U2teKxkol21/e1NTEj5MT78zOzl4CTgKYQvhPzc39cn7q4lR7Kpliz+5utrRu3X5x+sL2u3f/4oVolOS2JNFoA/l8HtP0I6UXKG9naK3p6+urEaa+1NnxWkPb1jaCwRB+vx8hfCilcN0lCgWH9Hia6Z+mb5ii4qWRkZHCEwDAkSO9zyl8n9dGartSqSSRSC1V4Socx2Hu1zmuzczwx5/Zb02j4s3R0dHFf22wUr2HezsNLXuVMuo1ug7Ia80Zhf6ubk1d2rIstbJ/FeD/6m8m/lj+PIxQ9QAAAABJRU5ErkJggg==';

var Document = function (_React$Component) {
  inherits(Document, _React$Component);

  function Document(props) {
    classCallCheck(this, Document);

    var _this = possibleConstructorReturn(this, (Document.__proto__ || Object.getPrototypeOf(Document)).call(this, props));

    _this.state = {
      value: props.value || "",
      frontendParams: props.frontendParams,
      component: props.component
    };

    _this.reload = _this.reload.bind(_this);
    _this.refresh = _this.refresh.bind(_this);
    return _this;
  }

  createClass(Document, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== undefined && (this.props.value.meta === undefined || nextProps.value.meta === undefined || nextProps.value.meta._ts_ > this.props.value.meta._ts_)) {
        this.setState({
          value: nextProps.value || "",
          frontendParams: nextProps.frontendParams,
          component: nextProps.component
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      bus.replaceListeners(this.props.frontendParams.documentName, function (data) {
        if (_this2.state.value.meta !== undefined && !Number.isInteger(Number.parseInt(_this2.state.value.meta._ts_))) {
          console.error("meta._ts_ mast be string of Integer " + _this2.state.value.meta._ts_);
        }

        if (_this2.state.value.meta === undefined || data.value.meta === undefined || data.value.meta._ts_ > _this2.state.value.meta._ts_) {
          _this2.setState(Object.assign({ value: undefined, frontendParams: undefined, component: undefined }, data));
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
      if (this.state.value.data.links.self !== undefined) {
        be5.url.process(this.props.frontendParams.documentName, "#!" + this.state.value.data.links.self);
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
              frontendParams: this.getComponentFrontendParams()
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
  }, {
    key: 'getComponentFrontendParams',
    value: function getComponentFrontendParams() {
      return Object.assign({}, this.state.frontendParams, this.props.frontendParams);
    }
  }]);
  return Document;
}(React.Component);

Document.propTypes = {
  frontendParams: PropTypes.shape({
    documentName: PropTypes.string.isRequired,
    operationDocumentName: PropTypes.string,
    parentDocumentName: PropTypes.string,
    onSuccess: PropTypes.function
  }),
  value: PropTypes.object,
  component: PropTypes.func
};

var Document$1 = connect(userSelectors.getCurrentRoles, function () {})(Document);

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
        theadrow.append($("<th>").html('<input id="rowCheckboxAll" type="checkbox" class=""/>'));
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

      var tableDiv = $('<table id="' + this.props.value.meta._ts_ + '" ' + 'class="table table-striped table-striped-light table-bordered table-hover display table-sm" cellspacing="0"/>').append(thead).append(tbody).append(attributes.rows.length > 10 ? tfoot : '').appendTo(node);

      var lengths = [5, 10, 20, 50, 100, 500, 1000];
      var pageLength = attributes.length;

      if (lengths.indexOf(pageLength) === -1) {
        lengths.push(pageLength);
        lengths.sort(function (a, b) {
          return a - b;
        });
      }

      var lengthsTitles = lengths.map(function (x) {
        return x + ' записей';
      });

      lengths = [lengths, lengthsTitles];

      var language = null;
      if (be5.locale.value !== 'en') {
        language = be5.messages.dataTables || {};
        language.lengthMenu = "_MENU_";
      }

      var tableConfiguration = {
        dom: 'rt <"dataTables-nav clearfix"pli>',
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
            if (checked && $.inArray(rowId, be5.tableState.selectedRows) === -1) {
              be5.tableState.selectedRows.push(rowId);
              if (attributes.rows.length === be5.tableState.selectedRows.length) {
                $('#rowCheckboxAll').prop('checked', true);
              }
            } else if (!checked && $.inArray(rowId, be5.tableState.selectedRows) !== -1) {
              be5.tableState.selectedRows.splice($.inArray(rowId, be5.tableState.selectedRows), 1);
              $('#rowCheckboxAll').prop('checked', false);
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

      $('.dataTables_length select').removeClass('form-control-sm');

      tableDiv.on('draw.dt', function () {
        be5.tableState.selectedRows = [];
        _this._refreshEnablementIfNeeded();
      });

      $('.dataTables-nav').css('max-width', Math.max(650, tableDiv.width() + 2));

      $('#rowCheckboxAll').click(function (e) {
        e.stopPropagation();

        if (!$('#rowCheckboxAll').prop('checked')) {
          $('.rowCheckbox').prop('checked', false);
          be5.tableState.selectedRows = [];
        } else {
          $('.rowCheckbox').prop('checked', true);

          for (var _i = 0; _i < attributes.rows.length; _i++) {
            be5.tableState.selectedRows.push(attributes.rows[_i].id);
          }
        }

        _this.onSelectionChange();
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
          React.createElement('div', { ref: 'table', className: 'row' })
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

      var topFormJson = value.included !== undefined ? documentUtils.getResourceByID(value.included, "topForm") : undefined;
      var topForm = void 0;
      if (topFormJson) {
        topForm = React.createElement(Document$1, {
          frontendParams: { documentName: "documentTopForm", parentDocumentName: this.props.frontendParams.documentName },
          value: { data: topFormJson, meta: value.meta },
          component: formsCollection.getForm(topFormJson.attributes.layout.type)
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
  }, {
    key: 'refresh',
    value: function refresh() {
      var attr = this.props.value.data.attributes;
      var params = {
        entity: attr.category,
        query: attr.page,
        params: attr.parameters
      };

      tables.refresh(params, this.props.frontendParams.documentName);
    }
  }]);
  return Table;
}(React.Component);

Table.propTypes = {
  value: PropTypes.object.isRequired
};

be5.ui.tables.registerTable('table', Table);

var forms = {
  load: function load(params, frontendParams) {
    this._send('form', params, frontendParams);
  },
  apply: function apply(params, frontendParams) {
    this._send('form/apply', params, frontendParams);
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

          if (attributes.status !== 'document' && frontendParams.parentDocumentName !== undefined && frontendParams.parentDocumentName !== frontendParams.documentName) {
            //console.log("bus.fire() " + frontendParams.parentDocumentName + be5.documentRefreshSuffix);
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
                bus.fire('RefreshAll');
                if (documentName === be5.mainModalDocumentName) bus.fire("mainModalClose");
              } else if (attributes.details.startsWith("http://") || attributes.details.startsWith("https://") || attributes.details.startsWith("ftp://")) {
                window.location.href = attributes.details;
              } else {
                if (documentName === be5.mainDocumentName) {
                  be5.url.set(attributes.details);
                } else {
                  if (be5.url.parse(attributes.details).positional[0] === 'form') {
                    this.load(this.getOperationParams(attributes.details, {}), frontendParams);
                  } else {
                    be5.url.process(documentName, '#!' + attributes.details);
                  }
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
            case 'document':
              var tableJson = Object.assign({}, attributes.details, { meta: json.meta });
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
    var self = void 0;
    if (props.value.data !== undefined) {
      self = props.value.data.links.self;
    } else {
      self = props.value.errors[0].links.self;
    }

    if (props.frontendParams && props.frontendParams.documentName === be5.mainDocumentName && be5.url.get() !== '#!' + self) {

      be5.url.set(self);
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

var action$6 = function action() {
  forms.load(forms.getOperationParams('form/users/All records/Logout'), {
    documentName: be5.mainDocumentName, onSuccess: function onSuccess(result, applyParams) {
      //not used document.cookie = 'be_auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

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
  tables.load(paramsObject, documentName);
};

actionsCollection.registerAction("table", action$10);

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
      tables._performData(json, 'queryBuilder-table');
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
          SplitPane,
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
            React.createElement(Document$1, { frontendParams: { documentName: "queryBuilder-table" } }),
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
      changeDocument("form", { value: "" });
      changeDocument("table", { component: Table, value: this.props.value });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'table-form' },
        React.createElement(Document$1, { frontendParams: { documentName: "table", operationDocumentName: "form" } }),
        React.createElement(HelpInfo, { value: this.props.value.data.attributes.layout.helpInfo }),
        React.createElement(Document$1, { frontendParams: { documentName: "form" } })
      );
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      if (this.props.value.data.links.self !== undefined) {
        be5.url.process(this.props.frontendParams.documentName, "#!" + this.props.value.data.links.self);
      }
    }
  }]);
  return TableForm;
}(React.Component);

be5.ui.tables.registerTable('tableForm', TableForm);

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
          React.createElement(Document$1, { frontendParams: { documentName: "table", operationDocumentName: "form" } })
        ),
        React.createElement(
          'div',
          { className: 'col-lg-6' },
          React.createElement(Document$1, { frontendParams: { documentName: "form" } })
        )
      );
    }
  }]);
  return TableFormRow;
}(TableForm);

be5.ui.tables.registerTable('tableFormRow', TableFormRow);

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
        React.createElement(Document$1, { frontendParams: { documentName: "form" } }),
        React.createElement(Document$1, { frontendParams: { documentName: "table", operationDocumentName: "form" } })
      );
    }
  }]);
  return FormTable;
}(TableForm);

be5.ui.tables.registerTable('formTable', FormTable);

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

      // if(value.data.attributes.parameters && value.data.attributes.parameters.displayType === 'list')
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

      var TitleTag = 'h' + (value.data.attributes.parameters && value.data.attributes.parameters.titleLevel || 1);

      var topFormJson = value.included !== undefined ? documentUtils.getResourceByID(value.included, "topForm") : undefined;
      var topForm = void 0;
      if (topFormJson) {
        topForm = React.createElement(Document$1, {
          frontendParams: { documentName: "documentTopForm", parentDocumentName: this.props.frontendParams.documentName },
          value: { data: topFormJson, meta: value.meta },
          component: formsCollection.getForm(topFormJson.attributes.layout.type)
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
  }, {
    key: 'refresh',
    value: function refresh() {
      var attr = this.props.value.data.attributes;
      var params = {
        entity: attr.category,
        query: attr.page,
        params: attr.parameters
      };

      tables.refresh(params, this.props.frontendParams.documentName);
    }
  }]);
  return ReactTable;
}(React.Component);

ReactTable.propTypes = {
  value: PropTypes.object.isRequired
};

be5.ui.tables.registerTable('rTable', ReactTable);

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var PropTypes$1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;
exports.classNamesShape = exports.timeoutsShape = undefined;
exports.transitionTimeout = transitionTimeout;



var _propTypes2 = _interopRequireDefault(PropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transitionTimeout(transitionType) {
  var timeoutPropName = 'transition' + transitionType + 'Timeout';
  var enabledPropName = 'transition' + transitionType;

  return function (props) {
    // If the transition is enabled
    if (props[enabledPropName]) {
      // If no timeout duration is provided
      if (props[timeoutPropName] == null) {
        return new Error(timeoutPropName + ' wasn\'t supplied to CSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

        // If the duration isn't a number
      } else if (typeof props[timeoutPropName] !== 'number') {
        return new Error(timeoutPropName + ' must be a number (in milliseconds)');
      }
    }

    return null;
  };
}

var timeoutsShape = exports.timeoutsShape = _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.shape({
  enter: _propTypes2.default.number,
  exit: _propTypes2.default.number
}).isRequired]);

var classNamesShape = exports.classNamesShape = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  exit: _propTypes2.default.string,
  active: _propTypes2.default.string
}), _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  enterActive: _propTypes2.default.string,
  exit: _propTypes2.default.string,
  exitActive: _propTypes2.default.string
})]);
});

unwrapExports(PropTypes$1);
var PropTypes_1 = PropTypes$1.classNamesShape;
var PropTypes_2 = PropTypes$1.timeoutsShape;
var PropTypes_3 = PropTypes$1.transitionTimeout;

var Transition_1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;
exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = undefined;



var PropTypes$$1 = _interopRequireWildcard(PropTypes);



var _react2 = _interopRequireDefault(React);



var _reactDom2 = _interopRequireDefault(ReactDOM);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UNMOUNTED = exports.UNMOUNTED = 'unmounted';
var EXITED = exports.EXITED = 'exited';
var ENTERING = exports.ENTERING = 'entering';
var ENTERED = exports.ENTERED = 'entered';
var EXITING = exports.EXITING = 'exiting';

/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the components.
 * It's up to you to give meaning and effect to those states. For example we can
 * add styles to a component when it enters or exits:
 *
 * ```jsx
 * import Transition from 'react-transition-group/Transition';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 0 },
 *   entered:  { opacity: 1 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {(state) => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm A fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * As noted the `Transition` component doesn't _do_ anything by itself to its child component.
 * What it does do is track transition states over time so you can update the
 * component (such as by adding styles or classes) when it changes states.
 *
 * There are 4 main states a Transition can be in:
 *  - `ENTERING`
 *  - `ENTERED`
 *  - `EXITING`
 *  - `EXITED`
 *
 * Transition state is toggled via the `in` prop. When `true` the component begins the
 * "Enter" stage. During this stage, the component will shift from its current transition state,
 * to `'entering'` for the duration of the transition and then to the `'entered'` stage once
 * it's complete. Let's take the following example:
 *
 * ```jsx
 * state= { in: false };
 *
 * toggleEnterState = () => {
 *   this.setState({ in: true });
 * }
 *
 * render() {
 *   return (
 *     <div>
 *       <Transition in={this.state.in} timeout={500} />
 *       <button onClick={this.toggleEnterState}>Click to Enter</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state and
 * stay there for 500ms (the value of `timeout`) when finally switches to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from `'exiting'` to `'exited'`.
 */

var Transition = function (_React$Component) {
  _inherits(Transition, _React$Component);

  function Transition(props, context) {
    _classCallCheck(this, Transition);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    var parentGroup = context.transitionGroup;
    // In the context of a TransitionGroup all enters are really appears
    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;

    var initialStatus = void 0;
    _this.nextStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.nextStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = { status: initialStatus };

    _this.nextCallback = null;
    return _this;
  }

  Transition.prototype.getChildContext = function getChildContext() {
    return { transitionGroup: null }; // allows for nested Transitions
  };

  Transition.prototype.componentDidMount = function componentDidMount() {
    this.updateStatus(true);
  };

  Transition.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _ref = this.pendingState || this.state,
        status = _ref.status;

    if (nextProps.in) {
      if (status === UNMOUNTED) {
        this.setState({ status: EXITED });
      }
      if (status !== ENTERING && status !== ENTERED) {
        this.nextStatus = ENTERING;
      }
    } else {
      if (status === ENTERING || status === ENTERED) {
        this.nextStatus = EXITING;
      }
    }
  };

  Transition.prototype.componentDidUpdate = function componentDidUpdate() {
    this.updateStatus();
  };

  Transition.prototype.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  Transition.prototype.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;

    var exit = void 0,
        enter = void 0,
        appear = void 0;

    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter;
      appear = timeout.appear;
    }
    return { exit: exit, enter: enter, appear: appear };
  };

  Transition.prototype.updateStatus = function updateStatus() {
    var mounting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var nextStatus = this.nextStatus;

    if (nextStatus !== null) {
      this.nextStatus = null;
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();
      var node = _reactDom2.default.findDOMNode(this);

      if (nextStatus === ENTERING) {
        this.performEnter(node, mounting);
      } else {
        this.performExit(node);
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({ status: UNMOUNTED });
    }
  };

  Transition.prototype.performEnter = function performEnter(node, mounting) {
    var _this2 = this;

    var enter = this.props.enter;

    var appearing = this.context.transitionGroup ? this.context.transitionGroup.isMounting : mounting;

    var timeouts = this.getTimeouts();

    // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set
    if (!mounting && !enter) {
      this.safeSetState({ status: ENTERED }, function () {
        _this2.props.onEntered(node);
      });
      return;
    }

    this.props.onEnter(node, appearing);

    this.safeSetState({ status: ENTERING }, function () {
      _this2.props.onEntering(node, appearing);

      // FIXME: appear timeout?
      _this2.onTransitionEnd(node, timeouts.enter, function () {
        _this2.safeSetState({ status: ENTERED }, function () {
          _this2.props.onEntered(node, appearing);
        });
      });
    });
  };

  Transition.prototype.performExit = function performExit(node) {
    var _this3 = this;

    var exit = this.props.exit;

    var timeouts = this.getTimeouts();

    // no exit animation skip right to EXITED
    if (!exit) {
      this.safeSetState({ status: EXITED }, function () {
        _this3.props.onExited(node);
      });
      return;
    }
    this.props.onExit(node);

    this.safeSetState({ status: EXITING }, function () {
      _this3.props.onExiting(node);

      _this3.onTransitionEnd(node, timeouts.exit, function () {
        _this3.safeSetState({ status: EXITED }, function () {
          _this3.props.onExited(node);
        });
      });
    });
  };

  Transition.prototype.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  Transition.prototype.safeSetState = function safeSetState(nextState, callback) {
    var _this4 = this;

    // We need to track pending updates for instances where a cWRP fires quickly
    // after cDM and before the state flushes, which would double trigger a
    // transition
    this.pendingState = nextState;

    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, function () {
      _this4.pendingState = null;
      callback();
    });
  };

  Transition.prototype.setNextCallback = function setNextCallback(callback) {
    var _this5 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this5.nextCallback = null;

        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  Transition.prototype.onTransitionEnd = function onTransitionEnd(node, timeout, handler) {
    this.setNextCallback(handler);

    if (node) {
      if (this.props.addEndListener) {
        this.props.addEndListener(node, this.nextCallback);
      }
      if (timeout != null) {
        setTimeout(this.nextCallback, timeout);
      }
    } else {
      setTimeout(this.nextCallback, 0);
    }
  };

  Transition.prototype.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }

    var _props = this.props,
        children = _props.children,
        childProps = _objectWithoutProperties(_props, ['children']);
    // filter props for Transtition


    delete childProps.in;
    delete childProps.mountOnEnter;
    delete childProps.unmountOnExit;
    delete childProps.appear;
    delete childProps.enter;
    delete childProps.exit;
    delete childProps.timeout;
    delete childProps.addEndListener;
    delete childProps.onEnter;
    delete childProps.onEntering;
    delete childProps.onEntered;
    delete childProps.onExit;
    delete childProps.onExiting;
    delete childProps.onExited;

    if (typeof children === 'function') {
      return children(status, childProps);
    }

    var child = _react2.default.Children.only(children);
    return _react2.default.cloneElement(child, childProps);
  };

  return Transition;
}(_react2.default.Component);

Transition.contextTypes = {
  transitionGroup: PropTypes$$1.object
};
Transition.childContextTypes = {
  transitionGroup: function transitionGroup() {}
};


Transition.propTypes = {
  /**
   * A `function` child can be used instead of a React element.
   * This function is called with the current transition status
   * ('entering', 'entered', 'exiting', 'exited', 'unmounted'), which can used
   * to apply context specific props to a component.
   *
   * ```jsx
   * <Transition timeout={150}>
   *   {(status) => (
   *     <MyComponent className={`fade fade-${status}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: PropTypes$$1.oneOfType([PropTypes$$1.func.isRequired, PropTypes$$1.element.isRequired]).isRequired,

  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes$$1.bool,

  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: PropTypes$$1.bool,

  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: PropTypes$$1.bool,

  /**
   * Normally a component is not transitioned if it is shown when the `<Transition>` component mounts.
   * If you want to transition on the first mount set `appear` to `true`, and the
   * component will transition in as soon as the `<Transition>` mounts.
   *
   * > Note: there are no specific "appear" states. `appear` only adds an additional `enter` transition.
   */
  appear: PropTypes$$1.bool,

  /**
   * Enable or disable enter transitions.
   */
  enter: PropTypes$$1.bool,

  /**
   * Enable or disable exit transitions.
   */
  exit: PropTypes$$1.bool,

  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEventListener` is provided
   *
   * You may specify a single timeout for all transitions like: `timeout={500}`,
   * or individually like:
   *
   * ```jsx
   * timeout={{
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * @type {number | { enter?: number, exit?: number }}
   */
  timeout: function timeout(props) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var pt = PropTypes$1.timeoutsShape;
    if (!props.addEndListener) pt = pt.isRequired;
    return pt.apply(undefined, [props].concat(args));
  },

  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. **Note:** Timeouts are still used as a fallback if provided.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: PropTypes$$1.func,

  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: PropTypes$$1.func,

  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: PropTypes$$1.func,

  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: PropTypes$$1.func,

  /**
   * Callback fired before the "exiting" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: PropTypes$$1.func,

  /**
   * Callback fired after the "exiting" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: PropTypes$$1.func,

  /**
   * Callback fired after the "exited" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: PropTypes$$1.func
};

// Name the function so it is clearer in the documentation
function noop() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,

  onEnter: noop,
  onEntering: noop,
  onEntered: noop,

  onExit: noop,
  onExiting: noop,
  onExited: noop
};

Transition.UNMOUNTED = 0;
Transition.EXITED = 1;
Transition.ENTERING = 2;
Transition.ENTERED = 3;
Transition.EXITING = 4;

exports.default = Transition;
});

var Transition = unwrapExports(Transition_1);
var Transition_2 = Transition_1.EXITING;
var Transition_3 = Transition_1.ENTERED;
var Transition_4 = Transition_1.ENTERING;
var Transition_5 = Transition_1.EXITED;
var Transition_6 = Transition_1.UNMOUNTED;

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
    key: 'componentDidMount',
    value: function componentDidMount() {
      forms.changeLocationHash(this.props);
    }
  }, {
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
        selectedRows: attributes.selectedRows,
        values: values
      };
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      var _this2 = this;

      if (!this.state.submitted) {
        this.setState({ submitted: true }, function () {
          forms.load(_this2.getParams(_this2.state.data.attributes.bean.values), _this2.props.frontendParams);
        });
      }
    }
  }, {
    key: '_reloadOnChange',
    value: function _reloadOnChange(controlName) {
      var _this3 = this;

      if (!this.state.submitted) {
        this.setState({ submitted: true }, function () {
          var values = Object.assign({}, _this3.state.data.attributes.bean.values, { '_reloadcontrol_': controlName });

          forms.load(_this3.getParams(values), _this3.props.frontendParams);
        });
      }
    }
  }, {
    key: 'apply',
    value: function apply() {
      var _this4 = this;

      this.setState({ wasValidated: false });
      if (!this.state.submitted) {
        this.setState({ submitted: true }, function () {
          forms.apply(_this4.getParams(_this4.state.data.attributes.bean.values), _this4.props.frontendParams);
        });
      }
    }

    // cancel() {
    //   be5.url.set(be5.url.create('table', [this.state.entity, this.state.query], this.state.parameters));
    // },

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
      var _this5 = this;

      var attributes = this.state.data.attributes;
      this._setValue(name, value);

      this.forceUpdate(function () {
        if (attributes.bean.meta[name].reloadOnChange === true || attributes.bean.meta[name].autoRefresh === true) {
          _this5._reloadOnChange(name);
        }
      });
    }
  }, {
    key: '_createFormActions',
    value: function _createFormActions() {
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
    }
  }, {
    key: '_createOkAction',
    value: function _createOkAction(addCssClasses) {
      var _this6 = this;

      return React.createElement(
        Transition,
        { 'in': this.state.submitted, timeout: 200 },
        function (state) {
          return React.createElement(
            'button',
            {
              type: 'submit',
              className: classNames("btn btn-primary", { 'btn-sm': _this6.state.data.attributes.layout.bsSize === 'sm' }, { 'btn-lg': _this6.state.data.attributes.layout.bsSize === 'lg' }, addCssClasses),
              onClick: function onClick() {
                return _this6.setState({ wasValidated: true });
              },
              title: _this6.state.submitted ? be5.messages.submitted : "",
              disabled: state === 'entered'
            },
            be5.messages.Submit
          );
        }
      );
    }
  }, {
    key: '_createCancelAction',
    value: function _createCancelAction() {
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
          React.createElement(
            'form',
            {
              id: this.state.meta._ts_,
              onSubmit: this._applyOnSubmit,
              className: this.state.wasValidated ? 'was-validated' : ''
            },
            React.createElement(PropertySet, {
              bean: attributes.bean,
              onChange: this._onFieldChange,
              localization: be5.messages.property,
              bsSize: attributes.layout.bsSize
            }),
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
  }]);
  return Form;
}(React.Component);

Form.propTypes = {
  value: PropTypes.object.isRequired,
  frontendParams: PropTypes.object.isRequired
};

be5.ui.forms.registerForm('form', Form);

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
          className: classNames('submit-onchange-form', attributes.layout.formCssClass)
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

be5.ui.forms.registerForm('submitOnChange', SubmitOnChangeForm);

var ModalForm = function (_Form) {
  inherits(ModalForm, _Form);

  function ModalForm() {
    classCallCheck(this, ModalForm);
    return possibleConstructorReturn(this, (ModalForm.__proto__ || Object.getPrototypeOf(ModalForm)).apply(this, arguments));
  }

  createClass(ModalForm, [{
    key: 'render',

    // componentDidMount(){
    //   this.initForm();
    // }

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
          'form',
          {
            id: this.state.meta._ts_,
            onSubmit: this._applyOnSubmit,
            className: this.state.wasValidated ? 'was-validated' : ''
          },
          React.createElement(
            ModalBody,
            null,
            React.createElement(PropertySet, {
              bean: attributes.bean,
              onChange: this._onFieldChange,
              localization: be5.messages.property,
              bsSize: attributes.layout.bsSize
            })
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
        )
      );
    }
  }]);
  return ModalForm;
}(Form);

be5.ui.forms.registerForm('modal', ModalForm);

var InlineForm = function (_Form) {
  inherits(InlineForm, _Form);

  function InlineForm() {
    classCallCheck(this, InlineForm);
    return possibleConstructorReturn(this, (InlineForm.__proto__ || Object.getPrototypeOf(InlineForm)).apply(this, arguments));
  }

  createClass(InlineForm, [{
    key: 'render',
    value: function render() {
      var attributes = this.state.data.attributes;
      var commonProps = {
        bean: attributes.bean,
        onChange: this._onFieldChange,
        localization: be5.messages.property,
        inline: true,
        rowClass: "d-flex"
      };

      var properties = attributes.bean.order.map(function (p) {
        return React.createElement(Property, _extends({ key: p, path: p }, commonProps, { bsSize: attributes.layout.bsSize }));
      });

      return React.createElement(
        'form',
        {
          id: this.state.meta._ts_,
          onSubmit: this._applyOnSubmit,
          className: classNames('form-inline', attributes.layout.formCssClass || 'form-inline-bordered', this.state.wasValidated ? 'was-validated' : '')
        },
        React.createElement(
          'label',
          { className: classNames("mb-2 mr-sm-2", { 'col-form-label-sm': attributes.layout.bsSize === "sm" }, { 'col-form-label-lg': attributes.layout.bsSize === "lg" }) },
          React.createElement(
            'strong',
            null,
            attributes.title
          )
        ),
        properties,
        this._createOkAction('mb-2'),
        this._getErrorPane()
      );
    }
  }]);
  return InlineForm;
}(Form);

be5.ui.forms.registerForm('inline', InlineForm);

var be5init = {
  hashChange: function hashChange() {
    bus.fire("mainModalClose");

    var state = documentState.get(be5.mainDocumentName);
    console.log(state);

    if (state.value.links !== undefined && "#!" + state.value.data.links.self === be5.url.get() && state.value.data.links.self.startsWith('form')) {
      //console.log('skip - form already opened');
    } else {
      be5.url.process(be5.mainDocumentName, be5.url.get());
    }
  },
  init: function init(store) {
    window.addEventListener("hashchange", this.hashChange, false);

    be5.net.request("appInfo", {}, function (data) {
      be5.appInfo = data;
      be5.ui.setTitle();
    });

    bus.listen('CallDefaultAction', function () {
      be5.net.request('menu/defaultAction', {}, function (data) {
        be5.url.set(data.arg);
      });
    });

    // be5.net.request('languageSelector', {}, function(data) {
    //   be5.locale.set(data.selected, data.messages);
    //   be5.url.process(be5.mainDocumentName, be5.url.get());
    // });

    bus.listen('RefreshAll', function () {
      store.dispatch(userActions.updateUserInfo());
    });
  }
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

var RoleBox = function RoleBox(props) {

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
    { size: props.size, className: 'roleBox mr-sm-2' },
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
          { onClick: handleSelectAll, color: 'primary', className: 'enable-all', size: 'sm' },
          '\u0412\u0441\u0451'
        ),
        ' ',
        React.createElement(
          Button,
          { onClick: handleClear, color: 'secondary', className: 'disable-all', size: 'sm' },
          '\u041D\u0438\u0447\u0435\u0433\u043E'
        )
      )
    )
  );
};

RoleBox.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  currentRoles: PropTypes.array,
  availableRoles: PropTypes.array
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    availableRoles: state.user.availableRoles || [],
    currentRoles: state.user.currentRoles || []
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toggleRoles: function toggleRoles(roles) {
      return dispatch(userActions.toggleRoles(roles));
    }
  };
};

var RoleSelector = connect(mapStateToProps, mapDispatchToProps)(RoleBox);

var UserControlBox = function UserControlBox(props) {

  if (!props.user.loggedIn) {
    return null;
  }

  return React.createElement(
    'div',
    { className: classNames('user-control', props.className || 'form-inline mb-2') },
    React.createElement(RoleSelector, { size: props.size }),
    React.createElement(
      'label',
      null,
      props.user.userName
    )
  );
};

UserControlBox.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string
};

var UserControl = connect(userSelectors.getUser, function () {})(UserControlBox);

var img$1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAAAjCAYAAAANIjHoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAEN9JREFUeNrsXHtsHMUd/u3e03bseJ3EOC8CZwQJCVEUp0CTlEe5U1uUYCp6bishWtrqXAn+7p2E+keLVN0JqapERXWGCtRKpfhaUQjQijsiEgQtrQ9Kg+KQ4EsMCc7D8cXPe+91Zj1j/7yeffgRK0YeaXV3u7Oz8/jmm2++mT2pWq3Ccgv7X3tHIR9tgkvpdw/elcUn9h06SuMpBkllSPyM6AK9j1xLG1zz0eeT6wmjPLI49AASL8XPX9eywW9SNP48XrbMhfNfZNC9uNxpci1LzonKZ3mfWf2yNHE+aVopo/sM8jDrOQbxZuVZVEfkWgr/du49dJQid0iWJHuoIfGqpRKow1koDZyF4qcnIPe/HihmTpLUnCA5nAsGZi6XgwtDw2tMotAKSBoAppMApQudiuoaAYcIOWKCNGj8bvLZqu8ILPjYdf2zcAiyZ2u1hs4nTcoVYODtZg2cYud46GZloQ28x6x8pPHpvR0MPLi+AixdIwAa1RftJDGSXkxwzSgPNH5kHm2RFKRFyxEh6Wn1zVHWZBtVhKEllwuczevBuXEz1N6+Hxoe/D6Mv3sYrrz0PKhjI+S6eykJWM9ScQKotIAtsyguPicKYQackAjYKNBngQl4zUKGHTPyw1iUNmKcNjL5HiTnEvQTNXpEwH68fJzV/AwonXYyw1iuGzEiTSvBOmmQnY+SeD7ybKM0eR54PsMkfoaDbR5tkWHneZnitENSZp4fPRLwVitlAHJoQkOWof4b7eDatAUu/foXoI6PLgrz2gwROhQzluQ91S+oGArmgFViTFr4EYBjFrfMF7xdBuxFh8UuBFQKljQDMrAhWyRR6NAcYLKAM3PIDnDRPQoDSgcemllHirL0QgyMMYs89LH0aDm6RPHs1hHrVEk0ksVkqztLahXyFRWKqgpl8p1+lshRwdqY/FbHRsG7fRcoD5N6qlQ0cC9lwDpygSGEvisElCEb98RtxptTh0SyJImY0BSIjInnWhdhlH6HXk/SNBnLcjKIMnCa5SG9WBWhzw+WCiJSBbdDvtS+pflJxe0uDeaLzv7xiVUEu9eNlUo3DeZLey8XCk1eh2Mav+NjULf3Xhg/8ibkP/4AJI93SUBLQKPoACeqNB+JFxawcEo3oQqhYcrHGrXLQqq0zYN5qQzQn0vwCQr5TFONyJ7vQxIhY2NihctgJwQRE5qBPsaYGQyYFMuONpM8+EicsICFjbR3WC8pjMdzMp2oVNXshVzx6fs2NMNoqQyey0QSkAkYATRsrPVuentg8OdvnrsYcsnytP4l1+v2fR3yx9KCzlAFOy6GShh8DkEv5BMG7OtDkyXMaikd8/DKDrDhjgI+ZALIGGvE4BzB6xdMVNK6ho6hPGWNpAXqCFUD1rYKvGMkLJgvgTqbYiMPWQNw22kLzuxRXf0kzIFLgkOS5VPDY94XTvbn716/FqigLTJQNdd4zj5+q6/zYr5w6weDw/s9jknwVsslcLfeDFLdKgDyHaRpNeL1esuqSqBbVTV3YpGAm9YJ+CABT1BgVWVEWsuAbWPUJiPnutg5M9bNkrgdJG6cxY2zEcAqpAQNlRGAewoolMlMGBEPzxkTLbxUgdZXzGCEMG0LE+nUxSelljMoCsjPx3PwxucX4ObV9eB1TAKOdqsrxRLsXtP4Qnrwyn6sd+X6BpAJcCtDlwkDTwK3XC7DV26/4yd333Pv+6VSSdLAa6SrCbvPY3JGwdKDenNC4NnGLHTelM6l4EesYsW6lGU7Kdsy8EZtNETKjEGZhozrtTQ5Wo06sM0Jj5HDwd0DszwFLVyANKszzec2kTUZi9ED0AjAn6lgJ0W2UyoqBS4XitA3MqbJhDqXE45nR+FYdoQy8HEP0blVJAeooyC5PAzejL1JnN7e46c+OdF7Yv36Db3r1jX3rl3brH3qj+bm5t55TM7wsOSbo0b26TQydxbaDIBtCF6Uh7YFMhaeMEVMtOFiBN7J2ywWSMKCe/Ss34nSii6C1RlB1lpwTsCdlA0SjJcroLhdsNbjJuB1QC3Rs7VORxkP+hJdoKA2Wakww3en58nhPnz4LTh65G3tmqpWNCaecVQq2rHACVp2jrdjJulg+pYfEcS6/jmCd16BTbDCaEIWQ7IibDajn2eIoTrr1oOXPo8ccdQZI0araEzKYLAtyG3RlT3O6gZsma3U+lpDwLqvZY3GoaMEYC1eD6z2uOBiLr+5UFGBa1zq6aojI5rDIDnkWZMzCmA3ScvhpCxdFU7giBaeS9miBFBY4xqxQRuJlxQwTQKBpEugjVPM6uIOQ8oOeJFsMLTdBOxGAYE9W6wFI0wKKTCHhQVRfbFVKCwxIuRcANluSeYd6xcgTP1nDDZWtikfmpULEBsnBY6KUYfvQL4wBW/AFuOqBF+riDxYX+Ml3ye93CzRtzfV18Enw2OPqAiAVCIUThzTgIsnZhSQRC7kDzzQDnfdfY8GYJfLJTw8Hs9cGoIP6wqa9Ihm0wqayfvRPSF0b8yEkbTJkh3Wtcm8PlF+mBSYxWys4btMQD/X+vJjOcTSx8vBfPmX1w9fcrXbYTrZPRxsio22MPOFO3G+LBi3qhLo5V2ypA3tVC5QZmUTs1VPHTv1syMDg+3cy5WcLqiMDsPoW68TtnXMZG0y/G/dtm13S0sLnDp10nB9ggBccrmcBPVwzEL7iCYiok0zEZNKybBrAQa2jIkGzKB7suj5aQvm1acZsOGQBAyM9wgaTTK68mXnUV8zZBUH71w32YjyQCdmJJ09uvmGVVvo6yijs+L28Pulr756ZHLVVmdP0ZMuSTq31ut+tEJIlkgFuW1tY/1ALn/jUKG4/fToxL0Xc4Wb3LI0qV/pYgPRrJef/Q2MHf47yDU1s3UyAXPFQr9SZq6pqfnwRN+Z3bASVoJBMGRcCuNytbrxfK7wJv1NtKzmIlBdStnSKU+yr+bHEulQOP4RDL/yIuQ/6hGClltiVoEtUqgrTbMS5gXcWUCmmlQCmLlDT7sAam4cch9/CKWz/ZMTMIpswQKDZHPrJIlXXWmalbAg4FZnTNKq2kYbyrYSlxd0waGuAZTvPgoN9z8EI4e6YeS1xKTGleWrkukbNrYsRd3QoreC/fX+lTA96eyGmXsVWhfzAWfOnTcHLmG+Cbck/Qs0eFah0e2WFI+75lKusHasXNkyXip7KIgdoIKaz4HsrQHlkZ+CvKoervzp2SXbZLMSrqkQZhPIPVfzIbIZ3TjJ5EzxuO6rczoC5HvgznVN/se2+fZ9a/N1O0Nbb9jZvmX9Ex5ZHi2xvQV04UGdGIeGA0Go2X2nBuZ5hhqL636WRXz4DM4Ds3T47z4WVx8vzA7tjRB2X5L9TiIrpg/F4VbOEDqf1N3LmacH5ROnUwXxWwFJQTlAkG8/yjc/4gIw9ejKalQvPkFZquj+HuQUxNH9uI7a0PmQ4Fk9ut+4LLyOkiwfSZRGHzssV84kAlgPXfKlqdGFCApSIhAKq13Ok9/c1PyrJ3bdcqDB5Rqd2p+rTm6gaWj/nsbA2PciDP4h+Ths43jHBrgzTHBLBudbdZZPgJ2n14PsewDFTzDfkjJFB7uP+qZNMG3Cx1k8Gh9v8VOY1cPjhtFz/agx8XDaydKJgHg5mdt0omG2FZUFWN5wekZDeCsrX5TlR1Qv9FqKnfMjkKZQvCg7n2JpNsFMPz3L4nawOuP7LjpQGn6U3y72PYWIqU3H2nh7py2NK1EflzCrNt+SWJcoE0DWu5ywZ23j0f6xiaee6T39y1rnpHdbLRbA7bsF3FtaoXDqOEhujzYxq62reyw3MfFPaonZnagtou7yIVbIGMTJ6HzZBGuEFLuuoMrlQMdxAWaurKVgejkZbxjJoo7gM8lP2sT3xKGDsVgcdTh9wFsmuX8tqpcOxIb49aKUrkwZFi+IyuVjZUvo6i8oqKOgSXniDNBZ1InD7FzIDuNOjRNuAlz6NkSF/HJKMhD5oK2e/WfwCrTUel8iIC6q057W5HtpGzYR+VCZsrmcTqenvqFB27Y4MTGhvRQ562DnFxm0UcSeaRMG9+nYkTMIf0Exi4b1IMw0/YMobhaBhW/sTukahk9aRCALwfRihJ3An9lkwrhtqHw+xJz6euHLyhJKW/+JQdvJmBGXOYjqBAM2qMuvUYjoGJZvK83O2Q6ju8I+HhoBuohGd4P9+2JWY12K/DJULxBWvlIqV5t5cSmjOhoaZ0gFCl7Kttt37IAbb/QJ993Sc273vF623EeOPwiAwFm0B31XDIDL9wPwCooykHXB9OpZN6vILJIUoBs+uxCwU6yhEogROVtz4Cg6EMYFpk4SgSajkxRhHUOJQpbrQxbXqF4irIx8a2YagS7MfnegMg8hNleQhOJ550u/nUhapXV1pw8JllY3uzcL0xv2J/FltnJGWPbTdV73beRrnlphdM/CNqUeblhVq1ljMruFMHHjy/0DJ8dL5XU8HbmmDrIvPgfDf/0jyLV12jmPx3PPzVu3Hnn44UegUVGgIgCutvBRLsPB9geXix3GX+RbLO3DgduqY+AgmC8XW830/Qu4vwomr7UvdbC0w9DIr+1TeOD6Fsqu2ncyOYOdTas1T/ezsdzGP2fOKfqyVqmrwIBMwbhz167KD374Y6itrYFCoWD4vMo8tjV+iUJKMCHrggVuldSFbjQqpMDilZ1luQChDd8EhHTv7R3NTXD0/CDIBKxfTORhM2He7Y31kMic+xFhW2eNc3pjDdW25cGLILFFCJl8Dl2+/MxzXb8bLpVKpgRVKOTh2w9952tXwV/ks3k7QZoD0KRrvJ1jMHPnWwxJhMgi1sU1BVyVDv9Uz1LLi6+YUc2bL1fg1c8G2l/pP/+4B++9lR3afyuUzvXTnTVTwD1z+vRtdth0kSdnK0HsMEjLuQCylbRxSpKTHNTIdZRV1U0A3DBRrmy6lCvu/1v/wNNPH88kilXVjTWy7PVC7oP3oTxwVtvqONVLCGvTvbZ2DhtDXZQJ+CoS/T2MWfVmt4Jm1noT3k5ICgx+I1NfaJgL0ggbmPhhtHDB04oiYz4uWGhI6ox+PpHr05n/IfQMXl99yxG4VrvDrr+YL75f1dRCVX7yv5+4xkrl+kJFrS+oan2xogL1eJ0ItPT1dHV0BEZe/8tV26uALJc0mtBwqyfAZrp72PU4alQFLRL0wMx9tlaBbwzHNg039fmLmimBNMkI0oijmXqQpZFlafBZfxTlOcTKxU1+PmnsAfO3LPj9URPplP3SMS5RBu5cubKDSIKdeVXd8dnYxC1XiqUN+UqlXnMJiDyY4UZQWeByQfbF30PxzKdX8z/EEshvTSFLKA2zl1hDyIPkXmAa+bagYyXRkqlZB8ro7CC9RWUFqjTyiFNIg069+sLi8EUQvCSLX1eKg/Fyb8LAQovBMg2WlKitlrEVM7r0Sx0FClYJRaBv9WqWF9Gv2ed/C6PJQ5PLvVcvcLBwY59/T8C0cb8HppeEA4jhFMTQad3Mnce3O4ETmfocLF022CyL7lVQB+PeMX8NiS8583I3obzGEJvr8270x31hVFfLMmhSgb69a/03o3SxQQKv0wFE60KRmrp003e5DJXhISj0HoPRf7wMhVO92q4wqVSC+W6qtTk5S8H0y4sKYt8sTC8kAPrNwxBq6IUOkyJTn5/HhjnXnJ2CkQNrUZ5/P+t43IDvYGlw+TOEOnCHBaNHBHKI10nbcgUuXYDQvrx38K5rKmNvvHZo7/0HDr4nurZECxB27LWFmPorYZ6BLkBIy/EfyVeAuwLc/wswAGp0zuOHQHkBAAAAAElFTkSuQmCC';

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
  onChange: PropTypes.func.isRequired
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
        React.createElement(UserControl, { size: 'sm' }),
        React.createElement(Menu, { ref: 'menu' }),
        React.createElement(LanguageBox, { ref: 'languageSelector' })
      );
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      if (this.refs.menu) this.refs.menu.refresh();
      // if(this.refs.languageSelector)
      //   this.refs.languageSelector.refresh();
    }
  }]);
  return SideBar;
}(React.Component);

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
          { isOpen: this.state.modal, toggle: this.close, className: this.props.className },
          React.createElement(Document$1, { ref: 'document', frontendParams: { documentName: be5.mainModalDocumentName } })
        )
      );
    }
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
      bus.listen('RefreshAll', this.refresh);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(Be5Components, null),
        React.createElement(
          SplitPane,
          { split: 'vertical', defaultSize: 280, className: 'main-split-pane' },
          React.createElement(SideBar, { ref: 'sideBar' }),
          React.createElement(Document$1, { ref: 'document', frontendParams: { documentName: be5.mainDocumentName } })
        )
      );
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.refs.sideBar.refresh();
    }
  }]);
  return Application;
}(React.Component);

var listeners$1 = [];

var actions$1 = []; // all actions from backend

var tree = {};

var menu = {
  find: function find(coords) {
    //console.log(actions, coords);
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
    return { loaded: false, isOpen: false };
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
  toggle: function toggle() {
    this.setState({
      isOpen: !this.state.isOpen
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
      NavbarBrand,
      { href: '#' },
      this.props.branding
    ) : undefined;
    var rightButtons = this._renderRightButtons();

    return React.createElement(
      Navbar,
      { color: 'dark', dark: true, expand: 'md' },
      React.createElement(
        'div',
        { className: 'container' },
        branding,
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
    if (!this.state.loaded) {
      return undefined;
    }
    if (!this.state.menu.loggedIn) {
      return React.createElement(
        'form',
        { className: 'form-inline ml-auto' },
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
    //<RoleSelector/>
    return React.createElement(
      'form',
      { className: 'form-inline ml-auto' },
      React.createElement(
        'a',
        { className: 'btn btn-secondary', role: 'button', href: '#!logout' },
        be5.messages.logout
      )
    );
  },
  _renderDropdownMenuItems: function _renderDropdownMenuItems(items) {
    return _(items).map(function (item) {
      if (item.default) {
        return undefined;
      }

      var _actions$parse = actions.parse(item.action),
          href = _actions$parse.href,
          target = _actions$parse.target;

      return React.createElement(
        DropdownItem,
        { href: href, key: target + href },
        item.title
      );
    });
  },
  _renderMenuItems: function _renderMenuItems(items, inDropdown) {
    var _this = this;

    return _(items).map(function (item) {
      if (item.default) {
        return undefined;
      }

      if (!item.children || item.children.length === 0) {
        var _actions$parse2 = actions.parse(item.action),
            href = _actions$parse2.href,
            target = _actions$parse2.target;
        // const liClass = inDropdown ? '' : 'nav-item';
        // const aClass = inDropdown ? 'dropdown-item' : 'nav-link';
        // return <li className={liClass} key={target+href}><a className={aClass} href={href} target={target}>{item.title}</a></li>;


        return React.createElement(
          NavItem,
          { key: target + href },
          React.createElement(
            NavLink,
            { href: href },
            item.title
          )
        );
      }

      var dropdownMenuItems = _this._renderDropdownMenuItems(item.children, true);

      return React.createElement(
        UncontrolledDropdown,
        { nav: true, inNavbar: true, key: item.title },
        React.createElement(
          DropdownToggle,
          { nav: true, caret: true },
          item.title
        ),
        React.createElement(
          DropdownMenu,
          null,
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

    console.log(href, target);
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
      query: this.props.view || be5Const.DEFAULT_VIEW
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

    _this.nextTextOnFinalActionStep = _this.props.nextTextOnFinalActionStep ? _this.props.nextTextOnFinalActionStep : _this.props.nextButtonText;
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

      be5.url.process(this.props.documentName, this.props.steps[next].url);

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

//import be5styles from './be5styles.js';
// core
// components
// forms
// tables
// menu
// actions
// services

export { be5, be5init, index as constants, Preconditions as preconditions, bus, changeDocument, documentUtils, http, Application, Be5Components, Be5Menu, Be5MenuHolder, Be5MenuItem, HelpInfo, LanguageBox as LanguageSelector, SideBar, Sorter, StaticPage, ErrorPane, TreeMenu, FormWizard, Navs, Document$1 as Document, RoleSelector, UserControl, Form, SubmitOnChangeForm, ModalForm, InlineForm, FinishedResult, Table, QuickColumns, OperationBox, FormTable, TableForm, TableFormRow, Menu, MenuBody, MenuSearchField, MenuFooter, MenuNode, action$2 as formAction, action as loadingAction, action$4 as loginAction, action$6 as logoutAction, action$12 as qBuilderAction, action$8 as staticAction, action$10 as tableAction, action$14 as textAction, actions as action, forms, tables, formsCollection, tablesCollection, actionsCollection };
