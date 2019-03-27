import { Asset, Font, Icon, FileSystem, Updates } from 'expo';
import { model_profile, model_wiki } from '../constants/Models';
import { getItem } from './storage';
import { assets, folder_data, defaultData } from '../constants/Data';
import { Alert } from 'react-native';
import { dota2com_languages } from '../localization';


export const loadInitialAssets = async () => {
  const imageAssets = Object.keys(assets).reduce((final, asset) =>
    final.concat(Object.keys(assets[asset]).map(
      asset_key => assets[asset][asset_key]
    ))
  , [])
  .map(image => Asset.fromModule(image).downloadAsync());

  const fontAssets = Font.loadAsync({
    ...Icon.Ionicons.font,
    ...Icon.FontAwesome.font,
  })

  await Promise.all([...imageAssets, fontAssets])
}

export const loadProfileStateFromStorage = async () => {
  const data = model_profile({});
  
  await Promise.all(
    Object.keys(data).map(async key => {
      const local_data = await getItem(key);
      if(local_data) data[key] = local_data;

      // Logger.silly(`loaded local data: profile : ${key} : ${!!data[key]}`);
    })
  );
  
  return data;
}


export const loadWiki = async (language) => {
  const dota_language = dota2com_languages[language];
  const data = model_wiki({});
  let badData = false;
  
  await Promise.all(
    Object.keys(data).map(async key => {
      try {
        data[key] = JSON.parse(await FileSystem.readAsStringAsync(folder_data + `${dota_language}/${key}.json`));
      } catch(e) {
        // if the file for one of the assets does not exist, re-download all of them
        badData = true;
      }
      // Logger.silly(`- loaded local data: wiki : ${key} : ${!!data[key]}`);
    })
  );
      
  return badData ? null : data;
}

export const loadDefaultWiki = async () => {
  const data = model_wiki({});

  await Promise.all(
    Object.keys(data).map(async dataFile => {
      data[dataFile] = await defaultData[dataFile];
    })
  );

  return data;
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




// used for testing purposes 
export const test__removeWiki = async () => {
  const remove = async () => {
    await FileSystem.deleteAsync(folder_data, { idempotent: true });
    try {
      // await CacheManager.clearCache();
    } catch(e) {
      // no folder
    }

    Updates.reload();
  }

  Alert.alert(
    "REMOVE WIKI", "",
    [ { text: 'No', style: 'cancel' }, { text: 'Yes', onPress: remove }, ],
    { cancelable: true }
  )
}

export const test__downgradeWiki = async () => {
  const downgrade = async () => {
    const cInfo = await loadCurrentWikiInfo();
    const newInfo = {
      ...cInfo,
      wikiVersion: 30,
    };
    await FileSystem.writeAsStringAsync(`${folder_data}/info.json`, JSON.stringify(newInfo));
  
    console.log('replaced wiki with v30')
  }

  Alert.alert(
    "DOWNGRADE WIKI", "",
    [ { text: 'No', style: 'cancel' }, { text: 'Yes', onPress: downgrade }, ],
    { cancelable: true }
  )

}