import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { url } from '../constants/Constants';

export default class Abilities extends React.Component {
  render() {
    const { abilities } = this.props;

    return (
      <View style={styles.abilities}>
        { abilities.map(ability => (
          <View key={ability.tag}>
            <Image style={styles.imgAbility} source={{ uri: url.images.ability(ability.tag) }} />
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
  abilities: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})