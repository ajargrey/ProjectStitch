import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../assets/logo'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    })
  }

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="flex justify-center">
        <div className="w-[1920px] px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center">
                <Logo className="h-8 w-auto" />
              </Link>
              <nav className="hidden md:flex space-x-1">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'nav-link-active' : ''}`
                  }
                  end
                >
                  STORE
                </NavLink>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'nav-link-active' : ''}`
                  }
                >
                  ABOUT
                </NavLink>
                <NavLink 
                  to="/support" 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'nav-link-active' : ''}`
                  }
                >
                  SUPPORT
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header