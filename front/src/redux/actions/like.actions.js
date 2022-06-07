import axios from 'axios';

export const GET_LIKE = 'GET_LIKE';

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