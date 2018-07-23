const ActionTypes = {
  NEW_WIKI: 'NEW_WIKI',

  LOADED: 'LOADED',
  LOADING: 'LOADING',
  
}
const Actions = {
  newWiki: data => ({ type: ActionTypes.NEW_WIKI, data })
}

const initialState = {
  heroes: null,
  items: null,
  tips: null,
  patch_notes: null,
}

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.NEW_WIKI:
      const { data } = action;
      return { ...state, data };
    break;
    default:
      return state;
  }
}