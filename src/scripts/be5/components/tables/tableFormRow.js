import React          from 'react';
import PropTypes      from 'prop-types';
import be5            from '../../be5';
import Document       from '../document';
import Table          from './table';
import Tables          from '../../services/tables';
import changeDocument from '../../core/changeDocument';

class TableFormRow extends Table {

  componentDidMount(){
    const data = this.props.value;
    changeDocument("table", { component: Table, value: data });
    be5.url.process("form",
      "#!" + be5.url.create('form', [data.category, data.page, data.layout.defaultOperation], data.parameters)
    );
  }

  render() {
    const data = this.props.value;
    return (<div className="row">
      <div className="col-lg-6">
        <Document documentName={"table"} operationDocumentName={"form"}/>
      </div>
      <div className="col-lg-6">
        <Document documentName={"form"} onChange={()=>{
          const paramsObject = {
            entity: data.category, query: data.page, params: data.parameters,
            options: { embedded: false }
          };
          Tables.load(paramsObject, (data, documentName) =>{
            changeDocument(documentName, { component: Table, value: data.value });
          }, "table");
        }} />
      </div>
     </div>);
  }

}

export default TableFormRow;
