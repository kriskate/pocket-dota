import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from '../../reducers/profile';

import { showTip, APP_TIPS } from '../AppTips';
import { ICONS } from "../../constants/Constants";
import Styles from '../../constants/Styles';
import { Button } from '../ui';
import Colors from '../../constants/Colors';


@connect(
  (state => ({
    c_account_id: state.profile.user.account_id,
    user: state.profile.user,
  })),
  (dispatch => ({
    setProfile: (user) => dispatch(Actions.setUser(user)),
  }))
)
export default class StatsWebScreenToolbox extends React.PureComponent {
  _setProfile = () => {
    const { player, setProfile, c_account_id } = this.props;
    const { account_id, avatarfull, last_match_time, personaname } = player;

    if(c_account_id !== account_id) {
      setProfile({ name: personaname, image: avatarfull, account_id, last_match_time });
      showTip(APP_TIPS.DOTA_PROFILE_ADDED);
    }
  }
  render() {
    const { player, c_account_id, goBack, goForward, showHelp } = this.props;
    const { account_id } = player;

    return (
      <View style={styles.navigation_controls}>
        <Button prestyled forceTouchableOpacity style={ Styles.toolbox_button }
            onPress={goBack}>
          <ICONS.BACK />
        </Button>
        <Button prestyled forceTouchableOpacity style={ Styles.toolbox_button }
            onPress={goForward} >
          <ICONS.FORWARD />
        </Button>
        <Button prestyled forceTouchableOpacity style={Styles.toolbox_button}
            onPress={this._setProfile}>
          <ICONS.USER color={c_account_id == account_id ? Colors.goldenrod : Colors.dota_white}/>
        </Button>
        <Button prestyled forceTouchableOpacity style={[Styles.toolbox_button, {width: 'auto'}]}
          onPress={showHelp}>
          <ICONS.INFO />
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navigation_controls: {
    flexDirection: 'row',
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