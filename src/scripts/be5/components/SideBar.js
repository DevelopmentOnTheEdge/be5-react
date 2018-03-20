import React from 'react';
import LanguageSelector from './LanguageSelector';
import RoleSelector     from '../containers/RoleSelector';
import Menu             from './menu/Menu';


class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"side"}>
        <RoleSelector size="sm"/>
        <Menu ref="menu"/>
        <LanguageSelector ref="languageSelector"/>
      </div>
    );
  };

  refresh() {
    if(this.refs.menu)
      this.refs.menu.refresh();
    // if(this.refs.languageSelector)
    //   this.refs.languageSelector.refresh();
  };
}

export default SideBar;