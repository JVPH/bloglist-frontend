import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }
  return (
    <form onSubmit={login} className="my-8">
      <div>
        <span className="prose-lg">username </span>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          value={username}
          name="Username"
          data-cy="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <span className="prose-lg">password </span>
        <input
          type="password"
          className="input input-bordered w-full max-w-xs"
          value={password}
          name="Password"
          data-cy="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" className="btn rounded-none px-16" data-cy="login-btn">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm