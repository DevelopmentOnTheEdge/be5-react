import React, { Component } from 'react';
import StaticPage from './staticPage';
import FormWizard from './formWizard'

export default class FormWizardTest extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const steps =
    [
      {name: 'Организация', component: <StaticPage value="page 1" />},
      {name: 'Документы', component: <StaticPage value="page 2" />},
      {name: 'Категории граждан', component: <StaticPage value="page 3" />},
      {name: 'Услуги', component: <StaticPage value="page 4" />}
    ]

    return (
      <div className='formWizardTest'>
        <FormWizard steps={steps} />
      </div>
    )
  }
}
