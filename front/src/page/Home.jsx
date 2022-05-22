import React, { useContext } from 'react'
import Log from '../component/Log'
import { UidContext } from '../component/Appcontext'
import Profil from '../Profil'

export default function Home() {
  const uid = useContext(UidContext)

  return (
    <div className="profil-page">
      {uid ? (
        <Profil />
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
