import React from 'react';
import { StyleSheet, } from 'react-native';
import { connect } from 'react-redux';

import { SCREEN_LABELS, SCREEN_LABELS_HIDDEN, ATTRIBUTES } from '../constants/Constants';
import { Container } from '../components/ui';
import { url } from '../constants/Data';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { headerStyle } from '../utils/screen';
import ListScreen from '../components/ListScreen';
import { model_section } from '../constants/Models';


const _getHeroSections = (heroes) => {    
  const heroSections = [];

  heroes.forEach(hero => {
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

  return heroSections;
}

@connect(state => ({ 
  heroes: state.wiki.heroes,
}))
export default class HeroesScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.HEROES,
    ...headerStyle,
  });
  constructor(props) {
    super(props);
    
    this.state = { heroSections: [] }
  }


  static getDerivedStateFromProps(newProps) {
    return { heroSections: _getHeroSections(newProps.heroes) };
  }


  render() {
    const { heroSections } = this.state;

    return (
      <Container backToHome style={ styles.container }>
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


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.padding_small,
  }
})