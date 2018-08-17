import React from 'react';
import { Container, Text } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS } from '../constants/Constants';

export default class StatsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.STATS,
    ...headerStyle,
  });

  render() {
    return (
      <Container backToHome>
        <Text>Stats content</Text>
      </Container>
    );
  }
}
