'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _react2.default.createClass({
  displayName: 'TreeMenu',

  propTypes: {
    /*
     * Example:
     * [{ name: 'Menu', id: 1, children: [{ name: 'Child', id: 2 }] }]
     */
    rootItems: _react2.default.PropTypes.array.isRequired,
    /*
     * A node will be passed to the function.
     */
    onItemSelect: _react2.default.PropTypes.func.isRequired,
    /*
     * An item that should be highligted.
     */
    activeItemId: _react2.default.PropTypes.string.isRequired
  },

  render: function render() {
    var _this = this;

    return _react2.default.createElement(
      'div',
      { className: 'tree-menu' },
      _react2.default.createElement(
        'ul',
        { className: 'tree-menu-node-children' },
        this.props.rootItems.map(function (node) {
          return _this._renderNode(node);
        })
      )
    );
  },
  _renderNode: function _renderNode(node) {
    var _this2 = this;

    return _react2.default.createElement(
      'li',
      { className: 'tree-menu-node', key: node.name },
      _react2.default.createElement(
        'div',
        { className: 'tree-menu-node-title' },
        _react2.default.createElement(
          'a',
          { role: 'button', className: 'tree-menu-node-link' + (node.id === this.props.activeItemId ? ' active' : ''), href: 'javascript:void(0);', onClick: this._handleClick.bind(this, node) },
          node.name
        )
      ),
      node.children ? _react2.default.createElement(
        'div',
        { className: 'tree-menu-node-children-container' },
        _react2.default.createElement(
          'ul',
          { className: 'tree-menu-node-children' },
          node.children.map(function (node) {
            return _this2._renderNode(node);
          })
        )
      ) : undefined
    );
  },
  _handleClick: function _handleClick(node) {
    this.props.onItemSelect(node);
  }
});

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/treeMenu.js');
}();

;