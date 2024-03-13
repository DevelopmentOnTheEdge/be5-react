import React, {Component} from 'react';
import PropTypes from 'prop-types';
import be5 from '../../be5';
import {Button, Collapse, Navbar, NavbarToggler, UncontrolledTooltip} from 'reactstrap';
import RoleSelector from "../RoleSelector";
import {processHashUrl} from "../../utils/documentUtils";
import NavMenu from "./NavMenu";
import {LanguageBox} from "../LanguageSelector";
import LanguageDropdown from "../LanguageDropdown";
import MenuSearchField from './MenuSearchField';
import ShowMenu from "./ShowMenu";
import bus from "../../core/bus";
import { isMobileDevice } from '../../utils/utils';


const propTypes = {
  menu: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
  defaultRoute: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  brand: PropTypes.string,
  languageSelector: PropTypes.oneOf(['box', 'dropdown', 'none']),
  containerClass: PropTypes.string,
  searchField: PropTypes.bool,
  isMobileDevice: PropTypes.bool,
};

class NavbarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false, showMenu: true, showOperationPopup: false, isMobileDevice: isMobileDevice()};
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    ['showMenu', 'showOperationPopup'].forEach(eventName => {
      bus.listen(eventName, data => {
        this.setState({
          [eventName]: data.show
        });
      });
    })
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
        <Navbar color="dark" dark expand="md">
          <div className={this.props.containerClass}>
            {this.navbarBrand(!this.state.showMenu)}
            {this.state.isMobileDevice ? this.languageSelector() : undefined}
            <ShowMenu menu={this.state.showMenu} popup={this.state.showOperationPopup}>
              <NavbarToggler onClick={this.toggle}/>
              <Collapse isOpen={this.state.isOpen} navbar>
                <NavMenu {...this.props}/>
                {this.searchField()}
                {this.rightButtons()}
                {!this.state.isMobileDevice ? this.languageSelector() : undefined}
              </Collapse>
            </ShowMenu>
          </div>
        </Navbar>
    );
  }

  navbarBrand(disabled) {
    if(this.props.brand){
      return disabled
          ? <a className="navbar-brand">{this.props.brand}</a>
          : <a href="#!" onClick={processHashUrl} className="navbar-brand">{this.props.brand}</a>
    }else{
      return undefined;
    }
  }

  languageSelector() {
    switch(this.props.languageSelector)
    {
      case 'box':
        return <LanguageBox className="ml-2 mb-2"/>;
      case 'dropdown':
        return <LanguageDropdown className="ml-2 mb-2"/>;
      default:
        return undefined;
      
    }
  }

  searchField() {
    return this.props.searchField ? 
    <div className='mr-2'>
      <MenuSearchField placeholder={be5.messages.search} /> 
    </div>
      : undefined;
  }

  rightButtons() {
    if (!this.props.user.loggedIn) {
      return this.notLoggedInForm();
    } else {
      return this.loggedInForm();
    }
  }

  loggedInForm() {
    const {
      userName,
      currentRoles,
      availableRoles
    } = this.props.user;

    return <form className="form-inline ml-auto mb-2">
      <UncontrolledTooltip placement="left" target="RoleSelector">
        {userName}
      </UncontrolledTooltip>
      <RoleSelector
        id={"RoleSelector"}
        availableRoles={availableRoles}
        currentRoles={currentRoles}
        toggleRoles={this.props.toggleRoles}
      />{' '}
      <Button onClick={processHashUrl} href="#!logout" color="secondary">{be5.messages.logout}</Button>
    </form>;
  }

  notLoggedInForm() {
    return <form className="form-inline ml-auto mb-2">
      <Button onClick={processHashUrl} href="#!login" color="secondary">{be5.messages.login}</Button>
    </form>;
  }
}

NavbarMenu.propTypes = propTypes;

NavbarMenu.defaultProps = {
  containerClass: "container",
  searchField: false,
  languageSelector: "box"
};

export default NavbarMenu;
