import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import contacts from './contacts'

const appReducer = combineReducers({
  form,
  contacts
})

export default appReducer
