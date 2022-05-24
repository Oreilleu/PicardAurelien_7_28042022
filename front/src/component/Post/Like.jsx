import React, { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { UidContext } from '../Appcontext'
import axios from 'axios'


export default function Like({ post }) {
    const [isLike, setIsLike] = useState(false)
    const likeData = useSelector(state => state.postReducer)
    const userId = useContext(UidContext)


    // console.log(likeData)
    useEffect(() => {
        if (likeData.includes(userId)) setIsLike(true)

    }, [userId, likeData, isLike])


    const handleLike = () => {
        axios({
            method: 'patch',
            url: (`${process.env.REACT_APP_API_URL}/api/post/like-post/${post.id}`),
            withCredentials: true,
            data: {
                userId: userId
            }
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))

        setIsLike(false)
    }

    const handleUnlike = () => {
    }



    return (
        <div className="like-container">
            {userId && isLike === false && (
                <button className="btn-like" onClick={handleLike}>
                    Like
                </button>
            )}
            {userId && isLike === true && (
                <button className="btn-like" onClick={handleUnlike}>
                    UnLike
                </button>
            )}
        </div>
    )
}
