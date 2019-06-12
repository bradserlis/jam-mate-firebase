import { handleActions, Action } from "redux-actions";

import ActionTypes from "../actions/actionTypes";
import { getNearbyUsersFromJson } from "../actions/actions";

const initialState = {
  usersArray: null,
  GET_USERS: null
};

export interface INearbyState {}

export default handleActions<INearbyState, {}>(
  {
    [ActionTypes.GET_USERS]: (
      state: INearbyState,
      action: Action<Date>
    ): INearbyState => {
      let usersList = action.payload;
      return {
        ...state,
        usersArray: usersList
      };
    }
  },
  {
    nearbyUsers: null
  }
);
