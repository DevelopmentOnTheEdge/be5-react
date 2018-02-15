import React from 'react';
  
export default React.createClass({
  displayName: 'TreeMenu',
  
  propTypes: {
    /*
     * Example:
     * [{ name: 'Menu', id: 1, children: [{ name: 'Child', id: 2 }] }]
     */
    rootItems: React.PropTypes.array.isRequired,
    /*
     * A node will be passed to the function.
     */
    onItemSelect: React.PropTypes.func.isRequired,
    /*
     * An item that should be highligted.
     */
    activeItemId: React.PropTypes.string.isRequired
  },
  
  render() {
    return (
      <div className="tree-menu">
        <ul className="tree-menu-node-children">
          {this.props.rootItems.map(node => this._renderNode(node))}
        </ul>
      </div>
    );
  },
  
  _renderNode(node) {
    return (
      <li className="tree-menu-node" key={node.name}>
        <div className="tree-menu-node-title">
          <a role="button" className={'tree-menu-node-link' + (node.id === this.props.activeItemId ? ' active' : '')} href="javascript:void(0);" onClick={this._handleClick.bind(this, node)}>{node.name}</a>
        </div>
        {node.children
          ? <div className="tree-menu-node-children-container">
              <ul className="tree-menu-node-children">
                {node.children.map(node => this._renderNode(node))}
              </ul>
            </div>
          : undefined
        }
      </li>
    );
  },
  
  _handleClick(node) {
    this.props.onItemSelect(node);
  }
});
