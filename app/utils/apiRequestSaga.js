import { call, select, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { merge } from 'lodash';
import selectUsers from 'entities/Users/selectors';
import { createSelector } from 'reselect';
import request from './request';

/* Change this to your local server */
const BASE_URL = 'https://powergrid-app.herokuapp.com/';
// const BASE_URL = 'http://localhost:3000/';

const selectUserToken = createSelector(selectUsers, users => users.get('me'));

export function* unauthenticated(requestURL, options, onSuccess, onFailure) {
  try {
    const response = yield call(
      request,
      `${BASE_URL}${requestURL}`,
      merge(
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        options,
      ),
    );
    yield onSuccess(response);
  } catch (error) {
    yield onFailure(error);
  }
}

export function* authenticated(requestURL, options, onSuccess, onFailure) {
  const token = yield select(selectUserToken);
  yield unauthenticated(
    requestURL,
    merge(
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      options,
    ),
    onSuccess,
    function* onFailureWithRedirect(error) {
      if (error.response.status === 401) {
        yield put(push('/login'));
      } else if (error.response.status === 404) {
        yield put(push('/dashboard'));
      } else {
        yield onFailure(error);
      }
    },
  );
}
