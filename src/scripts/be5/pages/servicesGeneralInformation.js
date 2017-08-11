import React          from 'react';
import PropTypes from 'prop-types';
import be5                  from '../be5';
import Document             from '../components/document';
import Navs             from '../components/navs';
import changeDocument from '../core/changeDocument';

class ServicesGeneralInformation extends React.Component {

  render() {
    const steps = [
      {title: 'Группы МСП', url: '#!table/welfareGroups/General information'},
      {title: 'Виды МСП', url: '#!table/welfareTypes/General information'},
      {title: 'Сведения для ЕГИССО', url: '#!table/_msp_/All records'},
      {title: 'НПА', url: '#!form/_test_/Test%201D/InformationAboutDocuments'},
    ];

    return (
      <div>
        <h1>Услуги - Общие сведения</h1>
        <Navs steps={steps} tabs startAtStep="2"/>
      </div>
    );
  }

}

be5.registerAction('servicesGeneralInformation', (documentName) =>{
  changeDocument(documentName, { component: ServicesGeneralInformation, value: {} })
});
