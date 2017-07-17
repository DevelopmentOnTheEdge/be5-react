'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../../../../css/menuFooter.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import logoBe from '../../../../images/logo-be.png';

var _default = _react2.default.createClass({
  displayName: 'MenuFooter',
  //<img src={logoBe}/>
  render: function render() {
    return _react2.default.createElement('div', { className: 'menuFooter' });
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