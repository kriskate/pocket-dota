import React from 'react';
import { Container, Text } from '../components/ui';

import ButtonHamburger from '../components/ButtonHamburger';
import { SCREEN_LABELS } from '../constants/Constants';

export default class TipsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.TIPS,
    headerRight: <ButtonHamburger />,
  });

  render() {
    return (
      <Container>
        <Text>Tips content</Text>
      </Container>
    );
  }
}
