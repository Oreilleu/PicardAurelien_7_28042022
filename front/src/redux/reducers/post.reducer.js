import { GET_COMMENTS, GET_POSTS } from '../actions/post.actions';

const initialeState = {};

export default function postReducer(state = initialeState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case GET_COMMENTS:
      return action.payload;
    default:
      return state;
  }
}
