import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppNavigator from './navigation/AppNavigator';
import { Container, Text } from './components/ui';
import LoadData from './components/LoadData';
import { Actions } from './reducers/app';


const texts = {
  fresh: 'Because this is the first time you launch the app, additional files need to be downloaded (eg: images, hero/ item descriptions).',
  missing: 'Some wiki data on your device seems to be missing. Please wait while the app re-downloads the data.',
}

@connect(
  state => ({
    wiki: state.wiki,
    profile: state.profile,
  }), 
  dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
  })
)
export default class AppContent extends React.Component {
  _checkData = () => {
    const { heroes, items, tips, patch_notes, info, } = this.props.wiki;
    const { user, search } = this.props.profile;

    if(!(heroes && items && tips && patch_notes && info)) {
      const loadingText = heroes || items || tips || patch_notes || user || search ? texts.missing : texts.fresh;

      this.props.actions.loadingTextSet(loadingText);
    } else 
      this.props.actions.loadedData();
  }

  componentDidMount() {
    this._checkData();
  }

  render() {
    const { loadedData, loadingText } = this.props.app;

    return (
      <Container>
        {
          loadedData
          ? <AppNavigator />
          : loadingText 
            ? <LoadData text={loadingText} />
            : <Text>null</Text>
        }
      </Container>
    )
  }
}