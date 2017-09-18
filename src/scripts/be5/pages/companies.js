import React          from 'react';
import PropTypes from 'prop-types';
import be5                  from '../be5';
import Document             from '../components/document';
import Navs             from '../components/navs';
import changeDocument from '../core/changeDocument';


class Companies extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    const steps = [
      {title: 'Общие сведения', url: '#!table/companies/Общие сведения'},
      {title: 'Адреса', url: '#!addresses'},
      {title: 'Документ-основание', url: '#!table/contractor/All records'},
    ];

    return (
      <div>
        <h1>Организация</h1>
        <Navs steps={steps} tabs startAtStep="0"/>
      </div>
    );
  }

}

be5.registerAction('companies', (documentName) =>{
  changeDocument(documentName, { component: Companies, value: {} })
});
