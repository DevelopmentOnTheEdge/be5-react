import React          from 'react';
import Document       from '../document';
import TableForm          from './tableForm';

class FormTable extends TableForm {

  render() {
    return (<div className="form-table">
      <h1>{this.props.value.title}</h1>
      <Document documentName={"form"} onChange={this.onChange} />
      <Document documentName={"table"} operationDocumentName={"form"} onChange={this.onChange}/>
     </div>);
     //notShowTitle, h2Title..
  }

}

export default FormTable;
