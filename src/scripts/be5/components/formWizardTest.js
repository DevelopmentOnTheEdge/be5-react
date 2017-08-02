import React, { Component } from 'react';
import FormWizard from './formWizard'

export default class FormWizardTest extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const steps = [
      {name: 'Организация', url: '#!form/_test_/Test%201D/GeneralRequirements'},
      {name: 'Документы', url: '#!form/_test_/Test%201D/NameNewDocument'},
      {name: 'Категории граждан', url: '#!form/_test_/Test%201D/DocumentBaseOperation'},
      {name: 'Услуги', url: '#!static/welcome.be'},
    ];

    return (
      <div className='formWizardTest'>
        <FormWizard steps={steps} />
      </div>
    )
  }
}
