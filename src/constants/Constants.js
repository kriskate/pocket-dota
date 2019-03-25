import React from 'react';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from './Colors';
import { Constants } from 'expo';
import { Platform } from 'react-native';

let _wikiVersion;
export const setWikiVersion = ({ appVersion, wikiVersion }) => {
  _wikiVersion = !appVersion ? null :
    `${appVersion}-${wikiVersion}`;
}
export const GET_WIKI_VERSION = () => _wikiVersion;

export const APP_VERSION = Constants.manifest.version;

export const ITEM_CONSTANTS = {
  DISSASEMBLE: 'DOTA_ITEM_DISASSEMBLE_ALWAYS',
}

export const SCREEN_LABELS = {
  HOME: 'Home',

  HEADER_WIKI: 'Wiki',
  HEROES: 'Heroes',
  ITEMS: 'Items',
  
  HEADER_GAME: 'Game info',
  PATCH_NOTES: 'Patch notes',
  TIPS: 'Tips',
  
  HEADER_STATS: 'User',
  STATS: 'Player Statistics',
  SETTINGS: 'Settings',
  
  HEADER_ABOUT: 'About and legal',
  ABOUT: 'About',
}
export const SCREEN_LABELS_HIDDEN = {
  HERO: 'HeroScreen',
  ITEM: 'ItemScreen',
  PATCH: 'PatchScreen',
  STATS_WEB: 'StatsWebScreen',
  SETTINGS_LANGUAGE: 'Language',
  SETTINGS_TIPS: 'In-app tips',
}

export const ATTRIBUTES = {
  agility: 'DOTA_ATTRIBUTE_AGILITY',
  intelligence: 'DOTA_ATTRIBUTE_INTELLECT',
  strength: 'DOTA_ATTRIBUTE_STRENGTH',
}


export const URL_ODOTA = {
  SEARCH: 'https://api.opendota.com/api/search?q=',
  PROFILE: 'https://api.opendota.com/api/players/',
  PROFILE_WEB: 'https://www.opendota.com/players/',
}


export const ICONS = {
  DROPUP: () => <Ionicons name="ios-arrow-dropup" size={17} color={Colors.dota_white} />,
  DROPDOWN: () => <Ionicons name="ios-arrow-dropdown" size={17} color={Colors.dota_white} />,
  BUTTON_BACK: () => <Ionicons name="ios-arrow-back" size={17} color={Colors.dota_white} />,
  BUTTON_FORWARD: () => <Ionicons name="ios-arrow-forward" size={17} color={Colors.dota_white} />,
  BUTTON_USER: ({color}) => <FontAwesome name="user" size={17} color={color || Colors.dota_white} />,
  BUTTON_INFO: () => <FontAwesome name="info" size={17} color={Colors.dota_white} />,

  ICON_TRANSLATE: () => <MaterialIcons size={17} color={Colors.dota_red_dark} name="translate" />,

  ICON_DOWNLOAD: () => <Ionicons size={17} color={Colors.dota_white}
    name={Platform.OS == "ios" ? "ios-cloud-download" : "md-cloud-download"} />,
  ICON_UPDATE: () => <Ionicons size={17} color={Colors.dota_white}
    name={Platform.OS == "ios" ? "ios-refresh" : "md-refresh"} />,
  ICON_GOOD: () => <Ionicons size={17} color={Colors.dota_white}
    name={Platform.OS == "ios" ? "ios-checkmark" : "md-checkmark"} />,

  CIRCLE: () => <FontAwesome name="circle" size={15} color={Colors.dota_white} />,
  CIRCLE_O: () => <FontAwesome name="circle-o" size={15} color={Colors.dota_white} />,
}


export const URLS = {
  'Valve corporation': 'https://www.valvesoftware.com',
  'Elo': 'https://elo.io/',
  'Dota buff': 'https://github.com/dotabuff/d2vpkr',

  'Open Dota': 'https://www.opendota.com',

  'NodeJS': 'https://nodejs.org/en/',

  'React Native': 'https://facebook.github.io/react-native/',
  'Expo': 'https://expo.io/',

  'Feature Requests': 'https://discord.gg/mwP3FRM',
  'Issues': 'https://discord.gg/BMCrMbw',
  'General': 'https://discord.gg/WXjby2w',

  'our crowdin page': 'https://crowdin.com/project/pocket-dota',

  'Contribute': 'https://pocket-dota.info/contribute',
}