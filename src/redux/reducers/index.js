import { combineReducers } from 'redux'
import common from './common'
import myAccount from './myAccount'
import chat from './chat'

const reducers = combineReducers({
  common,
  myAccount,
  chat
})

export default reducers
