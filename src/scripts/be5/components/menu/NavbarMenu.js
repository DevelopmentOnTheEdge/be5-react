import React, {Component} from 'react';
import PropTypes      from 'prop-types';
import classNames     from 'classnames';
import be5            from '../../be5';
import actions        from '../../services/actions';
import {arraysEqual}  from '../../utils/utils';
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
  //show: PropTypes.bool,
  menu: PropTypes.shape({}),
  user: PropTypes.shape({}),
  brand: PropTypes.string
};

class NavbarMenu extends Component {
  // defaultProps: {
  //   show: true
  // },
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

    const rootMenuItems = this._renderMenuItems(this.props.menu.root, false);
    const brand = this.props.brand
      ? <a href="#!" onClick={processHashUrl} className="navbar-brand">{this.props.brand}</a>
      : undefined;
    const rightButtons = this._renderRightButtons();

    return (
      <Navbar color="dark" dark expand="md">
        <div className="container">
          {brand}
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="" navbar>
              {rootMenuItems}
            </Nav>
            {rightButtons}
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
    let active = false;
    const dropdownMenuItems = _(items).map(item => {
      // if (item.default) {
      //   return undefined;
      // }
      const {href, target} = actions.parse(item.action);

      //TODO after store url in redux if(this.props.url === href)active = true;
      return (
        <DropdownItem onClick={processHashUrl} href={href} key={target + href}>{item.title}</DropdownItem>
      )
    });

    return {
      dropdownMenuItems: dropdownMenuItems,
      active: active
    }
  }

  _renderMenuItems(items, inDropdown) {
    return _(items).map(item => {
      // if (item.default) {
      //   return undefined;
      // }

      if (!item.children || item.children.length === 0) {
        const {href, target} = actions.parse(item.action);
        // const liClass = inDropdown ? '' : 'nav-item';
        // const aClass = inDropdown ? 'dropdown-item' : 'nav-link';
        // return <li className={liClass} key={target+href}><a className={aClass} href={href} target={target}>{item.title}</a></li>;
        let active = false;
        //if(this.props.url === href)active = true;
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
}

NavbarMenu.propTypes = propTypes;

export default NavbarMenu;
