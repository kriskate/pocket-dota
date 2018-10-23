import React from 'react';
import { View, StyleSheet, Image } from "react-native";
import { Text } from "../ui";

import { url } from "../../constants/Data";
import { model_patch_notes_hero, model_patch_notes_general, model_hero } from '../../constants/Models';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';


const Descriptions = ({ descriptions }) => !descriptions.length || descriptions.length == 0 ? null
: (
  <View style={styles.descriptions}>
    { Array.isArray(descriptions)
      ? descriptions.map(d => <Text key={d} style={styles.description}>{d}</Text> )
      : <Text style={styles.description}>{descriptions}</Text>
    }
  </View>
)
const Changes = ({ changes, images, namesArr, isItem }) => !changes || changes.length == 0 ? null
: (
  <View style={styles.changes}>
    { changes.map(changes => {
      let { name, description } = model_patch_notes_general(changes);
      if(isItem) name = name.replace('item_', '');

      let _name = namesArr && namesArr.find(n => n.tag == name.replace('item_', ''));
      // if found
      _name = _name && _name.name;

      return (
        <View style={styles.change} key={name}>
          <View style={styles.change_name}>
            { !images ? null : <Image style={isItem ? styles.img_item : styles.img_ability} source={{ uri: images(name) }} /> }
            { !isItem ? null : <Text>{_name || name}</Text> }
          </View>
          <Descriptions descriptions={description} />
        </View>
      )
    }) }
  </View>
)

export default class PatchFull extends React.Component {
  render() {
    const { heroes, items, general, wiki_heroes, wiki_items } = this.props;

    return (
      <View style={styles.container}>
      { heroes.map(hero => {
        const { name, abilities, talents, stats } = model_patch_notes_hero(hero);
        const wiki_hero = model_hero(wiki_heroes.find(h => h.tag == name));

        return (
          <View key={name} style={styles.hero}>
            <View style={styles.hero_name}>
              <Image style={styles.img_hero} source={{ uri: url.images.small(name) }} />
              <Text>{wiki_hero.name}</Text>
            </View>
            
            <Changes changes={abilities} images={url.images.abilities} namesArr={wiki_hero.abilities} />

            <Descriptions descriptions={talents} />
            <Descriptions descriptions={stats} />
          </View>
        )
      }) }
      
      <Changes changes={items} images={url.images.items} namesArr={wiki_items} isItem />
      <Changes changes={general} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
  hero: {
    marginVertical: Layout.padding_small,
    padding: Layout.padding_small,
    backgroundColor: Colors.dota_ui1,
  },
  hero_name: {
    // paddingVertical: Layout.padding_small,
    // paddingTop: Layout.padding_regular,
    flexDirection: 'row',
    alignItems: 'center',
  },


  changes: {
    // marginVertical: Layout.padding_small,
    backgroundColor: Colors.dota_ui1,
  },
  change: {
    padding: Layout.padding_small,
    flexDirection: 'row',
    // alignItems: 'flex-start',
    // backgroundColor: 'green',
  },
  change_name: {
    // alignItems: 'center',
    maxWidth: 80,
    // paddingVertical: Layout.padding_regular,
    // backgroundColor: 'blue',
  },
  descriptions: {
    flex: 1,
    padding: Layout.padding_regular,
    paddingVertical: Layout.padding_small,
    // borderColor: Colors.disabled,
    // borderWidth: 1,
    // backgroundColor: 'red',
  },
  description: {
    // paddingVertical: Layout.padding_small,
  },
  
  img_hero: {
    width: 50*127/71,
    height: 50,
    marginRight: Layout.padding_regular,
  },
  img_ability: {
    width: 30,
    height: 30,
  },
  img_item: {
    width: 50*88/64,
    height: 50,
  },
})