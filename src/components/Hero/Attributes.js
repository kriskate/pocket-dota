import React from 'react';
import { StyleSheet, View, Image } from "react-native";
// todo - when pull request https://github.com/jeanregisser/react-native-slider/pull/137 , change import to regular 'react-native-slider'
// import Slider from 'react-native-slider';
import Slider from '../../utils/RNSlider_fork';

import { assets, url } from "../../constants/Data";
import Colors from '../../constants/Colors';
import { Text } from '../ui';
import { model_hero_attributes } from '../../constants/Models';
import { ATTRIBUTES } from '../../constants/Constants';


const Attribute = ({ src, title, val, lval }) => (
  <View style={styles.attribute}>
    { !src ? null : <Image style={styles.attribute_img} source={assets.attributes[src]} /> }
    { !title ? null : <Text>{title}:</Text> }
    <Text> {val}{lval ? ` (${lval}/lvl)` : ''}</Text>
  </View>
)
const bonusesPerPoint = {
  agi: {
    armor: 0.16, // Increases armor by 0.16.
    attackSpeed: 1, // Increases attack speed by 1.
    moveSpeed: 0.0005, // Increases movement speed by 0.05%.
  },
  int: {
    mana: 12, // Increases maximum mana by 12.
    manaRegen: 0.018, // Amplifies mana regeneration by 1.8%.
    spellDamage: 0.0007, // Amplifies spell damage by 0.07%.
  },
  str: {
    health: 18, // Increases maximum health by 18.
    healthRegen: 0.0055, // Amplifies health regeneration by 0.55%.
    magicResistance: 0.0008, // Increases magic resistance by 0.08%.
  }
}

const multipliers = {
  agility: (AttributePrimary) => AttributePrimary === ATTRIBUTES.agility ? 1.25 : 1,
  intelligence: (AttributePrimary) => AttributePrimary === ATTRIBUTES.intelligence ? 1.25 : 1,
  strength: (AttributePrimary) => AttributePrimary === ATTRIBUTES.strength ? 1.25 : 1,
}
const round = (nr, to=10) => Math.round(nr*to)/to;

// as taken from https://liquipedia.net/dota2/Hero_Attributes#Attribute_Bonus
const calc = {
  parseAsNumbers: (attributes) => {
    const d = {};
    Object.keys(attributes).forEach(attribute => d[attribute] = Number(attributes[attribute]))
    return d;
  },

  bonus: (gain, level) => level === 0 ? 0 : Math.round(gain * (level-1)),

  // For heroes it is their given damage value plus their total primary attribute.
  damageBase: (attributes, agility, intelligence, strength) => {
    const fromPoints = 
        attributes.AttributePrimary == ATTRIBUTES.agility ? agility
      : attributes.AttributePrimary == ATTRIBUTES.intelligence ? intelligence
      : strength;

    return {
      min: attributes.AttackDamageMin + fromPoints,
      max: attributes.AttackDamageMax + fromPoints,
    }
  },

  bonusesAgi: (attributes, agility) => {
    const multiplier = multipliers.agility(attributes.AttributePrimary);

    return {
      armor: round(attributes.ArmorPhysical + agility * bonusesPerPoint.agi.armor * multiplier),
      attackSpeed: Math.round(attributes.AttackRate * (1 + agility * bonusesPerPoint.agi.attackSpeed * multiplier)),
      moveSpeed: Math.round(attributes.MovementSpeed * (1 + agility * bonusesPerPoint.agi.moveSpeed * multiplier)),
    }
  },
  bonusesInt: (attributes, intelligence) => {
    const multiplier = multipliers.intelligence(attributes.AttributePrimary);
    
    return { 
      mana: Math.round(attributes.StatusMana + intelligence * bonusesPerPoint.int.mana * multiplier),
      manaRegen: round(attributes.StatusManaRegen * (1 + bonusesPerPoint.int.manaRegen * intelligence * multiplier), 100),
      spellDamage: 10,
    }
  },

  bonusesStr: (attributes, strength) => {
    const multiplier = multipliers.strength(attributes.AttributePrimary);

    return {
      health: Math.round(attributes.StatusHealth + strength * bonusesPerPoint.str.health * multiplier),
      healthRegen: round(attributes.StatusHealthRegen * (1 + bonusesPerPoint.str.healthRegen * strength * multiplier)),
      magicResistance: (round(1 - ((1 - attributes.MagicalResistance/100) * (1 - strength * bonusesPerPoint.str.magicResistance * multiplier)), 100)*100).toFixed() + '%',
    }
  },
  
}


