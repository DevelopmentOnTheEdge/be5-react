import React from 'react';
import LanguageSelector from './LanguageSelector';
import RoleSelector     from './RoleSelector';
import Menu             from './menu/Menu';

class SideBar extends React.Component {
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