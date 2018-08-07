import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default ({ style, children }) => (
  <Text {...this.props} style={[styles.text, style]}>{children}</Text>
)

const styles = StyleSheet.create({
  text: {
    color: Colors.dota_red_light,
  }
})