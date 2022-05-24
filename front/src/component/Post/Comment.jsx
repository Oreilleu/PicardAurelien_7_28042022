import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComments } from '../../redux/actions/post.actions'
import { isEmpty } from '../utils'

export default function Comment({ post }) {
    const [loadComment, setLoadComment] = useState(true)
    const commentsData = useSelector((state) => state.postReducer)
    const dispatch = useDispatch()

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
                    <img src="" alt="" />
                    <h3 className='comment-item_left_top_name'>NAME</h3>
                </div>
                <p className='comment-item_top_date'> DATE</p>
            </div>
            <div className="comment-item_right">
                TEXT COMMENT
            </div>
        </li>

    )
}