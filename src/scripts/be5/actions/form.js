import React          from 'react';
import be5            from '../be5';
import changeDocument from '../core/changeDocument';
import Forms          from '../services/forms';
import Form           from '../components/form';
import {HtmlResult}     from '../components/form';

export default function(entity, query, operation, operationParams) {

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
  Forms.load(params, document => {
    if (document.type === 'form') {
      changeDocument({ component: Form, value: document.value });
    } else {
      performOperationResult({ component: HtmlResult, value: document.value });
    }
  });

};
