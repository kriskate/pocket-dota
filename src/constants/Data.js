// import { folder_img, folder_data } from "../utils/downloaders";
import { FileSystem } from 'expo';

export const folder_img = `${FileSystem.cacheDirectory}dota-images/`;
export const folder_data = `${FileSystem.documentDirectory}dota-data/`;

// if you want to test with the local running backend, modify this to true
// also, the ip address of the local server has to be modified accordingly
const local = false;
const branch = __DEV__ ? 'develop' : 'master';
const host = local 
              ? 'http://192.168.0.134:8080/versioned_data'
              : `https://raw.githubusercontent.com/kriskate/dota-data/${branch}`

const images_base = `${host}/assets/images/`;
const base_data = `${host}/data/`;

export const assets = {
  attributes: {
    agi: require('../assets/images/game/overview/pip_agi.png'),
    int: require('../assets/images/game/overview/pip_int.png'),
    str: require('../assets/images/game/overview/pip_str.png'),
    attack: require('../assets/images/game/overview/overviewicon_attack.png'),
    defense: require('../assets/images/game/overview/overviewicon_defense.png'),
    speed: require('../assets/images/game/overview/overviewicon_speed.png'),
  },
  game: {
    cooldown: require('../assets/images/game/cooldown.png'),
    mana: require('../assets/images/game/mana.png'),
    gold: require('../assets/images/game/gold.png'),
  },
  
  roles: {
    Support: require('../assets/images/game/roles/pip_baby.png'),
    Carry: require('../assets/images/game/roles/pip_cary.png'),
    Disabler: require('../assets/images/game/roles/pip_disa.png'),
    Escape: require('../assets/images/game/roles/pip_escape.png'),
    Nuker: require('../assets/images/game/roles/pip_gank.png'),
    Initiator: require('../assets/images/game/roles/pip_init.png'),
    Jungler: require('../assets/images/game/roles/pip_jung.png'),
    Pusher: require('../assets/images/game/roles/pip_push.png'),
    Jungler: require('../assets/images/game/roles/pip_init.png'),
    Durable: require('../assets/images/game/roles/pip_tank.png'),
  },

  app: {
    icon: require('../assets/images/icon.png'),
    menuHeroes: require('../assets/images/menu-heroes.png'),
    menuItems: require('../assets/images/menu-items.png'),
    menuStats: require('../assets/images/menu-stats.png'),
    menuPatch: require('../assets/images/menu-patchnotes.png'),
    menuTips: require('../assets/images/menu-tips.png'),
    menuProfile: require("../assets/images/menu-profile.png"),
    menuSettings: require("../assets/images/menu-settings.png"),
    logoRed: require('../assets/images/logo.png'),
  },

  locales: {
    'de-DE': require('../assets/images/locales/de.png'),
    'en-US': require('../assets/images/locales/us.png'),
    'es-ES': require('../assets/images/locales/es.png'),
    'fr-FR': require('../assets/images/locales/fr.png'),
    'ja-JP': require('../assets/images/locales/jp.png'),
    'ro-RO': require('../assets/images/locales/ro.png'),
    'ru-RU': require('../assets/images/locales/ru.png'),
  },
}
export const local_uri = { 
  images: {
    small: id => `${folder_img}small/${id}.png`,
    vert: id => `${folder_img}vert/${id}_vert.jpg`,
    icons: id => `${folder_img}icons/${id}.png`,

    abilities: id => `${folder_img}abilities/${id}.png`,
    items: id => `${folder_img}items/${id}.png`,
  }, 
  data: {
    heroes: `${folder_data}heroes.json`,
    items: `${folder_data}items.json`,
    patch_notes: `${folder_data}patch_notes.json`,
    tips: `${folder_data}heroes.json`,
    info: `${folder_data}info.json`,
  },
}


export const url = {
  images: {
    small: id => `${images_base}heroes/small/${id}.png`,
    vert: id => `${images_base}heroes/vert/${id}_vert.jpg`,
    icons: id => `${images_base}heroes/icons/${id}.png`,

    abilities: id => `${images_base}abilities/${id}.png`,
    items: id => `${images_base}items/${id}.png`,
  },

  currentWiki: `${base_data}info.json`,

  data: (language) => ({
    heroes: `${base_data}${language}/heroes.json`,
    items: `${base_data}${language}/items.json`,
    patch_notes: `${base_data}${language}/patch_notes.json`,
    tips: `${base_data}${language}/tips.json`,
  }),
}


export const localData = {
  heroes: require('../data/default-wiki/heroes.json'),
  items: require('../data/default-wiki/items.json'),
  patch_notes: require('../data/default-wiki/patch_notes.json'),
  tips: require('../data/default-wiki/tips.json'),
  info: require('../data/default-wiki/info.json'),
}