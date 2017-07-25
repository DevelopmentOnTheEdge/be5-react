import React, { Component } from 'react';
import StaticPage from './staticPage';
import FormWizard from './formWizard'

export default class FormWizardTest extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
//    const steps =
//    [
//      {name: 'Step1', component: <StaticPage value="page 1" />},
//      {name: 'Step1', component: <StaticPage value="page 2" />}
//    ]
    //{name: 'Step6', component: <Step6 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />}

    return (
      <div className='formWizardTest'>
        <FormWizard>
          <StaticPage value="page 1" />
          <StaticPage value="page 2" />
        </FormWizard>
      </div>
    )
  }
}
