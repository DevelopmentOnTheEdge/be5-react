import { userConstants } from '../constants';

export default function users(state = {}, action)
{
  switch (action.type) {
    case userConstants.UPDATE_USER_INFO:
      return action.user;
    case userConstants.SELECT_ROLES:
      return Object.assign({}, state, {selectedRoles: action.selectedRoles});
    default:
      return state
  }
}
