import React from 'react';
import LanguageSelector from './LanguageSelector';
import UserControl      from '../containers/UserControl';
import Menu             from './menu/Menu';
import MenuFooter       from './menu/MenuFooter';


const SideBar = () => {
  return (
    <div className={"side"}>
      <UserControl size="sm"/>
      <Menu/>
      <MenuFooter/>
      <LanguageSelector/>
    </div>
  );
};

export default SideBar;