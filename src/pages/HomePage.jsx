import { useEffect } from 'react'
import FeaturedCarousel from '../components/home/FeaturedCarousel'
import GameList from '../components/home/GameList'
import { gameCollection } from '../data/games'

const HomePage = () => {
  useEffect(() => {
    // Set document title when component mounts
    document.title = 'Stitch - Discover Indie Games'
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-heading font-bold text-white mb-4">FEATURED &amp; RECOMMENDED</h2>
      <FeaturedCarousel games={gameCollection.featured} />
      
      <GameList gameCollections={gameCollection} />
      
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
  )
}

export default HomePage