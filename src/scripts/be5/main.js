import ReactDOM         from 'react-dom';
import React            from 'react';
import { createStore, applyMiddleware }  from 'redux'
import thunkMiddleware  from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider }     from 'react-redux';
import App              from './components/Application';
import rootReducer      from './store/reducers'
import be5init          from './be5init';
import './be5styles';

const isProduction = process.env.NODE_ENV === 'production';

const middleware = [ thunkMiddleware ];
if (!isProduction) {
  middleware.push(createLogger());
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

be5init.init();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);