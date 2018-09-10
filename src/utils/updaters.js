import { GET_WIKI_VERSION, APP_VERSION } from "../constants/Constants";
import { url } from "../constants/Data";
import { Platform } from "react-native";
import { Constants } from "expo";

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
  const latestVersionInfo = await getJSONwikiInfo();
  if(latestVersionInfo.error) return { error: ERRORS.NO_WIKI_VERSION + `\r\n${latestVersionInfo.error}`};


  const { currentWikiVersion, app_version } = latestVersionInfo;
  const newVersion = `${app_version}.${currentWikiVersion}`;

  if(GET_WIKI_VERSION() === newVersion)
    return false;
  else
    return { newVersion, latestVersionInfo };
}


export const app_needsUpdate = async () => {
  try {
    const newApp = await Expo.Updates.checkForUpdateAsync();

    if(newApp && newApp.isAvailable) {
      try {
        const { id, sdkVersion } = Constants.manifest;
    
        const res = await fetch(`https://expo.io/${id}/index.exp`, {
          headers: {
            'Exponent-SDK-Version': sdkVersion,
            'Exponent-Platform': Platform.OS,
          },
          method: 'GET',
        });
    
        const newVersion = (await res.json()).version;
        return { newVersion };

      } catch(e) {
        return { error: e };
      }
    } else return false;
  } catch(e) {
    return { error: e };
  }
}