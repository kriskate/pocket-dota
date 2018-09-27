import React from 'react'
import { View, Platform, TouchableNativeFeedback, TouchableOpacity, StyleSheet, Text } from 'react-native'
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';


const Title = ({ title, disabled, style }) => !title ? null :
  <Text style={[styles.title, style, disabled && styles.disabledTitle]}>{title}</Text>
  
export default class Button extends React.Component {
  static defaultProps = {
    borderless: true,
    pressColor: Colors.dota_white,
  };
  
  render() {
    // android lollipop
    const {
      onPress,
      pressColor, borderless, style, viewStyle, titleStyle,
      children, title,
      disabled, prestyled,
      onLayout,
      secondary, warning,
      forceTouchableOpacity
    } = this.props;
    const color = !prestyled ? null : secondary ? Colors.goldenrod : warning ? Colors.dota_red : Colors.dota_white;

    const touchStyle = StyleSheet.flatten([styles.touch, prestyled && styles.prestyled, style, disabled && styles.disabled]);

    if (Platform.OS === 'android' && Platform.Version >= 21 && !forceTouchableOpacity) {
      return (
        <View onLayout={onLayout}>
          <TouchableNativeFeedback onPress={onPress} useForeground disabled={disabled}
              background={TouchableNativeFeedback.Ripple(pressColor, borderless)}>
            <View style={[touchStyle, !prestyled && styles.button, viewStyle]}>
              { !title ? null : <Title title={title} disabled={disabled} style={[titleStyle, { color }]} /> }
              {children}
            </View>
          </TouchableNativeFeedback>
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={onPress} style={[touchStyle, !prestyled && styles.button, viewStyle]}
            disabled={disabled}
            onLayout={onLayout}>
            <Title title={title} disabled={disabled} style={[titleStyle, { color }]} />
            {children}
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  prestyled: {
    borderWidth: 1,
    borderTopColor: Colors.dota_ui2,
    borderBottomColor: Colors.dota_ui2,
    backgroundColor: Colors.dota_ui1,
    padding: Layout.padding_regular,
  },

  title: {
    color: Colors.dota_white,
  },
  disabledTitle: {
    color: Colors.dota_ui1,
  },
  disabled: {
    backgroundColor: Colors.disabled,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  touch: {
    // backgroundColor: 'yellow',
  },
})