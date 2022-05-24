import axios from 'axios';

// posts
export const GET_POSTS = 'GET_POSTS';
export const GET_COMMENTS = 'GET_COMMENTS';
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

export const getComments = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/api/post/comment/:id`)
      .then((res) => {
        dispatch({ type: GET_COMMENTS, payload: res.data });
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

// export const likePost = (postId, userId) => {
//   return (dispatch) => {
//     return axios({
//       method: 'patch',
//       url:(`${process.env.REACT_APP_API_URL}/api/post/like-post/` + postId),
//       withCredentials: true,
//       data:{
//         userId : userId
//       }
//     })
//     .then((res) => {
//       dispatch({type: LIKE_POST, payload: {postId, userId}})
//     })
//     .catch(err => console.log(err))
//   }
// }