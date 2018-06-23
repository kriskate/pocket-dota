import React from 'react';
import { AppLoading } from 'expo';
import AppNavigator from './navigation/AppNavigator';

import { Container } from 'native-base';
import { loadInitialAssets } from './utils/loaders';


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };


  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={loadInitialAssets}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Container>
          <AppNavigator />
        </Container>
      );
    }
  }
}

