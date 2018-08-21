import React from 'react';

import { View, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Text, Button } from './ui';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { url, assets } from '../constants/Data';
import { connect } from 'react-redux';
import { model_item } from '../constants/Models';


export default class ItemThumb extends React.PureComponent {
  render() {
    const { item, showPrice=false, onPress } = this.props;

    const { tag, name, cost } = model_item(item);

    return (
      <Button style={styles.container} onPress={onPress}>
        <View>
          <Image pointerEvents='none' style={styles.img} source={{ uri: url.images.items(tag.replace('item_','')) }} />
          <Text pointerEvents='none'
              labelBottom={showPrice} labelBelow={!showPrice}
              style={styles.label} labelBelowWrapperStyle={styles.labelWrapper} >
            {name}
          </Text>
        </View>
        {!showPrice ? null : 
          <View style={styles.price}>
            <Image style={styles.priceImg} source={assets.game.gold} />
            <Text style={styles.priceTxt}> {cost}</Text>
          </View>
        }
      </Button>
    )
  }
}

const borderWidth = 1;

const thumbSize = 70;
const imgRatio = 88/64;

const priceImgRatio = 25/17;
const priceImgW = 17;

const styles = StyleSheet.create({
  container: {
    width: thumbSize + borderWidth*2,
    borderWidth,
    borderRadius: 3,
    borderColor: Colors.dota_ui2,
    marginBottom: Layout.padding_small,
    margin: Layout.padding_regular,
  },
  price: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceTxt: {
    fontSize: 12,
    color: Colors.gold,
  },
  priceImg: {
    width: priceImgW,
    height: priceImgW*priceImgRatio,
    resizeMode: 'contain',
  },

  label: {
    fontSize: 11,
  },
  labelWrapper: {
    width: thumbSize,
    height: 30,
  },
  img: {
    width: thumbSize,
    height: thumbSize/imgRatio,
  },
})