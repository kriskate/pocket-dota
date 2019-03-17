import React from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, View } from 'react-native';

import Layout from '../../constants/Layout';
import { Text } from '../ui';
import Colors from '../../constants/Colors';


@connect(state => ({
  patch_notes: state.wiki.wikiData.patch_notes
}))
export default class Changelog extends React.Component {
  // delayed render so the changelog computation does not affect initial hero render
  state = {
    delayed: false,
  }
  componentDidMount() {
    this.setState({ delayed: true })
  }
  _renderPatch = ({ item }) => {
    const { abilities, stats, talents } = item.changes;

    return (
      <View style={styles.patch}>
        <Text style={styles.patch_name} >{item.patch}</Text>
        { abilities.map(ability => <Text style={styles.abilities} key={ability.name}>{ability.description}</Text>) }
        { stats.map(stat => <Text style={styles.stats} key={stat}>{stat}</Text>) }
        { talents.map(talent => <Text style={styles.talents} key={talent}>{talent}</Text>) }
      </View>
    )
  }

  render() {
    if(!this.state.delayed) return null;

    const { hero_tag, patch_notes } = this.props;
    const notes = [];

    Object.keys(patch_notes).reverse().forEach(patch => {
      if(!patch_notes[patch].heroes || patch_notes[patch].heroes.length == 0) return;

      const changes = patch_notes[patch].heroes.find(hero => hero.name == hero_tag);
      if(!changes) return;

      notes.push({
        patch,
        changes,
      });
    });
    
    return (
      <FlatList
        data={notes}
        renderItem={this._renderPatch}
        keyExtractor={(item) => item.patch}
        numColumns={1}
      />
    )
  }
}


const styles = StyleSheet.create({
  patch: {
    paddingTop: Layout.padding_small,
    paddingBottom: Layout.padding_small,
  },
  patch_name: {
    fontWeight: "bold",
  },
  abilities: {
    color: Colors.items.consumables,
    paddingTop: Layout.padding_small,
  },
  stats: {
    color: Colors.items.attributes,
    paddingTop: Layout.padding_small,
  },
  talents: {
    color: Colors.items.artifacts,
    paddingTop: Layout.padding_small,
  },
})