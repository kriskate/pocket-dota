export const model_section = ({ title, color='#1B1E21', data=[] }) => ({
  title,
  color,
  data,
});


export function model_wiki (data) {
  const { heroes, items, tips, patch_notes, info } = data;
  return { heroes, items, tips, patch_notes, info };
}


export function model_profile (data) {
  const {
    user=model_user({}),
    settings=model_settings({}),
    lastSearch,
  } = data;
  return {
    user,
    settings,
    lastSearch,
  };
}
export function model_user (user) {
  const {
    name,
    image,
    account_id,
  } = user;
  return {
    name,
    image,
    account_id,
  };
}
export function model_settings (settings) {
  const {
    showProfileOnHome=true,
    autoUpdateApp=true,
    autoUpdateDB=true,
    tipsState=model_tips({}),
  } = settings;
  return {
    showProfileOnHome,
    autoUpdateApp,
    autoUpdateDB,
    tipsState,
  };
}
export const model_tips = ({
  IOS_slideBack=true,
  drawerSlide=true,
  addProfile=true,
  attributesSlider=true,
}) => ({
  IOS_slideBack,
  drawerSlide,
  addProfile,
  attributesSlider,
})


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
    cost, manacost, cooldown, attrib,
    category, components, recipeCost,
    npc,
    bonuses,
  } = item;
  return {
    tag,
    name, description, notes, lore,
    cost, manacost, cooldown, attrib,
    category, components, recipeCost,
    npc,
    bonuses,
  };
}

export function model_itembuild (build) {
  const {
    DOTA_Item_Build_Starting_Items,
    DOTA_Item_Build_Starting_Items_Secondary,
    DOTA_Item_Build_Early_Game,
    DOTA_Item_Build_Early_Game_Secondary,
    DOTA_Item_Build_Core_Items,
    DOTA_Item_Build_Core_Items_Secondary,
    DOTA_Item_Build_Mid_Items,
    DOTA_Item_Build_Late_Items,
    DOTA_Item_Build_Other_Items,
    DOTA_Item_Build_Luxury,
  } = build;
  return {
    DOTA_Item_Build_Starting_Items,
    DOTA_Item_Build_Starting_Items_Secondary,
    DOTA_Item_Build_Early_Game,
    DOTA_Item_Build_Early_Game_Secondary,
    DOTA_Item_Build_Core_Items,
    DOTA_Item_Build_Core_Items_Secondary,
    DOTA_Item_Build_Mid_Items,
    DOTA_Item_Build_Late_Items,
    DOTA_Item_Build_Other_Items,
    DOTA_Item_Build_Luxury,
  }
}
export function model_ability (ability) {
  const {
    tag, name, affects, description,
    notes, attrib, cooldown, manacost,
    lore, IsGrantedByScepter, HasScepterUpgrade
  } = ability;

  return {
    tag, name, affects, description,
    notes, attrib, cooldown, manacost,
    lore, IsGrantedByScepter, HasScepterUpgrade
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