import { combineReducers, } from 'redux';

import profile from './profile';
import wiki from './wiki';
import snackbar from './snackbar';

export default combineReducers({ profile, wiki, snackbar });