import { put, takeLatest } from 'redux-saga/effects';
// import { push } from 'connected-react-router';
import { unauthenticated } from 'utils/apiRequestSaga';
import { changeMode } from 'containers/LoginPage/actions';
// import { loginButtonClickedAction } from 'containers/LoginContainer/actions';
import { CREATE_USER_BUTTON_CLICKED_ACTION } from './constants';

export function* createUser({ values }) {
  const { email, password, handle, name } = values.toJS();

  yield unauthenticated(
    'users',
    {
      method: 'POST',
      body: JSON.stringify({ email, password, handle, name }),
    },
    function* onSuccess() {
      yield put(changeMode());
    },
    function* onError(error) {
      console.log(error);
    },
  );
}

export default function* waitForLoginInfo() {
  yield takeLatest(CREATE_USER_BUTTON_CLICKED_ACTION, createUser);
}
