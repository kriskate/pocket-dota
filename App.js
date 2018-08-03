import React from 'react';

import reducers from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { AppLoading } from 'expo';
import AppDownloading from './screens/AppDownloading';

import { loadInitialAssets, loadCurrentWikiInfo, loadWiki, loadProfileStateFromStorage, } from './utils/loaders';
import AppNavigator from './navigation/AppNavigator';
import Logger from './utils/Logger';
import { DOWNLOAD_REASONS } from './constants/Constants';
import { checkIfWikiUpdateNeeded } from './utils/wiki';


let store;
// handles splash screen, via AppLoading
// implements redux at top-level
export default class App extends React.Component {
  state = { 
    loaded: false,
    downloading: false,
    downloadReason: '',
  };

  _loadAssets = async () => {
    await loadInitialAssets();

    await this._createStore();
  };
  _handleFinishLoading = () => {
    this.setState({ loaded: true });
  };


  _checkWikiUpdate = () => {
    checkIfWikiUpdateNeeded();
  }
  _wikiUpdate = () => {
    this.setState({ downloading: true, downloadReason: DOWNLOAD_REASONS.UPDATE });
  }

  _createStore = async () => {
    const wiki = await loadWiki();
    
    if(!wiki) {
      const downloadReason = !await loadCurrentWikiInfo() 
      ? DOWNLOAD_REASONS.FRESH
      : DOWNLOAD_REASONS.MISSING;
      
      this.setState({ downloading: true, downloadReason });
    } else {
      const profile = await loadProfileStateFromStorage();

      store = createStore(reducers, { wiki, profile });
    }
  }

  _handleFinishDownLoading = async () => {
    await this._createStore();

    if(store) {
      this.setState({ downloading: false });
    } else {
      // please restart app
    }
  };


  render() {
    if (!this.state.loaded) {
      return (
        <AppLoading
          startAsync={this._loadAssets}
          onFinish={this._handleFinishLoading}
          onError={Logger.error}
        />
      );
    } else if(this.state.downloading) {
      return (
        <AppDownloading
          reason={this.state.downloadReason}
          onFinish={this._handleFinishDownLoading}
          onError={Logger.error}
        />
      )
    } else {
      return (
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      );
    }
  }
}

