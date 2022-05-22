import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Profil from '../Profil'
import { getPost } from '../redux/actions/post.actions'

export default function Trending() {
  const [loadPost, setLoadPost] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    if (loadPost) {
      dispatch(getPost())
      setLoadPost(false)
    }
  }, [loadPost])

  // console.log(isProfil)
  return (<div className="trending-container">
    {/* <div className="profil">
      <Profil />
    </div> */}
  </div>

  )
}
