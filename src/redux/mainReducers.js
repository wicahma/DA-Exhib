
import { combineReducers } from 'redux'
import handleApiReducers from './handleApiReducers'

const rootReducer = combineReducers({
  handleAPI: handleApiReducers // ini nama yang dimasukkan setelah state jadinya state.handleAPI  
})

export default rootReducer;
