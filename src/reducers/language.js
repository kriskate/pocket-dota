import { model_language, model_wiki, model_wiki_info } from "../constants/Models";
import i18n from "../localization";

export const ActionTypes = {
  SET_LANGUAGE: 'SET_LANGUAGE',

  DOWNLOAD_LANGUAGE: "DOWNLOAD_LANGUAGE",
  DOWNLOAD_LANGUAGE_DONE: "DOWNLOAD_LANGUAGE_DONE",
}
export const Actions = {
  setLanguage: language => ({ type: ActionTypes.SET_LANGUAGE, language }),

  downloadLanguage: language => ({ type: ActionTypes.DOWNLOAD_LANGUAGE, language }),
  downloadLanguage_done: (language, data) => ({ type: ActionTypes.DOWNLOAD_LANGUAGE_DONE, language, data }),
}

export const initialState = {
  currentLanguage: "english",

  availableLanguages: [], // model_language({})

  downloadingLanguage: false,
}

export default function reducer(state=initialState, action) {
  const { language } = action;

  switch(action.type) {
    case ActionTypes.SET_LANGUAGE:
      i18n.changeLanguage(language);
      return { ...state,
        currentLanguage: language,
      }

    case ActionTypes.DOWNLOAD_LANGUAGE:
      return { ...state,
        downloadingLanguage: language,
      }

    case ActionTypes.DOWNLOAD_LANGUAGE_DONE:
      const wikiData = model_wiki(action.data);

      const new_a = [...state.availableLanguages];
      const lang_index = new_a.indexOf(new_a.find(l => l.name == language));
      const new_lang = model_language({ name: language, wikiData, });

      new_a.splice(lang_index, 1, new_lang);

      return { ...state,
        availableLanguages: new_a,
        downloadingLanguage: false,
      };

    default:
      return state;
  }
}