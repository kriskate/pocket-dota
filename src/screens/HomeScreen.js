import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, } from 'react-native';
import { Thumbnail } from '../components/ui/';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import { HOME_LABELS, SCREEN_LABELS } from '../constants/Constants';
import { assets } from '../constants/Data';
import Layout from '../constants/Layout';


const MenuItem = ({onPress, label, cardImage, profileImage}) => (
  <View style={styles.menuRow}>
    <TouchableOpacity style={styles.imageWrapper} onPress={onPress}>
      <Image style={styles.image} source={cardImage} />
    </TouchableOpacity>

    { !profileImage ? null :
        <View style={styles.profileImageWrapper} pointerEvents='none'> 
          <Thumbnail round source={{uri: profileImage}} />
        </View> 
    }

    <View style={styles.textWrapper} pointerEvents='none'>
      <Text style={styles.text}>{label}</Text>
    </View>
  </View>
);

@connect(state => ({
  user: state.profile.user,
}))
export default class HomeScreen extends React.PureComponent {
  static defaultProps = {
    profileName: HOME_LABELS.PROFILE,
  };

  render() {
    const { name, image } = this.props.user;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <MenuItem onPress={() => navigate(SCREEN_LABELS.HEROES)} label={HOME_LABELS.HEROES}
          cardImage={assets.app.menuHeroes} />
        <MenuItem onPress={() => navigate(SCREEN_LABELS.ITEMS)} label={HOME_LABELS.ITEMS}
          cardImage={assets.app.menuItems} />
        <MenuItem onPress={() => navigate(SCREEN_LABELS.STATS)} label={HOME_LABELS.STATS}
          cardImage={assets.app.menuStats} />
        { !image ? null :
          <MenuItem onPress={() => navigate(SCREEN_LABELS.SETTINGS)} label={name}
            cardImage={assets.app.menuProfile}
            profileImage={image} /> 
        }
      </View>
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
    justifyContent: 'flex-start',
  },
  textWrapper: {
    flex:1,
    top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
    position: 'absolute',
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