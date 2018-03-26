import { combineReducers } from 'redux'
import user from './userReduser'
import menu from './menuReduser'


export default combineReducers({
  user,
  menu
})
