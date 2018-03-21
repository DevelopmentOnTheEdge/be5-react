import { createStore, applyMiddleware }  from 'redux'
import thunkMiddleware  from 'redux-thunk';
import rootReducer      from '../../../src/scripts/be5/store/reducers'

export default {
  getStore
}

function getStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
  );

}
