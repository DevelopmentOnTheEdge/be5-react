import React, {Component} from 'react';
import actions from '../../services/actions';
import {processHashUrl} from "../../utils/documentUtils";

const MenuNode = (props) => {

  function getData(node){
    let href = '#';
    let target = '';
    let classes = '';
    if (node.level === 1) {
      classes += 'rootMenuItem';
    } else {
      classes += 'menuItem';
    }
    const hasAction = node.data.action !== undefined;
    if (hasAction) {
      classes += ' menuItemWithRef';
      const action = actions.parse(node.data.action);
      href = action.href;
      target = action.target;
    } else {
      classes += ' menuItemWithoutRef';
    }
    return {href: href, target: target, classes: classes, hasAction: hasAction};
  }

  const hasChildren = props.data.children !== undefined;

  if (!hasChildren) {
    const key = 'menu node ' + props.data.title;
    return (
      <div className='menuNode' key={key}>
        {_getHead()}
        {_getOperations()}
      </div>
    );
  }

  const nextLevel = props.level + 1;
  const children = props.data.children.map(child => {
    const childKey = 'li ' + child.title;
    return (
      <li key={childKey}>
        <MenuNode key={child.title} data={child} level={nextLevel}/>
      </li>
    );
  });

  return (
    <div className="menuNode" key={'menu node ' + props.data.title}>
      {_getHead()}
      {_getOperations()}
      <ul key={'ul ' + props.data.title}>{children}</ul>
    </div>
  );

  function _getHead() {
    const data = getData(props);
    if(data.hasAction) {
        return (
            <a
              href={data.href}
              className={data.classes}
              target={data.target}
              onClick={processHashUrl}
              key={'a ' + props.data.title}
            >
              {props.data.title}
            </a>
        );
    }else{
        return (
            <span className={data.classes}>{props.data.title}</span>
        );
    }
  }

  function _getOperations() {
    const hasOperations = props.data.operations !== undefined;
    
    if (!hasOperations) {
      const key = 'operations ' + props.data.title;
      return <div key={key}/>;
    }
    
    return props.data.operations.map(operation => {
      const href = '#!'+operation.action.arg;
      const title = operation.title === 'Insert' ? '+' : operation.title;
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

};

export default MenuNode;
