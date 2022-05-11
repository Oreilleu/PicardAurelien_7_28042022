import React, { useState } from 'react'
import axios from 'axios'

export default function SignUpForm() {
  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // console.log(pseudo, email, password)

  const handleRegister = (e) => {
    e.preventDefault()
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/user/register`,
      // withCredentials: true,
      data: {
        pseudo,
        email,
        password,
      },
    })
      .then((result) => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <form onSubmit={handleRegister}>
      <label htmlFor="pseudo">Pseudo</label>
      <br />
      <input type="text" name='pseudo' id='pseudo' onChange={(e) => setPseudo(e.target.value)} value={pseudo} />
      <div className="pseudo error"></div>
      <br />
      <label htmlFor="email">Email</label>
      <br />
      <input type="email" name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input type="password" name='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Valider inscription" />
    </form>
  )
}
