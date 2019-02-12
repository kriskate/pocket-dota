import React from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, View } from 'react-native';

import Layout from '../../constants/Layout';
import { Text } from '../ui';
import Colors from '../../constants/Colors';


@connect(state => ({
  patch_notes: state.wiki.patch_notes
}))
export default class Changelog extends React.Component {
  // delayed render so the changelog computation does not affect initial item render
  state = {
    delayed: false,
  }
  componentDidMount() {
    this.setState({ delayed: true })
  }
  _renderPatch = ({ item }) => {
    const { patch, changes } = item;

    return (
      <View style={styles.patch}>
        <Text style={styles.patch_name} >{patch}</Text>
        { changes.description.map(change => change == " " ? null : <Text style={styles.item} key={change}>{change}</Text>) }
      </View>
    )
  }

  render() {
    if(!this.state.delayed) return null;

    const { item_tag, patch_notes } = this.props;
    const notes = [];

    Object.keys(patch_notes).reverse().forEach(patch => {
      if(!patch_notes[patch].items || patch_notes[patch].items.length == 0) return;

      const changes = patch_notes[patch].items.find(item => item.name == 'item_' + item_tag);
      if(!changes) return;

      notes.push({
        patch,
        changes,
      });
    });
    
    if(notes.length == 0) return null
    return [
      <Text key="title" style={{
        color: Colors.dota_radiant,
        fontWeight: 'bold',
        textAlign: 'center',
      }}>Item changelog:</Text>,
      <FlatList key="patch-list"
        data={notes}
        renderItem={this._renderPatch}
        keyExtractor={(item) => item.patch}
        numColumns={1}
      />
    ]
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
  item: {
    color: Colors.items.caster,
    paddingTop: Layout.padding_small,
  },
})