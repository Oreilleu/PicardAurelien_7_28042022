import React, { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { UidContext } from '../Appcontext'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faThumbsDown } from '@fortawesome/free-regular-svg-icons'

export default function Like({ post }) {

    const [isLike, setIsLike] = useState(false)
    const likeData = useSelector(state => state.likeReducer)
    const [count, setCount] = useState(post._count.like)
    const userId = useContext(UidContext)


    // useEffect(() => {
    //     setCount(post._count.like)
    // }, [post, count])

    useEffect(() => {
        arrayPostId.map(like => {
            if (like === post.id) {
                if (arrayUserId.includes(userId))
                    setIsLike(true)
            }
        })
    }, [])

    let arrayUserId = []
    let arrayPostId = []

    for (let i = 0; i < likeData.length; i++) {
        arrayUserId.push(likeData[i].userId)
        arrayPostId.push(likeData[i].postId)
    }


    const handleLike = () => {
        axios({
            method: 'patch',
            url: (`${process.env.REACT_APP_API_URL}/api/post/like-post/${post.id}`),
            withCredentials: true,
            data: {
                userId: userId
            }
        })
            .then((res) => {
                window.location.reload()
            })
            .catch((err) => console.log(err))

        setIsLike(true)
    }

    const handleUnlike = () => {
        axios({
            method: 'patch',
            url: (`${process.env.REACT_APP_API_URL}/api/post/unlike-post/${post.id}`),
            withCredentials: true,
            data: {
                userId: userId
            }
        })
            .then((res) => {
                window.location.reload()
            })
            .catch((err) => console.log(err))

        setIsLike(false)
    }

    return (
        <div className="like-container">
            {userId && isLike === false && (
                <>
                    <FontAwesomeIcon icon={faThumbsUp} className='thumbsUp' onClick={handleLike} />
                    <span>{count}</span>
                </>
            )}

            {userId && isLike === true && (
                <>
                    <FontAwesomeIcon icon={faThumbsDown} className='thumbsDown' onClick={handleUnlike} />
                    <span>{count}</span>
                </>
            )}
        </div>
    )
}
