import { loadCurrentWikiInfo } from "./loaders";

const getCurrentWikiInfo = async () => {
  let wiki_current= null;

  try {
    wiki_current = await (await fetch(url.currentWiki)).json();
  } catch (e) {
    Logger.error(`error while fetching ${url.currentWiki}`, e);
  }

  return wiki_current;
}

export const checkIfWikiUpdateNeeded = async () => {
  const wiki_current = await getCurrentWikiInfo();
  if(!wiki_current) return false;

  const info = await loadCurrentWikiInfo();

  if(!info) return true;
    
  return info.currentWikiVersion == wiki_current.currentWikiVersion 
      && info.currentWikiVersionDate == wiki_current.currentWikiVersionDate;
}