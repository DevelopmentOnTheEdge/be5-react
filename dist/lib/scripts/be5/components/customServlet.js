'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomServlet = _react2.default.createClass({
  displayName: 'CustomServlet',

  render: function render() {
    var content = $('<div/>').html(this.props.content);
    _be2.default.ui.convertLinks(content);
    return _react2.default.DOM.div({ className: "content", dangerouslySetInnerHTML: { __html: content.html() } });
  }
});

_be2.default.ui.registerDocumentType('servlet', function (value) {
  return _react2.default.createElement(CustomServlet, { content: value });
});

var _default = CustomServlet;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(CustomServlet, 'CustomServlet', 'src/scripts/be5/components/customServlet.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/customServlet.js');
}();

;