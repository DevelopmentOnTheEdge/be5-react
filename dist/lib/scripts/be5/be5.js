'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _bus = require('./core/bus');

var _bus2 = _interopRequireDefault(_bus);

var _changeDocument = require('./core/changeDocument');

var _changeDocument2 = _interopRequireDefault(_changeDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.jQuery = window.$ = require('jquery');

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

    filter: 'Filter...',

    Name: 'Name',
    Password: 'Password',
    Login: 'Login',
    OK: 'OK',

    loginError: 'Incorrect login or password',
    checkYourEmail: 'Check your email for further instructions'
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

    filter: 'Фильтр...',

    Name: 'Логин',
    Password: 'Пароль',
    Login: 'Авторизация',
    OK: 'Выполнить',

    loginError: 'Неверный логин или пароль',
    checkYourEmail: 'Дальнейшие инструкции высланы на Ваш электронный адрес'
  },

  ja: {
    welcome: '今日は',
    loading: '読み込み中',
    emptyTable: 'データなし',
    roles: 'ロール',
    back: '戻る',
    error: 'エラー：',
    cancel: 'Cancel',

    filter: 'Filter...'
  }
};

//const remote = Settings.hasOwnProperty('baseUrl');

var be5 = {
  def: {
    URL_PREFIX: '/api/',
    APPLICATION_PREFIX: '/'
  },

  messages: messages.en,

  appInfo: {},

  load: {
    css: function css(url) {
      var link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      if (be5.isRemoteUrl(url)) {
        link.href = url;
      } else {
        link.href = '/' + url;
      }
      document.getElementsByTagName("head")[0].appendChild(link);
    }
  },

  locale: {
    set: function set(loc, addMessages) {
      if (!loc) return;
      loc = loc.toLowerCase();
      if (be5.locale.value == loc) return;
      be5.locale.value = loc;
      be5.messages = {};
      var newMessages = messages[loc];
      var defMessages = messages.en;
      for (var key in defMessages) {
        var msg = newMessages[key];
        if (msg === undefined) msg = defMessages[key];
        be5.messages[key] = msg;
      }
      if (addMessages != null) {
        for (var key in addMessages) {
          be5.messages[key] = addMessages[key];
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
        _jquery2.default.getJSON("//cdn.datatables.net/plug-ins/1.10.13/i18n/" + dataTablesLocal + ".json", function (data) {
          be5.messages['dataTables'] = data;
          _bus2.default.fire('LanguageChanged');
        });
      } else {
        _bus2.default.fire('LanguageChanged');
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
    get: function get() {
      return be5.locale.value;
    }
  },

  ui: {
    documentTypes: {},
    /*
     * Note that creator doesn't create a document,
     * it creates a description of a component as React's <ComponentName /> does.
     */
    registerDocumentType: function registerDocumentType(type, creator) {
      be5.ui.documentTypes[type] = creator;
    },
    createDocument: function createDocument(type, props) {
      return be5.ui.documentTypes[type](props);
    },
    setTitle: function setTitle(docTitle) {
      var titleComponents = [docTitle, be5.appInfo.title];
      document.title = titleComponents.filter(function (c) {
        return typeof c === 'string';
      }).join(' - ');
    }
  },

  url: {
    set: function set(url) {
      if (url.substring(0, 1) == '#') url = url.substring(1);
      if (url.substring(0, 1) != '!') url = '!' + url;
      url = '#' + url;
      if (document.location.hash !== url) {
        document.location.hash = url;
      } else {
        be5.url.process(url);
      }
    },
    empty: function empty() {
      var url = document.location.hash;
      return url === '' || url === '#' || url === '!' || url === '#!';
    },
    clear: function clear() {
      document.location.hash = '';
    },
    escapeComponent: function escapeComponent(hashUriComponent) {
      return encodeURIComponent(hashUriComponent);
    },
    create: function create(action) {
      var positional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var named = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return be5.url.form([action].concat(positional), named);
    },
    form: function form(positional) {
      var named = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var res = [];
      for (var i = 0; i < positional.length; i++) {
        res.push(be5.url.escapeComponent(positional[i]));
      }
      for (var key in named) {
        res.push(be5.url.escapeComponent(key) + '=' + be5.url.escapeComponent(named[key]));
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

      return { positional: positional, named: _underscore2.default.object(named) };
    },
    process: function process(url) {
      if (url === '' || url === '#' || url === '#!') {
        _bus2.default.fire('CallDefaultAction');
      }
      if (url.substring(0, 1) == '#') url = url.substring(1);
      if (url.substring(0, 1) != '!') return;
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
      var positional = [];
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

      be5.getAction(urlParts[0], function (action) {
        action.apply(be5, positional);
      });
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
        return '';
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
    requestUrl: function requestUrl(url, type, params, _success, failure) {
      var result = null;
      if (typeof failure !== 'function') {
        failure = function failure(data) {
          result = data;
          be5.log.error(data.value.code + "\n\n" + data.value.message);
        };
      }
      _jquery2.default.ajax({
        url: url,
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
          console.error("fail: ", data);
          failure(data);
        }
      });
      return result;
    },

    errorHandlers: {}
  },

  log: {
    error: function error(message) {
      console.error(message);
      /*<div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">Error:</h4>
            </div>
            <div class="modal-body">
              //TODO: insert bootstrap alert
              <div class="alert alert-danger">message</div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>*/
    }
  },

  tableState: {
    selectedRows: []
  },

  //  actions: {
  //    logout(preserveUrl) {
  //      be5.net.request('logout', {}, function(data) {
  //        document.cookie = 'be_auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  ////        if(!preserveUrl) {
  ////          be5.url.set('');
  ////        }
  //        bus.fire('LoggedOut');
  //        bus.fire('CallDefaultAction');
  //      });
  //    },
  //
  //    unknown(action, params) {
  //      be5.log.error(be5.messages.errorUnknownAction.replace('$action', action));
  //    }
  //  },

  //  hasAction(actionName) {
  //    var action = be5.actions[actionName];
  //    return (typeof(action) === 'function') || (typeof(action) === 'string');
  //  },

  isRemoteUrl: function isRemoteUrl(url) {
    var prefix = 'http';
    return url.substr(0, prefix.length) === prefix;
  },
  getAction: function getAction(actionName, callback) {
    Promise.resolve().then(function () {
      return require('' + ('./actions/' + actionName));
    }).then(function (action) {
      callback(action.default);
    }).catch(function (err) {
      (0, _changeDocument2.default)(be5.messages.errorUnknownAction.replace('$action', actionName));
      console.log('Failed to load action', err);
    });

    // var action = be5.actions[actionName];
    // if (typeof(action) === 'string') {
    //   System.import(action).then(function (action) {
    //     if (action['default']) {
    //       action = action['default'];
    //     }
    //     be5.actions[actionName] = action;
    //     callback(action);
    //   });
    // }
    // else {
    //   return callback(action);
    // }
  },
  registerAction: function registerAction(actionName, fn) {
    be5.actions[actionName] = fn;
  }
};

var hashChange = function hashChange() {
  be5.url.process(document.location.hash);
};

window.addEventListener("hashchange", hashChange, false);

be5.net.request("appInfo", {}, function (data) {
  be5.appInfo = data;
  be5.ui.setTitle();
});

// be5.net.request("scriptList", {category : "scripts"}, function(data) {
//   for(var i=0; i<data.length; i++)
//     if(!be5.actions[data[i].name])
//       be5.actions[data[i].name] = data[i].path;
// });

_bus2.default.listen('CallDefaultAction', function () {
  be5.net.request('menu/defaultAction', {}, function (data) {
    be5.url.set(data.arg);
  });
});

var _default = be5;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(messages, 'messages', 'src/scripts/be5/be5.js');

  __REACT_HOT_LOADER__.register(hashChange, 'hashChange', 'src/scripts/be5/be5.js');

  __REACT_HOT_LOADER__.register(be5, 'be5', 'src/scripts/be5/be5.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/be5.js');
}();

;