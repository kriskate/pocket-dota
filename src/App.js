import React from 'react';

import reducers from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { StatusBar, Platform, UIManager, View } from 'react-native';

import { AppLoading } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import Updater from './Updater';

import { loadInitialAssets, loadCurrentWikiInfo, loadWiki, } from './utils/loaders';
import Logger from './utils/Logger';
import { DOWNLOAD_REASONS } from './constants/Constants';
import AppTips from './components/AppTips';
import { initialState } from './reducers/update';


/* SETUP */
Platform === 'android' && StatusBar.setTranslucent(true);
StatusBar.setBarStyle('light-content');
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

let store, persistor;

// handles splash screen, via AppLoading
// implements redux at top-level
export default class App extends React.Component {
  state = {
    loaded: false,
  };


  _loadAssets = async () => {
    await loadInitialAssets();
  };
  _handleFinishLoading = async () => {
    await this._loadLocalStore();

    this.setState({ loaded: true });
  };

  _loadLocalStore = async () => {
    // if the store is already loaded, return (ie when hot-reloading)
    if(store) return;

    const wiki = await loadWiki();
    
    let downloadingWiki_reason = '';
    if(!wiki) {
      const wikiInfo = await loadCurrentWikiInfo();
      // if we do have wikiInfo it means wiki was downloaded before, so we have some missing wiki data
      downloadingWiki_reason = wikiInfo ? DOWNLOAD_REASONS.MISSING : DOWNLOAD_REASONS.FRESH;
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

    persistor = persistStore(store);
  }

  render() {
    if (!this.state.loaded) {
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
            <Updater />
          </View>
        </Provider>
      )
    } 
  }
}