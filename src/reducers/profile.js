import { model_profile } from "../constants/Models";

const ActionTypes = {
  SEARCH: 'SEARCH',
  SETTINGS: 'SETTINGS',
  SET_USER: 'SET_USER',
  SEARCH_PROFILE: 'SEARCH_PROFILE',
  SET_PROFILE: 'SET_PROFILE',
}
export const Actions = {
  setUser: user => ({ type: ActionTypes.SET_USER, user}),
  settings: settings => ({ type: ActionTypes.SETTINGS, settings }),
  searchFor: lastSearch => ({ type: ActionTypes.SEARCH_PROFILE, lastSearch }),
  setProfile: profile => ({ type: ActionTypes.SET_PROFILE, profile }),
}

export const initialState = model_profile({});

export default function reducer(state=initialState, action) {
  const { user, settings, lastSearch, profile } = action;

  switch(action.type) {
    case ActionTypes.SEARCH_PROFILE:
      return { ...state, lastSearch };
    break;
    case ActionTypes.SETTINGS:
      return { ...state, settings: {...state.settings, ...settings} };
    case ActionTypes.SET_USER:
      return { ...state, user };
    case ActionTypes.SET_PROFILE: 
      return { ...profile };
    default:
      return state;
  }
}