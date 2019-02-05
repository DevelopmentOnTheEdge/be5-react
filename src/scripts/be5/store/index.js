import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';


const isProduction = process.env.NODE_ENV === 'production';

const middleware = [thunkMiddleware];
if (!isProduction) {
  middleware.push(createLogger());
}

const enhancer = compose(
  applyMiddleware(...middleware),
  (!isProduction && window.devToolsExtension) ? window.devToolsExtension() : f => f
);

const createBaseStore = (rootReducer) => createStore(rootReducer, {}, enhancer);

export default createBaseStore;
