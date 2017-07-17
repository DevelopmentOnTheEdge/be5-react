'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tables = require('../services/tables');

var _tables2 = _interopRequireDefault(_tables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _tables2.default.load;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/core/loadDocument.js');
}();

;