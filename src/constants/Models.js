export function model_section (section) {
  const { title, color='#d6d6d6', data=[] } = section;

  return { title, color, data, }
};


export function model_wiki (data) {
  const { heroes=[], items=[], tips={}, patch_notes={}, info={} } = data;
  return { heroes, items, tips, patch_notes, info };
}
export function model_wiki_info (data) {
  const {
    appVersion, 
    dotaVersion, 
    dotaVersionDate, 
    wikiVersion,
    wikiVersionDate,
    wikiVersionFolder,
  } = data;
  return {
    appVersion, 
    dotaVersion, 
    dotaVersionDate, 
    wikiVersion,
    wikiVersionDate,
    wikiVersionFolder,
  }
}


export function model_profile (data) {
  const {
    user=model_user({}),
    settings=model_settings({}),
    lastSearch,
    lastSearchResults,
  } = data;
  return {
    user,
    settings,
    lastSearch,
    lastSearchResults,
  };
}
export function model_user (user) {
  const {
    name,
    image,
    account_id,
    last_match_time,
  } = user;
  return {
    name,
    image,
    account_id,
    last_match_time,
  };
}
export function model_settings (settings) {
  const {
    showProfileOnHome=true,
    autoCheckApp=true,
    autoCheckDB=true,
    tipsState=model_tips({}),
  } = settings;
  return {
    showProfileOnHome,
    autoCheckApp,
    autoCheckDB,
    tipsState,
  };
}
export const model_tips = ({
  IOS_slideBack=true,
  drawerSlide=true,
  attributesSlider=true,
  profileAddRequirements=true,
  profileAdd=true,
  profileAdded=true,
}) => ({
  IOS_slideBack,
  drawerSlide,
  attributesSlider,
  profileAddRequirements,
  profileAdd,
  profileAdded,
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
  const {
    tag, name, bio, hype,
    popular_items, item_builds,
    abilities = [], abilities_special = [], abilities_aghs = [], abilities_hidden = [], talents = [],
    attributes = model_hero_attributes({}),
  } = hero;

  return {
    tag, name, bio, hype,
    popular_items, item_builds,
    abilities, abilities_special, abilities_aghs, abilities_hidden, talents,
    attributes,
  };
}


export function model_patch_notes (patch_notes) {
  const {
    version_date,
    changes_short,
    heroes,
    items,
    general,
  } = patch_notes;
  
  return {
    version_date,
    changes_short,
    heroes,
    items,
    general,
  }
}
export function model_patch_notes_hero (hero) {
  const { name, stats, abilities, talents, } = hero;
  return { name, stats, abilities, talents, }
}
export function model_patch_notes_item (item) {
  const { name, description, } = item;
  return { name, description, }
}
export function model_patch_notes_general (general) {
  const { name, description, } = general;
  return { name, description, }
}

export function model_update (update) {
  const {
    updateInProgress = false,

    showApp = false,
    downloadingApp_version = '',
    
    wikiChecking = false,
    showWiki = false,
    downloadingWiki_reason = '',
    downloadingWiki_version =  '',
    downloadingWiki_versionInfo = '',
  } = update;
  return {
    updateInProgress,

    showApp,
    downloadingApp_version,
    
    wikiChecking,
    showWiki,
    downloadingWiki_reason,
    downloadingWiki_version,
    downloadingWiki_versionInfo,
  };
}