import { useState, useEffect, useRef } from 'react'
import { FaWindows, FaApple, FaLinux, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { formatPrice } from '../../utils/formatters'

const FeaturedCarousel = ({ games, onGameSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex === 0 ? games.length - 1 : prevIndex - 1)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const handleManualNav = (direction) => {
    if (direction === 'next') {
      nextSlide()
    } else {
      prevSlide()
    }
    
    clearInterval(intervalRef.current)
    clearTimeout(timeoutRef.current)
    
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(nextSlide, 5000)
    }, 15000)
  }

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, 5000)
    }
    
    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(timeoutRef.current)
    }
  }, [isPaused])

  useEffect(() => {
    onGameSelect(games[currentIndex])
  }, [currentIndex, games, onGameSelect])

  const currentGame = games[currentIndex]

  return (
    <div className="w-full bg-gray-900 mb-8 mt-8">
      <div className="flex flex-col">
        <h2 className="text-2xl font-heading font-bold text-white mb-4">FEATURED &amp; RECOMMENDED</h2>
        
        <div className="relative">
          {/* Game Container */}
          <div 
            className="w-full h-[360px] bg-gray-800 rounded-lg overflow-hidden group relative"
            onMouseEnter={() => {
              setIsPaused(true)
              onGameSelect(currentGame)
            }}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Blurred Background */}
            <div className="absolute inset-0">
              <img 
                src={currentGame.media.banner}
                alt=""
                className="w-full h-full object-cover blur-xl scale-110"
              />
              <div className="absolute inset-0 bg-gray-900/50" />
            </div>

            {/* Main Image */}
            <div className="relative h-full flex items-center justify-center">
              <img 
                src={currentGame.media.banner}
                alt={currentGame.title}
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent" />

            {/* Game Info (always visible) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-heading font-bold text-white mb-2">{currentGame.title}</h2>
              </div>
              
              <div className="text-right">
                <div className="flex items-center justify-end space-x-2 mb-3">
                  {currentGame.reviews.score >= 80 && (
                    <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                      Top Seller
                    </span>
                  )}
                  <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                    Now Available
                  </span>
                </div>

                <div className="flex items-center justify-end space-x-3 mb-2">
                  {currentGame.platforms.includes('windows') && <FaWindows className="text-gray-300 text-lg" />}
                  {currentGame.platforms.includes('mac') && <FaApple className="text-gray-300 text-lg" />}
                  {currentGame.platforms.includes('linux') && <FaLinux className="text-gray-300 text-lg" />}
                </div>

                <div className="flex items-center justify-end space-x-2">
                  {currentGame.pricing.discountPercentage > 0 && (
                    <span className="bg-green-600 text-white text-base font-bold px-2 py-0.5 rounded">
                      -{currentGame.pricing.discountPercentage}%
                    </span>
                  )}
                  {currentGame.pricing.basePrice !== currentGame.pricing.currentPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      {formatPrice(currentGame.pricing.basePrice)}
                    </span>
                  )}
                  <span className="text-white font-bold text-xl">
                    {currentGame.pricing.currentPrice === 0 
                      ? 'Free to Play' 
                      : formatPrice(currentGame.pricing.currentPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center mt-4 space-x-4">
          <button 
            className="w-12 h-12 flex items-center justify-center bg-gray-800/70 hover:bg-gray-700/90 rounded-full text-white transition-all duration-200"
            onClick={() => handleManualNav('prev')}
            aria-label="Previous slide"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>

          {/* Pagination Dots */}
          <div className="flex space-x-2">
            {games.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-white w-4' : 'bg-gray-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            className="w-12 h-12 flex items-center justify-center bg-gray-800/70 hover:bg-gray-700/90 rounded-full text-white transition-all duration-200"
            onClick={() => handleManualNav('next')}
            aria-label="Next slide"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeaturedCarousel