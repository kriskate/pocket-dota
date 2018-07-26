import React from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Header, withNavigation } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';
import Button from './Button';


export default withNavigation( ({ navigation }) => (
  <Button onPress={() => navigation.openDrawer()} style={styles.hamburger}>
    <Ionicons size={24} name={ Platform == "ios" ? "ios-menu" : "md-menu" }
      color={Platform.OS === 'ios' ? '#037aff' : '#000'} pointerEvents='none' />
  </Button>
))



const styles = StyleSheet.create({
  hamburger: {
    height: Header.HEIGHT,
    paddingHorizontal: 16,
  },
})