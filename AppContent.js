import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import Container from './components/ui/Container';

const texts = {
  fresh: 'Because this is the first time you launch the app, additional files need to be downloaded (eg: images, hero/ item descriptions).',
  missing: 'Some wiki data on your device seems to be missing. Please wait while the app re-downloads the data.',
}

@connect(state => ({
  wiki: state.wiki,
  profile: state.profile,
}))
export default class AppContent extends React.Component {
  state = {
    loadingText: '',
    loadedData: false,
    checkedLoaded: false,
  };

  _checkData = () => {
    this.setState({ checkedLoaded: true });

    const { heroes, items, tips, patch_notes, info, } = this.props.wiki;
    const { user, search } = this.props.profile;

    if(!(heroes && items && tips && patch_notes && info)) {
      const loadingText = heroes || items || tips || patch_notes || user || search ? texts.missing : texts.fresh;

      

      this.setState({ loadingText });
    } else 
      this.setState({ loadedData: true });
  }

  componentDidMount() {
    this._checkData();
  }

  render() {
    const { checkedLoaded, loadedData, loadingText } = this.state;

    if(!checkedLoaded) {
      return null;
    } else if (!loadedData) {
      return (
        <View>
          <Text>
            {loadingText}
          </Text>
        </View>
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