import React    from 'react';
import {getBaseUrl}    from './utils/utils';
import {createStaticValue} from './utils/documentUtils';
import messages from './core/messages';
import bus      from './core/bus';
import changeDocument from './core/changeDocument';
import {getRoute} from './core/routes'
import {getDefaultRoute} from "./store/selectors/user.selectors";


const be5 = {
  store: undefined,

  debug: true,

  def: {
    URL_PREFIX : '/api/',
    APPLICATION_PREFIX : '/',
  },

  messages: messages.en,

  //todo move to constants
  MAIN_DOCUMENT: 'MainDocument',
  MAIN_MODAL_DOCUMENT: 'MainModalDocument',
  DOCUMENT_REFRESH_SUFFIX: "_refresh",

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
    set(loc, addMessages) {
      if(!loc) return;
      loc = loc.toLowerCase();
      if(be5.locale.value === loc) return;
      be5.locale.value = loc;
      be5.messages = {};
      let newMessages = messages[loc];
      let defMessages = messages.en;
      for(let key in newMessages) {
        let msg = newMessages[key];
        if(msg === undefined)
          msg = defMessages[key];
        be5.messages[key] = msg;
      }
      if(addMessages !== null) {
        for(let key in addMessages) {
          be5.messages[key] = addMessages[key];
        }
      }

      let dataTablesLocal = 'en';
      switch(be5.locale.value){
        case "ru": dataTablesLocal = 'Russian'; break;
        case "ja": dataTablesLocal = 'Japanese'; break;
      }
      if(dataTablesLocal !== 'en'){
        $.getJSON( "//cdn.datatables.net/plug-ins/1.10.13/i18n/" + dataTablesLocal + ".json", function( data ) {
          be5.messages['dataTables'] = data;
        });
      }
    },

    msg(key) {
      const value = be5.messages[key];
      return value === undefined ? key : value;
    },

    addMessages(loc, msgs) {
      for(let key in msgs) {
        messages[loc][key] = msgs[key];
      }
      if(loc === be5.locale.value) {
        for(let key in msgs) {
          be5.messages[key] = msgs[key];
        }
      }
    },

    get() {
      return be5.locale.value;
    }
  },

  ui: {
    setTitle(docTitle) {
      let titleComponents = [docTitle, be5.appInfo.title];
      document.title = titleComponents.filter(function(c) {
        return typeof(c) === 'string';
      }).join(' - ');
    },
  },

  url: {

    get(){
      return decodeURI(document.location.hash);
    },

    set(url) {
      if (url.substring(0, 1) === '#')
        url = url.substring(1);
      if (url.substring(0, 1) !== '!')
        url = '!' + url;
      url = '#' + url;
      if(be5.url.get() !== url){
        document.location.hash = url;
        //todo be5.store.dispatch(setUrl(url))
      }else{
        be5.url.process(be5.MAIN_DOCUMENT, url);
      }
    },

    empty() {
      let url = be5.url.get();
      return url === '' || url === '#' || url === '!' || url === '#!';
    },

    clear() {
      document.location.hash = '';
    },

    // escapeComponent(hashUriComponent) {
    //   return encodeURIComponent(hashUriComponent);
    // },

    create(action, positional = [], named = {}) {
      return be5.url.form([action].concat(positional), named);
    },

    form(positional, named = {}) {
      const res = [];
      for(let i=0; i<positional.length; i++) {
        res.push(positional[i]);
      }
      for(let key in named) {
        res.push(key+'='+named[key]);
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

    process(documentName, url) {
      if (url === '' || url === '#' || url === '#!') {
        //bus.fire('CallDefaultAction');
        be5.url.set(getDefaultRoute(be5.store));
      }
      if (url.substring(0, 1) === '#')
        url = url.substring(1);
      if (url.substring(0, 1) !== '!')
        return;
      url = url.substring(1);
      if (url === '') {
        return;
      }
      let urlParts = url.split('/');
      // if (!be5.hasAction(urlParts[0])) {
      //   be5.log.error(be5.messages.errorUnknownRoute.replace(
      //       '$action', urlParts[0]));
      //   return;
      // }
      let positional = [documentName];
      let hashParams = {};
      let hasHashParam = false;
      for (let i = 1; i < urlParts.length; i++) {
        let urlPart = urlParts[i];
        let pos = urlPart.indexOf('=');
        if (pos >= 0) {
          let name = decodeURIComponent(urlPart.substring(0, pos).replace(/\+/g, ' '));
          let value = decodeURIComponent(urlPart.substring(pos + 1).replace(/\+/g, ' '));
          hashParams[name] = value;
          hasHashParam = true;
        } else {
          positional.push(decodeURIComponent(urlPart).replace(/\+/g, ' '));
        }
      }

      if (hasHashParam)positional.push(hashParams);

      const actionName = urlParts[0];
      const action = getRoute(actionName);

      if(action !== undefined){
        //console.log("process", documentName, url);
        //changeDocument(documentName, { loading: true });
        action.apply(be5, positional);
      }else{
        const msg = be5.messages.errorUnknownRoute.replace('$action', actionName);
        changeDocument(documentName, { value: createStaticValue(msg) });
        console.info(msg);
      }
    }
  },

  net: {
    url(path) {
      return be5.def.URL_PREFIX + path;
    },

    resourceUrl(resource) {
      return '/be5/' + resource;
    },

    paramString(params) {
      if(typeof(params) !== 'object') {
        return '{}';
      }
      return JSON.stringify(params);
    },

    request(path, params, success, failure) {
      return be5.net.requestUrl(be5.net.url(path), 'json', params, success, failure);
    },

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

    requestUrl(url, type, params, success, failureFunc) {
      let result = null;
      const failure = function(data) {
        result = data;
        be5.log.error(data);
        if (typeof (failureFunc) === 'function')failureFunc(data);
      };

      $.ajax({
        url : getBaseUrl() + url,
        dataType : type,
        type : 'POST',
        data : params,
        async: !!success,
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success : function(data, status, xhr) {
          if (xhr.status === 0) {
            if (xhr.aborted)
              return null;
            if (data === undefined) {
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
          if (data === undefined) {
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
          let data = {
            type : 'error',
            value : {
              code : 'CLIENT_ERROR'
            }
          };
          if (errorThrown && errorThrown.result === 0x80004005)
            // Special case for FireFox
            // see http://helpful.knobs-dials.com/index.php/0x80004005_%28NS_ERROR_FAILURE%29_and_other_firefox_errors
            data.value.message = be5.messages.errorCannotConnect;
          else
            data.value.message = be5.messages.errorServerQueryException
                .replace(
                    "$message",
                    errorThrown === undefined ? status
                        + (xhr.status >= 500 ? " "
                            + xhr.status
                            + " "
                            + xhr.statusText
                            : "")
                        : (errorThrown.message === undefined ? errorThrown
                            .toString()
                            : errorThrown.message));
          failure(data);
        }
      });
      return result;
    },
    errorHandlers: {}
  },

  log: {
    error(data) {
      bus.fire("alert", {msg: data.value.message, type: 'error'}); //, time: 0
      console.error(data);
    }
  },

  tableState: {
    selectedRows: []
  },

  // isRemoteUrl(url) {
  //   const prefix = 'http';
  //   return url.substr(0, prefix.length) === prefix;
  // },

};

export default be5;
