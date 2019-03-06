import { call, select } from 'redux-saga/effects';
import { merge } from 'lodash';
import request from './request';

/* Change this to your local server */
// const BASE_URL = 'https://powergrid-app.herokuapp.com/';
const BASE_URL = 'http://localhost:3000/';

const selectUserToken = state => state.getIn(['entities', 'users', 'me']);

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
    onFailure,
  );
}
