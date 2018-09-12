import React from 'react';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, View, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { SCREEN_LABELS, APP_VERSION } from '../constants/Constants';
import { Button, Container, Text } from './ui';
import Colors from '../constants/Colors';
import { assets } from '../constants/Data';
import Layout from '../constants/Layout';
import { showTip, APP_TIPS } from './AppTips';

const ListItem = ({ label, navigation, selected }) => (
  <Button viewStyle={[styles.item, selected && styles.selectedItem]} 
      onPress={() => {
        if(selected) navigation.closeDrawer()
        else {
          showTip(APP_TIPS.DRAWER_SLIDE);

          const navigateAction = NavigationActions.navigate({
            routeName: label,
            action: NavigationActions.navigate({ routeName: label }),
          });

          navigation.dispatch(navigateAction);
        }
      } }>
    <Text style={styles.label}>{ label }</Text>
  </Button>
)
const ListHeader = ({ label }) => <View style={styles.labelHeader}><Text style={styles.labelHeaderText}>{label}</Text></View>

export default class Drawer extends React.Component {  
  // if home, there is no key, as Home is not in the drawer by default
  _selected = (label) => {
    const { index, routes } = this.props.navigation.state;
    const { routeName } = routes[index];
    return routeName == label;
  }
  
  render() {
    const { navigation } = this.props;

    return (
      <Container scrollable>
        <Image style={styles.imgBackground} source={assets.app.menuProfile} />
        <View style={styles.imgIconWrapper}>
          <Image style={styles.imgIcon} source={assets.app.logoRed} />
          <Text style={styles.appVersion}>v. {APP_VERSION}</Text>
        </View>


        { Object.keys(SCREEN_LABELS).map(label =>
          label.substr(0, 6) == 'HEADER'
            ? <ListHeader key={label} label={SCREEN_LABELS[label]} />
            : <ListItem key={label} label={SCREEN_LABELS[label]} navigation={navigation} 
                selected={this._selected(SCREEN_LABELS[label])} />
        ) }
      </Container>
    );
  }
}

const wrapperHeight = 150;
const logoRatio = 1600/ 560;
const logoHeight = wrapperHeight/2 - Layout.padding_regular*2;
const styles = StyleSheet.create({
  imgIconWrapper: {
    marginTop: Layout.padding_regular + getStatusBarHeight(),
    padding: Layout.padding_regular,
    alignItems: 'center',
    justifyContent: 'center',
    height: wrapperHeight,
  },
  imgIcon: {
    backgroundColor: Colors.dota_ui1+'99',
    borderColor: Colors.disabled,
    borderRadius: 10,
    borderWidth: 1,
    width: logoHeight * logoRatio,
    height: logoHeight,
  },
  imgBackground: {
    height: wrapperHeight + Layout.padding_regular + getStatusBarHeight(),
    position: "absolute",
  },
  appVersion: {
    color: Colors.goldenrod,
    marginRight: Layout.padding_small,
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