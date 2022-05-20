import React from 'react'
import axios from 'axios'
import cookie from 'js-cookie'

export default function Logout() {

  const removeCookies = (key) => {
    if (window !== 'undefined') {
      cookie.remove(key, { expires: 1 })
    }
  }

  const logout = () => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/api/user/logout`,
      withCredentials: true
    })
      .then(() => removeCookies('jwt'))
      .catch(err => console.log(err))

    window.location = '/'
  }

  return (
    <li onClick={logout} className='logout-account'>
      LOGOUT
    </li>
  )
}
