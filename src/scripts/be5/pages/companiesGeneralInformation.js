import React          from 'react';
import PropTypes from 'prop-types';
import be5                  from '../be5';
import Document             from '../components/document';
import changeDocument from '../core/changeDocument';

class CompaniesGeneralInformation extends React.Component {

  componentDidMount(){
    be5.url.process("table", "#!table/companies/All records");
    be5.url.process("form", "#!form/_test_/Test%201D/GeneralRequirements");
  }

  render() {
    return (<div>
      <Document documentName={"table"} />
      <Document documentName={"form"} />
     </div>);
  }

}

be5.registerAction('companiesGeneralInformation', (documentName) =>{
  changeDocument(documentName, { component: CompaniesGeneralInformation, value: {} })
});
