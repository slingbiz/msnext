import {combineReducers} from 'redux';
import common from './common';
import myAccount from './myAccount';

const reducers = combineReducers({
  common,
  myAccount
});

export default reducers;
