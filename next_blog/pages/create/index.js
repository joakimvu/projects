import { useState } from 'react'
import { useRouter } from 'next/router'

const create = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('joakim')
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const blog = { title, body, author }

    setIsPending(true)

    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    }).then(() => {
      setTimeout(() => {
        setIsPending(false)
        router.back()
      }, 1500)
    })
  }

  return (
    <div className="create">
      <h2>Legg til ny blogg</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <label htmlFor="">Tittel: </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Content */}
        <label htmlFor="">Innhold: </label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        {/* Author */}
        <label htmlFor="">Forfatter</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="joakim">Joakim</option>
          <option value="jostein">Jostein</option>
          <option value="stig">Stig</option>
          <option value="caroline">Caroline</option>
        </select>
        {/* Button */}
        {!isPending && <button>Lag Blog</button>}
        {isPending && <button disabled>Lager ny blog...</button>}
      </form>
    </div>
  )
}

export default create
