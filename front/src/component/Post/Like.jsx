import React, { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { UidContext } from '../Appcontext'
import axios from 'axios'
// import { getLike } from '../../redux/actions/post.actions'


export default function Like({ post }) {
    const [isLike, setIsLike] = useState(false)
    const likeData = useSelector(state => state.postReducer)
    const userId = useContext(UidContext)
    // const dispatch = useDispatch()


    // Comment faire le dispatch(getLike) sans le relancer a l'infini
    // console.log(likeData[0])
    // console.log(likeData)

    // Savoir si le post est dans le tableau des likeData -- filter - faire tableau 

    useEffect(() => {
        if (likeData.includes(userId)) console.log("ok")
        // else { console.log('ko') }
        // setIsLike(true)

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
            .then((res) => console.log(res))
            .catch((err) => console.log(err))

        setIsLike(false)
    }


    // COMPTEUR DE LIKE ? incrément en base
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
