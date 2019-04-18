import be5 from "../../be5";
import * as types from '../constants/user.constants';


export const fetchUserInfo = () => {
  return dispatch => {
    be5.net.request('userInfo', {}, data => {
      dispatch({type: types.UPDATE_USER_INFO, user: data});
    });
  };
};

export const updateUserInfo = (data) => {
  return {type: types.UPDATE_USER_INFO, user: data};
};

// function logout() {
//   userService.logout();
//   return { type: userConstants.LOGOUT };
// }

export const toggleRoles = (roles) => {
  return dispatch => {
    be5.net.request('userInfo/selectRoles', {roles: roles}, data => {
      dispatch({type: types.UPDATE_USER_INFO, user: data});
    });
  }
};
