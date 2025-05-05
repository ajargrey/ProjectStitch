import { Outlet } from 'react-router-dom'
import Header from './header/Header'
import SecondaryNav from './header/SecondaryNav'
import Footer from './footer/Footer'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SecondaryNav />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout