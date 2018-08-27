import { AsyncStorage } from 'react-native';
import Logger from './Logger';

const ERRORS = {
  SET: (key, e) => `AsyncStorage - problem setting key ${key}: \n${e}`,
  GET: (key, e) => `AsyncStorage - problem retrieving ${key}: \n${e}`,
};



/* GET/SET items */
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@localdata:${key}`, JSON.stringify(value));
  } catch (e) {
    Logger.log(ERRORS.SET(key, e));
  }
}
export const getItem = async (key) => {
  try {
    const val = await AsyncStorage.getItem(`@localdata:${key}`);
    return val ? JSON.parse(val) : undefined;
  } catch (e) {
    Logger.log(ERRORS.GET(key, e));
    return undefined;
  }
}