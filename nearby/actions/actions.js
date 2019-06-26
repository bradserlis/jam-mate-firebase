import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';

import ActionTypes from './actionTypes';

export const setAllUsers = createAction(ActionTypes.SET_ALL_USERS);

// export const getNearbyUsersFromJson = json => dispatch => {
//   dispatch(getNearbyUsers(json));
// };

// export const getNearbyUsersFromJson = (users) => {
//   return {
//     type: getNearbyUsers,
//     payload: users
//   }
// }
