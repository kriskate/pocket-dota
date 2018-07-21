import React from 'react'
import { Platform, TouchableNativeFeedback, TouchableOpacity, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'

import { Ionicons } from '@expo/vector-icons';

class Button extends React.Component {
  static defaultProps = {
    borderless: false,
    pressColor: 'rgba(0, 0, 0, .32)'
  };
  
  _getChildren = () => {
    return this.props.hamburger
      ? <View><Ionicons style={styles.icon} name={ Platform == "ios" ? "ios-menu" : "md-menu" } /></View>
      : <View>{this.props.children}</View>
  }
  render() {
    // android lollipop
    const { pressColor, borderless, onPress, navigation, hamburger } = this.props;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
      return (
        <TouchableNativeFeedback style={styles.container} onPress={hamburger ? () => navigation.openDrawer() : onPress}
        background={TouchableNativeFeedback.Ripple(pressColor, borderless)}>
          {this._getChildren()}
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
          {this._getChildren()}
        </TouchableOpacity>
      );
    }
  }
}

export default withNavigation(Button)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  icon: Platform.OS === 'ios'
  ? {
      height: 21,
      width: 13,
      marginLeft: 9,
      marginRight: 9,
      marginVertical: 12,
      resizeMode: 'contain',
    }
  : {
      height: 24,
      width: 24,
      margin: 16,
      resizeMode: 'contain',
    },
})