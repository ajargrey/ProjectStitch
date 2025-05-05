import { useState, useEffect, useRef } from 'react'
import { FaWindows, FaApple, FaLinux, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { formatPrice } from '../../utils/formatters'

const FeaturedCarousel = ({ games }) => {
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

  const currentGame = games[currentIndex]
  const isGif = (url) => url.toLowerCase().endsWith('.gif')

  return (
    <div className="w-full aspect-[2.5/1] relative bg-gray-900">
      <div className="absolute inset-0 flex justify-center">
        <div className="w-[1080px] h-full relative flex flex-col">
          <h2 className="text-2xl font-heading font-bold text-white mb-4">FEATURED &amp; RECOMMENDED</h2>
          
          <div className="relative flex items-center">
            {/* Navigation Buttons */}
            <button 
              className="absolute -left-20 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-gray-800/70 hover:bg-gray-700/90 rounded-full text-white transition-all duration-200"
              onClick={() => handleManualNav('prev')}
              aria-label="Previous slide"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>

            <button 
              className="absolute -right-20 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-gray-800/70 hover:bg-gray-700/90 rounded-full text-white transition-all duration-200"
              onClick={() => handleManualNav('next')}
              aria-label="Next slide"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>

            {/* Game Container */}
            <div 
              className="w-full h-[432px] bg-gray-600/90 rounded-lg overflow-hidden flex"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Main Image */}
              <div className="w-[602px] h-[432px] relative">
                <img 
                  src={currentGame.media.banner}
                  alt={currentGame.title}
                  className={`w-full h-full object-cover ${
                    isGif(currentGame.media.banner) ? 'gif-pause hover:gif-play' : ''
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-transparent" />
              </div>

              {/* Content Wrapper */}
              <div className="flex-1 p-6 flex flex-col bg-gray-500/95">
                <h2 className="text-2xl font-heading font-bold mb-4">{currentGame.title}</h2>

                {/* Media Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {currentGame.media.screenshots.slice(0, 4).map((screenshot, idx) => (
                    <img 
                      key={idx} 
                      src={screenshot} 
                      alt={`${currentGame.title} screenshot ${idx + 1}`}
                      className={`w-[158px] h-[89px] object-cover rounded cursor-pointer hover:opacity-80 transition-opacity ${
                        isGif(screenshot) ? 'gif-pause hover:gif-play' : ''
                      }`}
                      onMouseEnter={() => {
                        const mainImage = document.querySelector('.main-game-image');
                        if (mainImage) {
                          mainImage.src = screenshot;
                        }
                      }}
                      onMouseLeave={() => {
                        const mainImage = document.querySelector('.main-game-image');
                        if (mainImage) {
                          mainImage.src = currentGame.media.banner;
                        }
                      }}
                    />
                  ))}
                </div>

                {/* Tags Section */}
                <div className="mt-auto">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                      Now Available
                    </span>
                    {currentGame.reviews.score >= 80 && (
                      <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                        Top Seller
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-3 mb-3">
                    {currentGame.platforms.includes('windows') && <FaWindows className="text-gray-300 text-lg" />}
                    {currentGame.platforms.includes('mac') && <FaApple className="text-gray-300 text-lg" />}
                    {currentGame.platforms.includes('linux') && <FaLinux className="text-gray-300 text-lg" />}
                  </div>

                  <div className="flex items-center space-x-2">
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
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
    </div>
  )
}

export default FeaturedCarousel