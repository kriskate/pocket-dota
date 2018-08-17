import React from 'react';
import { Container, Text } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS } from '../constants/Constants';

export default class TipsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.TIPS,
    ...headerStyle,
  });

  render() {
    return (
      <Container backToHome>
        <Text>Tips content</Text>
      </Container>
    );
  }
}
