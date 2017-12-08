import React, { Component } from 'react';
import LanguageSelector from './languageSelector';
import RoleSelector     from './roleSelector';
import Menu             from './menu/menu';

class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"side"}>
        <RoleSelector ref="roleSelector"/>
        <Menu ref="menu"/>
        <hr/>
        <LanguageSelector ref="languageSelector"/>
      </div>
    );
  };

  refresh() {
    this.setState({});
    if(this.refs.menu)
      this.refs.menu.refresh();
    if(this.refs.languageSelector)
      this.refs.languageSelector.refresh();
    if(this.refs.roleSelector)
      this.refs.roleSelector.refresh();
  };
}

export default SideBar;