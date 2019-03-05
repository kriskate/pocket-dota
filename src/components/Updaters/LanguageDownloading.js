import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import { Actions } from '../../reducers/language';
import { Actions as UpdateActions } from '../../reducers/update';

import { Progress} from '../../components/ui';
import { downloadWiki } from '../../utils/downloaders';
import Colors from '../../constants/Colors';

import Styles from '../../constants/Styles';
import Logo from './Logo';

@withNamespaces(["Screen_SettingsLanguage"])
@connect(
  (state => ({
    downloadingLanguage: state.language.downloadingLanguage,
  })),
  ( dispatch => ({
    updateCheck: (updateInProgress) => dispatch(UpdateActions.updateCheck(updateInProgress)),

    setLanguage: (language) => dispatch(Actions.setLanguage(language)),
    downloadLanguage_done: (language, data) => dispatch(Actions.downloadLanguage_done(language, data)),
  }))
)
export default class LanguageDownloading extends React.PureComponent {
  state = {
    progress: 0,
  }

  _progress = (value) => {
    this.setState({ progress: value });
  }

  async componentDidMount() {
    const { updateCheck, downloadingLanguage } = this.props;
    updateCheck(true);

    const wiki = await downloadWiki(downloadingLanguage, this._progress);
    
    updateCheck(false);

    if(wiki) this.props.setLanguage(downloadingLanguage);
  }
  
  render() {
    const { downloadingLanguage, t } = this.props;
    const { progress } = this.state;

    return (
      <View style={styles.container}>
        
        <View style={styles.wrapper}>
          <Logo />
        </View>

        <View style={styles.wrapper}>
          <Progress label={`${t("DOWNLOADING")} (${downloadingLanguage})`} 
            progress={progress} />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.dota_ui2,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },

})