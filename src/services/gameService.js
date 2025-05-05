import { games } from '../data/games'
import { getAllTags } from '../data/categories'

/**
 * Search for games and tags based on query
 * @param {string} query - The search query
 * @returns {Object} - Object containing matching games and tags
 */
export const searchGames = (query) => {
  if (!query || query.length < 2) {
    return { games: [], tags: [] }
  }
  
  // Normalize the query
  const normalizedQuery = query.toLowerCase().trim()
  
  // Search for games
  const matchingGames = games
    .filter(game => {
      return (
        game.title.toLowerCase().includes(normalizedQuery) ||
        game.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
      )
    })
    .slice(0, 5) // Limit to 5 results
  
  // Search for tags
  const allTags = getAllTags()
  const matchingTags = allTags
    .filter(tag => tag.toLowerCase().includes(normalizedQuery))
    .map(tag => {
      // Count games with this tag
      const count = games.filter(game => 
        game.tags.includes(tag)
      ).length
      
      return { name: tag, count }
    })
    .sort((a, b) => b.count - a.count) // Sort by game count
    .slice(0, 3) // Limit to 3 results
  
  return {
    games: matchingGames,
    tags: matchingTags
  }
}

/**
 * Get games by specified tags
 * @param {Array} tags - Array of tag strings to search for
 * @returns {Array} - Matching games
 */
export const getGamesByTags = (tags) => {
  if (!tags || !tags.length) {
    return []
  }
  
  return games.filter(game => {
    return tags.some(tag => game.tags.includes(tag))
  })
}

/**
 * Get games by categories
 * @param {string} category - Category name
 * @returns {Array} - Matching games
 */
export const getGamesByCategory = (category) => {
  if (!category) {
    return []
  }
  
  // Match category to corresponding tags
  // This is a simplified implementation
  // A real implementation would likely have a more complex mapping
  
  switch (category.toLowerCase()) {
    case 'action':
      return getGamesByTags(['action', 'fighting', 'fps', 'hack-and-slash'])
    case 'adventure':
      return getGamesByTags(['adventure', 'story-rich', 'exploration'])
    case 'rpg':
      return getGamesByTags(['rpg', 'action-rpg', 'jrpg', 'role-playing'])
    case 'simulation':
      return getGamesByTags(['simulation', 'farming', 'life-sim'])
    case 'strategy':
      return getGamesByTags(['strategy', 'tactical', 'turn-based'])
    case 'free':
      return games.filter(game => game.pricing.currentPrice === 0)
    default:
      return []
  }
}