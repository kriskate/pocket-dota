import React from 'react';
import { StatusBar, Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Grid, Row, Thumbnail } from 'native-base';

import { Constants } from 'expo'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors';
import { MENU_LABELS } from '../constants/Constants';


const generateRow = (label=MENU_LABELS.PROFILE, cardImage, profileImg) => (
  <Row style={styles.menuRow}>
    <TouchableOpacity style={styles.imageWrapper}>
      <Image style={styles.image} source={cardImage} />
    </TouchableOpacity>
    { !profileImg ? null : 
        <View style={styles.profileImageWrapper} pointerEvents='none'> 
          <Thumbnail large style={styles.profileImage} source={{uri: profileImg}}  pointerEvents='none'/>
        </View> 
      }
    <View style={styles.textWrapper} pointerEvents='none'>
      <Text style={styles.text}>{label}</Text>
    </View>
  </Row>
)

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    footer: null,
  };

  render() {
    let { profileImg, profileName } = this.props
    if(!profileImg){ profileImg = 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/74/74dea924d1c2a0dbbbe6e7574ecbf385e7b9a355_full.jpg'; profileName = 'PUMP IT UP';} 

    return (
      <Grid style={styles.container}>

        <StatusBar barStyle="light-content" />

        { generateRow(MENU_LABELS.HEROES, require("../assets/images/menu-heroes.png")) }
        
        { generateRow(MENU_LABELS.ITEMS, require("../assets/images/menu-items.png")) }

        { generateRow(MENU_LABELS.STATS, require("../assets/images/menu-stats.png")) }

        { !profileImg ? null : generateRow(profileName, require("../assets/images/menu-profile.png"), profileImg) }

      </Grid>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dota_ui2,
  },
  menuRow: {
    width: Layout.window.width,
    borderWidth: 1,
    borderColor: Colors.dota_red_dark,
  },
  imageWrapper: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileImage: {
    marginTop: 5,
  },
  profileImageWrapper: {
    position: 'absolute',
    width:'100%',
    height: '100%',

    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textWrapper: {
    right: 20,
    bottom: 20,
    position: 'absolute',
  },
  text: {
    color: 'white',
  },
});
