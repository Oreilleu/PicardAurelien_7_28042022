import axios from 'axios';

// posts
export const GET_POSTS = 'GET_POSTS';
export const GET_COMMENTS = 'GET_COMMENTS';

export const getPost = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/api/post`)
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const getComments = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/api/post/comment-post`)
      .then(res => {
        dispatch({ type: GET_POSTS, payload: res.data })
      })
      .catch(err => console.log(err))
  }
}