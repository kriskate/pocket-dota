import React from 'react';
import { Container, Text, Button, Switch } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS, SCREEN_LABELS_HIDDEN, APP_VERSION, GET_WIKI_VERSION, DOWNLOAD_REASONS, ICONS } from '../constants/Constants';
import { StyleSheet, View, Alert, Platform } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { removeWiki } from '../utils/loaders';
import { connect } from 'react-redux';
import { model_user, model_settings, model_profile } from '../constants/Models';
import { Actions } from '../reducers/profile';
import { Actions as UpdateActions } from '../reducers/update';
import { wiki_needsUpdate, app_needsUpdate } from '../utils/updaters';
import { alertUpdateCheckError, alertUpdateCheckAvailable, alertRemoveProfileData, alertResetSettings } from '../utils/Alerts';
import { sleep } from '../utils/utils';


const Section = ({ label, children }) => (
  <View>
    <Text style={styles.sectionLabel}>{label}</Text>
    {children}
  </View>
)

const CheckButton = ({ label, message, current, onPress, disabled }) => (
  <Button prestyled style={styles.versionButton} disabled={!!disabled}
      onPress={onPress} >
    <Text>{ message ? message : label }</Text>
    <Text style={{ color: Colors.goldenrod }}>current: {current}</Text>
  </Button>
)

const CHECK_MESSAGES = {
  CHECK: '(checking for update)',
  LATEST: 'is up to date',
  UPDATING: '(updating)',
}
const TYPES = {
  WIKI: 'Wiki',
  APP: 'App',
}


@connect(
  (state => ({
    profile: state.profile,

    updatingWiki: state.update.downloadingWiki_version,
    updatingApp: state.update.downloadingApp_version,
  })),
  (dispatch => ({
    updateSettings: val => dispatch(Actions.settings(val)),
    setProfile: val => dispatch(Actions.setProfile(val)),
    setUser: val => dispatch(Actions.setUser(val)),

    updateWiki: (res) => dispatch(UpdateActions.downloadWiki(DOWNLOAD_REASONS.UPDATE, res)),
    updateApp: (version) => dispatch(UpdateActions.updateApp(version)),

    show: (what) => dispatch(UpdateActions.show(what)),
  }))
)
export default class SettingsScreen extends React.PureComponent {
  static navigationOptions = () => ({
    title: SCREEN_LABELS.SETTINGS,
    ...headerStyle,
  });

  state = {
    checkingWiki: '',
    checkingApp: '',
  }
  
  _updateToV = (What, res) => {
    What == TYPES.WIKI ? this.props.updateWiki(res) : this.props.updateApp(res.newVersion);
  }

  _updateCanceled = (What) => {
    // is already handled in _checkForUpdate
  }

  _checkForUpdate = async (What) => {
    // this._updateToV(What, {newVersion:'3'})
    // return
    const stater = What == TYPES.WIKI ? 'checkingWiki' : 'checkingApp';
    const { updatingWiki, updatingApp } = this.props;

    if((What === TYPES.WIKI && updatingWiki) || (What === TYPES.APP && updatingApp)) {
      // if update is already in progress, open modal directly
      this.props.show(What === TYPES.WIKI ? 'wiki' : 'app');
      return;
    }

    this.setState({ [stater]: CHECK_MESSAGES.CHECK });

    const maybeTooFast = new Date();

    const res = What == TYPES.WIKI ? await wiki_needsUpdate() : await app_needsUpdate();

    if(new Date() - maybeTooFast < 1500) await sleep(1500);

    if(!res) {
      this.setState({ [stater]: `${What} ${CHECK_MESSAGES.LATEST}` });
      return;
    }
    if(res.error) {
      const onDismiss = () => this._updateCanceled(What);
      alertUpdateCheckError(What, res.error, onDismiss);
    } else {
      const onNo = () => this._updateCanceled(What);
      const onYes = () => this._updateToV(What, res);
      alertUpdateCheckAvailable(What, res.newVersion, onNo, onYes);
    }

    this.setState({ [stater]: '' });
  }


