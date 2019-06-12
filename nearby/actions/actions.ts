import { createAction } from "redux-actions";
import { Dispatch } from "redux";

import ActionTypes from "./actionTypes";

const getNearbyUsers = createAction(ActionTypes.GET_USERS);

export const getNearbyUsersFromJson = json => dispatch => {
  dispatch(getNearbyUsers(json));
};

// export const getNearbyUsersFromJson = (users) => {
//   return {
//     type: getNearbyUsers,
//     payload: users
//   }
// }

const actionCreators = {
  getNearbyUsersFromJson
};
