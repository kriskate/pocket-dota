import React from 'react';
import { Provider } from 'react-redux';


import { AppLoading } from 'expo';
import { loadInitialAssets, loadWikiFromStorage, loadProfileFromStorage, checkDataConsistency } from './utils/loaders';
import AppContent from './AppContent';
import Logger from './utils/Logger';
import { createStore } from 'redux';
import reducers from './reducers';

let store;
// handles splash screen, via AppLoading
// implements redux at top-level
export default class App extends React.Component {
  state = { loaded: false, };

  _handleFinishLoading = () => {
    this.setState({ loaded: true });
  };
  _loadAssets = async () => {
    await loadInitialAssets();

    const wiki = await loadWikiFromStorage();
    const profile = await loadProfileFromStorage();

    const dataConsistency = checkDataConsistency(wiki.data);

    if(dataConsistency === true) {
      store = createStore(reducers, { wiki, profile });
    } else {
      store = createStore(reducers, {
        wiki: { ...wiki, downloading: true, downloadingReason: dataConsistency },
        profile,
      });
    }
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
          <AppContent />
        </Provider>
      );
    }
  }
}

