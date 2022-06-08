import React, { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { UidContext } from '../Appcontext'
import axios from 'axios'
// import { getLike } from '../../redux/actions/post.actions'


export default function Like({ post }) {
    const [isLike, setIsLike] = useState(false)
    const likeData = useSelector(state => state.likeReducer)
    const userId = useContext(UidContext)
    let sum = 0;
    // const dispatch = useDispatch()


    // Comment faire le dispatch(getLike) sans le relancer a l'infini
    // console.log(likeData[0])
    console.log(likeData.length)
    let arrayUserId = []
    let arrayPostId = []

    for (let i = 0; i < likeData.length; i++) {
        arrayUserId.push(likeData[i].userId)
        arrayPostId.push(likeData[i].postId)
    }

    console.log(arrayUserId)
    console.log(arrayPostId)

    // Savoir si le post est dans le tableau des likeData -- filter - faire tableau 

    useEffect(() => {
        arrayPostId.map(like => {
            if (like === post.id) {
                if (arrayUserId.includes(userId))
                    setIsLike(true)
                // else if (!arrayUserId.includes(userId))
                //     setIsLike(false)
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
            .then((res) => console.log(res))
            .catch((err) => console.log(err))

        setIsLike(false)
    }

    // COMPTEUR DE LIKE ? incrément en base
    return (
        <div className="like-container">
            {userId && isLike === false && (
                <>
                    <button className="btn-like" onClick={handleLike}>
                        Like
                    </button>
                    <span>{arrayPostId.length}</span>
                </>
            )}

            {userId && isLike === true && (
                // Je veux afficher le nombre de like par post
                // Map sur array post : si post == 
                <>
                    <button className="btn-like" onClick={handleUnlike}>
                        UnLike
                    </button>

                    {arrayPostId.map(postLike => {
                        let array = []
                        if (postLike === post.id) {
                            array.push(postLike)
                        }
                        return array.length
                    })}
                </>
            )}
        </div>
    )
}
