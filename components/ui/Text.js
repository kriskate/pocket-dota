import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default ({ style, children }) => (
  <Text {...this.props} style={[style, styles.text]}>{children}</Text>
)

const styles = StyleSheet.create({
  text: {
    color: Colors.dota_red_light,
    fontFamily: 'space-mono',
  }
})