import React from 'react';
import { BackHandler, View, StyleSheet, ScrollView } from 'react-native';
import { withNavigation, NavigationActions, StackActions } from 'react-navigation';

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
    return this.props.navigation.navigate(SCREEN_LABELS.HOME);
  }

  render() {
    const { style, children, padTop, padInner, scrollable } = this.props;
    
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
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dota_ui2,
    flex: 1,
  },
})