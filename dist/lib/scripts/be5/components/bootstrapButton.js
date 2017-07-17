'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _react2.default.createClass({
  displayName: 'BootstrapButton',

  propTypes: {
    className: _react2.default.PropTypes.string,
    onClick: _react2.default.PropTypes.func
  },

  render: function render() {
    var className = 'btn' + (this.props.className ? ' ' + this.props.className : '');
    return _react2.default.createElement(
      'button',
      { type: 'button', className: className, onClick: this.props.onClick },
      this.props.children
    );
  }
});

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/bootstrapButton.js');
}();

;