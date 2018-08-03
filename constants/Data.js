import { folder_img, folder_data } from "../utils/downloaders";


const images_base = 'https://raw.githubusercontent.com/kriskate/dota-data/master/assets/images/';
const base_data = 'https://raw.githubusercontent.com/kriskate/dota-data/master/$WIKI_FOLDER/';


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

  currentWiki: 'https://raw.githubusercontent.com/kriskate/dota-data/master/info.json',

  data:{
    heroes: `${base_data}heroes.json`,
    items: `${base_data}items.json`,
    patch_notes: `${base_data}patch_notes.json`,
    tips: `${base_data}tips.json`,
    info: `${base_data}info.json`,
  },
}
