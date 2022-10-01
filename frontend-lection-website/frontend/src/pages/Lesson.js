import { Link, useOutletContext, useParams } from 'react-router-dom'
import Lessons from '../components/Lessons'
import { useState, useEffect } from 'react'
import { createComment } from '../lib/services/commentService'
import { getComments } from '../lib/services/commentService'

export default function Lesson() {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)
  const [comments, setComments] = useState('')

  const { lessonSlug } = useParams()
  const currentCourse = useOutletContext()
  const currentLesson = currentCourse[0]?.Lessons?.filter((lesson) =>
    lessonSlug.includes(lesson.slug.current)
  )

  const handleName = (event) => {
    setName(event.currentTarget.value)
  }

  const handleText = (event) => {
    setText(event.currentTarget.value)
  }

  useEffect(() => {
    try {
      const getCommentData = async () => {
        const data = await getComments()
        setComments(data)
      }
      getCommentData()
    } catch (error) {
      // Sender feilmelding tilbake om noe går galt
      throw new Error(error)
    }
  }, [sent])

  const currentCourseLink = `/kurs/${currentCourse[0]?.slug}`

  // Tar imot data Som blir sendt fra kommentarfeltet
  const onClick = async (data) => {
    // Bruker try/catch for å fange opp feil
    try {
      // kaller servicen med data
      await createComment(data)
    } catch (error) {
      // Sender feilmelding tilbake om noe går galt
      throw new Error(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name === '' || text === '') {
      document.getElementById('formError').innerHTML =
        'Fyll ut alle felter med *'
    } else {
      document.getElementById('formError').innerHTML = ''
      onClick({ name, text, lessonSlug })
      setSent({ showMessage: true })
      setTimeout(() => setSent({ showMessage: false }), 1000)
      document.getElementById('name').value = ''
      document.getElementById('comment').value = ''
      setName('')
      setText('')
    }
  }

  // Antall kommentarer
  let commentLength = 0
  comments &&
    comments?.map((comment) =>
      comment.lessonSlug === lessonSlug ? (commentLength += 1) : null
    )

  return (
    <div>
      <div id="lessonIntro">
        <h3 data-testid="course_title">
          <Link to={currentCourseLink}>{currentCourse[0]?.title}</Link>
        </h3>
        <span data-testid="course_category">
          Kategori:{' '}
          <span>
            {currentCourse[0]?.category.charAt(0).toUpperCase() +
              currentCourse[0]?.category.slice(1)}
          </span>
        </span>
      </div>

      {currentLesson &&
        currentLesson?.map((lesson) => (
          <Lessons
            key={lesson._id}
            title={lesson.title}
            ingress={lesson.preamble}
            body={lesson.body}
          />
        ))}

      <section id="commentSection" data-testid="comments">
        <h4>Kommentarer ({commentLength})</h4>
        <form data-testid="comment_form" noValidate>
          <label htmlFor="name">
            <span>Navn*</span>
            <input
              data-testid="form_name"
              type="text"
              name="name"
              id="name"
              onChange={handleName}
            />
          </label>
          <label htmlFor="comment">
            <span>Legg til kommentar*</span>
            <textarea
              data-testid="form_textarea"
              type="text"
              name="comment"
              id="comment"
              cols="30"
              onChange={handleText}
            />
          </label>

          <button
            data-testid="form_submit"
            type="submit"
            onClick={handleSubmit}
          >
            Legg til kommentar
          </button>

          <p id="formError" data-testid="form_error"></p>

          {sent.showMessage && (
            <p id="formSuccess" data-testid="form_success">
              Skjema sendt
            </p>
          )}
        </form>
        <ul data-testid="comments_list">
          {comments &&
            comments?.map((comment) =>
              comment.lessonSlug === lessonSlug ? (
                <li key={comment._id}>
                  <h5>{comment.name}</h5>
                  <p data-testid="user_comment">{comment.text}</p>
                </li>
              ) : null
            )}
        </ul>
      </section>
    </div>
  )
}
