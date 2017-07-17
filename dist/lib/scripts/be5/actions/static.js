'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _changeDocument = require('../core/changeDocument');

var _changeDocument2 = _interopRequireDefault(_changeDocument);

var _staticPage = require('../components/staticPage');

var _staticPage2 = _interopRequireDefault(_staticPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(page) {

  _be2.default.net.request('static/' + page, {}, function (data) {
    (0, _changeDocument2.default)({ component: _staticPage2.default, value: data.value });
  });
};

exports.default = _default;
;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/actions/static.js');
}();

;