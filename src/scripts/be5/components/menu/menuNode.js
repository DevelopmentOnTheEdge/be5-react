import React  from 'react';
import be5    from '../../be5';
import Action from '../action';

const MenuNode = React.createClass({
  displayName: 'MenuNode',
  
  getInitialState() {
    return { href: '#', target: '', classes: '' };
  },
  
  componentDidMount() {
    var href = '#';
    var target = '';
    var classes = '';
    if (this.props.level == 1) {
      classes += 'rootMenuItem';
    } else {
      classes += 'menuItem';
    }
    var hasAction = this.props.data.action != null;
    if (hasAction) {
      classes += ' menuItemWithRef';
      const action = Action.parse(this.props.data.action);
      href = action.href;
      target = action.target;
    } else {
      classes += ' menuItemWithoutRef';
    }
    this.setState({href: href, target: target, classes: classes, hasAction:hasAction});
  },
  
  render() {
    const hasChildren = this.props.data.children != null;
    
    if (!hasChildren) {
      const key = 'menu node ' + this.props.data.title;
      return (
        <div className='menuNode' key={key}>
          {this._getHead()}
          {this._getOperations()}
        </div>
      );
    }
    
    const nextLevel = this.props.level + 1;
    const children = this.props.data.children.map(child => {
      const childKey = 'li ' + child.title;
      return (
        <li key={childKey}>
          <MenuNode key={child.title} data={child} level={nextLevel}/>
        </li>
      );
    });
    
    return (
      React.DOM.div({className: 'menuNode', key: 'menu node ' + this.props.data.title}, 
        this._getHead(), this._getOperations(), 
        React.DOM.ul({key: 'ul ' + this.props.data.title}, children)
      )
    );
  },
  
  _onClick(event) {
    if(/^#/.test(this.state.href)) {
      be5.url.set(this.state.href);
    }
  },
  
  _getHead() {
    if(this.state.hasAction) {
        return (
            React.DOM.a({ href: this.state.href, className: this.state.classes, target: this.state.target,
                onClick: this._onClick, key: 'a ' + this.props.data.title }, this.props.data.title)
        );
    }else{
        return (
            <span className={this.state.classes}>{this.props.data.title}</span>
        );
    }
  },
  
  _getOperations() {
    const hasOperations = this.props.data.operations != null;
    
    if (!hasOperations) {
      const key = 'operations ' + this.props.data.title
      return <div key={key}/>;
    }
    
    return this.props.data.operations.map(operation => {
      const href = '#!'+operation.action.arg;
      const title = operation.title == 'Insert' ? '+' : operation.title;
      const opBoxKey = 'operation box ' + title;
      const opKey = 'operation a ' + title;
      return (
        <div className="menuOperationBox" key={opBoxKey}> 
          <a href={href} className="menuOperation" key={opKey}>
            [{title}]
          </a>
        </div>
      );
    });
  }
});

export default MenuNode;
