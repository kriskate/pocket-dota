import React from 'react';
import { withNamespaces } from 'react-i18next';
import { headerStyle } from '../utils/screen';

import i18next from '../localization';
import LanguageSelector from '../components/Settings/LanguageSelector';



@withNamespaces("Screen_SettingsAppTips")
export default class SettingsLanguageScreen extends React.PureComponent {
  static navigationOptions = () => ({
    title: i18next.t("Constants:SCREEN_LABELS.SETTINGS_LANGUAGE"),
    ...headerStyle,
  }); 

  render() {
    return (
      <LanguageSelector languageChange_callback={() => this.props.navigation.setParams({})} />
    )
  }
}