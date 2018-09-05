import { DOWNLOAD_REASONS } from "../constants/Constants";

const ActionTypes = {
  DOWNLOAD: 'DOWNLOAD',
  REDOWNLOAD: 'REDOWNLOAD',
  UPDATE: 'UPDATE',
  DONE: 'DONE',

  UPDATE_APP: 'UPDATE_APP',
}
export const Actions = {
  download: payload => ({ type: ActionTypes.DOWNLOAD }),
  redownload: payload => ({ type: ActionTypes.REDOWNLOAD }),
  update: payload => ({ type: ActionTypes.UPDATE }),
  done: payload => ({ type: ActionTypes.DONE }),

  updateApp: () => ({ type: ActionTypes.UPDATE_APP }),
}

export const initialState = {
  downloadingApp: false,
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

    case ActionTypes.UPDATE_APP:
      return { downloadingApp: true, }
    default:
      return state;
  }
}