'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bus = require('../core/bus');

var _bus2 = _interopRequireDefault(_bus);

var _sideBar = require('./sideBar');

var _sideBar2 = _interopRequireDefault(_sideBar);

var _document = require('./document');

var _document2 = _interopRequireDefault(_document);

var _splitPane = require('./splitPane');

var _splitPane2 = _interopRequireDefault(_splitPane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _react2.default.createClass({
  displayName: 'App',

  componentDidMount: function componentDidMount() {
    _bus2.default.listen('LoggedOut', this.refresh);
    _bus2.default.listen('LoggedIn', this.refresh);
    _bus2.default.listen('LanguageChanged', this.refresh);
    _bus2.default.listen('RoleChanged', this.refresh);
  },

  render: function render() {
    return _react2.default.createElement(
      _splitPane2.default,
      { split: 'vertical', defaultSize: 280 },
      _react2.default.createElement(_sideBar2.default, { ref: 'sideBar' }),
      _react2.default.createElement(_document2.default, { ref: 'document' })
    );
  },

  refresh: function refresh() {
    this.refs.sideBar.refresh();
  }
});

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/application.js');
}();

;