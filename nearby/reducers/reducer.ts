import { handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

import ActionTypes from '../actions/actionTypes';
import { setAllUsers } from '../actions/actions';

export interface INearbyState {
  allUsers: any;
}

export default handleActions(
  {
    [ActionTypes.SET_ALL_USERS]: (
      state: INearbyState,
      action
    ): INearbyState => {
      let allUsers = List(action.payload);
      return {
        ...state,
        allUsers
      };
    }
  },
  {
    allUsers: null
  }
);
