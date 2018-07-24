import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StatusBar from './components/ui/StatusBar';
import { StatusBar as NStatusBar, Platform } from 'react-native';

import { downloadNewWikiData, getItem, setCurrentWiki, loadFromStorage } from './utils/wiki';
import AppNavigator from './navigation/AppNavigator';
import LoadLocalData from './components/LoadLocalData';
import DownloadData from './components/DownloadData';
import { Actions, DOWNLOAD_REASONS } from './reducers/wiki';
import { Container } from './components/ui';
import Logger from './utils/Logger';



@connect(
  state => ({
    wiki: state.wiki,
  }), 
  dispatch => ({
    actions: bindActionCreators(Actions, dispatch),
  })
)
export default class AppContent extends React.Component {
  constructor(props) {
    super(props);

    this._loadLocalData();
  }
  async _loadLocalData() {
    const local_data = await loadFromStorage();
    
    Logger.debug('_loadLocalData', !!this.props.wiki.data.info, !!local_data.info, !!await getItem('info'));

    this.props.actions.newWiki(local_data);

    this._checkData();
  }
  _downloadData = async () => {
    Logger.debug('_downloadData:\r\n   --- wiki', !!await getItem('info'))
    Logger.debug('   --- state', !!this.props.wiki.data.info)

    Platform.OS === 'ios' && NStatusBar.setNetworkActivityIndicatorVisible(true);
    
    const newWikiData = await downloadNewWikiData();
    Platform.OS === 'ios' && NStatusBar.setNetworkActivityIndicatorVisible(false);

    this.props.actions.newWiki(newWikiData);
    await setCurrentWiki(newWikiData);
  }
  _checkData = () => {
    // initiates a download if MISSING or FRESH
    const { heroes, items, tips, patch_notes, info, } = this.props.wiki.data;
    const { downloadNewData } = this.props.actions;

    Logger.debug('_checkData', !!info)

    if(!(heroes && items && tips && patch_notes && info)) {
      downloadNewData(
        heroes || items || tips || patch_notes || info 
          ? DOWNLOAD_REASONS.MISSING : DOWNLOAD_REASONS.FRESH
      );
      this._downloadData();
    }
  }

  render() {
    const { loading, downloading } = this.props.wiki;
    
    Logger.debug('_render', loading, downloading, !!this.props.wiki.data.info)

    return (
      <Container>
        { 
          loading ? <LoadLocalData /> : downloading
          ? <DownloadData />
          : <AppNavigator />
        }
        <StatusBar />
      </Container>
    )
  }
}