import React          from 'react';
import PropTypes from 'prop-types';
import be5                  from '../be5';
import Document             from '../components/document';
import changeDocument from '../core/changeDocument';

class CompaniesGeneralInformation extends React.Component {

  componentDidMount(){
    be5.url.process("table", "#!table/companies/Общие сведения");
    be5.url.process("form", "#!form/_test_/Test%201D/GeneralRequirements");
  }

  render() {
    return (<div>
      <Document documentName={"table"} operationDocumentName={"form"}/>
      <Document documentName={"form"} onChange={()=>{
        be5.url.process("table", "#!table/companies/Общие сведения");
      }} />
     </div>);
  }
  //todo updateDocuments={"asd,asd"} вместо onChange={()=>{be5.url.process...

}

be5.registerAction('companiesGeneralInformation', (documentName) =>{
  changeDocument(documentName, { component: CompaniesGeneralInformation, value: {} })
});
