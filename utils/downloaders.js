import { FileSystem } from 'expo';
import { Image } from 'react-native';
import { url, } from '../constants/Data';
import { loadCurrentWikiInfo, loadWiki, cacheImages } from './loaders';
import Logger from './Logger';

export const folder_img = `${FileSystem.cacheDirectory}dota-images/`;
export const folder_data = `${FileSystem.cacheDirectory}dota-data/`;


export const downloadImages = async (wiki, progress_callback) => {
  Logger.debug('downloading images');
  const { heroes, items, } = wiki;
  const images = { icons: [], small: [], vert: [], abilities: [], items: [] };
  // to-do - remove these from here; put rule on backend
  const ignore = { 
    items: ['trident', 'combo_breaker', 'ward_dispenser', 'pocket_tower', 'super_blink', 'mutation_tombstone', 'river_painter7', 'river_painter6', 'river_painter5', 'river_painter4', 'river_painter3', 'river_painter2', 'river_painter1', 'river_painter'],
  }

  heroes.forEach(({ tag, abilities }) => {
    ['small', 'vert', 'icons'].forEach(type => images[type].push(url.images[type](tag)));

    abilities.forEach(ability => images.abilities.push(url.images.abilities(ability.tag)));
  })
  items.forEach(({tag}) => {
    if(!ignore.items.includes(tag.tag))
      images.items.push(url.images.items(tag.tag));
  });

  
  let cProgress = 0;
  const keys = Object.keys(images);
  const imagesTotal = keys.reduce((res, arr) => res += images[arr].length, 0);
  const step = 1 / imagesTotal;

  return Promise.all(
    keys.map(async key => {
      await Promise.all(
        images[key].map(async image => {
          await Image.prefetch(image);
          progress_callback(cProgress += step);
        })
      )
    })
  )

  // the caching version is much faster than launching download promises
  // return Promise.all(
  //   keys.map(async key => {
  //     const cFolder = folder_img + `${key}/`;
  //     await checkFolder(cFolder);
  //     Logger.silly(`downloading images for -${key}-`);
      
  //     await Promise.all(
  //       images[key].map(async image => {
  //         await download(image, cFolder);
  //         progress_callback(cProgress += step);
  //       })
  //     );
  //     Logger.silly(`downloaded images for -${key}-`)
  //   })
  // );
}


export const downloadWiki = async (progress_callback) => {
  Logger.debug('downloading new wiki');
  let info = await loadCurrentWikiInfo();
  if(!info) info = await downloadWikiInfo()

  const { currentWikiVersion, currentWikiVersionDate } = await loadCurrentWikiInfo();

  const cWikiFolder = `v_${currentWikiVersion}_${currentWikiVersionDate}`;
  const keys = Object.keys(url.data);

  const progress = overallProgress(keys, progress_callback);

  await Promise.all(
    keys.map(async key => {
      await download(
        url.data[key].replace('$WIKI_FOLDER', cWikiFolder),
        folder_data,
        progress(key)
      );

      Logger.silly(`- downloaded ${key}`);
    })
  );

  return await loadWiki();
}


export const downloadWikiInfo = async () => {
  await checkFolder(folder_data);

  await download(url.currentWiki, folder_data);
  return await loadCurrentWikiInfo();
}


const overallProgress = (keys, progress_callback) => {
  const step = 1 / keys.length;
  const progressAll = [];
  keys.forEach(() => progressAll.push(0));
  
  return (key) => 
    ({totalBytesWritten, totalBytesExpectedToWrite}) => {
      progressAll[keys.indexOf(key)] = totalBytesWritten/totalBytesExpectedToWrite;
      progress_callback(progressAll.reduce((a, b) => a + b, 0)*step);
    }
}

const download = async (uri, folder, progress=()=>{}) => {
  const filename = uri.split('/').pop();
  const output = `${folder}/${filename}`;

  const dld = FileSystem.createDownloadResumable(uri, output, {}, progress);

  return dld.downloadAsync();
}

const checkFolder = async (folder) => {
  const folderInfo = await FileSystem.getInfoAsync(folder);
  if (!folderInfo.exists) await FileSystem.makeDirectoryAsync(folder, { intermediates: true });
}