import * as types from '../constants/user.constants';

const initialState = {
  "availableRoles":["FrontendInit"],
  "currentRoles":["FrontendInit"],
  "loggedIn":false,
  "userName":"Guest",
  "getCreationTime": "0",
  "defaultRoute": undefined
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