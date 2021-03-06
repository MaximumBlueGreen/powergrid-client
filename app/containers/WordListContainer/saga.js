import { put, all, takeLatest, select } from 'redux-saga/effects';
import { loadEntities } from 'entities/actions';
import { entry as entrySchema } from 'entities/schema';
import { normalize } from 'normalizr';
import { authenticated } from 'utils/apiRequestSaga';
import selectEntries from 'entities/Entries/selectors';
import { ENTRY_UPDATED } from 'entities/Entries/constants';
import { reset } from 'redux-form/immutable';
import {
  WORDLIST_LOADED,
  ENTRY_DELETED,
  ENTRY_ADDED,
  FILTER_PATTERN_UPDATED,
} from './constants';
import { loadWordList } from './actions';
import { makeSelectWordListContainer } from './selectors';

export function* getEntries() {
  const { offset, filterPattern, limit } = yield select(
    makeSelectWordListContainer(),
  );
  const pattern = filterPattern.replace(/\./g, '_').slice(1, -1);

  yield authenticated(
    `entries?offset=${offset}&limit=${limit}&pattern=${pattern}`,
    {
      method: 'GET',
    },
    function* onSuccess(entries) {
      const { entities, result } = normalize(entries, [entrySchema]);
      yield put(loadEntities(entities, result, { entityType: 'ENTRY' }));
    },
    function* onError(error) {
      console.log(error);
    },
  );
}

export function* updateEntry({ id }) {
  const entries = yield select(selectEntries);
  const entry = entries.get(id);

  yield authenticated(
    `entries/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(entry),
    },
    function* onSuccess() {
      console.log('We did it!');
    },
    function* onError(error) {
      console.log(error);
    },
  );
}

export function* deleteEntry({ entryId }) {
  yield authenticated(
    `entries/${entryId}`,
    {
      method: 'DELETE',
    },
    function* onSuccess() {
      yield put(loadWordList(true));
    },
    function* onError(error) {
      console.log(error);
    },
  );
}

export function* addEntry({ values }) {
  const { entry, score } = values.toJS();
  yield authenticated(
    'entries',
    {
      method: 'POST',
      body: JSON.stringify({ entry: entry.toUpperCase(), score }),
    },
    function* onSuccess() {
      yield put(reset('addEntry'));
      yield put(loadWordList(true));
    },
    function* onError(error) {
      console.log(error);
    },
  );
}

// Individual exports for testing
export default function* wordListContainerSaga() {
  yield all([
    takeLatest([WORDLIST_LOADED, FILTER_PATTERN_UPDATED], getEntries),
    takeLatest(ENTRY_UPDATED, updateEntry),
    takeLatest(ENTRY_DELETED, deleteEntry),
    takeLatest(ENTRY_ADDED, addEntry),
  ]);
}
