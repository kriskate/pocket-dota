import React from 'react';
import { Image, View, Text, StyleSheet, TouchableHighlight, Platform, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { SCREEN_LABELS, SCREEN_LABELS_HIDDEN, ATTRIBUTES } from '../constants/Constants';
import { Container } from '../components/ui';
import { url, local_uri } from '../constants/Data';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { headerStyle } from '../utils/screen';
import ListScreen from '../components/ListScreen';
import { model_section } from '../constants/Models';

@connect(state => ({ 
  heroes: state.wiki.heroes,
}))
export default class HeroesScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.HEROES,
    ...headerStyle,
  });


  render() {
    const { heroes } = this.props;
    
    const heroSections = [];

    heroes.forEach(hero => {
      const { AttributePrimary } = hero;
      let att, color;

      switch(hero.attributes.AttributePrimary) {
        case ATTRIBUTES.agility:
          color = Colors.dota_agi;
          att = 'Agility';
          break;
        case ATTRIBUTES.intelligence:
          color = Colors.dota_int;
          att = 'Intelligence';
          break;
        case ATTRIBUTES.strength:
          color = Colors.dota_str;
          att = 'Strength';
          break;
      }
      let section = heroSections.find(({ title }) => title == att);
      if(!section) {
        section = new model_section({ 
          title: att,
          color,
        });
        heroSections.push(section);
      }

      section.data.push(hero);
    });
    heroSections.forEach(section => section.data.sort((a, b) => 
      (a.name.toUpperCase() <= b.name.toUpperCase()) ? -1 : 1
    ))

    return (
      <Container backToHome>
        <ListScreen
          hasSections
          itemList={heroSections}
          imageAspectRatio={127/71}
          navTo={SCREEN_LABELS_HIDDEN.HERO}
          keyExtractor={(item) => item.tag}
          imageExtractor={item => url.images.small(item.tag)}
          labelExtractor={item => item.name}
        />
      </Container>
    );
  }
}


const thumbAspectRatio = 127/71;
const columns = 3;
const borderWidth = 1;
const thumbWidth = (Layout.window.width - (columns + 1) * Layout.padding_regular - borderWidth * 2 * columns) / columns;
const thumbHeight = thumbWidth/thumbAspectRatio;

const styles = StyleSheet.create({
});
