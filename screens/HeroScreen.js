import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


import ButtonHamburger from '../components/ButtonHamburger';
import { Text, Container } from '../components/ui';
import { url, assets } from '../constants/Data';
import Abilities from '../components/Hero/Abilities';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { model_hero, model_hero_attributes } from '../constants/Models';

const Attribute = ({ src, bval, lval }) => (
  <View style={styles.attribute}>
    <Image source={assets.attributes[src]} />
    <Text> {bval}{lval ? ` + ${lval} /lvl` : ''} </Text>
  </View>
)

export default class HeroScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('hero').name,
    headerRight: <ButtonHamburger />,
  });

  render() {
    const { name, bio, hype, tag, abilities } =  this.props.navigation.getParam('hero');
    const hero = model_hero(this.props.navigation.getParam('hero'));
    const attributes = model_hero_attributes(hero.attributes);


    return (
      <Container scrollable padInner>

        <View style={styles.hype}>
          <Text>{hype}</Text>
        </View>

        <View style={styles.imgHeroWrapper}>
          <Image style={styles.imgHero} source={{ uri: url.images.vert(tag) }} />

          <View style={styles.attributes}>
            <Text style={styles.attributesText}>Attributes:</Text>
            <Attribute src='agi' bval={attributes.AttributeBaseAgility} lval={Number(attributes.AttributeAgilityGain)} />
            <Attribute src='int' bval={attributes.AttributeBaseIntelligence} lval={Number(attributes.AttributeIntelligenceGain)} />
            <Attribute src='str' bval={attributes.AttributeBaseStrength} lval={attributes.AttributeBaseStrength} />
            <Attribute src='attack' bval={`${attributes.AttackDamageMin} - ${attributes.AttackDamageMax}`} />
            <Attribute src='defense' bval={attributes.ArmorPhysical} />
            <Attribute src='speed' bval={attributes.MovementSpeed} />
          </View>
        </View>

        <View style={styles.lore}>
          <Text>{bio}</Text>
        </View>
        <Abilities abilities={abilities} />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  imgHeroWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Layout.paddingSmall,
  },
  imgHero: {
    width: 235,
    height: 272,

    borderRadius: 3,
    borderWidth: 3,
    borderColor: Colors.dota_ui2,
  },
  attribute: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  attributesText: {
    textAlign: 'center',
    backgroundColor: Colors.dota_ui2,
  },
  attributes: {
    borderRadius: 3,
    borderWidth: 3,
    borderColor: Colors.dota_ui2,

    justifyContent: 'space-around',
    alignContent: 'flex-end',
  },


  hype: {

  },
  lore: {

  },
})