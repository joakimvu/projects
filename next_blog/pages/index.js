import Bloglist from '../components/Bloglist'
import useFetch from './../hooks/useFetch'

export default function Home() {
  const {
    data: blogs,
    isPending,
    error,
  } = useFetch('http://localhost:8000/blogs')

  const handleDelete = (id) => {
    const newBlogs = blogs.filter((blog) => blog.id !== id)
    setBlogs(newBlogs)
  }

  return (
    <div className="content">
      {error && <h2>{error}</h2>}
      {isPending && <h2>Loading...</h2>}
      {blogs && <Bloglist blogs={blogs} handleDelete={handleDelete} />}
    </div>
  )
}
