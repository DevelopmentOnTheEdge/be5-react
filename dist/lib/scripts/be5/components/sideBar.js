'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

var _languageSelector = require('./languageSelector');

var _languageSelector2 = _interopRequireDefault(_languageSelector);

var _roleSelector = require('./roleSelector');

var _roleSelector2 = _interopRequireDefault(_roleSelector);

var _menu = require('./menu/menu');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _react2.default.createClass({ displayName: "SideBar",
  render: function render() {
    return _react2.default.DOM.div({ className: "side" }, _react2.default.createElement(_menu2.default, { ref: "menu" }), _react2.default.DOM.hr(), _react2.default.DOM.h3({}, _be2.default.messages.settings), _react2.default.createElement(_languageSelector2.default, { ref: "languageSelector" }), _react2.default.createElement(_roleSelector2.default, { ref: "roleSelector" }));
  },
  refresh: function refresh() {
    this.setState({});
    if (this.refs.menu) this.refs.menu.refresh();
    if (this.refs.languageSelector) this.refs.languageSelector.refresh();
    if (this.refs.roleSelector) this.refs.roleSelector.refresh();
  }
});

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/sideBar.js');
}();

;