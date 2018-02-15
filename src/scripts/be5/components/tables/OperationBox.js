import React, {Component} from 'react';
import ReactDOM        from 'react-dom';
import be5             from '../../be5';
import $               from 'jquery';
import _               from 'underscore';


class OperationBox extends Component
{
  constructor(props) {
    super(props);
  };

  onClick(name, e) {
    if (!$(ReactDOM.findDOMNode(this.refs[name])).hasClass('disabled')) {
      const operation = this.props.operations.find(operation => operation.name === name);
      if (!operation.requiresConfirmation || confirm(operation.title + "?")) {
        this.props.onOperationClick(name);
      }
    }
    e.preventDefault();
  }

  refreshEnablement() {
    this.props.operations.forEach(operation => {
      let visible = false;
      switch (operation.visibleWhen) {
        case 'always':
          visible = true;
          break;
        case 'oneSelected':
          visible = (be5.tableState.selectedRows.length === 1);
          break;
        case 'anySelected':
          visible = (be5.tableState.selectedRows.length !== 0);
          break;
        case 'hasRecords':
          visible = this.props.hasRows;
          break;
      }
      if (visible) {
        $(ReactDOM.findDOMNode(this.refs[operation.name])).addClass('enabled');
        $(ReactDOM.findDOMNode(this.refs[operation.name])).removeClass('disabled');
      } else {
        $(ReactDOM.findDOMNode(this.refs[operation.name])).addClass('disabled');
        $(ReactDOM.findDOMNode(this.refs[operation.name])).removeClass('enabled');
      }
    });
  }

  render() {
    const splitWithSpaces = (elements) => {
      const out = [];
      _(elements).each(e => {
        if (out.length !== 0) {
          out.push(' ');
        }
        out.push(e);
      });
      return out;
    };
    const operations = this.props.operations.map(operation => {
//      if (operation.isClientSide) {
//        const action = Action.parse(operation.action);
//        const attrs = {
//          key: operation.name,
//          ref: operation.name,
//          href: action.href,
//          target: action.target,
//          className: 'btn btn-secondary'
//        };
//        return React.createElement('a', attrs, operation.title);
//      }
      return (
        <button key={operation.name} ref={operation.name} onClick={this.onClick.bind(this, operation.name)} className={'btn btn-secondary btn-secondary-old btn-sm'}>
          {operation.title}
        </button>
      );
    });

    if(this.props.operations.length === 0){
      return (
        <div/>
      );
    }
    return (
      <div className={'operationList'}>{splitWithSpaces(operations)}</div>
    );
  }
}

export default OperationBox;