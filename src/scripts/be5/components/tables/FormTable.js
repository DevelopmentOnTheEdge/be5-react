import React          from 'react';
import Document       from '../Document';
import TableForm          from './TableForm';
import tablesCollections  from '../../services/tablesCollections';


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

tablesCollections.registerTable('formTable', FormTable);

export default FormTable;
