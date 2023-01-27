const BlogForm = ({ addBlog, newBlogTitle, newBlogAuthor, newBlogUrl, setNewBlogTitle, setNewBlogAuthor, setNewBlogUrl }) => (
  <form onSubmit={addBlog}>
    <div>
      title:
        <input 
        className="input input-bordered w-full max-w-xs"
        type="text"
        value={newBlogTitle}        
        onChange={({ target }) => setNewBlogTitle(target.value)}
        />
    </div>
    <div>
        author:
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          value={newBlogAuthor}          
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
    </div>
    <div>
      url:
        <input
        className="input input-bordered w-full max-w-xs"
        type="text"
        value={newBlogUrl}        
        onChange={({ target }) => setNewBlogUrl(target.value)}
        />
    </div>
    <button type="submit">create</button>
  </form>

)

export default BlogForm