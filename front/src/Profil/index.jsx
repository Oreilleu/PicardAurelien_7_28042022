import React, { useState, useContext } from 'react'
import axios from 'axios'
import { UidContext } from '../component/Appcontext'
import { useSelector } from 'react-redux'
import cookie from 'js-cookie'

// import { useSelector } from 'react-redux'

export default function Profil() {
    const [pseudo, setPseudo] = useState('')
    const [picture, setPicture] = useState()
    const userId = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)

    // console.log(pseudo, picture)

    const handleFileReader = (e) => {
        const input = document.querySelector('input[type="file"')
        const img = document.querySelector('.receiverImg')
        const reader = new FileReader()
        reader.onload = function () {
            img.src = reader.result
            img.alt = 'photo profil'
            document.querySelector('.img-container').appendChild(img)
        }
        reader.readAsDataURL(input.files[0])

        setPicture(e.target.value)
    }

    const handleSubmit = (e) => {
        // Lors de l'envoi je veux envoyer les données image + pseud
        // Sur route update user
        // Ajouter les pseudo en placeholder et image de base du serveur

        e.preventDefault()

        // const data = new FormData()
        // data.append('pseudo', pseudo)
        // data.append('file', picture)

        axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
            withCredentials: true,
            data: {
                pseudo,
                picture
            },
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

    // Voir avec Yaiz dpour le cadre visible de l'image
    // File ne passe pas dans le back malgrés multer et form data

    // Faire un component delete car 2 submit donc fait une requete put pour delete
    return (
        <div className='profil-container'>
            <div className="img-container">
                <img src="" alt="" className='receiverImg' />
            </div>
            <form action="" onSubmit={handleSubmit} >
                <input type="file" onChange={handleFileReader} />
                <br />
                <label htmlFor="pseudo">Pseudo</label>
                <input type="text" name='pseudo' id='pseudo' onChange={(e) => setPseudo(e.target.value)} placeholder={userData.pseudo} />
                <br />
                <input type="submit" value='Enregistrer changement' className='submitBtn' />
                <br />
            </form>
            <button className='submitBtnDelete' onClick={handleDelete} >Supprimer compte</button>

        </div >
    )
}
