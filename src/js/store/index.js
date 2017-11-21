import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const config = {
  key: 'Typeqast_root',
  storage: storage,
  blacklist: ['form']
}

const configureStore = compose(
  applyMiddleware(thunk)
)(createStore)

const combinedReducer = persistReducer(config, rootReducer)

const createAppStore = () => {
  let store = configureStore(combinedReducer)
  let persistor = persistStore(store)

  return {persistor, store}
}

export default createAppStore
