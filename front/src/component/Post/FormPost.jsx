import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { UidContext } from '../Appcontext'

export default function FormPost() {
    const userData = useSelector((state) => state.userReducer)
    const userId = useContext(UidContext)

    const [message, setMessage] = useState('')
    const [image, setImage] = useState('')

    function handleSubmit() {
        axios({
            method: 'post',
            url: (`${process.env.REACT_APP_API_URL}/api/post`),
            withCredentials: true,
            data: {
                message,
                image,
                userId
            }
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    return (<>
        <div className='img-container'>
            <img src="" alt="" />
        </div>
        <form action="post" onSubmit={handleSubmit}>
            <input type="text" className='text-form' placeholder={`Quoi de neuf ${userData.pseudo}`} onChange={(e) => setMessage(e.target.value)} />
            <div className="btn-container">
                <input type="file" placeholder='Ajouter une image' onChange={(e) => setImage(e.target.value)} />
                <input type="submit" />
            </div>

        </form>
    </>
    )
}
