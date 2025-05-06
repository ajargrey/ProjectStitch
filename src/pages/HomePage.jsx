import { useEffect, useState, useRef, useCallback } from 'react'
import FeaturedCarousel from '../components/home/FeaturedCarousel'
import GameList from '../components/home/GameList'
import GameDetailsPanel from '../components/home/GameDetailsPanel'
import { gameCollection } from '../data/games'

const HomePage = () => {
  const [selectedGame, setSelectedGame] = useState(gameCollection.featured[0])
  const [hoveredGame, setHoveredGame] = useState(null)
  const initialLoadRef = useRef(true)

  useEffect(() => {
    document.title = 'Stitch - Discover Indie Games'
    console.log('HomePage: Initial game:', selectedGame.title, selectedGame.id)
    const timer = setTimeout(() => {
      initialLoadRef.current = false
      console.log("HomePage: Initial load flag set to false.")
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedGame.id, selectedGame.title])

  const handleGameSelect = useCallback((game) => {
    if (initialLoadRef.current) {
      console.log("HomePage: Skipping handleGameSelect during initial load phase.");
      return;
    }
    console.log('HomePage: handleGameSelect called with:', game ? `${game.title} (${game.id})` : 'null');
    
    if (game) {
      setSelectedGame(game)
      setHoveredGame(game)
    } else {
      console.warn("HomePage: handleGameSelect called with null game. This shouldn't normally happen from carousel.")
    }
  }, []);

  const handleGameHover = useCallback((game) => {
    if (initialLoadRef.current) {
       console.log("HomePage: Skipping handleGameHover during initial load phase.");
       return;
    }
    console.log('HomePage: handleGameHover called with:', game ? `${game.title} (${game.id})` : 'null');
    setHoveredGame(game);
  }, []);

  const gameToDisplay = hoveredGame || selectedGame
  
  console.log('HomePage: Game to display:', gameToDisplay.title, gameToDisplay.id);

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-[1520px]">
        <div className="w-[240px] flex-shrink-0" />
        <div className="flex-1 px-4">
          <div className="max-w-[1080px]">
            <FeaturedCarousel 
              games={gameCollection.featured} 
              onGameSelect={handleGameSelect}
            />
            
            <GameList 
              gameCollections={gameCollection} 
              onGameSelect={handleGameHover}
            />
            
            <div className="my-8">
              <h2 className="text-2xl font-heading font-bold text-white mb-4">SPECIAL OFFERS</h2>
              <div className="bg-gradient-to-r from-accent-700 to-accent-900 p-6 rounded-lg">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-heading font-bold mb-2">Spring Sale</h3>
                    <p className="text-lg">Save up to 90% on thousands of indie games!</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="btn btn-primary px-6 py-3">View All Deals</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[320px] flex-shrink-0">
          <div className="fixed top-[4rem] right-0 w-[320px] h-[calc(100vh-4rem)] bg-gray-800">
            <GameDetailsPanel 
              key={gameToDisplay.id} 
              game={gameToDisplay} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage