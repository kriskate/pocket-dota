import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, Container, Card, } from '../components/ui';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { model_hero } from '../constants/Models';

import Abilities from '../components/Hero/Abilities';
import Attributes from '../components/Hero/Attributes';
import ItemBuild from '../components/Hero/ItemBuild';
import { ATTRIBUTES } from '../constants/Constants';

import { headerStyleHidden } from '../utils/screen';
import { HTML } from '../components/Hero/AbilityPreview';


export default class HeroScreen extends React.PureComponent {
  static navigationOptions = () => ({
    ...headerStyleHidden
  });

  getHeaderColor = () => {
    const hero = model_hero(this.props.navigation.getParam('data'));

    let primaryAttColor;
    switch(hero.attributes.AttributePrimary) {
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
    return primaryAttColor;
  }

  render() {
    const hero = model_hero(this.props.navigation.getParam('data'));
    const { name, bio, hype, tag, abilities, item_builds } = hero;

    return (
      <Container scrollable style={styles.container} header header_title={name} header_titleColor={this.getHeaderColor()}>
        <Card title='Hype and Stats'>
          <Text style={styles.hype}>{hype}</Text>

          <Attributes attributes={attributes} tag={tag} />
        </Card>

        <Card title='Abilities'>
          <Abilities abilities={abilities} />
        </Card>

        <Card title='Biography' showTitleWhenOpened>
          <HTML htmlContent={bio} style={{ backgroundColor: Colors.dota_ui1 }} />
        </Card>

        <Card title='Recommended item build' showTitleWhenOpened>
          <ItemBuild item_builds={item_builds} />
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

})