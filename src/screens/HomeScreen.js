import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, } from 'react-native';
import { Thumbnail, Container } from '../components/ui/';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import { HOME_LABELS, SCREEN_LABELS, SCREEN_LABELS_HIDDEN } from '../constants/Constants';
import { assets } from '../constants/Data';
import Layout from '../constants/Layout';


const MenuItem = ({onPress, label, cardImage, profileImage}) => (
  <View style={styles.menuRow}>
    <TouchableOpacity style={styles.imageWrapper} onPress={onPress}>
      <Image style={styles.image} source={cardImage} />
    </TouchableOpacity>

    
    <View style={styles.profileImageWrapper} pointerEvents='none'> 
      { !profileImage ? null :<Thumbnail round source={{uri: profileImage}} /> }
      <View style={styles.textWrapper} pointerEvents='none'>
        <Text style={styles.text}>{label}</Text>
      </View>
    </View> 
    

  </View>
);

@connect(state => ({
  user: state.profile.user,
  showProfileOnHome: state.profile.settings.showProfileOnHome,
}))

export default class HomeScreen extends React.PureComponent {
  render() {
    const { name, image, account_id } = this.props.user;
    const { navigate } = this.props.navigation;

    return (
      <Container scrollable bounces={false}>

        <MenuItem onPress={() => navigate(SCREEN_LABELS.HEROES)} label={HOME_LABELS.HEROES}
          cardImage={assets.app.menuHeroes} />
        <MenuItem onPress={() => navigate(SCREEN_LABELS.ITEMS)} label={HOME_LABELS.ITEMS}
          cardImage={assets.app.menuItems} />

        <MenuItem onPress={() => navigate(SCREEN_LABELS.PATCH_NOTES)} label={HOME_LABELS.PATCH_NOTES}
          cardImage={assets.app.menuPatch} />

        <MenuItem onPress={() => navigate(SCREEN_LABELS.TIPS)} label={HOME_LABELS.TIPS}
          cardImage={assets.app.menuTips} />

        <MenuItem onPress={() => navigate(SCREEN_LABELS.STATS)} label={HOME_LABELS.STATS}
          cardImage={assets.app.menuStats} />
        { !image || !this.props.showProfileOnHome ? null :
          <MenuItem onPress={() => navigate(SCREEN_LABELS_HIDDEN.STATS_WEB, { data: { account_id, personaname: name } })} label={name}
            cardImage={assets.app.menuProfile}
            profileImage={image} /> 
        }

        <MenuItem onPress={() => navigate(SCREEN_LABELS.SETTINGS)} label={HOME_LABELS.SETTINGS}
          cardImage={assets.app.menuSettings} />

      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.dota_ui2,
  },
  menuRow: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.dota_red_dark,
    minHeight: 150,
  },
  imageWrapper: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileImageWrapper: {
    position: 'absolute',
    width:'100%',
    height: '100%',
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    marginBottom: Layout.padding_big,
  },
  text: {
    borderRadius: 5,
    borderColor: Colors.disabled,
    borderWidth: 1,
    padding: Layout.padding_small,
    backgroundColor: Colors.dota_ui1+99,
    color: Colors.dota_white,
    fontSize: 17,
  },
});