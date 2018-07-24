import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, } from 'react-native';
import { Thumbnail } from 'native-base';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import { HOME_LABELS, SCREEN_LABELS } from '../constants/Constants';


const MenuItem = ({onPress, label, cardImage, profileImage}) => (
  <View style={styles.menuRow}>
    <TouchableOpacity style={styles.imageWrapper} onPress={onPress}>
      <Image style={styles.image} source={cardImage} />
    </TouchableOpacity>

    { !profileImage ? null : 
        <View style={styles.profileImageWrapper} pointerEvents='none'> 
          <Thumbnail large style={styles.profileImage} source={{uri: profileImage}} pointerEvents='none'/>
        </View> 
    }

    <View style={styles.textWrapper} pointerEvents='none'>
      <Text style={styles.text}>{label}</Text>
    </View>
  </View>
);

@connect(state => ({
  profile: state.profile,
}))
export default class Screen extends React.PureComponent {
  static defaultProps = {
    profileName: HOME_LABELS.PROFILE,
  };

  render() {
    const { name, image } = this.props.profile;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <MenuItem onPress={() => navigate(SCREEN_LABELS.HEROES)} label={HOME_LABELS.HEROES}
          cardImage={require("../assets/images/menu-heroes.png")} />
        <MenuItem onPress={() => navigate(SCREEN_LABELS.ITEMS)} label={HOME_LABELS.ITEMS}
          cardImage={require("../assets/images/menu-items.png")} />
        <MenuItem onPress={() => navigate(SCREEN_LABELS.STATS)} label={HOME_LABELS.STATS}
          cardImage={require("../assets/images/menu-stats.png")} />
        { !image ? null :
          <MenuItem onPress={() => navigate(SCREEN_LABELS.PROFILE)} label={name}
            cardImage={require("../assets/images/menu-profile.png")}
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