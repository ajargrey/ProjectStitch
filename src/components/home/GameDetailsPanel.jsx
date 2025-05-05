import { useState } from 'react'
import { FaWindows, FaApple, FaLinux } from 'react-icons/fa'
import { formatPrice } from '../../utils/formatters'

const GameDetailsPanel = ({ game }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  
  if (!game) return null
  
  return (
    <div className="h-[calc(100vh-8rem)] sticky top-[8rem] overflow-y-auto">
      <div className="space-y-4">
        {/* Game Title and Reviews */}
        <div className="px-6 pt-4">
          <h2 className="text-2xl font-heading font-bold mb-2">{game.title}</h2>
          <div className="flex items-center space-x-2">
            <span 
              className={`text-sm font-medium ${
                game.reviews.score >= 80 
                  ? 'text-success-500' 
                  : game.reviews.score >= 60 
                  ? 'text-warning-500' 
                  : 'text-error-500'
              }`}
            >
              {game.reviews.score >= 80 
                ? 'Very Positive' 
                : game.reviews.score >= 60 
                ? 'Mostly Positive' 
                : 'Mixed'}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-400">
              {game.reviews.count} reviews
            </span>
          </div>
        </div>

        {/* Main Image */}
        <div>
          <img 
            src={selectedImage || game.media.thumbnail}
            alt={game.title}
            className="w-full aspect-video object-cover"
          />
        </div>

        {/* Media Grid */}
        <div className="px-6">
          <div className="grid grid-cols-1 gap-2">
            {game.media.screenshots.map((screenshot, idx) => (
              <img 
                key={idx}
                src={screenshot}
                alt={`${game.title} screenshot ${idx + 1}`}
                className="w-full aspect-video object-cover cursor-pointer hover:opacity-80 transition-opacity"
                onMouseEnter={() => setSelectedImage(screenshot)}
                onMouseLeave={() => setSelectedImage(null)}
              />
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="px-6">
          <h3 className="font-medium mb-2">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {game.tags.map(tag => (
              <span 
                key={tag}
                className="px-2 py-1 bg-gray-700 rounded-md text-sm text-gray-300 hover:bg-gray-600 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Platforms and Price */}
        <div className="px-6 pb-6 space-y-4">
          <div className="flex items-center space-x-3">
            {game.platforms.includes('windows') && <FaWindows className="text-gray-300 text-lg" />}
            {game.platforms.includes('mac') && <FaApple className="text-gray-300 text-lg" />}
            {game.platforms.includes('linux') && <FaLinux className="text-gray-300 text-lg" />}
          </div>

          <div className="flex items-center space-x-2">
            {game.pricing.discountPercentage > 0 && (
              <span className="bg-green-600 text-white px-2 py-0.5 rounded text-sm font-bold">
                -{game.pricing.discountPercentage}%
              </span>
            )}
            {game.pricing.basePrice !== game.pricing.currentPrice && (
              <span className="text-gray-400 line-through">
                {formatPrice(game.pricing.basePrice)}
              </span>
            )}
            <span className="text-xl font-bold">
              {game.pricing.currentPrice === 0 
                ? 'Free to Play' 
                : formatPrice(game.pricing.currentPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameDetailsPanel