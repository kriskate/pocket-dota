import React from 'react';
import { Provider } from 'react-redux';

import store from './reducers/store';

import { AppLoading } from 'expo';
import { loadInitialAssets } from './utils/loaders';
import AppContent from './AppContent';


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
          <AppContent />
        </Provider>
      );
    }
  }
}

