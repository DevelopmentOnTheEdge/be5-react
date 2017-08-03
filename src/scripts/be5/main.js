import ReactDOM         from 'react-dom';
import React            from 'react';
import App              from './components/application';

import 'react-datetime/css/react-datetime.css';
import 'react-select/dist/react-select.css';
import '../../sass/styles.scss'
import '../../css/formWizard.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import "beanexplorer-react/src/propertySet.css";

//todo move to egisso-be5 frontend
import EgissoDocsForm from './forms/egissoDocsForm';

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
