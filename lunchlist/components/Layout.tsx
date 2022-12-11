import Navigation from './Navigation'
import Footer from './footer'

const Layout = ({ children }) => {
  return (
    <>
      <div className="w-full flex justify-center">
        <main className="max-w-6xl w-full">
          <Navigation />
          {children}
          <Footer />
        </main>
      </div>
    </>
  )
}

export default Layout
