import React, { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { UidContext } from '../Appcontext'


export default function FormEditPost({ post }) {

    const userId = useContext(UidContext)
    const [message, setMessage] = useState(post.message)
    const [file, setFile] = useState('')

    const data = new FormData()
    data.append('message', message)
    data.append('file', file)
    data.append('userId', userId)

    const handleSubmit = () => {
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
                <input type="text" className='text-edit' id='text-edit' placeholder={post.message} defaultValue={post.message} onChange={(e) => setMessage(e.target.value)} />
                <br />
                <br />
                <div className="btn-edit-container">
                    <input type="file" placeholder='Ajouter une image' onChange={(e) => setFile(e.target.files[0])} className='inputFile' />
                    <input type="submit" className='send' />
                </div>
            </form>
        </div>
    )
}
