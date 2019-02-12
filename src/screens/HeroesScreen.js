import React from 'react';
import { StyleSheet, } from 'react-native';
import { connect } from 'react-redux';

import { SCREEN_LABELS_HIDDEN, ATTRIBUTES } from '../constants/Constants';
import { Container } from '../components/ui';
import { url } from '../constants/Data';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { headerStyle } from '../utils/screen';
import ListScreen from '../components/ListScreen';
import { model_section } from '../constants/Models';
import { withNamespaces } from 'react-i18next';
import i18next from 'i18next';


const _getHeroSections = (heroes, t) => {    
  const heroSections = [
    new model_section({ title: t("MainAttribute_Agility"), color: Colors.dota_agi }),
    new model_section({ title: t("MainAttribute_Intelligence"), color: Colors.dota_int }),
    new model_section({ title: t("MainAttribute_Strength"), color: Colors.dota_str }),
  ];

  heroes.forEach(hero => {
    let att;

    switch(hero.attributes.AttributePrimary) {
      case ATTRIBUTES.agility:
        att = t("MainAttribute_Agility");
        break;
      case ATTRIBUTES.intelligence:
        att = t("MainAttribute_Intelligence");
        break;
      case ATTRIBUTES.strength:
        att = t("MainAttribute_Strength");
        break;
    }

    let section = heroSections.find(({ title }) => title == att);
    section.data.push(hero);
  });
  heroSections.forEach(section => section.data.sort((a, b) => 
    (a.name.toUpperCase() <= b.name.toUpperCase()) ? -1 : 1
  ))

  return heroSections;
}

@withNamespaces("Screen_Heroes")
@connect(state => ({ 
  heroes: state.wiki.heroes,
}))
export default class HeroesScreen extends React.PureComponent {
  static navigationOptions = () => ({
    title: i18next.t("Constants:SCREEN_LABELS.HEROES"),
    ...headerStyle,
  });
  constructor(props) {
    super(props);
    
    this.state = { heroSections: [] }
  }


  static getDerivedStateFromProps(newProps) {
    return { heroSections: _getHeroSections(newProps.heroes, newProps.t) };
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