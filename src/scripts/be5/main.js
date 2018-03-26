import ReactDOM         from 'react-dom';
import React            from 'react';
import { Provider }     from 'react-redux';
import App              from './components/Application';
import createBaseStore  from './store'
import rootReducer      from './store/reducers'
import be5init          from './be5init';
import './be5styles';


const store = createBaseStore(rootReducer);
be5init.init(store);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);