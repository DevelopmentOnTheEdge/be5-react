import ReactDOM         from 'react-dom';
import React            from 'react';
import App              from './components/Application';
import { AppContainer } from 'react-hot-loader'
import './be5init';
import './be5styles';

// ReactDOM.render(
//   <App/>,
//   document.getElementById('app')
// );

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app'),
  )
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Application', () => {
    render(App)
  })
}