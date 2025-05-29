import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getGameBySlug } from '../services/gameService'
import { FaWindows, FaApple, FaLinux } from 'react-icons/fa'
import { formatPrice, formatDate } from '../utils/formatters'

const GamePage = () => {
  const { devSlug, gameSlug } = useParams()
  const navigate = useNavigate()
  const game = getGameBySlug(devSlug, gameSlug)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [gameDescription, setGameDescription] = useState(null)
  const [descriptionLoading, setDescriptionLoading] = useState(true)
  const [descriptionError, setDescriptionError] = useState(null)

  // Combine screenshots and videos into a single media array
  const allMedia = [...game?.media.screenshots || [], ...(game?.media.videos || [])]

  useEffect(() => {
    if (!game) {
      navigate('/404')
      return
    }
    
    document.title = `${game.title} - Stitch`

    // Media rotation logic
    if (!isPlaying) return

    const timer = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % allMedia.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(timer)
  }, [game, navigate, allMedia.length, isPlaying])

  useEffect(() => {
    if (!game) return

    const fetchGameDescription = async () => {
      try {
        setDescriptionLoading(true)
        setDescriptionError(null)
        
        // Construct the itch.io URL
        const itchUrl = `https://${game.devSlug}.itch.io/${game.gameSlug}`
        
        // Use CORS proxy to fetch the page
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(itchUrl)}`
        
        const response = await fetch(proxyUrl)
        
        if (!response.ok) {
          throw new Error('Failed to fetch page')
        }
        
        const data = await response.json()
        
        // Parse the HTML content
        const parser = new DOMParser()
        const doc = parser.parseFromString(data.contents, 'text/html')
        
        // Find the description element
        const descriptionElement = doc.querySelector('.formatted_description.user_formatted')
        
        if (descriptionElement) {
          setGameDescription(descriptionElement.innerHTML)
        } else {
          setDescriptionError('Description not found on the page')
        }
        
      } catch (error) {
        console.error('Failed to fetch game description:', error)
        setDescriptionError('Failed to load description')
      } finally {
        setDescriptionLoading(false)
      }
    }

    fetchGameDescription()
  }, [game])

  if (!game) return null

  const isGif = (url) => url.toLowerCase().endsWith('.gif')
  const isVideo = (url) => url.toLowerCase().match(/\.(mp4|webm|ogg)$/)
  const currentMedia = allMedia[currentMediaIndex]

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Game Banner */}
      <div className="w-full h-[300px] relative mb-8 bg-gray-900 overflow-hidden">
        {/* Blurred background */}
        <div className="absolute inset-0">
          <img 
            src={game.media.banner}
            alt=""
            className="w-full h-full object-cover blur-md scale-110 opacity-50"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        {/* Main banner image - contained for aspect ratio */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={game.media.banner}
            alt={game.title}
            className="max-w-full max-h-full w-auto h-auto object-contain z-10"
          />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,0.9375fr] gap-8">
        {/* Left Column */}
        <div className="min-w-0">
          {/* Media Showcase */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            {/* Main Media Display */}
            <div className="relative aspect-video bg-gray-900">
              {/* Blurred background for empty space */}
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={currentMedia}
                  alt=""
                  className="w-full h-full object-cover blur-md scale-110 opacity-50"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
              
              {/* Main content with original aspect ratio */}
              <div className="absolute inset-0 flex items-center justify-center p-2">
                {isVideo(currentMedia) ? (
                  <video
                    src={currentMedia}
                    controls
                    className="min-w-[90%] min-h-[90%] max-w-full max-h-full object-contain z-10"
                  />
                ) : (
                  <img 
                    src={currentMedia}
                    alt={`${game.title} media`}
                    className="min-w-[90%] min-h-[90%] max-w-full max-h-full object-contain z-10"
                  />
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="p-4">
              <div className="overflow-x-auto pb-2">
                <div className="flex space-x-3 min-w-max">
                  {allMedia.map((media, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentMediaIndex(idx)
                        setIsPlaying(false)
                      }}
                      className={`flex-shrink-0 w-36 aspect-video rounded-md overflow-hidden ${
                        currentMediaIndex === idx ? 'ring-2 ring-primary-500' : ''
                      }`}
                    >
                      {isVideo(media) ? (
                        <video
                          src={media}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img 
                          src={media}
                          alt={`${game.title} thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Itch.io Embed - Moved from right column */}
          <div className="bg-gray-800 rounded-lg p-6 mt-6">
            <iframe 
              title={`${game.title} on itch.io`}
              frameBorder="0" 
              src={`https://itch.io/embed/${game.id}`}
              width="100%" 
              height="167"
            >
              <a href={`https://itch.io/game/${game.id}`}>
                {game.title} by {game.developer}
              </a>
            </iframe>
          </div>

          {/* Game Description from itch.io */}
          <div className="bg-gray-800 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold mb-4 text-white">About This Game</h3>
            
            {descriptionLoading && (
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                <div className="h-4 bg-gray-700 rounded w-4/5"></div>
              </div>
            )}
            
            {descriptionError && (
              <div className="text-red-400 bg-red-900/20 border border-red-500/30 rounded p-4">
                <p className="font-medium">⚠️ {descriptionError}</p>
                <p className="text-sm mt-2 text-red-300">
                  You can view the full description on{' '}
                  <a 
                    href={`https://${game.devSlug}.itch.io/${game.gameSlug}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    itch.io
                  </a>
                </p>
              </div>
            )}
            
            {gameDescription && !descriptionLoading && (
              <div 
                className="text-gray-200 leading-relaxed itch-description"
                dangerouslySetInnerHTML={{ __html: gameDescription }}
                style={{
                  lineHeight: '1.6'
                }}
              />
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 min-w-0">
          {/* Game Info */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
              {/* Blurred background */}
              <div className="absolute inset-0">
                <img 
                  src={game.media.thumbnail}
                  alt=""
                  className="w-full h-full object-cover blur-md scale-110 opacity-70"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              
              {/* Main thumbnail with preserved aspect ratio */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={game.media.thumbnail}
                  alt={game.title}
                  className="max-w-full max-h-full w-auto h-auto object-contain z-10"
                />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-2">{game.title}</h1>
            <p className="text-gray-300 mb-4">{game.smallDescription}</p>

            {/* Reviews */}
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <span 
                  className={`font-medium ${
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
                <span className="text-gray-400">
                  ({game.reviews.count} reviews)
                </span>
              </div>
            </div>

            {/* Dates */}
            {game.lastUpdate && (
              <div className="text-sm text-gray-400 mb-1">
                Updated: {formatDate(game.lastUpdate)}
              </div>
            )}
            {game.publishDate && (
              <div className="text-sm text-gray-400 mb-4">
                Released: {formatDate(game.publishDate)}
              </div>
            )}

            {/* Developer */}
            <div className="mb-4">
              <div className="text-sm text-gray-400">Developer</div>
              <div className="text-primary-400 hover:text-primary-300 cursor-pointer">
                {game.developer}
              </div>
            </div>

            {/* Tags */}
            <div>
              <div className="text-sm text-gray-400 mb-2">Tags</div>
              <div className="flex flex-wrap gap-2">
                {game.tags.map(tag => (
                  <span 
                    key={tag}
                    className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-sm cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamePage