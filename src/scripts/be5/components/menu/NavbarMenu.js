import React, {Component} from 'react';
import PropTypes from 'prop-types';
import be5 from '../../be5';
import {Button, Collapse, Navbar, NavbarToggler, UncontrolledTooltip} from 'reactstrap';
import RoleSelector from "../RoleSelector";
import {processHashUrl} from "../../utils/documentUtils";
import NavMenu from "./NavMenu";
import LanguageBox from "../LanguageSelector";
import ShowMenu from "./ShowMenu";
import bus from "../../core/bus";


const propTypes = {
  menu: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
  defaultRoute: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  brand: PropTypes.string,
  languageBox: PropTypes.bool,
  containerClass: PropTypes.string,
};

class NavbarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false, showMenu: true};
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    bus.listen('showMenu', data => {
      this.setState({
        showMenu: data.show
      });
    });
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
            <ShowMenu show={this.state.showMenu}>
              <NavbarToggler onClick={this.toggle}/>
              <Collapse isOpen={this.state.isOpen} navbar>
                <NavMenu {...this.props}/>
                {this.rightButtons()}
                {this.languageBox()}
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

  languageBox() {
    return this.props.languageBox ? <LanguageBox className="ml-2"/> : undefined;
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

    return <form className="form-inline ml-auto">
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
    return <form className="form-inline ml-auto">
      <Button onClick={processHashUrl} href="#!login" color="secondary">{be5.messages.login}</Button>
    </form>;
  }
}

NavbarMenu.propTypes = propTypes;

NavbarMenu.defaultProps = {
  containerClass: "container",
};

export default NavbarMenu;
