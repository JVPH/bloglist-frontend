const LoginForm = ({ handleLogin, username, password, setUsername,setPassword }) => (
  <form onSubmit={handleLogin} className="my-8">
    <div>
      <span className="prose-lg">username </span>       
        <input 
          type="text"           
          className="input input-bordered w-full max-w-xs"
          value={username}
          name="Username"
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
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" className="btn rounded-none px-16">login</button>
  </form>
)

export default LoginForm