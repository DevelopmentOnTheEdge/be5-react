import ReactDOM         from 'react-dom';
import React            from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import { Provider }     from 'react-redux'
import { createLogger } from 'redux-logger'
import { AppContainer } from 'react-hot-loader'
import App              from './components/Application';
import rootReducer      from './reducers'
import be5init          from './be5init';
import './be5styles';

const logger = createLogger();
const initialState = {};

/**
 * This variable is "true" if the application
 * is running in production.
 */
const isProduction = process.env.NODE_ENV === 'production';

let store;

if (isProduction) {
  store = createStore(rootReducer, initialState);
}
else {
  /**
   * Only use the DevTools component
   * when in development.
   */
  const enhancer = compose(
    applyMiddleware(logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  store = createStore(rootReducer, initialState, enhancer);
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <div>
          <App />
        </div>
      </Provider>
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