import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { UidContext } from '../Appcontext'
import { useSelector } from 'react-redux'
import cookie from 'js-cookie'
import { isEmpty } from '../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

// import { useSelector } from 'react-redux'

export default function Profil({ setIsProfil }) {
    const userData = useSelector((state) => state.userReducer)
    const userId = useContext(UidContext)

    const [pseudo, setPseudo] = useState(userData.pseudo)
    const [file, setFile] = useState()

    const handleFileReader = () => {
        const input = document.querySelector('input[type="file"')
        const img = document.querySelector('.receiverImg')
        const reader = new FileReader()
        reader.onload = function () {
            img.src = reader.result
            img.alt = 'photo profil'
            document.querySelector('.img-container').appendChild(img)
        }
        reader.readAsDataURL(input.files[0])
    }

    const handleSubmit = (e) => {
        const data = new FormData()
        data.append('pseudo', pseudo)
        data.append('file', file)

        axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
            withCredentials: true,
            data
        })
            .then((res) => console.log(res))
            .then((err) => console.log(err))

    }

    const handleDelete = () => {
        axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
            withCredentials: true,
        })
            .then((res) => {
                cookie.remove('jwt', { expires: 1 })
                window.location = '/'
            })
            .catch((err) => console.log(err))

    }

    const handleCross = () => {
        setIsProfil(false)
    }

    // Voir avec Yaiz dpour le cadre visible de l'image
    // File ne passe pas dans le back malgrés multer et form data

    // Faire un component delete car 2 submit donc fait une requete put pour delete
    return (
        <div className='profil-container'>
            <FontAwesomeIcon icon={faXmark} className='icon-cross' onClick={handleCross} />
            <div className="img-container">
                <img src={userData.picture} alt="" className='receiverImg' />
            </div>
            <form action="" onSubmit={handleSubmit} >
                <input type="file" onChange={(e) => {
                    handleFileReader()
                    setFile(e.target.files[0])
                }} />
                <br />
                <label htmlFor="pseudo">Pseudo</label>
                <input type="text" name='pseudo' id='pseudo' placeholder={userData.pseudo} onChange={(e) => setPseudo(e.target.value)} />
                <br />
                <input type="submit" value='Enregistrer changement' className='submitBtn' />
                <br />
            </form>
            <button className='submitBtnDelete' onClick={handleDelete} >Supprimer compte</button>

        </div >
    )
}
