import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Colors from './Colors';
import { Text } from '../components/ui';
import { Constants } from 'expo';

let _wikiVersion;
export const setWikiVersion = ({ app_version, currentWikiVersion }) => {
  _wikiVersion = !app_version ? null :
    `${app_version}.${currentWikiVersion}`;
}

export const GET_WIKI_VERSION = () => _wikiVersion;

export const ITEM_CONSTANTS = {
  DISSASEMBLE: 'DOTA_ITEM_DISASSEMBLE_ALWAYS',
  BUILDS: {
    DOTA_Item_Build_Starting_Items: "Starting items",
    DOTA_Item_Build_Starting_Items_Secondary: "Starting items (bear)",
    DOTA_Item_Build_Early_Game: "Early-game items",
    DOTA_Item_Build_Early_Game_Secondary: "Early-game items (bear)",
    DOTA_Item_Build_Core_Items: "Core items",
    DOTA_Item_Build_Core_Items_Secondary: "Core items (bear)",
    DOTA_Item_Build_Mid_Items: "Mid-game items",
    DOTA_Item_Build_Late_Items: "Late-game items",
    DOTA_Item_Build_Other_Items: "Other/ Luxury items",
    DOTA_Item_Build_Luxury: "Other/ Luxury items",
  }
}

export const HOME_LABELS = {
  HEROES: 'HEROES',
  ITEMS: 'ITEMS',
  TIPS: 'TIPS',

  STATS: 'PLAYER STATISTICS',
}
export const SCREEN_LABELS = {
  HOME: 'Home',

  HEADER_WIKI: 'Wiki',
  HEROES: 'Heroes',
  ITEMS: 'Items',
  
  HEADER_GAME: 'Game info',
  TIPS: 'Tips',
  PATCH_NOTES: 'Patch notes',
  
  HEADER_STATS: 'User',
  STATS: 'Player Statistics',
  SETTINGS: 'Settings',
  
  HEADER_ABOUT: 'About and legal',
  ABOUT: 'About',
}
export const SCREEN_LABELS_HIDDEN = {
  HERO: 'HeroScreen',
  ITEM: 'ItemScreen',
  STATS_WEB: 'StatsWebScreen',
}

export const ATTRIBUTES = {
  agility: 'DOTA_ATTRIBUTE_AGILITY',
  intelligence: 'DOTA_ATTRIBUTE_INTELLECT',
  strength: 'DOTA_ATTRIBUTE_STRENGTH',
  DOTA_UNIT_CAP_MELEE_ATTACK: 'Melee',
  DOTA_UNIT_CAP_RANGED_ATTACK: 'Ranged',
}

export const DOWNLOAD_REASONS = {
  FRESH: 'Because this is the first time you open the app, additional files need to be downloaded (eg: hero/ item descriptions, images).',
  MISSING: 'Some wiki data on your device seems to be missing. Please wait while the app re-downloads the data.',
  UPDATE: 'Downloading new wiki database.'
}


export const URL_ODOTA = {
  SEARCH: 'https://api.opendota.com/api/search?q=',
  PROFILE: 'https://api.opendota.com/api/players/',
  PROFILE_WEB: 'https://www.opendota.com/players/',
}


export const ICONS = {
  BACK: () => <FontAwesome name="arrow-circle-left" size={17} color={Colors.dota_white} />,
  FORWARD: () => <FontAwesome name="arrow-circle-right" size={17} color={Colors.dota_white} />,
  USER: () => <FontAwesome name="user" size={17} color={Colors.dota_white} />,
  INFO: () => <FontAwesome name="info" size={17} color={Colors.dota_white} />,
}


export const URLS = {
  'Open Dota': 'https://www.opendota.com',
}

export const HELP_TEXTS = {
  HELP_HEADER: 'The Dota 2 player statistics screen',
  HELP_CONTENT: `The Dota 2 player profiles are a collection of statistics gathered and parsed by the ${URLS["Open Dota"]} platform.
These statistics show an in-depth analysis of the player's activity in the Dota 2 game.

Because the statistics screen is a preview of the Open Dota website, you will need the following buttons in order to navigate the Dota 2 player profiles:`,
  HELP_DOTA_PROFILE: 'To set another player profile, simply navigate to another Dota 2 profile (from the Stats screen) and press the PROFILE button.',
  BACK: 'Use the BACK button to navigate back in the current (statistics) screen.',
  FORWARD: 'Use the FORWARD button to navigate back in the current (statistics) screen.',
  USER: () => (
    <Text>When the PROFILE button is pressed, it will <Text style={{color: Colors.goldenrod}}>glow</Text> indicating that the current Dota 2 profile is the one that will appear on the app's home screen.</Text>
  ),
}
