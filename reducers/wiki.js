import { model_wiki } from "../constants/Models";

const Types = {
  NEW_WIKI: 'NEW_WIKI',
}

export const Actions = {
  newWiki: wiki => ({ type: Types.NEW_WIKI, wiki }),
}

export const initialState = model_wiki({});

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case Types.NEW_WIKI:
      const { wiki } = action;
      return { ...state, ...wiki };
    default:
      return state;
  }
}