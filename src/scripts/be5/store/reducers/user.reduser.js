import { userConstants } from '../constants/index';

const initialState = {
  "availableRoles":["Guest"],
  "loggedIn":false,
  "currentRoles":["Guest"],
  "userName":"Guest"
};

export default function users(state = initialState, action)
{
  switch (action.type) {
    case userConstants.UPDATE_USER_INFO:
      return action.user;
    case userConstants.SELECT_ROLES:
      return Object.assign({}, state, {currentRoles: action.currentRoles});
    default:
      return state
  }
}
