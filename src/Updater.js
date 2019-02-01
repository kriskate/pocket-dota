import React from 'react';
import { View, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { Actions as UpdateActions, DOWNLOAD_STATE } from './reducers/update';
import { Actions as WikiActions } from './reducers/wiki';

import WikiDownloading from './components/WikiDownloading';
import { alertWikiUpdateDone, alertAppUpdateDone, alertUpdateCheckAvailable, alertCannotUpdate } from './utils/Alerts';

import { DOWNLOAD_REASONS, GET_WIKI_VERSION } from './constants/Constants';
import Layout from './constants/Layout';
import Colors from './constants/Colors';
import AppDownloading from './components/AppDownloading';
import { Updates } from 'expo';
import { app_needsUpdate, wiki_needsUpdate } from './utils/updaters';


@connect(
  (state => ({
    showWiki: state.update.showWiki,
    downloadingWiki_reason: state.update.downloadingWiki_reason,
    downloadingWiki_version: state.update.downloadingWiki_version,
    downloadingWiki_versionInfo: state.update.downloadingWiki_versionInfo,

    showApp: state.update.showApp,
    downloadingApp_version: state.update.downloadingApp_version,

    checkUpdateWiki: state.profile.settings.autoCheckDB,
    checkUpdateApp: state.profile.settings.autoCheckApp,
  })),
  (dispatch => ({
    newWiki: (wiki) => dispatch(WikiActions.newWiki(wiki)),

    hide: (what) => dispatch(UpdateActions.hide(what)),
    doneWiki: () => dispatch(UpdateActions.doneWiki()),
    doneApp: () => dispatch(UpdateActions.doneApp()),

    updateApp: (version) => dispatch(UpdateActions.updateApp(version)),
    updateWiki: (res) => dispatch(UpdateActions.downloadWiki(DOWNLOAD_REASONS.UPDATE, res)),
    forceUpdateWiki: (res) => dispatch(UpdateActions.downloadWiki(DOWNLOAD_REASONS.UPDATE_FORCED, res)),
  }))
)
export default class Updater extends React.PureComponent {
  _handleFinishDownLoadingWiki = async (wiki) => {
    this.props.newWiki(wiki);

    if(this.props.downloadingWiki_reason === DOWNLOAD_REASONS.UPDATE) {
      alertWikiUpdateDone(this.props.downloadingWiki_version);
    }

    this.props.doneWiki();
  }
  _handleFinishDownLoadingApp = () => {
    const onYes = () => Updates.reloadFromCache();
    this.props.doneApp();

    alertAppUpdateDone(this.props.downloadingApp_version, onYes);
  }

  _hideWikiModal = () => {
    this.props.hide(DOWNLOAD_STATE.WIKI);
  }
  _hideAppModal = () => {
    this.props.hide(DOWNLOAD_STATE.APP);
  }

  

  async componentDidMount () {
    setTimeout(() => {
      this.props.checkUpdateApp && this._checkUpdate('App');
    }, 5000);

    /* the wiki modal should be visible if minWikiVersion is not met */
    const cWiki = GET_WIKI_VERSION();
    if(cWiki) {
      const currentWikiVersion = parseInt(cWiki.split('-')[1]);
      const minWikiVersion = parseInt(require('../app.json').minWikiVersion);
      const forceShowWiki = currentWikiVersion < minWikiVersion;
      
      if(forceShowWiki) {
        const res = await wiki_needsUpdate();

        // the app has a version of /info.json in cache and will show that
        if(res == false) alertCannotUpdate(minWikiVersion, 'If the problem persists, please clear the application files.');
        // if the app does not have /info.json in cache or the file is missing form the server
        else if(res.error) alertCannotUpdate(minWikiVersion, res.error);
        // if everything goes well, update the wiki
        else this.props.updateWiki(res);

        return;
      }
    }
    // allows the user to see the app for a bit
    // also allows redux-persist to load its state
    setTimeout(() => {
      this.props.checkUpdateWiki && this._checkUpdate('Wiki');
    }, 10000);
  }

  _checkUpdate = async (What) => {
    const res = What == 'App' ? await app_needsUpdate() : await wiki_needsUpdate();

    if(!res) return;

    if(!res.error) {
      const onNo = () => {};
      const onYes = () => What == 'App' ? this.props.updateApp(res.newVersion) : this.props.updateWiki(res);
      // to-do - reenable this for app
      if(What == 'App') onYes() 
      else
      alertUpdateCheckAvailable(What, res.newVersion, onNo, onYes);
    }
  }


  render() {
    const {
      showWiki, downloadingWiki_reason, downloadingWiki_version, downloadingWiki_versionInfo,
      showApp, downloadingApp_version,
    } = this.props;


    /* the wiki modal should not be able to be hidden if:
      * there is no wiki data (DOWNLOAD_REASONS.FRESH)
      * the wiki data is corrupted (DOWNLOAD_REASONS.MISSING)
      */
    return (
      <View style={[styles.modalsWrapper, !showWiki && !showApp && styles.modalsWrapper_hidden]}>
        { !downloadingWiki_reason ? null :
        <View style={[styles.modal, !showWiki && styles.modal_hidden]}>
          <WikiDownloading
            version={downloadingWiki_version}
            versionInfo={downloadingWiki_versionInfo}
            reason={downloadingWiki_reason}
            onFinish={this._handleFinishDownLoadingWiki}
            onError={Logger.error}
          />
        {/* { downloadingWiki_reason !== DOWNLOAD_REASONS.UPDATE ? null :
          <Button prestyled style={Styles.modal_downloading_close_button}
            title="RUN IN THE BACKGROUND" titleStyle={{ textAlign: 'center' }}
            onPress={this._hideWikiModal} />
        } */}
        </View>
        }

        { !downloadingApp_version ? null :
        <View style={[styles.modal, !showApp && styles.modal_hidden]}>
          <AppDownloading 
            downloadingApp_version={downloadingApp_version}
            onFinish={this._handleFinishDownLoadingApp}
            onError={Logger.error}
          />
          {/* <Button prestyled style={Styles.modal_downloading_close_button}
            title="RUN IN THE BACKGROUND" titleStyle={{ textAlign: 'center' }}
            onPress={this._hideAppModal} /> */}
        </View>
        }
        
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modalsWrapper: {
    position: 'absolute',
    width: Layout.window.width,
    height: Layout.window.height,
  },
  modalsWrapper_hidden: {
    right: Layout.window.width + 10,
  },


  modal: {
    width: '100%',
    height: '100%',

    position: 'absolute',
  },
  modal_hidden: {
    flex: 1,
    right: Layout.window.width + 10,
  },

  container: {
    backgroundColor: Colors.dota_ui2,
    flex: 1,
  },
})