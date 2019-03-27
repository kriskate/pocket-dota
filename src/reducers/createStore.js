import { createStore, combineReducers } from 'redux';

import { persistReducer, persistStore } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';

import profile from './profile';
import update from './update';
import wiki, { Actions as WikiActions } from './wiki';

import i18n, { getDeviceLanguage } from '../localization';
import { loadWiki, loadDefaultWiki } from '../utils/loaders';


export default async (done) => {
  const blackListFilter = createBlacklistFilter(
    'wiki',
    ['wikiData']
  );

  const persistConfig = {
    key: 'pocket-dota',
    storage,
    whitelist: ['profile', 'wiki'],
    transforms: [blackListFilter],
  }

  const persistedReducer = persistReducer(persistConfig, combineReducers({
    profile,
    update,
    wiki,
  }));
  
  const store = createStore(persistedReducer);
  
  const persistor = persistStore(store, {}, async () => {
    await persistorDone(store);
    done();
  });
  store.persistor = persistor;
  
  return store;
}

const persistorDone = async (store) => {
  const { currentLanguage } = store.getState().wiki;
  let finalLanguage = currentLanguage;
  let wikiData;

  if(currentLanguage) {
    wikiData = await loadWiki(currentLanguage);
  } 
  if(!wikiData) {
    // if no current language is set, or current language files are partially downloaded
    finalLanguage = getDeviceLanguage();
    wikiData = await loadDefaultWiki();
  }

  // ICON ARRANGEMENT TEST
  // const wikiTest = JSON.parse(JSON.stringify(wikiData.info))
  // wikiTest.wikiVersion = 67;
  // store.dispatch(WikiActions.downloadLanguage_done('fr-FR', wikiTest))

  // populate state.wiki.availableLanguages with the current store language
  // this will also ensure that latestWikiVersion is set from the language reducer
  store.dispatch(WikiActions.downloadLanguage_done(finalLanguage, wikiData.info));

  // populate state.wiki.wikiData
  // this will also ensure currentWikiVersion is correct
  store.dispatch(WikiActions.newWiki(wikiData));

  i18n.changeLanguage(finalLanguage);
}

