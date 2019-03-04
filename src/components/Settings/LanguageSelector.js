import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import { Button, Image, Text } from '../ui';
import { Actions } from '../../reducers/language';

import { languages, defaultLanguage } from '../../localization';
import { assets } from '../../constants/Data';
import Colors from '../../constants/Colors';
import { ICONS } from '../../constants/Constants';
import { alertLanguageDownload, alertLanguageUpdate } from '../../utils/Alerts';



const LANG_STATES = {
  GOOD: 'GOOD',
  DOWNLOAD: 'DOWNLOAD',
  UPDATE: 'UPDATE',
}


@withNamespaces()
@connect(
  (state => ({
    currentLanguage: state.language.currentLanguage,
    availableLanguages: state.language.availableLanguages,
  })),
  ( dispatch => ({
    setLanguage: (language) => dispatch(Actions.setLanguage(language)),
    downloadLanguage: language => (dispatch(Actions.downloadLanguage(language))),
  }))
)
export default class LanguageSelector extends React.PureComponent {
  state = {
    languageStates: {},
  }
  static getDerivedStateFromProps(nextProps) {
    const { currentLanguage, availableLanguages } = nextProps;
    const languageStates = {};

    availableLanguages.forEach(lang => {
      const langData = availableLanguages.find(l => l.name == lang);
    
      if(!langData) {
        languageStates[lang] = LANG_STATES.DOWNLOAD;
      } else {
        const cLangData = availableLanguages.find(l => l.name == currentLanguage);
        if(langData.info.wikiVersion < cLangData.info.wikiVersion) 
          languageStates[lang] = LANG_STATES.UPDATE;
        else 
          languageStates[lang] = LANG_STATES.GOOD;
      }
    })
    return {
      languageStates,
    };
  }

  _onLangPress = (lang) => {
    const onNo = () => {};
    const onYes = () => {
      this.props.downloadLanguage(lang);
      this.props.languageChange_callback();
    }

    const languageState = this.state.languageStates[lang];
    switch (languageState) {
      case LANG_STATES.DOWNLOAD:
        alertLanguageDownload(lang, onYes, onNo);
        break;
      case LANG_STATES.UPDATE:
        alertLanguageUpdate(lang, onYes, onNo);
        break;
      case LANG_STATES.GOOD:
        this.props.setLanguage(lang);
        break;
    }

    alertLanguageDownload();
  }
  _renderSymbol = (lang) => {
    const languageState = this.state.languageStates[lang];

    switch(languageState) {
      case LANG_STATES.GOOD:
        return <ICONS.ICON_GOOD />
      case LANG_STATES.DOWNLOAD:
        return <ICONS.ICON_DOWNLOAD />
      case LANG_STATES.UPDATE:
        return <ICONS.ICON_UPDATE />
    }
  }
  render() {
    const { 
      isInitial,
      currentLanguage,
    } = this.props;

    return (
      <View scrollable style={[styles.container, isInitial && styles.spread] } >
      {
        Object.keys(languages).map(lang => (
          <Button prestyled key={lang} disabled={!isInitial && lang == currentLanguage}
              style={[styles.languageButton, 
                { backgroundColor: currentLanguage == lang ? Colors.dota_ui2 : Colors.dota_ui1, }
              ]}
              onPress={() => this._onLangPress(lang)} >

            { this._renderSymbol(lang) }
            <Text>{languages[lang]}</Text>
            <Image style={styles.languageButton_image} source={assets.locales[lang]} />
          </Button>
        ))
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: Colors.dota_ui1_light,
  },

  spread: {
    justifyContent: 'center',
  },

  languageButton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  languageButton_image: {
    width: 40,
    height: 30,
  }
})

LanguageSelector.defaultProps = {
  languageChange_callback: () => {},
  style_spread: false,
}