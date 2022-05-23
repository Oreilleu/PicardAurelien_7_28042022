import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../utils'
import { dateParser } from '../utils'

export default function Card({ post }) {
    const [isLoading, setIsloading] = useState(true)
    const userData = useSelector(state => state.userReducer)
    const allUserData = useSelector(state => state.usersReducer)
    const postData = useSelector(state => state.postReducer)

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
                    </div>


                </div>
            )}
        </li>
    )
}
