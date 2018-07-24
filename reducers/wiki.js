import { model_data } from "../constants/Models";

const Types = {
  NEW_WIKI: 'NEW_WIKI_AVAILABLE',
  NEW_WIKI: 'NEW_WIKI',

  LOADING: 'LOADING',

  DOWLOADING: 'DOWLOADING',
}
export const DOWNLOAD_REASONS = {
  // no data is present
  FRESH: 'FRESH', 
  // data is partially corrupted (ie user cleared app cache, but intrerupted it)
  MISSING: 'MISSING',
  // there is a new wiki version and the user accepted the update download
  UPDATE: 'UPDATE', 
}
export const Actions = {
  newWiki: data => ({ type: Types.NEW_WIKI, data }),

  loadLocalData: () => ({ type: Types.LOADING }),

  downloadNewData: downloadingReason => ({ type: Types.DOWLOADING, downloadingReason }),
}

const initialState = {
  data: {},

  loading: false,
  downloading: false,

  // fresh/ missing/ update
  downloadingReason: '',
}

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case Types.NEW_WIKI:
      const { data } = action;
      return { ...state, data, downloading: false, loading: false };
    case Types.LOADING:
      return { ...state, loading: true, downloading: false };
    case Types.DOWLOADING:
      const { downloadingReason } = action;
      return { ...state, loading: false, downloading: true, downloadingReason };
    default:
      return state;
  }
}