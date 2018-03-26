import * as types from '../constants/userConstants';

const initialState = {
  "availableRoles":["DefaultGuest"],
  "loggedIn":false,
  "currentRoles":["DefaultGuest"],
  "userName":"Guest"
};

export default function users(state = initialState, action)
{
  switch (action.type) {
    case types.UPDATE_USER_INFO:
      return action.user;
    case types.SELECT_ROLES:
      return Object.assign({}, state, {currentRoles: action.currentRoles});
    default:
      return state
  }
}