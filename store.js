import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider, connect } from 'react-redux';

import rootReducer from './rootReducer';

let middlewares = [createLogger()];

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(...middlewares));
};

export default configureStore;
