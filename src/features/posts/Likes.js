import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { liked } from './postsSlice'

export const Likes = ({ postId }) => {
  const dispatch = useDispatch()

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )

  return (
    <button name="likes" onClick={() => dispatch(liked({ postId }))}>
      Likes : {post.likes}
    </button>
  )
}
