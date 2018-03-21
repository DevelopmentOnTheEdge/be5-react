import {userActions}  from '../../../../src/scripts/be5/store/actions'
import {userSelectors}  from '../../../../src/scripts/be5/store/selectors'
import be5 from '../../../../src/scripts/be5/be5';
import testUtils from "../testUtils";


test('test updateUserInfo', () => {
  const newUserState = {"availableRoles":["Administrator", "Manager"],"currentRoles":["Manager"],"loggedIn": true, "userName": "Administrator"};

  be5.net.request = function (path, attr, callback) {
    callback(newUserState)
  };

  const store = testUtils.getStore();

  expect(userSelectors.getUser(store.getState()))
    .toEqual({"user": {"availableRoles": ["Guest"], "currentRoles": ["Guest"], "loggedIn": false, "userName": "Guest"}});

  store.dispatch(userActions.updateUserInfo());

  expect(userSelectors.getUser(store.getState()))
    .toEqual({"user": newUserState});
});

test('test toggleRoles', () => {
  const store = testUtils.getStore();
  be5.net.request = function (path, attr, callback) {
    callback(["Administrator", "Manager"])
  };

  expect(userSelectors.getCurrentRoles(store.getState()))
    .toEqual({"currentRoles": ["Guest"]});

  store.dispatch(userActions.toggleRoles('Administrator,Manager'));

  expect(userSelectors.getCurrentRoles(store.getState()))
    .toEqual({"currentRoles": ["Administrator", "Manager"]});

});