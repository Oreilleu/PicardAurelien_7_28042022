import React, { useContext } from 'react'
import Log from '../component/Log'
import { UidContext } from '../component/Appcontext'

export default function Profil() {
  const uid = useContext(UidContext)

  return (
    <div className="profil-page">
      {uid ? (
        <h1>update page</h1>
      ) : (
        <div className="log-container">
        <Log />
          <div className="img-container">
            <img src="./img/icon-above-font.png" alt="icon groupomania" />
          </div>
        </div>
      )}
    </div>
  )
}
