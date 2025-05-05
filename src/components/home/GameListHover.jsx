import { useState } from 'react'
import { FaWindows, FaApple, FaLinux } from 'react-icons/fa'
import { formatPrice } from '../../utils/formatters'

const GameListHover = ({ game }) => {
  const [activeTab, setActiveTab] = useState('about')
  
  if (!game) return null;
  
  return (
    <div className="flex flex-col animate-fade-in">
      <h3 className="font-heading font-medium text-xl mb-4">{game.title}</h3>
      
      <div className="flex mb-3">
        <div className="flex-1">
          <div className="flex mb-1">
            <span className="text-sm font-medium text-gray-300">User Reviews:</span>
            <span 
              className={`text-sm font-medium ml-2 ${
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
          </div>
          <div className="text-sm text-gray-400">({game.reviews.count} reviews)</div>
        </div>
        
        <div className="flex items-center space-x-2">
          {game.platforms.includes('windows') && <FaWindows className="text-gray-400" />}
          {game.platforms.includes('mac') && <FaApple className="text-gray-400" />}
          {game.platforms.includes('linux') && <FaLinux className="text-gray-400" />}
        </div>
      </div>
      
      {/* Screenshots */}
      <div className="grid grid-cols-1 gap-2 mb-4">
        {game.media.screenshots.slice(0, 3).map((screenshot, idx) => (
          <img 
            key={idx} 
            src={screenshot} 
            alt={`${game.title} screenshot ${idx + 1}`}
            className="w-full h-32 object-cover rounded"
          />
        ))}
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {game.tags.map(tag => (
          <span 
            key={tag} 
            className="text-xs text-gray-400 bg-gray-700 px-2 py-0.5 rounded hover:bg-gray-600 cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* Price */}
      <div className="mt-auto">
        <div className="flex items-center space-x-2">
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
          <span className="text-white font-medium text-lg">
            {game.pricing.currentPrice === 0 
              ? 'Free to Play' 
              : formatPrice(game.pricing.currentPrice)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default GameListHover