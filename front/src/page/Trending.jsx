import React, { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../redux/actions/post.actions'
import { isEmpty } from '../component/utils'
import { UidContext } from '../component/Appcontext'
import Card from '../component/Post/Card'
import FormPost from '../component/Post/FormPost'

export default function Trending() {
  const [loadPost, setLoadPost] = useState(true)
  const dispatch = useDispatch()
  const postData = useSelector((state) => state.postReducer)
  const userId = useContext(UidContext)

  useEffect(() => {
    if (loadPost) {
      dispatch(getPost())
      setLoadPost(false)
    }
    if (!userId) {
      window.location = '/'
    }
  }, [loadPost, dispatch])

  return (
    <div className="trending-container">
      <div className="form-post-container">
        <FormPost />
      </div>
      <ul>
        {!isEmpty(postData[0]) &&
          postData.map(post => {
            return <Card post={post} key={post.id} />
          })
        }
      </ul>
    </div>
  )
}
