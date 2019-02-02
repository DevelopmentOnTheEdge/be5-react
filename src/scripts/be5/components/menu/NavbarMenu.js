import React, {Component} from 'react';
import PropTypes      from 'prop-types';
import classNames     from 'classnames';
import be5            from '../../be5';
import actions        from '../../services/actions';
import {arraysEqual, hashUrlIsEmpty} from '../../utils/utils';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  UncontrolledTooltip
} from 'reactstrap';
import RoleSelector from "../RoleSelector";
import {processHashUrl} from "../../utils/documentUtils";


const propTypes = {
  menu: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
  defaultRoute: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  brand: PropTypes.string,
};

class NavbarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};

    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    this.props.fetchMenu();
  }

  componentWillReceiveProps(nextProps) {
    const {loggedIn, currentRoles} = this.props.user;
    if (!arraysEqual(currentRoles, nextProps.user.currentRoles) || loggedIn !== nextProps.user.loggedIn) {
      this.props.fetchMenu();
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    if (this.props.menu === null) {
      return null
    }

    const brand = this.props.brand
      ? <a href="#!" onClick={processHashUrl} className="navbar-brand">{this.props.brand}</a>
      : undefined;

    return (
      <Navbar color="dark" dark expand="md">
        <div className="container">
          {brand}
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="" navbar>
              {this._renderMenuItems(this.props.menu.root, false)}
            </Nav>
            {this._renderRightButtons()}
          </Collapse>
        </div>
      </Navbar>
    );
  }

  _renderRightButtons() {
    const {
      userName,
      loggedIn,
      currentRoles,
      availableRoles
    } = this.props.user;

    if (!loggedIn) {
      return (
        <form className="form-inline ml-auto">
          <Button onClick={processHashUrl} href="#!login" color="secondary">{be5.messages.login}</Button>
        </form>
      );
    }
    return (
      <form className="form-inline ml-auto">
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
      </form>
    );
  }

  _renderDropdownMenuItems(items) {
    let anyActive = false;
    const dropdownMenuItems = _(items).map(item => {
      const {href, target} = actions.parse(item.action);
      if (this.isActive(href)) anyActive = true;
      return (
        <DropdownItem
          onClick={processHashUrl}
          href={href}
          key={target + href}
          active={this.isActive(href)}
        >
          {item.title}
        </DropdownItem>
      )
    });

    return {
      dropdownMenuItems: dropdownMenuItems,
      active: anyActive
    }
  }

  _renderMenuItems(items, inDropdown) {
    return _(items).map(item => {
      if (!item.children || item.children.length === 0) {
        const {href, target} = actions.parse(item.action);
        let active = false;
        if (this.isActive(href)) active = true;
        return (
          <NavItem key={target + href}>
            <NavLink onClick={processHashUrl} href={href} active={active}>{item.title}</NavLink>
          </NavItem>
        )
      }

      const {dropdownMenuItems, active} = this._renderDropdownMenuItems(item.children, true);
      return (
        <UncontrolledDropdown nav inNavbar key={item.title}>
          <DropdownToggle nav caret className={classNames({active: active})}>
            {item.title}
          </DropdownToggle>
          <DropdownMenu>
            {dropdownMenuItems}
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    });
  }

  isActive(href) {
    return this.props.url.startsWith(href) ||
      (href === "#!" + this.props.defaultRoute && hashUrlIsEmpty(this.props.url));
  }
}

NavbarMenu.propTypes = propTypes;

export default NavbarMenu;
