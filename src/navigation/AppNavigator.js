import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import DrawerNavigator from './DrawerNavigator';
import { SCREEN_LABELS } from '../constants/Constants';


const MainStack = createStackNavigator({
  [SCREEN_LABELS.HOME]: HomeScreen,
  DrawerNavigator,
}, {
  headerMode: 'none',
});

export default MainStack;