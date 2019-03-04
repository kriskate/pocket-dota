import { combineReducers } from 'redux';

import profile from './profile';
import wiki from './wiki';
import update from './update';
import language from './language';

export default combineReducers({
  profile,
  wiki,
  update,
  language,
});