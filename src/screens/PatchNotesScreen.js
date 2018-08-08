import React from 'react';
import { Container, Text } from '../components/ui';

import ButtonHamburger from '../components/ButtonHamburger';
import { SCREEN_LABELS } from '../constants/Constants';

export default class PatchNotesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.PATCH_NOTES,
    headerRight: <ButtonHamburger />,
  });

  render() {
    return (
      <Container>
        <Text>Patch content</Text>
      </Container>
    );
  }
}