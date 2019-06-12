import { combineReducers, Reducer } from 'redux';
import nearby from './nearby/reducers/reducer'

const appReducer = combineReducers({
  nearby
});


export default rootReducer = (state, action) => {
  return appReducer(state, action);
};

