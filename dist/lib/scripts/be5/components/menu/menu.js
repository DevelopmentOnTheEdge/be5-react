'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _be = require('../../be5');

var _be2 = _interopRequireDefault(_be);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _menuHeader = require('./menuHeader');

var _menuHeader2 = _interopRequireDefault(_menuHeader);

var _menuFooter = require('./menuFooter');

var _menuFooter2 = _interopRequireDefault(_menuFooter);

var _menuNode = require('./menuNode');

var _menuNode2 = _interopRequireDefault(_menuNode);

require('../../../../css/menu.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchField = _react2.default.createClass({
  propTypes: {
    onChange: _react2.default.PropTypes.func.isRequired
  },

  displayName: 'SearchField',

  getInitialState: function getInitialState() {
    return { value: '' };
  },

  render: function render() {
    return _react2.default.createElement('input', { type: 'text', className: 'searchField form-control', onChange: this._handleChange, value: this.state.value, placeholder: _be2.default.messages.filter });
  },

  _handleChange: function _handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.onChange(event.target.value);
  }
});

var MenuBody = _react2.default.createClass({
  displayName: 'MenuBody',

  getInitialState: function getInitialState() {
    return { root: [{ title: 'Loading...' }], query: '' };
  },

  componentDidMount: function componentDidMount() {
    this.refresh();
  },

  refresh: function refresh() {
    var _this = this;

    _be2.default.net.request('menu', {}, function (data) {
      _this.setState(data);
    });
  },

  render: function render() {
    var filteredRoot = this._getFilteredRoot();
    var rootNodes = filteredRoot.map(function (node) {
      return _react2.default.createElement(_menuNode2.default, { key: JSON.stringify(node), data: node, level: 1 });
    });
    return _react2.default.createElement(
      'div',
      { className: 'menu' },
      rootNodes
    );
  },

  _getFilteredRoot: function _getFilteredRoot() {
    var containsIgnoreCase = function containsIgnoreCase(str, substr) {
      return str.toLowerCase().indexOf(substr.toLowerCase()) !== -1;
    };
    var anyChildContainsIgnoreCase = function anyChildContainsIgnoreCase(node, query) {
      if (containsIgnoreCase(node.title, query)) {
        return true;
      }
      return node.children && _underscore2.default.any(node.children, function (child) {
        return anyChildContainsIgnoreCase(child, query);
      });
    };
    var filterNodeContent = function filterNodeContent(node, query) {
      if (!node.children) {
        return node;
      }
      return _underscore2.default.extend({}, node, { children: filterByTitle(node.children, query) });
    };
    var filterByTitle = function filterByTitle(root, query) {
      return root.filter(function (node) {
        return anyChildContainsIgnoreCase(node, query);
      }).map(function (node) {
        return filterNodeContent(node, query);
      });
    };

    return filterByTitle(this.state.root, this.state.query);
  }
});

var Menu = _react2.default.createClass({
  displayName: 'Menu',

  getInitialState: function getInitialState() {
    return {};
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'menuContainer' },
      _react2.default.createElement(_menuHeader2.default, { ref: 'menuheader' }),
      _react2.default.createElement(SearchField, { ref: 'searchfield', onChange: this._handleQueryChange }),
      _react2.default.createElement(MenuBody, { ref: 'menubody' }),
      _react2.default.createElement(_menuFooter2.default, null)
    );
  },

  refresh: function refresh() {
    this.refs.menuheader.setState({ message: _be2.default.messages.welcome });
    this.refs.menubody.refresh();
  },

  _handleQueryChange: function _handleQueryChange(query) {
    this.refs.menubody.setState({ query: query });
  }
});

var _default = Menu;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(SearchField, 'SearchField', 'src/scripts/be5/components/menu/menu.js');

  __REACT_HOT_LOADER__.register(MenuBody, 'MenuBody', 'src/scripts/be5/components/menu/menu.js');

  __REACT_HOT_LOADER__.register(Menu, 'Menu', 'src/scripts/be5/components/menu/menu.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/menu/menu.js');
}();

;