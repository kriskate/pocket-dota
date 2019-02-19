import React from 'react';
import { StyleSheet } from 'react-native';
import { headerStyle } from '../utils/screen';


import { Button, Container, Text, Image } from '../components/ui';
import { withNamespaces } from 'react-i18next';

import i18next, { languages, defaultLanguage } from '../localization';
import { assets } from '../constants/Data';



@withNamespaces("Screen_SettingsAppTips")
export default class SettingsLanguageScreen extends React.Component {
  static navigationOptions = () => ({
    title: i18next.t("Constants:SCREEN_LABELS.SETTINGS_LANGUAGE"),
    ...headerStyle,
  });

  _changeLanguage = (to) => {
    this.props.i18n.changeLanguage(to);
    this.props.navigation.setParams({});
  }
  
  render() {
    const { t, i18n } = this.props;
    const cLang = Object.keys(languages).includes(i18n.language) ? i18n.language : defaultLanguage;

    return (
      <Container>
      {
        Object.keys(languages).map(lang => (
          <Button prestyled style={styles.versionButton} key={lang}
              disabled={lang == cLang}
              onPress={() => this._changeLanguage(lang)}>
            <Text>{languages[lang]}</Text>
            <Image style={{ width: 40, height: 30 }} source={assets.locales[lang]} />
          </Button>
        ))
      }
      </Container>
    )
  }
} 


const styles = StyleSheet.create({
  versionButton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
})