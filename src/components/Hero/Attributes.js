import React from 'react';
import { StyleSheet, View, Image, Animated, Platform } from "react-native";
// todo - when pull request https://github.com/jeanregisser/react-native-slider/pull/137 , change import to regular 'react-native-slider'
// import Slider from 'react-native-slider';
import Slider from '../../utils/RNSlider_fork';

import { url } from "../../constants/Data";
import Colors from '../../constants/Colors';
import { ATTRIBUTES } from '../../constants/Constants';
import { Text } from '../ui';

import Attribute from './Attribute';
import { calculateAttributes, parseAsNumbers } from '../../utils/CalculateAttributes';
import Layout from '../../constants/Layout';
import { showTip, APP_TIPS } from '../AppTips';
import Roles from './Roles';
import Complexity from './Complexity';


export default class extends React.Component {
  constructor(props) {
    super(props);

    showTip(APP_TIPS.ATTRIBUTES_SLIDER);

    this.state = {
      level: 1,
      attributes: parseAsNumbers(props.attributes),
    }
  }

  render() {
    const { level } = this.state;

    const { Role, Rolelevels, Complexity: _complexity } = this.props.attributes;

    const { 
      agility, intelligence, strength, agiGain, intGain, strGain,
      damage, armor, moveSpeed, attackSpeed, spellDamage, magicResistance,
      health, healthRegen, mana, manaRegen,
    } = calculateAttributes(this.state.attributes, level);

    const { 
      MovementTurnRate, 
      AttackRate, AttackAnimationPoint, AttackAcquisitionRange, AttackRange, ProjectileSpeed,
      VisionDaytimeRange, VisionNighttimeRange,
    } = this.props.attributes;

    return (
      <View style={styles.container}>

        <View style={styles.mainAttributes}>
          <Complexity level={parseInt(_complexity)} />

          <Roles roles={Role} roleLevels={Rolelevels} />

          <Image style={styles.imgHero} source={{ uri: url.images.vert(this.props.tag) }} />

          <View style={styles.attributesRight}>
            <Attribute val={agility} lval={agiGain} src='agi' />
            <Attribute val={intelligence} lval={intGain} src='int' />
            <Attribute val={strength} lval={strGain} src='str' />
            <Attribute val={`${damage.min} - ${damage.max}`} src='attack' />
            <Attribute val={armor} src='defense' />
            <Attribute val={moveSpeed} src='speed' />

            <View style={styles.healthAndMana}>
              <Text style={[styles.HM, {backgroundColor: Colors.dota_agi}]}>{health}   (+{healthRegen})</Text>
              <Text style={[styles.HM, {backgroundColor: Colors.dota_int}]}>{mana}   (+{manaRegen})</Text>
            </View>
          </View>
        </View>

        <View style={styles.secondaryAttributes}>
          <Attribute val={attackSpeed} title='Attack Speed' />
          <Attribute val={spellDamage} title='Spell Amplification' />
          <Attribute val={magicResistance} title='Magic Resistance' />
          <Attribute val={ATTRIBUTES[this.state.attributes.AttackCapabilities]} title='Attack type' />
        </View>

        <View style={styles.slider}>
          <Slider
            value={level}
            onValueChange={level => this.setState({ level })}
            step={1} maximumValue={25} minimumValue={1}
            
            trackPressable={true}
            thumbStyle={{ backgroundColor: Colors.goldenrod }}
          />
          <Text style={styles.levelText}>
            { level === 0 ? 'Base stats' : `Level: ${level}` }
          </Text>
        </View>

        <View style={styles.misc}>
          <Text style={styles.fixed}>Fixed values:</Text>
          <Attribute val={parseFloat(MovementTurnRate)} title='Movement Turn Rate' />
          <Attribute val={parseFloat(AttackRate)} title='Base Attack Rate' />
          <Attribute val={parseFloat(AttackAnimationPoint)} title='Attack Animation Point' />
          <Attribute val={parseFloat(AttackAcquisitionRange)} title='Attack Acquisition Range' />
          <Attribute val={parseFloat(AttackRange)} title='Attack Range' />
          <Attribute val={this.state.attributes.AttackCapabilities == "DOTA_UNIT_CAP_MELEE_ATTACK" || ProjectileSpeed == "0" ? "Instant" : parseFloat(ProjectileSpeed)} title='Projectile Speed' />
          <Attribute val={parseFloat(VisionDaytimeRange)} title="Vision Range (Day)" />
          <Attribute val={parseFloat(VisionNighttimeRange)} title="Vision Range (Night)" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // todo: for tablet, modify these % widths, in order to fit well
  container: {
    borderRadius: 3,
    borderWidth: 3,
    borderColor: Colors.dota_ui2,

    paddingLeft: Layout.padding_small,
    paddingRight: Layout.padding_small,

    justifyContent: 'space-around',
    alignContent: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  mainAttributes: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imgHero: {
    width: '55%',
    alignSelf: 'stretch',
    
    borderRadius: 3,
    borderWidth: 3,
    borderColor: Colors.dota_ui2,
  },
  attributesRight: {
    width: '45%',
  },
  healthAndMana: { paddingHorizontal: Layout.padding_small, },

  secondaryAttributes: {
    paddingTop: Layout.padding_small,
    width: '100%',
  },
  fixed: {
    fontWeight: 'bold',
    color: Colors.dota_red,
  },
  misc: {
    width: '90%',
    paddingBottom: Layout.padding_regular,
  },

  slider: {
    width: '100%',
  },

  HM: {
    borderRadius: 3,
    marginVertical: Layout.padding_small,
    paddingHorizontal: Layout.padding_small,
    alignItems: 'center',
    // justifyContent: 'center',
    textAlign: 'center',
    color: Colors.dota_white,
    textShadowColor: Colors.dota_black,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
  },

  levelText: {
    color: Colors.goldenrod,
    textAlign: 'center',
    marginBottom: Layout.padding_regular,
  }
})