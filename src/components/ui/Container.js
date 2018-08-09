import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Layout from '../../constants/Layout';

export default ({ style, children, padTop, padInner, scrollable }) => {
  const marginTop = padTop ? getStatusBarHeight() : 0;
  const padding = padInner ? Layout.padding_regular : 0;
  const _style = [styles.container, {marginTop, padding}, style];

  return scrollable 
    ? <View style={_style}>
        <ScrollView>
          {children}
        </ScrollView>
      </View>
    : <View style={_style}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dota_ui2,
    flex: 1,
  },
})