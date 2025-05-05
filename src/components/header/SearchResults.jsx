import { FaWindows, FaApple, FaLinux } from 'react-icons/fa'
import { formatPrice } from '../../utils/formatters'

const SearchResults = ({ results }) => {
  const { games, tags } = results
  
  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-gray-800 rounded-md shadow-lg z-20 animate-fade-in overflow-hidden">
      {/* Games results */}
      <div className="p-2">
        {games.map(game => (
          <div key={game.id} className="search-result-item">
            <img 
              src={game.media.thumbnail} 
              alt={game.title}
              className="w-12 h-12 object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium text-sm">{game.title}</h4>
              <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                  {game.platforms.includes('windows') && <FaWindows className="platform-icon" />}
                  {game.platforms.includes('mac') && <FaApple className="platform-icon" />}
                  {game.platforms.includes('linux') && <FaLinux className="platform-icon" />}
                </div>
                <span className="text-sm">
                  {game.pricing.currentPrice === 0 
                    ? 'Free' 
                    : formatPrice(game.pricing.currentPrice)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Tags results */}
      {tags.length > 0 && (
        <div className="border-t border-gray-700 p-2">
          <h4 className="text-xs text-gray-400 uppercase mb-2">Tags</h4>
          {tags.map(tag => (
            <div key={tag.name} className="search-result-item">
              <div className="flex-1 flex justify-between">
                <span className="text-sm">{tag.name}</span>
                <span className="text-xs text-gray-400">{tag.count} games</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchResults