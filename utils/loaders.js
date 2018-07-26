import { Image } from 'react-native';
import { Asset, Font, Icon } from 'expo';
import { getItem  } from './wiki';
import Logger from './Logger';
import { DOWNLOAD_REASONS } from '../constants/Constants';
import { initialState as initialState_wiki } from '../reducers/wiki';
import { initialState as initialState_profile } from '../reducers/profile';

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
  })

  await Promise.all([...imageAssets, fontAssets])
}



export const loadWikiStateFromStorage = async () => {
  const data = await loadState(initialState_wiki);

  // check if all the loaded data exists
  // if a user clears cache and aborts half-way, saved data might be incomplete
  Logger.debug('checking data consistency');
  const { heroes, items, tips, patch_notes, info, } = data;
  if(!(heroes && items && tips && patch_notes && info)) {
    if (heroes || items || tips || patch_notes || info) {
      Logger.debug(' - data is partially missing');
      throw new Error(DOWNLOAD_REASONS.MISSING);
    } else {
      Logger.debug(' - data is missing');
      throw new Error(DOWNLOAD_REASONS.FRESH);
    }
  }

  return data;
}
export const loadProfileStateFromStorage = async () => {
  return await loadState(initialState_profile);
}
const loadState = async (initialState, reducer) => {
  Logger.debug(`loading local data (${reducer})`);
  const data = {};

  await Promise.all(
    Object.keys(initialState).map(async cData => {
      data[cData] = await getItem(cData);
      Logger.silly(`loaded local data: ${reducer} : ${cData} : ${!!data[cData]}`);
    })
  );

  return data;
}