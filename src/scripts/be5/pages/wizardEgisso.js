import React          from 'react';
import be5            from '../be5';
import changeDocument from '../core/changeDocument';
import FormWizard     from '../components/formWizard'


class WizardEgisso extends React.Component
{
  render() {

    const steps = [
      {title: be5.messages.companies__Tab, url: '#!companies'},
      {title: be5.messages.egissoDocs__Tab, url: '#!egissoDocs'},
      {title: be5.messages.categories__Tab, url: '#!categories'},
      {title: be5.messages.services__Tab, url: '#!services'},
    ];

    return (
      <div className='formWizardTest'>
        <FormWizard steps={steps} startAtStep={this.props.value.startAtStep}
          backButtonText={be5.messages.backButtonText}
          nextButtonText={be5.messages.nextButtonText}
        />
      </div>
    )
  }
}

be5.registerAction('wizardEgisso', (documentName) =>{
  changeDocument(documentName, { component: WizardEgisso, value: {} })
});
