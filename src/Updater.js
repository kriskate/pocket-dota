import React from 'react';
import { View, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { Actions as UpdateActions, DOWNLOAD_STATE } from './reducers/update';
import { Actions as WikiActions } from './reducers/wiki';

import WikiDownloading from './components/WikiDownloading';
import { alertWikiUpdateDone, alertAppUpdateDone, alertUpdateCheckAvailable, alertCannotUpdate } from './utils/Alerts';

import Layout from './constants/Layout';
import Colors from './constants/Colors';
import AppDownloading from './components/AppDownloading';
import { Updates } from 'expo';
import { app_needsUpdate, wiki_needsUpdate } from './utils/updaters';
import { withNamespaces } from 'react-i18next';
import LanguageDownloading from './components/Updaters/LanguageDownloading';


const checkDelay = {
  wiki: 5000,
  app: 500,
}

@withNamespaces("Components")

@connect(
  (state => ({
    updateInProgress: state.update.updateInProgress,

    currentLanguage: state.wiki.currentLanguage,
    downloadingLanguage: state.wiki.downloadingLanguage,
    currentWikiVersion: state.wiki.currentWikiVersion,

    showWiki: state.update.showWiki,
    downloadingWiki_reason: state.update.downloadingWiki_reason,
    downloadingWiki_version: state.update.downloadingWiki_version,
    downloadingWiki_versionInfo: state.update.downloadingWiki_versionInfo,

    showApp: state.update.showApp,
    downloadingApp_version: state.update.downloadingApp_version,

    autoCheckDB: state.profile.settings.autoCheckDB,
    autoCheckApp: state.profile.settings.autoCheckApp,
  })),
  (dispatch => ({
    updateCheck: (updateInProgress) => dispatch(UpdateActions.updateCheck(updateInProgress)),
    
    hide: (what) => dispatch(UpdateActions.hide(what)),
    doneWiki: () => dispatch(UpdateActions.doneWiki()),
    doneApp: () => dispatch(UpdateActions.doneApp()),
    
    updateApp: (version) => dispatch(UpdateActions.updateApp(version)),
    updateWiki: (res, reason) => dispatch(UpdateActions.downloadWiki(reason, res)),
    
    newWiki: (wiki) => dispatch(WikiActions.newWiki(wiki)),

    downloadLanguage_done: (language, wikiInfo) => dispatch(WikiActions.downloadLanguage_done(language, wikiInfo)),
    setLatestWikiVersion: (version) => dispatch(WikiActions.setLatestWikiVersion(version)),
  }))
)
export default class Updater extends React.PureComponent {
  _handleFinishDownLoadingWiki = async (wiki) => {
    if(!wiki) {
      this.props.doneWiki();
      return;
    }

    this.props.newWiki(wiki);
    this.props.downloadLanguage_done(this.props.currentLanguage, wiki.info);
    this.props.doneWiki();

    alertWikiUpdateDone(this.props.downloadingWiki_version);
  }
  _handleFinishDownLoadingApp = () => {
    const onYes = () => Updates.reloadFromCache();
    const onNo = () => this.props.updateCheck(false);
    this.props.doneApp();

    alertAppUpdateDone(this.props.downloadingApp_version, onYes, onNo);
  }

  _hideWikiModal = () => {
    this.props.hide(DOWNLOAD_STATE.WIKI);
  }
  _hideAppModal = () => {
    this.props.hide(DOWNLOAD_STATE.APP);
  }

  

  async componentDidMount () {
    setTimeout(() => {
      this.props.autoCheckApp && this._checkUpdate('App');
    }, checkDelay.app);

    /* the wiki modal should be visible if minWikiVersion is not met */
    const { currentWikiVersion } = this.props;
    if(currentWikiVersion !== 0) {
      const minWikiVersion = parseInt(require('../app.json').minWikiVersion);
      const forceShowWiki = currentWikiVersion < minWikiVersion;
      
      if(forceShowWiki) {
        const { t, updateWiki, currentWikiVersion } = this.props;
        const res = await wiki_needsUpdate(currentWikiVersion);

        // the app has a version of /info.json in cache and will show that
        if(res == false) alertCannotUpdate(minWikiVersion, t("Updater_persistingProblem"));
        // if the app does not have /info.json in cache or the file is missing form the server
        else if(res.error) alertCannotUpdate(minWikiVersion, res.error);
        // if everything goes well, update the wiki
        else updateWiki(res, t("DOWNLOAD_REASONS.UPDATE"));

        return;
      }
    }
    // allows the user to see the app for a bit
    // also allows redux-persist to load its state
    let checkInterval = setInterval(() => {
      if(!this.props.updateInProgress) {
        clearInterval(checkInterval);
        checkInterval = null;
        this.props.autoCheckDB && this._checkUpdate('Wiki');
      }
    }, checkDelay.wiki);
  }

  _checkUpdate = async (What) => {
    this.props.updateCheck(true);

    const res = What == 'App' ? await app_needsUpdate() : await wiki_needsUpdate(this.props.currentWikiVersion);

    if(!res) {
      this.props.updateCheck(false);
      return;
    }

    if(!res.error) {
      const { t, updateApp, updateWiki } = this.props;

      const onNo = () => {
        this.props.updateCheck(false);
      };
      const onYes = () => What == 'App' ? updateApp(res.newVersion) : updateWiki(res, t("DOWNLOAD_REASONS.UPDATE"));
      // to-do - reenable this for app
      if(What == 'App') onYes();
      else {
        this.props.setLatestWikiVersion(res.newVersion);
        alertUpdateCheckAvailable(What, res.newVersion, onNo, onYes);
      }
    } else {
      this.props.updateCheck(false);
    }
  }


  render() {
    const {
      downloadingWiki_reason, downloadingWiki_versionInfo,
      downloadingApp_version,

      currentLanguage, downloadingLanguage,
    } = this.props;

    return (
      <View style={[styles.modalsWrapper, !downloadingWiki_reason && !downloadingApp_version && !downloadingLanguage && styles.modalsWrapper_hidden]}>

        { !downloadingWiki_reason ? null :
          <View style={styles.modal}>
            <WikiDownloading
              currentLanguage={currentLanguage}
              version={downloadingWiki_versionInfo.wikiVersion}
              reason={downloadingWiki_reason}
              onFinish={this._handleFinishDownLoadingWiki}
              onError={Logger.error}
            />
          </View>
        }

        { !downloadingApp_version ? null :
          <View style={styles.modal}>
            <AppDownloading 
              downloadingApp_version={downloadingApp_version}
              onFinish={this._handleFinishDownLoadingApp}
              onError={Logger.error}
            />
          </View>
        }

        { !downloadingLanguage ? null :
          <View style={styles.modal}>
            <LanguageDownloading />
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