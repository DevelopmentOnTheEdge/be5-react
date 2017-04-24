import React      from 'react';
import be5        from 'be5/be5';
import bus        from 'be5/core/bus';
import _          from 'underscore';
import MenuHeader from 'be5/components/menuHeader';
import MenuFooter from 'be5/components/menuFooter';
import MenuNode   from 'be5/components/menuNode';

be5.load.css('be5/css/menu.css');
be5.load.css('be5/css/menuFooter.css');

const SearchField = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },
  
  displayName: 'SearchField',
  
  getInitialState: function() {
    return { value: '' };
  },

  render: function() {
    return (
      <input type="text" className="searchField form-control" onChange={this._handleChange} value={this.state.value} placeholder={be5.messages.filter}/>
		);
  },
  
  _handleChange: function(event) {
    this.setState({ value: event.target.value });
    this.props.onChange(event.target.value);
  }
});

const MenuBody = React.createClass({
  displayName: 'MenuBody',
  
  getInitialState: function() {
    return { root: [ { title: 'Loading...' } ], query: '' };
  },
  
  componentDidMount: function() {
    this.refresh();
  },
  
  refresh: function() {
    be5.net.request('menu', {}, data => {
      this.setState(data);
    });
  },
  
  render: function() {
    const filteredRoot = this._getFilteredRoot();
    const rootNodes = filteredRoot.map(node => (
      <MenuNode key={JSON.stringify(node)} data={node} level={1}/>
    ));
    return (
      <div className="menu">{rootNodes}</div>
    );
  },
  
  _getFilteredRoot: function() {
    const containsIgnoreCase = (str, substr) => {
      return str.toLowerCase().indexOf(substr.toLowerCase()) !== -1;
    };
    const anyChildContainsIgnoreCase = (node, query) => {
      if (containsIgnoreCase(node.title, query)) {
        return true;
      }
      return node.children && _.any(node.children, child => anyChildContainsIgnoreCase(child, query));
    };
    const filterNodeContent = (node, query) => {
      if (!node.children) {
        return node;
      }
      return _.extend({}, node, { children: filterByTitle(node.children, query) });
    };
    const filterByTitle = (root, query) => {
      return root
        .filter(node => anyChildContainsIgnoreCase(node, query))
        .map(node => filterNodeContent(node, query));
    };
    
    return filterByTitle(this.state.root, this.state.query);
  }
});

const Menu = React.createClass({
  displayName: 'Menu',
  
  getInitialState: function() {
    return {};
  },
  
  render: function() {
    return (
      <div className="menuContainer">
        <MenuHeader ref="menuheader"/>
        <SearchField ref="searchfield" onChange={this._handleQueryChange}/>
        <MenuBody ref="menubody"/>
        <MenuFooter/>
      </div>
    );
  },
  
  refresh: function() {
    this.refs.menuheader.setState({ message: be5.messages.welcome });
    this.refs.menubody.refresh();
  },
  
  _handleQueryChange: function(query) {
    this.refs.menubody.setState({ query: query });
  }
});

export default Menu;