  _removeProfileData = () => {
    const onYes = () => this.props.setUser(model_user({}));
    alertRemoveProfileData(onYes);
  }
  _resetSettings = () => {
    const onYes = () => this.props.setProfile(model_profile({}));
    alertResetSettings(onYes);
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


  render() {
    const { user, settings, lastSearch } = this.props.profile;
    const { name, account_id } = model_user(user);
    const { showProfileOnHome, autoUpdateApp, autoUpdateDB } = model_settings(settings);

    const { navigate } = this.props.navigation;

    const { checkingApp, checkingWiki } = this.state;
    const { updatingApp, updatingWiki } = this.props;

    const wikiUpdatingMessage = checkingWiki || (updatingWiki && CHECK_MESSAGES.UPDATING);
    const appUpdatingMessage = checkingApp || (updatingApp && CHECK_MESSAGES.UPDATING);


    return (
      <Container backToHome scrollable >


        <Section label="Profile">
          { !lastSearch || !name ? null :
            <Button prestyled style={styles.versionButton} onPress={() => navigate(SCREEN_LABELS.STATS)}>
              <Text>{"Last profile search: "}</Text>
              <Text style={{ color: Colors.goldenrod }}>{lastSearch}</Text>
            </Button>
          }

          { name ? null : (
            <Button prestyled
              title={`${name ? 'Replace the' : "Add a"} Dota 2 user profile`}
              onPress={() => navigate(SCREEN_LABELS.STATS)} />
          )}
          { name ? null : <Text style={styles.noprofile}>{"In order to enable the functions below, you have to add a Dota 2 profile"}</Text> }

          <Button disabled={!name} prestyled
            title={`Your profile${!name ? '' : ' (' + name + ')'}` }
            onPress={() => navigate(SCREEN_LABELS_HIDDEN.STATS_WEB, { player: {...user, personaname: name} })} />

          <Switch disabled={!name}
            label="Show profile on Home screen"
            value={showProfileOnHome} onValueChange={val => this.props.updateSettings({ showProfileOnHome: val })} />

          <Button prestyled warning disabled={!name}
            title="Remove profile data"
            onPress={this._removeProfileData} />
        </Section>


        <Section label="Heroes & Items database:">
          <Switch label="Auto update Database"
            value={autoUpdateDB} onValueChange={val => this.props.updateSettings({ autoUpdateDB: val })} />

          <CheckButton label='Check for wiki update'
            onPress={() => this._checkForUpdate(TYPES.WIKI)}
            message={wikiUpdatingMessage && wikiUpdatingMessage + " - wiki"}
            disabled={wikiUpdatingMessage && wikiUpdatingMessage.includes(CHECK_MESSAGES.CHECK)}
            current={GET_WIKI_VERSION()}
          />
          <Button prestyled warning
            title="Clear wiki"
            onPress={this._removeWikiData} />
        </Section>


        <Section label="App settings:">
          <Button prestyled style={styles.versionButton}
              onPress={() => navigate(SCREEN_LABELS_HIDDEN.SETTINGS_TIPS)} >
            <Text>{SCREEN_LABELS_HIDDEN.SETTINGS_TIPS}</Text>
            <ICONS.FORWARD />
          </Button>

          <Switch label="Auto update app"
            value={autoUpdateApp} onValueChange={val => this.props.updateSettings({ autoUpdateApp: val })} />

          <CheckButton label='Check for app update'
            onPress={() => this._checkForUpdate(TYPES.APP)}
            message={appUpdatingMessage && appUpdatingMessage + " - app"}
            disabled={appUpdatingMessage && appUpdatingMessage.includes(CHECK_MESSAGES.CHECK)}
            current={APP_VERSION}
          />

          <Button prestyled warning
            title="Reset to default settings"
            onPress={this._resetSettings} />
        </Section>


      </Container>
    );
  }
}

const styles = StyleSheet.create({
  noprofile: {
    marginHorizontal: Layout.padding_small,
    paddingTop: Layout.padding_small,
    fontSize: 13,
    color: Colors.disabled,
  },

  sectionLabel: {
    marginTop: Layout.padding_regular,
    marginHorizontal: Layout.padding_small,
    marginBottom: Layout.padding_small,
    color: Colors.goldenrod,
  },

  versionButton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  switch: {
  },
})