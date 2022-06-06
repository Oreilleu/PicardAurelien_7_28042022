import React, { useState } from 'react'
import axios from 'axios'

export default function FormEditPost({ post }) {
    const [message, setMessage] = useState('')
    const [file, setFile] = useState('')

    console.log(message)

    const data = new FormData()
    data.append('message', message)
    data.append('file', file)


    const handleSubmit = (e) => {
        // e.preventDefault()
        axios({
            method: 'put',
            url: (`${process.env.REACT_APP_API_URL}/api/post/${post.id}`),
            withCredentials: true,
            data
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
                    <input type="file" placeholder='Ajouter une image' onChange={(e) => setFile(e.target.files[0])} />
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}
