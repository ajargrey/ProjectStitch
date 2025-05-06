import { useState, useEffect, useRef } from 'react'
import { FaWindows, FaApple, FaLinux } from 'react-icons/fa'
import { formatPrice } from '../../utils/formatters'

const GameList = ({ gameCollections, onGameSelect }) => {
  const [activeTab, setActiveTab] = useState('newAndTrending')
  const [hoveredGameId, setHoveredGameId] = useState(null)
  const initialLoadRef = useRef(true)
  
  // Effect to reset internal hover state when tab changes
  useEffect(() => {
    // Skip effect on initial mount
    if (initialLoadRef.current) {
      console.log("GameList: Initial mount - Skipping effect.")
      initialLoadRef.current = false;
      return;
    }
    
    console.log(`GameList: Active tab changed to ${activeTab}. Resetting internal hover state.`);
    setHoveredGameId(null) // Reset internal hover highlight when tab changes
    // DO NOT call onGameSelect here - this caused the bug

  }, [activeTab]); // Only run when activeTab changes

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
  
  // Helper to format dates
  const formatDate = (date) => {
    if (!date) return null;
    // Example format: 5 May, 2025
    return new Date(date).toLocaleDateString('en-GB', { 
      day: 'numeric', month: 'short', year: 'numeric' 
    }); 
  };

  return (
    <div className="my-12">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700 mb-0">
        <button
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === 'newAndTrending'
              ? 'bg-gray-700 text-white rounded-t-md'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('newAndTrending')}
        >
          New &amp; Trending
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === 'topSellers'
              ? 'bg-gray-700 text-white rounded-t-md'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('topSellers')}
        >
          Top Sellers
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === 'trendingFree'
              ? 'bg-gray-700 text-white rounded-t-md'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('trendingFree')}
        >
          Trending Free
        </button>
      </div>
      
      {/* Game List Container - Use slightly darker bg for contrast */}
      <div className="bg-gray-800 rounded-b-lg overflow-hidden">
        {getActiveGames().map(game => {
          const publishDateFormatted = formatDate(game.publishDate);
          const updateDateFormatted = game.lastUpdate && formatDate(game.lastUpdate);
          const showUpdateDate = updateDateFormatted && updateDateFormatted !== publishDateFormatted;

          return (
            <div 
              key={game.id}
              className={`flex items-center p-2 hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0 cursor-pointer space-x-3 ${
                hoveredGameId === game.id ? 'bg-gray-700' : 'bg-gray-800'
              }`}
              onMouseEnter={() => {
                console.log(`GameList: MouseEnter game: ${game.title} (${game.id})`);
                setHoveredGameId(game.id);
                onGameSelect(game);
              }}
              onMouseLeave={() => {
                console.log(`GameList: MouseLeave game: ${game.title} (${game.id})`);
                setHoveredGameId(null);
                onGameSelect(null);
              }}
            >
              {/* Column 1: Banner */}
              <div className="w-64 h-20 flex-shrink-0 bg-black/20 rounded overflow-hidden relative">
                {/* Blurred Background - Use Banner */}
                <img 
                  src={game.media.banner}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 opacity-50"
                />
                <div className="absolute inset-0 bg-black/30" />
                {/* Actual Banner */}
                <img 
                  src={game.media.banner}
                  alt={`${game.title} banner`}
                  className="relative w-full h-full object-cover z-10"
                />
              </div>

              {/* Column 2: Game Info (Title, Platforms, Tags) */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-lg text-white truncate mb-1">{game.title}</h3>
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  {game.platforms.includes('windows') && <FaWindows title="Windows" className="text-lg" />}
                  {game.platforms.includes('mac') && <FaApple title="Mac OS" className="text-lg" />}
                  {game.platforms.includes('linux') && <FaLinux title="Linux" className="text-lg" />}
                </div>
                <p className="text-xs text-gray-400 truncate">
                  {game.tags.slice(0, 5).join(', ')}
                  {game.tags.length > 5 ? '...' : ''}
                </p>
              </div>

              {/* Column 3: Price & Dates */}
              <div className="flex flex-col items-end text-xs text-gray-400 space-y-1 w-36 text-right flex-shrink-0">
                {/* Price Section */}
                <div className="flex items-center justify-end space-x-2 h-6">
                  {game.pricing.discountPercentage > 0 && (
                    <span className="bg-success-600 text-white text-sm font-bold px-1.5 py-0.5 rounded">
                      -{game.pricing.discountPercentage}%
                    </span>
                  )}
                  <div className="flex flex-col items-end">
                    {game.pricing.discountPercentage > 0 && (
                      <span className="text-gray-500 line-through text-xs">
                        {formatPrice(game.pricing.basePrice)}
                      </span>
                    )}
                    <span className="text-white text-sm font-medium">
                      {game.pricing.currentPrice === 0 
                        ? 'Free to Play' 
                        : formatPrice(game.pricing.currentPrice)}
                    </span>
                  </div>
                </div>
                
                {/* Dates Section - ensure consistent space even if date missing */}
                <div className="h-4">
                  {showUpdateDate && (
                    <span title={`Last Updated: ${updateDateFormatted}`}>Updated: {updateDateFormatted}</span>
                  )}
                </div>
                <div className="h-4">
                  {publishDateFormatted && (
                    <span title={`Published: ${publishDateFormatted}`}>{publishDateFormatted}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default GameList