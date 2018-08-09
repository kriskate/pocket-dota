import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default ({ style, children, labelBottom }) => (
  <Text {...this.props} style={[styles.text, labelBottom ? styles.labelBottom : {}, style]}>{children}</Text>
)

const styles = StyleSheet.create({
  text: {
    color: Colors.dota_red_light,
  },
  labelBottom: {
    textAlign: 'center',
    color: Colors.dota_white,
    backgroundColor: Colors.dota_ui1 + '99',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderWidth: 2,
    borderColor: Colors.dota_ui1,
  },
})