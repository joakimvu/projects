import { NavLink } from 'react-router-dom'

export default function Navigation() {
  const linkStyle = ({ isActive }) => ({
    textDecoration: isActive ? 'underline' : 'none',
  })
  return (
    <nav>
      <h1 data-testid="logo">
        <NavLink style={linkStyle} to="/">
          Mikro LMS
        </NavLink>
        <span>(Ole Hansen(Admin))</span>
      </h1>
      <ul data-testid="nav">
        <li data-testid="nav_courses">
          <NavLink style={linkStyle} to="/kurs">
            Kurs
          </NavLink>
        </li>
        <li data-testid="nav_new">
          <NavLink style={linkStyle} to="/ny">
            Nytt kurs
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
