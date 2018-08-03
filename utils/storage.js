import { AsyncStorage } from 'react-native';
import Logger from './Logger';

const ERRORS = {
  SET: (key, e) => `AsyncStorage - problem setting key ${key}: \n${e}`,
  GET: (key, e) => `AsyncStorage - problem retrieving ${key}: \n${e}`,
};



/* GET/SET items */
export const setItem = async (key, value, namespace='localdata') => {
  try {
    await AsyncStorage.setItem(`@${namespace}:${key}`, JSON.stringify(value));
  } catch (e) {
    Logger.log(ERRORS.SET(key, e));
  }
}
export const getItem = async (key) => {
  try {
    const val = await AsyncStorage.getItem(`@${namespace}:${key}`);
    return val ? JSON.parse(val) : undefined;
  } catch (e) {
    Logger.log(ERRORS.GET(key, e));
    return undefined;
  }
}