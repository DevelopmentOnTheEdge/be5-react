import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const OperationBox = ({ operations, hideOperations, onOperationClick, selectedRows, hasRows }) => {
  const operationRefs = useRef({});

  const getOperations = () => {
    let operationsList = [];
    const orderOutSize = [];

    operations.attributes.forEach(operation => {
      const layout = operation.layout;
      if (layout && operations.attributes.length >= layout.order) {
        const tail = operationsList.splice(layout.order - 1);
        operationsList = [...operationsList, operation, ...tail];
      } else if (layout && operations.attributes.length < layout.order) {
        orderOutSize.push(operation);
      } else {
        operationsList.push(operation);
      }
    });

    if (orderOutSize.length > 0) {
      operationsList = [...operationsList, ...orderOutSize.sort((a, b) => a.layout.order - b.layout.order)];
    }

    return operationsList.filter(operation => !hideOperations.includes(operation.name))
      .map(operation => {
        operationRefs.current[operation.name] = React.createRef();
        return (
          <button
            key={operation.name}
            ref={operationRefs.current[operation.name]}
            onClick={(e) => onClick(operation.name, e)}
            className='btn btn-secondary btn-secondary-old btn-sm'
            disabled={!isEnabled(operation.name)}
          >
            {operation.title}
          </button>
        );
      });
  };

  const onClick = (name, e) => {
    if (isEnabled(name)) {
      const operation = operations.attributes.find(operation => operation.name === name);
      if (!operation.requiresConfirmation || window.confirm(`${operation.title}?`)) {
        onOperationClick(operation);
      }
    }
    e.preventDefault();
  };

  const isEnabled = (name) => {
    const operation = operations.attributes.find(operation => operation.name === name);
    let visible = false;
    switch (operation.visibleWhen) {
      case 'always':
        visible = true;
        break;
      case 'oneSelected':
        visible = (selectedRows.length === 1);
        break;
      case 'anySelected':
        visible = (selectedRows.length !== 0);
        break;
      case 'hasRecords':
        visible = hasRows;
        break;
      default:
        visible = false;
    }
    return visible;
  };

  if (!operations) return null;
  const operationItems = splitWithSpaces(getOperations());

  if (operationItems.length === 0) {
    return null;
  } else {
    return (
      <div className='operationList'>
        {operationItems}
      </div>
    );
  }
};

const splitWithSpaces = (elements) => {
  const out = [];
  elements.forEach(e => {
    if (out.length !== 0) {
      out.push(' ');
    }
    out.push(e);
  });
  return out;
};

OperationBox.propTypes = {
  operations: PropTypes.object,
  hideOperations: PropTypes.array,
  onOperationClick: PropTypes.func,
  selectedRows: PropTypes.array,
  hasRows: PropTypes.bool
};

OperationBox.defaultProps = {
  hideOperations: []
};

export default OperationBox;
