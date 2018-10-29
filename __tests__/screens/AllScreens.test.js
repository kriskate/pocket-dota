import React from 'react';
import renderer from 'react-test-renderer';
import { store_simple, navigation, getHeroData, getItemData, getPatchName, } from '../__setup__/config';

import AboutScreen from '../../src/screens/AboutScreen';
import HeroesScreen from '../../src/screens/HeroesScreen';
import HeroScreen from '../../src/screens/HeroScreen';
import HomeScreen from '../../src/screens/HomeScreen';
import ItemsScreen from '../../src/screens/ItemsScreen';
import ItemScreen from '../../src/screens/ItemScreen';
import PatchNotesScreen from '../../src/screens/PatchNotesScreen';
import PatchScreen from '../../src/screens/PatchScreen';
import SettingsScreen from '../../src/screens/SettingsScreen';
import SettingsTipsScreen from '../../src/screens/SettingsTipsScreen';
import StatsScreen from '../../src/screens/StatsScreen';
import StatsWebScreen from '../../src/screens/StatsWebScreen';
import TipsScreen from '../../src/screens/TipsScreen';


const screens = [
  AboutScreen, HeroesScreen, HeroScreen,
  HomeScreen, ItemsScreen, ItemScreen,
  PatchNotesScreen, PatchScreen, SettingsScreen,
  SettingsTipsScreen, StatsScreen, StatsWebScreen,
  TipsScreen,
];
export const itRendersScreen = (Screen) => {
  const needsStore = Screen.WrappedComponent;
  const name = needsStore ? Screen.WrappedComponent.name : Screen.name;
  
  let navigationData = {};
  if(Screen == HeroScreen) navigationData = getHeroData();
  if(Screen == ItemScreen) navigationData = getItemData();
  if(Screen == PatchScreen) navigationData = getPatchName();

  it(`${name}`, async () => {
    const tree = renderer.create(
      <Screen 
        store={needsStore ? store_simple : null}
        navigation={navigation(navigationData)}
      />).toJSON();
    expect(tree).toMatchSnapshot();
  });
}


describe("renders screen", async () => {
  screens.forEach(Screen => itRendersScreen(Screen));
});