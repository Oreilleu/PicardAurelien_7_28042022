import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Profil from '../Profil'
import { getPost } from '../redux/actions/post.actions'
import { isEmpty } from '../component/utils'
import Card from '../component/Post/Card'

export default function Trending() {
  const [loadPost, setLoadPost] = useState(true)
  const dispatch = useDispatch()
  const postData = useSelector((state) => state.postReducer)

  useEffect(() => {
    if (loadPost) {
      dispatch(getPost())
      setLoadPost(false)
    }
  }, [loadPost])

  // console.log(postData)

  // console.log(isProfil)
  return (<div className="trending-container">
    {/* <div className="profil">
      <Profil />
    </div> */}
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
