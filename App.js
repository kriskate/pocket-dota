import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import { AppLoading } from 'expo';
import { loadInitialAssets } from './utils/loaders';
import AppContent from './AppContent';

import profile from './reducers/profile';
import wiki from './reducers/wiki';


const reducers = combineReducers({ profile, wiki });
const store = createStore(reducers);


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

