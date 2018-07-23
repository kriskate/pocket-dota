const ActionTypes = {
  LOAD_DATA: 'LOAD_DATA',
  LOADED_DATA: 'LOADED_DATA',
  LOADING_TEXT_SET: 'LOADING_TEXT_SET',
}
export const Actions = {
  loadedData: () => ({ type: ActionTypes.LOAD }),
  loadingTextSet: loadingText => ({ type: ActionTypes.LOADING_TEXT_SET, loadingText }),
}

const initialState = {
  loadedData: false,
  loadingText: '',
}

export default function reducer(state=initialState, action) {
  console.log(action)
  switch(action.type) {
    case ActionTypes.LOAD_DATA:
      return { ...state, loadedData: false };
    case ActionTypes.LOADED_DATA:
      return { ...state, loadedData: true };
    case ActionTypes.LOADING_TEXT_SET:
      const {loadingText} = action;
      return { ...state, loadingText};
    default:
      return state;
  }
}