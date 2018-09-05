import { DOWNLOAD_REASONS } from "../constants/Constants";
import { Util } from "expo";

const ActionTypes = {
  DOWNLOAD_WIKI: 'DOWNLOAD_WIKI',
  DONE_WIKI: 'DONE_WIKI',

  UPDATE_APP: 'UPDATE_APP',
  DONE_UPDATE_APP: 'DONE_UPDATE_APP',

  HIDE: 'HIDE',
  SHOW: 'SHOW',
}
export const Actions = {
  downloadWiki: (reason, version) => ({ type: ActionTypes.DOWNLOAD_WIKI, reason, version }),
  doneWiki: () => ({ type: ActionTypes.DONE_WIKI }),
  
  updateApp: version => ({ type: ActionTypes.UPDATE_APP, version }),
  doneApp: () => ({ type: ActionTypes.DONE_UPDATE_APP }),

  hide: what => ({ type: ActionTypes.HIDE, what }),
  show: what => ({ type: ActionTypes.SHOW, what }),
}

export const DOWNLOAD_STATE = {
  WIKI: 'showWiki',
  APP: 'showApp',
}
export const initialState = {
  showApp: false,
  downloadingApp_version: '',
  
  showWiki: false,
  downloadingWiki_reason: '',
  downloadingWiki_version: '',
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    
    case ActionTypes.DOWNLOAD_WIKI:
      return { ...state,
        showWiki: true,
        downloadingWiki_reason: action.reason,
        downloadingWiki_version: action.version,
      };
    case ActionTypes.DONE_WIKI:
      return { ...state,
        showWiki: false,
        downloadingWiki_reason: '',
        downloadingWiki_version: '',
      };

    case ActionTypes.UPDATE_APP:
      return { ...state,
        showApp: true,
        downloadingApp_version: action.version,
      };
    case ActionTypes.DONE_UPDATE_APP:
      Util.reload();
      return state;

    case ActionTypes.HIDE:
      return { ...state,
        [action.what]: false,
      }
    case ActionTypes.SHOW:
      return { ...state,
        [action.what]: true,
      }

    default:
      return state;
  }
}