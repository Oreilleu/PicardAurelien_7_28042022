import React, { useState } from 'react'
import axios from 'axios'

export default function FormEditPost({ post }) {
    const [message, setMessage] = useState('')
    const [picture, setPicture] = useState('')

    console.log(message)


    const handleSubmit = (e) => {
        axios({
            method: 'put',
            url: (`${process.env.REACT_APP_API_URL}/api/post/${post.id}`),
            withCredentials: true,
            data: {
                message,
                picture
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div className='form-edit-container'>
            <form action="post" onSubmit={handleSubmit}>
                <label htmlFor="text-edit">Nouveau message</label>
                <br />
                <input type="text" className='text-edit' id='text-edit' placeholder='New message' onChange={(e) => setMessage(e.target.value)} />
                <br />
                <br />
                <div className="btn-edit-container">
                    <input type="file" placeholder='Ajouter une image' onChange={(e) => setPicture(e.target.files[0])} />
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}
