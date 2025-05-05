export const categorySystem = [
  {
    mainCategory: 'special',
    subCategories: [
      { name: 'Free To Play', tags: ['free', 'free-to-play'] },
      { name: 'Demos', tags: ['demo'] },
      { name: 'Early Access', tags: ['early-access'] },
      { name: 'Controller-Friendly', tags: ['controller-support'] },
      { name: 'Remote Play', tags: ['remote-play'] },
      { name: 'VR Titles', tags: ['vr'] },
      { name: 'VR Hardware', tags: ['vr-hardware'] },
      { name: 'Software', tags: ['software'] },
      { name: 'Soundtracks', tags: ['soundtrack'] }
    ]
  },
  {
    mainCategory: 'genres',
    subCategories: [
      { name: 'Action', tags: ['action'] },
      { name: 'Arcade & Rhythm', tags: ['arcade', 'rhythm'] },
      { name: 'Fighting & Martial Arts', tags: ['fighting', 'martial-arts'] },
      { name: 'First-Person Shooter', tags: ['fps', 'first-person-shooter'] },
      { name: 'Hack & Slash', tags: ['hack-and-slash'] },
      { name: 'Platformer & Runner', tags: ['platformer', 'runner'] },
      { name: 'Third-Person Shooter', tags: ['third-person-shooter'] },
      { name: 'shmup', tags: ['shmup', 'shoot-em-up'] },
      { name: 'Adventure', tags: ['adventure'] },
      { name: 'Casual', tags: ['casual'] },
      { name: 'Hidden Object', tags: ['hidden-object'] },
      { name: 'Metroidvania', tags: ['metroidvania'] },
      { name: 'Puzzle', tags: ['puzzle'] },
      { name: 'Story-Rich', tags: ['story-rich'] },
      { name: 'Visual Novel', tags: ['visual-novel'] },
      { name: 'Role-Playing', tags: ['rpg', 'role-playing'] },
      { name: 'Action RPG', tags: ['action-rpg'] },
      { name: 'Adventure RPG', tags: ['adventure-rpg'] },
      { name: 'JRPG', tags: ['jrpg'] },
      { name: 'Party-Based', tags: ['party-based'] },
      { name: 'Rogue-Like', tags: ['roguelike', 'roguelite'] },
      { name: 'Strategy RPG', tags: ['strategy-rpg'] },
      { name: 'Turn-Based', tags: ['turn-based'] }
    ]
  },
  {
    mainCategory: 'themes',
    subCategories: [
      { name: 'Anime', tags: ['anime'] },
      { name: 'Horror', tags: ['horror'] },
      { name: 'Mystery & Detective', tags: ['mystery', 'detective'] },
      { name: 'Open World', tags: ['open-world'] },
      { name: 'Sci-Fi & Cyberpunk', tags: ['sci-fi', 'cyberpunk'] },
      { name: 'Space', tags: ['space'] },
      { name: 'Survival', tags: ['survival'] }
    ]
  },
  {
    mainCategory: 'player',
    subCategories: [
      { name: 'Co-Operative', tags: ['co-op', 'cooperative'] },
      { name: 'LAN', tags: ['lan'] },
      { name: 'Local & Party', tags: ['local-multiplayer', 'party'] },
      { name: 'MMO', tags: ['mmo'] },
      { name: 'Multiplayer', tags: ['multiplayer'] },
      { name: 'Online Competitive', tags: ['competitive'] },
      { name: 'Singleplayer', tags: ['singleplayer'] }
    ]
  }
]

export const getAllTags = () => {
  const allTags = []
  
  categorySystem.forEach(category => {
    category.subCategories.forEach(subCat => {
      subCat.tags.forEach(tag => {
        if (!allTags.includes(tag)) {
          allTags.push(tag)
        }
      })
    })
  })
  
  return allTags
}