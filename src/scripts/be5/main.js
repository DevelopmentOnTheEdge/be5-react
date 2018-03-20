import ReactDOM         from 'react-dom';
import React            from 'react';
import { createStore, applyMiddleware }  from 'redux'
import thunkMiddleware  from 'redux-thunk';
import { Provider }     from 'react-redux'
import App              from './components/Application';
import rootReducer      from './reducers'
import be5init          from './be5init';
import './be5styles';


const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);
be5init.init();