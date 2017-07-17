"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
};

function fire(type) {
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  listeners(type).forEach(function (listener) {
    return listener(event);
  });
};

function replaceListeners(eventType, listener) {
  listeners(eventType, [listener]);
};

var _default = {
  /* function(eventType: string, listener: function(event: object)) */
  listen: listen,
  /* function(type: string, event: object) */
  fire: fire,
  /* function(eventType: string, listener: function(event: object)) */
  listenSolus: replaceListeners
};
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(listen, "listen", "src/scripts/be5/core/bus.js");

  __REACT_HOT_LOADER__.register(fire, "fire", "src/scripts/be5/core/bus.js");

  __REACT_HOT_LOADER__.register(replaceListeners, "replaceListeners", "src/scripts/be5/core/bus.js");

  __REACT_HOT_LOADER__.register(listeners, "listeners", "src/scripts/be5/core/bus.js");

  __REACT_HOT_LOADER__.register(_default, "default", "src/scripts/be5/core/bus.js");
}();

;