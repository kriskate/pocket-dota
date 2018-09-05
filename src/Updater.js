import React from 'react';
import { connect } from 'react-redux';

import AppDownloading from './screens/AppDownloading';
import Modal from 'react-native-modal';
import { Actions as UpdateActions, DOWNLOAD_STATE } from './reducers/update';
import { Actions as WikiActions } from './reducers/wiki';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from './components/ui';
import { DOWNLOAD_REASONS } from './constants/Constants';
import Layout from './constants/Layout';
import Colors from './constants/Colors';

@connect(
  (state => ({
    showWiki: state.update.showWiki,
    downloadingWiki_reason: state.update.downloadingWiki_reason,
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
      showWiki, downloadingWiki_reason,
      showApp, downloadingApp_version,
    } = this.props;

    /* the wiki modal should not be able to be hidden if:
      * there is no wiki data (DOWNLOAD_REASONS.FRESH)
      * the wiki data is corrupted (DOWNLOAD_REASONS.MISSING)
      */
    return (
      <View>
        <Modal isVisible={showWiki}>
          <View style={styles.container}>
            { downloadingWiki_reason &&
              <AppDownloading
                reason={downloadingWiki_reason}
                onFinish={this._handleFinishDownLoadingWiki}
                onError={Logger.error}
              />
            }
            { downloadingWiki_reason === DOWNLOAD_REASONS.UPDATE &&
              <Button prestyled style={Layout.modal_close_button}
                title="RUN IN BACKGROUND"
                onPress={this._hideWikiModal} />
            }
          </View>
        </Modal>

        <Modal isVisible={showApp}>
          <View style={styles.container}>
            <Text>Downloading new app version: ${downloadingApp_version}</Text>
            <Text>When the update is done, the application will restart.</Text>
            <Button prestyled style={Layout.modal_close_button}
              title="RUN IN BACKGROUND"
              onPress={this._hideAppModal} />
          </View>
        </Modal>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dota_ui2,
    flex: 1,
  },
})