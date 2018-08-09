import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


import ButtonHamburger from '../components/ButtonHamburger';
import { Text, Container } from '../components/ui';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { model_hero } from '../constants/Models';

import Card from '../components/ui/Card';

import Abilities from '../components/Hero/Abilities';
import Attributes from '../components/Hero/Attributes';
import { url } from '../constants/Data';
import { ATTRIBUTES } from '../constants/Constants';

import { headerStyle } from '../utils/screen';

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
    const { name, bio, hype, tag, abilities } =  this.props.navigation.getParam('hero');
    const hero = model_hero(this.props.navigation.getParam('hero'));


    return (
      <Container scrollable style={styles.container} >
        <Card style={styles.row} collapsedTitle='Hype and Stats'>
          <Text style={styles.hype}>{hype}</Text>

          <Image style={styles.imgHero} source={{ uri: url.images.vert(tag) }} />

          <Attributes style={styles.attributes} attributes={attributes} />
        </Card>

        <Card style={styles.row}>
          <Abilities abilities={abilities} />
        </Card>

        <Card style={styles.row} collapsedTitle='BIOGRAPHY'>
          <Text>{bio}</Text>
        </Card>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Layout.paddingSmall
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  imgHero: {
    flex: 1,
    alignSelf: 'stretch',

    width: undefined,
    height: undefined,

    borderRadius: 3,
    borderWidth: 3,
    borderColor: Colors.dota_ui2,
  },

  hype: {
    width: "100%",
  },
  attributes: {

  },

  lore: {

  },
})