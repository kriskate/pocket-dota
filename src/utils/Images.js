import { url } from '../constants/Data';

export const getWikiImages = (wiki) => {
  const { heroes, items, } = wiki;
  const images = { icons: [], small: [], vert: [], abilities: [], items: [] };

  heroes.forEach(({ tag, abilities }) => {
    ['small', 'vert', 'icons'].forEach(type => images[type].push(url.images[type](tag)));

    abilities.forEach(ability => images.abilities.push(url.images.abilities(ability.tag)));
  });
  items.forEach(({ tag }) => {
    images.items.push(url.images.items(tag));
  });
  images.items.push(url.images.items('recipe'));

  const keys = Object.keys(images);
  
  let flatImages = [];
  keys.forEach(key => {
    flatImages = flatImages.concat(images[key])
  });
  
  return flatImages;
}