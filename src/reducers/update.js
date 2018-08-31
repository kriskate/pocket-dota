import { DOWNLOAD_REASONS } from "../constants/Constants";

const ActionTypes = {
  DOWNLOAD: 'DOWNLOAD',
  REDOWNLOAD: 'REDOWNLOAD',
  UPDATE: 'UPDATE',
  DONE: 'DONE',

  LOADING_DONE: 'LOADING_DONE',
}
export const Actions = {
  download: payload => ({ type: ActionTypes.DOWNLOAD }),
  redownload: payload => ({ type: ActionTypes.REDOWNLOAD }),
  update: payload => ({ type: ActionTypes.UPDATE }),
  done: payload => ({ type: ActionTypes.DONE }),

  loadingDone: payload => ({ type: ActionTypes.LOADING_DONE }),
}

export const initialState = {
  loading: true,
  downloading: false,
  downloadReason: '',
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.DOWNLOAD:
      return { downloading: true, downloadReason: DOWNLOAD_REASONS.FRESH };
    case ActionTypes.REDOWNLOAD:
      return { downloading: true, downloadReason: DOWNLOAD_REASONS.MISSING };
    case ActionTypes.UPDATE:
      return { downloading: true, downloadReason: DOWNLOAD_REASONS.UPDATE };
    case ActionTypes.DONE:
      return { downloading: false, downloadReason: '' };
    case ActionTypes.LOADING_DONE:
      return { ...state, loading: false };
    default:
      return state;
  }
}