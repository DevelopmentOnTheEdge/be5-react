import React            from 'react';
import Document         from '../Document';
import TableForm        from './TableForm';
import tablesCollection from '../../services/tablesCollection';


class FormTable extends TableForm {

  render() {
    return (
      <div className="form-table">
        <Document frontendParams={{documentName: "form"}} />
        <Document frontendParams={{documentName: "table", operationDocumentName: "form"}} />
     </div>
    );
  }

}

tablesCollection.registerTable('formTable', FormTable);

export default FormTable;
