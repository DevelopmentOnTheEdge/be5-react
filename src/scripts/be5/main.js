import ReactDOM from 'react-dom';
import React from 'react';
import App            from './components/application';

import 'react-datetime/css/react-datetime.css';
import 'react-select/dist/react-select.css';
import '../../sass/styles.scss'

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
