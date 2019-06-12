import GET_USERS from '../actions/actionTypes';

const initialState = {
  users: null
}

export default handleActions = (state = initialState, action) => {
  switch(action.type){
    case getNearbyUsers:
      let usersList = action.payload
      return{
        ...state,
        usersArray: usersList
      };
    default:
      return state
  } 
}
