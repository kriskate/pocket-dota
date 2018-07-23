import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import app from './reducers/app';
import profile from './reducers/profile';
import wiki from './reducers/wiki';

import { AppLoading } from 'expo';
import { loadInitialAssets } from './utils/loaders';
import AppContent from './AppContent';
import { Container } from './components/ui';

StatusBar.setBarStyle('light-content');

const reducers = combineReducers({ profile, wiki, app });
const store = createStore(reducers);

// handles splash screen, via AppLoading
// implements redux at top-level
export default class App extends React.Component {
  state = { loadedInitialAssets: false, };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ loadedInitialAssets: true });
  };


  render() {
    if (!this.state.loadedInitialAssets) {
      return (
        <AppLoading
          startAsync={loadInitialAssets}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <Container>
            <AppContent />
          </Container>
        </Provider>
      );
    }
  }
}

