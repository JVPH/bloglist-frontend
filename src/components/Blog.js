const Blog = ({blog}) => (
  <div>
    <p className="prose">{blog.title} {blog.author}</p>
  </div>  
)

export default Blog