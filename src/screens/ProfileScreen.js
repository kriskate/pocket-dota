import React from 'react';
import { Container, Text, Button } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS } from '../constants/Constants';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.PROFILE,
    ...headerStyle,
  });

  render() {
    return (
      <Container backToHome>
        <Button><Text>profile name</Text></Button>
        <Button><Text style={styles.clear}>Remove profile data</Text></Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  clear: {
    color: Colors.dota_red_dark,
  },
})