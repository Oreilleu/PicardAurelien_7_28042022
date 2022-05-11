import React from 'react'
import Log from '../component/Log'

export default function Profil() {
  return (
    <div className="profil-page">
      <div className="log-container">
      <Log />
        <div className="img-container">
          <img src="./img/icon-above-font.png" alt="icon groupomania" />
        </div>
      </div>
    </div>
  )
}
