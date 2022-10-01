import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div data-testid="layout">
      <main className="h-full">
        <Outlet />
      </main>
    </div>
  )
}
