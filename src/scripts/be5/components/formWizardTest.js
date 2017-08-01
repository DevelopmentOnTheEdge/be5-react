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
      {name: 'Организация', url: '#!form/testtable/Test%201D/Insert'},
      {name: 'Документы', url: '#!form/testtable/Test%201D/TestOperation'},
      {name: 'Категории граждан', url: '#!table/testtable/Test 1D'},
      {name: 'Категории граждан', url: '#!static/welcome.be'},
    ];

    return (
      <div className='formWizardTest'>
        <FormWizard steps={steps} />
      </div>
    )
  }
}
