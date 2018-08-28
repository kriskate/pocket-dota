import React from 'react'
import { View, Platform, TouchableNativeFeedback, TouchableOpacity, StyleSheet, Text } from 'react-native'
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';


const Title = ({ title, disabled, style }) => !title ? null :
  <Text style={[styles.title, style, disabled && styles.disabledTitle]}>{title}</Text>
export default class Button extends React.Component {
  static defaultProps = {
    borderless: false,
    pressColor: 'rgba(0, 0, 0, .32)'
  };
  
  render() {
    // android lollipop
    const {
      onPress,
      pressColor, borderless, style, viewStyle, titleStyle,
      children, title,
      disabled, prestyled,
      onLayout,
    } = this.props;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
      return (
        <View style={[styles.touch, style, prestyled && styles.prestyled, disabled && styles.disabled]}
        onLayout={onLayout}>
          <TouchableNativeFeedback onPress={onPress} useForeground disabled={disabled}
              background={TouchableNativeFeedback.Ripple(pressColor, borderless)}>
            <View style={[styles.button, viewStyle]}>
              <Title title={title} disabled={disabled} />
              {children}
            </View>
          </TouchableNativeFeedback>
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={onPress} style={[styles.touch, style, prestyled && styles.prestyled, disabled && styles.disabled]}
            disabled={disabled}
            onLayout={onLayout}>
          <View style={[styles.button, viewStyle]}>
            <Title title={title} disabled={disabled} style={titleStyle} />
            {children}
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  prestyled: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.dota_ui1,
    marginVertical: Layout.padding_small,
    marginHorizontal: Layout.padding_regular,
    padding: Layout.padding_regular,
    backgroundColor: Colors.dota_red_dark,
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