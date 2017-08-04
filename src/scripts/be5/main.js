import ReactDOM         from 'react-dom';
import React            from 'react';
import App              from './components/application';

import 'react-datetime/css/react-datetime.css';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import "beanexplorer-react/src/propertySet.css";

import '../../css/form.css';

import '../../sass/styles.scss'
import '../../css/formWizard.css';
import '../../css/main.css';

//todo move to egisso-be5 frontend
import egissoDocsForm from './forms/egissoDocsForm';
import addresses from './forms/addresses';
import companies from './forms/companies';
import servicesGeneralInformation from './forms/servicesGeneralInformation';

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
