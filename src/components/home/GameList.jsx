import { useState, useEffect } from 'react'
import { FaWindows, FaApple, FaLinux } from 'react-icons/fa'
import { formatDate, formatPrice } from '../../utils/formatters'
import GameListHover from './GameListHover'

const GameList = ({ gameCollections }) => {
  const [activeTab, setActiveTab] = useState('newAndTrending')
  const [hoveredGame, setHoveredGame] = useState(null)
  
  // Set first game as default hovered game when tab changes or component mounts
  useEffect(() => {
    const activeGames = getActiveGames()
    if (activeGames.length > 0) {
      setHoveredGame(activeGames[0].id)
    }
  }, [activeTab])

  const getActiveGames = () => {
    switch (activeTab) {
      case 'newAndTrending':
        return gameCollections.newAndTrending
      case 'topSellers':
        return gameCollections.topSellers
      case 'trendingFree':
        return gameCollections.trendingFree
      default:
        return gameCollections.newAndTrending
    }
  }

  const isGif = (url) => {
    return url.toLowerCase().endsWith('.gif')
  }
  
  return (
    <div className="my-12">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700">
        <button
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === 'newAndTrending'
              ? 'bg-gray-600 text-white rounded-t-md'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('newAndTrending')}
        >
          New &amp; Trending
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === 'topSellers'
              ? 'bg-gray-600 text-white rounded-t-md'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('topSellers')}
        >
          Top Sellers
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === 'trendingFree'
              ? 'bg-gray-600 text-white rounded-t-md'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('trendingFree')}
        >
          Trending Free
        </button>
      </div>
      
      {/* Game List and Hover Details */}
      <div className="flex gap-6">
        {/* Game List */}
        <div className="w-[70%] bg-gray-600 rounded-b-lg">
          {getActiveGames().map(game => (
            <div 
              key={game.id}
              className={`flex items-center p-2 hover:bg-gray-500 transition-colors border-b border-gray-700 last:border-b-0 cursor-pointer ${
                hoveredGame === game.id ? 'bg-gray-500' : ''
              }`}
              onMouseEnter={() => setHoveredGame(game.id)}
            >
              <div className="w-48 h-24 flex-shrink-0">
                <img
                  src={game.media.thumbnail}
                  alt={game.title}
                  className={`w-full h-full object-cover rounded ${
                    isGif(game.media.thumbnail) ? 'gif-pause hover:gif-play' : ''
                  }`}
                />
              </div>
              
              <div className="flex-grow px-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-medium text-lg text-white">{game.title}</h3>
                    <div className="flex items-center space-x-2 text-gray-400">
                      {game.platforms.includes('windows') && <FaWindows />}
                      {game.platforms.includes('mac') && <FaApple />}
                      {game.platforms.includes('linux') && <FaLinux />}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {game.pricing.discountPercentage > 0 && (
                        <span className="bg-green-600 text-white px-2 py-0.5 rounded text-sm">
                          -{game.pricing.discountPercentage}%
                        </span>
                      )}
                      {game.pricing.basePrice !== game.pricing.currentPrice && (
                        <span className="text-gray-400 line-through text-sm">
                          {formatPrice(game.pricing.basePrice)}
                        </span>
                      )}
                      <span className="text-white font-medium">
                        {game.pricing.currentPrice === 0 
                          ? 'Free' 
                          : formatPrice(game.pricing.currentPrice)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {formatDate(game.publishDate)}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {game.tags.slice(0, 4).map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs text-gray-300 bg-gray-700 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hover Details Panel */}
        <div className="w-[30%] bg-gray-500 rounded-lg p-4 h-fit sticky top-4">
          <GameListHover 
            game={getActiveGames().find(g => g.id === hoveredGame) || getActiveGames()[0]} 
          />
        </div>
      </div>
    </div>
  )
}

export default GameList