import React from 'react';
import { Container, Text, Button } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS, SCREEN_LABELS_HIDDEN, APP_VERSION, GET_WIKI_VERSION, DOWNLOAD_REASONS } from '../constants/Constants';
import { StyleSheet, Switch as RNSwitch, View, Alert, Platform } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { removeWiki } from '../utils/loaders';
import { connect } from 'react-redux';
import { model_user, model_settings, model_profile } from '../constants/Models';
import { Actions } from '../reducers/profile';
import { Actions as UpdateActions } from '../reducers/update';
import Modal from "react-native-modal";
import { APP_TIPS } from '../components/AppTips';
import { wiki_needsUpdate, app_needsUpdate } from '../utils/updaters';
import { alertUpdateCheckError, alertUpdateCheckAvailable, alertRemoveProfileData, alertResetSettings } from '../utils/Alerts';
import { sleep } from '../utils/utils';


const Header = ({ label }) => (
  <View style={styles.labelHeaderWrapper}>
    <Text style={styles.labelHeader}>{label}</Text>
  </View>
)
const Switch = ({ label, description, value, onValueChange, disabled, style }) => (
  <Button prestyled style={[styles.switchWrapper, style]} onPress={() => onValueChange(!!!value)} disabled={disabled}>
    <View style={{ flex: 1 }}>
      <Text style={disabled ? { color: Colors.dota_ui1 } : null}>{label}</Text>
      { !description ? null : <Text style={styles.switchDescription}>{description}</Text> }
    </View>

    <RNSwitch style={styles.switch} disabled={disabled} onTintColor={Colors.dota_agi + '70'} thumbTintColor={Platform.OS ==='android' ? Colors.dota_agi : null}
      value={value} onValueChange={onValueChange} />
  </Button>
)

const CheckButton = ({ label, message, current, onPress, disabled }) => (
  <Button prestyled style={styles.versionButton} disabled={disabled}
      onPress={onPress} >
    <Text>{ message ? message : label }</Text>
    <Text style={{ color: Colors.goldenrod }}>current: {current}</Text>
  </Button>
)

const checkMessages = {
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

    updateWiki: (version) => dispatch(UpdateActions.downloadWiki(DOWNLOAD_REASONS.UPDATE, version)),
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
    tipsModalVisible: false,
    allTipsOff: false,

    checkingWiki: '',
    checkingApp: '',
  }
  
  _updateToV = (What, newV) => {
    What == TYPES.WIKI ? this.props.updateWiki(newV) : this.props.updateApp(newV);
  }

  _updateCanceled = (What) => {
    // is already handled in _checkForUpdate
  }

  _checkForUpdate = async (What) => {
    const stater = What == TYPES.WIKI ? 'checkingWiki' : 'checkingApp';
    const { updatingWiki, updatingApp } = this.props;

    if((What === TYPES.WIKI && updatingWiki) || (What === TYPES.APP && updatingApp)) {
      // if update is already in progress, open modal directly
      this.props.show(What === TYPES.WIKI ? 'wiki' : 'app');
      return;
    }

    this.setState({ [stater]: checkMessages.CHECK });

    const maybeTooFast = new Date();

    const newV = What == TYPES.WIKI ? await wiki_needsUpdate() : await app_needsUpdate();

    if(new Date() - maybeTooFast < 1500) await sleep(1500);

    if(!newV) {
      this.setState({ [stater]: `${What} ${checkMessages.LATEST}` });
      return;
    }

    if(newV.error) {
      const onDismiss = () => this._updateCanceled(What);
      alertUpdateCheckError(What, newV.error, onDismiss);
    } else {
      const onNo = () => this._updateCanceled(What);
      const onYes = () => this._updateToV(What, newV);
      alertUpdateCheckAvailable(What, newV, onNo, onYes);
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

  _hideTipsModal = () => this.setState({ tipsModalVisible: false })

  render() {
    const { user, settings, lastSearch } = this.props.profile;
    const { name, account_id } = model_user(user);
    const { showProfileOnHome, autoUpdateApp, autoUpdateDB, tipsState } = model_settings(settings);

    const { navigate } = this.props.navigation;
    const { allTipsOff, tipsModalVisible } = this.state;

    const { checkingApp, checkingWiki } = this.state;
    const { updatingApp, updatingWiki } = this.props;

    const wikiUpdatingMessage = checkingWiki || (updatingWiki && checkMessages.UPDATING);
    const appUpdatingMessage = checkingApp || (updatingApp && checkMessages.UPDATING);


    return (
      <Container backToHome scrollable style={{ paddingBottom: Layout.padding_regular }}>

        <Header label="Profile" />


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


        <Header label="Heroes & Items database:" />

        <Switch label="Auto update Database"
          value={autoUpdateDB} onValueChange={val => this.props.updateSettings({ autoUpdateDB: val })} />

        <CheckButton label='Check for wiki update'
          onPress={() => this._checkForUpdate(TYPES.WIKI)}
          message={wikiUpdatingMessage && wikiUpdatingMessage + " - wiki"}
          disabled={!!wikiUpdatingMessage}
          current={GET_WIKI_VERSION()}
        />
        <Button prestyled warning
          title="Clear wiki"
          onPress={this._removeWikiData} />


        <Header label="App settings:" />

        <Button prestyled style={{ marginHorizontal: 0 }}
          title="In-app tips"
          onPress={() => this.setState({ tipsModalVisible: true })} />

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

        <CheckButton label='Check for app update'
          onPress={() => this._checkForUpdate(TYPES.APP)}
          message={appUpdatingMessage && appUpdatingMessage + " - app"}
          disabled={!!appUpdatingMessage}
          current={APP_VERSION}
        />

        <Button prestyled warning
          title="Reset to default settings"
          onPress={this._resetSettings} />


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
  labelHeaderWrapper: {
    marginTop: Layout.padding_regular,
    marginHorizontal: Layout.padding_small,
    marginBottom: Layout.padding_small,
  },
  labelHeader: {
    color: Colors.goldenrod,
  },

  versionButton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  switch: {
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Layout.padding_small,
    paddingHorizontal: Layout.padding_regular,

  },
  switchDescription: {
    color: Colors.disabled,
    fontSize: 10,
    marginRight: Layout.padding_regular,
  },
})