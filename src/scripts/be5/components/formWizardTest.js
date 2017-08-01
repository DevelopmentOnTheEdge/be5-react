import React, { Component } from 'react';
import StaticPage from './staticPage';
import FormWizard from './formWizard'
import Forms          from '../services/forms';

export default class FormWizardTest extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

//    const params = {
//      entity: entity,
//      query: query || 'All records',
//      operation: operation,
//      values: be5.net.paramString(operationParams),
//      selectedRows: selectedRows
//    };
//    Forms.load(params, performOperationResult)

    const steps = [
      //{name: 'Организация', component: <Form value={data.value}/>},
      {name: 'Документы', component: 'static/welcome.be'},
//      {name: 'Категории граждан', component: <StaticPage value="page 3" />},
//      {name: 'Услуги', component: <StaticPage value="page 4" />}
    ]

    return (
      <div className='formWizardTest'>
        <FormWizard steps={steps} />
      </div>
    )
  }
}
