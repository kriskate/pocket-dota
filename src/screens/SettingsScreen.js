import React from 'react';
import { Container, Text, Button, Switch } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS, SCREEN_LABELS_HIDDEN, APP_VERSION, GET_WIKI_VERSION, ICONS } from '../constants/Constants';
import { StyleSheet, View, } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { test__downgradeWiki, test__removeWiki } from '../utils/loaders';
import { connect } from 'react-redux';
import { model_user, model_settings, model_profile } from '../constants/Models';
import { Actions } from '../reducers/profile';
import { Actions as UpdateActions, DOWNLOAD_STATE } from '../reducers/update';
import { wiki_needsUpdate, app_needsUpdate } from '../utils/updaters';
import { alertUpdateCheckError, alertUpdateCheckAvailable, alertRemoveProfileData, alertResetSettings } from '../utils/Alerts';
import { sleep } from '../utils/utils';
import { withNamespaces } from 'react-i18next';
import i18next from 'i18next';


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
    <Text style={{ color: Colors.goldenrod }}>{i18next.t("Screen_Settings:currentVersion")} {current}</Text>
  </Button>
)


const TYPES = {
  WIKI: 'Wiki',
  APP: 'App',
}

@withNamespaces(["Screen_Settings", "Components"])
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

    updateWiki: (res, reason) => dispatch(UpdateActions.downloadWiki(reason, res)),
    updateApp: (version) => dispatch(UpdateActions.updateApp(version)),

    show: (what) => dispatch(UpdateActions.show(what)),
  }))
)
export default class SettingsScreen extends React.PureComponent {
  static navigationOptions = () => ({
    title: i18next.t("Constants:SCREEN_LABELS.SETTINGS"),
    ...headerStyle,
  });

  state = {
    checkingWiki: '',
    checkingApp: '',
  }

  _updateCanceled = (What) => {
    // is already handled in _checkForUpdate
  }

  _checkForUpdate = async (What) => {
    // this._updateToV(What, {newVersion:'3'})
    // return
    const { updatingWiki, updatingApp, t } = this.props;

    const stater = What == TYPES.WIKI ? 'checkingWiki' : 'checkingApp';

    if((What === TYPES.WIKI && updatingWiki) || (What === TYPES.APP && updatingApp)) {
      // if update is already in progress, open modal directly
      this.props.show(What === TYPES.WIKI ? DOWNLOAD_STATE.WIKI : DOWNLOAD_STATE.APP);
      return;
    }

    this.setState({ [stater]: t("checkingForUpdate") });

    const maybeTooFast = new Date();

    const res = What == TYPES.WIKI ? await wiki_needsUpdate() : await app_needsUpdate();

    if(new Date() - maybeTooFast < 1500) await sleep(1500);

    if(!res) {
      this.setState({ [stater]: t("isUpToDate") });
      return;
    }
    if(res.error) {
      const onDismiss = () => this._updateCanceled(What);
      alertUpdateCheckError(What, res.error, onDismiss);
    } else {
      const onNo = () => this._updateCanceled(What);
      const onYes = () => What == TYPES.WIKI ? this.props.updateWiki(res, t("Components:DOWNLOAD_REASONS.UPDATE")) : this.props.updateApp(res.newVersion);
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


  render() {
    const { user, settings, lastSearch } = this.props.profile;
    const { name, account_id } = model_user(user);
    const { showProfileOnHome, autoCheckApp, autoCheckDB } = model_settings(settings);

    const { navigate } = this.props.navigation;

    const { checkingApp, checkingWiki } = this.state;
    const { updatingApp, updatingWiki, t } = this.props;

    const wikiUpdatingMessage = checkingWiki || (updatingWiki && t("updating"));
    const appUpdatingMessage = checkingApp || (updatingApp && t("updating"));


    return (
      <Container backToHome scrollable >


        <Section label={t("Section_Profile")}>
          { !lastSearch || !name ? null :
            <Button prestyled style={styles.versionButton} onPress={() => navigate(SCREEN_LABELS.STATS)}>
              <Text>{t("Profile_LastSearch")}</Text>
              <Text style={{ color: Colors.goldenrod }}>{lastSearch}</Text>
            </Button>
          }

          { name ? null : (
            <Button prestyled
              title={name ? t("Profile_Replace") : t("Profile_AddA")}
              onPress={() => navigate(SCREEN_LABELS.STATS)} />
          )}
          { name ? null : <Text style={styles.noprofile}>{t("Profile_EnableThirdParty")}</Text> }

          <Button disabled={!name} prestyled style={styles.versionButton}
              onPress={() => navigate(SCREEN_LABELS_HIDDEN.STATS_WEB, { data: {...user, personaname: name} })}>
            <Text>{t("Profile_YourProfile")}</Text>
            <Text style={{ color: Colors.goldenrod}}>{name ? name : ''}</Text>
          </Button>

          <Switch disabled={!name}
            label={t("Profile_ShowOnHomeScreen")}
            value={showProfileOnHome} onValueChange={val => this.props.updateSettings({ showProfileOnHome: val })} />

          <Button prestyled warning disabled={!name}
            title={t("Profile_RemoveProfileData")}
            onPress={this._removeProfileData} />
        </Section>


        <Section label={t("Section_Database")}>
          <Switch label={t("Database_AutoCheck")}
            value={autoCheckDB} onValueChange={val => this.props.updateSettings({ autoCheckDB: val })} />

          <CheckButton label={t("Database_CheckWiki")}
            onPress={() => this._checkForUpdate(TYPES.WIKI)}
            message={wikiUpdatingMessage && wikiUpdatingMessage}
            disabled={wikiUpdatingMessage && wikiUpdatingMessage.includes("checkingForUpdate")}
            current={GET_WIKI_VERSION()}
          />
          {!__DEV__ ? null : [
            <Button prestyled warning key={'clear'}
              title={t("Database_ClearWiki")}
              onPress={test__removeWiki} />,
            <Button prestyled warning key={'downgrade'}
              title={t("Database_DowngradeWiki")}
              onPress={test__downgradeWiki} />
          ]}
        </Section>


        <Section label={t("Section_App")}>
          <Button prestyled style={styles.versionButton}
              onPress={() => navigate(SCREEN_LABELS_HIDDEN.SETTINGS_TIPS)} >
            <Text>{t("App_Tips")}</Text>
            <ICONS.BUTTON_FORWARD />
          </Button>
          {/* to-do: re-enable this and the "new version found" dialog */}
          {/* <Switch label="Automatically check for app updates"
            value={autoCheckApp} onValueChange={val => this.props.updateSettings({ autoCheckApp: val })} /> */}

          <CheckButton label={t("App_CheckUpdate")}
            onPress={() => this._checkForUpdate(TYPES.APP)}
            message={appUpdatingMessage && appUpdatingMessage}
            disabled={appUpdatingMessage && appUpdatingMessage.includes(t("checkingForUpdate"))}
            current={APP_VERSION}
          />

          <Button prestyled warning
            title={t("App_ResetToDefault")}
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