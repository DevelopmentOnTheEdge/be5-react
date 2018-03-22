import ReactDOM         from 'react-dom';
import React            from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import { Provider }     from 'react-redux'
import thunkMiddleware  from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { AppContainer } from 'react-hot-loader'
import App              from './components/Application';
import rootReducer      from './store/reducers'
import be5init          from './be5init';
import './be5styles';

const logger = createLogger();

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    logger
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, {}, enhancer);

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

be5init.init(store);

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Application', () => {
    render(App)
  })
}