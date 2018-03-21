import React from 'react';
import bus           from '../../core/bus';
import MenuBody    from './MenuBody';
import MenuSearchField from './MenuSearchField';


class Menu extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};

    this._handleQueryChange = this._handleQueryChange.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    //TODO move to init
    bus.listen('RoleChanged', this.refresh);
    bus.listen('RefreshAll', this.refresh);
  }

  render() {
    return (
      <div className="menuContainer">
        <MenuSearchField ref="searchfield" onChange={this._handleQueryChange}/>
        <MenuBody ref="menubody"/>
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