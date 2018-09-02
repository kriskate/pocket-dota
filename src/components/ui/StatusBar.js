import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Colors from '../../constants/Colors';

const bkColor = Colors.dota_ui2;
export default Bar = ({ backgroundColor=bkColor }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent barStyle={'light-content'} />
  </View>
);



const styles = StyleSheet.create({
  statusBar: {
    flex: 1,
    height: getStatusBarHeight(),
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    width: '100%',
  },
})