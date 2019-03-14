import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import { Button, Image, Text } from '../ui';
import { Actions } from '../../reducers/language';
import { Actions as WikiActions } from '../../reducers/wiki';

import i18n, { languages, defaultLanguage, availableLanguages } from '../../localization';
import { assets } from '../../constants/Data';
import Colors from '../../constants/Colors';
import { ICONS, GET_WIKI_VERSION_latest } from '../../constants/Constants';
import { alertLanguageDownload, alertLanguageUpdate } from '../../utils/Alerts';
import Layout from '../../constants/Layout';
import { loadWiki } from '../../utils/loaders';



const LANG_STATES = {
  GOOD: 'GOOD',
  DOWNLOAD: 'DOWNLOAD',
  UPDATE: 'UPDATE',
}


const LanguageIcon = ({ languageState }) => (
  <View style={styles.languageButton_icon}>
    {
      languageState == LANG_STATES.GOOD
      ?
      <ICONS.ICON_GOOD />
      :
      languageState == LANG_STATES.DOWNLOAD
      ?
      <ICONS.ICON_DOWNLOAD />
      :
      <ICONS.ICON_UPDATE />
    }
  </View>
)


@withNamespaces()
@connect(
  (state => ({
    isInitialLanguageSet: state.language.isInitialLanguageSet,
    currentLanguage: state.language.currentLanguage,
    availableLanguages: state.language.availableLanguages,
  })),
  ( dispatch => ({
    setInitialLanguage: () => dispatch(Actions.setInitialLanguage()),
    setLanguage: (language) => dispatch(Actions.setLanguage(language)),
    downloadLanguage: language => (dispatch(Actions.downloadLanguage(language))),

    newWiki: (wiki) => dispatch(WikiActions.newWiki(wiki)),
  }))
)
export default class LanguageSelector extends React.PureComponent {
  state = {
    languageStates: {},
  }
  static getDerivedStateFromProps(nextProps) {
    const { currentLanguage, availableLanguages } = nextProps;
    const languageStates = {};

    Object.keys(languages).forEach(lang => {
      const langData = availableLanguages.find(l => l.name == lang);

      if(!langData) {
        languageStates[lang] = LANG_STATES.DOWNLOAD;
      } else {
        if(langData.wikiInfo.wikiVersion < GET_WIKI_VERSION_latest().split('-')[1]) 
          languageStates[lang] = LANG_STATES.UPDATE;
        else 
          languageStates[lang] = LANG_STATES.GOOD;
      }
    })
    return {
      languageStates,
    };
  }

  _onNo = () => {}
  _onYes = (lang) => {
    this.props.downloadLanguage(lang);
    this.props.languageChange_callback(lang);

    if(!this.props.isInitialLanguageSet)
      this.props.setInitialLanguage();
  }
  _changeLanguage = async (lang) => {
    this.props.setLanguage(lang);
    this.props.i18n.changeLanguage(lang);
    this.props.newWiki(await loadWiki(lang));
    
    this.props.languageChange_callback();

    if(!this.props.isInitialLanguageSet)
      this.props.setInitialLanguage();
  }

  _onLangPress = async (lang) => {
    const languageState = this.state.languageStates[lang];

    if(lang == this.props.currentLanguage 
        && this.props.isInitialLanguageSet 
        && languageState !== LANG_STATES.UPDATE) {
      return;
    }

    switch (languageState) {
      case LANG_STATES.DOWNLOAD:
        alertLanguageDownload(lang, () => this._onYes(lang), this._onNo);
      break;
      case LANG_STATES.UPDATE:
        alertLanguageUpdate(lang, () => this._onYes(lang), () => this._changeLanguage(lang));
      break;
      case LANG_STATES.GOOD:
        this._changeLanguage(lang);
      break;
    }
  }
  _renderSymbol = (lang) => (
    <LanguageIcon languageState={this.state.languageStates[lang]} />
  )
  render() {
    const { 
      isInitial,
      currentLanguage,
    } = this.props;

    return (
      <View scrollable style={[styles.container, isInitial && styles.spread] } >
      {
        Object.keys(languages).map(lang => (
          <Button prestyled key={lang}
              style={[styles.languageButton, 
                isInitial && styles.languageButton_spread,
                {
                  backgroundColor: currentLanguage == lang ? Colors.dota_ui2 : Colors.dota_ui1,
                  borderColor: currentLanguage == lang ? Colors.goldenrod : Colors.dota_ui1,
                  borderBottomColor: currentLanguage == lang ? Colors.goldenrod : Colors.dota_ui2,
                  borderTopColor: currentLanguage == lang ? Colors.goldenrod : Colors.dota_ui2,
                }
              ]}
              onPress={() => this._onLangPress(lang)} >

            { this._renderSymbol(lang) }
            
            <Text>
            { !availableLanguages.includes(lang) && <ICONS.ICON_TRANSLATE /> } {languages[lang]}
            </Text>
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
    backgroundColor: Colors.dota_ui2,
  },

  spread: {
    justifyContent: 'center',
    backgroundColor: Colors.dota_ui1_light,
  },

  languageButton_spread: {
    marginVertical: Layout.padding_small/2,
  },
  languageButton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  languageButton_image: {
    width: 40,
    height: 30,
  },
  languageButton_icon: {
    width: 40,
    height: 17,
    alignItems: "center",
  },
})

LanguageSelector.defaultProps = {
  languageChange_callback: () => {},
  style_spread: false,
}