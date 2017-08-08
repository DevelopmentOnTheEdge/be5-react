import React          from 'react';
import PropTypes from 'prop-types';
import be5                  from '../be5';
import Document             from '../components/document';
import Navs             from '../components/navs';
import changeDocument from '../core/changeDocument';

class Company extends React.Component {

  render() {
    const steps = [
      {title: 'Общие сведения', url: '#!companiesGeneralInformation'},
      {title: 'Адреса', url: '#!addresses'},
      {title: 'Документ-основание', url: '#!form/_test_/Test%201D/DocumentBaseOperation'},
    ];

    return (
      <div>
        <h1>Организация</h1>
        <Navs steps={steps} tabs startAtStep="0"/>
      </div>
    );
  }

}

be5.registerAction('company', (documentName) =>{
  changeDocument(documentName, { component: Company, value: {} })
});
