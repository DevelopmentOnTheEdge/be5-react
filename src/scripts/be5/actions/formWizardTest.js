import be5            from '../be5';
import React          from 'react';
import changeDocument from '../core/changeDocument';
import FormWizardTest from '../pages/formWizardTest';

export default function(documentName, startAtStep) {

  //be5.net.request('pool', {}, () => {
  //  changeDocument({ component: FormWizardTest, value: {} })
  //});
  changeDocument(documentName, { component: FormWizardTest, value: {startAtStep} })

};
