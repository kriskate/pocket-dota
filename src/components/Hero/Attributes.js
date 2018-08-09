import React from 'react';
import { StyleSheet, View, Image, Animated, Platform } from "react-native";
// todo - when pull request https://github.com/jeanregisser/react-native-slider/pull/137 , change import to regular 'react-native-slider'
// import Slider from 'react-native-slider';
import Slider from '../../utils/RNSlider_fork';

import { assets, url } from "../../constants/Data";
import Colors from '../../constants/Colors';
import { Text } from '../ui';
import { model_hero_attributes } from '../../constants/Models';

import Attribute from './Attribute';
import { calculateAttributes, parseAsNumbers } from '../../utils/CalculateAttributes';



export default class extends React.Component {
  constructor(props) {
    super(props, attributes);

    this.state = {
      level: 0,
      attributes: parseAsNumbers(props.attributes),
      thumbScale: new Animated.Value(1),
    }
  }

  pulse = () => {
    Animated.sequence([
      Animated.timing(this.state.thumbScale, {
        toValue: 1.4,
        duration: 1000,
      }),
      Animated.timing(this.state.thumbScale, {
        toValue: 1,
        duration: 1000,
      }),
    ]).start(() => { this.pulse(); });
  }
  componentDidMount() {
    this.pulse();
  }

  render() {
    const { level } = this.state;

    const { 
      agility, intelligence, strength, agiGain, intGain, strGain,
      damage, armor, moveSpeed, attackSpeed, spellDamage, magicResistance,
      health, healthRegen, mana, manaRegen,
    } = calculateAttributes(this.state.attributes, level);

    return (
      <View style={styles.container}>

        <View style={styles.mainAttributes}>
          <Image style={styles.imgHero} source={{ uri: url.images.vert(this.props.tag) }} />

          <View style={styles.attributesRight}>
            <Attribute val={agility} lval={agiGain} src='agi' />
            <Attribute val={intelligence} lval={intGain} src='int' />
            <Attribute val={strength} lval={strGain} src='str' />
            <Attribute val={`${damage.min} - ${damage.max}`} src='attack' />
            <Attribute val={armor} src='defense' />
            <Attribute val={moveSpeed} src='speed' />

            <View style={styles.healthAndMana}>
              <Text style={{ backgroundColor: Colors.dota_agi }}>{health} +{healthRegen}</Text>
              <Text style={{ backgroundColor: Colors.dota_int }}>{mana} +{manaRegen}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.secondaryAttributes}>
          <Attribute val={attackSpeed} title='Attack Speed' />
          <Attribute val={spellDamage} title='Spell Amplification' />
          <Attribute val={magicResistance} title='Magic Resistance' />
        </View>

        <View style={styles.slider}>
          <Slider
            value={level}
            onValueChange={level => this.setState({ level })}
            step={1} maximumValue={25} minimumValue={0}
            
            trackPressable={true}
            thumbStyle={{ transform: [{ scale: this.state.thumbScale }], backgroundColor: Colors.goldenrod }}
          />
          <Text>
            { level === 0 ? 'Base stats' : `Level: ${level}` }
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    borderWidth: 3,
    borderColor: Colors.dota_ui2,

    justifyContent: 'space-around',
    alignContent: 'flex-end',
  },

  mainAttributes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imgHero: {
    flex: 2,
    alignSelf: 'stretch',
    
    borderRadius: 3,
    borderWidth: 3,
    borderColor: Colors.dota_ui2,
  },

  secondaryAttributes: {},

  healthAndMana: {},
})