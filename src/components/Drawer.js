import React from 'react';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, View, } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { SCREEN_LABELS, APP_VERSION, URLS } from '../constants/Constants';
import { Button, Container, Image, Text } from './ui';
import Colors from '../constants/Colors';
import { assets } from '../constants/Data';
import Layout from '../constants/Layout';
import { showTip } from './AppTips';
import { withNamespaces } from 'react-i18next';
import { openURL } from './ui/Text';

const ListItem = ({ label, navigation, selected, t }) => (
  <Button viewStyle={[styles.item, selected && styles.selectedItem]} 
      onPress={() => {
        if(selected) navigation.closeDrawer()
        else {
          showTip("drawerSlide");

          const navigateAction = NavigationActions.navigate({
            routeName: SCREEN_LABELS[label],
            action: NavigationActions.navigate({ routeName: SCREEN_LABELS[label] }),
          });

          navigation.dispatch(navigateAction);
        }
      } }>
    <Text style={styles.label}>{ t(`SCREEN_LABELS.${label}`) }</Text>
  </Button>
)
const ListHeader = ({ label }) => <View style={styles.labelHeader}><Text style={styles.labelHeaderText}>{label}</Text></View>

@withNamespaces("Constants")
export default class Drawer extends React.Component {  
  // if home, there is no key, as Home is not in the drawer by default
  _selected = (label) => {
    const { index, routes } = this.props.navigation.state;
    const { routeName } = routes[index];
    return routeName == label;
  }
  
  render() {
    const { navigation, t } = this.props;

    return (
      <Container scrollable bounces={false}>
        <Image style={styles.imgBackground} source={assets.app.menuProfile} />
        <View style={styles.imgIconWrapper}>
          <Image style={styles.imgIcon} source={assets.app.logo} />
          <Text style={styles.appVersion}>v. {APP_VERSION}</Text>
          <View style={styles.contribute}>
            <Button prestyled onPress={() => openURL(URLS.Contribute)}><Text>Contribute</Text></Button>
          </View>
        </View>


        { Object.keys(SCREEN_LABELS).map(label =>
          label.substr(0, 6) == 'HEADER'
            ? <ListHeader key={label} label={t(`SCREEN_LABELS.${label}`)} />
            : <ListItem key={label} label={label} navigation={navigation} 
                selected={this._selected(SCREEN_LABELS[label])} t={t} />
        ) }
      </Container>
    );
  }
}

const wrapperHeight = 150;
const logoRatio = 1600/ 450;
const logoHeight = wrapperHeight/2 - Layout.padding_small;
const styles = StyleSheet.create({
  imgIconWrapper: {
    paddingTop: getStatusBarHeight(),
    padding: Layout.padding_regular,
    alignItems: 'center',
    justifyContent: 'center',
    height: wrapperHeight + getStatusBarHeight(),
    backgroundColor: Colors.dota_ui1+'99',
  },
  imgIcon: {
    // borderColor: Colors.disabled,
    borderRadius: 10,
    // borderWidth: 1,
    width: logoHeight * logoRatio,
    height: logoHeight,
  },
  imgBackground: {
    height: wrapperHeight + getStatusBarHeight(),
    position: "absolute",
  },
  appVersion: {
    color: Colors.goldenrod,
    position: 'absolute',
    bottom: Layout.padding_small,
    left: Layout.padding_small,
    padding: Layout.padding_small,
  },
  contribute: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  
  item: {
    alignItems: 'flex-start',
  },
  selectedItem: {
    backgroundColor: Colors.dota_ui1_light,
  },
  label: {
    margin: Layout.padding_big,
    marginLeft: Layout.padding_big + Layout.padding_small,
    fontWeight: 'bold',
    color: Colors.dota_white,
  },
  labelHeader: {
    marginTop: Layout.padding_regular,
    paddingTop: Layout.padding_big,
    marginLeft: Layout.padding_regular,
    borderTopColor: Colors.disabled,
    borderTopWidth: 1,
  },
  labelHeaderText:{
    color: Colors.goldenrod,
  },
});