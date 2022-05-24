import { GET_COMMENTS, GET_LIKE, GET_POSTS, LIKE_POST } from '../actions/post.actions';

const initialeState = {};

export default function postReducer(state = initialeState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case GET_COMMENTS:
      return action.payload;
    case GET_LIKE:
      return action.payload;
    // case LIKE_POST:
    //   return state.map((post) => {
    //     if()
    //   })
    default:
      return state;
  }
}
