import React          from 'react';
import PropTypes      from 'prop-types';
import be5            from '../../be5';
import actions        from '../../services/actions';
import {arraysEqual}  from '../../utils/utils';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';


export default React.createClass({
  displayName: 'Be5Menu',

  propTypes: {
    //show: PropTypes.bool,
    brand: PropTypes.string
  },

  // defaultProps: {
  //   show: true
  // },

  getInitialState() {
    return { isOpen: false };
  },

  componentWillReceiveProps(nextProps) {
    const { loggedIn, currentRoles, fetchMenu } = this.props;
    if (!arraysEqual(currentRoles, nextProps.currentRoles) || loggedIn !== nextProps.loggedIn ) {
      fetchMenu();
    }
  },

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  },
  
  render() {
    // if (!this.props.show) {
    //   return null;
    // }
    if(this.props.menu === null){
      return <p>Loading...</p>
    }
    
    const rootMenuItems = this._renderMenuItems(this.props.menu.root, false);
    const brand = this.props.brand ?  <NavbarBrand href="#">{this.props.brand}</NavbarBrand> : undefined;
    const rightButtons = this._renderRightButtons();

    return (
      <Navbar color="dark" dark expand="md">
        <div className="container">
          {brand}
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="" navbar>
              {rootMenuItems}
            </Nav>
            {rightButtons}
          </Collapse>
        </div>
      </Navbar>
    );
  },
  
  _renderRightButtons() {
    if (!this.props.loggedIn){
      return (
        <form className="form-inline ml-auto">
          <a className="btn btn-secondary" role="button" href="#!login">Sign in</a>
        </form>
      );
      // {' '}
      // <a className="btn btn-primary" role="button" href="#!register">Sign up</a>
    }
    //<RoleSelector/>
    return (
      <form className="form-inline ml-auto">
        <a className="btn btn-secondary" role="button" href="#!logout">{be5.messages.logout}</a>
      </form>
    );
  },

  _renderDropdownMenuItems(items) {
    return _(items).map(item => {
      // if (item.default) {
      //   return undefined;
      // }
      const { href, target } = actions.parse(item.action);

      return (
        <DropdownItem href={href} key={target+href}>{item.title}</DropdownItem>
      )
    });
  },

  _renderMenuItems(items, inDropdown) {
    return _(items).map(item => {
      // if (item.default) {
      //   return undefined;
      // }

      if (!item.children || item.children.length === 0) {
        const { href, target } = actions.parse(item.action);
        // const liClass = inDropdown ? '' : 'nav-item';
        // const aClass = inDropdown ? 'dropdown-item' : 'nav-link';
        // return <li className={liClass} key={target+href}><a className={aClass} href={href} target={target}>{item.title}</a></li>;
        return (
          <NavItem key={target+href}>
            <NavLink href={href}>{item.title}</NavLink>
          </NavItem>
        )
      }
      
      const dropdownMenuItems = this._renderDropdownMenuItems(item.children, true);

      return (
        <UncontrolledDropdown nav inNavbar key={item.title}>
          <DropdownToggle nav caret>
            {item.title}
          </DropdownToggle>
          <DropdownMenu >
            {dropdownMenuItems}
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    });
  },

});
