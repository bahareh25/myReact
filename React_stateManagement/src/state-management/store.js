import { createStore } from 'redux'
import reducers from './reducers/rootReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
    key: 'root',
    storage,
    whitelist:'productstate'
}

const persistedReducer = persistReducer(persistConfig, reducers)
let store = createStore(persistedReducer)
let persistor = persistStore(store)

export { store, persistor }
