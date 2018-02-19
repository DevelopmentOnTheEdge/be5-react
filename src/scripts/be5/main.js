import ReactDOM         from 'react-dom';
import React            from 'react';
import App              from './components/Application';
import be5init from './be5init';
import './be5styles';


ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
be5init.init();