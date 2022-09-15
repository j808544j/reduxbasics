import { nanoid } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { commentAdded } from './postsSlice'

export const Comment = ({ postId }) => {
  const [activeComment, setActiveComment] = useState('')

  const dispatch = useDispatch()

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )

  function handleComment() {
    if (activeComment) {
      dispatch(commentAdded({ postId, activeComment }))
      setActiveComment('')
    }
  }

  return (
    <>
      {post.comments.map((c) => (
        <p key={nanoid()}>{c}</p>
      ))}
      <input
        value={activeComment}
        onChange={(e) => setActiveComment(e.target.value)}
        placeholder="comment here"
      />
      <button name="addacomment" onClick={handleComment}>
        Add Comment
      </button>
    </>
  )
}
