import React from 'react';
import { Linking, StyleSheet, Text } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import Colors from '../../constants/Colors';

export default (props) => (
  props.hasUrl 
  ? <HasUrl {...props} />
  : <TextComponent {...props} />
)
const TextComponent = ({ style, children, labelBottom }) => (
  <Text {...this.props}
    style={[styles.text, labelBottom ? styles.labelBottom : {}, style]}
  >
    {children}
  </Text>
)
const HasUrl = (props) => (
  <Hyperlink
    linkStyle={ { color: Colors.dota_int, textDecorationLine: 'underline' } }
    linkText={ url => !props.URLS ? url : Object.keys(props.URLS).find(key => props.URLS[key] == url) }
    onPress={ (url) => openURL(url) }
  >
    <TextComponent {...props} />
  </Hyperlink>
)

export const openURL = (url) =>
  Linking.canOpenURL(url).then(supported => supported && Linking.openURL(url));


const styles = StyleSheet.create({
  text: {
    color: Colors.dota_white,
  },
  labelBottom: {
    textAlign: 'center',
    color: Colors.dota_white,
    backgroundColor: Colors.dota_ui1 + '99',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderWidth: 2,
    borderColor: Colors.dota_ui1,
  },
})