import React from 'react'
import { View, Platform, TouchableNativeFeedback, TouchableOpacity, StyleSheet } from 'react-native'

export default class Button extends React.Component {
  static defaultProps = {
    borderless: false,
    pressColor: 'rgba(0, 0, 0, .32)'
  };
  
  render() {
    // android lollipop
    const { pressColor, borderless, onPress, style, viewStyle, children } = this.props;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
      return (
        <View style={[styles.touch, style]}>
          <TouchableNativeFeedback onPress={onPress} useForeground
              background={TouchableNativeFeedback.Ripple(pressColor, borderless)}>
            <View style={[styles.button, viewStyle]}>{children}</View>
          </TouchableNativeFeedback>
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={onPress} style={[styles.touch, style]}>
          <View style={[styles.button, viewStyle]}>
            {children}
          </View>
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
  touch: {
    // backgroundColor: 'yellow',
  },
})