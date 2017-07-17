'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bus = require('./bus');

var _bus2 = _interopRequireDefault(_bus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(value) {
  return _bus2.default.fire('DocumentChange', value);
};

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/core/changeDocument.js');
}();

;