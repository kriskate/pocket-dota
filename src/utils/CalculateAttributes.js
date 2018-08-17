import { model_hero_attributes } from "../constants/Models";
import { ATTRIBUTES } from '../constants/Constants';


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
  bonus: (gain, level) => level === 0 ? 0 : Math.round(gain * (level-1)),
// 22 + 2.8 * 24 = 89.2 + 51
  // For heroes it is their given damage value plus their total primary attribute.
  damageBase: (attributes, agility, intelligence, strength) => {
    let fromPoints;
      switch(attributes.AttributePrimary) {
        case ATTRIBUTES.agility:
          fromPoints = agility;
        break;
        case ATTRIBUTES.intelligence:
          fromPoints = intelligence;
        break;
        case ATTRIBUTES.strength:
          fromPoints = strength;
        break;
      }
    return {
      min: attributes.AttackDamageMin + fromPoints,
      max: attributes.AttackDamageMax + fromPoints,
    }
  },

  bonusesAgi: (attributes, agility) => {
    const multiplier = multipliers.agility(attributes.AttributePrimary);

    return {
      armor: round(attributes.ArmorPhysical + agility * bonusesPerPoint.agi.armor * multiplier),
      attackSpeed: round(attributes.AttackRate * (1 + agility * bonusesPerPoint.agi.attackSpeed * multiplier)),
      moveSpeed: round(attributes.MovementSpeed * (1 + agility * bonusesPerPoint.agi.moveSpeed * multiplier), 1),
    }
  },
  bonusesInt: (attributes, intelligence) => {
    const multiplier = multipliers.intelligence(attributes.AttributePrimary);
    
    return { 
      mana: round(attributes.StatusMana + intelligence * bonusesPerPoint.int.mana * multiplier),
      manaRegen: round(attributes.StatusManaRegen * (1 + bonusesPerPoint.int.manaRegen * intelligence * multiplier), 100),
      spellDamage: (round(1 - (1 - intelligence * bonusesPerPoint.int.spellDamage * multiplier), 1000)*100).toFixed(1) + '%',
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

export const parseAsNumbers = (attributes) => {
  const d = {};
  const notNumbers = ['AttributePrimary', 'DOTA_UNIT_CAP_MELEE_ATTACK', 'Role', 'Team']
  Object.keys(attributes).forEach(attribute => d[attribute] = isNaN(Number(attributes[attribute])) ? attributes[attribute] : Number(attributes[attribute]));
  return d;
}


export const calculateAttributes = (attributes, level) => {
  attributes = model_hero_attributes(attributes);

  const bonusAgi = calc.bonus(attributes.AttributeAgilityGain, level),
        bonusInt = calc.bonus(attributes.AttributeIntelligenceGain, level),
        bonusStr = calc.bonus(attributes.AttributeStrengthGain, level),

        agility = attributes.AttributeBaseAgility + bonusAgi,
        intelligence = attributes.AttributeBaseIntelligence + bonusInt,
        strength = attributes.AttributeBaseStrength + bonusStr;
    const 
        bonusesAgi = calc.bonusesAgi(attributes, agility),
        bonusesInt = calc.bonusesInt(attributes, intelligence),
        bonusesStr = calc.bonusesStr(attributes, strength);

  return {
    bonusAgi, bonusInt, bonusStr,
    agility, intelligence, strength,

    agiGain: attributes.AttributeAgilityGain,
    intGain: attributes.AttributeIntelligenceGain,
    strGain: attributes.AttributeStrengthGain,

    damage: calc.damageBase(attributes, agility, intelligence, strength),

    armor: bonusesAgi.armor,
    attackSpeed: bonusesAgi.attackSpeed,
    moveSpeed: bonusesAgi.moveSpeed,

    mana: bonusesInt.mana,
    manaRegen: bonusesInt.manaRegen,
    spellDamage: bonusesInt.spellDamage,

    health: bonusesStr.health,
    healthRegen: bonusesStr.healthRegen,
    magicResistance: bonusesStr.magicResistance,
  }
}