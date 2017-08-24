import React          from 'react';
import PropTypes from 'prop-types';
import be5                  from '../be5';
import Document             from '../components/document';
import Navs             from '../components/navs';
import changeDocument from '../core/changeDocument';

class Services extends React.Component {

  render() {
    const steps = [
      {title: 'Группы МСП', url: '#!table/welfareGroups/General information'},
      {title: 'Виды МСП', url: '#!table/welfareTypes/General information'},
      {title: 'Сведения для ЕГИССО', url: '#!table/localMSZ/Info For Egisso'},
      {title: 'НПА', url: '#!table/localNPA/All records'},
    ];

    return (
      <div>
        <h1>Услуги - Общие сведения</h1>
        <Navs steps={steps} tabs startAtStep="0"/>
      </div>
    );
  }

}

be5.registerAction('services', (documentName) =>{
  changeDocument(documentName, { component: Services, value: {} })
});
