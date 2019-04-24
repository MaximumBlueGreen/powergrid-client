import { takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { LOGGED_OUT } from './constants';

function* logout() {
  localStorage.removeItem('token');
  yield put(push('/login'));
}

export default function* withLogoutSaga() {
  yield takeLatest(LOGGED_OUT, logout);
}
