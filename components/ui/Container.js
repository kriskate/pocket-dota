import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default ({ style, children, padTop, padInner }) => {
  const padingTop = padTop ? getStatusBarHeight() : 0;
  const padding = padingTop ? 5 : 0;
  return <View style={[styles.container, style, padingTop, padding]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dota_ui1,
    flex: 1,
    // height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 20
  }
})