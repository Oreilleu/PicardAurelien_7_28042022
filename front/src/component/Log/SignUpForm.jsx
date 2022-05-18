import React, { useState } from 'react'
import axios from 'axios'

export default function SignUpForm() {
  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // console.log(pseudo, email, password)



  const handleRegister = (e) => {
    e.preventDefault()
    const showMessage = document.querySelector('.error')

    showMessage.innerHTML = ''

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/user/register`,
      withCredentials: true,
      data: {
        pseudo,
        email,
        password
      },
    })
      .then((res) => {
        // console.log(res.data.message)
        showMessage.innerHTML = res.data.message
      })
      .catch(err => {
        if (err.response.status === 400) {
          // console.log(err)
          // console.log(err.response.data.message)
          showMessage.innerHTML = err.response.data.message
        }
      })
  }

  return (
    <form onSubmit={handleRegister}>
      <label htmlFor="pseudo">Pseudo</label>
      <br />
      <input type="text" name='pseudo' id='pseudo' onChange={(e) => setPseudo(e.target.value)} value={pseudo} />
      <br />
      <br />
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
      <input type="submit" value="Valider inscription" />
    </form>
  )
}
