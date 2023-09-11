import { call, put, takeEvery } from "redux-saga/effects";

import { UsersFetchRequested, UsersFetchSucceeded, UsersFetchFailed } from "./actions/actionTypes";

const getUsersFromAPI = () => fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()); //action creator

function* fetchUsers(action) {
  try {
    const users = yield call(getUsersFromAPI);
    yield put({ type: UsersFetchSucceeded, users: users });//dispath=put
  } catch (e) {
    yield put({ type: UsersFetchFailed, message: e.message });
  }
}


function* mySaga() {
  yield takeEvery(UsersFetchRequested, fetchUsers);
}

export default mySaga;