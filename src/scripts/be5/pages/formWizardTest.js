import React, { Component } from 'react';
import FormWizard from '../components/formWizard'

export default class FormWizardTest extends Component {

  render() {

    const steps = [
      {title: 'Организация<br/><small>&nbsp;</small>', url: '#!companies'},

      {title: 'Документы<br/><small>&nbsp;</small>', url: '#!egissoDocs'},

      {title: 'Категории граждан<br/><small>Перечень категорий</small>', url: '#!table/_localCategories_'},
      //{title: 'Категории граждан<br/><small>Правила присвоения категорий</small>', url: '#!static/welcome.be'},

      {title: 'Услуги<br/><small>Общие сведения</small>', url: '#!services'},
      //{title: 'Услуги<br/><small>Правила приема документов</small>', url: '#!static/welcome.be'},
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
