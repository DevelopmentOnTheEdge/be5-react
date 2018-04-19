import React            from 'react';
import { Provider }     from 'react-redux';
import rootReducer      from '../../../src/scripts/be5/store/reducers'
import createBaseStore  from '../../../src/scripts/be5/store'


export const getTestUser = () => {
  return {
    "availableRoles": ["Administrator", "Manager"],
    "currentRoles": ["Manager"],
    "loggedIn": true,
    "userName": "Administrator"
  };
};

export const getTestStore = () => {
  return createBaseStore(rootReducer);
};

export const TestProvider = ({ children }) => {
  return (
    <Provider store={getTestStore()}>
      {children}
    </Provider>
  );
};
