import { createStore, applyMiddleware }  from 'redux'
import rootReducer      from '../../../../src/scripts/be5/store/reducers'
import {userSelectors}  from '../../../../src/scripts/be5/store/selectors'


test('test', () => {
  const store = createStore(rootReducer);

  expect(userSelectors.getUser(store.getState()))
    .toEqual({"user": {"availableRoles": ["Guest"], "currentRoles": ["Guest"], "loggedIn": false, "userName": "Guest"}});

  expect(userSelectors.getCurrentRoles(store.getState()))
    .toEqual({"currentRoles": ["Guest"]})
});
