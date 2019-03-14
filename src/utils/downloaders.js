import { FileSystem } from 'expo';
import { Image, Platform, StatusBar } from 'react-native';
import { url, folder_data } from '../constants/Data';
import { loadCurrentWikiInfo, loadWiki, } from './loaders';
import { model_wiki_info } from '../constants/Models';
import PromisePool from 'es6-promise-pool';
import { getWikiImages } from './Images';
import { dota2com_languages } from '../localization';
import Logger from './Logger';


export const downloadImages = async (wiki, progress_callback) => {
  // Logger.debug('downloading images');

  const images = getWikiImages(wiki);
  
  let _processedImages = 0;
  const imagesTotal = images.length;
  let cProgress = 0;
  const step = 1 / imagesTotal;

  const promiseProducer = () => {
    if (_processedImages < imagesTotal) {
      _processedImages++;
      return Image.prefetch(images[_processedImages - 1])
        .then(progress_callback(cProgress += step));
    } else {
      return null;
    }
  }

  return new PromisePool(promiseProducer, 5).start();
}


export const downloadWiki = async (language, progress_callback) => {
  Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(true);

  const dota_language = dota2com_languages[language];
  
  await checkFolder(folder_data);
  await checkFolder(`${folder_data}${dota_language}`);

  const dataURL = url.data(dota_language);
  const keys = Object.keys(dataURL);

  const progress = overallProgress(keys, progress_callback);
  let iosProgress = 0;

  try {
    await Promise.all(
      keys.map(async key => {
        Logger.debug(`downloading data for ${key}`);
        await download(
          dataURL[key],
          `${folder_data}${dota_language}/`,
          progress(key)
        );
        if(Platform.OS === 'ios') {
          iosProgress += 1/keys.length;
          progress_callback(iosProgress);
        }
        Logger.debug(`- downloaded ${key}`);
      })
    );

  } catch(e) {
    return null;
  }
  await downloadWikiInfo();

  await FileSystem.copyAsync({
    from: `${folder_data}info.json`,
    to: `${folder_data}${dota_language}/info.json`,
  })

  Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(false);

  // wikiInfo is passed in through the update reducer, to the WikiDownloading Component
  const loadedWiki = await loadWiki(language);
  return loadedWiki;
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
  const output = `${folder}${filename}`;
  
  const dld = FileSystem.createDownloadResumable(uri, output, {}, progress);

  return dld.downloadAsync();
}

const checkFolder = async (folder) => {
  const folderInfo = await FileSystem.getInfoAsync(folder);
  if (!folderInfo.exists) await FileSystem.makeDirectoryAsync(folder, { intermediates: true });
}
