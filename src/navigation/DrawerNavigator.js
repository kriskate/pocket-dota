import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'

import HeroesScreen from '../screens/HeroesScreen';
import HeroScreen from '../screens/HeroScreen';
import ItemScreen from '../screens/ItemScreen';
import ItemsScreen from '../screens/ItemsScreen';
import StatsScreen from '../screens/StatsScreen';
import StatsWebScreen from '../screens/StatsWebScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TipsScreen from '../screens/TipsScreen';
import PatchNotesScreen from '../screens/PatchNotesScreen';
import AboutScreen from '../screens/AboutScreen';
import SettingsTipsScreen from '../screens/SettingsTipsScreen';

import { SCREEN_LABELS, SCREEN_LABELS_HIDDEN } from '../constants/Constants';

import Drawer from '../components/Drawer';
import Colors from '../constants/Colors';
import PatchScreen from '../screens/PatchScreen';
import SettingsLanguageScreen from '../screens/SettingsLanguageScreen';

const drawerNav = createDrawerNavigator({
  [SCREEN_LABELS.HEROES]: createStackNavigator({
    [SCREEN_LABELS.HEROES]: HeroesScreen,
    [SCREEN_LABELS_HIDDEN.HERO]: HeroScreen,
  }),
  [SCREEN_LABELS.ITEMS]: createStackNavigator({
    [SCREEN_LABELS.ITEMS]: ItemsScreen,
    [SCREEN_LABELS_HIDDEN.ITEM]: ItemScreen,
  }),

  [SCREEN_LABELS.STATS]: createStackNavigator({ 
    [SCREEN_LABELS.STATS]: StatsScreen, 
    [SCREEN_LABELS_HIDDEN.STATS_WEB]: StatsWebScreen,
  }, {
    navigationOptions: {
      headerBackTitle: 'Stats',
    }
  }),
  [SCREEN_LABELS.SETTINGS]: createStackNavigator({ 
    [SCREEN_LABELS.SETTINGS]: SettingsScreen,
    [SCREEN_LABELS_HIDDEN.SETTINGS_LANGUAGE]: SettingsLanguageScreen,
    [SCREEN_LABELS_HIDDEN.SETTINGS_TIPS]: SettingsTipsScreen,
  }),

  [SCREEN_LABELS.PATCH_NOTES]: createStackNavigator({ 
    [SCREEN_LABELS.PATCH_NOTES]: PatchNotesScreen,
    [SCREEN_LABELS_HIDDEN.PATCH]: PatchScreen,
  }),
  [SCREEN_LABELS.TIPS]: createStackNavigator({ TipsScreen }),

  [SCREEN_LABELS.ABOUT]: createStackNavigator({ AboutScreen }),
}, {
  contentComponent: Drawer,
  contentOptions: { 
    inactiveTintColor: Colors.dota_white,
    activeBackgroundColor: Colors.dota_ui1,
  },
  drawerPosition: 'right',
})


export default drawerNav