'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../../../../css/menuFooter.css');

var _logoBe = require('../../../../images/logo-be.png');

var _logoBe2 = _interopRequireDefault(_logoBe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _react2.default.createClass({
  displayName: 'MenuFooter',

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'menuFooter' },
      _react2.default.createElement('img', { src: _logoBe2.default })
    );
  }
});

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/menu/menuFooter.js');
}();

;