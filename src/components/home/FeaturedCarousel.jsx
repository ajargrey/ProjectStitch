import { useState, useEffect, useRef } from 'react'
import { FaWindows, FaApple, FaLinux, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { formatPrice } from '../../utils/formatters'

const FeaturedCarousel = ({ games, onGameSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)
  const isInitialMount = useRef(true)
  const currentIndexRef = useRef(currentIndex)

  useEffect(() => {
    currentIndexRef.current = currentIndex
    console.log(`FeaturedCarousel: currentIndex state updated to ${currentIndex}`)
  }, [currentIndex])

  const changeSlideIndex = (newIndex) => {
    console.log(`FeaturedCarousel: Attempting to change slide index to ${newIndex} (${games[newIndex]?.title})`)
    setCurrentIndex(newIndex)
  }

  const triggerSelectionUpdate = (index) => {
    if (games[index]) {
      console.log(`FeaturedCarousel: Triggering onGameSelect for index ${index} (${games[index].title})`)
      onGameSelect(games[index])
    } else {
      console.error(`FeaturedCarousel: Attempted to trigger selection for invalid index ${index}`)
    }
  }

  const clearAllTimers = () => {
    clearInterval(intervalRef.current)
    clearTimeout(timeoutRef.current)
    intervalRef.current = null
    timeoutRef.current = null
    console.log("FeaturedCarousel: Cleared all timers.")
  }

  const startAutoAdvanceInterval = (delay = 5000) => {
    clearAllTimers()
    console.log(`FeaturedCarousel: Starting auto-advance interval (${delay / 1000}s)`)
    intervalRef.current = setInterval(() => {
      console.log("FeaturedCarousel: Auto-advance tick")
      const newSlideIndex = (currentIndexRef.current + 1) % games.length
      changeSlideIndex(newSlideIndex)
    }, delay)
  }

  const handleManualNavigation = (directionOrIndex) => {
    console.log(`FeaturedCarousel: handleManualNavigation - ${typeof directionOrIndex === 'string' ? directionOrIndex : `index ${directionOrIndex}`}`)
    clearAllTimers()

    let newSlideIndex
    if (typeof directionOrIndex === 'string') {
      if (directionOrIndex === 'next') {
        newSlideIndex = (currentIndex + 1) % games.length
      } else {
        newSlideIndex = currentIndex === 0 ? games.length - 1 : currentIndex - 1
      }
    } else {
      newSlideIndex = directionOrIndex
    }

    if (newSlideIndex === currentIndex) {
      console.log("FeaturedCarousel: Manual navigation to current index, no change needed.")
      triggerSelectionUpdate(newSlideIndex)
    } else {
      changeSlideIndex(newSlideIndex)
      triggerSelectionUpdate(newSlideIndex)
    }
    
    console.log("FeaturedCarousel: Setting timeout to restart auto-advance (15s) after manual navigation")
    timeoutRef.current = setTimeout(() => {
      if (!isPaused) {
        console.log("FeaturedCarousel: Timeout expired, resuming auto-advance.")
        startAutoAdvanceInterval()
      } else {
        console.log("FeaturedCarousel: Timeout expired, but carousel is paused. Auto-advance not restarting.")
      }
    }, 15000)
  }

  useEffect(() => {
    if (isInitialMount.current) {
      return
    }
    console.log(`FeaturedCarousel: Pause state changed to: ${isPaused}`)
    if (isPaused) {
      console.log("FeaturedCarousel: Paused - Clearing timers.")
      clearAllTimers()
    } else {
      console.log("FeaturedCarousel: Resumed - Restarting auto-advance.")
      startAutoAdvanceInterval()
    }
  }, [isPaused])

  useEffect(() => {
    console.log(`FeaturedCarousel: Initial Mount - Selecting index ${currentIndex} (${games[currentIndex]?.title})`)
    triggerSelectionUpdate(currentIndex)

    startAutoAdvanceInterval()
    
    isInitialMount.current = false

    return () => {
      console.log("FeaturedCarousel: Unmounting - Clearing all timers.")
      clearAllTimers()
    }
  }, [])

  const currentGame = games[currentIndex]
  if (!currentGame) {
    console.error("FeaturedCarousel: currentGame is undefined!", currentIndex, games)
    return <div className="w-full bg-gray-900 mb-8 mt-8 text-white p-4">Error: No game data available for carousel.</div>
  }

  return (
    <div className="w-full bg-gray-900 mb-8 mt-8">
      <div className="flex flex-col w-full">
        <h2 className="text-2xl font-heading font-bold text-white mb-4">FEATURED &amp; RECOMMENDED</h2>
        
        <div className="w-full h-[360px] bg-gray-800 rounded-lg overflow-hidden relative">
          {/* Game Container */}
          <div 
            className="absolute inset-0"
            onMouseEnter={() => {
              console.log("FeaturedCarousel: MouseEnter - Pausing")
              setIsPaused(true)
            }}
            onMouseLeave={() => {
              console.log("FeaturedCarousel: MouseLeave - Resuming")
              setIsPaused(false)
            }}
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
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={currentGame.media.banner}
                alt={currentGame.title}
                className="max-h-full max-w-full object-contain"
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
            onClick={() => handleManualNavigation('prev')}
            aria-label="Previous slide"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>

          {/* Pagination Dots */}
          <div className="flex space-x-2">
            {games.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleManualNavigation(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-white w-4' : 'bg-gray-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            className="w-12 h-12 flex items-center justify-center bg-gray-800/70 hover:bg-gray-700/90 rounded-full text-white transition-all duration-200"
            onClick={() => handleManualNavigation('next')}
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