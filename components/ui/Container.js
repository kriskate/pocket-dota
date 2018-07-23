import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default ({ style, children }) => (
  <View style={style ? [styles.container, style] : styles.container}>{children}</View>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dota_ui1,
    flex: 1,
    padding: 5,
    // height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 20
  }
})