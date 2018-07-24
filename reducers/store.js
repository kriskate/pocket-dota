import { combineReducers, createStore } from 'redux';

import profile from './profile';
import wiki from './wiki';

const reducers = combineReducers({ profile, wiki });

export default createStore(reducers);