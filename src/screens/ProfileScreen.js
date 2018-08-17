import React from 'react';
import { Container, Text } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS } from '../constants/Constants';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.PROFILE,
    ...headerStyle,
  });

  render() {
    return (
      <Container backToHome>
        <Text>Profile content</Text>
      </Container>
    );
  }
}
