export const HOME_LABELS = {
  HEROES: 'HEROES',
  ITEMS: 'ITEMS',
  TIPS: 'TIPS',

  STATS: 'STATS',
}
export const SCREEN_LABELS = {
  HOME: 'Home',

  HEROES: 'Heroes',
  ITEMS: 'Items',

  TIPS: 'Tips',
  PATCH_NOTES: 'Patch notes',

  STATS: 'Stats',
  PROFILE: 'Profile',

  ABOUT: 'About',
}

const images_base = 'https://raw.githubusercontent.com/kriskate/dota-data/master/assets/images/';
export const url = {
  images: {
    hero: id => `${images_base}/heroes/small/${id}.png`,
    hero_vert: id => `${images_base}/heroes/vert/${id}_vert.jpg`,
    hero_icon: id => `${images_base}/heroes/icons/${id}.png`,

    ability: id => `${images_base}/abilities/${id}.png`,
    item: id => `${images_base}/items/${id}.png`,
  },

  currentWiki: 'https://raw.githubusercontent.com/kriskate/dota-data/master/info.json',

  data:{
    heroes: 'https://raw.githubusercontent.com/kriskate/dota-data/master/$WIKI_FOLDER/heroes.json',
    items: 'https://raw.githubusercontent.com/kriskate/dota-data/master/$WIKI_FOLDER/items.json',
    patch_notes: 'https://raw.githubusercontent.com/kriskate/dota-data/master/$WIKI_FOLDER/patch_notes.json',
    tips: 'https://raw.githubusercontent.com/kriskate/dota-data/master/$WIKI_FOLDER/tips.json',
    info: 'https://raw.githubusercontent.com/kriskate/dota-data/master/$WIKI_FOLDER/info.json',
  },
}

export const DOWNLOAD_REASONS = {
  FRESH: 'Because this is the first time you launch the app, additional files need to be downloaded (eg: images, hero/ item descriptions).',
  MISSING: 'Some wiki data on your device seems to be missing. Please wait while the app re-downloads the data.',
  UPDATE: 'Downloading new wiki database.'
}