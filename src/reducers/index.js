import { combineReducers } from 'redux';

import profile from './profile';
import wiki from './wiki';
import snackbar from './snackbar';
import update from './update';

export default combineReducers({
  profile,
  wiki,
  snackbar,
  update,
});