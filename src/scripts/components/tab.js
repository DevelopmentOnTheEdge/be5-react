// https://github.com/tomkp/react-tab-pane
// MIT License
import React from 'react';

export default React.createClass({
  displayName: 'Tab',
  
  propTypes: {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  },
  
  getInitialState() {
    return {
      active: this.props.active
    };
  },
  
  onClick() {
    this.props.selectTab(this);
  },
  
  render() {
    var classes = ['Tab'];
    if (this.state.active) {
      classes.push('active');
    }
    var tabStyle;
    if (this.props.orientation === 'vertical') {
      tabStyle = {
        cursor: 'pointer',
        display: 'block'
      };
    } else {
      tabStyle = {
        cursor: 'pointer',
        display: 'inline-block'
      };
    }
    return React.DOM.div({className: classes.join(' '), style: tabStyle, onClick: this.onClick}, this.props.name);
  },
  
  isActive() {
    return this.state.active
  },
  
  setActive(active) {
    this.setState({ active: active })
  }
});
