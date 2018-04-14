import ReactDOM         from 'react-dom';
import React            from 'react';
import { Provider }     from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import App              from './components/test/ApplicationWithBe5Menu';
import rootReducer      from './store/reducers'
import createBaseStore  from './store'
import be5init          from './be5init';
import './be5styles';

const store = createBaseStore(rootReducer);
be5init.init(store);

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
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