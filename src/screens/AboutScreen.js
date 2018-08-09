import React from 'react';
import { View, Text } from 'react-native';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS } from '../constants/Constants';

export default class AboutScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.ABOUT,
    ...headerStyle,
  });

  render() {
    return (
      <View>
        <Text>About and Legal content</Text>
      </View>
    );
  }
}

