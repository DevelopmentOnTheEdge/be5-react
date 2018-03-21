import React from 'react';
import LanguageSelector from './LanguageSelector';
import UserControl      from '../containers/UserControl';
import Menu             from './menu/Menu';


class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"side"}>
        <UserControl size="sm"/>
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