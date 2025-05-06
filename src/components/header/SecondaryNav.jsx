import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import CategoriesDropdown from './CategoriesDropdown'
import SearchResults from './SearchResults'
import { searchGames } from '../../services/gameService'

const SecondaryNav = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [showCategories, setShowCategories] = useState(false)
  const searchRef = useRef(null)
  const categoriesRef = useRef(null)

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    
    if (value.length >= 2) {
      const results = searchGames(value)
      setSearchResults(results)
    } else {
      setSearchResults(null)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults(null)
      }
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setShowCategories(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="bg-gray-800 py-2 shadow-md relative">
      <div className="flex justify-center">
        <div className="w-full max-w-[1080px] px-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Your Store
              </Link>
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                New &amp; Noteworthy
              </Link>
              <div ref={categoriesRef} className="relative">
                <button 
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                  onClick={() => setShowCategories(!showCategories)}
                >
                  Categories
                  <svg 
                    className={`ml-1 w-4 h-4 transition-transform ${showCategories ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showCategories && <CategoriesDropdown />}
              </div>
            </div>
            
            <div className="relative" ref={searchRef}>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Search games..."
                  className="bg-gray-700 text-white pl-3 pr-10 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 w-56 md:w-64"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              {searchResults && <SearchResults results={searchResults} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecondaryNav