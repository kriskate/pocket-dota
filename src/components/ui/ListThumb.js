import React from 'react';
import { Image, View, StyleSheet } from "react-native";
import Button from './Button';
import Text from './Text';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import { assets } from '../../constants/Data';


export default class ListThumb extends React.PureComponent {
  render() {
    // cost is only used for items
    const { onPress, imgSource, imgSize, label, width, cost } = this.props;

    return (
      <Button onPress={onPress} pressColor={Colors.dota_red_darker}>
        <View style={styles.thumb}>
          <Image style={imgSize} source={imgSource} />
          <View style={[styles.thumbTextWrapper, {width}]}>
            <Text style={styles.thumbText}>{label}</Text>
          </View>
        </View>
        {!cost ? null : 
          <View style={styles.price}>
            <Image style={styles.priceImg} source={assets.game.gold} />
            <Text style={styles.priceTxt}> {cost}</Text>
          </View>
        }
      </Button>
    )
  }
}

const styles = StyleSheet.create({
  thumb: {
    margin: Layout.padding_small,
    justifyContent: 'center',

    backgroundColor: Colors.dota_ui1,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.dota_ui1,
  },
  thumbTextWrapper: {
    padding: 2,
    
    position: 'absolute',
    bottom: 0,
    
    backgroundColor: Colors.dota_ui1 + '99',
  },
  thumbText: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    
    color: Colors.dota_white,
  },
})