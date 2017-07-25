import be5            from '../be5';
import React          from 'react';
import changeDocument from '../core/changeDocument';
import FormWizardTest from '../components/formWizardTest';

export default function() {

  //be5.net.request('pool', {}, () => {
  //  changeDocument({ component: FormWizardTest, value: {} })
  //});
  changeDocument({ component: FormWizardTest, value: {} })

};
