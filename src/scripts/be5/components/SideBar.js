import React from 'react';
import UserControlContainer from '../containers/UserControlContainer';
import MenuContainer        from '../containers/MenuContainer';
import MenuFooter           from './menu/MenuFooter';
import LanguageSelector     from './LanguageSelector';


const SideBar = () => {
  return (
    <div className={"side"}>
      <UserControlContainer size="sm"/>
      <MenuContainer/>
      <MenuFooter/>
      <LanguageSelector/>
    </div>
  );
};

export default SideBar;