export default class extends React.Component {
  constructor(props) {
    super(props, attributes);

    this.state = {
      level: 0,
      attributes: calc.parseAsNumbers(props.attributes),
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
    const attributes = model_hero_attributes(this.state.attributes);

    const {
      bonusAgi = calc.bonus(attributes.AttributeAgilityGain, level),
      bonusInt = calc.bonus(attributes.AttributeIntelligenceGain, level),
      bonusStr = calc.bonus(attributes.AttributeStrengthGain, level),

      agility = attributes.AttributeBaseAgility + bonusAgi,
      intelligence = attributes.AttributeBaseIntelligence + bonusInt,
      strength = attributes.AttributeBaseStrength + bonusStr,

      damage = calc.damageBase(attributes, agility, intelligence, strength),

      bonusesAgi = calc.bonusesAgi(attributes, agility),
      armor = bonusesAgi.armor,
      attackSpeed = bonusesAgi.attackSpeed,
      moveSpeed = bonusesAgi.moveSpeed,

      bonusesInt = calc.bonusesInt(attributes, intelligence),
      mana = bonusesInt.mana,
      manaRegen = bonusesInt.manaRegen,
      spellDamage = bonusesInt.spellDamage,

      bonusesStr = calc.bonusesStr(attributes, strength),
      health = bonusesStr.health,
      healthRegen = bonusesStr.healthRegen,
      magicResistance = bonusesStr.magicResistance,
    } = {}


    return (
      <View style={[styles.attributes, this.props.style]}>
        {/* <Text style={styles.attributesText}>Attributes:</Text> */}

        <View style={styles.content}>
          <Image style={styles.imgHero} source={{ uri: url.images.vert(this.props.tag) }} />
          <View>
            <Attribute val={agility} lval={attributes.AttributeAgilityGain} src='agi' />
            <Attribute val={intelligence} lval={attributes.AttributeIntelligenceGain} src='int' />
            <Attribute val={strength} lval={attributes.AttributeStrengthGain} src='str' />
            <Attribute val={`${damage.min} - ${damage.max}`} src='attack' />
            <Attribute val={armor} src='defense' />
            <Attribute val={moveSpeed} src='speed' />
          </View>
          <View>
            <Attribute val={attackSpeed} title='Attack Speed' />
            <Attribute val={spellDamage} title='Spell Amplification' />
            <Attribute val={magicResistance} title='Magic Resistance' />
          </View>
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
            <View>
              <Text style={{ backgroundColor: Colors.dota_agi }}>{health} +{healthRegen}</Text>
              <Text style={{ backgroundColor: Colors.dota_int }}>{mana} +{manaRegen}</Text>
            </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  slider: {

  },
  attribute_img: {
    resizeMode: 'contain',
  },
  attribute: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  attributesText: {
    textAlign: 'center',
    backgroundColor: Colors.dota_ui2,
  },
  attributes: {
    borderRadius: 3,
    borderWidth: 3,
    borderColor: Colors.dota_ui2,

    justifyContent: 'space-around',
    alignContent: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgHero: {
    flex: 1,
    alignSelf: 'stretch',

    borderRadius: 3,
    borderWidth: 3,
    borderColor: Colors.dota_ui2,
  },
})