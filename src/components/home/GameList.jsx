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
        <div className="w-[65%] bg-gray-600 rounded-b-lg">
          {getActiveGames().map(game => (
            <div 
              key={game.id}
              className={`flex items-center p-2 hover:bg-gray-500 transition-colors border-b border-gray-700 last:border-b-0 cursor-pointer ${
                hoveredGame === game.id ? 'bg-gray-500' : ''
              }`}
              onMouseEnter={() => setHoveredGame(game.id)}
            >
              <div className="w-40 h-24 flex-shrink-0">
                <img
                  src={game.media.thumbnail}
                  alt={game.title}
                  className={`w-full h-full object-cover rounded ${
                    isGif(game.media.thumbnail) ? 'gif-pause hover:gif-play' : ''
                  }`}
                />
              </div>
              
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-lg mb-1">{game.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <span>{formatDate(game.publishDate)}</span>
                  <span>•</span>
                  <span>{game.reviews.count} reviews</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hover Details Panel */}
        <div className="w-[35%] bg-gray-500 rounded-lg p-4 h-fit sticky top-4">
          <GameListHover 
            game={getActiveGames().find(g => g.id === hoveredGame) || getActiveGames()[0]} 
          />
        </div>
      </div>
    </div>
  )
}

export default GameList