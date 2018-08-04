import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default () => <View style={styles.separator} />

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    borderWidth: 1,
    borderColor: Colors.dota_red_dark,
  },
})