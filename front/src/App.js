import React, { useEffect, useState } from 'react';
import Router from './component/Routes';
import { UidContext } from './component/Appcontext';
import axios from 'axios';

export default function App() {
  const [userId, setUserId] = useState(null);

  // Dépendance pour pas relancer la requête à la l'infini
  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/jwtid`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        setUserId(res.data);
      })
      .catch((err) => console.log('No token'));
  }, [userId]);

  return (
    <UidContext.Provider value={userId}>
      <Router />
    </UidContext.Provider>
  );
}
