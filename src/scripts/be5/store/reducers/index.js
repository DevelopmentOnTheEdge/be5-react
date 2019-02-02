import { combineReducers } from 'redux'
import user from './user.reduser'
import menu from './menu.reduser'
import hashUrl from './url.reduser'


export default combineReducers({
  user,
  menu,
  hashUrl,
})
