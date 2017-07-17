'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createStore() {
  var changeListeners = [];

  function addChangeListener(listener) {
    changeListeners.push(listener);
  }

  function removeChangeListener(listener) {
    var index = changeListeners.indexOf(listener);
    if (index !== -1) {
      changeListeners.splice(index, 1);
    }
  }

  function emitChangeEvent(event) {
    for (var i = 0; i < changeListeners.length; i++) {
      changeListeners[i](event);
    }
  }

  return {
    addChangeListener: addChangeListener,
    removeChangeListener: removeChangeListener,
    emitChangeEvent: emitChangeEvent
  };
};

/**
 * Creates an inheritant of the base and initializes it.
 */

var _default = function _default(description) {
  var store = _underscore2.default.extend(createStore(), description);

  if (typeof store.init === 'function') {
    store.init();
  }

  return store;
};

exports.default = _default;
;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(createStore, 'createStore', 'src/scripts/be5/core/createStore.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/core/createStore.js');
}();

;