import React from 'react'
import { View, Platform, TouchableNativeFeedback, TouchableOpacity, StyleSheet } from 'react-native'

export default class Button extends React.Component {
  static defaultProps = {
    borderless: false,
    pressColor: 'rgba(0, 0, 0, .32)'
  };
  
  render() {
    // android lollipop
    const { pressColor, borderless, onPress, style, children } = this.props;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
      return (
        <TouchableNativeFeedback onPress={onPress}
            background={TouchableNativeFeedback.Ripple(pressColor, borderless)}>
          <View style={[styles.button, style]}>{children}</View>
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
          {children}
        </TouchableOpacity>
      );
    }
  }
}


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})