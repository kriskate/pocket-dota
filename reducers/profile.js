import { model_profile } from "../constants/Models";

const ActionTypes = {
  SEARCH: 'SEARCH',
  SET_USER: 'SET_USER',
}
export const Actions = {
  setUser: user => ({ type: ActionTypes.SET_USER_PROFILE, user}),
  searchFor: lastSearch => ({ type: ActionTypes.SEARCH_PROFILE, lastSearch }),
}

export const initialState = model_profile({});

export default function reducer(state=initialState, action) {
  const { user, lastSearch } = action;

  switch(action.type) {
    case ActionTypes.SEARCH_PROFILE:
      return { ...state, lastSearch };
    break;
    case ActionTypes.SET_USER_PROFILE:
      return { ...state, user };
    default:
      return state;
  }
}