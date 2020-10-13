import React from 'react';


class OperationBox extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    if (!this.props.operations) return null;
    const operationItems = this.splitWithSpaces(this.getOperations());

    if (operationItems.length === 0) {
      return null;
    } else {
      return (
        <div className={'operationList'}>
          {operationItems}
        </div>
      );
    }
  }

  getOperations() {
    let operations =  [];
    const orderOutSize = [];
    this.props.operations.attributes.forEach(operation => {
      const order = +operation.layout.order;
      if (this.props.operations.attributes.length >= order) {
        const tail = operations.splice(operation.layout.order - 1);
        operations = [...operations, operation, ...tail];
      } else if (this.props.operations.attributes.length < order) {
        orderOutSize.push(operation)
      } else {
        operations.push(operation)
      }
    });

    if(orderOutSize.length > 0){
      operations = [...operations, ...orderOutSize.sort((a, b) => a.layout.order - b.layout.order)]
    }

    return operations.filter(operation => !this.props.hideOperations.includes(operation.name))
        .map(operation => {
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
          <button
            key={operation.name}
            ref={operation.name}
            onClick={this.onClick.bind(this, operation.name)}
            className={'btn btn-secondary btn-secondary-old btn-sm'}
            disabled={!this.isEnabled(operation.name)}
          >
            {operation.title}
          </button>
        );
      });
  }

  onClick(name, e) {
    if (this.isEnabled(name)) {
      const operation = this.props.operations.attributes.find(operation => operation.name === name);
      if (!operation.requiresConfirmation || confirm(operation.title + "?")) {
        this.props.onOperationClick(operation);
      }
    }
    e.preventDefault();
  }

  isEnabled(name) {
    const operation = this.props.operations.attributes.find(operation => operation.name === name);
    let visible = false;
    switch (operation.visibleWhen) {
      case 'always':
        visible = true;
        break;
      case 'oneSelected':
        visible = (this.props.selectedRows.length === 1);
        break;
      case 'anySelected':
        visible = (this.props.selectedRows.length !== 0);
        break;
      case 'hasRecords':
        visible = this.props.hasRows;
        break;
    }
    return visible;
  }

  splitWithSpaces(elements) {
    const out = [];
    _(elements).each(e => {
      if (out.length !== 0) {
        out.push(' ');
      }
      out.push(e);
    });
    return out;
  };
}

OperationBox.defaultProps = {
  hideOperations: []
};

export default OperationBox;
