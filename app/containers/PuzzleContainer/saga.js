import { call, put, takeLatest } from 'redux-saga/effects';
import { loadEntities } from 'entities/actions';
import { puzzle } from 'entities/schema';
import { normalize } from 'normalizr';
import request from 'utils/request';
import { PUZZLES_LOADED } from './constants';

export function* getPuzzles() {
  const authenticationToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTUxMTk5Nzk2LCJleHAiOjE1NTEyODYxOTZ9.IM8LzeWUa7gHKsXzsk-IkEqhhVD0U9muILxUYUh8ekE';
  const requestURL = 'http://localhost:3000/users/me/puzzles';

  try {
    const puzzles = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticationToken}`,
      },
    });
    const { entities } = normalize(puzzles, [puzzle]);
    yield put(loadEntities(entities));
  } catch (err) {
    yield put(loadEntities([]));
  }
}

export default function* saga() {
  yield takeLatest(PUZZLES_LOADED, getPuzzles);
}
