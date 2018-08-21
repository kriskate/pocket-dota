export const model_section = ({ title }) => ({
  title,
  data: [],
});


export function model_wiki (data) {
  const { heroes, items, tips, patch_notes, info } = data;
  return { heroes, items, tips, patch_notes, info };
}


export function model_profile (data) {
  const { user=model_user({}), settings=model_settings({}), lastSearch } = data;
  return { user, settings, lastSearch };
}
export function model_user (user) {
  const { name, image, url_profile } = user;
  return { name, image, url_profile };
}
export function model_settings (settings) {
  const { showProfileOnHome, autoUpdateApp, autoUpdateDB } = settings;
  return { showProfileOnHome, autoUpdateApp, autoUpdateDB };
}
export function model_odota (data) {
  const {
    account_id, avatarfull, last_match_time, personaname,
  } = data;
  return {
    account_id, avatarfull, last_match_time, personaname,
  }
}

export const model_item_bonuses = (bonuses) => {
  const {
    bonus_damage, bonus_armor, bonus_magical_armor, bonus_spell_resist,
    bonus_movement_speed, bonus_attack_speed,
    bonus_health, bonus_health_regen,
    bonus_mana, bonus_mana_regen_pct, bonus_mana_regen,
    bonus_strength, bonus_agility, bonus_intellect, bonus_all_stats, bonus_stats,
  } = bonuses
  return {
    bonus_damage, bonus_armor, bonus_magical_armor, bonus_spell_resist,
    bonus_movement_speed, bonus_attack_speed,
    bonus_health, bonus_health_regen,
    bonus_mana, bonus_mana_regen_pct, bonus_mana_regen,
    bonus_strength, bonus_agility, bonus_intellect, bonus_all_stats, bonus_stats,
  }
}
export const model_item_npc = (item) => {
  const {
    UpgradeRecipe, ItemDisassembleRule,
    SideShop, SecretShop, GlobalShop,
  } = item;
  return {
    UpgradeRecipe, ItemDisassembleRule,
    SideShop, SecretShop, GlobalShop,
  }
}
export function model_item (item) {
  const {
    tag,
    name, description, notes, lore,
    cost, mc, cd, attrib,
    category, components,
    npc,
    bonuses,
  } = item;
  return {
    tag,
    name, description, notes, lore,
    cost, mc, cd, attrib,
    category, components,
    npc,
    bonuses,
  };
}

export function model_ability (ability) {
  const {
    tag, name, description, lore,
    img, affects, notes, 
    attrib, cmb, IsGrantedByScepter, HasScepterUpgrade, 
  } = ability;

  return { 
    tag, name, description, lore,
    img, affects, notes, 
    attrib, cmb, IsGrantedByScepter, HasScepterUpgrade, 
  }
}
export function model_talent (talent) {
  return {
    tag, name, description, position,
  } = talent;
}
export function model_hero_attributes (attributes) {
  const {
    AttributePrimary, AttributeBaseAgility, AttributeAgilityGain, AttributeBaseStrength, AttributeStrengthGain, AttributeBaseIntelligence, AttributeIntelligenceGain,
    ArmorPhysical, MagicalResistance,
    StatusHealth, StatusHealthRegen, StatusMana, StatusManaRegen,
    MovementSpeed, MovementTurnRate,
    VisionDaytimeRange, VisionNighttimeRange,
    AttackCapabilities, AttackDamageMin, AttackDamageMax, AttackRate, AttackAnimationPoint, AttackAcquisitionRange, AttackRange, ProjectileSpeed,
    Role, Rolelevels, Complexity,
    Team, HeroID,
  } = attributes;
  return {
    AttributePrimary, AttributeBaseAgility, AttributeAgilityGain, AttributeBaseStrength, AttributeStrengthGain, AttributeBaseIntelligence, AttributeIntelligenceGain,
    ArmorPhysical, MagicalResistance,
    StatusHealth, StatusHealthRegen, StatusMana, StatusManaRegen,
    MovementSpeed, MovementTurnRate,
    VisionDaytimeRange, VisionNighttimeRange,
    AttackCapabilities, AttackDamageMin, AttackDamageMax, AttackRate, AttackAnimationPoint, AttackAcquisitionRange, AttackRange, ProjectileSpeed,
    Role, Rolelevels, Complexity,
    Team, HeroID,
  };
}
export function model_hero (hero) {
  return {
    tag, name, bio, hype,
    popular_items,
    abilities: [], abilities_special: [], abilities_aghs: [], abilities_hidden: [], talents: [],
    attributes = new model_hero_attributes({}),
  } = hero;
}