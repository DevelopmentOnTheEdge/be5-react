import React          from 'react';
import PropTypes from 'prop-types';
import be5                  from '../be5';
import Document             from '../components/document';
import Navs             from '../components/navs';
import changeDocument from '../core/changeDocument';

class ServicesGeneralInformation extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const steps = [
      {title: 'Группы МСП', url: '#!form/_test_/Test%201D/WelfareGroupAdd'},
      {title: 'Виды МСП', url: '#!form/_test_/Test%201D/WelfareTypesAdd'},
    ];

    return (
      <div>
        <h1>Услуги - Общие сведения</h1>
        <Navs steps={steps} pills/>
      </div>
    );
  }

}

be5.registerAction('servicesGeneralInformation', (documentName) =>{
  changeDocument(documentName, { component: ServicesGeneralInformation, value: {} })
});
