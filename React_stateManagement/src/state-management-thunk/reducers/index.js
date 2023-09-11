import { combineReducers } from "redux";
import userThunkReducer from "./userThunkReducer";

export default combineReducers({
    userThunkState:userThunkReducer,
})