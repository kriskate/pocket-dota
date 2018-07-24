import React from 'react';
import { Container, Content, Text, } from 'native-base';
import { View, Image, StyleSheet } from 'react-native';

import ButtonHamburger from '../components/ButtonHamburger';

export default class Screen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('hero').name,
    headerRight: <ButtonHamburger />,
  });

  render() {
    const { name, bio, hype, img_vert, abilities } =  this.props.navigation.getParam('hero');

    return (
      <Container>
        <Content padder>
          <View style={styles.hype}>
            <Text>{hype}</Text>
          </View>
          <Image style={styles.imgHero} source={{ uri: img_vert }} />
          <View style={styles.lore}>
            <Text>{bio}</Text>
          </View>
          <View style={styles.abilities}>
            { abilities.map(ability => (
              <View key={ability.tag}>
                <Image style={styles.imgAbility} source={{ uri: ability.img }} /><Text>{ability.name}</Text>
              </View>
            )) }
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  imgHero: {
    width: 235,
    height: 272,
  },
  imgAbility: {
    width: 90,
    height: 90,
  },
  hype: {

  },
  lore: {

  },
  abilities: {

  },
})