import React          from 'react';
import Document       from '../document';
import TableForm          from './tableForm';

class TableFormRow extends TableForm {

  render() {
    return (<div className="row">
      <div className="col-lg-6">
        <Document documentName={"table"} operationDocumentName={"form"} onChange={this.onChange}/>
      </div>
      <div className="col-lg-6">
        <Document documentName={"form"} onChange={this.onChange} />
      </div>
     </div>);
  }

}

export default TableFormRow;
