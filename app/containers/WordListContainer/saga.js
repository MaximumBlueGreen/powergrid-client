import { call, put, select } from 'redux-saga/effects';
import { loadEntities } from 'entities/actions';
import { entry as entrySchema } from 'entities/schema';
import { normalize } from 'normalizr';
import request from 'utils/request';
import {} from './constants';

export function* getEntries() {
  const selectUserToken = state => state.getIn(['entities', 'users', 'me']);
  const requestURL = 'http://localhost:3000/entries';
  const authenticationToken = yield select(selectUserToken);

  try {
    const entries = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticationToken}`,
      },
    });
    const { entities } = normalize(entries, [entrySchema]);
    yield put(loadEntities(entities));
  } catch (err) {
    /* TODO handle error */
    yield put(loadEntities([]));
  }
}

// Individual exports for testing
export default function* wordlistContainerSaga() {
  // See example in containers/HomePage/saga.js
}
