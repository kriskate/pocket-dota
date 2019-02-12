import React from 'react';
import { View, StyleSheet, Image, FlatList } from "react-native";
import { connect } from 'react-redux';
import { Text, Container } from '../components/ui';
import { headerStyle } from '../utils/screen';

import { url } from "../constants/Data";
import { model_patch_notes_hero, model_patch_notes_general, model_hero } from '../constants/Models';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import InfiniteScollFlatList from '../components/InfiniteScrollFlatList';


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
          { !images && ! isItem ? null :
            <View style={styles.change_name}>
              { !images ? null : <Image style={isItem ? styles.img_item : styles.img_ability} source={{ uri: images(name) }} /> }
              { !isItem ? null : <Text style={styles.change_name_text}>{_name || name}</Text> }
            </View>
          }
          <Descriptions descriptions={description} />
        </View>
      )
    }) }
  </View>
)


@connect(state => ({
  patch_notes: state.wiki.patch_notes,
  wiki_heroes: state.wiki.heroes,
  wiki_items: state.wiki.items,
}))
export default class PatchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('data'),
    ...headerStyle,
  });

  render() {
    const { patch_notes, wiki_heroes, wiki_items } = this.props;
    const patch = patch_notes[this.props.navigation.getParam('data')];
    const { heroes, items, general } = patch;

    return (
      <Container scrollable style={styles.container}>
        <InfiniteScollFlatList
          initialNumToRender={6}
          // maxToRenderPerBatch={1}
          // updateCellsBatchingPeriod={100}
          keyExtractor={(item) => item.name}
          data={heroes}
          renderItem={({item}) => {
            const { name, abilities, talents, stats } = model_patch_notes_hero(item);
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
          }}
        />
        
        <Changes changes={items} images={url.images.items} namesArr={wiki_items} isItem />
        <Changes changes={general} />
      </Container>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    marginVertical: Layout.padding_small,
  },
  hero: {
    marginVertical: Layout.padding_small,
    padding: Layout.padding_small,
    paddingTop: Layout.padding_regular,
    paddingBottom: 0,
    backgroundColor: Colors.dota_ui1,
  },
  hero_name: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  
  changes: {
    marginVertical: Layout.padding_small,
    backgroundColor: Colors.dota_ui1,
  },
  change: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    // backgroundColor: 'green',
  },
  change_name: {
    maxWidth: 100,
    padding: Layout.padding_regular,
    // backgroundColor: 'red',
  },
  change_name_text: {
    // backgroundColor: 'blue',
  },
  
  descriptions: {
    flex: 1,
  },
  description: {
    padding: Layout.padding_regular,
    paddingVertical: Layout.padding_small,
    // backgroundColor: 'purple',
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