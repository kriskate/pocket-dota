import React from 'react';

import { Provider } from 'react-redux';
import createStore from './reducers/createStore';

import { StatusBar, Platform, UIManager, View } from 'react-native';

import { withNamespaces } from 'react-i18next';

import { AppLoading } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import AppTips from './components/AppTips';
import UpdaterWrapper from './UpdaterWrapper';

import { loadInitialAssets } from './utils/loaders';

import Logger from './utils/Logger';
import Colors from './constants/Colors';

import { navigationPersistenceKey, onNavigationStateChange } from './utils/AnalyticsHelpers';


/* SETUP */
Platform === 'android' && StatusBar.setTranslucent(true);
StatusBar.setBarStyle('light-content');
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

let store;

// handles splash screen, via AppLoading
// implements redux at top-level
@withNamespaces("Components")
export default class App extends React.Component {
  state = {
    loadedAssets: false,
  };

  _loadAssets = async () => {
    await loadInitialAssets();
  }
  _handleFinishLoading = async () => {
    // if the store is already loaded, return (ie when hot-reloading)
    if(store) {
      this._done();
    } else {
      store = await createStore(this._done);
    }
  }
  _done = () => {
    this.setState({ loadedAssets: true });
  }
  
  render() {
    if (!this.state.loadedAssets) {
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
            <AppNavigator 
              persistenceKey={navigationPersistenceKey}
              renderLoadingExperimental={() => <View style={{ flex: 1, backgroundColor: Colors.dota_ui1 }} />}

              onNavigationStateChange={onNavigationStateChange}
            />
            <AppTips />

            <UpdaterWrapper />
          </View>
        </Provider>
      )
    } 
  }
}