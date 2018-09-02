import React from 'react';

import { View, Image, StyleSheet, } from 'react-native';
import { url } from '../../constants/Data';
import { Text, Button } from '../ui';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';


export default class Ability extends React.PureComponent {
  render() {
    const { tag, selected, name } = this.props;
    const ss = selected ? { borderColor: Colors.gold } : {};

    return (
      <Button key={tag} style={[styles.ab, ss]} pressColor={Colors.goldenrod} onPress={() => this.props.onPress(tag)}>
      <View>
        <Image  pointerEvents='none' style={styles.abImg} source={{ uri: url.images.abilities(tag) }} />
        <Text  pointerEvents='none' style={styles.abText} labelBottom>{name}</Text>
      </View>
      </Button>
    )
  }
}

const thumbSize = 90;
const borderWidth = 1;
const styles = StyleSheet.create({
  ab: {
    width: thumbSize + borderWidth*2,
    borderWidth,
    borderRadius: 3,
    borderColor: Colors.dota_ui2,
    marginBottom: Layout.padding_small,
  },
  abText: {
    fontSize: 13,
  },
  abImg: {
    width: thumbSize,
    height: thumbSize,
  },
})