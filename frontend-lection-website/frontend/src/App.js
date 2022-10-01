import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import SignUp from './pages/SignUp'
import Courses from './pages/Courses'
import Course from './pages/Course'
import Layout from './layout/Layout'
import LessonLayout from './layout/LessonLayout.js'
import Lesson from './pages/Lesson'
import Create from './pages/Create'

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SignUp />} />
          <Route path="/kurs">
            <Route index element={<Courses />} />
            <Route path=":kursSlug" element={<Course />}>
              <Route element={<LessonLayout />}>
                <Route path=":lessonSlug" element={<Lesson />} />
              </Route>
            </Route>
          </Route>
          <Route path="/ny" element={<Create />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}
