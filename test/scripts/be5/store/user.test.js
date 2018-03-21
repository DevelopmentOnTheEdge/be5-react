import { createStore, applyMiddleware }  from 'redux'
import rootReducer      from '../../../../src/scripts/be5/store/reducers'
import {userSelectors}  from '../../../../src/scripts/be5/store/selectors'


test('test', () => {
  const store = createStore(rootReducer);

  expect(userSelectors.getUserRoles(store.getState()))
    .toEqual({"availableRoles": ["Guest"], "selectedRoles": ["Guest"]})
});
