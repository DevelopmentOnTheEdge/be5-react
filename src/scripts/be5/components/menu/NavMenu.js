import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import actions from '../../services/actions';
import {arraysEqual, hashUrlIsEmpty} from '../../utils/utils';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, UncontrolledDropdown} from 'reactstrap';
import {processHashUrl} from "../../utils/documentUtils";


const propTypes = {
  menu: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
  defaultRoute: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

class NavMenu extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchMenu();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {loggedIn, currentRoles} = this.props.user;
    if (!arraysEqual(currentRoles, nextProps.user.currentRoles) || loggedIn !== nextProps.user.loggedIn) {
      this.props.fetchMenu();
    }
  }

  render() {
    if (this.props.menu === null) {
      return null
    }

    return <Nav className="" navbar>
      {this._renderMenuItems(this.props.menu.root, false)}
    </Nav>;
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

  isActive(href) {
    return this.props.url.startsWith(href) ||
      (href === "#!" + this.props.defaultRoute && hashUrlIsEmpty(this.props.url));
  }
}

NavMenu.propTypes = propTypes;

export default NavMenu;
