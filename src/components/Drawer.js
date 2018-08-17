import React from 'react';
import { DrawerItems } from 'react-navigation';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { SCREEN_LABELS } from '../constants/Constants';
import { Button, Container, Text } from './ui';
import Colors from '../constants/Colors';
import { assets } from '../constants/Data';
import Layout from '../constants/Layout';

export default class Drawer extends React.Component {
  render() {
    return (
      <Container scrollable>
        <View style={styles.imgIconWrapper}>
          <Image style={styles.imgIcon} source={assets.app.logoRed} />
        </View>
        <Button style={styles.item} onPress={() => this.props.navigation.navigate(SCREEN_LABELS.HOME)} >
          <Text style={[styles.label]}>{ SCREEN_LABELS.HOME }</Text>
        </Button>
        <DrawerItems {...this.props} />
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  imgIconWrapper: {
    marginTop: Layout.padding_regular + getStatusBarHeight(),
    marginVertical: Layout.padding_regular,
    paddingVertical: Layout.padding_regular,
  },
  imgIcon: {
    width: 180,
    height: 50,
    resizeMode: 'contain',

  },
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