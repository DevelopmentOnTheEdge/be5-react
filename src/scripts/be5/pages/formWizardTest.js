import React, { Component } from 'react';
import FormWizard from '../components/formWizard'


export default class FormWizardTest extends Component {

  render() {

    const steps = [
      {title: 'Организация', url: '#!companies'},
      {title: 'Документы', url: '#!egissoDocs'},
      {title: 'Категории граждан', url: '#!categories'},
      {title: 'Услуги', url: '#!services'},
    ];

    return (
      <div className='formWizardTest'>
        <FormWizard steps={steps} startAtStep={this.props.value.startAtStep}
          backButtonText="Предыдущий шаг"
          nextButtonText="Следующий шаг"
        />
      </div>
    )
  }
}
