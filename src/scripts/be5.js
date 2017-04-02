import React    from 'react';
import $        from 'jquery';
import Settings from 'settings';
import _        from 'underscore';
import Const    from 'constants';
import bus      from 'be5/bus';
import 'bootstrap';

var messages = {
  en: {
    errorCannotConnect : 'Cannot connect to server',
    errorServerQueryException : 'Error during server query: $message',
    errorInvalidErrorResponse : 'Server returned unknown error',
    errorNoData : 'Error communicating with server: no data received',
    errorUnknownAction : 'Unknown action: $action',
    errorUrlParameterAbsent : 'Invalid URL: $parameter is absent',

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
    errorCannotConnect : 'Не могу подключиться к серверу',
    errorServerQueryException : 'Ошибка сервера: $message',
    errorInvalidErrorResponse : 'Сервер вернул неизвестную ошибку',
    errorNoData : 'Ошибка связи с сервером: ответ не получен',
    errorUnknownAction : 'Неизвестная операция: $action',
    errorUrlParameterAbsent : 'Неверный URL: отсутствует $parameter',

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

const remote = Settings.hasOwnProperty('baseUrl');

const be5 = {
  def: {
    URL_PREFIX : (remote ? Settings.baseUrl + '/' : '') + 'api/',
    APPLICATION_PREFIX : (remote ? Settings.baseUrl + '/' : ''),
  },
  
  messages: messages.en,
  
  appInfo: {},
  
  load: {
    css(url) {
      var link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = (remote ? Settings.baseUrl + url : 'be5/' + url);
      document.getElementsByTagName("head")[0].appendChild(link);
    }
  },
  
  locale: {
    set(loc, addMessages) {
      if(!loc) return;
      loc = loc.toLowerCase();
      if(be5.locale.value == loc) return;
      be5.locale.value = loc;
      be5.messages = {};
      var newMessages = messages[loc];
      var defMessages = messages.en;
      for(var key in defMessages) {
        var msg = newMessages[key];
        if(msg === undefined)
          msg = defMessages[key];
        be5.messages[key] = msg;
      }
      if(addMessages != null) {
        for(var key in addMessages) {
          be5.messages[key] = addMessages[key];
        }
      }

      var dataTablesLocal = 'en';
      switch(be5.locale.value){
        case "ru": dataTablesLocal = 'Russian'; break;
        case "ja": dataTablesLocal = 'Japanese'; break;
      }
      if(dataTablesLocal !== 'en'){
        $.getJSON( "//cdn.datatables.net/plug-ins/1.10.13/i18n/" + dataTablesLocal + ".json", function( data ) {
          be5.messages['dataTables'] = data;
          bus.fire('LanguageChanged');
        });
      }else{
        bus.fire('LanguageChanged');
      }
    },
    
    msg(key) {
      var value = be5.messages[key];
      return value === undefined ? key : value;
    },
    
    addMessages(loc, msgs) {
      for(var key in msgs) {
        messages[loc][key] = msgs[key];
      }
      if(loc === be5.locale.value) {
        for(var key in msgs) {
          be5.messages[key] = msgs[key];
        }
      }
    },
    
    get() {
      return be5.locale.value;
    }
  },
  
  ui: {
    documentTypes: {},
    /*
     * Note that creator doesn't create a document,
     * it creates a description of a component as React's <ComponentName /> does.
     */
    registerDocumentType(type, creator) {
      be5.ui.documentTypes[type] = creator;
    },
    
    createDocument(type, props) {
      return be5.ui.documentTypes[type](props);
    },
    
    setTitle(docTitle) {
      var titleComponents = [docTitle, be5.appInfo.title];
      document.title = titleComponents.filter(function(c) {
        return typeof(c) === 'string';
      }).join(' - ');
    },
    
    convertLinks(container) {
      $(container).find('style').remove();
      $(container).find('a').each(function() {
        var parseParameters = function(paramStr) {
          var params = {};
          var components = paramStr.split(/[\&\;]/);
          for(var i=0; i<components.length; i++) {
            var component = components[i];
            var equalsPos = component.indexOf('=');
            if(equalsPos < 0)
              continue;
            var key = component.substring(0, equalsPos);
            var value = component.substring(equalsPos+1);
            params[decodeURIComponent(key.replace(/\+/g, ' '))] = decodeURIComponent(value.replace(/\+/g, ' ')); 
          }
          return params;
        };
        var filterParameters = function(params) {
          delete params._t_;
          delete params._qn_;
          delete params._on_;
          delete params._enc_;
          delete params._use_crumbs_;
          delete params._ts_;
          return params;
        };
        
        var href = this.getAttribute('href');
        var target = this.getAttribute('target');
        if(/^(mailto:|https?:|\/\/|\#\!)/.test(href))
          return;
        var questionPos = href.indexOf('?');
        var servlet;
        var parameters;
        if(questionPos >= 0) {
          servlet = href.substring(0, questionPos);
          parameters = parseParameters(href.substring(questionPos+1));
        } else {
          servlet = href;
          parameters = {};
        }
        if(be5.hasAction(servlet)) {
          this.setAttribute('href', '#!'+be5.url.create(servlet, undefined, parameters));
          return;
        }
        if(/^\w+\.be$/.test(servlet)) {
          this.setAttribute('href', '#!'+be5.url.create('static', [servlet]));
          return;
        }
        var redir = /^(\w+)\.redir$/.exec(servlet);
        if(redir) {
          var query = parameters._qn_ || Const.DEFAULT_VIEW;
          this.setAttribute('href', '#!'+be5.url.create('table', [redir[1], query], filterParameters(parameters)));
          return;
        }
        if (servlet === 'registration') {
          var entity = 'users';
          var query = 'Registration';
          var operation = 'Registration';
          this.setAttribute('href', '#!'+be5.url.create('tableParameters', [entity, query, operation], filterParameters(parameters)));
          return;
        }
        if(servlet === 'q') {
          var entity = parameters._t_;
          var query = parameters._qn_ || Const.DEFAULT_VIEW;
          if(entity !== undefined) {
            this.setAttribute('href', '#!'+be5.url.create('table', [entity, query], filterParameters(parameters)));
            return;
          }
        }
        if(servlet === 'o') {
          var entity = parameters._t_;
          var query = parameters._qn_ || Const.DEFAULT_VIEW;
          var operation = parameters._on_;
          if(entity !== undefined && operation !== undefined) {
            this.setAttribute('href', '#!'+be5.url.create('form', [entity, query, operation], filterParameters(parameters)));
            return;
          }
        }
        if(servlet === 'splitter') {
          var entity = parameters._t_;
          var query = parameters._qn_ || Const.DEFAULT_VIEW;
          var operation = parameters._on_;
          if(entity !== undefined && operation !== undefined) {
            this.setAttribute('href', '#!'+be5.url.create('tableParameters', [entity, query, operation], filterParameters(parameters)));
            return;
          }
        }
        if(target !== '') {
          this.setAttribute('href', be5.def.URL_PREFIX+'legacyServlet/'+href);
        } else {
          this.setAttribute('href', '#!'+be5.url.create('unknown', [servlet], parameters));
        }
      });
    }
  },

  url: {
    set(url) {
      if (url.substring(0, 1) == '#')
        url = url.substring(1);
      if (url.substring(0, 1) != '!')
        url = '!' + url;
      url = '#' + url;
      if(document.location.hash !== url){
        document.location.hash = url;
      }else{
        be5.url.process(url);
      }
    },
    
    empty() {
      var url = document.location.hash;
      return url === '' || url === '#' || url === '!' || url === '#!';
    },
    
    clear() {
      document.location.hash = '';
    },
    
    escapeComponent(hashUriComponent) {
      return encodeURIComponent(hashUriComponent);
    },
    
    create(action, positional = [], named = {}) {
      return be5.url.form([action].concat(positional), named);
    },
    
    form(positional, named = {}) {
      const res = [];
      for(var i=0; i<positional.length; i++) {
        res.push(be5.url.escapeComponent(positional[i]));
      }
      for(var key in named) {
        res.push(be5.url.escapeComponent(key)+'='+be5.url.escapeComponent(named[key]));
      }
      return res.join('/');
    },
    
    parse(url) {
      const segments = url.split('/');
      const positional = [];
      const named = [];
      
      for (let i = 0; i < segments.length; i++) {
        const s = segments[i];
        if (s.indexOf('=') === -1) {
          positional.push(s);
        } else {
          named.push(s.split('='));
        }
      }
      
      return { positional: positional, named: _.object(named) };
    },
    
    process(url) {
      if (url === '' || url === '#' || url === '#!') {
        bus.fire('CallDefaultAction');
      }
      if (url.substring(0, 1) == '#')
        url = url.substring(1);
      if (url.substring(0, 1) != '!')
        return;
      url = url.substring(1);
      if (url === '') {
        return;
      }
      var urlParts = url.split('/');
      if (!be5.hasAction(urlParts[0])) {
        be5.log.error(be5.messages.errorUnknownAction.replace(
            '$action', urlParts[0]));
        return;
      }
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
      if (hasHashParam)
        positional.push(hashParams);
      be5.getAction(urlParts[0], function(action) {
        action.apply(be5, positional);
      });
    }
  },

  net: {
    url(path) {
      return be5.def.URL_PREFIX + path;
    },
    
    resourceUrl(resource) {
      return be5.def.APPLICATION_PREFIX + resource;
    },
    
    paramString(params) {
      if(typeof(params) !== 'object') {
        return '';
      }
      var values = [];
      for(var key in params) {
        values.push({name: key, value: params[key]});
      }
      return JSON.stringify(values);
    },
    
    request(path, params, success, failure) {
      return be5.net.requestUrl(be5.net.url(path), 'json', params, success, failure);
    },
    
    // transforms parameters!
    requestJson(path, params, success, failure) {
      return be5.net.requestUrl(be5.def.APPLICATION_PREFIX + path, 'json', be5.net.transform(params), success, failure);
    },
    
    requestHtml(path, success, failure) {
      return be5.net.requestUrl(be5.def.APPLICATION_PREFIX + path, 'html', {}, success, failure);
    },
    
    transform(params) {
      const copy = {};
      for (var key in params) {
      if (typeof params[key] === 'object') {
        copy[key] = be5.net.paramString(params[key]);
      } else {
        copy[key] = params[key];
      }
      }
      return copy;
    },
    
    requestUrl(url, type, params, success, failure) {
      var result = null;
      if (typeof (failure) !== 'function') {
        failure = function(data) {
          result = data;
          be5.log.error(data.value.message);
        };
      }
      $.ajax({
        url : url,
        dataType : type,
        type : 'POST',
        data : params,
        async: !!success,
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success : function(data, status, xhr) {
          if (xhr.status == 0) {
            if (xhr.aborted)
              return null;
            if (data == undefined) {
              data = {
                type : 'error',
                value : {
                  message : be5.messages.errorCannotConnect,
                  code : 'CLIENT_ERROR'
                }
              };
            }
            failure(data);
            return;
          }
          if (data == undefined) {
            data = {
              type : 'error',
              value : {
                message : be5.messages.errorNoData,
                code : 'CLIENT_ERROR'
              }
            };
          }
          if (typeof(data) === 'object' && data.type === 'error') {
            if(typeof(data.value) !== 'object') {
              data.value = {message : be5.messages.errorInvalidErrorResponse, code: 'CLIENT_ERROR'};
            }
            if (be5.net.errorHandlers[data.value.code]) {
              be5.net.errorHandlers[data.value.code]();
            } else {
              failure(data);
              return;
            }
          }
          if(success) {
            success(data);
          } else {
            result = data;
          }
        },
        error(xhr, status, errorThrown) {
          var data = {
            type : 'error',
            value : {
              code : 'CLIENT_ERROR'
            }
          };
          if (errorThrown && errorThrown.result == 0x80004005)
            // Special case for FireFox
            // see http://helpful.knobs-dials.com/index.php/0x80004005_%28NS_ERROR_FAILURE%29_and_other_firefox_errors
            data.value.message = be5.messages.errorCannotConnect;
          else
            data.value.message = be5.messages.errorServerQueryException
                .replace(
                    "$message",
                    errorThrown == undefined ? status
                        + (xhr.status >= 500 ? " "
                            + xhr.status
                            + " "
                            + xhr.statusText
                            : "")
                        : (errorThrown.message == undefined ? errorThrown
                            .toString()
                            : errorThrown.message));
          console.error("fail: ", data);
          failure(data);
        }
      });
      return result;
    },
    errorHandlers: {}
  },

  log: {
    error(message) {
      alert(message);
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

  actions: {
    logout(preserveUrl) {
      be5.net.request('logout', {}, function(data) {
        document.cookie = 'be_auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//        if(!preserveUrl) {
//          be5.url.set('');
//        }
        bus.fire('LoggedOut');
        bus.fire('CallDefaultAction');
      });
    },
    
    unknown(action, params) {
      be5.log.error(be5.messages.errorUnknownAction.replace('$action', action));
    }
  },
  
  hasAction(actionName) {
    var action = be5.actions[actionName];
    return (typeof(action) === 'function') || (action === 'pending');
  },

  getAction(actionName, callback) {
    var action = be5.actions[actionName];
    if(action === 'pending') {
      System.import('actions/'+actionName).then(function(action) {
        if (action['default']) {
        action = action['default'];
        }
        be5.actions[actionName]=action;
        callback(action);
      });
    } else
      return callback(action);
  },
  
  registerAction(actionName, fn) {
    be5.actions[actionName] = fn;
  }
};

var hashChange = function() {
  be5.url.process(document.location.hash);
};

window.addEventListener("hashchange", hashChange, false);

be5.net.request("appInfo", {}, function(data) {
  be5.appInfo = data;
  be5.ui.setTitle();
});

be5.net.request("scriptList", {category : "actions"}, function(data) {
  for(var i=0; i<data.length; i++)
    if(!be5.actions[data[i]])
      be5.actions[data[i]] = 'pending';
});

bus.listen('CallDefaultAction', () => {
  be5.net.request('menu/defaultAction', {}, data => {
    be5.url.set(data.arg)
  });
});

export default be5;
