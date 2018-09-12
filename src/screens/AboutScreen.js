import React from 'react';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS } from '../constants/Constants';
import { Container, Text } from '../components/ui';
import { StyleSheet, Image } from 'react-native';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { assets } from '../constants/Data';


const URLS = {
  'Valve corporation': 'https://www.valvesoftware.com',
  'Elo': 'https://elo.io/',
  'Dota buff': 'https://github.com/dotabuff/d2vpkr',

  'Open Dota': 'https://www.opendota.com',

  'NodeJS': 'https://nodejs.org/en/',

  'React Native': 'https://facebook.github.io/react-native/',
  'Expo': 'https://expo.io/',
}
export default class AboutScreen extends React.Component {
  static navigationOptions = () => ({
    title: SCREEN_LABELS.ABOUT,
    ...headerStyle,
  });

  render() {
    return (
      <Container padInner backToHome scrollable>

        <Image style={styles.logo} source={assets.app.logoRed} />

        <Text>Notes:</Text>
        <Text><Text style={styles.highlight}>Wiki data</Text> - refers to all of the information displayed about the heroes, items and patch notes throughout the app.</Text>
        <Text><Text style={styles.highlight}>Player statistics</Text> - refers to all of the information displayed within the Player statistics screens.</Text>

        <Text style={styles.header}>App</Text>
        <Text><Text style={styles.highlight}>Pocket Dota</Text> is an opensource application that aims to give players an insight from within the game, when you're unable to access the actual game. It can also be used while playing the game, in order to keep track of the heroes and items of the opposing teams.</Text>
        <Text><Text style={styles.highlight}>Pocket Dota</Text> is hereby not created, sponsored or endorsed by any of the companies mentioned on this page, apart from the usage of their open sourced data.</Text>
        
        <Text style={styles.header}>Copyright information</Text>

        <Text style={styles.header2}>Wiki data</Text>
        <Text hasUrl URLS={URLS}>The Dota 2 game and logo, the contents of game files (heroes, abilities, items, patch notes, tips), as well as their artwork/ names/ descriptions are © {URLS["Valve corporation"]}.</Text>
        <Text hasUrl URLS={URLS}>Dota2 game files and images provided by {URLS.Elo}, through {URLS["Dota buff"]} and parsed by Pocket Dota's own data generator service.</Text>

        <Text style={styles.header2}>Player statistics</Text>
        <Text hasUrl URLS={URLS}>The data presented through the Player statistics screen are information collected, parsed, displayed and owned by {URLS["Open Dota"]}.</Text>
        <Text>For an even more in-depth analysis of your player profile, it is recommended to open their website on a desktop/ laptop computer and create an Open Dota account.</Text>

        <Text style={styles.header}>Tech</Text>
        <Text>The Wiki data is automatically generated from the <Text style={styles.highlight}>Dota2 game files</Text>, and updated when the information in these changes, through a {URLS.NodeJS} backend service.</Text>
        <Text hasUrl URLS={URLS}>The application is developed in {URLS["React Native"]}, having {URLS.Expo} as a JavaScript management utility.</Text>

      </Container>
    );
  }
}

const logoRatio = 1600/ 560;
const logoWidth = Layout.window.width - Layout.padding_regular * 2;
const styles = StyleSheet.create({
  logo: {
    width: logoWidth,
    height: logoWidth / logoRatio,
    maxHeight: 150,
    resizeMode: 'contain',
  },
  highlight: {
    fontWeight: 'bold',
    color: Colors.goldenrod,
  },
  header: {
    marginTop: Layout.padding_big,
    marginBottom: Layout.padding_small,
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  header2: {
    color: Colors.goldenrod,
    marginTop: Layout.padding_small,
    fontSize: 18,
    fontWeight: 'bold',
  },
})