import React from 'react';
import { BackHandler, View, StyleSheet, ScrollView } from 'react-native';
import { withNavigation, } from 'react-navigation';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SCREEN_LABELS } from '../../constants/Constants';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';


@withNavigation
export default class Container extends React.Component {
  componentDidMount() {
    this.props.backToHome && BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }
  componentWillUnmount() {
    this.props.backToHome && BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    if(this.props.navigation.isFocused()) {
      this.props.navigation.navigate(SCREEN_LABELS.HOME);
      return true;
    }
    return false
  }

  render() {
    const { style, children, padTop, padInner, scrollable, bounces } = this.props;
    
    const paddingTop = padTop ? getStatusBarHeight() : undefined;
    const padding = padInner ? Layout.padding_regular : undefined;
    const _style = [!scrollable && styles.container, { paddingTop, padding }, style];

    return scrollable 
      ? <View style={styles.container}>
          <ScrollView bounces={bounces !== false}>
            <View style={_style}>
              {children}
            </View>
          </ScrollView>
        </View>
      : <View style={_style}>{children}</View>
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dota_ui2,
    flex: 1,
  },
})