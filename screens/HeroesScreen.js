import React from 'react';
import { View, Text } from 'react-native'

import { SCREEN_LABELS } from '../constants/Constants';
import ButtonHamburger from '../components/ButtonHamburger';

export default class Screen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.HEROES,
    headerRight: <ButtonHamburger />
  });

  render() {
    return (
      <View>
        <Text>Heroes content</Text>
      </View>
    );
  }
}

