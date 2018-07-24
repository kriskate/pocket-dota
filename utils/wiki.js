import React from 'react';
import { AsyncStorage } from 'react-native';
import { url } from '../constants/Constants';
import { connectionIssue } from './utils';

const ERRORS = {
  SET: (key, e) => `AsyncStorage - problem setting key ${key}: \n${e}`,
  GET: (key, e) => `AsyncStorage - problem retrieving ${key}: \n${e}`,
  FETCH: url => `Fetch - problem fetching ${url}: \n ${e}`,
};
const wiki_local = {};


/* INIT */
export const initStorage = async () => {
  return await Promise.all(
    Object.keys(url.data).map(async cData => {
      try {
        const val = await AsyncStorage.getItem(cData);
        wiki_local[cData] = val ? JSON.parse(val) : null;
      } catch(e) {
        wiki_local[cData] = null;
        console.log(ERRORS.GET(cData, e));
      }
    })
  );
}

export const flushGetRequests = () => AsyncStorage.flushGetRequests();



/* GET/SET items */
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@wiki_local:${key}`, JSON.stringify(value));
    wiki_local[key] = value;
  } catch (e) {
    console.log(ERRORS.SET(key, e));
  }
}
export const getItem = async (key) => {
  try {
    const val = await AsyncStorage.getItem(`@wiki_local:${key}`);
    return val ? JSON.parse(val) : null;
  } catch (e) {
    console.log(ERRORS.GET(key, e));
    return null;
  }
}


/* wiki updating */
export const checkIfWikiUpdateNeeded = async () => {
  const wiki_current = await getCurrentWiki();
  if(!wiki_current) return false;

  const { info } = wiki_local;

  if(!info) return true;
  else return info.currentWikiVersion == wiki_current.currentWikiVersion 
           && info.currentWikiVersionDate == wiki_current.currentWikiVersionDate;
}

export const downloadNewWikiData = async () => {
  const wiki_current = await getCurrentWiki();
  
  if(!wiki_current ) return null;

  const { currentWikiVersion, currentWikiVersionDate } = wiki_current;

  const cWikiFolder = `v_${currentWikiVersion}_${currentWikiVersionDate}`;
  const data = {};

  //Object.keys(url.data).map(cData => data[cData] = url.data[cData].replace('$WIKI_FOLDER', cWikiFolder))
  try {
    await Promise.all(Object.keys(url.data).map(async cData => 
      data[cData] = await fetchJSON(url.data[cData].replace('$WIKI_FOLDER', cWikiFolder))
    ));
  } catch (e) {
    console.log(e)
    return false;
  }
  
  return data;
}



/* UTILS */
const getCurrentWiki = async () => {
  let wiki_current = null;
  try {
    wiki_current = await fetchJSON(url.currentWiki);
  } catch (e) {
    connectionIssue();
    console.log(ERRORS.FETCH(url.currentWiki, e));
  }
  return wiki_current;
}
const fetchJSON = async url => (await fetch(url)).json();