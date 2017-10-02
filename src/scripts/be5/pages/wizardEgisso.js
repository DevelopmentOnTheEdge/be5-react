import React          from 'react';
import be5            from '../be5';
import changeDocument from '../core/changeDocument';
import FormWizard     from '../components/formWizard'


class WizardEgisso extends React.Component {

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

be5.registerAction('wizardEgisso', (documentName) =>{
  changeDocument(documentName, { component: WizardEgisso, value: {} })
});
