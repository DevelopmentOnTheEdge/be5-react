import React            from 'react';
import { Provider }     from 'react-redux';
import { createStore, applyMiddleware }  from 'redux'
import thunkMiddleware  from 'redux-thunk';
import rootReducer      from '../../../src/scripts/be5/store/reducers'


export default {
  getStore
}

function getStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
  );
}

export const TestProvider = ({ children }) => {
  return (
    <Provider store={getStore()}>
      {children}
    </Provider>
  );
};
