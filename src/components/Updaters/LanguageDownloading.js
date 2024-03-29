import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import { Actions as UpdateActions } from '../../reducers/update';
import { Actions as WikiActions } from '../../reducers/wiki';

import { Progress} from '../../components/ui';
import { downloadWiki } from '../../utils/downloaders';
import Colors from '../../constants/Colors';

import Styles from '../../constants/Styles';
import Logo from '../Settings/Logo';
import { languages } from '../../localization';

@withNamespaces(["Screen_SettingsLanguage"])
@connect(
  (state => ({
    downloadingLanguage: state.wiki.downloadingLanguage,
  })),
  ( dispatch => ({
    updateCheck: (updateInProgress) => dispatch(UpdateActions.updateCheck(updateInProgress)),
    
    setLanguage: (language) => dispatch(WikiActions.setLanguage(language)),
    downloadLanguage_done: (language, data) => dispatch(WikiActions.downloadLanguage_done(language, data)),

    newWiki: (wiki) => dispatch(WikiActions.newWiki(wiki)),
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

    const { 
      downloadingLanguage, 
      setLanguage, downloadLanguage_done,
      updateCheck,
      newWiki,
      i18n,
    } = this.props;
    
    updateCheck(true);
    
    const wiki = await downloadWiki(downloadingLanguage, this._progress);

    downloadLanguage_done(downloadingLanguage, wiki.info);
    
    if(wiki) {
      setLanguage(downloadingLanguage);

      i18n.changeLanguage(downloadingLanguage);

      newWiki(wiki);
    }

    updateCheck(false);
  }
  
  render() {
    const { downloadingLanguage, t } = this.props;
    const { progress } = this.state;

    return (
      <View style={styles.container}>
        <View style={Styles.modal_downloading_body}>
        
          <View style={styles.wrapper}>
            <Logo />
          </View>

          <View style={styles.wrapper}>
            <Progress label={`${t("DOWNLOADING")} (${languages[downloadingLanguage]})`} 
              progress={progress} />
          </View>
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