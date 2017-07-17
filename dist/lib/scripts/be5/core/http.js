'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  get: _be2.default.net.requestJson,
  getHtml: _be2.default.net.requestHtml,
  post: _be2.default.net.requestJson
};
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/core/http.js');
}();

;