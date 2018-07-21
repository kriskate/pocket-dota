import React from 'react';
import { View, Text } from 'react-native'

import ButtonHamburger from '../components/ButtonHamburger'
import { SCREEN_LABELS } from '../constants/Constants';

export default class Screen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.ABOUT,
    headerRight: <ButtonHamburger />,
  });

  render() {
    return (
      <View>
        <Text>About and Legal content</Text>
      </View>
    );
  }
}

