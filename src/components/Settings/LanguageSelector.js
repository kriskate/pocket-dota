import React from 'react';
import { withNamespaces } from 'react-i18next';
import { View, StyleSheet } from 'react-native';

import { Button, Image, Text } from '../ui';

import { languages, defaultLanguage } from '../../localization';
import { assets } from '../../constants/Data';
import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { Actions } from '../../reducers/profile';


const LanguageSelector = ({ i18n, languageChange_callback, isInitial, state_language, setLanguage }) => {
  const cLang = Object.keys(languages).includes(i18n.language) ? i18n.language : defaultLanguage;

  return (
    <View scrollable style={[styles.container, isInitial && styles.spread] } >
    {
      Object.keys(languages).map(lang => (
        <Button prestyled key={lang} disabled={!isInitial && lang == cLang}
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              backgroundColor: lang == cLang ? Colors.dota_ui2 : Colors.dota_ui1,
            }}
            onPress={() => {
              setLanguage(lang);
              i18n.changeLanguage(lang);
              languageChange_callback(lang);
            }}>
          <Text>{languages[lang]}</Text>
          <Image style={{ width: 40, height: 30 }} source={assets.locales[lang]} />
        </Button>
      ))
    }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: Colors.dota_ui1_light,
  },
  spread: {
    justifyContent: 'center',
  },
})

LanguageSelector.defaultProps = {
  languageChange_callback: () => {},
  style_spread: false,
}

export default withNamespaces()(
  connect(
    (state => ({
      state_language: state.profile.settings.language,
    })),
    ( dispatch => ({
      setLanguage: language => dispatch(Actions.setLanguage(language)),
    }))
  )
  (LanguageSelector)
);