import { useState } from 'react'
import  blogService from '../services/blogs'

const Blog = ({ blog, handleLikesUpdate, username, handleBlogRemoval }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikeBtn = async () => {
    const blogObj = {
      ...blog,
      likes: blog.likes+1
    }

    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes+1
    }



    await blogService.updateBlog(blog.id, updatedBlog)
    setLikes(blog.likes+1)
    handleLikesUpdate(blogObj)
  }

  const handleDeleteBtn = () => {
    if(window.confirm(`Remove ${blog.title} by ${blog.author} ?`)){
      handleBlogRemoval(blog.id)
    }
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <p className="prose-xl">{blog.title} {blog.author} <button className='btn btn-ghost' onClick={toggleVisibility}>view</button></p>
      </div>
      <div className="stats stats-vertical shadow" style={showWhenVisible}>
        <button className='btn btn-ghost' onClick={toggleVisibility}>hide</button>
        <div className="stat">
          <div className="stat-title">Blog:</div>
          <p className="prose-xl">{blog.title} {blog.author} </p>
        </div>
        <div className="stat">
          <div className="stat-title">URL:</div>
          <p className="prose-xl">{blog.url}</p>
        </div>
        <div className="stat">
          <div className="stat-title">Likes:</div>
          <p className="prose-xl">{likes}</p>
          <button className="btn btn-sm btn-outline" onClick={handleLikeBtn}>like</button>
        </div>
        <div className="stat">
          <div className="stat-title">Name:</div>
          <p className="prose-xl">{blog.user.name}</p>
        </div>
        {blog.user.username === username ?
          <div className="stat">
            <button className="btn btn-sm btn-outline" onClick={handleDeleteBtn}>remove</button>
          </div>
          : null}
      </div>
    </div>
  )

}
export default Blog