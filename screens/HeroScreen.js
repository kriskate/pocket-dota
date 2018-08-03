import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


import ButtonHamburger from '../components/ButtonHamburger';
import { Text, Container } from '../components/ui';
import { url } from '../constants/Data';
import Abilities from '../components/Abilities';

export default class HeroScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('hero').name,
    headerRight: <ButtonHamburger />,
  });

  render() {
    const { name, bio, hype, tag, abilities } =  this.props.navigation.getParam('hero');

    return (
      <Container scrollable padInner>
        <View style={styles.hype}>
          <Text>{hype}</Text>
        </View>
        <View style={styles.imgHeroWrapper}>
          <Image style={styles.imgHero} source={{ uri: url.images.vert(tag) }} />
        </View>

        <View style={styles.lore}>
          <Text>{bio}</Text>
        </View>
        <Abilities abilities={abilities} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  imgHeroWrapper: {
    alignItems: 'center',
  },
  imgHero: {
    width: 235,
    height: 272,
  },
  hype: {

  },
  lore: {

  },
})