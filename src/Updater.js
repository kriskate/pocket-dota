import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from './components/ui';

import { connect } from 'react-redux';
import { Actions as UpdateActions, DOWNLOAD_STATE } from './reducers/update';
import { Actions as WikiActions } from './reducers/wiki';

import AppDownloading from './screens/AppDownloading';
import { alertWikiUpdateDone } from './utils/Alerts';

import { DOWNLOAD_REASONS } from './constants/Constants';
import Layout from './constants/Layout';
import Colors from './constants/Colors';
import Styles from './constants/Styles';

@connect(
  (state => ({
    showWiki: state.update.showWiki,
    downloadingWiki_reason: state.update.downloadingWiki_reason,
    downloadingWiki_version: state.update.downloadingWiki_version,
    downloadingWiki_versionInfo: state.update.downloadingWiki_versionInfo,

    showApp: state.update.showApp,
    downloadingApp_version: state.update.downloadingApp_version,
  })),
  (dispatch => ({
    newWiki: (wiki) => dispatch(WikiActions.newWiki(wiki)),

    hide: (what) => dispatch(UpdateActions.hide(what)),
    doneWiki: () => dispatch(UpdateActions.doneWiki()),
    doneApp: () => dispatch(UpdateActions.doneApp()),
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

  _hideWikiModal = () => {
    this.props.hide(DOWNLOAD_STATE.WIKI);
  }
  _hideAppModal = () => {
    this.props.hide(DOWNLOAD_STATE.APP);
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
          <AppDownloading
            version={downloadingWiki_version}
            versionInfo={downloadingWiki_versionInfo}
            reason={downloadingWiki_reason}
            onFinish={this._handleFinishDownLoadingWiki}
            onError={Logger.error}
          />
        { downloadingWiki_reason === DOWNLOAD_REASONS.UPDATE &&
          <Button prestyled style={Styles.modal_close_button}
            title="RUN IN BACKGROUND"
            onPress={this._hideWikiModal} />
        }
        </View>
        }

        { !downloadingApp_version ? null :
        <View style={[styles.modal, !showApp && styles.modal_hidden]}>
          <View style={styles.container}>
            <Text>Downloading new app version: ${downloadingApp_version}</Text>
            <Text>When the update is done, the application will restart.</Text>
            <Button prestyled style={Styles.modal_close_button}
              title="RUN IN BACKGROUND"
              onPress={this._hideAppModal} />
          </View>
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
    flex: 1,
  },
  modal_hidden: {
    flex: 1,
    // opacity: 0,
    right: Layout.window.width + 10,
  },

  container: {
    backgroundColor: Colors.dota_ui2,
    flex: 1,
  },
})