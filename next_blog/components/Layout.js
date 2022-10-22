import Navigation from './Navigation'

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className="main">{children}</main>
    </>
  )
}

export default Layout
