import React          from 'react';
import PropTypes      from 'prop-types';
import be5            from '../../be5';
import Document       from '../document';
import Table          from './table';
import Tables          from '../../services/tables';
import changeDocument from '../../core/changeDocument';

class TableForm extends Table {

  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    const data = this.props.value;
    changeDocument("table", { component: Table, value: data });
    be5.url.process("form",
      "#!" + be5.url.create('form', [data.category, data.page, data.layout.defaultOperation], data.parameters)
    );
  }

  onChange(){
    const data = this.props.value;
    const paramsObject = {
      entity: data.category, query: data.page, params: data.parameters,
      options: { embedded: false }
    };
    Tables.load(paramsObject, (data, documentName) =>{
      changeDocument(documentName, { component: Table, value: data.value });
    }, "table");
  }

  render() {
    return (<div>
      <Document documentName={"table"} operationDocumentName={"form"} onChange={this.onChange}/>
      <Document documentName={"form"} onChange={this.onChange} />
     </div>);
  }

}

export default TableForm;
