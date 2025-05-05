import { useEffect, useState } from 'react'
import FeaturedCarousel from '../components/home/FeaturedCarousel'
import GameList from '../components/home/GameList'
import GameDetailsPanel from '../components/home/GameDetailsPanel'
import { gameCollection } from '../data/games'

const HomePage = () => {
  const [selectedGame, setSelectedGame] = useState(gameCollection.featured[0])

  useEffect(() => {
    document.title = 'Stitch - Discover Indie Games'
  }, [])

  return (
    <div className="flex">
      <div className="flex-1 max-w-[1520px] px-4">
        <FeaturedCarousel 
          games={gameCollection.featured} 
          onGameSelect={setSelectedGame}
        />
        
        <GameList 
          gameCollections={gameCollection} 
          onGameSelect={setSelectedGame}
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

      <div className="w-[400px] bg-gray-800">
        <GameDetailsPanel game={selectedGame} />
      </div>
    </div>
  )
}

export default HomePage