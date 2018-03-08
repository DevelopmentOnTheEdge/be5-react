import React from 'react';
import Be5MenuHolder from './Be5MenuHolder';
import be5 from '../../be5';
import RoleSelector from '../../components/RoleSelector';
import actions        from '../../services/actions';
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
import RoleBox from "../RoleSelector";


export default React.createClass({
  displayName: 'Be5Menu',
  
  propTypes: {
    // true => default menu
    // false => user lists all possible items using Be5MenuItem
    show: React.PropTypes.bool.isRequired,
    branding: React.PropTypes.string
  },
  
  getInitialState() {
    return { loaded: false, isOpen: false };
  },
  
  componentDidMount() {
    if (this.props.show) {
      this._onMenuChanged(Be5MenuHolder.getMenu());
      Be5MenuHolder.addListener(this._onMenuChanged);
    }
  },
  
  _onMenuChanged(menu) {
    this.setState({
      loaded: Object.keys(menu.getRaw()).length !== 0,
      menu: menu.getRaw()
    });
  },

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  },
  
  render() {
    if (!this.props.show) {
      return ( <span></span> );
    }
    
    const rootMenuItems = this.state.loaded ? this._renderMenuItems(this.state.menu.root, false) : <li>Loading...</li>;
    const branding = this.props.branding ?  <NavbarBrand href="#">{this.props.branding}</NavbarBrand> : undefined;
    const rightButtons = this._renderRightButtons();

    return (
      <Navbar color="dark" dark expand="md">
        <div className="container">
          {branding}
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
    if (!this.state.loaded) {
      return undefined;
    }
    if (!this.state.menu.loggedIn){
      return (
        <form className="form-inline ml-auto">
          <a className="btn btn-secondary" role="button" href="#!login">Sign in</a>
          {' '}
          <a className="btn btn-primary" role="button" href="#!register">Sign up</a>
        </form>
      );
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
      if (item.default) {
        return undefined;
      }
      const { href, target } = actions.parse(item.action);

      return (
        <DropdownItem href={href} key={target+href}>{item.title}</DropdownItem>
      )
    });
  },

  _renderMenuItems(items, inDropdown) {
    return _(items).map(item => {
      if (item.default) {
        return undefined;
      }
      
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


  
  /* public */
  refresh() {
    Be5MenuHolder.reload();
  }
});
