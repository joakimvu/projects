import { useRouter } from 'next/router'
import { useState } from 'react'
import useFetch from './../../hooks/useFetch'

const blogsDetails = () => {
  const router = useRouter()
  const id = router.query.id
  const [Loading, setLoading] = useState(false)

  const {
    data: blog,
    error,
    isPending,
  } = useFetch(`http://localhost:8000/blogs/${id}`)

  const handleDelete = (id) => {
    setLoading(true)

    fetch(`http://localhost:8000/blogs/${blog?.id}`, {
      method: 'DELETE',
    }).then(() => {
      setTimeout(() => {
        setLoading(false)
        router.push('/')
      }, 1500)
    })
  }

  const blogExistCheck = Object.keys(blog).length > 0
  console.log(blogExistCheck)

  return (
    <div className="blog-details">
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {blog && blogExistCheck ? (
        <article>
          <h2>{blog?.title}</h2>
          <p>Skrevet av {blog?.author}</p>
          <p className="bodytext">{blog?.body}</p>
          {!Loading && <button onClick={handleDelete}>Slett artikkel</button>}
          {Loading && <button disabled>Sletter blogg...</button>}
        </article>
      ) : null}
    </div>
  )
}

export default blogsDetails
