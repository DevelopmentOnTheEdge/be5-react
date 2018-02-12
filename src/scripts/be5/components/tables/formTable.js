import React          from 'react';
import Document       from '../document';
import TableForm          from './tableForm';

class FormTable extends TableForm {

  render() {
    return (<div className="form-table">
      <Document frontendParams={{documentName: "form"}} onChange={this.onChange} />
      {this.tableInfo()}
      <Document frontendParams={{documentName: "table", operationDocumentName: "form"}} onChange={this.onChange}/>
     </div>);
     //notShowTitle, h2Title..
  }

}

export default FormTable;
