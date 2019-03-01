import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import { Localization } from 'expo';


export const defaultLanguage = "en-US";
export const languages = {
  "de-DE": "Deutsche",
  "en-US": "English (US)",
  "es-ES": "Español",
  "fr-FR": "Français",
  "ja-JP": "日本語",
  "ro-RO": "Română",
  "ru-RU": "Русский",
}
export const dota2com_languages = {
  "de-DE": 'german',
  "en-US": 'english',
  "es-ES": 'spanish',
  "fr-FR": 'french',
  "ja-JP": 'japanese',
  "ro-RO": 'romanian',
  "ru-RU": 'russian',
}

const languageDetector = {
  type: 'languageDetector',
  detect: () => {
    const locale = Localization.locale.replace('_', '-');
    const transformedLocale = Object.keys(languages).find(language => language.split('-')[0] == locale.split('-')[0]);

    return transformedLocale;
  },
  init: () => {},
  cacheUserLanguage: () => {}
}

i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    // debug: true,
    fallbackLng: defaultLanguage,

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
    },
    react: {
      wait: true
    },
  });
export default i18n;