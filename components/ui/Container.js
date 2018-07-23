import React from 'react';
import { View, StyleSheet } from 'react-native';

export default () => <View style={styles.container}>{this.props.children}</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})