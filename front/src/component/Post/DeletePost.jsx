import React from 'react'
import axios from 'axios'

export default function DeletePost({ post }) {

    const deletePost = () => {
        axios({
            method: 'delete',
            url: (`${process.env.REACT_APP_API_URL}/api/post/${post.id}`),
            withCredentials: true,
        })
            .then(res => window.location.reload())
            .catch(err => console.log(err))
    }

    return (<>
        <button onClick={deletePost} className='delete'>Supprimer</button>
    </>
    )
}
