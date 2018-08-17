import React from 'react';
import { Container, Text } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS } from '../constants/Constants';

export default class Itemscreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.ITEMS,
    ...headerStyle,
  });

  render() {
    return (
      <Container backToHome>
        <Text>Items content</Text>
      </Container>
    );
  }
}
