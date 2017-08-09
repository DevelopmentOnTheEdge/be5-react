import React          from 'react';
import PropTypes from 'prop-types';
import be5                  from '../be5';
import Document             from '../components/document';
import changeDocument from '../core/changeDocument';

class Contractors extends React.Component {

  componentDidMount(){
    be5.url.process("table", "#!table/contractor/All records");
    be5.url.process("form", "#!form/contractor/All%20records/InsertContractor");
  }

  render() {
    return (<div>
      <Document documentName={"table"} operationDocumentName={"form"}/>
      <Document documentName={"form"} onChange={()=>{
        be5.url.process("table", "#!table/contractor/All records");
      }} />
     </div>);
  }

}

be5.registerAction('contractors', (documentName) =>{
  changeDocument(documentName, { component: Contractors, value: {} })
});
