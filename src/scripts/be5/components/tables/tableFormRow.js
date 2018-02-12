import React          from 'react';
import Document       from '../document';
import TableForm          from './tableForm';

class TableFormRow extends TableForm {

  render() {
    return (
      <div className="row">
        {this.tableInfo()}
        <div className="col-lg-6">
          <Document frontendParams={{documentName: "table", operationDocumentName: "form"}} onChange={this.onChange}/>
        </div>
        <div className="col-lg-6">
          <Document frontendParams={{documentName: "form"}} onChange={this.onChange} />
        </div>
      </div>
    );
  }

}

export default TableFormRow;
