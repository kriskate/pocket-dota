const Types = {
  NEW_WIKI: 'NEW_WIKI_AVAILABLE',
  NEW_WIKI: 'NEW_WIKI',

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

export const initialState = {
  data: {
    heroes: null, items: null, tips: null, patch_notes: null, info: null,
  },

  downloading: false,
  // fresh/ missing/ update
  downloadingReason: '',
}

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case Types.NEW_WIKI:
      const { data } = action;
      return { ...state, data, downloading: false, };
    case Types.DOWLOADING:
      const { downloadingReason } = action;
      return { ...state, downloading: true, downloadingReason };
    default:
      return state;
  }
}