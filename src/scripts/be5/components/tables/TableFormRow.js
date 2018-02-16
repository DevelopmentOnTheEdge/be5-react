import React          from 'react';
import Document       from '../Document';
import TableForm          from './TableForm';
import tablesCollections  from '../../services/tablesCollections';


class TableFormRow extends TableForm {

  render() {
    return (
      <div className="row">
        {this.tableInfo()}
        <div className="col-lg-6">
          <Document frontendParams={{documentName: "table", operationDocumentName: "form"}} />
        </div>
        <div className="col-lg-6">
          <Document frontendParams={{documentName: "form"}} />
        </div>
      </div>
    );
  }

}

tablesCollections.registerTable('tableFormRow', TableFormRow);

export default TableFormRow;
