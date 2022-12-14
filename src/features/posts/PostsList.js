import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TimeAgo } from './TimeAgo'
import { Likes } from './Likes'
import { selectAllPosts } from './postsSlice'

export const PostsList = () => {
  const posts = useSelector(selectAllPosts)
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
      <TimeAgo timestamp={post.date} />
      <Likes postId={post.id} />
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
