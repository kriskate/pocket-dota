import React from 'react';
import { View, StyleSheet } from 'react-native';

export default () => <View style={styles.separator} />

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    borderWidth: 0.1,
    borderColor: '#DCDCDC',
  },
})