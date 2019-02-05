import * as types from '../constants/menu.constants';


export default function users(state = null, action) {
  switch (action.type) {
    case types.UPDATE_MENU:
      return action.data;
    default:
      return state
  }
}
