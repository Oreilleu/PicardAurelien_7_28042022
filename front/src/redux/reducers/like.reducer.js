import { GET_LIKE } from '../actions/like.actions';

const initialeState = {};

export default function likeReducer(state = initialeState, action) {
  switch (action.type) {
    case GET_LIKE:
      return action.payload;
    default:
      return state;
  }
}
