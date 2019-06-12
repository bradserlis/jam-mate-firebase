import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';

import ActionTypes from './actionTypes';

const getNearbyUsers = createAction(
  ActionTypes.SET_MATCH_GROUP
);

export const getNearbyUsersFromJson = (users) => {
  return {
    type: getNearbyUsers,
    payload: users
  }
}

const actionCreators = {
  getNearbyUsersFromJson
}

export { actionCreators };
