import be5        from '../../be5';
import _          from 'underscore';
import MenuHeader from './menuHeader';
import MenuFooter from './menuFooter';
import MenuNode   from './menuNode';
import React, { Component } from 'react';
import '../../../../css/menu.css';

class SearchField extends Component {
  constructor(props) {
    super(props);

    this._handleChange = this._handleChange.bind(this);
  }

  static getInitialState() {
    return { value: '' };
  }

  render() {
    return (
      <input type="text" className="searchField form-control" onChange={this._handleChange} value={this.state.value} placeholder={be5.messages.filter}/>
		);
  }
  
  _handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.onChange(event.target.value);
  }
}

SearchField.propTypes = {
  onChange: PropTypes.func.isRequired
};

class MenuBody extends Component{
  constructor(props) {
    super(props);

    this._getFilteredRoot = this._getFilteredRoot.bind(this);
  }

  static getInitialState() {
    return { root: [ { title: 'Loading...' } ], query: '' };
  }
  
  componentDidMount() {
    this.refresh();
  }
  
  refresh() {
    be5.net.request('menu', {}, data => {
      this.setState(data);
    });
  }
  
  render() {
    const filteredRoot = this._getFilteredRoot();
    const rootNodes = filteredRoot.map(node => (
      <MenuNode key={JSON.stringify(node)} data={node} level={1}/>
    ));
    return (
      <div className="menu">{rootNodes}</div>
    );
  }
  
  _getFilteredRoot() {
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
}

class Menu extends Component{
  constructor(props) {
    super(props);

    this._handleQueryChange = this._handleQueryChange.bind(this);
  }

  static getInitialState() {
    return {};
  };
  
  render() {
    return (
      <div className="menuContainer">
        <MenuHeader ref="menuheader"/>
        <SearchField ref="searchfield" onChange={this._handleQueryChange}/>
        <MenuBody ref="menubody"/>
        <MenuFooter/>
      </div>
    );
  };
  
  refresh() {
    this.refs.menuheader.setState({ message: be5.messages.welcome });
    this.refs.menubody.refresh();
  };
  
  _handleQueryChange(query) {
    this.refs.menubody.setState({ query: query });
  }
}

export default Menu;
