import { Link } from 'react-router-dom'
import { categorySystem } from '../../data/categories'

const CategoriesDropdown = () => {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[780px] bg-gray-800 rounded-md shadow-lg z-20 grid grid-cols-3 gap-6 p-6 animate-fade-in">
      <div>
        <h3 className="text-primary-400 font-heading font-semibold mb-3 text-base">SPECIAL SECTIONS</h3>
        <ul className="space-y-2">
          {categorySystem
            .filter(cat => cat.mainCategory === 'special')
            .map(category => (
              category.subCategories.map(subCat => (
                <li key={subCat.name}>
                  <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                    {subCat.name}
                  </Link>
                </li>
              ))
            ))
          }
        </ul>
      </div>
      
      <div>
        <h3 className="text-primary-400 font-heading font-semibold mb-3 text-base">GENRES</h3>
        <ul className="space-y-2">
          {categorySystem
            .filter(cat => cat.mainCategory === 'genres')
            .map(category => (
              category.subCategories.slice(0, 10).map(subCat => (
                <li key={subCat.name}>
                  <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                    {subCat.name}
                  </Link>
                </li>
              ))
            ))
          }
        </ul>
      </div>
      
      <div>
        <h3 className="text-primary-400 font-heading font-semibold mb-3 text-base">THEMES</h3>
        <ul className="space-y-2">
          {categorySystem
            .filter(cat => cat.mainCategory === 'themes')
            .map(category => (
              category.subCategories.slice(0, 8).map(subCat => (
                <li key={subCat.name}>
                  <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                    {subCat.name}
                  </Link>
                </li>
              ))
            ))
          }
        </ul>
        
        <h3 className="text-primary-400 font-heading font-semibold mb-3 mt-6 text-base">PLAYER SUPPORT</h3>
        <ul className="space-y-2">
          {categorySystem
            .filter(cat => cat.mainCategory === 'player')
            .map(category => (
              category.subCategories.slice(0, 5).map(subCat => (
                <li key={subCat.name}>
                  <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                    {subCat.name}
                  </Link>
                </li>
              ))
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default CategoriesDropdown