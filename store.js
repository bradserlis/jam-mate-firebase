import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import rootReducer from './rootReducer';

const configureStore = () => {
  return createStore(
    rootReducer
    )
}

export default configureStore;
