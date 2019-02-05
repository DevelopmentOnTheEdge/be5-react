import * as types from '../constants/user.constants';


export default function changeHash(state = '', action) {
  if (action.type === 'CHANGE_HASH')
    return action.hash;

  return state;
}
