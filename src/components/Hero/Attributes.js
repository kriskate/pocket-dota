import React from 'react';
import { StyleSheet, View, } from "react-native";
// todo - when pull request https://github.com/jeanregisser/react-native-slider/pull/137 , change import to regular 'react-native-slider'
// import Slider from 'react-native-slider';
import Slider from '../../utils/RNSlider_fork';

import { url } from "../../constants/Data";
import Colors from '../../constants/Colors';
import { ATTRIBUTES } from '../../constants/Constants';
import { Image, Text } from '../ui';

import Attribute from './Attribute';
import { calculateAttributes, parseAsNumbers } from '../../utils/CalculateAttributes';
import Layout from '../../constants/Layout';
import { showTip } from '../AppTips';
import Roles from './Roles';
import Complexity from './Complexity';
import { withNamespaces } from 'react-i18next';

import Analytics from '../../utils/Analytics';


@withNamespaces("Screen_Hero")
export default class extends React.Component {
  constructor(props) {
    super(props);

    showTip("attributesSlider");

    this.state = {
      level: 1,
      attributes: parseAsNumbers(props.attributes),
    }
  }

  render() {
    const { t } = this.props;
    const { level } = this.state;

    const { Role, Rolelevels, Complexity: _complexity, AttackCapabilities } = this.props.attributes;

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
          <Attribute val={attackSpeed} title={t("AttackSpeed")} />
          <Attribute val={spellDamage} title={t("SpellAmplification")} />
          <Attribute val={magicResistance} title={t("MagicResistance")} />
          <Attribute val={t(AttackCapabilities)} title={t("AttackType")} />
        </View>

        <View style={styles.slider}>
          <Slider
            value={level}
            onValueChange={level => {
              this.setState({ level });
              Analytics.track(Analytics.events.HERO.CHANGED_LEVEL, { level });
            }}
            step={1} maximumValue={25} minimumValue={1}
            
            trackPressable={true}
            thumbStyle={{ backgroundColor: Colors.goldenrod }}
          />
          <Text style={styles.levelText}>
            { level === 0 ? t("Label_BaseStats") : t("Label_Level") + " " + level }
          </Text>
        </View>

        <View style={styles.misc}>
          <Text style={styles.fixed}>{t("Label_FixedValues")}</Text>
          <Attribute val={parseFloat(MovementTurnRate)} title={t("MovementTurnRate")} />
          <Attribute val={parseFloat(AttackRate)} title={t("BaseAttackRate")} />
          <Attribute val={parseFloat(AttackAnimationPoint)} title={t("AttackAnimationPoint")} />
          <Attribute val={parseFloat(AttackAcquisitionRange)} title={t("AttackAcquisitionRange")} />
          <Attribute val={parseFloat(AttackRange)} title={t("AttackRange")} />
          <Attribute val={this.state.attributes.AttackCapabilities == "DOTA_UNIT_CAP_MELEE_ATTACK" || ProjectileSpeed == "0" ? t("Instant") : parseFloat(ProjectileSpeed)} title={t("ProjectileSpeed")} />
          <Attribute val={parseFloat(VisionDaytimeRange)} title={t("VisionRangeDay")} />
          <Attribute val={parseFloat(VisionNighttimeRange)} title={t("VisionRangeNight")} />
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