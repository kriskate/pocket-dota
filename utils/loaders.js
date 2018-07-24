import { Image, Platform, StatusBar } from 'react-native'
import { Asset, Font, Icon } from 'expo';
import { getItem, downloadNewWikiData, setCurrentWiki } from './wiki';
import { initialState as profileState } from '../reducers/profile';
import { initialState as wikiState, DOWNLOAD_REASONS } from '../reducers/wiki';
import Logger from './Logger';

export const cacheImages = (images) => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

export const loadInitialAssets = async () => {
  const imageAssets = cacheImages([
    // 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    require('../assets/images/menu-heroes.png'),
    require('../assets/images/menu-items.png'),
    require('../assets/images/menu-stats.png'),
    
  ])

  const fontAssets = Font.loadAsync({
    ...Icon.Ionicons.font,
    'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  })

  await Promise.all([...imageAssets, fontAssets])
}

export const checkDataConsistency = data => {
  // initiates a download if MISSING or FRESH
  const { heroes, items, tips, patch_notes, info, } = data;

  Logger.debug('--- checking data')

  if(!(heroes && items && tips && patch_notes && info)) {
    return heroes || items || tips || patch_notes || info 
      ? DOWNLOAD_REASONS.MISSING : DOWNLOAD_REASONS.FRESH
  }

  return true;
}

export const downloadWiki = async () => {
  Logger.debug('--- downloading new wiki')
  
  Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(true);
  const newWikiData = await downloadNewWikiData();
  Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(false);
  await setCurrentWiki(newWikiData);

  return newWikiData;
}

export const loadWikiFromStorage = async () => {
  const data = {};

  await Promise.all(
    Object.keys(wikiState.data).map(async cData => 
      data[cData] = await getItem(cData)
    )
  );
  
  Logger.silly('loading local data', !!data.info);

  return {...wikiState, data};
}


export const loadProfileFromStorage = async () => {
  const data = {}

  await Promise.all(
    Object.keys(profileState).map(async cData => 
      data[cData] = await getItem(cData)
    )
  );

  return data;
}
