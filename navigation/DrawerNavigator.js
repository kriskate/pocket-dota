import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'

import HeroesScreen from '../screens/HeroesScreen';
import ItemsScreen from '../screens/ItemsScreen';
import StatsScreen from '../screens/StatsScreen';

import { SCREEN_LABELS } from '../constants/Constants';

import Drawer from '../components/Drawer';

const drawerNav = createDrawerNavigator({
  [SCREEN_LABELS.HEROES]: createStackNavigator({ HeroesScreen }),
  [SCREEN_LABELS.ITEMS]: createStackNavigator({ ItemsScreen }),

  [SCREEN_LABELS.STATS]: createStackNavigator({ StatsScreen, }),
}, {
  contentComponent: Drawer,
  drawerPosition: Platform.OS === 'ios' ? 'right' : 'left',
})


export default drawerNav