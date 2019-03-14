import { createStore, combineReducers } from 'redux';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import language, { Actions as LanguageActions } from './language';
import profile from './profile';
import update from './update';
import wiki, { Actions as WikiActions } from './wiki';

import { getDeviceLanguage } from '../localization';
import { loadWiki, loadDefaultWiki } from '../utils/loaders';

const persistConfig = {
  key: 'pocket-dota',
  storage,
  whitelist: ['profile', 'language'],
}

export default async (done) => {

  const persistedReducer = persistReducer(persistConfig, combineReducers({
    language,
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
  const { currentLanguage } = store.getState().language;
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
  // store.dispatch(LanguageActions.downloadLanguage_done('fr-FR', wikiTest))

  // populate state.language.availableLanguages with the current store language
  // this will also ensure that setWikiVersion_latest is set from the language reducer
  store.dispatch(LanguageActions.downloadLanguage_done(finalLanguage, wikiData.info));
  // populate state.wiki
  store.dispatch(WikiActions.newWiki(wikiData));
}

