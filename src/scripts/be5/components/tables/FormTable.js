import React            from 'react';
import be5              from '../../be5';
import Document         from '../Document';
import TableForm        from './TableForm';


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

be5.ui.tables.registerTable('formTable', FormTable);

export default FormTable;
