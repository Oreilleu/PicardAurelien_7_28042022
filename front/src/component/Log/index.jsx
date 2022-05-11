import React, { useState } from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

export default function Log() {
  const [signUpModal, setSignUpModal] = useState(true);
  const [signInModal, setSignInModal] = useState(false);

  const handleModals = (e) => {
    if(e.target.id === 'register') {
      setSignInModal(false)
      setSignUpModal(true)
    } else if (e.target.id === 'login') {
      setSignInModal(true)
      setSignUpModal(false)
    }
   }

  return (
    <div className="connection-form">
      <div className="from-container">
        <ul>
          <li onClick={handleModals} id='register'>S'inscrire</li>
          <li onClick={handleModals} id='login'>Se connecter</li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  )
}
