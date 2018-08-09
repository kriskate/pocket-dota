import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { assets } from '../../constants/Data';
import Text from '../ui/Text';


export default class Attribute extends React.PureComponent {
  render() {
    const { src, title, val, lval } = this.props;

    return (
      <View style={styles.attribute}>
        { !src ? null : <Image style={styles.attribute_img} source={assets.attributes[src]} /> }
        { !title ? null : <Text>{title}:</Text> }
        <Text> {val}{lval ? ` (${lval}/lvl)` : ''}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  attribute_img: {
    resizeMode: 'contain',
  },
  attribute: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})