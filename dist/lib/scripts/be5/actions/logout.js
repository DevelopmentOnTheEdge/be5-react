'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

var _bus = require('../core/bus');

var _bus2 = _interopRequireDefault(_bus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  _be2.default.net.request('logout', {}, function () {
    document.cookie = 'be_auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    _bus2.default.fire('LoggedOut');
    _bus2.default.fire('CallDefaultAction');
  });
};

exports.default = _default;
;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/actions/logout.js');
}();

;