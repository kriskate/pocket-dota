import { Constants } from "expo";
import { Platform } from "react-native";
import { GET_WIKI_VERSION } from "../constants/Constants";
import { getJSONwikiInfo } from "./downloaders";

export const ERRORS = {
  NO_REVID: 'No revision id',
  NO_REVID_UP: 'The app might have been deleted; please update through App store.',

  NO_WIKI_VERSION: 'Could not retrieve external wiki version.',
}

const getJSONwikiInfo = async () => {
  try {
    const info = await (await fetch(url.currentWiki)).json();

    return info;
  } catch (e) {
    return { error: e };
  }
}
export const wiki_needsUpdate = async () => {
  const localVersion = GET_WIKI_VERSION();
  const currentVersion = await getJSONwikiInfo();
  if(!currentVersion) return { error: ERRORS.NO_WIKI_VERSION };


  const { currentWikiVersion, app_version } = currentVersion;
  const newV = `${app_version}.${currentWikiVersion}`;

  if(localVersion == newV)
    return false;
  else
    return newV;
}


export const app_needsUpdate = async () => {
  try {
    return await Expo.Updates.checkForUpdateAsync();
  } catch(e) {
    return false;
  }
}