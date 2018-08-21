import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';


import ButtonHamburger from '../components/ButtonHamburger';
import { Text, Container, Card } from '../components/ui';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { model_hero } from '../constants/Models';

import Abilities from '../components/Hero/Abilities';
import Attributes from '../components/Hero/Attributes';
import { url } from '../constants/Data';
import { ATTRIBUTES } from '../constants/Constants';

import { headerStyle } from '../utils/screen';
import ItemThumb from '../components/ItemThumb';


@connect(state => ({
  game_items: state.wiki.items
}))
export default class HeroScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let primaryAttColor;
    switch(navigation.getParam('hero').attributes.AttributePrimary) {
      case ATTRIBUTES.agility:
        primaryAttColor = Colors.dota_agi;
        break;
      case ATTRIBUTES.intelligence:
        primaryAttColor = Colors.dota_int;
        break;
      case ATTRIBUTES.strength:
        primaryAttColor = Colors.dota_str;
        break;
    }
    return {
      title: navigation.getParam('hero').name,
      ...headerStyle,
      headerTitleStyle: {
        color: primaryAttColor,
      },
    }
  };

  render() {
    const hero = model_hero(this.props.navigation.getParam('hero'));
    const { name, bio, hype, tag, abilities, popular_items } = hero;
    const { game_items } = this.props;


    return (
      <Container scrollable style={styles.container} >
        <Card collapsedTitle='Hype and Stats'>
          <Text style={styles.hype}>{hype}</Text>

          <Attributes attributes={attributes} tag={tag} />
        </Card>

        <Card collapsedTitle='Abilities'>
          <Abilities abilities={abilities} />
        </Card>

        <Card collapsedTitle='BIOGRAPHY' title='Biography'>
          <Text>{bio}</Text>
        </Card>

        <Card collapsedTitle='Popular items' title='Popular items'>
          <View style={styles.popular_items}>
            { popular_items.map(tag => {
              const iTAG = tag.replace('item_', '');
              const item = game_items.find(i => i.tag == iTAG);

              return <ItemThumb key={iTAG} item={item} showPrice />
            }) }
          </View>
        </Card>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Layout.padding_small,
  },
  
  hype: { marginBottom: Layout.padding_regular, },

  popular_items: { 
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
})