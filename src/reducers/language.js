import { model_language, model_wiki_info } from "../constants/Models";
import i18n, { defaultLanguage } from "../localization";
import { alertLanguageDownload_Failed } from "../utils/Alerts";

export const ActionTypes = {
  SET_INITIAL_LANGUAGE: 'SET_INITIAL_LANGUAGE',

  SET_LANGUAGE: 'SET_LANGUAGE',

  DOWNLOAD_LANGUAGE: "DOWNLOAD_LANGUAGE",
  DOWNLOAD_LANGUAGE_DONE: "DOWNLOAD_LANGUAGE_DONE",
}
export const Actions = {
  setInitialLanguage: () => ({ type: ActionTypes.SET_INITIAL_LANGUAGE }),

  setLanguage: language => ({ type: ActionTypes.SET_LANGUAGE, language }),

  downloadLanguage: language => ({ type: ActionTypes.DOWNLOAD_LANGUAGE, language }),
  downloadLanguage_done: (language, data) => ({ type: ActionTypes.DOWNLOAD_LANGUAGE_DONE, language, data }),
}

export const initialState = {
  isInitialLanguageSet: false,

  currentLanguage: defaultLanguage,

  availableLanguages: [], // model_language({})

  downloadingLanguage: false,
}

export default function reducer(state=initialState, action) {
  const { language } = action;
  switch(action.type) {

    case ActionTypes.SET_INITIAL_LANGUAGE:
      return {... state, isInitialLanguageSet: true, }

    case ActionTypes.SET_LANGUAGE:
      if(language !== state.currentLanguage) {
        return { ...state,
          currentLanguage: language,
        }
      }
      return state;

    case ActionTypes.DOWNLOAD_LANGUAGE:
      return { ...state,
        downloadingLanguage: language,
      }

    case ActionTypes.DOWNLOAD_LANGUAGE_DONE:
      if(!action.data) {
        alertLanguageDownload_Failed(language);

        return { ...state,
          downloadingLanguage: false,
        }
      }

      const wikiInfo = model_wiki_info(action.data);
      const new_a = [...state.availableLanguages];
      const lang_index = new_a.indexOf(new_a.find(l => l.name == language));
      const new_lang = model_language({ name: language, wikiInfo });

      if(lang_index !== -1) {
        new_a.splice(lang_index, 1, new_lang);
      } else {
        new_a.push(new_lang);
      }

      return { ...state,
        availableLanguages: new_a,
        downloadingLanguage: false,
      };

    default:
      return state;

  }
}