import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import request from 'utils/request';
import makeSelectLoginPage from 'containers/LoginPage/selectors';
import { validatedAction, invalidatedAction } from './actions';
import { LOGIN_BUTTON_CLICKED_ACTION } from './constants';

export function* postLoginInfo() {
  const { username: email, password } = yield select(makeSelectLoginPage());
  const requestURL = `http://localhost:3000/users/me/authenticationToken`;

  try {
    const { token } = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    localStorage.setItem('token', token);
    yield put(validatedAction(token));
    yield put(push('/home'));
  } catch (err) {
    yield put(invalidatedAction(err));
  }
}

export default function* waitForLoginInfo() {
  yield takeLatest(LOGIN_BUTTON_CLICKED_ACTION, postLoginInfo);
}
