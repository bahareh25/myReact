import { createStore, applyMiddleware ,compose} from 'redux'
import reducers from './reducers'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import mySaga from './saga'

const sagaMiddleware = createSagaMiddleware()
const persistConfig = {
    key: 'root',
    storage,
   // whitelist: ['productState']
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = createStore(persistedReducer,composeEnhancers(applyMiddleware(sagaMiddleware)));
export const persistor = persistStore(store)


// then run the saga
sagaMiddleware.run(mySaga);