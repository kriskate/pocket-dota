export function model_data (data) {
  return {
    heroes, items, tips, patch_notes, info
  } = data;
}

export function model_user (user) {
  return {
    name, image, url_profile,
  } = user;
}


export function model_item (item) {
  return {
    tag, id,
    img, name, desc, notes, lore,
    qual, cost, ItemDisassembleRule, components,
    attrib, mc, cooldown, created, AbilityCastRange,
  } = item;
}


export function model_ability (ability) {
  return { 
    tag, name, description, lore,
    img, affects, notes, 
    attrib, cmb, IsGrantedByScepter, HasScepterUpgrade, 
  } = ability;
}
export function model_talent (talent) {
  return {
    tag, name, description, position,
  } = talent;
}
export function model_hero_attributes (attributes) {
  return {
    AttributePrimary, AttributeBaseAgility, AttributeAgilityGain, AttributeBaseStrength, AttributeStrengthGain, AttributeBaseIntelligence, AttributeIntelligenceGain,
    ArmorPhysical, MagicalResistance,
    StatusHealth, StatusHealthRegen, StatusMana, StatusManaRegen,
    MovementSpeed, MovementTurnRate,
    VisionDaytimeRange, VisionNighttimeRange,
    AttackCapabilities, AttackDamageMin, AttackDamageMax, AttackRate, AttackAnimationPoint, AttackAcquisitionRange, AttackRange, ProjectileSpeed,
    Role, Rolelevels, Complexity,
    Team, HeroID,
  } = attributes;
}
export function model_hero (hero) {
  return {
    tag, name, bio, hype,
    img_small, img_full, img_vert,
    popular_items,
    abilities: [], abilities_special: [], abilities_aghs: [], abilities_hidden: [], talents: [],
    attributes = new model_hero_attributes({}),
  } = hero;
}