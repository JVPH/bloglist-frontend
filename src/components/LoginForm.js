const LoginForm = ({ handleLogin, username, password, setUsername,setPassword }) => (
  <form onSubmit={handleLogin}>
    <div>
      username        
        <input type="text" 
          placeholder="JohnDoe00" 
          className="input input-bordered w-full max-w-xs"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)} 
        />
    </div>
    <div>
      password        
        <input type="text" 
          placeholder="123456Pass" 
          className="input input-bordered w-full max-w-xs"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" class="btn rounded-none px-16">login</button>
  </form>
)

export default LoginForm