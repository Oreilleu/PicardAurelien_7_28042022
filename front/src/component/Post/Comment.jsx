import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComments } from '../../redux/actions/post.actions'
import { dateParser, isEmpty } from '../utils'

export default function Comment({ post }) {
    const [loadComment, setLoadComment] = useState(true)
    const commentsData = useSelector((state) => state.postReducer)
    const postData = useSelector(state => state.postReducer)

    const allUserData = useSelector(state => state.usersReducer)

    // const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(getComments())

        if (loadComment) {
            !isEmpty && setLoadComment(false)
        }

    }, [loadComment])


    return (

        <li className='comment-item'>
            <div className='comment-item_left'>
                <div className="comment-item_left_top">
                    <img src={allUserData.map(users => {
                        if (users.id === post.userId)
                            return users.picture
                    })} alt="Profil pic" />
                    <h3 className='comment-item_left_top_name'>{allUserData.map(user => {
                        if (user.id === post.userId) {
                            return user.pseudo
                        }
                    })}</h3>
                </div>
                <span className='comment-item_top_date'> {dateParser(postData.createAt)}</span>
            </div>

            <div className="comment-item_right">
                {commentsData.map(comment => {
                    // Afficher le bon commentaire
                    if (comment.postId === post.id)
                        return comment.message
                })}
            </div>
        </li>

    )
}