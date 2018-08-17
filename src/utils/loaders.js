import { Image } from 'react-native';
import { Asset, Font, Icon, FileSystem } from 'expo';
import Logger from './Logger';
import { model_profile, model_wiki } from '../constants/Models';
import { folder_data } from './downloaders';
import { getItem } from './storage';
import { assets } from '../constants/Data';


export const loadInitialAssets = async () => {
  const imageAssets = [
    ...assets.attributes,
    ...assets.game,
    ...assets.app,
  ].map(image => Asset.fromModule(image).downloadAsync())

  const fontAssets = Font.loadAsync({
    ...Icon.Ionicons.font,
    //'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  await Promise.all([...imageAssets, fontAssets])
}

export const loadProfileStateFromStorage = async () => {
  const data = model_profile({});
  
  await Promise.all(
    Object.keys(data).map(async key => {
      const local_data = await getItem(key);
      if(local_data) data[key] = local_data;

      Logger.silly(`loaded local data: profile : ${key} : ${!!data[key]}`);
    })
  );
  
  return data;
}

   

export const loadWiki = async () => {
  Logger.debug('loading wiki data');
  const data = model_wiki({});
  let badData = false;
  
  await Promise.all(
    Object.keys(data).map(async key => {
      try {
        data[key] = JSON.parse(await FileSystem.readAsStringAsync(folder_data + `${key}.json`));
      } catch(e) {
        // if the file for one of the assets does not exist, re-download all of them
        badData = true;
      }
      Logger.silly(`- loaded local data: wiki : ${key} : ${!!data[key]}`);
    })
  )
  
  return badData ? null : data;
}


export const loadCurrentWikiInfo = async () => {
  let info;
  try {
    info = JSON.parse(await FileSystem.readAsStringAsync(folder_data + 'info.json'));
  } catch(e) { 
    info = null;
   }
  return info;
}