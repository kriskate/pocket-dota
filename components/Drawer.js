import React from 'react';
import { DrawerItems } from 'react-navigation';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import TouchableItem from '../node_modules/react-navigation-drawer/dist/views/TouchableItem';
import { SCREEN_LABELS } from '../constants/Constants';

export default class Drawer extends React.Component {
  render() {
    return (
      <ScrollView style={{ flex: 1, marginTop: getStatusBarHeight() }}>
        <TouchableItem onPress={() => this.props.navigation.navigate(SCREEN_LABELS.HOME)} 
          delayPressIn={0}>
            <View style={[styles.item]}>
              <Text style={[styles.label]}>
                { SCREEN_LABELS.HOME }
              </Text>
            </View>
        </TouchableItem>
        <DrawerItems {...this.props} />
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
  }
});