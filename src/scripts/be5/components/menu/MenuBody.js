import PropTypes  from 'prop-types';
import React, {Component} from 'react';
import MenuNode   from './MenuNode';


const propTypes = {
  menu: PropTypes.shape({}).isRequired
};

class MenuBody extends Component
{
  constructor(props) {
    super(props);
    this.state = {query: ''};

    this._getFilteredRoot = this._getFilteredRoot.bind(this);
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

    return filterByTitle(this.props.menu.root, this.state.query);
  }
}

MenuBody.propTypes = propTypes;

export default MenuBody;