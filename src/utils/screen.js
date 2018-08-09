import React from 'react';

import Colors from "../constants/Colors";
import ButtonHamburger from "../components/ButtonHamburger";

export const headerStyle = {
  headerRight: <ButtonHamburger />,
  headerStyle: {
    backgroundColor: Colors.dota_ui1,
  },
  headerTitleStyle: {
    color: Colors.dota_white,
  },
  headerTintColor: Colors.dota_white,
}