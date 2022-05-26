import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { UidContext } from '../Appcontext'
import axios from 'axios'

export default function DeletePost({ post }) {
    // const userId = useContext(UidContext)
    const [isEdit, setIsEdit] = useState(false)

    const handleEdit = () => {
        if (isEdit) {
            setIsEdit(false)
        } else {
            setIsEdit(true)
        }
    }


    const editPost = () => {
        handleEdit()

        axios({
            method: 'put',
            url: (`${process.env.REACT_APP_API_URL}/api/post/${post.id}`),
            withCredentials: true,
        })
            .then(res => window.location.reload())
            .catch(err => console.log(err))
    }

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
        <button onClick={editPost}>Modifier</button>
        <button onClick={deletePost}>Supprimer</button>
    </>
    )
}
