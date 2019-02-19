import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, } from 'react-native';
import { Container, Image, Thumbnail } from '../components/ui/';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import { SCREEN_LABELS, SCREEN_LABELS_HIDDEN } from '../constants/Constants';
import { assets } from '../constants/Data';
import Layout from '../constants/Layout';
import { withNamespaces } from 'react-i18next';


const MenuItem = ({height, onPress, label, cardImage, profileImage}) => (
  <View style={[styles.menuRow, { minHeight: height }]}>
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

@withNamespaces("Constants")
@connect(state => ({
  user: state.profile.user,
  showProfileOnHome: state.profile.settings.showProfileOnHome,
}))

export default class HomeScreen extends React.PureComponent {
  render() {
    const { showProfileOnHome } = this.props;
    const { name, image, account_id } = this.props.user;
    const { navigate } = this.props.navigation;
    const { t } = this.props;

    let rowHeight = 140;
    const numRows = 6 + (!image || !showProfileOnHome ? 0 : 1);
    if(Layout.window.height > numRows * rowHeight) {
      rowHeight = Layout.window.height / numRows;
    } else {
      const delta = Math.floor(Layout.window.height / rowHeight);
      rowHeight = Layout.window.height / delta;
    }
    

    return (
      <Container scrollable bounces={false} snapToInterval={rowHeight}>

        <MenuItem onPress={() => navigate(SCREEN_LABELS.HEROES)} label={t("HOME_LABELS.LABEL_HEROES")} height={rowHeight}
          cardImage={assets.app.menuHeroes} />
        <MenuItem onPress={() => navigate(SCREEN_LABELS.ITEMS)} label={t("HOME_LABELS.LABEL_ITEMS")} height={rowHeight}
          cardImage={assets.app.menuItems} />

        <MenuItem onPress={() => navigate(SCREEN_LABELS.PATCH_NOTES)} label={t("HOME_LABELS.LABEL_PATCH_NOTES")} height={rowHeight}
          cardImage={assets.app.menuPatch} />

        <MenuItem onPress={() => navigate(SCREEN_LABELS.TIPS)} label={t("HOME_LABELS.LABEL_TIPS")} height={rowHeight}
          cardImage={assets.app.menuTips} />

        <MenuItem onPress={() => navigate(SCREEN_LABELS.STATS)} label={t("HOME_LABELS.LABEL_STATS")} height={rowHeight}
          cardImage={assets.app.menuStats} />
        { !image || !showProfileOnHome ? null :
          <MenuItem onPress={() => navigate(SCREEN_LABELS_HIDDEN.STATS_WEB, { data: { account_id, personaname: name } })} label={name} height={rowHeight}
            cardImage={assets.app.menuProfile}
            profileImage={image} /> 
        }

        <MenuItem onPress={() => navigate(SCREEN_LABELS.SETTINGS)} label={t("HOME_LABELS.LABEL_SETTINGS")} height={rowHeight}
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
    // minHeight: 150,
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