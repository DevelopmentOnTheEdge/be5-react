import React            from 'react';
import { Provider }     from 'react-redux';
import rootReducer      from '../../../src/scripts/be5/store/reducers'
import createBaseStore  from '../../../src/scripts/be5/store'


export default {
  getStore: getStore
}

function getStore() {
  return createBaseStore(rootReducer);
}

export const TestProvider = ({ children }) => {
  return (
    <Provider store={getStore()}>
      {children}
    </Provider>
  );
};
