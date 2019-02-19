import React from 'react';

import reducers from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { StatusBar, Platform, UIManager, View } from 'react-native';

import { withNamespaces } from 'react-i18next';

import { AppLoading } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import Updater from './Updater';

import { loadInitialAssets, loadCurrentWikiInfo, loadWiki, } from './utils/loaders';
import Logger from './utils/Logger';
import AppTips from './components/AppTips';
import { initialState } from './reducers/update';
import localization from './localization';
import InitialLanguageSelector from './components/Settings/InitialLanguageSelector';


/* SETUP */
Platform === 'android' && StatusBar.setTranslucent(true);
StatusBar.setBarStyle('light-content');
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

let store, persistor;

// handles splash screen, via AppLoading
// implements redux at top-level
@withNamespaces("Components")
export default class App extends React.Component {
  state = {
    loadedAssets: false,
    loadingStore: true,
  };


  _loadAssets = async () => {
    await loadInitialAssets();
  };
  _handleFinishLoading = async () => {
    await this._loadLocalStore();

    this.setState({ loadedAssets: true });
  };

  _loadLocalStore = async () => {
    // if the store is already loaded, return (ie when hot-reloading)
    if(store) return;

    const wiki = await loadWiki();
    
    let downloadingWiki_reason = '';
    if(!wiki) {
      const { t } = this.props;
      const wikiInfo = await loadCurrentWikiInfo();
      // if we do have wikiInfo it means wiki was downloaded before, so we have some missing wiki data
      downloadingWiki_reason = wikiInfo ? t('DOWNLOAD_REASONS.MISSING') : t('DOWNLOAD_REASONS.FRESH');
    }
    
    const persistConfig = {
      key: 'pocket-dota',
      storage,
      whitelist: ['profile'],
    }
    const persistedReducer = persistReducer(persistConfig, reducers);
    
    store = createStore(persistedReducer, {
      wiki,
      update: {
        ...initialState,
        showWiki: !!downloadingWiki_reason,
        downloadingWiki_reason,
      },
    });

    persistor = persistStore(store, {}, async () => {
      await localization.changeLanguage(store.getState().profile.settings.language);
      this.setState({ loadingStore: false });
    });
    
  }
  
  render() {
    if (!this.state.loadedAssets || this.state.loadingStore) {
      return (
        <AppLoading
          startAsync={this._loadAssets}
          onFinish={this._handleFinishLoading}
          onError={Logger.error}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={{ flex: 1}}>
            <AppNavigator />
            <AppTips />
            { store.getState().profile.settings.language ?
            <Updater />
            :
            <InitialLanguageSelector />
            }
          </View>
        </Provider>
      )
    } 
  }
}