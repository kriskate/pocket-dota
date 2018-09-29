import React from 'react';
import { BackHandler, View, StyleSheet, ScrollView } from 'react-native';
import { withNavigation, } from 'react-navigation';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SCREEN_LABELS } from '../../constants/Constants';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import ContainerHeader from './ContainerHeader';


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
    const {
      style, children, padTop, padInner, scrollable, backToHome,
      header, header_title, header_titleColor, stickyComponent,
    } = this.props;
    
    const paddingTop = padTop ? getStatusBarHeight() : undefined;
    const padding = padInner ? Layout.padding_regular : undefined;
    const _style = [!scrollable && styles.container, { paddingTop, padding }, style, ];

    if(scrollable) {
      if(header) return (
        <View style={styles.container}>
          <ContainerHeader backToHome={backToHome}
              title={header_title} titleColor={header_titleColor}
              stickyComponent={stickyComponent} >
            <View style={_style}>
              {children}
            </View>
          </ContainerHeader>
        </View>
      )
      else return (
        <View style={styles.container}>
          <ScrollView>
            <View style={_style}>
              {children}
            </View>
          </ScrollView>
        </View>
      )
    } else return (
      <View style={[styles.container, _style]}>{children}</View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dota_ui2,
    flex: 1,
  },
})