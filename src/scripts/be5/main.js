import ReactDOM         from 'react-dom';
import React            from 'react';
import { createStore }  from 'redux'
import { Provider }     from 'react-redux'
import App              from './components/Application';
import rootReducer      from './reducers'
import be5init          from './be5init';
import './be5styles';


const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);
be5init.init();