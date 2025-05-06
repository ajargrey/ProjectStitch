import { useState, useEffect, useRef } from 'react'
import { FaWindows, FaApple, FaLinux } from 'react-icons/fa'
import { formatPrice } from '../../utils/formatters'

const GameDetailsPanel = ({ game }) => {
  const panelRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const timerRef = useRef(null)
  const [isGifPlaying, setIsGifPlaying] = useState(false)

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTop = 0
    }
  }, [game])

  useEffect(() => {
    if (!game) return

    // Reset slideshow when game changes
    setCurrentSlide(0)
    setIsGifPlaying(false)
    
    // Get all media items (thumbnail + screenshots)
    const allMedia = [game.media.thumbnail, ...game.media.screenshots]
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
      clearTimeout(timerRef.current)
    }

    const startSlideshow = () => {
      // Check if current media is a GIF
      const currentMedia = allMedia[currentSlide]
      const isGif = currentMedia.toLowerCase().endsWith('.gif')
      
      if (isGif) {
        setIsGifPlaying(true)
        // For GIFs, we'll wait for the GIF to complete before moving to next slide
        timerRef.current = setTimeout(() => {
          setIsGifPlaying(false)
          setCurrentSlide(prev => {
            const next = prev + 1
            return next >= allMedia.length ? 0 : next
          })
        }, 5000) // Assuming GIFs take around 5 seconds to play
      } else {
        // For non-GIFs, use the regular 1-second interval
        timerRef.current = setInterval(() => {
          setCurrentSlide(prev => {
            const next = prev + 1
            return next >= allMedia.length ? 0 : next
          })
        }, 1000)
      }
    }

    startSlideshow()

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        clearTimeout(timerRef.current)
      }
    }
  }, [game])

  // Separate effect to handle slide changes
  useEffect(() => {
    if (!game) return

    const allMedia = [game.media.thumbnail, ...game.media.screenshots]
    const currentMedia = allMedia[currentSlide]
    const isGif = currentMedia.toLowerCase().endsWith('.gif')

    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
      clearTimeout(timerRef.current)
    }

    if (isGif) {
      setIsGifPlaying(true)
      timerRef.current = setTimeout(() => {
        setIsGifPlaying(false)
        setCurrentSlide(prev => {
          const next = prev + 1
          return next >= allMedia.length ? 0 : next
        })
      }, 5000)
    } else {
      timerRef.current = setInterval(() => {
        setCurrentSlide(prev => {
          const next = prev + 1
          return next >= allMedia.length ? 0 : next
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        clearTimeout(timerRef.current)
      }
    }
  }, [currentSlide, game])

  if (!game) return null
  
  const allMedia = [game.media.thumbnail, ...game.media.screenshots]
  const currentImage = allMedia[currentSlide]
  
  return (
    <div ref={panelRef} className="h-full overflow-y-auto bg-gray-900 w-[320px]">
      <div className="space-y-4 w-full">
        {/* Game Title */}
        <div className="px-6 pt-4">
          <h2 className="text-2xl font-heading font-bold mb-2">{game.title}</h2>
        </div>

        {/* Slideshow */}
        <div className="px-6">
          <div 
            className="relative w-full bg-gray-800 rounded-lg overflow-hidden aspect-[16/9]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={currentImage}
                alt={game.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Small Description */}
        <div className="px-6">
          <p className="text-gray-300 text-sm">{game.smallDescription}</p>
        </div>

        {/* Reviews */}
        <div className="px-6">
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

        {/* Tags */}
        <div className="px-6">
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

        {/* Main Thumbnail */}
        <div className="px-6">
          <div className="relative w-full bg-gray-800 rounded-lg overflow-hidden">
            <div className="flex items-center justify-center">
              <img 
                src={game.media.thumbnail}
                alt={game.title}
                className="w-full h-auto object-contain max-h-[300px]"
              />
            </div>
          </div>
        </div>

        {/* Media Grid */}
        <div className="px-6">
          <div className="grid grid-cols-1 gap-2">
            {game.media.screenshots.map((screenshot, idx) => (
              <div key={idx} className="relative w-full bg-gray-800 rounded-lg overflow-hidden">
                <div className="flex items-center justify-center">
                  <img 
                    src={screenshot}
                    alt={`${game.title} screenshot ${idx + 1}`}
                    className="w-full h-auto object-contain max-h-[200px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameDetailsPanel