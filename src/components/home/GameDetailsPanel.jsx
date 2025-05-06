import { useState, useEffect, useRef } from 'react'
import { FaWindows, FaApple, FaLinux } from 'react-icons/fa'
import { formatPrice } from '../../utils/formatters'

const GameDetailsPanel = ({ game }) => {
  console.log(`GameDetailsPanel rendering for game: ${game ? game.title : 'null'} (${game ? game.id : 'null'})`)
  
  const panelRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const timerRef = useRef(null)
  const [isGifPlaying, setIsGifPlaying] = useState(false)
  const gameIdRef = useRef(game ? game.id : null)

  // Reset panel position when game changes
  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTop = 0
    }
    
    // Force reset internal state if game changed
    const newGameId = game ? game.id : null; // Safely get new game id
    if (gameIdRef.current !== newGameId) {
      console.log(`GameDetailsPanel: Game changed from ${gameIdRef.current} to ${newGameId}`)
      gameIdRef.current = newGameId
      setCurrentSlide(0)
      setIsGifPlaying(false)
    }
  }, [game])

  // Slideshow effect
  useEffect(() => {
    if (!game) return
    console.log(`GameDetailsPanel: Starting slideshow for ${game.title}`)

    // Reset slideshow when game changes
    setCurrentSlide(0)
    setIsGifPlaying(false)
    
    // Get all media items (screenshots first, then thumbnail)
    const allMedia = [...game.media.screenshots, game.media.thumbnail]
    if (allMedia.length <= 1) {
        console.log("GameDetailsPanel: Not starting slideshow, only one media item.");
        return; // Don't start interval if only one item
    }
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
      clearTimeout(timerRef.current)
    }

    const startSlideshow = () => {
      // Check if current media is a GIF
      const currentMedia = allMedia[currentSlide]
      if (!currentMedia) { // Safety check
        console.error("GameDetailsPanel: currentMedia is undefined in startSlideshow", currentSlide, allMedia);
        return; 
      }
      const isGif = currentMedia.toLowerCase().endsWith('.gif')
      
      if (isGif) {
        setIsGifPlaying(true)
        // For GIFs, we'll wait for the GIF to complete before moving to next slide
        timerRef.current = setTimeout(() => {
          setIsGifPlaying(false)
          setCurrentSlide(prev => {
            const next = (prev + 1) % allMedia.length // Use modulo for looping
            return next
          })
        }, 5000) // Assuming GIFs take around 5 seconds to play
      } else {
        // For non-GIFs, use the regular 1-second interval
        timerRef.current = setInterval(() => {
          setCurrentSlide(prev => {
            const next = (prev + 1) % allMedia.length // Use modulo for looping
            return next
          })
        }, 1000)
      }
    }

    // Start the slideshow only if there's more than one item
    startSlideshow()

    return () => {
      console.log(`GameDetailsPanel: Cleaning up slideshow for ${game.title}`)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        clearTimeout(timerRef.current)
      }
    }
  // Rerun effect when game changes
  }, [game]) 

  // Separate effect to handle slide changes and timer logic
  useEffect(() => {
    if (!game) return

    // Construct media array (screenshots first, then thumbnail)
    const allMedia = [...game.media.screenshots, game.media.thumbnail]
    if (allMedia.length <= 1) return; // No slideshow needed for single item
    
    const currentMedia = allMedia[currentSlide];
    if (!currentMedia) { // Safety check
        console.error("GameDetailsPanel: currentMedia is undefined in slide change effect", currentSlide, allMedia);
        return; 
    }
    const isGif = currentMedia.toLowerCase().endsWith('.gif')

    // Clear any existing timer before setting a new one
    if (timerRef.current) {
      clearInterval(timerRef.current)
      clearTimeout(timerRef.current)
      timerRef.current = null; // Explicitly nullify
    }
    
    console.log(`GameDetailsPanel: Setting timer for slide ${currentSlide} (${currentMedia.split('/').pop()}), isGif: ${isGif}`);

    if (isGif) {
      setIsGifPlaying(true)
      timerRef.current = setTimeout(() => {
        setIsGifPlaying(false)
        setCurrentSlide(prev => (prev + 1) % allMedia.length)
      }, 5000)
    } else {
      // Ensure isGifPlaying is false for non-gifs
      if(isGifPlaying) setIsGifPlaying(false);
      timerRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % allMedia.length)
      }, 1000)
    }

    // Cleanup function for this specific effect run
    return () => {
       console.log(`GameDetailsPanel: Cleaning up timer for slide ${currentSlide}`);
      if (timerRef.current) {
        clearInterval(timerRef.current)
        clearTimeout(timerRef.current)
        timerRef.current = null;
      }
    }
  // Rerun effect when the current slide or the game itself changes
  }, [currentSlide, game, isGifPlaying]) 

  if (!game) return null
  
  // Construct media array for rendering (screenshots first, then thumbnail)
  const allMediaForRender = [...game.media.screenshots, game.media.thumbnail]
  // Handle cases where there might be no screenshots or thumbnail
  const currentImage = allMediaForRender[currentSlide] || game.media.thumbnail || '' // Fallback
  if (!currentImage) {
     console.warn(`GameDetailsPanel: No valid currentImage found for slide ${currentSlide} in game ${game.id}`);
  }
  
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
            className="relative w-full bg-gray-800 rounded-lg overflow-hidden aspect-square"
          >
            {/* Blurred background image */}
            <div className="absolute inset-0">
              <img 
                src={currentImage}
                alt=""
                className="w-full h-full object-cover blur-sm scale-110"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
            
            {/* Main image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={currentImage}
                alt={game.title}
                className="max-w-full max-h-full object-contain z-10"
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
            {/* Blurred background image */}
            <div className="absolute inset-0">
              <img 
                src={game.media.thumbnail}
                alt=""
                className="w-full h-full object-cover blur-sm scale-110"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
            
            <div className="relative flex items-center justify-center z-10">
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
                {/* Blurred background image */}
                <div className="absolute inset-0">
                  <img 
                    src={screenshot}
                    alt=""
                    className="w-full h-full object-cover blur-sm scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                
                <div className="relative flex items-center justify-center z-10">
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