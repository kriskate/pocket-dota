import React from 'react';

import Colors from "../constants/Colors";
import ButtonHamburger from "../components/ButtonHamburger";
import { LayoutAnimation } from 'react-native';


export const animation = {
  standard: {
    duration: 200,
    create: {
      type: LayoutAnimation.Types.easeOut,
      property: LayoutAnimation.Properties.scaleXY,
    },
    update: {
      type: LayoutAnimation.Types.easeOut,
    },
  },
}

export const headerStyle = {
  headerPressColorAndroid: Colors.dota_white,
  headerRight: <ButtonHamburger />,
  headerStyle: {
    backgroundColor: Colors.dota_ui1,
  },
  headerTitleStyle: {
    color: Colors.dota_white,
  },
  headerTintColor: Colors.dota_white,

  headerBackTitle: null,
}