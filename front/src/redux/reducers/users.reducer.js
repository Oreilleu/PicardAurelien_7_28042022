import { GET_ALL_USERS } from '../actions/users.actions';

const initialState = {};

// Prend un premier paramêtre le state et en second l'action qui modifie le state
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.payload;
    default:
      return state;
  }
}
