import { useState } from "react"

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
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
          <p className="prose-xl">{blog.likes}</p>
          <button className="btn btn-sm btn-outline">like</button>
        </div>
        <div className="stat">
          <div className="stat-title">Name:</div>
          <p className="prose-xl">{blog.user.name}</p>
        </div>        
      </div>
    </div>  
  )

}
export default Blog