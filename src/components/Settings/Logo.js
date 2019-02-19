import React from 'react';
import { assets } from '../../constants/Data';
import { StyleSheet, View } from 'react-native';
import { Image } from '../ui';
import Colors from '../../constants/Colors';

export default () => (
  <View style={styles.wrapper}>
    <Image resizeMode='contain' style={styles.logo}
      source={ assets.app.logoRed } 
    />
  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.dota_ui1,
  },

  logo: {
    flex: 1,
    marginTop: 30,
    alignSelf: 'stretch',
    // backgroundColor: 'blue',
    width: undefined,
    height: undefined
  },
})