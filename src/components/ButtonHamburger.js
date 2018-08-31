import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { Header, withNavigation } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';
import Button from './ui/Button';
import Colors from '../constants/Colors';
import AppTips from './AppTips';


export default withNavigation( ({ navigation }) => (
  <Button viewStyle={styles.hamburger}
      onPress={() => { 
        navigation.openDrawer();
        Keyboard.dismiss();

        AppTips.showTip('drawerSlide');
      }}
    >
    <Ionicons size={24} name={ Platform == "ios" ? "ios-menu" : "md-menu" }
      color={Colors.dota_white} pointerEvents='none' />
  </Button>
))



const styles = StyleSheet.create({
  hamburger: {
    height: Header.HEIGHT,
    paddingHorizontal: 16,
  },
})