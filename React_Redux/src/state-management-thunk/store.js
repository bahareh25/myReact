import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'
import logger from 'redux-logger'
const persistConfig = {
    key: 'root',
    storage,
   // whitelist: ['productState']
}

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = createStore(persistedReducer,applyMiddleware(thunk,logger));
export const persistor = persistStore(store)

//export {store, persistor}