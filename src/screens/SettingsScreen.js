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

const CheckButton = ({ label, message, current, onPress }) => (
  <Button prestyled style={styles.versionButton} disabled={message==checkMessages.CHECK}
      onPress={onPress} >
    <Text>{ message ? message : label }</Text>
    <Text style={{ color: Colors.goldenrod }}>current: {current}</Text>
  </Button>
)

const checkMessages = {
  CHECK: '...checking for update',
  LATEST: 'is up to date',
  UPDATING: '...updating',
}
const TYPES = {
  WIKI: 'Wiki',
  APP: 'App',
}


@connect(
  (state => ({
    profile: state.profile,

    updatingWiki: state.update.downloadWiki_reason,
    updatingApp: state.update.downloadApp_version,
  })),
  (dispatch => ({
    updateSettings: val => dispatch(Actions.settings(val)),
    setProfile: val => dispatch(Actions.setProfile(val)),
    setUser: val => dispatch(Actions.setUser(val)),

    updateWiki: (version) => dispatch(UpdateActions.downloadWiki(DOWNLOAD_REASONS.UPDATE, version)),
    updateApp: (version) => dispatch(UpdateActions.updateApp(version)),
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

    wikiUpdatingMessage: '',
    appUpdatingMessage: '',
  }
  
  _updateToV = (What, newV) => {
    const stater = What == TYPES.WIKI ? 'wikiUpdatingMessage' : 'appUpdatingMessage';
    this.setState({ [stater]: checkMessages.UPDATING });

    What == TYPES.WIKI ? this.props.updateWiki(newV) : this.props.updateApp(newV);
  }

  _updateCanceled = (What) => {
    const stater = What == TYPES.WIKI ? 'wikiUpdatingMessage' : 'appUpdatingMessage';
    this.setState({ [stater]: '' });
  }
  _checkForUpdate = async (What) => {
    const stater = What == TYPES.WIKI ? 'wikiUpdatingMessage' : 'appUpdatingMessage';

    if(this.state[stater] === checkMessages.UPDATING) {
      // if update is already in progress, open modal directly
      this._updateToV(What, What == 'Wiki' ? this.props.updatingWiki : this.props.updatingApp);
      return;
    }

    this.setState({ [stater]: checkMessages.CHECK });

    if(this.props._testUpdates || this.props.navigation.getParam('_testUpdates')) {
      // props _testUpdates should be used in unit tests, while navigation testUpdates can be used while working on features
      this._updateToV(What, '1.0.test');

      return;
    }

    const newV = What == TYPES.WIKI ? await wiki_needsUpdate() : await app_needsUpdate();

    if(!newV) {
      this.setState({ [stater]: `${What} ${checkMessages.LATEST}` });
      return;
    }

    if(newV.error) {
      Alert.alert(
        `Error`,
        `There was an error while trying to retrieve new ${What} version
        ${newV.error}
        Please try again later.`,
        [
          { text: 'Dismiss', onPress: () => this._updateCanceled(What) },
        ],
        { cancelable: true }
      );
    } else {
      Alert.alert(
        `New version found! (${newV})`,
        `A new ${What} version has been found.
        Would you like to begin downloading it?
        It is recoomended to be connected to a WI-FI network before downloading new data.`,
        [
          { text: 'No', style: 'cancel', onPress: () => this._updateCanceled(What) },
          { text: 'Yes', onPress: () => this._updateToV(What, newV) },
        ],
        { cancelable: true }
      );
    }

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
    const { wikiUpdatingMessage, appUpdatingMessage, allTipsOff, tipsModalVisible } = this.state;


    return (
      <Container backToHome scrollable style={{ paddingBottom: Layout.padding_regular }}>

        <Header label="Profile" />


        { !lastSearch ? null :
          <Button style={styles.lastSearch} onPress={() => navigate(SCREEN_LABELS.STATS)}>
            <Text>{"Last profile search: "}</Text>
            <Text style={{ color: Colors.goldenrod }}>{lastSearch}</Text>
          </Button>
        }

        { name ? null : (
          <Button prestyled
          title={`${name ? 'Replace the' : "Add a"} Dota 2 user profile`}
          onPress={() => navigate(SCREEN_LABELS.STATS)} />
        )}
        { name ? null : <Text style={styles.noprofile}>{"* In order to enable the functions below, you have to add a Dota 2 profile"}</Text> }

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
          message={wikiUpdatingMessage}
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
          message={appUpdatingMessage}
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
    padding: Layout.padding_regular,
    color: Colors.disabled,
  },
  lastSearch: {
    padding: Layout.padding_small,
    borderColor: Colors.dota_ui1,
    borderWidth: 3,
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
    backgroundColor: Colors.dota_ui1,
    borderWidth: 1,
    borderColor: Colors.dota_ui2,
  },
  switchDescription: {
    color: Colors.disabled,
    fontSize: 10,
    marginRight: Layout.padding_regular,
  },
})