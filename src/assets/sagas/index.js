/* eslint-disable spaced-comment, no-unused-vars */
import { takeEvery } from 'redux-saga';
import { put, fork, all, call, take } from 'redux-saga/effects';
import * as actions from '../actions';
import * as Api from '../services/api';
import history from '../history';

/***************************** Subroutines ************************************/

function* logout() {
  try {
    const result = yield call(Api.logout);
    yield put(actions.logout.success());
    history.push('/user/login')
  } catch (error) {
    yield put(actions.logout.failure());
  }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchLogout() {
  // while (true) {
  //   yield take(actions.logout);
  //   yield call(logout)
  // }
  yield takeEvery(actions.LOGOUT.REQUEST, logout);
  // history.push('/user/login')
}

export default function* rootSaga() {
  yield fork(watchLogout);
}
