import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { UidContext } from '../Appcontext'
import axios from 'axios'

export default function DeletePost({ post }) {
    // const userId = useContext(UidContext)


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
