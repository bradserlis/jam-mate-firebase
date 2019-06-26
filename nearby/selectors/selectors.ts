import { createSelector } from 'reselect';
import { List, Map, OrderedMap } from 'immutable';

export const allUsersSelector = state => state.nearby.allUsers;
// export const nearbyUsersSelector = state => state.nearbyUsers;
