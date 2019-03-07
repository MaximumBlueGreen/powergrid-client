import { put, all, takeLatest, select } from 'redux-saga/effects';
import { loadEntities } from 'entities/actions';
import { entry as entrySchema } from 'entities/schema';
import { normalize } from 'normalizr';
import { authenticated } from 'utils/apiRequestSaga';
import selectEntries from 'entities/Entries/selectors';
import { ENTRY_UPDATED } from 'entities/Entries/constants';
import { WORDLIST_LOADED, ENTRY_ADDED } from './constants';

export function* getEntries() {
  yield authenticated(
    'entries',
    {
      method: 'GET',
    },
    function* onSuccess(entries) {
      const { entities } = normalize(entries, [entrySchema]);
      yield put(loadEntities(entities));
    },
    function* onError(error) {
      console.log(error);
    },
  );
}

export function* addEntry({ entry }) {
  yield authenticated(
    'entries',
    {
      method: 'POST',
      body: JSON.stringify(entry),
    },
    function* onSuccess() {
      yield getEntries();
    },
    function* onError(error) {
      console.log(error);
    },
  );
}

export function* updateEntry({ id }) {
  const entries = yield select(selectEntries);
  const entry = entries.get(id);

  console.log(entry);

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

// Individual exports for testing
export default function* wordlistContainerSaga() {
  yield all([
    takeLatest(WORDLIST_LOADED, getEntries),
    takeLatest(ENTRY_ADDED, addEntry),
    takeLatest(ENTRY_UPDATED, updateEntry),
  ]);
}
