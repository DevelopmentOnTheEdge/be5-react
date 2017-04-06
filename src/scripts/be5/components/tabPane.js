import React from 'react';
import be5 from 'be5/be5';
import Tab from 'be5/components/tab';

be5.load.css("be5/css/tabPane.css");

export default React.createClass({
  propTypes: {
    orientation: React.PropTypes.string.isRequired
  },
  
  getDefaultProps() {
    return {
      orientation: 'vertical'
    }
  },
  
  getInitialState() {
    return {
      activeTab: this.props.children[0]
    }
  },
  
  selectTab(tab) {
    this.refs[this.state.activeTab.props.id].setActive(false);
    tab.setActive(true);
    this.setState({
      activeTab: tab
    });
  },
  
  render() {
    var classes = ['TabPane', this.props.orientation].join(' ');
    var containerStyles;
    if (this.props.orientation === 'vertical') {
      containerStyles = {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        position: 'absolute',
        left: 0,
        right: 0
      };
    } else {
      containerStyles = {
        display: 'flex',
        flex: 1,
        position: 'relative',
        flexDirection: 'column',
        height: '100%',
        minHeight: '100%'
      };
    }

    var tabsStyles;
    var orientation = this.props.orientation;
    if (orientation === 'vertical') {
      tabsStyles = {
        height: '100%'
      };
    } else {
      tabsStyles = {
        flex: 1,
        width: '100%',
        whiteSpace: 'nowrap'
      };
    }

    var paneClasses = ['TabContent', this.props.className].join(' ');
    var paneStyles = {
      flex: 1
    };

    var activeId = this.state.activeTab.props.id;
    var elements = this.props.children.map(function(child) {
      var active = child.props.id === activeId;
      return React.cloneElement(child, {
        ref: child.props.id,
        active: active,
        selectTab: this.selectTab,
        orientation: orientation,
        id: child.props.id,
        key: child.props.id
      });
    }.bind(this));

    return React.DOM.div({className: classes, style: containerStyles, ref: "TabPane"},
        React.DOM.div({className: "Tabs", style: tabsStyles}, elements),
        React.DOM.div({className: paneClasses, style: paneStyles}, this.state.activeTab.props.children));
  }
});
