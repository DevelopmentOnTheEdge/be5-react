'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _be = require('../../be5');

var _be2 = _interopRequireDefault(_be);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _react2.default.createClass({
  displayName: 'MenuHeader',

  getInitialState: function getInitialState() {
    return {
      message: _be2.default.messages.welcome
    };
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'menuHeader' },
      _react2.default.createElement(
        'h2',
        null,
        this.state.message
      )
    );
  }
});

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/menu/menuHeader.js');
}();

;