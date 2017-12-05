import React, { Component } from 'react';

import MenuFooter  from './menuFooter';
import MenuBody    from './MenuBody';
import MenuSearchField from './MenuSearchField';
import '../../../../css/menu.css';


class Menu extends Component{
  constructor(props) {
    super(props);
    this.state = {};

    this._handleQueryChange = this._handleQueryChange.bind(this);
  }

  render() {
    return (
      <div className="menuContainer">
        <MenuSearchField ref="searchfield" onChange={this._handleQueryChange}/>
        <MenuBody ref="menubody"/>
        <MenuFooter/>
      </div>
    );
  };

  refresh() {
    //this.refs.menuheader.setState({ message: be5.messages.welcome });
    this.refs.menubody.refresh();
  };

  _handleQueryChange(query) {
    this.refs.menubody.setState({ query: query });
  }
}

export default Menu;