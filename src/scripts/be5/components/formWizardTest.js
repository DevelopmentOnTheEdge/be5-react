import React, { Component } from 'react';
import FormWizard from './formWizard'

export default class FormWizardTest extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const steps = [
      {name: 'Организация', url: '#!form/testtable/Test%201D/Insert'},
      {name: 'Документы', url: '#!form/testtable/Test%201D/TestOperation'},
      {name: 'Категории граждан', url: '#!table/testtable/Test 1D'},
      {name: 'Услуги', url: '#!static/welcome.be'},
    ];

    return (
      <div className='formWizardTest'>
        <FormWizard steps={steps} />
      </div>
    )
  }
}
