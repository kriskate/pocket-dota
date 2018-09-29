import React from 'react';
import { Container, Text } from '../components/ui';

import { headerStyleHidden } from '../utils/screen';
import { SCREEN_LABELS } from '../constants/Constants';
import { View } from 'react-native';

export default class PatchNotesScreen extends React.Component {
  static navigationOptions = () => ({
    ...headerStyleHidden
  });

  render() {
    return (
      <Container backToHome scrollable style={ styles.container } header header_title={SCREEN_LABELS.PATCH_NOTES} >
        <Text>Patch content</Text>
      </Container>
    );
  }
}
