import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


import ButtonHamburger from '../components/ButtonHamburger';
import { Text, Container } from '../components/ui';
import Abilities from '../components/Hero/Abilities';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { model_hero, model_hero_attributes } from '../constants/Models';
import Attributes from '../components/Hero/Attributes';
import ImageVert from '../components/Hero/ImageVert';
import Card from '../components/ui/Card';


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
      <Container scrollable padInner style={styles.container} >

        <Card style={styles.row} collapsedTitle='Hype and Stats'>
          <Text>{hype}</Text>

          <View style={styles.imgHeroWrapper}>
            <ImageVert />
            <Attributes />
          </View>
        </Card>
        
        <Card style={styles.row} collapsedTitle='BIOGRAPHY'>
          <Text>{bio}</Text>
        </Card>

        <Card style={styles.row}>
          <Abilities abilities={abilities} />
        </Card>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
  },
  imgHeroWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Layout.paddingSmall,
  },

  hype: {

  },
  lore: {

  },
})