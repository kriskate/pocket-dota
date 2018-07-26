import React from 'react';
import { AsyncStorage } from 'react-native';
import { url } from '../constants/Constants';
import { connectionIssue } from './utils';
import Logger from './Logger';

const ERRORS = {
  SET: (key, e) => `AsyncStorage - problem setting key ${key}: \n${e}`,
  GET: (key, e) => `AsyncStorage - problem retrieving ${key}: \n${e}`,
  FETCH: url => `Fetch - problem fetching ${url}: \n ${e}`,
};



/* GET/SET items */
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@wiki_local:${key}`, JSON.stringify(value));
  } catch (e) {
    Logger.log(ERRORS.SET(key, e));
  }
}
export const getItem = async (key) => {
  try {
    const val = await AsyncStorage.getItem(`@wiki_local:${key}`);
    return val ? JSON.parse(val) : undefined;
  } catch (e) {
    Logger.log(ERRORS.GET(key, e));
    return undefined;
  }
}


/* wiki updating */
export const checkIfWikiUpdateNeeded = async () => {
  const wiki_current = await getCurrentWiki();
  if(!wiki_current) return false;

  const info = getItem('info');
  if(!info) return true;
  else return info.currentWikiVersion == wiki_current.currentWikiVersion 
           && info.currentWikiVersionDate == wiki_current.currentWikiVersionDate;
}

export const downloadNewWikiData = async () => {
  Logger.debug('downloading new wiki');
  const wiki_info = await getCurrentWikiInfo();
  
  if(!wiki_info ) return undefined;

  const { currentWikiVersion, currentWikiVersionDate } = wiki_info;

  const cWikiFolder = `v_${currentWikiVersion}_${currentWikiVersionDate}`;
  const data = {};

  try {
    await Promise.all(Object.keys(url.data).map(async cData => 
      data[cData] = await fetchJSON(url.data[cData].replace('$WIKI_FOLDER', cWikiFolder))
    ));
  } catch (e) {
    Logger.error(e)
    throw e;
  }

  await setCurrentWiki(data);
  
  return data;
}



/* UTILS */
const getCurrentWikiInfo = async () => {
  let wiki_current;
  try {
    wiki_current = await fetchJSON(url.currentWiki);
  } catch (e) {
    Logger.error(ERRORS.FETCH(url.currentWiki, e));
    throw e;
  }
  return wiki_current;
}
const setCurrentWiki = async newWiki => {
  await Promise.all(Object.keys(newWiki).map(async cData => {
    try {
      await setItem(cData, newWiki[cData])
    } catch(e) {
      Logger.error(e);
      throw e;
    }

  }
  ));
}

const fetchJSON = async url => (await fetch(url)).json();
