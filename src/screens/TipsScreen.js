import React from 'react';
import { Container, Text } from '../components/ui';

import { headerStyleHidden } from '../utils/screen';
import { SCREEN_LABELS } from '../constants/Constants';

export default class TipsScreen extends React.Component {
  static navigationOptions = () => ({
    ...headerStyleHidden,
  });

  render() {
    return (
      <Container backToHome scrollable header header_title={SCREEN_LABELS.TIPS} >
        <Text>Tips content</Text>
      </Container>
    );
  }
}
