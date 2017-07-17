'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

var _createStore = require('./createStore');

var _createStore2 = _interopRequireDefault(_createStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(resource, initialState) {
  return (0, _createStore2.default)({
    _state: initialState,

    init: function init() {
      this._load();
    },
    refresh: function refresh() {
      this._load();
    },
    getState: function getState() {
      return this._state;
    },
    _load: function _load() {
      _http2.default.get(resource, {}, this._onLoad.bind(this));
    },
    _onLoad: function _onLoad(res) {
      this._state = res.value;
      this.emitChangeEvent();
    }
  });
};

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/core/createSimpleStore.js');
}();

;