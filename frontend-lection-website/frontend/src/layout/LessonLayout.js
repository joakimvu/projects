import { Outlet, useOutletContext } from 'react-router-dom'

export default function LessonLayout() {
  const currentCourse = useOutletContext()

  return (
    <div data-testid="layout">
      <Outlet context={currentCourse} />
    </div>
  )
}
