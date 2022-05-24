import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../utils'
import { dateParser } from '../utils'
import Comment from '../Post/Comment'
import axios from 'axios'
import { UidContext } from '../Appcontext'

export default function Card({ post }) {
    const [isLoading, setIsloading] = useState(true)
    const userData = useSelector(state => state.userReducer)
    const allUserData = useSelector(state => state.usersReducer)
    const postData = useSelector(state => state.postReducer)

    const userId = useContext(UidContext)
    const [commentMessage, setCommentMessage] = useState('')



    useEffect(() => {
        !isEmpty(allUserData) && setIsloading(false)
    }, [allUserData])

    const handleComment = (e) => {
        e.preventDefault()

        // Vider le formulaire

        const inputComment = document.querySelector('input-comment')



        axios({
            method: 'post',
            url: (`${process.env.REACT_APP_API_URL}/api/post/comment-post/${post.id}`),
            withCredentials: true,
            data: {
                userId: userId,
                message: commentMessage
            }
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    return (
        <li className='card-container' key={post.id}>
            {isLoading ? (
                <div className="card-loader"></div>
            ) : (
                <div className="card-content">
                    <div className="card-picture-container">
                        <img src={allUserData.map(user => {
                            if (user.id === post.userId)
                                return user.picture
                        }).join('')}
                            alt="Profil utilisateur" />
                    </div>

                    <div className="card-right-container">
                        <div className="card-name">
                            <div className="card-name_pseudo">
                                <h3>{allUserData.map(user => {
                                    if (user.id === post.userId)
                                        return user.pseudo
                                })}</h3>
                            </div>
                            <span className="card-name_date">
                                {dateParser(postData.createAt)}
                            </span>
                        </div>

                        {postData.picture ? (
                            <div className="card-post">
                                <div className="card-post_text">
                                    {post.message}
                                </div>
                                <div className="card-post_picture">
                                    {post.picture}
                                </div>
                            </div>
                        ) : (
                            <div className="card-post">
                                <div className="card-post_text">
                                    {post.message}
                                </div>
                            </div>
                        )}
                        <div className="like-comment">
                            {
                                // SI le post est like mettre unlike
                                // Au clique sur comment ouvre un input pour le commentaire
                            }
                            <button>Like</button>
                            <button onClick={handleComment}>Comment</button>
                        </div>
                        <div className="comment-container">
                            <ul>
                                <Comment />
                            </ul>
                        </div>

                        <div className="input-comment-container">
                            <input type="text" placeholder='Ecrivez votre commentaire' className='input-comment' onChange={(e) => setCommentMessage(e.target.value)} />
                        </div>
                    </div>
                </div>
            )}
        </li>
    )
}
