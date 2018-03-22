import React            from 'react';
import be5              from '../../be5';
import Document         from '../../containers/Document';
import TableForm        from './TableForm';
import {registerDocument} from '../../core/documents';


class TableFormRow extends TableForm {

  render() {
    return (
      <div className="row">
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

registerDocument('tableFormRow', TableFormRow);

export default TableFormRow;
