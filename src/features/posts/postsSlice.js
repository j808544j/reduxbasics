import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    likes: 0,
    comments: ['first', 'second'],
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    likes: 0,
    comments: ['first', 'second'],
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId, likes = 0, comments = []) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            likes,
            comments,
          },
        }
      },
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    liked(state, action) {
      const { postId } = action.payload
      const post = state.find((post) => post.id === postId)
      post.likes++
    },
    commentAdded(state, action) {
      const { postId, activeComment } = action.payload
      const post = state.find((post) => post.id === postId)
      post.comments.push(activeComment)
    },
  },
})

export const { postAdded, postUpdated, liked, commentAdded } =
  postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = (state) => state.posts

export const selectPostById = (state, postId) =>
  state.posts.find((post) => post.id === postId)
