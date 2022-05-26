import React, { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../utils'
import { dateParser } from '../utils'
import { UidContext } from '../Appcontext'
import Like from './Like'
import DeletePost from './DeletePost'

export default function Card({ post }) {
    // Data
    const userData = useSelector(state => state.userReducer)
    const allUserData = useSelector(state => state.usersReducer)
    const postData = useSelector(state => state.postReducer)
    const userId = useContext(UidContext)

    // State
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        !isEmpty(allUserData) && setIsloading(false)
    }, [allUserData])

    return (
        <li className='card-container' key={post.id}>
            {isLoading ? (
                <div className="card-loader"></div>
            ) : (
                <div className="card-content">
                    <div className="card-picture-container">
                        <img src={allUserData.map(user => {
                            // Balise image border ?
                            if (user.id === post.userId)
                                return user.picture
                        }).join('')}
                            alt="Profil utilisateur" />
                        <div className="like">
                            <Like post={post} />
                        </div>
                        {
                            userId === post.userId || userData.admin === 1 ? (
                                <div className="update-post">
                                    <DeletePost post={post} />
                                </div>
                            ) : null
                        }


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

                                {
                                    // DATA INVALID ???
                                    dateParser(postData.createAt)}
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
                            // Faire remonter isEdit et mettre un formulaire ici
                        )}
                    </div>
                </div>
            )}
        </li>
    )
}
