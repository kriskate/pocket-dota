import React from 'react';
import { Container, Text, Button } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS, SCREEN_LABELS_HIDDEN } from '../constants/Constants';
import { StyleSheet, Switch as RNSwitch, View, Alert, Platform } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { removeWiki } from '../utils/loaders';
import { connect } from 'react-redux';
import { model_user, model_settings, model_profile } from '../constants/Models';
import { Actions } from '../reducers/profile';
import Modal from "react-native-modal";
import { APP_TIPS } from '../components/AppTips';


const Header = ({ label }) => (
  <View style={styles.labelHeaderWrapper}>
    <Text style={styles.labelHeader}>{label}</Text>
  </View>
)
const Switch = ({ label, description, value, onValueChange, disabled, style }) => (
  <View style={[styles.switchWrapper, style]}>
    <View style={{ flex: 1 }}>
      <Text>{label}</Text>
      { !description ? null : <Text style={styles.switchDescription}>{description}</Text> }
    </View>
    
    <RNSwitch style={styles.switch} disabled={disabled} onTintColor={Colors.dota_agi + '70'}
      value={value} onValueChange={onValueChange} />
  </View>
)


@connect(
  (state => ({
    profile: state.profile,
  })),
  (dispatch => ({
    updateSettings: val => dispatch(Actions.settings(val)),
    setProfile: val => dispatch(Actions.setProfile(val)),
    setUser: val => dispatch(Actions.setUser(val)),
  }))
)
export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.SETTINGS,
    ...headerStyle,
  });

  state = {
    tipsModalVisible: false,
    allTipsOff: false,
  }

  _removeProfileData = () => {
    Alert.alert(
      'Are you sure you want to remove your profile?',
      'This will remove the Dota profile data.',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () => this.props.setUser(model_user({})) },
      ],
      { cancelable: true }
    )
  }
  _resetSettings = () => {
    Alert.alert(
      'Are you sure you want to reset settings to default?',
      'This will reset the settings to default, including the removal of the Dota profile data.',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => this.props.setProfile(model_profile({})) },
      ],
      { cancelable: true }
    )
  }
  _removeWikiData = () => {
    Alert.alert(
      "to-do: remove this, as it's ment for testing purposes only",
      "to-do: remove this, as it's ment for testing purposes only",
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: removeWiki },
      ],
      { cancelable: true }
    )
  }

  _hideTipsModal = () => this.setState({ tipsModalVisible: false })

  render() {
    const { user, settings, lastSearch } = this.props.profile;
    const { name, account_id } = model_user(user);
    const { showProfileOnHome, autoUpdateApp, autoUpdateDB, tipsState } = model_settings(settings);

    const { navigate } = this.props.navigation;
    const { allTipsOff, tipsModalVisible } = this.state;

    return (
      <Container backToHome scrollable style={{ paddingBottom: Layout.padding_regular }}>

        <Header label="Profile" />

        { name ? null : <Text style={styles.noprofile}>{"* In order to enable some of the functions below, you have to add a profile from the Stats screen"}</Text> }

        { !lastSearch ? null :
          <View style={styles.lastSearch}>
            <Text>{"Last profile search: "}</Text>
            <Text style={{ color: Colors.goldenrod }}>{lastSearch}</Text>
          </View>
        }

        { name ? null : (
          <Button prestyled
            title={`${name ? 'Replace the' : "Add a"} Dota 2 user profile (Stats Screen)`}
            onPress={() => navigate(SCREEN_LABELS.STATS)} />
        )}

        <Button disabled={!name} prestyled
          title={`Your profile${!name ? '' : ' (' + name + ')'}` }
          onPress={() => navigate(SCREEN_LABELS_HIDDEN.STATS_WEB, { player: {...user, personaname: name} })} />
        
        <Switch disabled={!name}
          label="Show profile on Home screen"
          value={showProfileOnHome} onValueChange={val => this.props.updateSettings({ showProfileOnHome: val })} />

        <Button prestyled warning disabled={!name}
          title="Remove profile data"
          onPress={this._removeProfileData} />


        <Header label="Heroes & Items database:" />

        <Switch label="Auto update Database"
          value={autoUpdateDB} onValueChange={val => this.props.updateSettings({ autoUpdateDB: val })} />
        <Button prestyled
          title="Check for update"
          onPress={this._checkForUpdate} />
        <Button prestyled warning
          title="Clear wiki"
          onPress={this._removeWikiData} />


        <Header label="App settings:" />

        <View style={styles.switchWrapper}>
          <Text>In-app tips</Text>
          <Button prestyled style={{ marginHorizontal: 0 }}
            title="Tips"
            onPress={() => this.setState({ tipsModalVisible: true })} />
        </View>

        <Modal isVisible={tipsModalVisible}
            onBackdropPress={this._hideTipsModal}
            onBackButtonPress={this._hideTipsModal}
            onSwipe={this._hideTipsModal} swipeDirection="down"
          >
          <Container scrollable style={Layout.modal_body}>
            <Text style={Layout.modal_header} >In-app tips</Text>

            <Switch label="Turn all tips ON/ OFF"
              style={{ marginBottom: Layout.padding_big + Layout.padding_regular, }}
              value={allTipsOff} onValueChange={() => {
                const tipsOff = {};

                Object.keys(tipsState).forEach(tip => tipsOff[tip] = !allTipsOff);
                this.props.updateSettings({ tipsState: tipsOff });
                this.setState({ allTipsOff: !allTipsOff });
              }} />

            { Object.keys(APP_TIPS).map(tip => {
                const prefix = tip.split('_')[0];
                if((prefix == 'IOS' && Platform.OS !== 'ios') || 
                  (prefix == 'ANDROID' && Platform.OS !== 'android'))
                  return null;

                const { short, description, stateLink } = APP_TIPS[tip];

                return (
                  <Switch key={tip} label={short} description={description}
                    value={tipsState[stateLink]} 
                    onValueChange={() => this.props.updateSettings({ tipsState: {...tipsState, [stateLink]: !tipsState[stateLink]} })} />
                )
              }
            )}
          </Container>
          <Button prestyled style={Layout.modal_close_button}
            title="DONE"
            onPress={this._hideTipsModal} />
        </Modal>

        <Switch label="Auto update app"
          value={autoUpdateApp} onValueChange={val => this.props.updateSettings({ autoUpdateApp: val })} />
        <Button prestyled
          title="Check for app update"
          onPress={this._checkForUpdate} />

        <Button prestyled warning
          title="Reset to default settings"
          onPress={this._resetSettings} />


      </Container>
    );
  }
}

const styles = StyleSheet.create({
  noprofile: {
    padding: Layout.padding_regular,
    color: Colors.disabled,
  },
  lastSearch: {
    padding: Layout.padding_regular,
    marginHorizontal: Layout.padding_regular,
    borderColor: Colors.dota_ui1,
    borderWidth: 2,
  },
  labelHeaderWrapper: {
    marginTop: Layout.padding_regular,
    marginHorizontal: Layout.padding_small,
    marginBottom: Layout.padding_small,
    paddingBottom: Layout.padding_small,
    borderBottomColor: Colors.dota_white,
    borderBottomWidth: 1,
    borderRadius: 3,

  },
  labelHeader: {
    color: Colors.goldenrod,
  },

  switch: {
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Layout.padding_big,
    marginVertical: Layout.padding_regular,
  },
  switchDescription: {
    color: Colors.disabled,
    fontSize: 10,
    marginRight: Layout.padding_regular,
  },
})