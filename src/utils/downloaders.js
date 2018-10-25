import { FileSystem } from 'expo';
import { Image, Platform } from 'react-native';
import { url, } from '../constants/Data';
import { loadCurrentWikiInfo, loadWiki, } from './loaders';
import Logger from './Logger';
import { model_wiki_info } from '../constants/Models';

export const folder_img = `${FileSystem.cacheDirectory}dota-images/`;
export const folder_data = `${FileSystem.documentDirectory}dota-data/`;


export const downloadImages = async (wiki, progress_callback) => {
  Logger.debug('downloading images');

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

  
  let cProgress = 0;
  const keys = Object.keys(images);
  const imagesTotal = keys.reduce((res, arr) => res += images[arr].length, 0);
  const step = 1 / imagesTotal;

  return Promise.all(
    keys.map(async key => {
      Logger.debug(`downloading images for -${key}-`)

      await Promise.all(
        images[key].map(async image => {
          await Image.prefetch(image);
          progress_callback(cProgress += step);
        })
      )

      Logger.silly(`downloaded -${key}-`)
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


export const downloadWiki = async (wikiInfo, progress_callback) => {
  Logger.debug('downloading new wiki');
  // wikiInfo is passed in through the update reducer, to the WikiDownloading Component
  let info = wikiInfo || await loadCurrentWikiInfo();
  if(!info) info = await downloadWikiInfo();

  const { wikiVersionFolder } = model_wiki_info(info);

  const keys = Object.keys(url.data);

  const progress = overallProgress(keys, progress_callback);
  let iosProgress = 0;

  await Promise.all(
    keys.map(async key => {
      Logger.debug(`downloading data for ${key}`);

      await download(
        url.data[key].replace('$WIKI_FOLDER', wikiVersionFolder),
        folder_data,
        progress(key)
      );
      if(Platform.OS === 'ios') {
        iosProgress += 1/keys.length;
        progress_callback(iosProgress);
      }
      Logger.silly(`- downloaded ${key}`);
    })
  );

  return await loadWiki();
}


const downloadWikiInfo = async () => {
  await checkFolder(folder_data);

  await download(url.currentWiki, folder_data);
  return await loadCurrentWikiInfo();
}


const overallProgress = (keys, progress_callback) => {
  const step = 1 / keys.length;
  const progressAll = [];
  keys.forEach(() => progressAll.push(0));

  if(Platform.OS === 'ios') return () => {}
  
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
