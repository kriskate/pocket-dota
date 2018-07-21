import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'

import HeroesScreen from '../screens/HeroesScreen';
import HeroScreen from '../screens/HeroScreen';
import ItemScreen from '../screens/ItemScreen';
import ItemsScreen from '../screens/ItemsScreen';
import StatsScreen from '../screens/StatsScreen';
import StatsWebScreen from '../screens/StatsWebScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TipsScreen from '../screens/TipsScreen';
import PatchNotesScreen from '../screens/PatchNotesScreen';
import AboutScreen from '../screens/AboutScreen';

import { SCREEN_LABELS } from '../constants/Constants';

import Drawer from '../components/Drawer';

const drawerNav = createDrawerNavigator({
  [SCREEN_LABELS.HEROES]: createStackNavigator({ HeroesScreen, HeroScreen }),
  [SCREEN_LABELS.ITEMS]: createStackNavigator({ ItemsScreen, ItemScreen }),

  [SCREEN_LABELS.STATS]: createStackNavigator({ StatsScreen, StatsWebScreen, }),
  [SCREEN_LABELS.PROFILE]: createStackNavigator({ ProfileScreen }),

  [SCREEN_LABELS.TIPS]: createStackNavigator({ TipsScreen }),
  [SCREEN_LABELS.PATCH_NOTES]: createStackNavigator({ PatchNotesScreen }),

  [SCREEN_LABELS.ABOUT]: createStackNavigator({ AboutScreen }),
}, {
  contentComponent: Drawer,
  drawerPosition: Platform.OS === 'ios' ? 'right' : 'left',
})


export default drawerNav