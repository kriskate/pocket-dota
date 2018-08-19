import React from 'react';
import { DrawerItems } from 'react-navigation';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { SCREEN_LABELS } from '../constants/Constants';
import { Button, Container, Text } from './ui';
import Colors from '../constants/Colors';
import { assets } from '../constants/Data';
import Layout from '../constants/Layout';

const ListItem = ({ label, navigate, selected }) => (
  <Button viewStyle={[styles.item, selected && styles.selectedItem]} 
      onPress={() => !selected && navigate(label)} >
    <Text style={styles.label}>{ label }</Text>
  </Button>
)
const ListHeader = ({ label }) => <Text style={styles.labelHeader}>{label}</Text>

export default class Drawer extends React.Component {  
  // if home, there is no key, as Home is not in the drawer by default
  _selected = (label) => {
    const { index, routes } = this.props.navigation.state;
    const { routeName } = routes[index];
    return routeName == label;
  }
  
  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container scrollable>
          <Image style={styles.imgBackground} source={assets.app.menuProfile} />
        <View style={styles.imgIconWrapper}>
          <Image style={styles.imgIcon} source={assets.app.logoRed} />
        </View>


        { Object.keys(SCREEN_LABELS).map(label =>
          label.substr(0, 6) == 'HEADER'
            ? <ListHeader key={label} label={SCREEN_LABELS[label]} />
            : <ListItem key={label} label={SCREEN_LABELS[label]} navigate={navigate} 
                selected={this._selected(SCREEN_LABELS[label])} />
        ) }
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  imgIconWrapper: {
    marginTop: Layout.padding_regular + getStatusBarHeight(),
    paddingVertical: Layout.padding_regular,
    marginBottom: Layout.padding_regular,
    alignItems: 'center',
  },
  imgIcon: {
    width: 180,
    height: 50,
    resizeMode: 'contain',
  },
  imgBackground: {
    height: 110,
    position: "absolute",
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
    borderTopColor: Colors.dota_ui1,
    borderTopWidth: 1,
    color: Colors.goldenrod,
  },
});