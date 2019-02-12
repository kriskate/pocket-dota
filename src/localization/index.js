import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import { Localization } from 'expo';

export const languages = {
  "de-DE": "Deutsch",
  "en-US": "English",
  "es-ES": "Español",
  "ja-JP": "日本語",
  "ro-RO": "Română",
  "ru-RU": "Русский",
}
export const dota2com_languages = {
  "de-DE": 'german',
  "en-US": 'english',
  "es-ES": 'spanish',
  "ja-JP": 'japanese',
  "ro-RO": 'romanian',
  "ru-RU": 'russian',
}

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    return /*'en'; */ Localization.getLocalizationAsync().then(({ locale }) => {
      callback(locale);
    });
  },
  init: () => {},
  cacheUserLanguage: () => {}
}
i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    // debug: true,
  
    fallbackLng: 'en-US',

    resources: {
      "de-DE": require('./de-DE.json'),
      "en-US": require('./en-US.json'),
      "es-ES": require('./es-ES.json'),
      "ja-JP": require('./ja-JP.json'),
      "ro-RO": require('./ro-RO.json'),
      "ru-RU": require('./ru-RU.json'),
    },
    interpolation: {
      escapeValue: false // not needed for react
    }
  });
export default i18n;