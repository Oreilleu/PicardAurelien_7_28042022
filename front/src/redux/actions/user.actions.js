import axios from 'axios';

// action qui modifie le state dans le reducer
export const GET_USER = 'GET_USER';

// dispatch : envoi au reducer
// payload : data a renvoyer
export const getUser = (userId) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/${userId}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};