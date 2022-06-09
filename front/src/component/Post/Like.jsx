import React, { useEffect, useState, useContext, useReducer } from 'react'
import { useSelector } from 'react-redux'
import { UidContext } from '../Appcontext'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
// import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown } from '@fortawesome/free-regular-svg-icons'

// import { getLike } from '../../redux/actions/post.actions'


export default function Like({ post }) {

    const [isLike, setIsLike] = useState(false)
    const likeData = useSelector(state => state.likeReducer)
    const [count, setCount] = useState(0)
    const userId = useContext(UidContext)


    useEffect(() => {
        setCount(post._count.like)
    }, [count, post])

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


    const handleLike = (e) => {
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
                console.log(res)

            })
            .catch((err) => console.log(err))

        setIsLike(false)
    }

    return (
        <div className="like-container">
            {userId && isLike === false && (
                <>
                    <FontAwesomeIcon icon={faThumbsUp} className='thumbsUp' onClick={handleLike} style={{ color: "blue" }} />
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
