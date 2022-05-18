import axios from 'axios'
import React, { useState } from 'react'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogIn = (e) => {
    e.preventDefault()

    const showError = document.querySelector('.error')

    showError.innerHTML = ''

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/user/login`,
      withCredentials: true,
      data: {
        email,
        password
      },
    })
      .then((user) => {
        console.log(user)
        // Que faire avec le token auth
        window.location = '/trending'
      })
      .catch((err) => {
        // console.log(err)
        showError.innerHTML = err.response.data.error
      })

  }

  return (
    <form onSubmit={handleLogIn}>
      <label htmlFor="email">Email</label>
      <br />
      <input type="email" name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
      <br />
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input type="password" name='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} />
      <br />
      <br />
      <div className="error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  )
}
