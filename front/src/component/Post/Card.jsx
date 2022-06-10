import React, { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../utils'
import { dateParser } from '../utils'
import { UidContext } from '../Appcontext'
import Like from './Like'
import DeletePost from './DeletePost'
import FormEditPost from './FormEditPost'

export default function Card({ post }) {
    // Data
    const userData = useSelector(state => state.userReducer)
    const allUserData = useSelector(state => state.usersReducer)
    const userId = useContext(UidContext)

    // State
    const [isLoading, setIsloading] = useState(true)
    const [isEdit, setIsEdit] = useState(false)

    const handleEdit = () => {
        if (isEdit) {
            setIsEdit(false)
        } else {
            setIsEdit(true)
        }
    }

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
                        <div className="img-container">
                            <img src={allUserData.map(user => {
                                if (user.id === post.userId)
                                    return user.picture
                            }).join('')}
                                alt="Profil utilisateur" />
                        </div>

                        <div className="like">
                            <Like post={post} />
                        </div>

                        {
                            // Monttre les boutton modifier et delete que si userId est est posteur ou si le compte est l'admin
                            userId === post.userId || userData.admin === 1 ? (
                                <div className="update-post">
                                    <button onClick={handleEdit} className='modify'>Modifier</button>
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
                                    dateParser(post.createdAt)
                                }
                            </span>
                        </div>

                        {post.picture ? (
                            <div className="card-post">

                                {
                                    isEdit ? <FormEditPost post={post} />
                                        :
                                        <>
                                            <div className="card-post_text">
                                                {post.message}
                                            </div>
                                            <div className="card-post_picture">
                                                <img src={post.picture} alt="pic post" />
                                            </div>
                                        </>
                                }

                            </div>
                        ) : (
                            <div className="card-post">
                                {
                                    isEdit ?
                                        <FormEditPost post={post} />
                                        :
                                        <div className="card-post_text">
                                            {post.message}
                                        </div>
                                }
                            </div>
                        )}
                    </div>
                </div>
            )}
        </li>
    )
}
