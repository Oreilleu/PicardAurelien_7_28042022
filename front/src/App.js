import React, { useEffect, useState } from 'react';
import Router from './component/Routes';
import { UidContext } from './component/Appcontext';
import axios from 'axios';

export default function App() {
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/api/user/register`
    })
  })

  return (
    <UidContext.Provider value={userId}>
      <Router />
    </UidContext.Provider>
  );
}
