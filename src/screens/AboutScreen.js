import React from 'react';
import { View, Text } from 'react-native';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS } from '../constants/Constants';
import { Container } from '../components/ui';

export default class AboutScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.ABOUT,
    ...headerStyle,
  });

  render() {
    return (
      <Container backToHome>
        <Text>About and Legal content</Text>
      </Container>
    );
  }
}

