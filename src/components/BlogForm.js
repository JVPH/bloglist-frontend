const BlogForm = ({ addBlog, newBlogTitle, newBlogAuthor, newBlogUrl, setNewBlogTitle, setNewBlogAuthor, setNewBlogUrl }) => (
  <form onSubmit={addBlog}>
    <div>
      title:
        <input
        type="text"
        value={newBlogTitle}        
        onChange={({ target }) => setNewBlogTitle(target.value)}
        />
    </div>
    <div>
        author:
        <input
          type="text"
          value={newBlogAuthor}          
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
    </div>
    <div>
      url:
        <input
        type="text"
        value={newBlogUrl}        
        onChange={({ target }) => setNewBlogUrl(target.value)}
        />
    </div>
    <button type="submit">create</button>
  </form>

)

export default BlogForm