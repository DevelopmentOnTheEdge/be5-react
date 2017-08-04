import React, { Component } from 'react';
import FormWizard from './formWizard'

export default class FormWizardTest extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const steps = [
      {title: 'Организация<br/><small>Общие сведения</small>', url: '#!companies'},
      {title: 'Организация<br/><small>Адреса</small>', url: '#!addresses'},
      {title: 'Организация<br/><small>Документ-основание</small>', url: '#!form/_test_/Test%201D/DocumentBaseOperation'},

      {title: 'Документы<br/>&nbsp;', url: '#!egissoDocs'},

      {title: 'Категории граждан<br/><small>Перечень категорий</small>', url: '#!form/_test_/Test%201D/CategoryList'},
      {title: 'Категории граждан<br/><small>Правила присвоения категорий</small>', url: '#!static/welcome.be'},

      {title: 'Услуги<br/><small>Общие сведения</small>', url: '#!servicesGeneralInformation'},
      {title: 'Услуги<br/><small>Правила приема документов</small>', url: '#!static/welcome.be'},
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
