import { useParams, NavLink, Outlet } from 'react-router-dom'
import { getUsers } from '../lib/services/userService'
import { useEffect, useState } from 'react'
import { getCourses } from '../lib/services/courseService'

export default function Course() {
  const [users, setUsers] = useState('')
  const [courses, setCourses] = useState('')
  const { kursSlug, lessonSlug } = useParams()

  const linkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? '#95E7B9' : 'white',
  })

  useEffect(() => {
    try {
      const getCourseData = async () => {
        const data = await getCourses()
        setCourses(data)
      }
      getCourseData()
    } catch (error) {
      // Sender feilmelding tilbake om noe går galt
      throw new Error(error)
    }
  }, [])

  const currentCourse =
    courses && courses?.filter((course) => kursSlug.includes(course.slug))

  useEffect(() => {
    try {
      const getUserData = async () => {
        const data = await getUsers()
        setUsers(data)
      }
      getUserData()
    } catch (error) {
      // Sender feilmelding tilbake om noe går galt
      throw new Error(error)
    }
  }, [])

  return (
    <div id="courseWrap">
      <aside className="asideLessons">
        <h3>Leksjoner</h3>

        <ul data-testid="lessons">
          {currentCourse &&
            currentCourse?.map((course) =>
              course?.Lessons?.map((lesson) => (
                <NavLink
                  key={lesson._id}
                  className="navlink"
                  style={linkStyle}
                  data-testid="lesson_url"
                  data-slug="Dynamisk verdi"
                  to={lesson.slug.current}
                >
                  {lesson?.title}
                </NavLink>
              ))
            )}
        </ul>
      </aside>
      <section className="lessonWrap">
        {typeof lessonSlug === 'undefined' ? (
          <>
            <h2 data-testid="course_title">{currentCourse[0]?.title}</h2>
            <p data-testid="course_description">
              {currentCourse[0]?.description}
            </p>
          </>
        ) : null}

        <Outlet context={currentCourse} />
      </section>
      <aside className="asideUsers" data-testid="enrollments">
        <h3>Deltakere</h3>
        <ul data-testid="course_enrollments">
          {users && users?.map((user) => <li key={user._id}>{user.name}</li>)}
        </ul>
      </aside>
    </div>
  )
}
