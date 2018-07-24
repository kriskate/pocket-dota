import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import { Text } from './';
import Layout from '../../constants/Layout';

import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Colors from '../../constants/Colors';

export default ({ progress, label }) => (
  <View>
    <Text style={styles.label}>{label} ({progress})</Text>

    { !progress && progress !== 0
      
        ? <ActivityIndicator size="small" color={Colors.dota_red_dark} />

        : <ProgressBarAnimated
            width={Layout.window.width - 30}
            backgroundColor={Colors.dota_red_dark}
            value={progress}
            backgroundColorOnComplete={Colors.dota_agi}
          />
      }
  </View>
)


const styles = StyleSheet.create({
  label: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  }
})