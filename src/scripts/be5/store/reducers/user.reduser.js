import * as types from '../constants/user.constants';

const initialState = {
  "availableRoles":["Guest"],
  "loggedIn":false,
  "currentRoles":["Guest"],
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