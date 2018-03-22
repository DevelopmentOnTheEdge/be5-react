import React from 'react';
import LanguageSelector     from './LanguageSelector';
import UserControlContainer from '../containers/UserControlContainer';
import Menu                 from './menu/Menu';
import MenuFooter           from './menu/MenuFooter';


const SideBar = () => {
  return (
    <div className={"side"}>
      <UserControlContainer size="sm"/>
      <Menu/>
      <MenuFooter/>
      <LanguageSelector/>
    </div>
  );
};

export default SideBar;