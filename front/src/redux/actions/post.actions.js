import axios from 'axios';

// posts
export const GET_POSTS = 'GET_POSTS';
export const GET_LIKE = 'GET_LIKE';
export const LIKE_POST = 'LIKE_POST'
export const UNLIKE_POST = 'UNLIKE_POST'

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

export const getLike = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/api/post/like/:id`)
      .then((res) => {
        dispatch({ type: GET_LIKE, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

