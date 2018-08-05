import React from 'react';
import { ActivityIndicator, View, StyleSheet, ProgressBarAndroid, ProgressViewIOS, Platform, } from 'react-native';

import { Text } from './';

import Colors from '../../constants/Colors';

export default ({ progress, label }) => (
  <View>
    <Text style={styles.label}>{label} {Math.round(progress*100)}%</Text>

    { !progress && progress !== 0
      
        ? <ActivityIndicator size="small" color={Colors.dota_red_dark} />

        : Platform.OS === 'android'
          ? <ProgressBarAndroid styleAttr="Horizontal" progress={progress} indeterminate={false} color={Colors.dota_int} />
          : <ProgressViewIOS progressTintColor={Colors.dota_int} progress={progress} />
      }
  </View>
)


const styles = StyleSheet.create({
  label: {
    color: '#999',
    marginBottom: 10,
  }
})