import { userConstants } from '../../../../src/scripts/be5/constants';
import user from '../../../../src/scripts/be5/reducers/user.reduser'


describe('user reducer', () => {
  it('should handle initial state', () => {
    expect(
      user(undefined, {})
    ).toEqual({
      "availableRoles":["Guest"],
      "loggedIn":false,
      "selectedRoles":["Guest"],
      "userName":"Guest"
    })
  });

  it('UPDATE_USER_INFO', () => {
    expect(
      user({}, {
        type: userConstants.UPDATE_USER_INFO,
        user: {
          "availableRoles":["Administrator","SystemDeveloper"],
          "loggedIn":true,
          "selectedRoles":["Administrator","SystemDeveloper"],
          "userName":"Administrator"
        }
      })
    ).toEqual({
      "availableRoles":["Administrator","SystemDeveloper"],
      "loggedIn":true,
      "selectedRoles":["Administrator","SystemDeveloper"],
      "userName":"Administrator"
    });
  });

  it('SELECT_ROLES', () => {
    expect(
      user({
        "availableRoles":["Administrator","SystemDeveloper"],
        "loggedIn":true,
        "selectedRoles":["Administrator","SystemDeveloper"],
        "userName":"Administrator"
      }, {
        type: userConstants.SELECT_ROLES,
        selectedRoles: ["Administrator"]
      })
    ).toEqual({
      "availableRoles":["Administrator","SystemDeveloper"],
      "loggedIn":true,
      "selectedRoles":["Administrator"],
      "userName":"Administrator"
    });
  });

});
