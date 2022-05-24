import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComments } from '../../redux/actions/post.actions'
import { isEmpty } from '../utils'

export default function Comment({ }) {
    const [loadComment, setLoadComment] = useState(true)
    const commentsData = useSelector((state) => state.postReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (loadComment) {
            dispatch(getComments())
            setLoadComment(false)
        }
    }, [loadComment])

    return (
        // Problème : impossible de recupérer les data des commentaire - postman / redux
        <li>
            <div>
                {commentsData.map(com => {
                    console.log(com)
                })}
            </div>
            {/* {loadComment ? <div className='loader-comment'></div> :
                <div className="testiv">Hello</div>
            } */}

        </li>

    )
}