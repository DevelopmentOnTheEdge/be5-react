'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

require('../../../css/splitPane.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Based on https://github.com/tomkp/react-split-pane
var Pane = _react2.default.createClass({
  displayName: "SplitPane-Pane",

  getInitialState: function getInitialState() {
    return {};
  },
  render: function render() {
    var split = this.props.split;
    var classes = ['Pane', split];

    var style = {
      flex: 1,
      position: 'relative',
      outline: 'none',
      overflow: 'auto'
    };
    if (this.state.size) {
      if (split === 'horizontal') {
        style.height = this.state.size;
        style.display = 'flex';
      } else {
        style.width = this.state.size;
      }
      style.flex = 'none';
    }
    return _react2.default.DOM.div({ className: classes.join(' '), style: style }, this.props.children);
  }
});

var Resizer = _react2.default.createClass({ displayName: "SplitPane-Resizer",
  handleDown: function handleDown(event) {
    this.props.down(event);
  },
  render: function render() {
    var split = this.props.split;
    var classes = ['Resizer', split];
    return _react2.default.DOM.span({ className: classes.join(' '), onMouseDown: this.handleDown });
  }
});

var SplitPane = _react2.default.createClass({ displayName: "SplitPane",
  propTypes: {
    minSize: _react2.default.PropTypes.number,
    split: _react2.default.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return {
      active: false
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      minSize: 0
    };
  },
  componentDidMount: function componentDidMount() {
    document.addEventListener('mouseup', this.up);
    document.addEventListener('mousemove', this.move);
    var ref = this.refs.pane1;
    if (ref) {
      if (this.props.defaultSize) {
        ref.setState({ size: this.props.defaultSize });
      }
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    document.removeEventListener('mouseup', this.up);
    document.removeEventListener('mousemove', this.move);
  },
  down: function down(event) {
    var position = this.props.split === 'vertical' ? event.clientX : event.clientY;
    this.setState({
      active: true,
      position: position
    });
    event.preventDefault();
  },
  move: function move(event) {
    if (this.state.active) {
      var ref = this.refs.pane1;
      if (ref) {
        var node = _reactDom2.default.findDOMNode(ref);
        if (window.getComputedStyle) {
          var styles = window.getComputedStyle(node);
          var rect = node.getBoundingClientRect();
          var width = rect.right - rect.left;
          var height = rect.bottom - rect.top;
          var current = this.props.split === 'vertical' ? event.clientX : event.clientY;
          var size = this.props.split === 'vertical' ? width : height;
          var position = this.state.position;
          var newSize = size - (position - current);
          this.setState({
            position: current
          });
          if (newSize >= this.props.minSize) {
            ref.setState({
              size: newSize
            });
          }
        }
        event.preventDefault();
      }
    }
  },
  up: function up() {
    this.setState({
      active: false
    });
  },
  merge: function merge(into, obj) {
    for (var attr in obj) {
      into[attr] = obj[attr];
    }
  },
  render: function render() {
    var split = this.props.split || 'vertical';

    var style = {
      display: 'flex',
      flex: 1,
      position: 'relative',
      outline: 'none',
      overflow: 'hidden'
    };

    if (split === 'horizontal') {
      this.merge(style, {
        flexDirection: 'column',
        height: '100%',
        minHeight: '100%',
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%'
      });
    } else {
      this.merge(style, {
        flexDirection: 'row',
        height: '100%',
        position: 'absolute',
        left: 0,
        right: 0
      });
    }

    var elements = [];
    var children = this.props.children;
    var child0 = children[0];
    var child1 = children[1];
    elements.push(_react2.default.createElement(Pane, { ref: "pane1", key: "pane1", split: split }, child0));
    elements.push(_react2.default.createElement(Resizer, { ref: "resizer", key: "resizer", down: this.down, split: split }));
    elements.push(_react2.default.createElement(Pane, { ref: "pane2", key: "pane2", split: split }, child1));

    var classes = ['SplitPane', split];

    return _react2.default.DOM.div({ className: classes.join(' '), style: style, ref: "splitPane" }, elements);
  }
});

var _default = SplitPane;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Pane, 'Pane', 'src/scripts/be5/components/splitPane.js');

  __REACT_HOT_LOADER__.register(Resizer, 'Resizer', 'src/scripts/be5/components/splitPane.js');

  __REACT_HOT_LOADER__.register(SplitPane, 'SplitPane', 'src/scripts/be5/components/splitPane.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/splitPane.js');
}();

;