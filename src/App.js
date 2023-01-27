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
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const addBlog = async event => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }

    try {
      const returnedBlog =  await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))      
      notify(`A new blog ${newBlogTitle} by ${newBlogAuthor} has been added`)      
      setNewBlogAuthor('')
      setNewBlogTitle('')
      setNewBlogUrl('')
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      console.log(error)
      notify('Please fill all fields before submitting', 'alert')
    }
    
  }

  const handleLogin = async (event) => {
    event.preventDefault()    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      
      setUser(user)
      setUsername('')
      setPassword('')
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

  const loginFormProps = {
    handleLogin,
    username,
    password, 
    setUsername,
    setPassword
  }

  const blogFormProps = {
    addBlog, 
    newBlogTitle, 
    newBlogAuthor, 
    newBlogUrl, 
    setNewBlogTitle, 
    setNewBlogAuthor, 
    setNewBlogUrl
  }

  const blogFormRef = useRef()
  
  return (
    <div>
      <h1 className='text-5xl font-bold my-6'>Blogs</h1>
      <Notification notification={notification} />
      {user === null ? 
        <LoginForm {...loginFormProps} /> :
        <div>
          <p className='prose-lg'>{user.name} logged in <button className='btn rounded-none px-16' onClick={handleLogout}>logout</button> </p>
          <Toggleable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm {...blogFormProps} />
          </Toggleable>
        </div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <Footer />
    </div>
  )
}

export default App
