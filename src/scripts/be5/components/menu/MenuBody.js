import React from 'react';
import be5        from '../../be5';
import MenuNode   from './MenuNode';


class MenuBody extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {root: [ { title: 'Loading...' } ], query: ''};

    this._getFilteredRoot = this._getFilteredRoot.bind(this);
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

export default MenuBody;