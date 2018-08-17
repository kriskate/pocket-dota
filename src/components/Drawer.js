import React from 'react';
import { DrawerItems } from 'react-navigation';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { SCREEN_LABELS } from '../constants/Constants';
import { Button, Container } from './ui';
import Colors from '../constants/Colors';

export default class Drawer extends React.Component {
  render() {
    return (
      <Container scrollable padTop>
        <Button style={styles.item} onPress={() => this.props.navigation.navigate(SCREEN_LABELS.HOME)} >
          <Text style={[styles.label]}>{ SCREEN_LABELS.HOME }</Text>
        </Button>
        <DrawerItems {...this.props} />
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    textAlign: 'left',
    margin: 16,
    fontWeight: 'bold',
    color: Colors.dota_white,
  }
});