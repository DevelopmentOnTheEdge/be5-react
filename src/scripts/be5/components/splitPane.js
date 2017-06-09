// Based on https://github.com/tomkp/react-split-pane
import React from 'react';
import ReactDOM from 'react-dom';
import be5 from '../be5';

be5.load.css('be5/css/splitPane.css');

var Pane = React.createClass({
  displayName: "SplitPane-Pane",
  
  getInitialState() {
    return {};
  },
  
  render() {
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
    return React.DOM.div({className: classes.join(' '), style: style}, this.props.children);
  }
});

var Resizer = React.createClass({displayName: "SplitPane-Resizer",
  handleDown(event) {
    this.props.down(event);
  },
  
  render() {
    var split = this.props.split;
    var classes = ['Resizer', split];
    return React.DOM.span({className: classes.join(' '), onMouseDown: this.handleDown});
  }
});

var SplitPane = React.createClass({displayName: "SplitPane",
  propTypes: {
    minSize: React.PropTypes.number,
    split: React.PropTypes.string
  },
  
  getInitialState() {
    return {
      active: false
    };
  },
  
  getDefaultProps() {
    return {
      minSize: 0
    };
  },
  
  componentDidMount() {
    document.addEventListener('mouseup', this.up);
    document.addEventListener('mousemove', this.move);
    var ref = this.refs.pane1;
    if (ref){
      if (this.props.defaultSize) {
        ref.setState({size: this.props.defaultSize});
      }
    }
  },
  
  componentWillUnmount() {
    document.removeEventListener('mouseup', this.up);
    document.removeEventListener('mousemove', this.move);
  },
  
  down(event) {
    var position = this.props.split === 'vertical' ? event.clientX : event.clientY;
    this.setState({
      active: true,
      position: position
    });
    event.preventDefault();
  },
  
  move(event) {
    if (this.state.active) {
      var ref = this.refs.pane1;
      if (ref) {
        var node = ReactDOM.findDOMNode(ref);
        if (window.getComputedStyle) {
          var styles = window.getComputedStyle(node);
          var rect = node.getBoundingClientRect();
          var width = rect.right-rect.left;
          var height = rect.bottom-rect.top;
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
  
  up() {
    this.setState({
      active: false
    });
  },
  
  merge(into, obj) {
    for (var attr in obj) {
      into[attr] = obj[attr];
    }
  },
  
  render() {
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
    elements.push(React.createElement(Pane, {ref: "pane1", key: "pane1", split: split}, child0));
    elements.push(React.createElement(Resizer, {ref: "resizer", key: "resizer", down: this.down, split: split}));
    elements.push(React.createElement(Pane, {ref: "pane2", key: "pane2", split: split}, child1));

    var classes = ['SplitPane', split];

    return React.DOM.div({className: classes.join(' '), style: style, ref: "splitPane"}, elements);
  }
});

export default SplitPane;
