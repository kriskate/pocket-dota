import { combineReducers, } from 'redux';

import profile from './profile';
import wiki from './wiki';

export default combineReducers({ profile, wiki });