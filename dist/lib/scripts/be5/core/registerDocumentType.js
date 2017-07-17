'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(type, reactClass) {
  _be2.default.ui.registerDocumentType(type, _react2.default.createElement.bind(undefined, reactClass));
};

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/core/registerDocumentType.js');
}();

;