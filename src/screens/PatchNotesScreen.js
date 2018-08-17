import React from 'react';
import { Container, Text } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS } from '../constants/Constants';

export default class PatchNotesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.PATCH_NOTES,
    ...headerStyle,
  });

  render() {
    return (
      <Container backToHome>
        <Text>Patch content</Text>
      </Container>
    );
  }
}
