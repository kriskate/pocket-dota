import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ScrollView } from '../../node_modules/react-native-gesture-handler';

export default ({ style, children, padTop, padInner, scrollable }) => {
  const paddingTop = padTop ? getStatusBarHeight() : 0;
  const padding = padInner ? 5 : 0;
  const _style = [styles.container, {paddingTop, padding}, style];

  return scrollable 
    ? <ScrollView>
        <View style={_style}>{children}</View>
      </ScrollView>
    : <View style={_style}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dota_ui1,
    flex: 1,

    // height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 20
  }
})