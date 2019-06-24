import { combineReducers } from 'redux';
import user from './user';
import books from './books';
import global from './global';

export default combineReducers({ user, global, books });
