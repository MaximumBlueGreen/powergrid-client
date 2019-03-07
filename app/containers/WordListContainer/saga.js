import { put, all, takeLatest } from 'redux-saga/effects';
import { loadEntities } from 'entities/actions';
import { entry as entrySchema } from 'entities/schema';
import { normalize } from 'normalizr';
import { authenticated } from 'utils/apiRequestSaga';
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

export function* setEntry({ entry }) {
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

// Individual exports for testing
export default function* wordlistContainerSaga() {
  yield all([
    takeLatest(WORDLIST_LOADED, getEntries),
    takeLatest(ENTRY_ADDED, setEntry),
  ]);
}
