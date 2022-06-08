import React, { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { UidContext } from '../Appcontext'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

// import { getLike } from '../../redux/actions/post.actions'


export default function Like({ post }) {

    const [isLike, setIsLike] = useState(false)
    const likeData = useSelector(state => state.likeReducer)
    const userId = useContext(UidContext)

    let arrayUserId = []
    let arrayPostId = []

    for (let i = 0; i < likeData.length; i++) {
        arrayUserId.push(likeData[i].userId)
        arrayPostId.push(likeData[i].postId)
    }

    // console.log(arrayUserId)
    // console.log(arrayPostId)

    // Savoir si le post est dans le tableau des likeData -- filter - faire tableau 

    useEffect(() => {
        arrayPostId.map(like => {
            if (like === post.id) {
                if (arrayUserId.includes(userId))
                    setIsLike(true)
            }
        })
    }, [])


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
                    <button className="btn-like" onClick={handleLike}>
                        Like

                    </button>
                    {/* <FontAwesomeIcon icon={faHeart} className='vert' /> */}
                    <span></span>
                </>
            )}

            {userId && isLike === true && (
                <>
                    <button className="btn-like" onClick={handleUnlike}>
                        UnLike
                    </button>
                    <div className='compteur-like'></div>

                    {/* {arrayPostId.map(postLike => {
                        let compt = 0
                        if (postLike === post.id) {
                            Number(compt++)
                        }
                        return compt
                    })} */}
                </>
            )}
        </div>
    )
}
