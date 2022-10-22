import Link from 'next/Link'

const Bloglist = ({ blogs }) => {
  return (
    <div className="blog-list">
      <h2>Alle blogg</h2>
      {blogs?.map((blog) => (
        <div className="blog-preview" key={blog?.id}>
          <Link href={`/blogs/${blog?.id}`}>
            <a>
              <h2>{blog?.title}</h2>
              <p>{blog?.author}</p>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Bloglist
