import React          from 'react';
import Document       from '../Document';
import TableForm          from './TableForm';

class FormTable extends TableForm {

  render() {
    return (<div className="form-table">
      <Document frontendParams={{documentName: "form"}} />
      {this.tableInfo()}
      <Document frontendParams={{documentName: "table", operationDocumentName: "form"}} />
     </div>);
     //notShowTitle, h2Title..
  }

}

export default FormTable;
