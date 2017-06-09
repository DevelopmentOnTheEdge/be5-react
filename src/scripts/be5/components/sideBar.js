import React            from 'react';
import be5              from '../be5';
import LanguageSelector from './languageSelector';
import RoleSelector     from './roleSelector';
import Menu             from './menu/menu';

export default React.createClass({displayName: "SideBar",
  render() {
    return React.DOM.div({ className: "side" },
      React.createElement(Menu, { ref: "menu" }),
      React.DOM.hr(),
      React.DOM.h3({},
        be5.messages.settings),
      React.createElement(LanguageSelector, { ref: "languageSelector" }),
      React.createElement(RoleSelector, { ref: "roleSelector" })
    );
  },
  
  refresh() {
    this.setState({});
    if(this.refs.menu)
      this.refs.menu.refresh();
    if(this.refs.languageSelector)
      this.refs.languageSelector.refresh();
    if(this.refs.roleSelector)
      this.refs.roleSelector.refresh();
  }
});
