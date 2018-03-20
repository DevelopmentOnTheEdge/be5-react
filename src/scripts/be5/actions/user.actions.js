import be5 from "../be5";
import { userConstants } from '../constants';
import bus from "../core/bus";


export const userActions = {
  updateUserInfo,
  toggleRoles: toggleRoles
};

function updateUserInfo() {
  return dispatch => {
    be5.net.request('userInfo', {}, data => {
      dispatch({type: userConstants.UPDATE_USER_INFO, user: data});
    });
  };
}

// function logout() {
//   userService.logout();
//   return { type: userConstants.LOGOUT };
// }

function toggleRoles(roles) {
  //return { type: userConstants.TOGGLE_ROLE, roles };
  return dispatch => {
    be5.net.request('userInfo/selectRoles', { roles: roles }, data => {
      dispatch({type: userConstants.SELECT_ROLES, selectedRoles: data});
      bus.fire('RefreshAll');
    });
  }
}