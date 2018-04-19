import {updateUserInfo, toggleRoles}  from '../../../../src/scripts/be5/store/actions/user.actions'
import {getUser, getCurrentRoles}  from '../../../../src/scripts/be5/store/selectors/user.selectors'
import be5 from '../../../../src/scripts/be5/be5';
import {getTestStore} from "../testUtils";


test('test updateUserInfo', () => {
  const newUserState = {"availableRoles":["Administrator", "Manager"],"currentRoles":["Manager"],"loggedIn": true, "userName": "Administrator"};

  be5.net.request = function (path, attr, callback) {
    callback(newUserState)
  };

  const store = getTestStore();

  expect(getUser(store.getState()))
    .toEqual({"availableRoles": ["DefaultGuest"], "currentRoles": ["DefaultGuest"], "loggedIn": false, "userName": "Guest"});

  store.dispatch(updateUserInfo());

  expect(getUser(store.getState()))
    .toEqual(newUserState);
});

test('test toggleRoles', () => {
  const store = getTestStore();
  be5.net.request = function (path, attr, callback) {
    callback(["Administrator", "Manager"])
  };

  expect(getCurrentRoles(store.getState()))
    .toEqual(["DefaultGuest"]);

  store.dispatch(toggleRoles('Administrator,Manager'));

  expect(getCurrentRoles(store.getState()))
    .toEqual(["Administrator", "Manager"]);

});