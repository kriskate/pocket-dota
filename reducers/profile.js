const ActionTypes = {
  SEARCH: 'SEARCH',
  SET_USER: 'SET_USER',
}
const Actions = {
  searchFor: search => ({ type: ActionTypes.SEARCH_PROFILE, search }),
  setUser: user => ({ type: ActionTypes.SET_USER_PROFILE, user}),
}

const initialState = {
  search: null,
  user: null, // { name, image, url_profile }
}

export default function reducer(state=initialState, action) {
  const { user, search } = action;

  switch(action.type) {
    case ActionTypes.SEARCH_PROFILE:
      return { ...state, search };
    break;
    case ActionTypes.SET_USER_PROFILE:
      return { ...state, user };
    default:
      return state;
  }
}