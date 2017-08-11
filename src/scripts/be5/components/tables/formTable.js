import React          from 'react';
import Document       from '../document';
import TableForm          from './tableForm';

class FormTable extends TableForm {

  render() {
    return (<div className="form-table">
      <Document documentName={"form"} onChange={this.onChange} />
      <Document documentName={"table"} operationDocumentName={"form"} onChange={this.onChange}/>
     </div>);
  }

}

export default FormTable;
