import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { url } from '../constants/Data';
import { Text } from './ui';
import Layout from '../constants/Layout';

export default class Abilities extends React.Component {
  render() {
    const { abilities } = this.props;

    return (
      <View style={styles.container}>
        { abilities.map(ability => (
          <View key={ability.tag}>
            <Image style={styles.imgAbility} source={{ uri: url.images.abilities(ability.tag) }} />
            <Text>{ability.name}</Text>
          </View>
        )) }
      </View>
    )
  }
}

// problems: sf, morph, tinker, doom, alch, invo, lone, rubik, kotl, troll, 
const styles = StyleSheet.create({
  imgAbility: {
    width: 90,
    height: 90,
  },
  container: {
    marginTop: Layout.paddingSmall,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})