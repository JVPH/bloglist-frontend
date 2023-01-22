import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
    }
  }
  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListUser')
    blogService.setToken(null)
    setUser(null)
  }
  
  return (
    <div>
      <h2>blogs</h2>
      {user === null ? 
        <LoginForm
          handleLogin={handleLogin}
          username={username} 
          password={password} 
          setUsername={setUsername} 
          setPassword={setPassword}           
        /> :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p>
          {/* {noteForm()} */}
        </div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
