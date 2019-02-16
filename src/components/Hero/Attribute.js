import React from 'react';
import { View, StyleSheet } from 'react-native';
import { assets } from '../../constants/Data';
import { Image, Text } from '../ui';
import Layout from '../../constants/Layout';


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
    width: Layout.isSmallDevice ? 40 : 50,
    height: Layout.isSmallDevice ? 30 : 40,
  },
  attribute: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginTop: Layout.padding_small,
    marginHorizontal: Layout.padding_small,
  },
})