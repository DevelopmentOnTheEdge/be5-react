'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _be = require('../../be5');

var _be2 = _interopRequireDefault(_be);

var _action = require('../action');

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuNode = _react2.default.createClass({
  displayName: 'MenuNode',

  getInitialState: function getInitialState() {
    return { href: '#', target: '', classes: '' };
  },
  componentDidMount: function componentDidMount() {
    var href = '#';
    var target = '';
    var classes = '';
    if (this.props.level == 1) {
      classes += 'rootMenuItem';
    } else {
      classes += 'menuItem';
    }
    var hasAction = this.props.data.action != null;
    if (hasAction) {
      classes += ' menuItemWithRef';
      var action = _action2.default.parse(this.props.data.action);
      href = action.href;
      target = action.target;
    } else {
      classes += ' menuItemWithoutRef';
    }
    this.setState({ href: href, target: target, classes: classes, hasAction: hasAction });
  },
  render: function render() {
    var hasChildren = this.props.data.children != null;

    if (!hasChildren) {
      var key = 'menu node ' + this.props.data.title;
      return _react2.default.createElement(
        'div',
        { className: 'menuNode', key: key },
        this._getHead(),
        this._getOperations()
      );
    }

    var nextLevel = this.props.level + 1;
    var children = this.props.data.children.map(function (child) {
      var childKey = 'li ' + child.title;
      return _react2.default.createElement(
        'li',
        { key: childKey },
        _react2.default.createElement(MenuNode, { key: child.title, data: child, level: nextLevel })
      );
    });

    return _react2.default.DOM.div({ className: 'menuNode', key: 'menu node ' + this.props.data.title }, this._getHead(), this._getOperations(), _react2.default.DOM.ul({ key: 'ul ' + this.props.data.title }, children));
  },
  _onClick: function _onClick(event) {
    if (/^#/.test(this.state.href)) {
      _be2.default.url.set(this.state.href);
    }
  },
  _getHead: function _getHead() {
    if (this.state.hasAction) {
      return _react2.default.DOM.a({ href: this.state.href, className: this.state.classes, target: this.state.target,
        onClick: this._onClick, key: 'a ' + this.props.data.title }, this.props.data.title);
    } else {
      return _react2.default.createElement(
        'span',
        { className: this.state.classes },
        this.props.data.title
      );
    }
  },
  _getOperations: function _getOperations() {
    var hasOperations = this.props.data.operations != null;

    if (!hasOperations) {
      var key = 'operations ' + this.props.data.title;
      return _react2.default.createElement('div', { key: key });
    }

    return this.props.data.operations.map(function (operation) {
      var href = '#!' + operation.action.arg;
      var title = operation.title == 'Insert' ? '+' : operation.title;
      var opBoxKey = 'operation box ' + title;
      var opKey = 'operation a ' + title;
      return _react2.default.createElement(
        'div',
        { className: 'menuOperationBox', key: opBoxKey },
        _react2.default.createElement(
          'a',
          { href: href, className: 'menuOperation', key: opKey },
          '[',
          title,
          ']'
        )
      );
    });
  }
});

var _default = MenuNode;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(MenuNode, 'MenuNode', 'src/scripts/be5/components/menu/menuNode.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/menu/menuNode.js');
}();

;