const Blog = ({blog}) => (
  <div>
    <p className="prose-xl">{blog.title} {blog.author}</p>
  </div>  
)

export default Blog