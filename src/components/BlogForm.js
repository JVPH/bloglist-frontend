import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = e => {
    e.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })
    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          value={newBlogTitle}
          data-cy="title-input"
          onChange={({ target }) => setNewBlogTitle(target.value)}
          placeholder='title'
        />
      </div>
      <div>
          author:
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          value={newBlogAuthor}
          data-cy="author-input"
          onChange={({ target }) => setNewBlogAuthor(target.value)}
          placeholder='author'
        />
      </div>
      <div>
        url:
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          value={newBlogUrl}
          data-cy="url-input"
          onChange={({ target }) => setNewBlogUrl(target.value)}
          placeholder='url'
        />
      </div>
      <button className="btn btn-ghost" type="submit" data-cy="submit-blog-btn">create</button>
    </form>
  )
}

export default BlogForm