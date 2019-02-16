import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Container, Image, Text } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS, URLS, APP_VERSION } from '../constants/Constants';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { assets } from '../constants/Data';


const Section = ({ title, children }) => (
  <View style={styles.section}>
    {!title ? null : <Text style={styles.header} key={title}>{title}</Text>}
    <View style={styles.sectionContent} key={title + 'content'}>
      {children}
    </View>
  </View>
)
export default class AboutScreen extends React.Component {
  static navigationOptions = () => ({
    title: SCREEN_LABELS.ABOUT,
    ...headerStyle,
  });
  
  render() {
    return (
      <Container backToHome scrollable style={styles.container}>

        <View style={styles.logo}>
          <Image style={[styles.logo, styles.logoImg]} source={assets.app.logoRed} />
          <Text style={styles.appVersion}>v. {APP_VERSION}</Text>
        </View>

        <View style={{ padding: Layout.padding_small }}>
          <Text>Notes:</Text>
          <Text><Text style={styles.highlight}>Wiki data</Text> - refers to all of the information displayed about the Dota 2 heroes, items and patch notes throughout the app.</Text>
          <Text><Text style={styles.highlight}>Player statistics</Text> - refers to all of the information displayed within the Player statistics screens.</Text>
        </View>

        <Section title="App">
          <Text><Text style={styles.highlight}>Pocket Dota</Text> is a free app that aims to give players an insight from within the game, when they're unable to access the actual game. It can also be used while playing the game, in order to keep track of the heroes and items of the opposing teams.</Text>
          <Text><Text style={styles.highlight}>Pocket Dota</Text> is hereby not created, sponsored or endorsed by any of the companies mentioned on this page. It only uses open source data.</Text>
        </Section>

        <Section title="Copyright information">
          <Text style={styles.header2}>Wiki data</Text>
          <Text hasUrl URLS={URLS}>The Dota 2 game, logo, the contents of game files (heroes, abilities, items, patch notes, tips), as well as their artwork/ names/ descriptions are © {URLS["Valve corporation"]}.</Text>
          <Text hasUrl URLS={URLS}>Dota2 game files and images provided by {URLS["Elo"]}, through {URLS["Dota buff"]} and parsed by Pocket Dota's own data generator service.</Text>

          <Text style={styles.header2}>Player statistics</Text>
          <Text hasUrl URLS={URLS}>The data presented through the Player statistics screen are information collected, parsed, displayed and owned by {URLS["Open Dota"]}.</Text>
          <Text>For an even more in-depth analysis of your player profile, it is recommended to open their website on a desktop/ laptop computer and create an Open Dota account.</Text>
        </Section>

        <Section title="Tech">
          <Text hasUrl URLS={URLS}>The Wiki data is automatically generated from the <Text style={styles.highlight}>Dota2 game files</Text>, and updated when the information in these changes, through a {URLS["NodeJS"]} backend service.</Text>
          <Text hasUrl URLS={URLS} style={styles.text_spaced}>The application is developed in {URLS["React Native"]}, having {URLS["Expo"]} as a React Native management utility.</Text>
          <Text style={styles.highlight}>Recommended OS version: {Platform.OS === 'ios' ? "IOS 9+" : "Android 4.4+"}</Text>
        </Section>


        <Section title="Contact (Discord)">
          <Text hasUrl URLS={URLS} style={styles.text_spaced}>If you experience any issues with the usage of this app, please use the {URLS["Issues"]} channel.</Text>
          <Text hasUrl URLS={URLS} style={styles.text_spaced}>If you would like to see more functionality brought into the app, use the {URLS["Feature Requests"]} channel.</Text>
          <Text hasUrl URLS={URLS} style={styles.text_spaced}>If you just wanna have a chat with the app's developer, use the {URLS["General"]} channel.</Text>
        </Section>

      </Container>
    );
  }
}

const logoRatio = 1600/ 560;
const logoWidth = Layout.window.width;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingBottom: Layout.padding_regular,
  },
  section: {
    marginTop: Layout.padding_regular,
  },
  sectionContent: {
    padding: Layout.padding_regular,
    paddingLeft: Layout.padding_big,
  },

  logo: {
    backgroundColor: Colors.dota_ui1,
    width: logoWidth,
    height: logoWidth / logoRatio,
    maxHeight: 150,
  },
  logoImg: {
    resizeMode: 'contain',
  },

  appVersion: {
    color: Colors.goldenrod,
    marginRight: Layout.padding_small,
    position: 'absolute',
    bottom: 15,
    right: 15,
  },

  highlight: {
    fontWeight: 'bold',
    color: Colors.goldenrod,
  },
  header: {
    padding: Layout.padding_regular,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: Colors.dota_ui1,
  },
  header2: {
    color: Colors.goldenrod,
    marginTop: Layout.padding_small,
    fontSize: 18,
    fontWeight: 'bold',
  },

  text_spaced: {
    marginBottom: Layout.padding_small,
  },
})