import { model_profile } from "../constants/Models";

const ActionTypes = {
  SEARCH: 'SEARCH',
  SETTINGS: 'SETTINGS',
  SET_USER: 'SET_USER',
  SEARCH_PROFILE: 'SEARCH_PROFILE',
}
export const Actions = {
  setUser: user => ({ type: ActionTypes.SET_USER_PROFILE, user}),
  settings: settings => ({ type: ActionTypes.SETTINGS, settings }),
  searchFor: lastSearch => ({ type: ActionTypes.SEARCH_PROFILE, lastSearch }),
}

export const initialState = model_profile({});

export default function reducer(state=initialState, action) {
  const { user, settings, lastSearch } = action;

  switch(action.type) {
    case ActionTypes.SEARCH_PROFILE:
      return { ...state, lastSearch };
    break;
    case ActionTypes.SETTINGS:
      return { ...state, settings: {...state.settings, ...settings} };
    case ActionTypes.SET_USER_PROFILE:
      return { ...state, user };
    default:
      return state;
  }
}