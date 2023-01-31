import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const initialBlogs = await blogService.getAll()
        setBlogs( initialBlogs )
      } catch (error) {
        console.log(error)
      }
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const addBlog = async blogObject => {
    try {
      const returnedBlog =  await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      notify(`A new blog ${blogObject.title} by ${blogObject.author} has been added`)
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      console.log(error)
      notify('Please fill all fields before submitting', 'alert')
    }

  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)

    } catch (error) {
      console.log(error)
      notify('Wrong credentials', 'alert')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListUser')
    blogService.setToken(null)
    setUser(null)
  }

  const blogFormRef = useRef()

  const handleLikesUpdate = async (blogObj, updatedBlog) => {
    await blogService.updateBlog(blogObj.id, updatedBlog)
    setBlogs(blogs.map(blog =>
      blog.id === blogObj.id ? blogObj : blog
    ))
  }

  const handleBlogRemoval = async (id) => {
    await blogService.deleteBlog(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  return (
    <div className='flex flex-col space-y-4 min-h-screen'>
      <h1 className='text-5xl font-bold my-6'>Blogs</h1>
      <Notification notification={notification} />
      <main className='flex-1'>
        {user === null ?
          <LoginForm handleLogin={handleLogin} /> :
          <div>
            <p className='prose-lg'>{user.name} logged in <button className='btn' onClick={handleLogout}>logout</button> </p>
            <Toggleable buttonLabel='new blog' ref={blogFormRef}>
              <BlogForm createBlog={addBlog} />
            </Toggleable>
          </div>
        }
        {Boolean(blogs) === true ? blogs.sort((a,b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} handleLikesUpdate={handleLikesUpdate} username={user === null ? null : user.username} handleBlogRemoval={handleBlogRemoval}/>
        )
          : null}
      </main>
      <Footer />
    </div>
  )
}

export default App
