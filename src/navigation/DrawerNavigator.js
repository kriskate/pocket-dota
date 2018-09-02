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

import { SCREEN_LABELS } from '../constants/Constants';

import Drawer from '../components/Drawer';
import Colors from '../constants/Colors';

const drawerNav = createDrawerNavigator({
  [SCREEN_LABELS.HEROES]: createStackNavigator({ [SCREEN_LABELS.HEROES]: HeroesScreen, HeroScreen }),
  [SCREEN_LABELS.ITEMS]: createStackNavigator({ [SCREEN_LABELS.ITEMS]: ItemsScreen, ItemScreen }),

  [SCREEN_LABELS.STATS]: createStackNavigator({ 
    [SCREEN_LABELS.STATS]: StatsScreen, StatsWebScreen,
  }, {
    navigationOptions: {
      headerBackTitle: 'Stats',
    }
  }),
  [SCREEN_LABELS.SETTINGS]: createStackNavigator({ SettingsScreen }),

  [SCREEN_LABELS.TIPS]: createStackNavigator({ TipsScreen }),
  [SCREEN_LABELS.PATCH_NOTES]: createStackNavigator({ PatchNotesScreen }),

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