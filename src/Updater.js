import React from 'react';
import { connect } from 'react-redux';

import AppDownloading from './screens/AppDownloading';
import Modal from 'react-native-modal';
import { Actions as UpdateActions } from './reducers/update';
import { Actions as WikiActions } from './reducers/wiki';

@connect(
  (state => ({
    downloading: state.update.downloading,
    downloadReason: state.update.downloadReason,
  })),
  (dispatch => ({
    done: () => dispatch(UpdateActions.done()),
    newWiki: (wiki) => dispatch(WikiActions.newWiki(wiki)),
  }))
)
export default class Updater extends React.PureComponent {
  _handleFinishDownLoading = async (wiki) => {
    this.props.newWiki(wiki);

    this.props.done();
  }
  

  render() {
    const { downloading, downloadReason } = this.props;

    return (
      <Modal isVisible={downloading}>
        { downloading && 
          <AppDownloading
            reason={downloadReason}
            onFinish={this._handleFinishDownLoading}
            onError={Logger.error}
          />
        }
      </Modal>
    )
  }
}