import { GET_WIKI_VERSION } from "../constants/Constants";
import { url } from "../constants/Data";
import { Platform } from "react-native";
import { Constants } from "expo";
import { model_wiki_info } from "../constants/Models";
import { noCache_headers, noCache } from "./utils";

export const ERRORS = {
  NO_REVID: 'No revision id',
  NO_REVID_UP: 'The app might have been deleted; please update through App store.',

  NO_WIKI_VERSION: 'Could not retrieve external wiki version.',
}

const getJSONwikiInfo = async () => {
  try {
    const info = await fetch(url.currentWiki, noCache_headers);
    const infoJSON = await info.json();

    return infoJSON;
  } catch (e) {
    return { error: e.message };
  }
}
export const wiki_needsUpdate = async () => {
  let latestVersionInfo = await getJSONwikiInfo();

  if(latestVersionInfo.error)
    return { error: ERRORS.NO_WIKI_VERSION + `\r\n${latestVersionInfo.error}`};

  const { appVersion, wikiVersion, } = model_wiki_info(latestVersionInfo);
  const newVersion = `${appVersion}-${wikiVersion}`;

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
            ...noCache,
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