import gamesData from './games.json'

const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}

export const games = gamesData.games.map(game => ({
  ...game,
  publishDate: isValidDate(game.publishDate) ? new Date(game.publishDate) : null,
  lastUpdate: isValidDate(game.lastUpdate) ? new Date(game.lastUpdate) : null
}))

export const gameCollection = {
  featured: games.slice(0, 8),
  newAndTrending: games.slice(0, 6),
  topSellers: [games[1], games[4], games[6], games[8], games[10], games[2]],
  trendingFree: [games[11], ...games.filter(game => game.pricing.currentPrice === 0)]
}