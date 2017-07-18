'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(id, reactClass) {
  var app = document.getElementById('app');

  if (app !== null) {
    _reactDom2.default.render(_react2.default.createElement(reactClass), app);

    _be2.default.net.request('languageSelector', {}, function (data) {
      _be2.default.locale.set(data.selected, data.messages);
      _be2.default.url.process(document.location.hash);
    });
  }
};

exports.default = _default;
;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/core/initialize.js');
}();

;