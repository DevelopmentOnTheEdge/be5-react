import React          from 'react';
import be5            from '../be5';
import Forms          from '../services/forms';

export default function(documentName, entity, query, operation, operationParams) {

  const selectedRows = (operationParams === undefined || operationParams.selectedRows === undefined)
    ? be5.tableState.selectedRows.join() : operationParams.selectedRows;
  if(operationParams !== undefined && operationParams.selectedRows !== undefined){
    delete operationParams.selectedRows;
  }

  const params = {
    entity: entity,
    query: query || 'All records',
    operation: operation,
    values: be5.net.paramString(operationParams),
    selectedRows: selectedRows
  };

  Forms.load(params, documentName);
};
