import { call, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
// import makeSelectLoginPage from 'containers/LoginPage/selectors';
import { validatedAction, invalidatedAction } from './actions';
import { LOGIN_BUTTON_CLICKED_ACTION } from './constants';

// Individual exports for testing
export function* postLoginInfo() {
  const email = 'john.westwig@gmail.com'; // yield select(makeSelectLoginPage());
  const password = 'john';
  const requestURL = `https://powergrid-app.herokuapp.com/users/me/authenticationToken`;

  try {
    const tokenJSON = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(tokenJSON.token);
    yield put(validatedAction());
  } catch (err) {
    yield put(invalidatedAction(err));
  }
}

export default function* waitForLoginInfo() {
  yield takeLatest(LOGIN_BUTTON_CLICKED_ACTION, postLoginInfo);
}
