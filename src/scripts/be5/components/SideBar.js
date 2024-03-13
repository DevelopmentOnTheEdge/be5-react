import React from 'react';
import UserControlContainer from '../containers/UserControlContainer';
import MenuContainer from '../containers/MenuContainer';
import MenuFooter from './menu/MenuFooter';
import {LanguageBox} from './LanguageSelector';


const SideBar = () => {
  return (
    <div className={"side-bar"}>
      <UserControlContainer size="sm"/>
      <MenuContainer/>
      <MenuFooter/>
      <LanguageBox/>
    </div>
  );
};

export default SideBar;
