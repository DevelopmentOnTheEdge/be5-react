import ReactDOM         from 'react-dom';
import React            from 'react';
import App              from './components/application';
import be5init          from './be5init';

import 'react-datetime/css/react-datetime.css';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import 'react-s-alert/dist/s-alert-default.css';

import '../../sass/styles.scss';
import '../../css/base.css';
import '../../css/document.css';
import '../../css/splitPane.css';
import '../../css/form.css';
import '../../css/table.css';
import '../../css/formWizard.css';
import '../../css/propertySet.css';
import '../../css/errorPane.css';
import '../../css/main.css';


ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
