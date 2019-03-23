import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import { Button, Image, Text } from '../ui';
import { Actions as WikiActions } from '../../reducers/wiki';

import { languages, availableLanguages } from '../../localization';
import { assets } from '../../constants/Data';
import Colors from '../../constants/Colors';
import { ICONS, URLS } from '../../constants/Constants';
import { alertLanguageDownload, alertLanguageUpdate } from '../../utils/Alerts';
import Layout from '../../constants/Layout';
import { loadWiki, loadDefaultWiki } from '../../utils/loaders';



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
    latestWikiVersion: state.wiki.latestWikiVersion,

    isInitialLanguageSet: state.wiki.isInitialLanguageSet,
    currentLanguage: state.wiki.currentLanguage,
    availableLanguages: state.wiki.availableLanguages,
  })),
  ( dispatch => ({
    setInitialLanguage: () => dispatch(WikiActions.setInitialLanguage()),
    setLanguage: (language) => dispatch(WikiActions.setLanguage(language)),
    downloadLanguage: language => (dispatch(WikiActions.downloadLanguage(language))),

    newWiki: (wiki) => dispatch(WikiActions.newWiki(wiki)),
  }))
)
export default class LanguageSelector extends React.PureComponent {
  state = {
    languageStates: {},
    languageIncomplete: null,
  }
  static getDerivedStateFromProps(nextProps) {
    const { availableLanguages } = nextProps;
    const languageStates = {};

    Object.keys(languages).forEach(lang => {
      const langData = availableLanguages.find(l => l.name == lang);

      if(!langData) {
        languageStates[lang] = LANG_STATES.DOWNLOAD;
      } else {
        if(langData.wikiInfo.wikiVersion < nextProps.latestWikiVersion)
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
    let newWikiData = await loadWiki(lang);
    if(!newWikiData) newWikiData = await loadDefaultWiki();

    this.props.setLanguage(lang);
    this.props.i18n.changeLanguage(lang);
    this.props.newWiki(newWikiData);
    
    this.props.languageChange_callback();

    if(!this.props.isInitialLanguageSet)
      this.props.setInitialLanguage();
  }

  _onLangPress = async (lang) => {
    if(!availableLanguages.includes(lang)) {
      this.setState({ languageIncomplete: lang });
    } else {
      this._considerLanguageChange(lang);
    }

  }
  _considerLanguageChange = async (lang) => {
    this.setState({ languageIncomplete: null, });

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

  _helpTranslate = async (lang) => {
    Linking.canOpenURL(URLS["our crowdin page"]).then(Linking.openURL(URLS["our crowdin page"]));
  }


  _renderLanguageIncomplete = (lang) => (
    <View style={styles.languageIncomplete_wrapper}>

      <View style={styles.languageIncomplete} >  
        <View style={styles.languageIncomplete_flag}>
          <Text>{languages[lang]}</Text>
          <Image style={[styles.languageButton_image, { marginLeft: Layout.padding_big, }]} source={assets.locales[lang]} />
        </View>
        <Text>This language is not fully translated.</Text>
        <Text>Would you like to help translating this language?</Text>
      </View>

      <View style={styles.languageIncomplete_buttons} >
        <Button prestyled style={styles.languageIncomplete_button} onPress={this._helpTranslate} >
          <Text>Help Translate</Text>
        </Button>
        <Button prestyled style={styles.languageIncomplete_button} onPress={() => this._considerLanguageChange(lang)}>
          <Text>Continue to the incomplete version</Text>
        </Button>
      </View>

    </View>
  )

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
        this.state.languageIncomplete

        ?

        this._renderLanguageIncomplete(this.state.languageIncomplete)

        :

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
    // backgroundColor: Colors.dota_agi,
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

  languageIncomplete: {
    padding: Layout.padding_big * 3,
    backgroundColor: Colors.dota_ui1,
    borderWidth: 1,
    borderTopColor: Colors.dota_ui2,
    borderBottomColor: Colors.dota_ui2,
  },
  languageIncomplete_flag: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    margin: Layout.padding_big,
  },

  languageIncomplete_wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  languageIncomplete_buttons: {
    // position: 'absolute',
    // flexDirection: 'row',
    // bottom: Layout.padding_big,
    // left: 0,
    // right: 0,
  },
  languageIncomplete_button: {
    // flex: 2,
  },
})

LanguageSelector.defaultProps = {
  languageChange_callback: () => {},
  style_spread: false,
}