import * as types from '../constants/menu.constants';

const initialState = {
  root: [ { title: 'Loading...' } ]
};

export default function users(state = initialState, action)
{
  switch (action.type) {
    case types.UPDATE_MENU:
      return action.data;
    default:
      return state
  }
}
