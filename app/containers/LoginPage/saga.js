import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { authenticated } from 'utils/apiRequestSaga';
import { validatedAction, invalidatedAction } from './actions';
import { LOGIN_BUTTON_CLICKED_ACTION } from './constants';

export function* postLoginInfo({ values }) {
  const { email, password } = values.toJS();

  yield authenticated(
    'users/me/authenticationToken',
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    },
    function* onSuccess({ token }) {
      localStorage.setItem('token', token);
      yield put(validatedAction(token));
      yield put(push('/home'));
    },
    function* onError(error) {
      yield put(invalidatedAction(error));
    },
  );
}

export default function* waitForLoginInfo() {
  yield takeLatest(LOGIN_BUTTON_CLICKED_ACTION, postLoginInfo);
}
