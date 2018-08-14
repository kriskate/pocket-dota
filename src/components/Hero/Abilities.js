import React from 'react';
import { View, Image, StyleSheet, LayoutAnimation } from 'react-native';
import { url } from '../../constants/Data';
import { Text } from '../ui';
import Layout from '../../constants/Layout';
import Ability from './Ability';
import AbilityPreview from './AbilityPreview';
import { model_ability } from '../../constants/Models';
import { animation } from '../../utils/screen';


export default class Abilities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.abilities[0].tag,
    }
  }
  _onPress = (selected) => {
    LayoutAnimation.configureNext(animation.standard);

    this.setState({ selected });
  }
  render() {
    const { abilities } = this.props;
    const { selected } = this.state;
    const cAbility = model_ability(abilities.find(a => a.tag === selected));

    return (
      <View style={styles.container}>
        <View style={styles.abilities}>
          { abilities.map( ability => <Ability onPress={this._onPress} selected={selected == ability.tag} key={ability.tag} tag={ability.tag} name={ability.name} /> ) }
        </View>
        <AbilityPreview ability={abilities.find(a => a.tag === selected)} />
      </View>
    )
  }
}

// problems: sf, morph, tinker, doom, alch, invo, lone, rubik, kotl, troll, 
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  abilities: {
  },
})