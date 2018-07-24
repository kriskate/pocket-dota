import React from 'react';
import { connect } from 'react-redux';

import { Container, StatusBar } from './components/ui';
import AppNavigator from './navigation/AppNavigator';
import DownloadData from './components/DownloadData';

@connect(state => ({
  downloading: state.wiki.downloading,
}))
export default class AppContent extends React.Component {
  render() {
    const { downloading } = this.props;

    return (
      <Container>
        <StatusBar />
        { 
          downloading
          ? <DownloadData />
          : <AppNavigator />
        }
      </Container>
    )
  }
}