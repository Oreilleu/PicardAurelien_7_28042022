import { GET_USER } from '../actions/user.actions';

const initialState = {};

// Prend un premier paramêtre le state et en second l'action qui modifie le state
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    default:
      return state;
  }
}
