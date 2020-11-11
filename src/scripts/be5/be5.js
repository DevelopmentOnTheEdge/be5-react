import React from 'react';
import {createStaticValue} from './utils/documentUtils';
import messages from './core/messages';
import bus from './core/bus';
import changeDocument from './core/changeDocument';
import {getRoute} from './core/registers/routes';
import {getDefaultRoute} from "./store/selectors/user.selectors";
import {API_URL_PREFIX, MAIN_DOCUMENT} from "./constants";
import {hashUrlIsEmpty} from "./utils/utils";


const be5 = {
  store: undefined,

  getStoreState() {
    return be5.store.getState()
  },

  debug: true,

  messages: messages.en,

  appInfo: {},
  be5ServerUrl: window.be5ServerUrl || "",

  locale: {
    set(loc, addMessages) {
      if (!loc) return;
      loc = loc.toLowerCase();
      if (be5.locale.value === loc) return;
      be5.locale.value = loc;
      be5.messages = {};
      let newMessages = messages[loc];
      let defMessages = messages.en;
      for (let key in newMessages) {
        let msg = newMessages[key];
        if (msg === undefined)
          msg = defMessages[key];
        be5.messages[key] = msg;
      }
      if (addMessages !== null) {
        for (let key in addMessages) {
          be5.messages[key] = addMessages[key];
        }
      }
    },
    setLanguages(languages){
      if(!languages || !Array.isArray(languages) ) return;
      be5.locale.languages = languages;
    },
    msg(key) {
      const value = be5.messages[key];
      return value === undefined ? key : value;
    },

    addMessages(loc, msgs) {
      for (let key in msgs) {
        messages[loc][key] = msgs[key];
      }
      if (loc === be5.locale.value) {
        for (let key in msgs) {
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
      if (docTitle !== undefined && docTitle.length > 0) {
        document.title = docTitle + ' - ' + be5.appInfo.title;
      } else {
        document.title = be5.appInfo.title;
      }
    },
  },

  url: {

    open(frontendParams, url) {
      // (url === "#!" + getDefaultRoute(be5.store.getState())
      //   && (be5.url.get() === "" || be5.url.get() === "#!"))
      if (frontendParams.documentName !== MAIN_DOCUMENT || decodeURI(url) === be5.url.get()) {
        be5.url.process(frontendParams, url);
      } else {
        be5.url.set(url);
      }
    },

    get() {
      return decodeURI(document.location.hash);
    },

    set(url) {
      if (url.substring(0, 1) === '#')
        url = url.substring(1);
      if (url.substring(0, 1) !== '!')
        url = '!' + url;
      url = '#' + url;
      document.location.hash = url;
    },

    empty() {
      let url = be5.url.get();
      return hashUrlIsEmpty(url);
    },

    clear() {
      document.location.hash = '';
    },

    create(positional = [], named = {}) {
      return be5.url.form(positional, named);
    },

    form(positional, named = {}) {
      const res = [];
      for (let i = 0; i < positional.length; i++) {
        res.push(encodeURIComponent(positional[i]));
      }
      for (let key in named) {
        res.push(key + '=' + encodeURIComponent(named[key]));
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
          positional.push(decodeURIComponent(s));
        } else {
          named.push(s.split('='));
        }
      }

      return {positional: positional, named: _.object(named)};
    },

    process(frontendParams, url) {
      if (url === '' || url === '#' || url === '#!') {
        url = '#!' + getDefaultRoute(be5.getStoreState());
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
      let positional = [frontendParams];
      let hashParams = {};
      let hasHashParam = false;
      for (let i = 1; i < urlParts.length; i++) {
        let urlPart = urlParts[i];
        let pos = urlPart.indexOf('=');
        if (pos >= 0) {
          let name = decodeURIComponent(urlPart.substring(0, pos).replace(/\+/g, ' '));
          let value = decodeURIComponent(urlPart.substring(pos + 1).replace(/\+/g, ' '));
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

      const actionName = urlParts[0];
      const action = getRoute(actionName);

      if (action !== undefined) {
        //console.log("process", documentName, url);
        //changeDocument(documentName, { loading: true });
        action.apply(be5, positional);
      } else {
        const msg = be5.messages.errorUnknownRoute.replace('$action', actionName);
        changeDocument(frontendParams.documentName, {value: createStaticValue(msg, null, {self: url})});
        console.info(msg);
      }
    }
  },

  net: {
    url(path) {
      return API_URL_PREFIX + path;
    },

    paramString(params) {
      if (typeof(params) !== 'object') {
        return '{}';
      }
      return JSON.stringify(params);
    },

    request(path, params, success, failure) {
      return be5.net.requestUrl(be5.net.url(path), 'json', params, success, failure);
    },

    requestUrl(url, type, params, success, failure) {
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
        success: function (data, status, xhr) {
          if (xhr.status === 0) {
            if (xhr.aborted)
              return null;
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
          if (typeof(data) === 'object' && data.type === 'error') {
            if (typeof(data.value) !== 'object') {
              data.value = {message: be5.messages.errorInvalidErrorResponse, code: 'CLIENT_ERROR'};
            }
            if (be5.net.errorHandlers[data.value.code]) {
              be5.net.errorHandlers[data.value.code]();
            } else {
              failure(data);
              return;
            }
          }
          if (success !== undefined) success(data);
        },
        error(xhr, status, errorThrown) {
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
          const response = JSON.parse(xhr.responseText);
          if (typeof (failure) === 'function') {
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
    error(value) {
      if (typeof value === 'string') {
        bus.fire("alert", {msg: value, type: 'error'});
      } else if (value.errors !== undefined) {
        value.errors.forEach(function(e) {
          bus.fire("alert", {msg: e.title, type: 'error'});
        });
      } else {
        bus.fire("alert", {msg: 'unknown error', type: 'error'});
      }
      console.error(value);
    }
  },

  // isRemoteUrl(url) {
  //   const prefix = 'http';
  //   return url.substr(0, prefix.length) === prefix;
  // },

};

export default be5;


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
