import { useState, useEffect, useRef } from 'react'

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
      
      {/* Game List */}
      <div className="bg-gray-600 rounded-b-lg">
        {getActiveGames().map(game => (
          <div 
            key={game.id}
            className={`flex items-center p-4 hover:bg-gray-500 transition-colors border-b border-gray-700 last:border-b-0 cursor-pointer ${
              hoveredGameId === game.id ? 'bg-gray-500' : ''
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
            <div className="flex-1">
              <h3 className="font-medium text-lg mb-1">{game.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span>{new Date(game.publishDate).toLocaleDateString()}</span>
                <span>•</span>
                <span>{game.reviews.count} reviews</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameList