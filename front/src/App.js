import React, { useEffect, useState } from 'react';
import Router from './component/Routes';
import { UidContext } from './component/Appcontext';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/actions/user.actions';

export default function App() {
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();

  // Dépendance pour pas relancer la requête à la l'infini
  useEffect(() => {
    const fetchJwt = () => {
      axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUserId(res.data);
        })
        .catch(() => console.log('No token'));
    };
    fetchJwt();

    if (userId) dispatch(getUser(userId))
  }, [userId]);

  return (
    <UidContext.Provider value={userId}>
      <Router />
    </UidContext.Provider>
  );
}
