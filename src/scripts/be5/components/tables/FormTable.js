import React            from 'react';
import be5              from '../../be5';
import Document         from '../../containers/Document';
import TableForm        from './TableForm';
import {registerDocument} from '../../core/documents';


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

registerDocument('formTable', FormTable);

export default FormTable;
