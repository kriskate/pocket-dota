import React from 'react';
import { StyleSheet, TextInput, View, } from 'react-native';
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


const _getHeroSections = (heroes, search, t) => {
  const r = new RegExp(search, 'i');

  const heroSections = [
    new model_section({ title: t("MainAttribute_Agility"), color: Colors.dota_agi }),
    new model_section({ title: t("MainAttribute_Intelligence"), color: Colors.dota_int }),
    new model_section({ title: t("MainAttribute_Strength"), color: Colors.dota_str }),
  ];

  heroes.forEach(hero => {
    if(search && !r.test(hero.name)) return;

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

  // to-do: delegate sections to backend
  // sort hero names
  heroSections.forEach(section => section.data.sort((a, b) => 
    (a.name <= b.name) ? -1 : 1
  ));

  return heroSections;
}

@withNamespaces("Screen_Heroes")
@connect(state => ({ 
  heroes: state.wiki.wikiData.heroes,
}))
export default class HeroesScreen extends React.PureComponent {
  static navigationOptions = () => ({
    title: i18next.t("Constants:SCREEN_LABELS.HEROES"),
    ...headerStyle,
  });
  constructor(props) {
    super(props);
    
    this.state = { 
      heroSections: [],
      heroSearch: '',
    }
  }


  static getDerivedStateFromProps(newProps, state) {
    return { heroSections: _getHeroSections(newProps.heroes, state.search, newProps.t) };
  }

  _handleChange = (search) => this.setState({ search })


  render() {
    const { heroSections, search } = this.state;

    return (
      <Container backToHome style={ styles.container } scrollable>

        <View style={styles.search}>
          <TextInput style={styles.searchBox}
            selectTextOnFocus
            placeholder={"Search"}
            returnKeyType='search'
            enablesReturnKeyAutomatically
            onChangeText={this._handleChange}
            value={search}
          />
        </View>

        <ListScreen
          scrollEnabled={false}

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
  },


  search: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.padding_regular,
    marginVertical: Layout.padding_regular,
  },
  searchBox: {
    marginRight: Layout.padding_regular,
    backgroundColor: Colors.dota_white,
    padding: Layout.padding_small,
    borderRadius: 5,
    flex: 1,
  },
})