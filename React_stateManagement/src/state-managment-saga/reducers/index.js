import { combineReducers } from "redux";
import userSagaReducer from './userSagaReducer'

export default combineReducers({
    userSagaState:userSagaReducer,
})