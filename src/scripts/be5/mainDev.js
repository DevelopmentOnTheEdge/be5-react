import ReactDOM         from 'react-dom';
import React            from 'react';
import App              from './components/Application';
import { AppContainer } from 'react-hot-loader'
import be5init from './be5init';
import './be5styles';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app'),
  )
};

render(App);
be5init.init();

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Application', () => {
    render(App)
  })
}