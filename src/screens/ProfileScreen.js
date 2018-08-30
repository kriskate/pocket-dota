import React from 'react';
import { Container, Text, Button } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS, SCREEN_LABELS_HIDDEN } from '../constants/Constants';
import { StyleSheet, Switch as RNSwitch, View, Alert } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { removeWiki } from '../utils/loaders';
import { connect } from 'react-redux';
import { model_user, model_settings, model_profile } from '../constants/Models';
import { Actions } from '../reducers/profile';


const Header = ({ label }) => (
  <View style={styles.labelHeaderWrapper}>
    <Text style={styles.labelHeader}>{label}</Text>
  </View>
)
const Switch = ({ label, value, onValueChange, disabled }) => (
  <View style={styles.switchWrapper}>
    <Text>{label}</Text>
    <RNSwitch style={styles.switch} disabled={disabled}
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
export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.PROFILE,
    ...headerStyle,
  });

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
    removeWiki()
  }

  render() {
    const { user, settings, lastSearch } = this.props.profile;
    const { name, account_id } = model_user(user);
    const { showProfileOnHome, autoUpdateApp, autoUpdateDB, showTips } = model_settings(settings);

    const { navigate } = this.props.navigation;

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

        <Button prestyled
          title={`${name ? 'Replace the' : "Add a"} Dota 2 user profile (Stats Screen)`}
          onPress={() => navigate(SCREEN_LABELS.STATS)} />

        <Button disabled={!name} prestyled secondary
          title={name || 'Your profile'}
          onPress={() => navigate(SCREEN_LABELS_HIDDEN.STATS_WEB, { account_id })} />
        
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

        <Switch label="Show tips"
          value={showTips} onValueChange={val => this.props.updateSettings({ showTips: val })} />
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
})