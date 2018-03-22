import * as types from '../../../../../src/scripts/be5/store/constants/user.constants';
import user from '../../../../../src/scripts/be5/store/reducers/user.reduser'


describe('user reducer', () => {
  it('should handle initial state', () => {
    expect(
      user(undefined, {})
    ).toEqual({
      "availableRoles":["DefaultGuest"],
      "loggedIn":false,
      "currentRoles":["DefaultGuest"],
      "userName":"Guest"
    })
  });

  it('UPDATE_USER_INFO', () => {
    expect(
      user({}, {
        type: types.UPDATE_USER_INFO,
        user: {
          "availableRoles":["Administrator","SystemDeveloper"],
          "loggedIn":true,
          "currentRoles":["Administrator","SystemDeveloper"],
          "userName":"Administrator"
        }
      })
    ).toEqual({
      "availableRoles":["Administrator","SystemDeveloper"],
      "loggedIn":true,
      "currentRoles":["Administrator","SystemDeveloper"],
      "userName":"Administrator"
    });
  });

  it('SELECT_ROLES', () => {
    expect(
      user({
        "availableRoles":["Administrator","SystemDeveloper"],
        "loggedIn":true,
        "currentRoles":["Administrator","SystemDeveloper"],
        "userName":"Administrator"
      }, {
        type: types.SELECT_ROLES,
        currentRoles: ["Administrator"]
      })
    ).toEqual({
      "availableRoles":["Administrator","SystemDeveloper"],
      "loggedIn":true,
      "currentRoles":["Administrator"],
      "userName":"Administrator"
    });
  });

});
