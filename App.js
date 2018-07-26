import React from 'react';

import reducers from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { AppLoading } from 'expo';
import AppDownloading from './screens/AppDownloading';

import { loadInitialAssets,loadWikiStateFromStorage, loadProfileStateFromStorage } from './utils/loaders';
import AppNavigator from './navigation/AppNavigator';
import Logger from './utils/Logger';
import { Container } from './components/ui';


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

    try {
      const wiki = await loadWikiStateFromStorage();
      const profile = await loadProfileStateFromStorage();
      store = createStore(reducers, { wiki, profile });
    } catch(e) {
      // data is inconsistent
      // if react-native fail to load data at getItem, we'll re-download the data
      this.setState({ downloading: true, downloadReason: e.message });
    }
  };
  _handleFinishLoading = () => {
    this.setState({ loaded: true });    
  };

  _handleFinishDownLoading = ({wiki, profile}) => {
    store = createStore(reducers, { wiki, profile });
    this.setState({ downloading: false, downloadReason: '' });
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

