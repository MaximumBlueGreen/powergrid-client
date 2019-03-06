import { put, takeLatest, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import unauthenticated, { authenticated } from 'utils/apiRequestSaga';
import {
  validatedAction,
  invalidatedAction,
  validatedCreationAction,
  invalidatedCreationAction,
} from './actions';
import {
  LOGIN_BUTTON_CLICKED_ACTION,
  CREATE_USER_BUTTON_CLICKED_ACTION,
} from './constants';

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

export function* createUser({ values }) {
  const {
    emailNewUser: email,
    passwordNewUser: password,
    name,
    handle,
  } = values.toJS();

  yield unauthenticated(
    'users',
    {
      method: 'POST',
      body: JSON.stringify({ email, password, name, handle }),
    },
    function* onSuccess() {
      yield put(validatedCreationAction());
    },
    function* onError(error) {
      yield put(invalidatedCreationAction(error));
    },
  );
}

export default function* waitForLoginInfo() {
  yield all([
    takeLatest(LOGIN_BUTTON_CLICKED_ACTION, postLoginInfo),
    takeLatest(CREATE_USER_BUTTON_CLICKED_ACTION, createUser),
  ]);
}
