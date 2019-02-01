import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import { showTip, APP_TIPS } from '../AppTips';
import { ICONS } from "../../constants/Constants";
import Styles from '../../constants/Styles';
import { Button } from '../ui';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';


export default class StatsWebScreenToolbox extends React.PureComponent {
  _setProfile = () => {
    const { player, setProfile, c_account_id } = this.props;
    const { account_id, avatarfull, last_match_time, personaname } = player;

    if(c_account_id !== account_id) {
      setProfile({ name: personaname, image: avatarfull, account_id, last_match_time });
      showTip(APP_TIPS.PROFILE_ADDED);
    }
  }
  render() {
    const { player, c_account_id, goBack, goForward, showHelp } = this.props;
    const { account_id } = player;
    const width = Layout.window.width/4 - Layout.padding_big;

    return (
      <View style={styles.navigation_controls}>
        <Button prestyled style={[ Styles.toolbox_button, {width} ]}
            onPress={goBack}>
          <ICONS.BACK />
        </Button>
        <Button prestyled style={[ Styles.toolbox_button, {width} ]}
            onPress={goForward} >
          <ICONS.FORWARD />
        </Button>
        <Button prestyled style={[ Styles.toolbox_button, {width} ]}
            onPress={this._setProfile}>
          <ICONS.USER color={c_account_id == account_id ? Colors.goldenrod : Colors.dota_white}/>
        </Button>
        <Button prestyled style={[ Styles.toolbox_button, {width} ]}
          onPress={showHelp}>
          <ICONS.INFO />
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navigation_controls: {
    backgroundColor: Colors.dota_ui1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        borderTopColor: Colors.disabled,
        borderTopWidth: 1,
      },
      android: {
        borderBottomColor: Colors.dota_black+'90',
        borderBottomWidth: 1,
      }
    }),
  },
})