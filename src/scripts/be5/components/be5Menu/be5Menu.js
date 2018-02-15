import React from 'react';
import Be5MenuHolder from './be5MenuHolder';
import Action from '../action';

export default React.createClass({
  displayName: 'Be5Menu',
  
  propTypes: {
    // true => default menu
    // false => user lists all possible items using Be5MenuItem
    show: React.PropTypes.bool.isRequired,
    branding: React.PropTypes.string
  },
  
  getInitialState() {
    return { loaded: false };
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
  
  render() {
    if (!this.props.show) {
      return ( <span></span> );
    }
    
    const rootMenuItems = this.state.loaded ? this._renderMenuItems(this.state.menu.root, false) : <li>Loading...</li>;
    const branding = this.props.branding ? <a className="navbar-brand" href="#">{this.props.branding}</a> : undefined;
    const rightButtons = this._renderRightButtons();
    
    return (
      <nav className="navbar navbar-light bg-faded">
        <div className="container">
          {branding}
          <ul className="nav navbar-nav">
            {rootMenuItems}
          </ul>
          {rightButtons}
        </div>
      </nav>
    );
  },
  
  _renderRightButtons() {
    if (!this.state.loaded) {
      return undefined;
    }
    if (!this.state.menu.loggedIn){
      return (
        <form className="form-inline pull-right">
          <a className="btn btn-secondary" role="button" href="#!login">Sign in</a>
          {' '}
          <a className="btn btn-primary" role="button" href="#!register">Sign up</a>
        </form>
      );
    }
    return (
      <form className="form-inline pull-right">
        <a className="btn btn-secondary" role="button" href="#!logout">Log out</a>
      </form>
    );
  },
  
  _renderMenuItems(items, inDropdown) {
    return _(items).map(item => {
      if (item.default) {
        return undefined;
      }
      
      if (!item.children || item.children.length === 0) {
        const { href, target } = Action.parse(item.action);
        const liClass = inDropdown ? '' : 'nav-item';
        const aClass = inDropdown ? 'dropdown-item' : 'nav-link';
        return <li className={liClass} key={target+href}><a className={aClass} href={href} target={target}>{item.title}</a></li>;
      }
      
      const dropdownMenuItems = this._renderMenuItems(item.children, true);
      
      return (
        <li className="nav-item dropdown" key={item.title}>
          <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
            {item.title}
          </a>
          <ul className="dropdown-menu">
            {dropdownMenuItems}
          </ul>
        </li>
      );
    });
  },
  
  /* public */
  refresh() {
    Be5MenuHolder.reload();
  }
});
